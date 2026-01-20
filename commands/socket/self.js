export default {
  command: ['self'],
  category: 'socket',
  run: async (client, m, args) => {
    const idBot = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = global.db.data.settings[idBot]
    const isOwner2 = [idBot, ...(config.owner ? [config.owner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(m.sender)
    if (!isOwner2) return m.reply(mess.socket)

    const chat = global.db.data.settings[idBot]
    const estado = chat.self ?? false

    if (args[0] === 'enable' || args[0] === 'on') {
      if (estado)
        return m.reply('☢︎ 𝚎𝚕 𝚖𝚘𝚍𝚘 𝚜𝚎𝚕𝚏 𝚢𝚊 𝚜𝚎 𝚎𝚗𝚌𝚞𝚎𝚗𝚝𝚛𝚊 𝚊𝚌𝚝𝚒𝚟𝚘.')

      chat.self = true
      return m.reply('☼︎ 𝚎𝚕 𝚋𝚘𝚝 𝚊𝚑𝚘𝚛𝚊 𝚏𝚞𝚗𝚌𝚒𝚘𝚗𝚊 𝚎𝚗 𝚖𝚘𝚍𝚘 𝚜𝚘𝚕𝚘 𝚙𝚛𝚒𝚟𝚊𝚍𝚘.')
    }

    if (args[0] === 'disable' || args[0] === 'off') {
      if (!estado)
        return m.reply('۞ 𝚎𝚕 𝚖𝚘𝚍𝚘 𝚜𝚎𝚕𝚏 𝚢𝚊 𝚎𝚜𝚝𝚊𝚋𝚊 𝚊𝚙𝚊𝚐𝚊𝚍𝚘.')

      chat.self = false
      return m.reply('𖣔 𝚎𝚕 𝚋𝚘𝚝 𝚟𝚞𝚎𝚕𝚟𝚎 𝚊 𝚏𝚞𝚗𝚌𝚒𝚘𝚗𝚊𝚛 𝚎𝚗 𝚖𝚘𝚍𝚘 𝚙𝚞́𝚋𝚕𝚒𝚌𝚘.')
    }

    return m.reply(
      `✵ 𝚎𝚜𝚝𝚊𝚍𝚘 𝚊𝚌𝚝𝚞𝚊𝚕 𝚍𝚎 𝚜𝚎𝚕𝚏\n\n` +
      `➤ 𝚖𝚘𝚍𝚘 › ${estado ? '✓ 𝚊𝚌𝚝𝚒𝚟𝚘' : '✗ 𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚍𝚘'}\n\n` +
      `➤ 𝚞𝚜𝚘:\n` +
      `• 𝚊𝚌𝚝𝚒𝚟𝚊𝚛 › self enable\n` +
      `• 𝚍𝚎𝚜𝚊𝚌𝚝𝚒𝚟𝚊𝚛 › self disable`
    )
  },
};