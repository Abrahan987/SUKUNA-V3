import { exec } from 'child_process'
import seeCommands from '../../lib/system/commandLoader.js'

export default {
  command: ['fix', 'update'],
  isOwner: true,
  run: async (client, m) => {
    exec('git pull', async (error, stdout, stderr) => {
      global.comandos.clear()
      await seeCommands()
      let msg = ''
      if (stdout.includes('Already up to date.')) {
        msg = 'ꕥ *Estado:* Todo está actualizado'
      } else {
        msg = `*Actualización completada*\n\n${stdout}`
      }
      await client.sendMessage(m.key.remoteJid, { text: msg }, { quoted: m })
    })
  }
}
