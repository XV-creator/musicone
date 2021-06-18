const Discord = require(`discord.js`)
const client = new Discord.Client()
const distube = require(`distube`)
const player = new distube(client)

module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send(`:x: Error **${message.author.username}** Please Join a **Voice Channel** So I Can Play Music !`)
    if(!client.player.getQueue(message)) return message.channel.send(`:x: Error **${message.author.username}** No Music Is Playing At The Moment !`)
    if (isNaN(args[0]) || 100 < args[0] || args[0] <= 0) return message.channel.send(`:x: Error **${message.author.username}** Please Enter a **Number** Between \`[ 1 - 100 ]\` So I Can Change The Volume !`)
    if (message.content.includes('-') || message.content.includes('+') || message.content.includes(',') || message.content.includes('.')) return message.channel.send(`:x: Error **${message.author.username}** Please Enter a **Valid Number** Between \`[ 1 - 100 ]\` So I Can Change The Volume !`)
    await client.player.setVolume(message, parseInt(args[0]))
    await message.channel.send(`Done Changing The Volume To : \`${args.join(" ")}%\` !`)
}

module.exports.config = {
    name: "volume",
    aliases: ['v', 'الصوت', 'vol']
  }