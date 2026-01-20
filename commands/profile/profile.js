import moment from 'moment-timezone'
import { resolveLidToRealJid } from "../../lib/utils.js"

const growth = Math.pow(Math.PI / Math.E, 1.618) * Math.E * 0.75
function xpRange(level, multiplier = global.multiplier || 2) {
  if (level < 0) throw new TypeError('level cannot be negative value')
  level = Math.floor(level)
  const min = level === 0 ? 0 : Math.round(Math.pow(level, growth) * multiplier) + 1
  const max = Math.round(Math.pow(level + 1, growth) * multiplier)
  return { min, max, xp: max - min }
}

export default {
  command: ['profile', 'perfil'],
  category: 'rpg',
  run: async (client, m, args, usedPrefix, command) => {

    const mention = m.mentionedJid
    const who = mention.length > 0 ? mention[0] : m.quoted ? m.quoted.sender : m.sender
    const userId = await resolveLidToRealJid(who, client, m.chat)

    const chat = global.db.data.chats[m.chat] || {}
    const chatUsers = chat.users || {}
    const globalUsers = global.db.data.users || {}
    const userss = chatUsers[userId]

    if (!userss)
      return m.reply(`𖣔 𝚎𝚜𝚝𝚎 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚗𝚘 𝚎𝚜𝚝𝚊́ 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚊𝚍𝚘 𝚎𝚗 𝚎𝚕 𝚜𝚒𝚜𝚝𝚎𝚖𝚊`)

    const idBot = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const settings = global.db.data.settings[idBot] || {}
    const currency = settings.currency || ''

    const user = chatUsers[userId] || {}
    const user2 = globalUsers[userId] || {}

    const name = user2.name || 'Sin nombre'
    const birth = user2.birth || 'No definido'
    const genero = user2.genre || 'Oculto'
    const comandos = user2.usedcommands || 0
    const pareja = user2.marry ? globalUsers[user2.marry]?.name || '???' : 'Nadie'
    const estadoCivil =
      genero === 'Mujer' ? 'Unida con' :
      genero === 'Hombre' ? 'Unido con' :
      'Vinculad@ con'

    const desc = user2.description ? `\n${user2.description}` : ''
    const pasatiempo = user2.pasatiempo || 'No establecido'

    const exp = user2.exp || 0
    const nivel = user2.level || 0
    const chocolates = user.coins || 0
    const banco = user.bank || 0
    const totalCoins = chocolates + banco

    const favId = user.favorite
    const favLine =
      favId && chat.characters?.[favId]
        ? `\n✵ 𝚌𝚕𝚊𝚒𝚖 𝚏𝚊𝚟𝚘𝚛𝚒𝚝𝚘: *${chat.characters[favId].name || '???'}*`
        : ''

    const ownedIDs = Object.entries(chat.characters || {})
      .filter(([, c]) => c.user === userId)
      .map(([id]) => id)

    const haremCount = ownedIDs.length
    const haremValue = ownedIDs.reduce((acc, id) => {
      const local = chat.characters?.[id] || {}
      const globalRec = global.db.data.characters?.[id] || {}
      const value =
        typeof globalRec.value === 'number'
          ? globalRec.value
          : typeof local.value === 'number'
          ? local.value
          : 0
      return acc + value
    }, 0)

    const perfil = await client.profilePictureUrl(userId, 'image')
      .catch(() => 'https://cdn.stellarwa.xyz/files/1751246122292.jpg')

    const users = Object.entries(globalUsers)
      .map(([jid, data]) => ({ ...data, jid }))
      .sort((a, b) => (b.level || 0) - (a.level || 0))

    try {
      const rank = users.findIndex(u => u.jid === userId) + 1
      const { min, xp } = xpRange(nivel, global.multiplier)
      const progreso = exp - min
      const porcentaje = xp > 0 ? Math.floor((progreso / xp) * 100) : 0

      const profileText =
`☼ 𝚙𝚎𝚛𝚏𝚒𝚕 𝚍𝚎 ${name}${desc}

𖦹 𝚌𝚞𝚖𝚙𝚕𝚎𝚊𝚗̃𝚘𝚜: *${birth}*
𖦹 𝚙𝚊𝚜𝚊𝚝𝚒𝚎𝚖𝚙𝚘: *${pasatiempo}*
𖦹 𝚐𝚎́𝚗𝚎𝚛𝚘: *${genero}*
𖦹 ${estadoCivil}: *${pareja}*

𖣔 𝚗𝚒𝚟𝚎𝚕: *${nivel}*
𖣔 𝚎𝚡𝚙: *${exp.toLocaleString()}*
𖣔 𝚊𝚟𝚊𝚗𝚌𝚎: *${progreso} / ${xp}* (${porcentaje}%)
𖣔 𝚛𝚊𝚗𝚔: *#${rank}*

✵ 𝚑𝚊𝚛𝚎𝚖: *${haremCount}*
✵ 𝚟𝚊𝚕𝚘𝚛 𝚝𝚘𝚝𝚊𝚕: *${haremValue.toLocaleString()}*${favLine}

☻︎ 𝚌𝚘𝚒𝚗𝚜: *¥${totalCoins.toLocaleString()} ${currency}*
☻︎ 𝚌𝚘𝚖𝚊𝚗𝚍𝚘𝚜 𝚞𝚜𝚊𝚍𝚘𝚜: *${comandos.toLocaleString()}*`

      await client.sendMessage(
        m.chat,
        { image: { url: perfil }, caption: profileText },
        { quoted: m }
      )

    } catch (e) {
      return m.reply(
        `☹︎ 𝚘𝚌𝚞𝚛𝚛𝚒𝚘́ 𝚞𝚗 𝚏𝚊𝚕𝚕𝚘 𝚊𝚕 𝚌𝚊𝚛𝚐𝚊𝚛 𝚎𝚕 𝚙𝚎𝚛𝚏𝚒𝚕.\n` +
        `➤ ${e.message}`
      )
    }
  }
}