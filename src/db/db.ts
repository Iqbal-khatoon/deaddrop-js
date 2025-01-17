// import { createConection } from "typeorm";
import sqlite3 from "sqlite3";
import { existsSync } from "fs";
import { exit } from "process";
import { Database, open } from "sqlite";

const schema: string = `
CREATE TABLE Users (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    user TINYTEXT NOT NULL,
    hash TEXT NOT NULL
);

CREATE TABLE Messages (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    sender INTEGER NOT NULL REFERENCES Users(id),
    recipient INTEGER NOT NULL REFERENCES Users(id),
    data TEXT NOT NULL,
    mac TEXT  NOt NUll
);
CREATE TRIGGER trig_mac
    BEFORE UPDATE ON MESSAGES
BEGIN
    SELECT
        CASE
    WHEN NEW.mac != OLD.mac THEN
        RAISE (ABORT, "MAC may not be change")
        END;
END;

`


export const connect = async (): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
    try {
        let mustInitDb = false;
        if (!existsSync("dd.db")) {
            mustInitDb = true;
        }
        // let db= await createConection({
        //     type:'sqllite',
        //     datebase: "dd.db",
        //     entites:schema,
        //     synchronize : true
        // });
        return await open({
            filename: "dd.db",
            driver: sqlite3.Database,
        }).then(async (db) => {
            if (mustInitDb) {
                await db.exec(schema);
            }
            return db
        }).then(async (db) => await db);

    } catch (error) {
        console.error(error)
        exit();
    }
}
