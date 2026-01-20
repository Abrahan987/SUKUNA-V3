import axios from 'axios'
import fs from 'fs'

const fetchStickerVideo = async (text) => {
  const response = await axios.get(`https://skyzxu-brat.hf.space/brat-animated`, { params: { text }, responseType: 'arraybuffer' })
  if (!response.data) throw new Error('Error al obtener el video de la API.')
  return response.data
}

export default {
  command: ['bratv'],
  category: 'sticker',
  run: async (client, m, args, usedPrefix, command, text) => {
    try {
      text = m.quoted?.text || text
      if (!text) return client.reply(m.chat, '☢︎︎ 𝙿𝚘𝚛𝚏𝚊 𝚛𝚎𝚜𝚙𝚘𝚗𝚍𝚊 𝚊 𝚞𝚗 𝚖𝚎𝚗𝚜𝚊𝚓𝚎 𝚘 𝚊𝚐𝚛𝚎𝚐𝚞𝚎 𝚝𝚎𝚡𝚝𝚘 𝚙𝚊𝚛𝚊 𝚑𝚊𝚌𝚎𝚛 𝚜𝚝𝚒𝚌𝚔𝚎𝚛....', m)
      await m.react('🕒')
      let user = globalThis.db.data.users[m.sender] || {}
      const name = user.name || m.sender.split('@')[0]
      let texto1 = user.metadatos || `𝚂𝚄𝙺𝚄𝙽𝙰 𝚅3 𖦹`
      let texto2 = user.metadatos2 || `@${name}`
      const videoBuffer = await fetchStickerVideo(text)
      const tmpFile = `./tmp-${Date.now()}.mp4`
      await fs.writeFileSync(tmpFile, videoBuffer)
      await client.sendVideoAsSticker(m.chat, tmpFile, m, { packname: texto1, author: texto2 })
      await fs.unlinkSync(tmpFile)
      await m.react('✔️')
    } catch (e) {
      await m.react('✖️')
      return m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  }
}