import { connect } from "./db"

export const userExists = async (user: string): Promise<boolean> => {
    let db = await connect();

    let query = "SELECT id FROM Users WHERE user = :user;"
    const result = await db.get(query, {
        ':user': user,
    });
if ( !(result === undefined)){

    return typeof result.id === "number";
}
   return false;
}

export const getUserId = async (user: string): Promise<number> => {
    let db = await connect();

    let result = await db.get(`
        SELECT id FROM Users
        WHERE user = :user;
    `, {
        ":user": user,
    });

    return result;
}

export const getUserPassHash = async (user: string): Promise<string> => {
    let db = await connect();

    let result = await db.get(`
        SELECT hash FROM Users
        WHERE user = :user;
    `, {
        ":user": user,
    });

    return result.hash;
}

export const setUserPassHash = async (user: string, hash: string) => {
    let db = await connect();

    await db.run(`
        INSERT INTO Users
            (user, hash)
        VALUES
            (:user, :hash);
    `, {
        ":user": user,
        ":hash": hash,
    });
}

export const noUsers = async (): Promise<boolean> => {
    let db = await connect();
    let result = await db.get("SELECT COUNT(*) FROM Users;");
    return Promise.resolve(result['COUNT(*)'] === 0);
}

//log file code ...................................

//import { connect } from "./db"
// import * as fs from 'fs';
// import readline from "readline";

// import { noUsers, setUserPassHash, userExists } from "./db";
// import { authenticate, getPassword } from "./session";

// const log = (message: string) => {
//   fs.appendFileSync('log.txt', `${new Date().toUTCString()}: ${message}\n`);
// };

// export const newUser = async (user: string) => {
//     try {
//         if (!noUsers() && !userExists(user)) {
//             throw new Error("User not recognized");
//         }

//         if (!(await authenticate(user))) {
//             throw new Error("Unable to authenticate user");
//         }

//         let newUser = await getNewUsername();
//         let newPassHash = await getPassword();

//         await setUserPassHash(newUser, newPassHash);

//         log(`New user created: ${newUser}`);
//     } catch (error) {
//         console.error("Error ocurred creating a new user.", error);
//         log(`Error creating a new user: ${error}`);
//     }
// }

// const getNewUsername = async (): Promise<string> => {
//     let rl = readline.createInterface(process.stdin, process.stdout);
//     let username: string = await new Promise(resolve => rl.question("Username: ", resolve));
//     return username;
// }