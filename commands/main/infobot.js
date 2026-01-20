import os from 'os';

function rTime(seconds) {
  seconds = Number(seconds)
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const dDisplay = d > 0 ? d + (d === 1 ? " día, " : " días, ") : ""
  const hDisplay = h > 0 ? h + (h === 1 ? " hora, " : " horas, ") : ""
  const mDisplay = m > 0 ? m + (m === 1 ? " minuto, " : " minutos, ") : ""
  const sDisplay = s > 0 ? s + (s === 1 ? " segundo" : " segundos") : ""
  return dDisplay + hDisplay + mDisplay + sDisplay
}

export default {
  command: ['infobot', 'infosocket'],
  category: 'info',
  run: async (client, m, args, usedPrefix, command) => {
    const botId = client.user.id.split(':')[0] + "@s.whatsapp.net"
    const botSettings = global.db.data.settings[botId] || {}

    const botname = botSettings.botname
    const namebot = botSettings.namebot
    const monedas = botSettings.currency
    const banner = botSettings.banner
    const prefijo = botSettings.prefix
    const owner = botSettings.owner
    const canalId = botSettings.id
    const canalName = botSettings.nameid
    const link = botSettings.link

    let desar = 'Oculto'
    if (owner && !isNaN(owner.replace(/@s\.whatsapp\.net$/, ''))) {
      const userData = global.db.data.users[owner]
      desar = userData?.genre || 'Oculto'
    }

    const platform = os.type()
    const now = new Date()
    const colombianTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }))
    const nodeVersion = process.version
    const sistemaUptime = rTime(os.uptime())

    const uptime = process.uptime()
    const uptimeDate = new Date(colombianTime.getTime() - uptime * 1000)
    const formattedUptimeDate = uptimeDate.toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/^./, m => m.toUpperCase())

    const isOficialBot = botId === global.client.user.id.split(':')[0] + "@s.whatsapp.net"
    const botType = isOficialBot ? 'Principal / Owner' : 'Sub Bot'

    try {
      const message = `☢︎ 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚌𝚒𝚘́𝚗 𝚍𝚎𝚕 𝚂𝚘𝚌𝚔𝚎𝚝 *${botname}*

✵ *𝙽𝚘𝚖𝚋𝚛𝚎 𝚌𝚘𝚛𝚝𝚘 ›* ${namebot}
✵ *𝙽𝚘𝚖𝚋𝚛𝚎 𝚌𝚘𝚖𝚙𝚕𝚎𝚝𝚘 ›* ${botname}
✵ *𝙼𝚘𝚗𝚎𝚍𝚊 𝚞𝚜𝚊𝚍𝚊 ›* ${monedas}
✵ *𝙿𝚛𝚎𝚏𝚒𝚓𝚘${Array.isArray(prefijo) && prefijo.length > 1 ? '𝚜' : ''} ›* ${(Array.isArray(prefijo) ? prefijo : [prefijo || '/']).map(p => `\`${p}\``).join(', ')}

𖦹 *𝚃𝚒𝚙𝚘 𝚍𝚎 𝚋𝚘𝚝 ›* ${botType}
𖦹 *𝚂𝚒𝚜𝚝𝚎𝚖𝚊 ›* ${platform}
𖦹 *𝙽𝚘𝚍𝚎𝙹𝚂 ›* ${nodeVersion}
𖦹 *𝙸𝚗𝚒𝚌𝚒𝚘́ 𝚊𝚌𝚝𝚒𝚟𝚒𝚍𝚊𝚍 ›* ${formattedUptimeDate}
𖦹 *𝚃𝚒𝚎𝚖𝚙𝚘 𝚎𝚗 𝚕𝚒́𝚗𝚎𝚊 ›* ${sistemaUptime}
𖦹 *${desar === 'Hombre' ? '𝙳𝚞𝚎𝚗̃𝚘' : desar === 'Mujer' ? '𝙳𝚞𝚎𝚗̃𝚊' : '𝙳𝚞𝚎𝚗̃𝚘(𝚊)'} ›* ${
        owner
          ? (!isNaN(owner.replace(/@s\.whatsapp\.net$/, ''))
              ? `@${owner.split('@')[0]}`
              : owner)
          : '𝙾𝚌𝚞𝚕𝚝𝚘 𝚙𝚘𝚛 𝚙𝚛𝚒𝚟𝚊𝚌𝚒𝚍𝚊𝚍'
      }

✵ *𝙴𝚗𝚕𝚊𝚌𝚎 𝚘𝚏𝚒𝚌𝚒𝚊𝚕:* ${link}`.trim()

      await client.sendMessage(
        m.chat,
        banner.includes('.mp4') || banner.includes('.webm')
          ? {
              video: { url: banner },
              gifPlayback: true,
              caption: message,
              contextInfo: {
                mentionedJid: [owner, m.sender],
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: canalId,
                  serverMessageId: '',
                  newsletterName: canalName
                }
              }
            }
          : {
              text: message,
              contextInfo: {
                mentionedJid: [owner, m.sender],
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: canalId,
                  serverMessageId: '',
                  newsletterName: canalName
                },
                externalAdReply: {
                  title: botname,
                  body: `${namebot}, 𝚖𝚊𝚍𝚎 𝚠𝚒𝚝𝚑 𝚋𝚢 ᥲᑲrᥲһᥲᥒ-m 𒆜`,
                  showAdAttribution: false,
                  thumbnailUrl: banner,
                  mediaType: 1,
                  previewType: 0,
                  renderLargerThumbnail: true
                }
              }
            },
        { quoted: m }
      )
    } catch (e) {
      return m.reply(
        `☹︎ 𝙾𝚌𝚞𝚛𝚛𝚒𝚘́ 𝚞𝚗 𝚎𝚛𝚛𝚘𝚛 𝚊𝚕 𝚎𝚓𝚎𝚌𝚞𝚝𝚊𝚛 *${usedPrefix + command}*.\n𝙳𝚎𝚝𝚊𝚕𝚕𝚎: *${e.message}*`
      )
    }
  }
};