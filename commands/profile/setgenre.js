export default {
  command: ['setgenre'],
  category: 'rpg',
  run: async (client, m, args, usedPrefix, command) => {
    const user = global.db.data.users[m.sender]
    const input = args.join(' ').toLowerCase().trim()

    if (!input)
      return m.reply(
        `☢︎ 𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗 𝚐𝚎́𝚗𝚎𝚛𝚘 𝚟𝚊́𝚕𝚒𝚍𝚘.\n\n` +
        `➤ 𝚎𝚓𝚎𝚖𝚙𝚕𝚘𝚜:\n` +
        `• ${usedPrefix + command} hombre\n` +
        `• ${usedPrefix + command} mujer`
      )

    const genresList = [
      'Hombre', 'Mujer', 'Femboy', 'Transgénero',
      'Gay', 'Lesbiana', 'No Binario', 'Pansexual',
      'Bisexual', 'Asexual'
    ]

    let genre = null

    if (!isNaN(input)) {
      const index = parseInt(input) - 1
      if (index >= 0 && index < genresList.length) {
        genre = genresList[index]
      }
    } else {
      const found = genresList.find(g => g.toLowerCase() === input)
      if (found) genre = found
    }

    if (!genre) {
      const opciones = genresList
        .map((g, i) => `${i + 1}) ${g}`)
        .join('\n')

      return m.reply(
        `☼︎ 𝚘𝚙𝚌𝚒𝚘́𝚗 𝚗𝚘 𝚟𝚊́𝚕𝚒𝚍𝚊.\n\n` +
        `➤ 𝚐𝚎́𝚗𝚎𝚛𝚘𝚜 𝚍𝚒𝚜𝚙𝚘𝚗𝚒𝚋𝚕𝚎𝚜:\n${opciones}`
      )
    }

    user.genre = genre

    return m.reply(
      `✵ 𝚐𝚎́𝚗𝚎𝚛𝚘 𝚊𝚌𝚝𝚞𝚊𝚕𝚒𝚣𝚊𝚍𝚘 𝚌𝚘𝚗 𝚎́𝚡𝚒𝚝𝚘:\n> *${user.genre}*`
    )
  },
}