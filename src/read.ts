import { getMessagesForUser, userExists } from "./db";
import { authenticate } from "./session";
import {log} from "./index";

export async function readMessages(user: string) {
    try {
        if (!await userExists(user)) {
            log(user +" user does not exist for reading a message ");
            throw new Error("User does not exist");
            
        }

        if (!await authenticate(user)) {
            log(user+ " can not read message, as can not be authenticated ");
            throw new Error("Unable to authenticate");
        }
        
        await getMessagesForUser(user).then((messages) => {
            // console.log(messages)
            // messages.forEach((e: string) => console.log(e, "\n"));
            messages.forEach((e: string) => {
                console.log(e.toString(), "\n");
                log(user +" user read the message successfully ");
        });
        });
        
    } catch (error) {
        console.error("Error occured during reading.", error);
    }
}