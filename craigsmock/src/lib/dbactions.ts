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
            query = `SELECT * FROM Posts WHERE CategoryID= :cat`;
            results = await connection.execute(query, { cat: cat });
        } else {
            query = `SELECT * FROM Posts WHERE CategoryID= :cat AND SubCategoryID= :subCat`;
            results = await connection.execute(query, { cat: cat, subCat: subCat });
        }


        //convert rows to a JSON object
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

}

export async function getPost(postID){
    let connection;
    try {
        connection = await oracledb.getConnection(dbLogin);
           // Query to get post information
        let query = `SELECT posts.title,
                categories.category,
                subcategories.subcategory,
                posts.usePhoneNumber,
                posts.phoneCallOK,
                posts.phoneTextOk,
                posts.phoneNumber,
                posts.email,
                posts.address,
                posts.postdate,
                postcontents.postid,
                categories.categoryID,
                subcategories.subcategoryID,
                postcontents.posttext
            FROM posts
            JOIN postcontents ON posts.postID = postcontents.postID
            JOIN subcategories ON posts.subcategoryid = subcategories.subcategoryid
            JOIN categories ON subcategories.categoryid = categories.categoryid
            WHERE posts.postID = :postID `;
       let result = await connection.execute(query, { postID: postID });

       oracledb.fetchAsString = [oracledb.CLOB];

       // Extracting CLOB data separately
       let postTextResult = await connection.execute(
           `SELECT posttext FROM postcontents WHERE postid = :postID`, 
           { postID: postID }
       );
       let postText = postTextResult.rows[0][0];

       // Build JSON result object
       let jsonResult = {
        title: result.rows[0][0],
        category: result.rows[0][1],
        subcategory: result.rows[0][2],
        usePhoneNumber: result.rows[0][3],
        phoneCallOK: result.rows[0][4],
        phoneTextOk: result.rows[0][5],
        phoneNumber: result.rows[0][6],
        email: result.rows[0][7],
        address: result.rows[0][8],
        postdate: result.rows[0][9],
        postID: result.rows[0][10],
        categoryID: result.rows[0][11],
        subCategoryID: result.rows[0][12],
        postText: postText
    };

       //console.log(jsonResult);

        return jsonResult;

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
}


export async function getSubCategories(categoryID){
    let connection;
        try {
        connection = await oracledb.getConnection(dbLogin);
        let query = `SELECT subcategoryid, subcategory FROM subcategories WHERE categoryid = :categoryID`; 

        let results = await connection.execute(query, { categoryID: categoryID});


        
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
}

export async function createPost(postToSave) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbLogin);
        //crazy how i find out about binds now, i love security!
        let sql = `INSERT INTO POSTS
            (TITLE, 
            USERID,
            CATEGORYID, 
            SUBCATEGORYID, 
            USEEMAILRELAY, 
            USEPHONENUMBER, 
            PHONECALLOK, 
            PHONETEXTOK, 
            PHONENUMBER, 
            PHONEEXTENSION, 
            PHONECONTACTNAME, 
            ADDRESS, 
            POSTDATE, 
            HASIMG)
                VALUES 
                (:title, 
                    :userId, 
                    :categoryId, 
                    :subCategoryId, 
                    :useEmailRelay, 
                    :usePhoneNumber, 
                    :phoneCallOk, 
                    :phoneTextOk, 
                    :phoneNumber, 
                    :phoneExtension, 
                    :phoneContactName, 
                    :address, 
                    SYSDATE, 
                    :hasImg)
                    RETURNING POSTID INTO :postId`;


        let binds = {
            title: postToSave.title,
            userId: null,
            categoryId: postToSave.category,
            subCategoryId: postToSave.subCategory,
            useEmailRelay: 0,
            usePhoneNumber: Number(postToSave.phoneNumberOk),
            phoneCallOk: Number(postToSave.phoneCallOk),
            phoneTextOk: Number(postToSave.phoneTextOk),
            phoneNumber: postToSave.phoneNumber,
            phoneExtension: null,
            phoneContactName: null,
            address: postToSave.address,
            hasImg: 0,
            postId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
        };


        let result = await connection.execute(sql, binds, { autoCommit: true });

        let postId = result.outBinds.postId[0];


        let sqlPostContents = `INSERT INTO POSTCONTENTS (POSTID, POSTTEXT, IMAGE1, IMAGE2, IMAGE3, IMAGE4)
        VALUES (:postId, :postText, EMPTY_BLOB(), EMPTY_BLOB(), EMPTY_BLOB(), EMPTY_BLOB())`;

        let bindsPostContents = {
            postId: postId,
            postText: postToSave.description
        };

        await connection.execute(sqlPostContents, bindsPostContents, { autoCommit: true });

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
}

