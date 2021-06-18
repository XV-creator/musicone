const Discord = require(`discord.js`)
const client = new Discord.Client()
const distube = require(`distube`)
const player = new distube(client)

module.exports.run = async (client, message, args) => {
  if (!message.member.voice.channel) return message.channel.send(`:x: Error **${message.author.username}** Please Join a **Voice Channel** So I Can Play Music !`)
  const query = args.join(" ")
  if (!query) return message.channel.send(`:x: Error **${message.author.username}** Please Provide Me a **Youtube Video Name/Link** So I Can Play Music !`)
  const vociechannel = message.member.voice.channel
  if (message.member.voice.channel && !query) {
    await message.channel.send(`:x: Error **${message.author.username}** Please Provide Me a **Youtube Video Name/Link** So I Can Play Music !`).then(async me => {
      me.edit(`:x: Error **${message.author.username}** Please Provide Me a **Youtube Video Name/Link** So I Can Play Music !\n ✅ Successfully Joined Your Voice Channel !`)
    })
    await vociechannel.join()
    return
  }
  await client.player.play(message, query)

}

module.exports.config = {
  name: "play",
  aliases: ['شغل', 'p']
}