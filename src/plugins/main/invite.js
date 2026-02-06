function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60)
  let minutes = Math.floor((duration / (1000 * 60)) % 60)
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return `${minutes} 𝙼𝚒𝚗𝚞𝚝𝚘(𝚜) ${seconds} 𝚂𝚎𝚐𝚞𝚗𝚍𝚘(𝚜)`
}

const linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})(?:\s+[0-9]{1,3})?/i

async function getGroupName(client, chatId) {
  try {
    const metadata = await client.groupMetadata(chatId)
    return metadata.subject || '𝙶𝚛𝚞𝚙𝚘 𝚍𝚎𝚜𝚌𝚘𝚗𝚘𝚌𝚒𝚍𝚘'
  } catch {
    return '𝙲𝚑𝚊𝚝 𝚙𝚛𝚒𝚟𝚊𝚍𝚘'
  }
}

export default {
  command: ['invite', 'invitar'],
  category: 'info',
  run: async (client, m, args) => {
    const chatData = global.db.data.chats[m.chat]
    const user = chatData.users[m.sender]

    const grupo = m.isGroup
      ? await getGroupName(client, m.chat)
      : '𝙲𝚑𝚊𝚝 𝚙𝚛𝚒𝚟𝚊𝚍𝚘'

    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const botSettings = global.db.data.settings[botId]

    const botname = botSettings.botname
    const owner = botSettings.owner
    const cooldown = 600000

    const nextTime = user.jointime + cooldown
    if (Date.now() - user.jointime < cooldown) {
      return m.reply(
        `☢︎︎ 𝙳𝚎𝚋𝚎𝚜 𝚎𝚜𝚙𝚎𝚛𝚊𝚛 ${msToTime(nextTime - Date.now())} 𝚊𝚗𝚝𝚎𝚜 𝚍𝚎 𝚎𝚗𝚟𝚒𝚊𝚛 𝚘𝚝𝚛𝚊 𝚒𝚗𝚟𝚒𝚝𝚊𝚌𝚒𝚘́𝚗.`
      )
    }

    if (!args || !args.length) {
      return m.reply(
        '☢︎︎ 𝙳𝚎𝚋𝚎𝚜 𝚒𝚗𝚐𝚛𝚎𝚜𝚊𝚛 𝚞𝚗 𝚎𝚗𝚕𝚊𝚌𝚎 𝚍𝚎 𝚒𝚗𝚟𝚒𝚝𝚊𝚌𝚒𝚘́𝚗.'
      )
    }

    const link = args.join(' ')
    const match = link.match(linkRegex)

    if (!match || !match[1]) {
      return m.reply(
        '☢︎︎ 𝙴𝚕 𝚎𝚗𝚕𝚊𝚌𝚎 𝚒𝚗𝚐𝚛𝚎𝚜𝚊𝚍𝚘 𝚗𝚘 𝚎𝚜 𝚟𝚊́𝚕𝚒𝚍𝚘 𝚘 𝚎𝚜𝚝𝚊́ 𝚒𝚗𝚌𝚘𝚖𝚙𝚕𝚎𝚝𝚘.'
      )
    }

    const isPrincipalBot =
      botId === global.client.user.id.split(':')[0] + '@s.whatsapp.net'

    const botType = isPrincipalBot
      ? '𝙱𝚘𝚝 𝙿𝚛𝚒𝚗𝚌𝚒𝚙𝚊𝚕'
      : '𝚂𝚞𝚋 𝙱𝚘𝚝'

    const pp = await client
      .profilePictureUrl(m.sender, 'image')
      .catch(() => 'https://cdn.yuki-wabot.my.id/files/nufq.jpeg')

    const sugg = `☢︎︎ 𝚂𝚘𝚕𝚒𝚌𝚒𝚝𝚞𝚍 𝚍𝚎 𝚒𝚗𝚟𝚒𝚝𝚊𝚌𝚒𝚘́𝚗

𝚄𝚜𝚞𝚊𝚛𝚒𝚘: ${global.db.data.users[m.sender].name}
𝙶𝚛𝚞𝚙𝚘: ${grupo}
𝙴𝚗𝚕𝚊𝚌𝚎: ${link}

𝙸𝚗𝚏𝚘 𝚍𝚎𝚕 𝙱𝚘𝚝
𝚃𝚒𝚙𝚘: ${botType}
𝙽𝚘𝚖𝚋𝚛𝚎: ${botname}
𝚅𝚎𝚛𝚜𝚒𝚘́𝚗: ${version}`

    if (isPrincipalBot) {
      for (const num of global.owner) {
        await global.client.sendContextInfoIndex(
          `${num}@s.whatsapp.net`,
          sugg,
          {},
          null,
          false,
          null,
          {
            banner: pp,
            title: '☢︎︎ 𝙸𝚗𝚟𝚒𝚝𝚊𝚌𝚒𝚘́𝚗',
            body: '𝙽𝚞𝚎𝚟𝚊 𝚜𝚘𝚕𝚒𝚌𝚒𝚝𝚞𝚍 𝚛𝚎𝚌𝚒𝚋𝚒𝚍𝚊',
            redes: botSettings.link
          }
        )
      }
    } else {
      const destino = owner || botId
      await global.client.sendContextInfoIndex(
        destino,
        sugg,
        {},
        null,
        false,
        null,
        {
          banner: pp,
          title: '☢︎︎ 𝙸𝚗𝚟𝚒𝚝𝚊𝚌𝚒𝚘́𝚗',
          body: '𝙽𝚞𝚎𝚟𝚊 𝚜𝚘𝚕𝚒𝚌𝚒𝚝𝚞𝚍 𝚛𝚎𝚌𝚒𝚋𝚒𝚍𝚊',
          redes: botSettings.link
        }
      )
    }

    await client.reply(
      m.chat,
      '☢︎︎ 𝙻𝚊 𝚒𝚗𝚟𝚒𝚝𝚊𝚌𝚒𝚘́𝚗 𝚏𝚞𝚎 𝚎𝚗𝚟𝚒𝚊𝚍𝚊 𝚌𝚘𝚛𝚛𝚎𝚌𝚝𝚊𝚖𝚎𝚗𝚝𝚎. 𝙶𝚛𝚊𝚌𝚒𝚊𝚜 𝚙𝚘𝚛 𝚞𝚜𝚊𝚛 𝚎𝚕 𝚋𝚘𝚝.',
      m
    )

    user.jointime = Date.now()
  }
}