import { connect } from "./db"
import crypto from "crypto"
import {log} from "../index";
import { sqlite3 } from "sqlite3";

export const getMessagesForUser = async (user: string): Promise<string[]> => {
    let db = await connect();

    let messages: string[] = [];

    await db.each(`SELECT data,  (SELECT user FROM Users WHERE id = sender) as sender_name, mac FROM Messages
    WHERE recipient = (
        SELECT id FROM Users WHERE user = '`+user+`'
    );`, (err, row) => {
        if (err) {
            throw new Error(err);
        }
        const nmac = generarateMac(row.data, row.sender_name);

        if (nmac != row.mac) {
            console.log(" message sent by the "+ row.sender_name + " can not be verified or the message is modified")
            log(" message sent by the "+ row.sender_name + " can not be verified or the message is modified")

        }
        else{
            messages.push(row.data + "message sender is: "+row.sender_name+"");
            
            // log("adding msg:"+messages);

        }
      });


    return messages;
    
}

export const saveMessage = async (message: string, recipient: string, sender: string, mac:string) => {
    let db = await connect();
    
    await db.run(`
        INSERT INTO Messages 
            (recipient, data, mac, sender)
        VALUES (
            (SELECT id FROM Users WHERE user = :user),
            :message,
            :mac,
            (SELECT id FROM Users WHERE user = :author)
        )
    `, {
        ":user": recipient,
        ":message": message,
        ":mac": mac,
        ":author": sender
    });
}

export const generarateMac = (message: string, key: string) => {
    const mac = crypto.createHmac("sha256", key).update(message).digest("hex")
    
    return  mac
}