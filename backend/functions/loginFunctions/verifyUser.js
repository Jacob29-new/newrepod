import { db } from "../registerFunctions/databaseHandler.js"
import argon2 from 'argon2';


async function verifyUser({username, email, password}) {

    try {
        //retrieves encrypted password from database

        let query, params;

        const cleanUsername = username?.trim();
        const cleanEmail = email?.trim();
        
        if (cleanUsername) {
            query = `SELECT password FROM users WHERE username = ?`;
            params = [cleanUsername];
        } else if (cleanEmail) {
            query = `SELECT password FROM users WHERE email = ?`;
            params = [cleanEmail];
        } else {
            throw new Error("Must provide either username or email.");
        }
        
        console.log(`Executing query with: ${JSON.stringify(params)}`);
        
        const prepped = db.prepare(query);
        const result = prepped.get(params[0]);

        if(!result) {
            console.log("couldnt find user in database ")
            console.log("signing in failed")
            return {state: false, message: "user doesnt exist"}
        }  

        const encryptedPassword = result.password

        //compares encrypted password to inputed password
        const comparedPassword = await argon2.verify(encryptedPassword, password)
        if(!comparedPassword) {
            console.log("Inputed password was incorrect")
            return {state: false, message: "password was incorrect"}
        }

        //sends true if user was verified succesfully
        return {state:true, message: "user was verified succesfuly"}


    }catch(error) {
        console.error("ERROR during fetching from database", error)
        return { state: false, message: "Fetching from database failed" }
    }

}

export default verifyUser
