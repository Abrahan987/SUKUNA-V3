
export default {
  command: ['setdescription', 'setdesc'],
  category: 'rpg',
  run: async (client, m, args, usedPrefix, command) => {
    const user = global.db.data.users[m.sender]
    const input = args.join(' ').trim()

    if (!input)
      return m.reply(
        `𖣔 𝚎𝚜𝚌𝚛𝚒𝚋𝚎 𝚞𝚗𝚊 𝚍𝚎𝚜𝚌𝚛𝚒𝚙𝚌𝚒𝚘́𝚗 𝚙𝚊𝚛𝚊 𝚝𝚞 𝚙𝚎𝚛𝚏𝚒𝚕.\n\n` +
        `➤ 𝚎𝚓𝚎𝚖𝚙𝚕𝚘:\n` +
        `• ${usedPrefix + command} 𝙷𝚘𝚕𝚊, 𝚖𝚎 𝚐𝚞𝚜𝚝𝚊 𝚌𝚑𝚊𝚝𝚎𝚊𝚛`
      )

    user.description = input

    return m.reply(
      `☻︎ 𝚍𝚎𝚜𝚌𝚛𝚒𝚙𝚌𝚒𝚘́𝚗 𝚐𝚞𝚊𝚛𝚍𝚊𝚍𝚊 𝚌𝚘𝚛𝚛𝚎𝚌𝚝𝚊𝚖𝚎𝚗𝚝𝚎.\n` +
      `➤ 𝚙𝚞𝚎𝚍𝚎𝚜 𝚟𝚎𝚛𝚕𝚊 𝚌𝚘𝚗: ${usedPrefix}profile`
    )
  },
}