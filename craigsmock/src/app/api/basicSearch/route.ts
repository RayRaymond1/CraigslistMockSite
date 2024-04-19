import {basicSearch} from '@/lib/dbactions';
import oracledb from 'oracledb';
import { NextRequest, NextResponse } from 'next/server';
//import { NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const cat = req.nextUrl.searchParams.get("cat");

    const subCat = req.nextUrl.searchParams.get("subCat");

    if (!cat || typeof cat !== 'string') {
        console.log('Request:', { cat, subCat });
        return NextResponse.json({ error: 'Missing or invalid cat parameter'}, { status: 400 });
    }

    //console.log('Request:', { cat, subCat });

    const results = await basicSearch(cat, subCat);
    
    //console.log('Response:', { cat, subCat });
    
    //const resultsDisplay = results

    //console.log("inside results object",results);

    return NextResponse.json(results, { status: 200 });
}
