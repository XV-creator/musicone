const Discord = require(`discord.js`)
const client = new Discord.Client()
const distube = require(`distube`)
const player = new distube(client)

module.exports.run = async (client, message, args , prefix) => {
  let help = new Discord.MessageEmbed()
  .setAuthor(message.author.username , message.author.displayAvatarURL({dynamic : true}))
  .setTitle(`Music Bot`)
  .setTimestamp()
  .setFooter(`Developed By : Rá3d` , client.user.displayAvatarURL({dynamic : true}))
  .addField(`Music Commands`, `\`${prefix}play\` ,\`${prefix}stop\` ,\`${prefix}skip\` ,\`${prefix}stop\` ,\`${prefix}queue\` ,\`${prefix}volume\` ,\`${prefix}loop\``)
  .addField(`Owners Commands`, `\`${prefix}setname\` ,\`${prefix}setavatar\` ,\`${prefix}setprefix\``)
  message.channel.send(help);
}

module.exports.config = {
  name: "help",
  aliases: ['مساعده', 'h', 'he']
}