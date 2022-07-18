const { readdirSync } = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

module.exports = async (client) => {
  
  const commands = [];

  readdirSync('./Commands');
}