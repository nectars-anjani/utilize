require('dotenv').config();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const { nextTick } = require('process');

const SCOPES= ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH='token.json';

const getNewToken=(oAuth2Client)=>{
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        include_granted_scopes: true
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            console.log("Token",token,TOKEN_PATH);
          if (err) return console.error('Error while trying to retrieve access token', err);
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
            next();
          });
        //   callback(oAuth2Client);
        });
      });
}
module.exports= {
    authorize:(req,res,next)=>{
        try{
            const ruris=["http://localhost:4000/login","http://localhost:4000/spreadsheet","http://localhost:4000/spreadsheet/update","http://localhost:4000"];
            console.log("1");
            const client_id=process.env.CLIENT_ID;
            const client_secret=process.env.CLIENT_SECRET;
            const redirect_uris=process.env.REDIRECT_URIS;
            const redirect_uris2=process.env.REDIRECT_URIS2;
            const oAuth2Client = new google.auth.OAuth2(client_id, client_secret,ruris[3]);
            console.log(redirect_uris)
            fs.readFile(TOKEN_PATH, (err, token) => {
                if (err) return getNewToken(oAuth2Client);
                console.log("Tokn",token)
                oAuth2Client.setCredentials(JSON.parse(token));
                console.log("3");
                next();
               // callback(oAuth2Client);
              });
             
        }catch(err){
            console.log("Error in authoprize",err);
        }
   
}}