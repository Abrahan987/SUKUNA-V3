import ws from 'ws';
import moment from 'moment';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import gradient from 'gradient-string';
import seeCommands from './lib/system/commandLoader.js';
import initDB from './lib/system/initDB.js';
import antilink from './plugins/antilink.js';

seeCommands()

let sessionBotsCache = {
  bots: [],
  lastUpdated: 0
}

function getAllSessionBots() {
  const now = Date.now()
  if (now - sessionBotsCache.lastUpdated < 60000) return sessionBotsCache.bots

  const sessionDirs = ['./Sessions/Subs']
  let bots = []
  for (const dir of sessionDirs) {
    try {
      const fullPath = path.resolve(dir)
      if (fs.existsSync(fullPath)) {
        const subDirs = fs.readdirSync(fullPath)
        for (const sub of subDirs) {
          const credsPath = path.join(fullPath, sub, 'creds.json')
          if (fs.existsSync(credsPath)) {
            bots.push(sub + '@s.whatsapp.net')
          }
        }
      }
    } catch {}
  }
  try {
    const ownerCreds = path.resolve('./Sessions/Owner/creds.json')
    if (fs.existsSync(ownerCreds)) {
      const ownerId = global.client.user.id.split(':')[0] + '@s.whatsapp.net'
      bots.push(ownerId)
    }
  } catch {}

  sessionBotsCache.bots = bots
  sessionBotsCache.lastUpdated = now
  return bots
}

