
let proposals = {}
import { resolveLidToRealJid } from "../../lib/utils.js"

export default {
  command: ['marry', 'casarse'],
  category: 'rpg',
  run: async (client, m, args) => {

    const db = global.db.data
    const chatId = m.chat
    const proposer = m.sender

    const mention = m.mentionedJid
    const rawTarget = mention.length
      ? mention[0]
      : m.quoted
      ? m.quoted.sender
      : false

    if (!rawTarget)
      return m.reply(`☹︎ 𝚍𝚎𝚋𝚎𝚜 𝚖𝚎𝚗𝚌𝚒𝚘𝚗𝚊𝚛 𝚊 𝚊𝚕𝚐𝚞𝚒𝚎𝚗 𝚙𝚊𝚛𝚊 𝚕𝚊 𝚙𝚛𝚘𝚙𝚞𝚎𝚜𝚝𝚊`)

    const proposee = await resolveLidToRealJid(rawTarget, client, chatId)

    if (proposer === proposee)
      return m.reply(`☹︎ 𝚗𝚘 𝚙𝚞𝚎𝚍𝚎𝚜 𝚙𝚛𝚘𝚙𝚘𝚗𝚎𝚛𝚝𝚎 𝚖𝚊𝚝𝚛𝚒𝚖𝚘𝚗𝚒𝚘 𝚊 𝚝𝚒 𝚖𝚒𝚜𝚖𝚘`)

    if (db.users[proposer]?.marry)
      return m.reply(
        `𖦹 𝚢𝚊 𝚝𝚒𝚎𝚗𝚎𝚜 𝚞𝚗 𝚟𝚒́𝚗𝚌𝚞𝚕𝚘 𝚌𝚘𝚗 *${
          db.users[db.users[proposer].marry]?.name || 'alguien'
        }*`
      )

    if (db.users[proposee]?.marry)
      return m.reply(
        `𖦹 *${db.users[proposee]?.name || proposee.split('@')[0]}* ` +
        `𝚢𝚊 𝚎𝚜𝚝𝚊́ 𝚞𝚗𝚒𝚍@ 𝚌𝚘𝚗 *${
          db.users[db.users[proposee].marry]?.name || 'alguien'
        }*`
      )

    setTimeout(() => {
      delete proposals[proposer]
    }, 120000)

    if (proposals[proposee] === proposer) {
      delete proposals[proposee]

      db.users[proposer].marry = proposee
      db.users[proposee].marry = proposer

      return m.reply(
        `✵ 𝚟𝚒́𝚗𝚌𝚞𝚕𝚘 𝚌𝚘𝚗𝚏𝚒𝚛𝚖𝚊𝚍𝚘\n\n` +
        `𖣔 *${db.users[proposer].name || proposer.split('@')[0]}* ` +
        `𝚢 *${db.users[proposee].name || proposee.split('@')[0]}* ` +
        `𝚊𝚑𝚘𝚛𝚊 𝚌𝚘𝚖𝚙𝚊𝚛𝚝𝚎𝚗 𝚞𝚗 𝚕𝚊𝚣𝚘`
      )

    } else {
      proposals[proposer] = proposee

      return client.sendMessage(
        chatId,
        {
          text:
`☼ 𝚙𝚛𝚘𝚙𝚞𝚎𝚜𝚝𝚊 𝚛𝚎𝚌𝚒𝚋𝚒𝚍𝚊

𖦹 ${db.users[proposee]?.name || proposee.split('@')[0]},
${db.users[proposer]?.name || proposer.split('@')[0]} 𝚍𝚎𝚜𝚎𝚊 𝚏𝚘𝚛𝚖𝚊𝚛 𝚞𝚗 𝚟𝚒́𝚗𝚌𝚞𝚕𝚘 𝚌𝚘𝚗𝚝𝚒𝚐𝚘

✵ 𝚙𝚊𝚛𝚊 𝚊𝚌𝚎𝚙𝚝𝚊𝚛:
➤ _marry ${db.users[proposer]?.name || proposer.split('@')[0]}

☹︎ 𝚎𝚡𝚙𝚒𝚛𝚊 𝚎𝚗 𝟸 𝚖𝚒𝚗𝚞𝚝𝚘𝚜`,
          mentions: [proposer, proposee]
        },
        { quoted: m }
      )
    }
  }
}