const Discord = require(`discord.js`)
const client = new Discord.Client()
const distube = require(`distube`)
const player = new distube(client)

module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send(`:x: Error **${message.author.username}** Please Join a **Voice Channel** So I Can Play Music !`)
    if(!client.player.getQueue(message)) return message.channel.send(`:x: Error **${message.author.username}** No Music Is Playing At The Moment !`)
    await client.player.skip(message)
    await message.channel.send(`Done Skipping To The Next Song !`)
}

module.exports.config = {
    name: "skip",
    aliases: ['sk', 'تخطي', 'next', 'التالي']
  }