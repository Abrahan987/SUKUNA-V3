import { resolveLidToRealJid } from "../../lib/utils.js"

const growth = Math.pow(Math.PI / Math.E, 1.618) * Math.E * 0.75
function xpRange(level, multiplier = global.multiplier || 2) {
  if (level < 0) throw new TypeError('level cannot be negative value')
  level = Math.floor(level)
  const min = level === 0 ? 0 : Math.round(Math.pow(level, growth) * multiplier) + 1
  const max = Math.round(Math.pow(level + 1, growth) * multiplier)
  return { min, max, xp: max - min }
}

export default {
  command: ['level', 'lvl'],
  category: 'profile',
  run: async (client, m) => {

    const db = global.db.data
    const chatId = m.chat

    const mention = m.mentionedJid
    const rawUser = mention.length
      ? mention[0]
      : m.quoted
      ? m.quoted.sender
      : m.sender

    const who = await resolveLidToRealJid(rawUser, client, chatId)
    const user = db.users[who]

    if (!user)
      return m.reply(`☹︎ 𝚎𝚕 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚒𝚗𝚍𝚒𝚌𝚊𝚍𝚘 𝚗𝚘 𝚎𝚜𝚝𝚊́ 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚊𝚍𝚘`)

    const users = Object.entries(db.users).map(([jid, data]) => ({ ...data, jid }))
    const sorted = users.sort((a, b) => (b.level || 0) - (a.level || 0))
    const rank = sorted.findIndex(u => u.jid === who) + 1

    const { min, xp } = xpRange(user.level || 0, global.multiplier)
    const progreso = user.exp - min
    const porcentaje = xp > 0 ? Math.floor((progreso / xp) * 100) : 0

    const txt =
`✵ 𝚍𝚊𝚝𝚘𝚜 𝚍𝚎 𝚙𝚛𝚘𝚐𝚛𝚎𝚜𝚘
◢ ${user.name || 'Usuario'} ◤

𖦹 𝚗𝚒𝚟𝚎𝚕 𝚊𝚌𝚝𝚞𝚊𝚕 › *${user.level || 0}*
☼ 𝚎𝚡𝚙 𝚊𝚌𝚞𝚖𝚞𝚕𝚊𝚍𝚊 › *${user.exp?.toLocaleString() || 0}*
۞ 𝚊𝚟𝚊𝚗𝚌𝚎 › *${progreso} → ${xp}* _(${porcentaje}%)_
𖣔 𝚛𝚊𝚗𝚔 𝚐𝚕𝚘𝚋𝚊𝚕 › *#${rank}*
☢︎︎ 𝚌𝚘𝚖𝚊𝚗𝚍𝚘𝚜 𝚞𝚜𝚊𝚍𝚘𝚜 › *${user.usedcommands?.toLocaleString() || 0}*`

    await client.sendMessage(
      chatId,
      { text: txt, mentions: [who] },
      { quoted: m }
    )
  }
}