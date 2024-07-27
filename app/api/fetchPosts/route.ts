// app/api/fetchPosts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { google, sheets_v4 } from 'googleapis';  // Ensure correct import
import { JWT } from 'google-auth-library';  // Import JWT for type

const sheets = google.sheets('v4');

interface Post {
    timestamp: string;
    prompt: string;
    text: string;
    author: string;
}

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL!,
                private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheetsClient = (await auth.getClient()) as JWT; 

        const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
        const range = 'Sheet1!A:D';

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
            auth: sheetsClient,
        });

        const rows = response.data.values || [];
        
        const posts: Post[] = rows.map(row => ({
            timestamp: row[0] || '',
            prompt: row[1] || '',
            text: row[2] || '',
            author: row[3] || '',
        }));

       return NextResponse.json({ posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' });
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    NextResponse.json({ error: 'Method not allowed' });
}
