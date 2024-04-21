import { deletePost } from '@/lib/dbactions';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        const postToDelete = await req.json();
        
        console.log(postToDelete);
        
        deletePost(postToDelete.postID);

        return NextResponse.json({message: 'Post Deleted!'}, { status: 200 });
    } catch (error) {
        console.log(error);
            return NextResponse.json({ error: 'Something went wrong...' }, { status: 400 });
    }

}
