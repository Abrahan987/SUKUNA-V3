export default {
  command: ['deldescription', 'deldesc'],
  category: 'rpg',
  run: async (client, m) => {

    const user = global.db.data.users[m.sender]

    if (!user.description)
      return m.reply(`☹︎ 𝚗𝚘 𝚑𝚊𝚜 𝚍𝚎𝚏𝚒𝚗𝚒𝚍𝚘 𝚞𝚗𝚊 𝚍𝚎𝚜𝚌𝚛𝚒𝚙𝚌𝚒𝚘́𝚗`)

    user.description = ''

    return m.reply(
      `✵ 𝚝𝚞 𝚍𝚎𝚜𝚌𝚛𝚒𝚙𝚌𝚒𝚘́𝚗 𝚏𝚞𝚎 𝚋𝚘𝚛𝚛𝚊𝚍𝚊 𝚌𝚘𝚗 𝚎́𝚡𝚒𝚝𝚘`
    )
  },
}