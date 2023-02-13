import readline from "readline";
import { saveMessage, userExists, getMessagesForUser } from "./db";
import {log} from "./index";
import { authenticate } from "./session";


export const sendMessage = async (sender: string, user: string) => {
    try {
        if (!await userExists(sender)) {
            log(" can not send message because User " +sender+ " does not exist "  );
            throw new Error("sender account does not exist");
        }
        if (!await authenticate(sender)) {
           log("Unable to authenticate sender " + sender);
            throw new Error("Unable to authenticate sender");
        }

        if (!await userExists(user)) {
            log(" cant send message because reciever " +user+" does not exist " );
            throw new Error("Destination user does not exist");
        }

        getUserMessage().then(async (message) => {
            await saveMessage(message, user);
        });
        log(" Message sent successfully to the user " + user + " from user " +sender);
  
    } catch (error) {
        //log(" cant send message because User does not exist " );
        console.error("Error occured .", error);
    }
}

const getUserMessage = async (): Promise<string> => {
    let rl = readline.createInterface(process.stdin, process.stdout);
    let message: string = await new Promise(resolve => rl.question("Enter your message: ", resolve));
    rl.close();
    return message;
}

const getUsername = async (): Promise<string> => {
    let rl = readline.createInterface(process.stdin, process.stdout);
    let message: string = await new Promise(resolve => rl.question("Enter your name: ", resolve));
    rl.close();
    return message;
}


// const username = prompt("Enter your username: ");
// const password = prompt("Enter your password: ");
  
//   if (username ===  let newUser = await getNewUsername();
//         let newPassHash = await getPassword(); && password === )

//         let newUser = await getNewUsername();
//         let newPassHash = await getPassword();

//changed code

// export const sendMessage = async () => {
//     try {
//     const sender = await getSender();
//     const password = await getPassword();
//     if (!await userExists(user)) {
//         throw new Error("Invalid username or password");
//     }

//     const recipient = await getRecipient();

//     if (!await userExists(recipient)) {
//         throw new Error("Destination user does not exist");
//     }

//     const message = await getMessagesForUser(messages);
//     await saveMessage(message, recipient, sender);
//     log(`Message sent successfully from ${sender} to ${recipient}`);
// } catch (error) {
//     log(`Error occured: ${error.message}`);
//     console.error("Error occured", error);
// }
// };

// const getSender = async (): Promise<string> => {
// const rl = readline.createInterface(process.stdin, process.stdout);
// const sender = await new Promise(resolve => rl.question("Enter your username: ", resolve));
// rl.close();
// return user;
// };

// const getPassword = async (): Promise<string> => {
// const rl = readline.createInterface(process.stdin, process.stdout);
// const password = await new Promise(resolve => rl.question("Enter your password: ", resolve));
// rl.close();
// return password;
// };

// const getRecipient = async (): Promise<string> => {
// const rl = readline.createInterface(process.stdin, process.stdout);
// const recipient = await new Promise(resolve => rl.question("Enter recipient username: ", resolve));
// rl.close();
// return recipient;
// };




// const getPassword = async (): Promise<string> => {
//     const rl = readline.createInterface(process.stdin, process.stdout);
//     const password = await new Promise(resolve => rl.question("Enter your password: ", resolve));
//     rl.close();
//     return password;
//     };
    
//     const getRecipient = async (): Promise<string> => {
//     const rl = readline.createInterface(process.stdin, process.stdout);
//     const recipient = await new Promise(resolve => rl.question("Enter recipient username: ", resolve));
//     rl.close();
//     return recipient;
//     };