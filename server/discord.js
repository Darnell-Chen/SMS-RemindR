require('dotenv').config();

/************************ NOTE ******************************************/
// documentation for discordJS: https://discordjs.guide/#before-you-begin


// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);


// documentation for sending message: https://discordjs.guide/popular-topics/faq.html#how-do-i-send-a-message-to-a-specific-channel
const sendDiscordMessage = (userID, message) => {

    // note: userID has to be strictly a string as per documentation
    client.users.send(userID, message);
}

module.exports = {client, sendDiscordMessage};

