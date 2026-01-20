export default {
  command: ['delbirth'],
  category: 'rpg',
  run: async (client, m) => {

    const user = global.db.data.users[m.sender]

    if (!user.birth)
      return m.reply(`☹︎ 𝚗𝚘 𝚝𝚒𝚎𝚗𝚎𝚜 𝚏𝚎𝚌𝚑𝚊 𝚍𝚎 𝚗𝚊𝚌𝚒𝚖𝚒𝚎𝚗𝚝𝚘 𝚐𝚞𝚊𝚛𝚍𝚊𝚍𝚊`)

    user.birth = ''

    return m.reply(
      `✵ 𝚝𝚞 𝚏𝚎𝚌𝚑𝚊 𝚍𝚎 𝚗𝚊𝚌𝚒𝚖𝚒𝚎𝚗𝚝𝚘 𝚑𝚊 𝚜𝚒𝚍𝚘 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚍𝚊`
    )
  },
}