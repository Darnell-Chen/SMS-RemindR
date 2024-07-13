# SMS RemindR

SMS RemindR is a web app that allows you to schedule notifications via SMS, Email, and Discord. Built using the MERN stack, it features both a backend and frontend framework to ensure seamless operation and user experience.

**Features:** 

- Multi-Platform Notifications: Schedule reminders via SMS, Email, and Discord.

- Responsive Frontend: Developed with ReactJS for a simplistic yet responsive user interface.

- Robust Backend: Utilizes NodeJS for server initialization and MongoDB for storing user information.

- Secure Authentication: Employs JWT for a streamlined and secure authentication process.

<br>

**NOTE :**  This app is made as a project, it is by no means ready for deployment or production

## Getting Started

The app consists of both a backend and frontend folder component. The front-end folder is our 'react-app' folder while 'server' holds our backend server as implied.

1. To get started, we will need to install packages on both the backend and potentially the front-end folder.
Simply cd to the backend and frontend folders and type `npm install` to do so.

2. create a dotenv file in the backend folder *./server* and create a dotenv file. In this file, we will store our secret keys in the following format:

```
JWT_SECRET_KEY = mySecretKey

JWT_REFRESH_KEY = myRefreshKey

MONGODB_URI = mongodb+srv://<cluster_name>:<password>@app-name.xozoopn.mongodb.net/?retryWrites=true&w=majority&appName=<app-name>

DISCORD_TOKEN = ABCDefg123456abc.ABCv123.abcABCabcABCabc123456789



HAVE_TWILIO = false

TWILIO_ACCOUNT_SID = ACabc1234567890

TWILIO_AUTH_TOKEN = abc1234567890

TWILIO_FROM_NUMBER = <your toll free number>




SENDGRID_FROM_EMAIL = <email you're sending from>

SENDGRID_API_KEY = SG.abcabc1234567890abcabc
```

3. In order to use the Discord bot, you will need to have a Discord account or create one. You can then create a Discord bot to recieve a Discord Token. Documentation from [DiscordJS](https://discord.js.org/) can help you get started.
<br>
<br>

You will also need to create a [Twilio](https://www.twilio.com/en-us) and [SendGrid](https://sendgrid.com/en-us) account in order to use the SMS and Email features. 

Twilio is a *paid* service, meaning you will need to buy a number in order to send messages to others. On the other hand, SendGrid allows 100 free emails per day on the Free Tier.

<br>

If you do not plan on using twilio, set `HAVE_TWILIO = false`. If you do, then set the value to `true`.

<br>
<br>
And you will also need a MongoDB account (self-explanatory).

## Starting App
There will be two short sequences of operation for the frontend and backend to start the program.

In the front end directory:
- `npm run build` to optimize and prep our react app
- `npm start` to launch the app after the optimization build is finished

<br>

In the backend directory:
- type `node index` in the terminal to boot up the server

Be wary of any console logs that may warn of deprecated builds/issues.

## Authors

made by [Darnell Chen](https://github.com/Darnell-Chen) and [Ardoine Docteur](https://github.com/ArdoineDocteur)


