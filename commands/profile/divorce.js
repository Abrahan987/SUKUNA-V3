export default {
  command: ['divorce'],
  category: 'rpg',
  run: async (client, m) => {

    const db = global.db.data
    const userId = m.sender
    const partnerId = db.users[userId]?.marry

    if (!partnerId)
      return m.reply(`☹︎ 𝚗𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚞𝚗 𝚟𝚒́𝚗𝚌𝚞𝚕𝚘 𝚖𝚊𝚝𝚛𝚒𝚖𝚘𝚗𝚒𝚊𝚕 𝚊𝚌𝚝𝚒𝚟𝚘`)

    db.users[userId].marry = ''
    db.users[partnerId].marry = ''

    return m.reply(
      `✵ 𝚕𝚊 𝚞𝚗𝚒𝚘́𝚗 𝚑𝚊 𝚜𝚒𝚍𝚘 𝚍𝚒𝚜𝚞𝚎𝚕𝚝𝚊\n\n` +
      `𖦹 *${db.users[userId]?.name || userId.split('@')[0]}* ` +
      `𝚢 *${db.users[partnerId]?.name || partnerId.split('@')[0]}* ` +
      `𝚊𝚑𝚘𝚛𝚊 𝚜𝚒𝚐𝚞𝚎𝚗 𝚌𝚊𝚖𝚒𝚗𝚘𝚜 𝚜𝚎𝚙𝚊𝚛𝚊𝚍𝚘𝚜`
    )
  },
}