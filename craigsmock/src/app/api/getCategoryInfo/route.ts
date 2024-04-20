import {getSubCategories} from '@/lib/dbactions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const categoryID = req.nextUrl.searchParams.get("cat");
       // console.log("categoryID passed ", categoryID);

        let results = await getSubCategories(categoryID);

       // console.log("subCategories result: ", results);

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.log("API ERROR: ", error);
            return NextResponse.json({ error: 'Something went wrong...' }, { status: 400 });
    }

}