import { NextRequest, NextResponse } from 'next/server';
import { google, sheets_v4 } from 'googleapis';

const sheets = google.sheets('v4');

interface Post {
    post: string;
    prompt: string;
    author: string;
}

export async function POST(req: NextRequest) {
    try {
        const { post, prompt, author }: Post = await req.json();

        if (!post || !prompt || !author) {
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        const auth = new google.auth.JWT(
            process.env.GOOGLE_CLIENT_EMAIL!,
            undefined,
            process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
            ['https://www.googleapis.com/auth/spreadsheets']
        );

        await auth.authorize();

        const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
        const range = 'Sheet1!A:D';
        const timestamp = new Date().toISOString();

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            requestBody: { 
                values: [[timestamp, prompt, post, author]],
            },
            auth: auth, 
        });
        return NextResponse.json({ message: 'Post saved successfully', response: response.data });
    } catch (error) {
        console.error('Error saving post:', error);
        return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
    }
}
