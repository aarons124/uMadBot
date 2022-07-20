const { BaseInteraction } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  once: false,

  run: (interaction) => {
    if (!interaction.isCommand()) return;
    
  },
};
