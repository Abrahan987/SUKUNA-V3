import fs from 'fs'

export default {
  command: ['sticker', 's'],
  category: 'utils',
  run: async (client, m, args, usedPrefix, command) => {
    try {
      const quoted = m.quoted ? m.quoted : m
      const mime = (quoted.msg || quoted).mimetype || ''
      let user = globalThis.db.data.users[m.sender] || {}
      const name = user.name
      let texto1 = user.metadatos || `𝚂𝚄𝙺𝚄𝙽𝙰 𝚅3 𖦹`
      let texto2 = user.metadatos2 || `@${name}`
      let filteredText = args.join(' ').trim()
      let marca = filteredText.split(/[\u2022|]/).map(part => part.trim())
      let pack = marca[0] || texto1
      let author = marca.length > 1 ? marca[1] : texto2
      if (/image/.test(mime)) {
        let buffer = await quoted.download()
        const tmpFile = `./tmp-${Date.now()}.jpg`
        await fs.writeFileSync(tmpFile, buffer)
        let encmedia = await client.sendImageAsSticker(m.chat, tmpFile, m, { packname: pack, author: author })
        await fs.unlinkSync(tmpFile)
      } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 20) {
          return m.reply('☢︎︎ 𝙴𝚕 𝚟𝚒𝚍𝚎𝚘 𝚗𝚘 𝚙𝚞𝚎𝚍𝚎 𝚍𝚎𝚖𝚘𝚛𝚊𝚛 𝚖𝚊𝚜 𝚍𝚎 20 𝚜𝚎𝚐𝚞𝚗𝚍𝚘𝚜, 𝚛𝚎𝚌𝚘𝚛𝚝𝚊𝚕𝚘 𝚎 𝚒𝚗𝚝𝚎𝚗𝚝𝚊 𝚍𝚎 𝚗𝚞𝚎𝚟𝚘.')
        }
        let buffer = await quoted.download()
        let encmedia = await client.sendVideoAsSticker(m.chat, buffer, m, { packname: pack, author: author })
      } else {
        return client.reply(m.chat, '𖦹 𝙽𝚎𝚌𝚎𝚜𝚒𝚝𝚘 𝚞𝚗𝚊 𝚒𝚖𝚊𝚐𝚎𝚗 𝚘 𝚞𝚗 𝚟𝚒𝚍𝚎𝚘 𝚙𝚊𝚛𝚊 𝚝𝚛𝚊𝚗𝚜𝚏𝚘𝚛𝚖𝚊𝚛 𝚊 𝚜𝚝𝚒𝚌𝚔𝚎𝚛.', m)
      }
    } catch (e) {
      return m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  }
}