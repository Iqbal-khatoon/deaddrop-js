#  deaddrop-js

A deaddrop utility written in Typescript. Put files in a database behind a password to be retrieved at a later date.

This is a part of the University of Wyoming's Secure Software Design Course (Spring 2023). This is the base repository to be forked and updated for various assignments. Alternative language versions are available in:
- [Go](https://github.com/andey-robins/deaddrop-go)
- [Rust](https://github.com/andey-robins/deaddrop-rs)

## Versioning

`deaddrop-js` is built with:
- node v18.13.0

## Usage

`npm run build && node dist/index.js --help` for instructions

Then run `node dist/index.js --new --user <username here>` and you will be prompted to create the initial password.

## Database

Data gets stored into the local database file dd.db. This file will not by synched to git repos. Delete this file if you don't set up a user properly on the first go

## Logging Strategy
In the index.ts file exported a function called "log". When called with a string argument, the "log" function appends a formatted message to a file called "log.txt" using the "fs" module of Node.js. The formatted message includes the current date and time in UTC and the string passed as the argument to the function.

Before calling log in any file it was imported the using the line: " import {log} from "./index";:" 

In new.ts log function was called for creating the log when:

1/ the new user was created.

2/ error occurred while creating the user.

In read.ts log function was called for creating the log when:

1/ message read successfully.

2/ unable to read the message because user does not exist.

3/ unable to read the message because reader is not authenticated.


In send.ts log function was called for creating the log when:

1/ message can not be sent becausse user does not exist.

2/ message can not be sent because sender is not authenticated.

3/ message can not be sent because the reciever does not exist.

4/ message sent successfully.

## Mitigation

Existing system was changed in a way that before sending a message sender should be authenticated. So to ensure that only the user who is part of the system and is genuine can send the message. For that i changed the command of sending the message as:

`node dist/index.js --send --from user --to`

This change was made into the file index.ts, Where the sender was validated.

Then in the send.ts file, changed the sendMessage function. Sender was added as a parameter. Inside the function it was checked if the sender exixts and if it exists then password is asked before sending the message.