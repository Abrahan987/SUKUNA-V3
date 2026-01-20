import fetch from 'node-fetch';
import FormData from 'form-data';

export default {
  command: ['hd', 'enhance', 'remini'],
  category: 'utils',
  run: async (client, m, args, usedPrefix, command, from) => {
    try {
      const q = m.quoted || m
      const mime = q.mimetype || q.msg?.mimetype || ''
      if (!mime) return m.reply(`《✧》 Envía una *imagen* junto al *comando* ${prefa}hd`)
      if (!/image\/(jpe?g|png)/.test(mime)) {
        return m.reply(`《✧》 El formato *${mime}* no es compatible`)
      }
      const buffer = await q.download()
      const uploadedUrl = await uploadToUguu(buffer)
      if (!uploadedUrl) {
        return m.reply('᯾ 𝙴𝚛𝚛𝚘𝚛 𝚊𝚕 𝚜𝚞𝚋𝚒𝚛 𝚝𝚞 𝚒𝚖𝚊𝚐𝚎𝚗')
      }
      const enhancedBuffer = await getEnhancedBuffer(uploadedUrl)
      if (!enhancedBuffer) {
        return m.reply('✯ 𝙽𝚘 𝚜𝚎 𝚙𝚞𝚍𝚘 𝚛𝚎𝚌𝚘𝚐𝚎𝚛 𝚕𝚊 𝚒𝚖𝚊𝚐𝚎𝚗 𝚢𝚊 𝚖𝚎𝚓𝚘𝚛𝚊𝚍𝚊')
      }
      await client.sendMessage(m.chat, { image: enhancedBuffer, caption: null }, { quoted: m })
    } catch (e) {
      console.error(err)
      await m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
};

async function uploadToUguu(buffer) {
  const body = new FormData()
  body.append('files[]', buffer, 'image.jpg')
  const res = await fetch('https://uguu.se/upload.php', { method: 'POST', body, headers: body.getHeaders() })
  const json = await res.json()
  return json.files?.[0]?.url
}

async function getEnhancedBuffer(url) {
  const res = await fetch(`${global.APIs.stellar.url}/tools/upscale?url=${url}&key=${global.APIs.stellar.key}`)
  if (!res.ok) return null
  return Buffer.from(await res.arrayBuffer())
}