export default {
  command: ['setstickermeta', 'setmeta'],
  category: 'utils',
  run: async (client, m, args, usedPrefix, command) => {
    const db = global.db.data
    const userId = m.sender
    const user = db.users[userId]
    if (!args || args.length === 0)
      return m.reply('𖣔 𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚚𝚞𝚎 𝚟𝚊𝚜 𝚊 𝚙𝚘𝚗𝚎𝚛 𝚎𝚗 𝚝𝚞𝚜 𝚜𝚝𝚒𝚌𝚔𝚎𝚛𝚜.')
    try {
      const fullArgs = args.join(' ')
      const [metadatos01, metadatos02] = fullArgs.split(/\||•/).map((meta) => meta.trim())
      user.metadatos = metadatos01 || ''
      user.metadatos2 = metadatos02 || ''
      await client.sendMessage(m.chat, { text: `✎ Los metadatos de tus stickers se han actualizado correctamente.` }, { quoted: m })
    } catch (e) {
      await m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
};