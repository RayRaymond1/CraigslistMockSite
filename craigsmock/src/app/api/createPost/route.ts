import {getPost} from '@/lib/dbactions';
import { NextRequest, NextResponse } from 'next/server';
import oracledb from 'oracledb';

//realistically we would NEVER define this here but i mean, school project :-)
//nor would we let the website connect to the database as an admin with no restrictions, but i mean school project :-)
const dbLogin = {
    user: 'ADMIN',
    password: 'PennStateRocks123!',
    connectString: '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.us-ashburn-1.oraclecloud.com))(connect_data=(service_name=ge3e960eff1bcbd_e7vmj6vaon0pgohj_low.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))'
};

export async function POST(req: NextRequest, res: NextResponse) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbLogin);
        const postToSave = req.body;
        let query = ''; //update post and postcontents with body.

        let results = await connection.execute(query, {});

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.log(error);
            return NextResponse.json({ error: 'Something went wrong...' }, { status: 400 });
    }

}
