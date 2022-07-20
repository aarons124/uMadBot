const { readdirSync } = require('node:fs');

module.exports = (client) => {
  
  readdirSync('./Events').forEach(folder => {
    const events = readdirSync(`./Events/${folder}`).filter(file => file.endsWith('.js'))
    for (const file of events) {
      const event = require(`../../Events/${folder}/${file}`);
      if (event.once) {
        client.once(event.name, (...args) => event.run(...args))
      } else {
        client.on(event.name, (...args) => event.run(...args));
      }
      delete require.cache[require.resolve(`../../Events/${folder}/${file}`)];
    }
  });
}