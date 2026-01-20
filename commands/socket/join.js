export default {
  command: ['join', 'unir'],
  category: 'socket',
  run: async (client, m, args) => {
    const idBot = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = global.db.data.settings[idBot]

    const isOwner2 = [
      idBot,
      ...(config.owner ? [config.owner] : []),
      ...global.owner.map(num => num + '@s.whatsapp.net')
    ].includes(m.sender)

    if (!isOwner2) return m.reply(mess.socket)

    if (!args[0])
      return m.reply('☢︎ 𝚎𝚗𝚟𝚒́𝚊 𝚎𝚕 𝚕𝚒𝚗𝚔 𝚍𝚎𝚕 𝚐𝚛𝚞𝚙𝚘 𝚙𝚊𝚛𝚊 𝚊𝚐𝚛𝚎𝚐𝚊𝚛 𝚊𝚕 𝚋𝚘𝚝.')

    const linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i
    const match = args[0].match(linkRegex)

    if (!match || !match[1]) {
      return m.reply('☼︎ 𝚎𝚕 𝚎𝚗𝚕𝚊𝚌𝚎 𝚙𝚛𝚘𝚙𝚘𝚛𝚌𝚒𝚘𝚗𝚊𝚍𝚘 𝚗𝚘 𝚎𝚜 𝚌𝚘𝚛𝚛𝚎𝚌𝚝𝚘.')
    }

    try {
      const inviteCode = match[1]
      await client.groupAcceptInvite(inviteCode)

      await client.reply(
        m.chat,
        `✵ 𝚎𝚕 𝚋𝚘𝚝 *${config.botname}* 𝚏𝚞𝚎 𝚊𝚐𝚛𝚎𝚐𝚊𝚍𝚘 𝚊𝚕 𝚐𝚛𝚞𝚙𝚘 𝚌𝚘𝚗 𝚎́𝚡𝚒𝚝𝚘.`,
        m
      )
    } catch (e) {
      const errMsg = String(e.message || e)

      if (errMsg.includes('not-authorized') || errMsg.includes('requires-admin')) {
        await m.reply(
          '۞ 𝚕𝚊 𝚎𝚗𝚝𝚛𝚊𝚍𝚊 𝚍𝚎𝚙𝚎𝚗𝚍𝚎 𝚍𝚎 𝚞𝚗 𝚊𝚍𝚖𝚒𝚗, 𝚎𝚜𝚙𝚎𝚛𝚊 𝚊 𝚚𝚞𝚎 𝚊𝚌𝚎𝚙𝚝𝚎𝚗.'
        )
      } else if (errMsg.includes('not-in-group') || errMsg.includes('removed')) {
        await m.reply(
          '𖣔 𝚎𝚕 𝚋𝚘𝚝 𝚗𝚘 𝚙𝚞𝚍𝚘 𝚎𝚗𝚝𝚛𝚊𝚛 𝚙𝚘𝚛 𝚚𝚞𝚎 𝚏𝚞𝚎 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚍𝚘 𝚊𝚗𝚝𝚎𝚛𝚒𝚘𝚛𝚖𝚎𝚗𝚝𝚎.'
        )
      } else {
        await m.reply(
          '✵ 𝚗𝚘 𝚏𝚞𝚎 𝚙𝚘𝚜𝚒𝚋𝚕𝚎 𝚞𝚗𝚒𝚛 𝚊𝚕 𝚋𝚘𝚝, 𝚛𝚎𝚟𝚒𝚜𝚊 𝚎𝚕 𝚕𝚒𝚗𝚔 𝚘 𝚕𝚘𝚜 𝚙𝚎𝚛𝚖𝚒𝚜𝚘𝚜.'
        )
      }
    }
  },
}