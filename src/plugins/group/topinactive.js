import { resolveLidToRealJid } from "../../lib/utils.js"

export default {
  command: ['topinactive','topinactivos','topinactiveusers'],
  category: 'rpg',
  run: async (client, m, args, usedPrefix, command, text) => {
    const db = global.db.data
    const chatId = m.chat
    const chatData = db.chats[chatId]
    const now = new Date()

    let daysArg = args[0] ? parseInt(args[0]) : 30
    if (daysArg < 1) daysArg = 30
    const cutoff = new Date(now.getTime() - daysArg * 24 * 60 * 60 * 1000)

    const ranking = Object.entries(chatData.users || {})
      .map(([jid, user]) => {
        const stats = user.stats || {}
        const days = Object.entries(stats).filter(([date]) => new Date(date) >= cutoff)
        const totalMsgs = days.reduce((acc, [, d]) => acc + (d.msgs || 0), 0)
        return { jid, totalMsgs }
      })
      .sort((a, b) => a.totalMsgs - b.totalMsgs)

    if (ranking.length === 0)
      return m.reply(`☢︎︎ 𝙽𝚘 𝚑𝚊 𝚜𝚎𝚛𝚟𝚒𝚌𝚒𝚘 𝚍𝚎 𝚖𝚎𝚗𝚜𝚊𝚓𝚎𝚜 𝚎𝚗 𝚕𝚘𝚜 𝚞́𝚕𝚝𝚒𝚖𝚘𝚜 ${daysArg} 𝚍í𝚊𝚜.`)

    const page = parseInt(args[1]) || 1
    const perPage = 10
    const totalPages = Math.ceil(ranking.length / perPage)
    if (page < 1 || page > totalPages)
      return m.reply(`☹︎ 𝙿á𝚐𝚒𝚗𝚊 𝚒𝚗𝚟á𝚕𝚒𝚍𝚊. 𝚂ó𝚕𝚘 𝚑𝚊𝚢 ${totalPages} 𝚙á𝚐𝚒𝚗𝚊(s) 𝚍𝚒𝚜𝚙𝚘𝚗𝚒𝚋𝚕𝚎(s).`)

    const start = (page - 1) * perPage
    const end = start + perPage
    const pageRanking = ranking.slice(start, end)

    let report = `☼︎ 𝚃𝚘𝚙 𝚍𝚎 𝚞𝚜𝚞𝚊𝚛𝚒𝚘𝚜 𝚖á𝚜 𝚒𝚗𝚊𝚌𝚝𝚒𝚟𝚘𝚜 ☼︎\n`
    report += `> » Periodo: \`${daysArg} 𝚍í𝚊(s)\`\n`
    report += `> » Página: \`${page}\` de \`${totalPages}\`\n\n`

    const mentions = []
    pageRanking.forEach((u, i) => {
      const name = db.users[u.jid]?.name || '@' + u.jid.split('@')[0]
      report += `𖣔 ${start + i + 1}. ${name}\n`
      report += `   » Mensajes enviados: \`${u.totalMsgs}\`\n`
      mentions.push(u.jid)
    })

    if (page < totalPages) {
      report += `\n> 𖦹 𝚂𝚒 𝚍𝚎𝚜𝚎𝚊𝚜 𝚟𝚎𝚛 𝚜𝚒𝚐𝚞𝚒𝚎𝚗𝚝𝚎 𝚙á𝚐𝚒𝚗𝚊 › *${usedPrefix + command} ${daysArg} ${page + 1}*`
    }

    await client.reply(chatId, report, m, { mentions })
  }
}