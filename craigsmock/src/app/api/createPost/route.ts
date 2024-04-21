import {createPost, getPost} from '@/lib/dbactions';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const postToSave = await req.json();
        
        console.log(postToSave);

        createPost(postToSave);

        return NextResponse.json({message: 'Post Succeded!'}, { status: 200 });
    } catch (error) {
        console.log(error);
            return NextResponse.json({ error: 'Something went wrong...' }, { status: 400 });
    }

}
