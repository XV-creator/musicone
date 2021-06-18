const Discord = require(`discord.js`)
const client = new Discord.Client()
const distube = require(`distube`)
const player = new distube(client)

module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send(`:x: Error **${message.author.username}** Please Join a **Voice Channel** So I Can Play Music !`)
    if(!client.player.getQueue(message)) return message.channel.send(`:x: Error **${message.author.username}** No Music Is Playing At The Moment !`)
    const repeatMode = client.player.getQueue(message).repeatMode;
    if (repeatMode) {
        client.player.setRepeatMode(message, false);
        return message.channel.send(`Looping Mode : \`OFF\` !`)
    } else {
        client.player.setRepeatMode(message, true);
        return message.channel.send(`Looping Mode : \`ON\` !`)
    }
}

module.exports.config = {
    name: "loop",
    aliases: ['تكرار', 'l' , 'lo']
  }