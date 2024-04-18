import basicSearch from '@/lib/dbactions';
import oracledb from 'oracledb';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const cat = req.query?.cat;

    const subCat = req.query?.subCat;

    if (!cat || typeof cat !== 'string') {
        console.log('Request:', { cat, subCat });
        return NextResponse.json({ error: 'Missing or invalid cat parameter'}, { status: 400 })
    }

    console.log('Request:', { cat, subCat });

    basicSearch(cat, subCat);
    
    console.log('Response:', { cat, subCat });
    
    return res.status(200).json({ message: 'hello!' });}
