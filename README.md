# ge-spy
An open-source recreation of ge-tracker, built with node and vue/vuetify

## install (dev mode)
0. set up a DB server and import the included ge_spy_db.sql in the "server" folder
1. in "server", copy config-example.js to a new file called config.js and populate the required fields
2. set proxyMode to **TRUE** in config
2. in both frontend and backend, type "npm install" (this will install front and backend dependencies)
3. in one terminal, go to frontend and type "npm run dev"
4. in a second terminal, go to server and type node index.js
5. now navigate to the app via the port in config.js, modifications to frontend reload live
6. to build the new frontend for production use, shut down dev server and run "npm run build", this will generate static artefacts to be placed in the server's public directory
7. to move from dev to prod, change proxymode to **FALSE** in config.js

##install (prod mode)
0. set up a DB server and import the included ge_spy_db.sql in the "server" folder
1. in "server", copy config-example.js to a new file called config.js and populate the required fields
2. set proxyMode to **FALSE** in config
3. run npm install to install dependencies
4. verify that public folder has UI artifacts (index.html and a static folder)
5. run node index.js and navigate to the app in your browser