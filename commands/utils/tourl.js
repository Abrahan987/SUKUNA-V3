import fetch from 'node-fetch'
import FormData from 'form-data'

export default {
  command: ['tourl'],
  category: 'utils',
  run: async (client, m, args, usedPrefix, command, text) => {
    try {
      const q = m.quoted || m
      const mime = q.mimetype || q.msg?.mimetype || ''
      if (!mime) return client.reply(m.chat, `𖣘 𝙴𝙽𝚅𝙸𝙰 𝚄𝙽𝙰 𝙸𝙼𝙰𝙶𝙴𝙽 𝙾 𝚅𝙸𝙳𝙴𝙾 𝙿𝙰𝚁𝙰 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁`, m)
      if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) {
        return m.reply(`《✧》 El formato *${mime}* no es compatible`)
      }
      const buffer = await q.download()
      const url = await uploadToUguu(buffer, mime)
      if (!url) return m.reply('《✧》 No se pudo *subir* la imagen')
      const userName = global.db.data.users[m.sender]?.name || 'Usuario'
      const peso = formatBytes(buffer.length)
      const upload = `ꕥ *Upload To Yuki-WaBot's*\n\n✎ *Link ›* ${url}\n✰ *Peso ›* ${peso}\n✿ *Solicitado por ›* ${userName}\n\n${dev}`
      await client.reply(m.chat, upload, m)
    } catch (e) {
      await m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}
async function uploadToUguu(buffer, mime) {
  const body = new FormData()
  body.append('files[]', buffer, `file.${mime.split('/')[1]}`)
  const res = await fetch('https://uguu.se/upload.php', { method: 'POST', body, headers: body.getHeaders() })
  const json = await res.json()
  return json.files?.[0]?.url
}