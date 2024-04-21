import { updatePost } from '@/lib/dbactions';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const postToUpdate = await req.json();
        
        console.log(postToUpdate);
        
        await updatePost(postToUpdate);

        return NextResponse.json({message: 'Post Updated!'}, { status: 200 });
    } catch (error) {
        console.log(error);
            return NextResponse.json({ error: 'Something went wrong...' }, { status: 400 });
    }

}
