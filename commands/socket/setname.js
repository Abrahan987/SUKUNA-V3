export default {
  command: ['setbotname', 'setname'],
  category: 'socket',
  run: async (client, m, args, usedPrefix, command) => {
    const idBot = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = global.db.data.settings[idBot]
    const isOwner2 = [idBot, ...(config.owner ? [config.owner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(m.sender)
    if (!isOwner2) return m.reply(mess.socket)
    const value = args.join(' ').trim()
    if (!value) return m.reply(`𖦹 𝙳𝚎𝚋𝚎𝚜 𝚎𝚜𝚌𝚛𝚒𝚋𝚒𝚛 𝚞𝚗 𝚗𝚘𝚖𝚋𝚛𝚎 𝚌𝚘𝚛𝚝𝚘 𝚢 𝚞𝚗𝚘 𝚕𝚊𝚛𝚐𝚘 𝚟𝚊𝚕𝚒𝚍𝚘.\n> Ejemplo: *${usedPrefix + command} Sherry / Sherry Barnet*`)
    const formatted = value.replace(/\s*\/\s*/g, '/')
    let [short, long] = formatted.includes('/') ? formatted.split('/') : [value, value]
    if (!short || !long) return m.reply('✎ 𝙷𝚊𝚣𝚕𝚘 𝚊𝚜𝚒 𝚗𝚘𝚖𝚋𝚛𝚎 𝚌𝚘𝚛𝚝𝚘 / 𝙽𝚘𝚖𝚋𝚛𝚎 𝚕𝚊𝚛𝚐𝚘')
    if (/\s/.test(short)) return m.reply('❖ 𝙽𝚘𝚖𝚋𝚛𝚎 𝚌𝚘𝚛𝚘𝚝 𝚗𝚘 𝚍𝚎𝚋𝚎 𝚝𝚎𝚗𝚎𝚛 𝚎𝚜𝚙𝚊𝚌𝚒𝚘.')
    config.namebot = short.trim()
    config.botname = long.trim()
    return m.reply(`✿ El nombre del bot ha sido actualizado!\n\n❒ Nombre corto: *${short.trim()}*\n❒ Nombre largo: *${long.trim()}*`)
  },
};