import {getPost} from '@/lib/dbactions';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest, res: NextResponse) {
    const postID = req.nextUrl.searchParams.get("postID");



    const results = await getPost(postID);
    

    return NextResponse.json(results, { status: 200 });
}