export async function deletePost(postID) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbLogin);

        let bindsContent = {
            postID: postID
        };

        let postsContentsQuery = `DELETE FROM postcontents WHERE postID = :postID`;

        await connection.execute(postsContentsQuery, bindsContent, { autoCommit: true })



        let postsQuery = `DELETE FROM posts WHERE postID = :postID`;
        
        let binds = {
            postID: postID
        };

        
        await connection.execute(postsQuery, binds, { autoCommit: true })




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
}

export async function updatePost(postToUpdate) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbLogin);

        let sql = `UPDATE POSTS
                   SET TITLE = :title,
                       CATEGORYID = :categoryId,
                       SUBCATEGORYID = :subCategoryId,
                       USEPHONENUMBER = :usePhoneNumber,
                       PHONECALLOK = :phoneCallOk,
                       PHONETEXTOK = :phoneTextOk,
                       PHONENUMBER = :phoneNumber,
                       ADDRESS = :address
                   WHERE POSTID = :postId`;

        let binds = {
            title: postToUpdate.title,
            categoryId: postToUpdate.category,
            subCategoryId: postToUpdate.subCategory,
            usePhoneNumber: postToUpdate.phoneNumberOk? 1 : 0,
            phoneCallOk: postToUpdate.phoneCallOk? 1 : 0,
            phoneTextOk: postToUpdate.phoneTextOk? 1 : 0,
            phoneNumber: postToUpdate.phoneNumber,
            address: postToUpdate.address,
            postId: postToUpdate.postID
        };

        await connection.execute(sql, binds, { autoCommit: true });

        let sqlPostContents = `UPDATE POSTCONTENTS
                               SET POSTTEXT = :postText
                               WHERE POSTID = :postId`;

        let bindsPostContents = {
            postText: postToUpdate.description,
            postId: postToUpdate.postID
        };

        await connection.execute(sqlPostContents, bindsPostContents, { autoCommit: true });

    } catch (error) {
        console.error('SQL ERROR: ', error);
        throw error;

    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error("SQL DISCCONECT ERROR: ", error);
            }
        }
    }
}


export async function searchResults(cat, subCat) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbLogin);
        
        let catQuery = `SELECT category FROM categories WHERE categoryid = :category`;

        let binds = {
            category : cat
        }

        let catResult = await connection.execute(catQuery, binds);

        let subCatQuery = `SELECT subcategory FROM subcategories WHERE subcategoryid = :subcategory`;


        let subCatbinds = {
            subcategory : subCat
        }

        let subCatResult = await connection.execute(subCatQuery, subCatbinds);
        
        let jsonResult = {
            cat: catResult.rows[0][0],
            subCat : subCatResult.rows[0][0]
        };

        return jsonResult

    } catch (error) {
        console.error('SQL ERROR: ', error);
        throw error;

    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error("SQL DISCCONECT ERROR: ", error);
            }
        }
    }
}

export async function searchResultsNoSubCat(cat) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbLogin);
        
        let catQuery = `SELECT category FROM categories WHERE categoryid = :cat`;
        console.log("sql cat", cat);
        let binds = {
            cat : cat
        }

        let catResult = await connection.execute(catQuery, binds);

        
        let jsonResult = {
            cat: catResult.rows[0][0],
        };

        return jsonResult

    } catch (error) {
        console.error('SQL ERROR: ', error);
        throw error;

    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error("SQL DISCCONECT ERROR: ", error);
            }
        }
    }
}