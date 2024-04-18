import oracledb from 'oracledb';

//realistically we would NEVER define this here but i mean, school project :-)
//nor would we let the website connect to the database as an admin with no restrictions, but i mean school project :-)
const dbLogin = {
    user: 'ADMIN',
    password: 'PennStateRocks123!',
    connectString: 'adb.us-ashburn-1.oraclecloud.com:1522/ge3e960eff1bcbd_e7vmj6vaon0pgohj_low.adb.oraclecloud.com'
};

//searchresults function
export default async function basicSearch(cat, subCat){
    let connection;
    try{
        connection = await oracledb.getConnection(dbLogin);

        const query = 'SELECT * FROM Posts WHERE CategoryID= :cat AND SubCategoryID= :subCat';

        const results = await connection.execute(query, {cat: cat, subCat: subCat});

        // Convert rows to JSON
        const jsonResults = results.rows.map(row => {
            let obj = {};
            results.metaData.forEach((item, index) => {
                obj[item.name] = row[index];
            });
            return obj;
        });

        console.log(jsonResults); // This will print the results to the console

        return jsonResults;

    }catch (error) {
        console.error('SQL ERROR: ', error);
    } finally {
       if(connection){
        try{
            await connection.close();
        }catch (error){
            console.error("SQL DISCCONECT ERROR: ", error);
        }

    } 
}

module.exports = basicSearch;

}