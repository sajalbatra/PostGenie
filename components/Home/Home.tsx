"use client";
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import promptatom from '@/recoil/promptatom';
import generatedPostAtom from '@/recoil/generatedpostatom';
import savedPostsAtom from '@/recoil/savedpostsatom';
import { Input } from '../ui/input';
import OpenAI from 'openai';
import axios from 'axios'; // Ensure axios is installed
import { useSession } from 'next-auth/react';

// Define the Post type
export interface Post {
    prompt:string;
    text: string;
    timestamp: string;
    author: string;
}

// Initialize OpenAI with your API key
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY!,
    dangerouslyAllowBrowser: true,
});

const Home: React.FC = () => {
    const { data: session } = useSession();
    const [prompt, setPrompt] = useRecoilState<string>(promptatom);
    const [generatedPost, setGeneratedPost] = useRecoilState<string>(generatedPostAtom);
    const [posts, setPosts] = useRecoilState<Post[]>(savedPostsAtom); // Ensure the type is correctly set
    const [loading, setLoading] = useState<boolean>(false);
    const [author, setAuthor] = useState<string>('');

    useEffect(() => {
        if (session?.user?.name) {
            setAuthor(session.user.name);
        }
    }, [session]);

    useEffect(() => {
        fetchPosts();
    },[]);

    const handleGeneratePost = async () => {
        if (!prompt.trim()) {
            alert('Please enter a prompt.');
            return;
        }

        setLoading(true);

        let postText = ''; 
        let isPostGenerated = false;

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: prompt }],
            });

            postText = response.choices[0]?.message?.content || '';
            isPostGenerated = !!postText; 

            if (!isPostGenerated) {
                throw new Error('No response from OpenAI.');
            }
        } catch (err) {
            console.error('Error generating post:', err);
            postText = 'Limit exhausted saving Sample message'; 
        }

        try {
            const saveResponse = await axios.post('/api/savePosts', {
                post: postText,
                prompt: prompt,
                author: author,
            });

            if (saveResponse.status === 200) {
                alert('Post saved successfully.');
            } else {
                alert('Failed to save post.');
            }

            fetchPosts();
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

            if (author === 'Sajal Batra') {
                setPosts(allPosts);
            } else {
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
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
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
                <div className="space-y-4">
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
