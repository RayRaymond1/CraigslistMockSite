import { searchResults, searchResultsNoSubCat } from '@/lib/dbactions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const cat = req.nextUrl.searchParams.get("cat");
        const subCat = req.nextUrl.searchParams.get("subCat");
        let results;
        if(subCat != '*'){
            //console.log("both defined", cat, subCat);
            results = await searchResults(cat, subCat);
        }else {
            //console.log("1 defined", cat);
            results = await searchResultsNoSubCat(cat);
        }

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        if (!postID ) {
            return NextResponse.json({ error: 'Missing or invalid postID' }, { status: 400 });
        } else {
            console.error("getPost ERROR: ", error);
            return NextResponse.json({message: 'Error!', status: 400})
        }
    }

}

