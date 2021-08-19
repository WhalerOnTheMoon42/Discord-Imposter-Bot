
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILD_MEMBERS] });
const config = require("./config.json");

// This section runs whenever someone joins the server (server = guild in the Discord code)
client.on("guildMemberAdd", (member) => {
  // If the new member is you, the function ends without kicking you
  if (member.user.id === config.VERIFIED_ID) return;

  // If the new members username is the same as yours, this will kick them from the server
  if (member.user.username === config.UNIQUE_USERNAME) {
    console.log("Impersonator Detected");
    member.kick("Impersonation")
    // Logs the outcome of the kick on the server the code is running on (not on Discord)
    .then((success, failure) => {
      if (success) console.log(`Successfully kicked imposter at \n${new Date().toString()}`);
      if (failure) console.log(failure);
    });
  }
});

// This connects this bot to your Discord server and logs the starting date & time
console.log(`Starting Imposter Bot at ${new Date().toString()}`);
client.login(config.BOT_TOKEN);