export default async (client, m) => {
  if (!m || !m.message) return
  const botJid = client.user.id.split(':')[0] + '@s.whatsapp.net'
  const sender = m.sender

  if ((m.id.startsWith("3EB0") || (m.id.startsWith("BAE5") && m.id.length === 16) || (m.id.startsWith("B24E") && m.id.length === 20))) return

  initDB(m, client)
  antilink(client, m)

  const chat = global.db.data.chats[m.chat] || {}
  const settings = global.db.data.settings[botJid] || {}
  const user = global.db.data.users[sender] ||= {}
  const users = chat.users?.[sender] || {}

  const rawBotname = settings.namebot || 'SUKUNA V3'
  const namebot = /^[\w\s]+$/.test(rawBotname) ? rawBotname : 'SUKUNA V3'
  const isOwners = [botJid, ...(settings.owner ? [settings.owner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(sender)

  // Prefix handling robust and optimized
  let usedPrefix = m.usedPrefix || ''
  let command = m.command || ''
  let args = m.args || []
  let text = args.join(' ')

  if (!usedPrefix) {
    const activePrefixes = Array.isArray(settings.prefix) ? settings.prefix : (typeof settings.prefix === 'string' ? [settings.prefix] : ['#', '/', '!', '.'])
    const tipo = settings.type || 'Sub'
    const shortForms = [namebot.charAt(0), namebot.split(" ")[0], tipo.split(" ")[0], namebot.split(" ")[0].slice(0, 2), namebot.split(" ")[0].slice(0, 3)]
    const allPrefixes = [...activePrefixes, namebot, ...shortForms]

    for (const p of allPrefixes) {
      if (m.text && m.text.startsWith(p)) {
        usedPrefix = p
        break
      }
    }

    if (usedPrefix) {
      let tempArgs = m.text.slice(usedPrefix.length).trim().split(/\s+/)
      command = (tempArgs.shift() || '').toLowerCase()
      args = tempArgs
      text = args.join(' ')
    }
  }

  if (!command) return

  const from = m.chat
  const pushname = m.pushName || 'Sin nombre'

  // Group logic optimized: only fetch metadata if necessary
  let groupMetadata = null
  let groupAdmins = []
  let groupName = ''
  let isBotAdmins = false
  let isAdmins = false

  if (m.isGroup) {
    const cmdData = global.comandos.get(command)
    if (cmdData?.botAdmin || cmdData?.isAdmin || chat.adminonly) {
      groupMetadata = await client.groupMetadata(m.chat).catch(() => null)
      groupName = groupMetadata?.subject || ''
      groupAdmins = groupMetadata?.participants.filter(p => (p.admin === 'admin' || p.admin === 'superadmin')) || []
      isBotAdmins = groupAdmins.some(p => p.id === botJid)
      isAdmins = groupAdmins.some(p => p.id === sender)
    }
  }

  // Logs only if it's the primary bot or specifically requested
  const chatData = global.db.data.chats[from] || {}
  const consolePrimary = chatData.primaryBot
  if (!consolePrimary || consolePrimary === botJid) {
    const h = chalk.bold.blue('╭────────────────────────────···')
    const t = chalk.bold.blue('╰────────────────────────────···')
    const v = chalk.bold.blue('│')
    console.log(`\n${h}\n${chalk.bold.yellow(`${v} Fecha: ${chalk.whiteBright(moment().format('DD/MM/YY HH:mm:ss'))}`)}\n${chalk.bold.blueBright(`${v} Usuario: ${chalk.whiteBright(pushname)}`)}\n${chalk.bold.magentaBright(`${v} Remitente: ${gradient('deepskyblue', 'darkorchid')(sender)}`)}\n${m.isGroup ? chalk.bold.cyanBright(`${v} Grupo: ${chalk.greenBright(groupName || from)}\n${v} ID: ${gradient('violet', 'midnightblue')(from)}\n`) : chalk.bold.greenBright(`${v} Chat privado\n`)}${t}`)
  }

  // Primary bot check optimized
  const botprimaryId = chat?.primaryBot
  if (botprimaryId && botprimaryId !== botJid) {
    const hasPrefix = usedPrefix !== ''
    if (hasPrefix) {
      const participants = m.isGroup ? (groupMetadata?.participants || (await client.groupMetadata(m.chat).catch(() => ({ participants: [] }))).participants) : []
      const primaryInGroup = participants.some(p => (p.id) === botprimaryId)
      const primaryInSessions = getAllSessionBots().includes(botprimaryId)
      if (primaryInSessions && primaryInGroup) return
    }
  }

  if (!isOwners && settings.self) return
  if (m.chat && !m.chat.endsWith('g.us')) {
    const allowedInPrivateForUsers = ['play', 'menu', 'help']
    if (!isOwners && !allowedInPrivateForUsers.includes(command)) return
  }

  if (chat?.isBanned && !(command === 'bot' && text === 'on') && !isOwners) {
    await m.reply(`۞ *${settings.botname || 'Bot'}* está desactivado en este grupo.\n\n>  Un *administrador* puede activarlo:\n> » *${usedPrefix || '/'}bot on*`)
    return
  }

  const today = new Date().toLocaleDateString('es-CO', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-')
  const userrs = chatData.users?.[sender] || {}
  if (!userrs.stats) userrs.stats = {}
  if (!userrs.stats[today]) userrs.stats[today] = { msgs: 0, cmds: 0 }
  userrs.stats[today].msgs++

  if (chat.adminonly && !isAdmins) return

  const cmdData = global.comandos.get(command)
  if (!cmdData) {
    if (usedPrefix) {
      await client.readMessages([m.key])
      return m.reply(`✰ *${command}* no existe.\n Usa *${usedPrefix}help* para ver la lista de comandos.`)
    }
    return
  }

  if (cmdData.isOwner && !isOwners) return m.reply(` El comando *${command}* no existe.\n✎ Usa *${usedPrefix}help* para ver la lista de comandos.`)
  if (cmdData.isAdmin && !isAdmins) return m.reply(global.mess?.admin || 'Este comando es solo para administradores.')
  if (cmdData.botAdmin && !isBotAdmins) return m.reply(global.mess?.botAdmin || 'Necesito ser administrador para ejecutar este comando.')

  try {
    await client.readMessages([m.key])
    user.usedcommands = (user.usedcommands || 0) + 1
    settings.commandsejecut = (settings.commandsejecut || 0) + 1
    if (users) {
      users.usedTime = new Date()
      users.lastCmd = Date.now()
      if (users.stats && users.stats[today]) users.stats[today].cmds++
    }
    user.exp = (user.exp || 0) + Math.floor(Math.random() * 100)
    user.name = m.pushName

    await cmdData.run(client, m, args, usedPrefix, command, text)
  } catch (error) {
    console.error(error)
    await client.sendMessage(m.chat, { text: `☠︎︎ 𝙴𝚛𝚛𝚘𝚛 𝚊𝚕 𝚎𝚓𝚎𝚌𝚞𝚝𝚊𝚛\n${error}` }, { quoted: m })
  }
}
