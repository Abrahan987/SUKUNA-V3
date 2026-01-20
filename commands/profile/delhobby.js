export default {
  command: ['delpasatiempo', 'removehobby'],
  category: 'rpg',
  run: async (client, m) => {

    const user = global.db.data.users[m.sender]

    if (!user.pasatiempo || user.pasatiempo === 'No definido')
      return m.reply(`☹︎ 𝚗𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚗𝚒𝚗𝚐𝚞́𝚗 𝚙𝚊𝚜𝚊𝚝𝚒𝚎𝚖𝚙𝚘 𝚊𝚜𝚒𝚐𝚗𝚊𝚍𝚘`)

    user.pasatiempo = 'No definido'

    return m.reply(
      `✵ 𝚎𝚕 𝚙𝚊𝚜𝚊𝚝𝚒𝚎𝚖𝚙𝚘 𝚑𝚊 𝚜𝚒𝚍𝚘 𝚛𝚎𝚜𝚎𝚝𝚎𝚊𝚍𝚘`
    )
  },
}