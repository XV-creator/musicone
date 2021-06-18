const Discord = require('discord.js');
const client = new Discord.Client();

const { loadCommands } = require('./utils/loadCommands');
const mongoose = require('mongoose');
const prefix = require('./models/prefix')
mongoose.connect('mongodb+srv://ra3ddb:ra3dhksr@cluster0.8za3t.mongodb.net/7xrnsab', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.login("Nzg5Nzg4Nzg1ODY0NDc0NjM0.X93KIA.t2aYh2qn0c55f_lIIYVOKtnC24Q");

const distube = require('distube');
const { config } = require('process');
const player = new distube(client)
client.player = player
player.on(`playSong`, (message, queue, song) => {
  var e = new Discord.MessageEmbed()
    .setTitle(`Now Playing`)
    .setDescription(`[${song.name}](${song.url}) `)
    .setColor(`GREEN`)
  message.channel.send(e)
})
player.on(`addSong`, (message, queue, song) => {
  var e = new Discord.MessageEmbed()
    .setTitle(`Added To Playlist`)
    .setDescription(`[${song.name}](${song.url}) `)
    .setColor(`RED`)
  message.channel.send(e)
})
player.on('initQueue', queue => {
  queue.autoplay = false;
})
player.on(`finish`, (message, queue, song) => {
  message.channel.send(`voice channel is empty soo im leaving`)
  message.member.voice.channel.leave()
})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
loadCommands(client);

client.on('message', async (message) => {
  if (message.author.bot) return;

  //Getting the data from the model
  const data = await prefix.findOne({
    GuildID: message.guild.id
  });
  const messageArray = message.content.toLocaleLowerCase().split(/ +/);
  const cmd = messageArray[0];
  const args = messageArray.slice(0);



  if (data) {
    const prefix = data.Prefix;
    if (!message.content.startsWith(prefix)) return;
    const commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    if (commandfile) {
      commandfile.run(client, message, args, prefix);
    }
  } else if (!data) {
    const prefix = "$";

    if (!message.content.startsWith(prefix)) return;
    const commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    if (commandfile) {
      commandfile.run(client, message, args, prefix);
    }

  }
})
client.on('ready', () => {
  client.user.setPresence({ activity: { name: 'Ra3d\'s Voice', type: 'LISTENING' }, status: 'dnd' })
  console.log('ready')
  const channel = client.channels.cache.get("826563463279017994");
  if (!channel) return console.error("The channel does not exist!");
  channel.join().then(connection => {
    console.log("Successfully connected.");
  }).catch(e => {
    console.error(e);
  });
})
