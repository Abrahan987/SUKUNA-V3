export default {
  command: ['toimg', 'toimage'],
  category: 'tools',
  run: async (client, m, args, usedPrefix, command, text) => {
    if (!m.quoted) return client.reply(m.chat, `𖦹𝙳𝚎𝚋𝚎𝚜 𝚎𝚗𝚟𝚒𝚊𝚛 𝚞𝚗 𝚜𝚝𝚒𝚌𝚔𝚎𝚛 𝚢 𝚛𝚎𝚜𝚙𝚘𝚗𝚍𝚎𝚛 𝚙𝚊𝚛𝚊 𝚌𝚘𝚗𝚟𝚎𝚛𝚝𝚒𝚛`, m)
    await m.react('🕒')
    let xx = m.quoted
    let imgBuffer = await xx.download()
    if (!imgBuffer) {
      await m.react('✖️')
      return client.reply(m.chat, `☢︎︎𝙻𝚘 𝚜𝚒𝚎𝚗𝚝𝚘 𝚗𝚘 𝚜𝚎 𝚙𝚞𝚍𝚘 𝚝𝚛𝚊𝚗𝚜𝚏𝚘𝚛𝚖𝚊𝚛 𝚟𝚞𝚎𝚕𝚟𝚎 𝚊 𝚒𝚗𝚝𝚎𝚗𝚝𝚊𝚛.`, m)
    }
    await client.sendMessage(m.chat, { image: imgBuffer, caption: '➪ 𝚃𝚎𝚗 𝚝𝚞 𝚒𝚖𝚊𝚐𝚎𝚗.' }, { quoted: m })
    await m.react('✔️')
  }
}