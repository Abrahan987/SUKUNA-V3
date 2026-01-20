export default {
  command: ['delgenre'],
  category: 'rpg',
  run: async (client, m) => {

    const user = global.db.data.users[m.sender]

    if (!user.genre)
      return m.reply(`☹︎ 𝚗𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚗𝚒𝚗𝚐𝚞́𝚗 𝚐𝚎́𝚗𝚎𝚛𝚘 𝚊𝚜𝚒𝚐𝚗𝚊𝚍𝚘`)

    user.genre = ''

    return m.reply(
      `✵ 𝚝𝚞 𝚐𝚎́𝚗𝚎𝚛𝚘 𝚑𝚊 𝚜𝚒𝚍𝚘 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚍𝚘`
    )
  },
}