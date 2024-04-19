import oracledb from 'oracledb';

//realistically we would NEVER define this here but i mean, school project :-)
//nor would we let the website connect to the database as an admin with no restrictions, but i mean school project :-)
const dbLogin = {
    user: 'ADMIN',
    password: 'PennStateRocks123!',
    connectString: '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.us-ashburn-1.oraclecloud.com))(connect_data=(service_name=ge3e960eff1bcbd_e7vmj6vaon0pgohj_low.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))'
};

//searchresults function
export async function basicSearch(cat, subCat) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbLogin);
        let query, results;
        if (subCat === "*") {
            query = 'SELECT * FROM Posts WHERE CategoryID= :cat';
            results = await connection.execute(query, { cat: cat });
        } else {
            query = 'SELECT * FROM Posts WHERE CategoryID= :cat AND SubCategoryID= :subCat';
            results = await connection.execute(query, { cat: cat, subCat: subCat });
        }


        // Convert rows to JSON
        const jsonResults = results.rows.map(row => {
            let obj = {};
            results.metaData.forEach((item, index) => {
                obj[item.name] = row[index];
            });
            return obj;
        });

        //console.log(jsonResults); // This will print the results to the console

        return jsonResults;

    } catch (error) {
        console.error('SQL ERROR: ', error);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error("SQL DISCCONECT ERROR: ", error);
            }

        }
    }

    module.exports = basicSearch;

}

export async function getPost(postID) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbLogin);
        let query, results;
        query = 'SELECT * FROM PostContents WHERE PostID= :postID';
        results = await connection.execute(query, { postID: postID });



        // Convert rows to JSON
        const jsonResults = results.rows.map(row => {
            let obj = {};
            results.metaData.forEach((item, index) => {
                obj[item.name] = row[index];
            });
            return obj;
        });

        return jsonResults;

    } catch (error) {
        console.error('SQL ERROR: ', error);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error("SQL DISCCONECT ERROR: ", error);
            }

        }
    }

    module.exports = getPost;
}