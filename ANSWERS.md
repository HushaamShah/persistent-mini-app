How To Run:

    node: 26.2.0
    commands:
        1. npm install 
        2. node initDB.js (to initialize sqlite DB)
        3. node server.js

Stack Choice:

    backend: nodeJS, simple CRUD app no need to for frameworks, frameworks would be overkill, no expressJS because just wanted to try using http only.
    frontend: basic HTML and JS served from the backend, any modern frameworks would be overkill

Extra Feature:

    Added websockets so multiple users can edit a note at the same time on the same network.

Edge Case:

    Not broadcasting a web socket message to the client who sent it and only sending to the clients who are connected. Without it the one who sent the message would get his own message back. LINE: 114 (server.js)
    
AI usage:

    Did use any agent for coding, All these code below were problems/something i forgot ("How to" question) and googled and used the examples Gemini gave on the search page and edited to my use case

    Websocket code: Line 99 - LINE 119: (example by gemini search were more verbose, removed the extra code i didnt needed)

    Middleware code: Middleware code was copied from the examples from gemini, i changed and used it to parse JSON. 
    
Copy Pasting:

    code in initDB.js was copied from nodeJS docs (https://nodejs.org/api/sqlite.html#sqlite)
    also big help was taken from MDN docs and GeeksforGeeks

Honest gaps: 

    1. Bugs when users add/update/delete notes at the same time (one user can delete a note that other user is still typing, 2nd user wont know untill refresh) - Use websockets to send add/delete/update info to others users and handle these cases 
    2. Did not handle HTTP methods (GET, PUT etc) properly
    3. Very basic UI