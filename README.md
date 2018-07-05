# ge-spy
An open-source recreation of ge-tracker, built with node and vue/vuetify

## install (dev mode)
1. set up a DB server and import the included ge_spy_db.sql in the "server" folder
2. in "server", copy config-example.js to a new file called config.js and populate the required fields
3. set proxyMode to **TRUE** in config
4. in both frontend and backend, type "npm install" (this will install front and backend dependencies)
5. in one terminal, go to frontend and type "npm run dev"
6. in a second terminal, go to server and type npm start
7. now navigate to the app via the port in config.js, modifications to frontend reload live
8. to build the new frontend for production use, shut down dev server and run "npm run build", this will generate static artefacts to be placed in the server's public directory
9. to move from dev to prod, change proxymode to **FALSE** in config.js

## install (prod mode)
1. set up a DB server and import the included ge_spy_db.sql in the "server" folder
2. in "server", copy config-example.js to a new file called config.js and populate the required fields
3. set proxyMode to **FALSE** in config
4. run npm install to install dependencies
5. verify that public folder has UI artifacts (index.html and a static folder)
6. run npm start and navigate to the app in your browser