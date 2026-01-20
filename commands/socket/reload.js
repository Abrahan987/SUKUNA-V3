import { startSubBot } from '../../lib/subs.js';
import fs from 'fs';
import path from 'path';
import { jidDecode } from '@whiskeysockets/baileys';

export default {
  command: ['reload'],
  category: 'socket',
  run: async (client, m, args) => {
    const rawId = client.user?.id || ''
    const decoded = jidDecode(rawId)
    const cleanId = decoded?.user || rawId.split('@')[0]

    const sessionTypes = ['Subs']
    const basePath = 'Sessions'
    const sessionPath = sessionTypes
      .map(type => path.join(basePath, type, cleanId))
      .find(p => fs.existsSync(p))

    if (!sessionPath) {
      return m.reply('☢︎ 𝚎𝚜𝚝𝚊 𝚘𝚙𝚌𝚒𝚘́𝚗 𝚜𝚘𝚕𝚘 𝚏𝚞𝚗𝚌𝚒𝚘𝚗𝚊 𝚍𝚎𝚜𝚍𝚎 𝚞𝚗 𝚜𝚞𝚋-𝚋𝚘𝚝 𝚊𝚌𝚝𝚒𝚟𝚘.')
    }

    const botId = client?.user?.id.split(':')[0] + '@s.whatsapp.net' || ''
    const botSettings = global.db.data.settings[botId] || {}

    const isOficialBot =
      botId === global.client.user.id.split(':')[0] + '@s.whatsapp.net'

    const botType = isOficialBot ? 'Principal/Owner' : 'Sub Bot'

    const caption = '✵ 𝚕𝚊 𝚜𝚎𝚜𝚒𝚘́𝚗 𝚍𝚎𝚕 𝚋𝚘𝚝 𝚏𝚞𝚎 𝚛𝚎𝚒𝚗𝚒𝚌𝚒𝚊𝚍𝚊 𝚜𝚒𝚗 𝚎𝚛𝚛𝚘𝚛𝚎𝚜.'

    const phone = args[0]
      ? args[0].replace(/\D/g, '')
      : m.sender.split('@')[0]

    const chatId = m.chat

    if (botType === 'Sub Bot') {
      startSubBot(m, client, caption, false, phone, chatId, {}, true)
    }

    await client.reply(m.chat, caption, m)
  },
};