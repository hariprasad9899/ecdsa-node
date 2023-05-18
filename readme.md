## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses.

I have incorporated the public key cryptography using the Ethereum Cryptography library(@1.1.2) on both client and server side.
In the backend, the public key is recovered from the signature sent from the client.

I have also added password verification, when making transaction. For all the styles and modals (for password verification), I have used Bootstrap library.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### Accounts

There are three accounts added manually in the client. In addition to the transaction functinality, I have also added password for safe transactions. Please find the respective password for three accounts below

| Account Name | Account Address                          | Password   |
| ------------ | ---------------------------------------- | ---------- |
| hari         | F1F0499926D9B9A8B7B1CAF938C8EC1E93F56DF2 | 1234@hari  |
| priya        | D609349F29CB6821C88061E42AC1D6EA97EE0820 | 1234@priya |
| pooja        | 8001653568EC653FEEB27F234D4B81C59EDBC41B | 1234@pooja |
