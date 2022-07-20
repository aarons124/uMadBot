const { readdirSync } = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
require('dotenv').config();

module.exports = async (client) => {
  // Command handler
  const commands = [];

  readdirSync('./Commands').forEach(dir => {
    const command = readdirSync(`./Commands/${dir}`).filter(file => file.endsWith('.js'));
    for (const file of command) {
      const cmd = require(`../Commands/${dir}/${file}`);
      client.commands.set(cmd.data.name, cmd)
      commands.push(cmd.data.toJSON());
      delete require.cache[require.resolve(`../Commands/${dir}/${file}`)]
    }
  });

  // Deploying slash commands
  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

  try {
    console.log('[SLASH] :: Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
      body: commands
    });

    console.log('[SLASH] :: Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(`[SLASH_HANDLER] :: ${error.stack}`);
  } 
}