const Discord = require(`discord.js`)
const client = new Discord.Client()
const distube = require(`distube`)
const player = new distube(client)

module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send(`:x: Error **${message.author.username}** Please Join a **Voice Channel** So I Can Play Music !`)
    if(!client.player.getQueue(message)) return message.channel.send(`:x: Error **${message.author.username}** No Music Is Playing At The Moment !`)
    await client.player.stop(message)
    await message.channel.send(`Done Stopping Playing Music And The Queue Has Been Cleared ! \nIt's Time to Go to bed !`).then(se => {
        const channel = client.channels.cache.get("826563463279017994");
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
             console.log("Successfully connected.");
          }).catch(e => {
            console.error(e);
          });
    })
}

module.exports.config = {
    name: "stop",
    aliases: ['وقف', 's']
  }
