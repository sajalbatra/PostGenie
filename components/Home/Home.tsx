"use client";
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import promptatom from '@/recoil/promptatom';
import generatedPostAtom from '@/recoil/generatedpostatom';
import savedPostsAtom from '@/recoil/savedpostsatom';
import { Input } from '../ui/input';
import axios from 'axios'; 
import { useSession } from 'next-auth/react';
import { GoogleGenerativeAI } from "@google/generative-ai"

export interface Post {
    prompt: string;
    text: string;
    timestamp: string;
    author: string;
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const Home: React.FC = () => {
    const { data: session } = useSession();
    const [userprompt, setuserPrompt] = useRecoilState<string>(promptatom);
    const [generatedPost, setGeneratedPost] = useRecoilState<string>(generatedPostAtom);
    const [posts, setPosts] = useRecoilState<Post[]>(savedPostsAtom);
    const [loading, setLoading] = useState<boolean>(false);
    const [author, setAuthor] = useState<string>('');
    const [filter, setFilter] = useState<'all' | 'mine'>('all');

    useEffect(() => {
        if (session?.user?.name) {
            setAuthor(session.user.name);
        }
        
    }, [session]);

    useEffect(() => {
        fetchPosts();
    }, [filter]);

    const handleGeneratePost = async () => {
        if (!userprompt.trim()) {
            alert('Please enter a prompt.');
            return;
        }

        setLoading(true);
        let postText = '';

        try {
            const result = await model.generateContent(userprompt);
            postText = await result.response?.text() || 'No response from AI.';
            setGeneratedPost(postText);
        } catch (err) {
            console.error('Error generating post:', err);
        }

        try {
            const saveResponse = await axios.post('/api/savePosts', {
                post: postText,
                prompt: userprompt,
                author,
            });

            if (saveResponse.status === 200) {
                alert('Post saved successfully.');
                fetchPosts();
            } else {
                alert('Failed to save post.');
            }
        } catch (err) {
            console.error('Error saving post:', err);
            alert('Failed to save post.');
        } finally {
            setLoading(false);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await axios.get<{ posts: Post[] }>('/api/fetchPosts');
            const allPosts = response.data.posts;
            if (filter === 'all') {
                setPosts(allPosts);
            } else if (filter === 'mine') {
                setPosts(allPosts.filter(post => post.author === author));
            }

        } catch (err) {
            console.error('Error fetching posts:', err);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Social Media Post Generator</h1>
            <div className="mb-4">
                <Input
                    value={userprompt}
                    onChange={(e) => setuserPrompt(e.target.value)}
                    className="mx-auto w-1/2 border rounded-md p-2"
                    placeholder="Enter your prompt here..."
                />
                <button
                    onClick={handleGeneratePost}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600"
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate Post'}
                </button>
            </div>
            {generatedPost && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Generated Post:</h2>
                    <p className="border rounded-md p-4 bg-gray-100">{generatedPost}</p>
                </div>
            )}
            {posts.length > 0 && (
                <div className="space-y-4 fle-col items-center justify-center">
                    <p className="mb-4">
                        Use the buttons below to filter the posts. Click  All Posts  to view all the posts or My Posts to see only the posts by the signed-in user.
                    </p>
                    <button
                        onClick={() => setFilter('all')}
                        className={`mr-2 px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        All Posts
                    </button>
                    <button
                        onClick={() => setFilter('mine')}
                        className={`px-4 py-2 rounded-md ${filter === 'mine' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >Mine Post</button>
                    {posts.map((post, index) => (
                        <div key={index} className="border rounded-md p-4 bg-gray-100">
                            <p><strong>Prompt:</strong> {post.prompt}</p>
                            <p><strong>Text:</strong> {post.text}</p>
                            <p><strong>Author:</strong> {post.author}</p>
                            <small className="text-gray-500"><strong>Timestamp:</strong> {post.timestamp}</small>
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
};

export default Home;
