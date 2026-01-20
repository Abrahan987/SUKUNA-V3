import axios from 'axios'
import fs from 'fs'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const fetchSticker = async (text, attempt = 1) => {
  try {
    const response = await axios.get(`https://skyzxu-brat.hf.space/brat`, { params: { text }, responseType: 'arraybuffer' })
    return response.data
  } catch (error) {
    if (error.response?.status === 429 && attempt <= 3) {
      const retryAfter = error.response.headers['retry-after'] || 5
      await delay(retryAfter * 1000)
      return fetchSticker(text, attempt + 1)
    }
    throw error
  }
}

export default {
  command: ['brat'],
  category: 'sticker',
  run: async (client, m, args, usedPrefix, command, text) => {
    try {
      text = m.quoted?.text || text
      if (!text) return client.reply(m.chat, '☢︎︎ 𝚁𝚎𝚜𝚙𝚘𝚗𝚍𝚎 𝚊 𝚞𝚗 𝚖𝚎𝚗𝚜𝚊𝚓𝚎 𝚘 𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚝𝚎𝚡𝚝𝚘 𝚙𝚊𝚛𝚊 𝚑𝚊𝚌𝚎𝚛 𝚜𝚝𝚒𝚌𝚔𝚎𝚛....', m)
      await m.react('🕒')
      let user = globalThis.db.data.users[m.sender] || {}
      const name = user.name || m.sender.split('@')[0]
      let texto1 = user.metadatos || `𝚂𝚄𝙺𝚄𝙽𝙰 𝚅3 𖦹`
      let texto2 = user.metadatos2 || `@${name}`
      const buffer = await fetchSticker(text)
      const tmpFile = `./tmp-${Date.now()}.webp`
      await fs.writeFileSync(tmpFile, buffer)
      await client.sendImageAsSticker(m.chat, tmpFile, m, { packname: texto1, author: texto2 })
      await fs.unlinkSync(tmpFile)
      await m.react('✔️')
    } catch (e) {
      await m.react('✖️')
      return m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  }
}