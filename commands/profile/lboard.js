const growth = Math.pow(Math.PI / Math.E, 1.618) * Math.E * 0.75
function xpRange(level, multiplier = global.multiplier || 2) {
  if (level < 0) throw new TypeError('level cannot be negative value')
  level = Math.floor(level)
  const min = level === 0 ? 0 : Math.round(Math.pow(level, growth) * multiplier) + 1
  const max = Math.round(Math.pow(level + 1, growth) * multiplier)
  return { min, max, xp: max - min }
}

export default {
  command: ['lboard', 'lb', 'leaderboard'],
  category: 'rpg',
  run: async (client, m, args, usedPrefix, command) => {

    const db = global.db.data

    try {
      const users = Object.entries(db.users || {})
        .filter(([_, data]) => (data.exp || 0) >= 1)
        .map(([jid, data]) => {
          const name = data.name || 'Usuario'
          const exp = data.exp || 0
          const level = data.level || 0
          const { min, xp } = xpRange(level, global.multiplier)
          const progreso = exp - min
          const porcentaje = xp > 0 ? Math.floor((progreso / xp) * 100) : 0
          return { jid, name, exp, level, progreso, xp, porcentaje }
        })

      if (!users.length)
        return m.reply(`☹︎ 𝚗𝚘 𝚑𝚊𝚢 𝚞𝚜𝚞𝚊𝚛𝚒𝚘𝚜 𝚌𝚘𝚗 𝚎𝚡𝚙𝚎𝚛𝚒𝚎𝚗𝚌𝚒𝚊 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚊𝚍𝚊`)

      const sorted = users.sort((a, b) => (b.exp || 0) - (a.exp || 0))

      const page = parseInt(args[0]) || 1
      const pageSize = 10
      const totalPages = Math.ceil(sorted.length / pageSize)

      if (page < 1 || page > totalPages)
        return m.reply(
          `☹︎ 𝚕𝚊 𝚙𝚊́𝚐𝚒𝚗𝚊 *${page}* 𝚗𝚘 𝚎𝚜𝚝𝚊́ 𝚍𝚒𝚜𝚙𝚘𝚗𝚒𝚋𝚕𝚎 · 𝚝𝚘𝚝𝚊𝚕 *${totalPages}*`
        )

      const start = (page - 1) * pageSize
      const end = start + pageSize

      let text = `✵ 𝚛𝚊𝚗𝚔𝚒𝚗𝚐 𝚍𝚎 𝚎𝚡𝚙𝚎𝚛𝚒𝚎𝚗𝚌𝚒𝚊\n\n`

      text += sorted.slice(start, end).map(
        ({ name, exp, level, progreso, xp, porcentaje }, i) =>
`𖦹 ${start + i + 1} › *${name}*
☼ 𝚡𝚙 › *${exp.toLocaleString()}*
۞ 𝚗𝚒𝚟𝚎𝚕 › *${level}*
𖣔 𝚊𝚟𝚊𝚗𝚌𝚎 › *${progreso} → ${xp}* _(${porcentaje}%)_`
      ).join('\n\n')

      text += `\n\n✵ 𝚙𝚊́𝚐𝚒𝚗𝚊 *${page}* 𝚍𝚎 *${totalPages}*`

      if (page < totalPages)
        text += `\n☢︎︎ 𝚜𝚒𝚐𝚞𝚒𝚎𝚗𝚝𝚎 › *${usedPrefix + command} ${page + 1}*`

      await client.sendMessage(m.chat, { text }, { quoted: m })

    } catch (e) {
      await m.reply(
        `☢︎︎ 𝚎𝚛𝚛𝚘𝚛 𝚒𝚗𝚎𝚜𝚙𝚎𝚛𝚊𝚍𝚘\n> *${e.message}*`
      )
    }
  }
}