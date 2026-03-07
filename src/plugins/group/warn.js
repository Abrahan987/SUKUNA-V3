import { resolveLidToRealJid } from "../../lib/utils.js"

export default {
  command: ['warn'],
  category: 'group',
  isAdmin: true,
  run: async (client, m, args, usedPrefix, command) => {
    const chat = global.db.data.chats[m.chat]
    const mentioned = m.mentionedJid
    const who2 = mentioned.length > 0 ? mentioned[0] : m.quoted ? m.quoted.sender : false
    const targetId = await resolveLidToRealJid(who2, client, m.chat)
    const reason = mentioned.length > 0
      ? args.slice(1).join(' ') || '𝚂𝚒𝚗 𝚖𝚘𝚝𝚒𝚟𝚘 𝚎𝚜𝚙𝚎𝚌𝚒𝚏𝚒𝚌𝚊𝚍𝚘.'
      : args.join(' ') || '𝚂𝚒𝚗 𝚖𝚘𝚝𝚒𝚟𝚘 𝚎𝚜𝚙𝚎𝚌𝚒𝚏𝚒𝚌𝚊𝚍𝚘.'

    try {
      if (!who2) {
        return m.reply('☢︎︎ 𝙳𝚎𝚋𝚎𝚜 𝚖𝚎𝚗𝚌𝚒𝚘𝚗𝚊𝚛 𝚘 𝚛𝚎𝚜𝚙𝚘𝚗𝚍𝚎𝚛 𝚊𝚕 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚚𝚞𝚎 𝚜𝚎𝚛𝚊́ 𝚊𝚍𝚟𝚎𝚛𝚝𝚒𝚍𝚘.')
      }

      if (!chat.users[targetId]) chat.users[targetId] = {}
      const user = chat.users[targetId]
      if (!user.warnings) user.warnings = []

      const now = new Date()
      const timestamp = now.toLocaleString('es-CO', {
        timeZone: 'America/Bogota',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })

      user.warnings.unshift({ reason, timestamp, by: m.sender })

      const total = user.warnings.length
      const name = global.db.data.users[targetId]?.name || 'Usuario'

      const warningList = user.warnings.map((w, i) => {
        const index = total - i
        return `\`#${index}\` 𝙼𝚘𝚝𝚒𝚟𝚘: ${w.reason}\n> 𝙵𝚎𝚌𝚑𝚊: ${w.timestamp}`
      }).join('\n\n')

      let message =
        `✵ 𝙰𝚍𝚟𝚎𝚛𝚝𝚎𝚗𝚌𝚒𝚊 𝚊𝚙𝚕𝚒𝚌𝚊𝚍𝚊 𝚊 @${targetId.split('@')[0]}\n` +
        `> 𝚃𝚘𝚝𝚊𝚕 𝚊𝚌𝚝𝚞𝚊𝚕: \`${total}\`\n\n` +
        `${warningList}`

      const warnLimit = chat.warnLimit || 3
      const expulsar = chat.expulsar === true

      if (total >= warnLimit && expulsar) {
        try {
          await client.groupParticipantsUpdate(m.chat, [targetId], 'remove')
          delete chat.users[targetId]
          delete global.db.data.users[targetId]
          message += `\n\n> ☠︎ 𝙻𝚒́𝚖𝚒𝚝𝚎 𝚊𝚕𝚌𝚊𝚗𝚣𝚊𝚍𝚘. 𝙴𝚕 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚏𝚞𝚎 𝚎𝚡𝚙𝚞𝚕𝚜𝚊𝚍𝚘.`
        } catch {
          message += `\n\n> ☹︎ 𝙻𝚒́𝚖𝚒𝚝𝚎 𝚊𝚕𝚌𝚊𝚗𝚣𝚊𝚍𝚘, 𝚙𝚎𝚛𝚘 𝚗𝚘 𝚜𝚎 𝚙𝚞𝚍𝚘 𝚎𝚓𝚎𝚌𝚞𝚝𝚊𝚛 𝚕𝚊 𝚎𝚡𝚙𝚞𝚕𝚜𝚒𝚘́𝚗.`
        }
      } else if (total >= warnLimit) {
        message += `\n\n> ☼︎ 𝙴𝚕 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚢𝚊 𝚊𝚕𝚌𝚊𝚗𝚣𝚘́ 𝚎𝚕 𝚕𝚒́𝚖𝚒𝚝𝚎 𝚍𝚎 𝚊𝚍𝚟𝚎𝚛𝚝𝚎𝚗𝚌𝚒𝚊𝚜.`
      }

      await client.reply(m.chat, message, m, { mentions: [targetId] })
    } catch (e) {
      return m.reply(
        `☻︎ 𝙾𝚌𝚞𝚛𝚛𝚒𝚘́ 𝚞𝚗 𝚎𝚛𝚛𝚘𝚛 𝚊𝚕 𝚎𝚓𝚎𝚌𝚞𝚝𝚊𝚛 *${usedPrefix + command}*\n` +
        `> 𝙳𝚎𝚝𝚊𝚕𝚕𝚎: *${e.message}*`
      )
    }
  },
}