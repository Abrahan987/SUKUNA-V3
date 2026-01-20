import fs from 'fs';
import path from 'path';
import { jidDecode } from '@whiskeysockets/baileys';

export default {
  command: ['logout'],
  category: 'socket',
  run: async (client, m, args, usedPrefix, command) => {
    const rawId = client.user?.id || ''
    const decoded = jidDecode(rawId)
    const cleanId = decoded?.user || rawId.split('@')[0]

    const sessionTypes = ['Subs']
    const basePath = 'Sessions'
    const sessionPath = sessionTypes
      .map(type => path.join(basePath, type, cleanId))
      .find(p => fs.existsSync(p))

    if (!sessionPath) {
      return m.reply('☢︎ 𝚎𝚜𝚝𝚎 𝚌𝚘𝚖𝚊𝚗𝚍𝚘 𝚜𝚘𝚕𝚘 𝚎𝚜𝚝𝚊́ 𝚍𝚒𝚜𝚙𝚘𝚗𝚒𝚋𝚕𝚎 𝚎𝚗 𝚜𝚞𝚋-𝚋𝚘𝚝𝚜.')
    }

    try {
      await m.reply('☼︎ 𝚌𝚎𝚛𝚛𝚊𝚗𝚍𝚘 𝚕𝚊 𝚌𝚘𝚗𝚎𝚡𝚒𝚘́𝚗 𝚍𝚎𝚕 𝚋𝚘𝚝...')

      await client.logout()

      setTimeout(() => {
        if (fs.existsSync(sessionPath)) {
          fs.rmSync(sessionPath, { recursive: true, force: true })
          console.log(`✵ 𝚜𝚎𝚜𝚒𝚘́𝚗 ${cleanId} 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚍𝚊 𝚍𝚎 ${sessionPath}`)
        }
      }, 2000)

      setTimeout(() => {
        m.reply(
          `۞ 𝚜𝚎𝚜𝚒𝚘́𝚗 𝚌𝚎𝚛𝚛𝚊𝚍𝚊 𝚌𝚘𝚗 𝚎́𝚡𝚒𝚝𝚘.\n` +
          `𝚙𝚞𝚎𝚍𝚎𝚜 𝚟𝚘𝚕𝚟𝚎𝚛 𝚊 𝚊𝚌𝚝𝚒𝚟𝚊𝚛 𝚌𝚘𝚗 *${usedPrefix}code*`
        )
      }, 3000)

    } catch (e) {
      await m.reply(
        `𖣔 𝚘𝚌𝚞𝚛𝚛𝚒𝚘́ 𝚞𝚗 𝚏𝚊𝚕𝚕𝚘 𝚊𝚕 𝚎𝚓𝚎𝚌𝚞𝚝𝚊𝚛 *${usedPrefix + command}*.\n` +
        `𝚍𝚎𝚝𝚊𝚕𝚕𝚎: *${e.message}*`
      )
    }
  },
};