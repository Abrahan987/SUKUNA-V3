import { resolveLidToRealJid } from "../../lib/utils.js"

export default {
  command: ['topcount', 'topmensajes', 'topmsgcount', 'topmessages'],
  category: 'rpg',
  run: async (client, m, args, usedPrefix, command, text) => {
    const db = global.db.data
    const chatId = m.chat
    const chatData = db.chats[chatId]
    const now = new Date()

    // Zona horaria Bogotá
    const bogotaNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }))

    const daysArg = args[0] ? parseInt(args[0]) : 1
    if (daysArg < 1) return m.reply(`☢︎︎ El número de días debe ser mayor a cero.`)

    const cutoff = new Date(bogotaNow.getTime() - daysArg * 24 * 60 * 60 * 1000)

    const ranking = Object.entries(chatData.users || {})
      .map(([jid, user]) => {
        const stats = user.stats || {}
        const days = Object.entries(stats).filter(([date]) => new Date(date) >= cutoff)
        const totalMsgs = days.reduce((acc, [, d]) => acc + (d.msgs || 0), 0)
        const totalCmds = days.reduce((acc, [, d]) => acc + (d.cmds || 0), 0)
        return { jid, totalMsgs, totalCmds }
      })
      .filter(u => u.totalMsgs > 0)
      .sort((a, b) => b.totalMsgs - a.totalMsgs)

    if (ranking.length === 0) return m.reply(`☢︎︎ No se registraron mensajes en los últimos ${daysArg} día${daysArg > 1 ? 's' : ''}.`)

    const page = parseInt(args[1]) || 1
    const perPage = 10
    const totalPages = Math.ceil(ranking.length / perPage)
    if (page < 1 || page > totalPages) return m.reply(`☢︎︎ Página inválida. Solo existen ${totalPages} páginas.`)

    const start = (page - 1) * perPage
    const end = start + perPage
    const pageRanking = ranking.slice(start, end)

    let report = `☼︎ ◈ Top usuarios más activos en los últimos *${daysArg}* día${daysArg > 1 ? 's' : ''} ◈\n\n`
    report += `✵ Página: \`${page}\` de \`${totalPages}\`\n\n`

    pageRanking.forEach((u, i) => {
      const name = db.users[u.jid]?.name || u.jid.split('@')[0]
      report += `𖣔 ${start + i + 1} » ${name}\n`
      report += `   ☹︎ Mensajes: \`${u.totalMsgs}\`, Comandos: \`${u.totalCmds}\`\n`
    })

    if (page < totalPages) {
      report += `\n> Para ver la siguiente página, usa: *${usedPrefix + command} ${daysArg} ${page + 1}*`
    }

    await client.reply(chatId, report, m)
  }
}