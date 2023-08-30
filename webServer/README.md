# Set up

1. Go to the `./pathToInterviewCode/webServer` folder. Run `npm i` to install all the node modules.
2. Go to the `./webServer/scripts` folder. Give executables permission to the `init_db.sh` file by running `sudo chmod 777 ./init_db.sh`.
3. Go to the root directory of the `webServer` project (Step 1). To run the server, run `npm run dev:db`. This will initialize the database for the first time.
Subsequent running of the web server can be achieved by calling `npm run dev`.