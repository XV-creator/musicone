const Discord = require(`discord.js`)
const client = new Discord.Client()
const distube = require(`distube`)
const player = new distube(client)

module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send(`:x: Error **${message.author.username}** Please Join a **Voice Channel** So I Can Play Music !`)
    if(!client.player.getQueue(message)) return message.channel.send(`:x: Error **${message.author.username}** No Music Is Playing At The Moment !`)
    let queue = client.player.getQueue(message);
    var q1 = queue.songs.map((song, id) => `**\`${id + 1}\`. ${song.name}** - \`${song.formattedDuration}\`` ).slice(0, 10).join("\n")
    var q2 = queue.songs.map((song, id) => `**\`${id + 1}\`. ${song.name}** - \`${song.formattedDuration}\`` ).slice(10, 20).join("\n")
    var embed = new Discord.MessageEmbed()
    .setTitle(`Song Queue`)
    .setDescription(q1)
    message.channel.send(embed).then(msg => {
    msg.react(`◀`)
    msg.react(`❌`)
    msg.react(`▶`)
    
    
    const leftFilter = (reaction, user) => reaction.emoji.name === `◀` && user.id === message.author.id
    const left = msg.createReactionCollector(leftFilter , {time : 200000})
    
    const deleFilter = (reaction, user) => reaction.emoji.name === `❌` && user.id === message.author.id
    const del = msg.createReactionCollector(deleFilter , {time : 200000})
    
    const rightFilter = (reaction, user) => reaction.emoji.name === `▶` && user.id === message.author.id
    const right = msg.createReactionCollector(rightFilter , {time : 200000})
    
    
    left.on(`collect` , (reaction,user) => {
    var embed = new Discord.MessageEmbed()
    .setDescription(q1)
    msg.edit(embed)
    reaction.users.remove(user.id)
    })
    del.on(`collect` , (reaction,user) => {
    msg.delete()
    reaction.users.remove(user.id)
    })
    right.on(`collect` , (reaction,user) => {
    var embed = new Discord.MessageEmbed()
    .setDescription(q2)
    msg.edit(embed)
    reaction.users.remove(user.id)
    })
    })
    
      

}

module.exports.config = {
    name: "queue",
    aliases: ['q', 'قائمه', 'que']
  }