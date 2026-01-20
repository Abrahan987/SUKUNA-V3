import fs from 'fs';
import path from 'path';
import ws from 'ws';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default {
  command: ['bots', 'sockets'],
  category: 'socket',
  run: async (client, m) => {
    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const bot = global.db.data.settings[botId]
    const botname = bot.botname
    const namebot = bot.namebot
    const banner = bot.icon

    const from = m.key.remoteJid
    const groupMetadata = m.isGroup
      ? await client.groupMetadata(from).catch(() => {})
      : ''

    const groupParticipants =
      groupMetadata?.participants?.map(p =>
        p.phoneNumber || p.jid || p.lid || p.id
      ) || []

    const mainBotJid =
      global.client.user.id.split(':')[0] + '@s.whatsapp.net'

    const isMainBotInGroup = groupParticipants.includes(mainBotJid)

    const basePath = path.join(dirname, '../../Sessions')
    const folders = { Subs: 'Subs' }

    const getBotsFromFolder = (folderName) => {
      const folderPath = path.join(basePath, folderName)
      if (!fs.existsSync(folderPath)) return []
      return fs.readdirSync(folderPath)
        .filter(dir => fs.existsSync(path.join(folderPath, dir, 'creds.json')))
        .map(id => id.replace(/\D/g, ''))
    }

    const subs = getBotsFromFolder(folders.Subs)

    const categorizedBots = { Owner: [], Sub: [] }
    const mentionedJid = []

    const formatBot = (number, label) => {
      const jid = number + '@s.whatsapp.net'
      if (!groupParticipants.includes(jid)) return null
      mentionedJid.push(jid)
      const data = global.db.data.settings[jid]
      const name = data?.namebot || 'Bot'
      return `- [${label} *${name}*] › @${number}`
    }

    if (global.db.data.settings[mainBotJid] && isMainBotInGroup) {
      const name = global.db.data.settings[mainBotJid].namebot
      mentionedJid.push(mainBotJid)
      categorizedBots.Owner.push(
        `- [Owner *${name}*] › @${mainBotJid.split('@')[0]}`
      )
    }

    subs.forEach(num => {
      const line = formatBot(num, 'Sub')
      if (line) categorizedBots.Sub.push(line)
    })

    const totalOwner = global.db.data.settings[mainBotJid] ? 1 : 0
    const totalSub = subs.length
    const totalBots = totalOwner + totalSub
    const totalInGroup =
      categorizedBots.Owner.length + categorizedBots.Sub.length

    let message =
      `☢︎ 𝚋𝚘𝚝𝚜 𝚊𝚌𝚝𝚒𝚟𝚘𝚜 𝚍𝚎𝚝𝚎𝚌𝚝𝚊𝚍𝚘𝚜 *(${totalBots})*\n\n` +
      `➤ 𝚙𝚛𝚒𝚗𝚌𝚒𝚙𝚊𝚕𝚎𝚜 › *${totalOwner}*\n` +
      `➤ 𝚜𝚞𝚋𝚜 › *${totalSub}*\n\n` +
      `➤ 𝚍𝚎𝚗𝚝𝚛𝚘 𝚍𝚎𝚕 𝚐𝚛𝚞𝚙𝚘 › *${totalInGroup}*\n`

    for (const category of ['Owner', 'Sub']) {
      if (categorizedBots[category].length) {
        message += categorizedBots[category].join('\n') + '\n'
      }
    }

    await client.sendContextInfoIndex(
      m.chat,
      message,
      {},
      m,
      true,
      mentionedJid
    )
  },
};