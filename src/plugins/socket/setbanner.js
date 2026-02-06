import fetch from 'node-fetch';
import FormData from 'form-data';

export default {
  command: ['setbanner', 'setbotbanner'],
  category: 'socket',
  run: async (client, m, args) => {
    const idBot = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = global.db.data.settings[idBot]
    const isOwner2 = [idBot, ...(config.owner ? [config.owner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(m.sender)
    if (!isOwner2) return m.reply(mess.socket)

    const value = args.join(' ').trim()

    if (!value && !m.quoted && !m.message.imageMessage && !m.message.videoMessage)
      return m.reply('☢︎ 𝚎𝚗𝚟𝚒́𝚊 𝚘 𝚌𝚒𝚝𝚊 𝚞𝚗𝚊 𝚒𝚖𝚊𝚐𝚎𝚗 / 𝚟𝚒́𝚍𝚎𝚘 𝚙𝚊𝚛𝚊 𝚊𝚜𝚒𝚐𝚗𝚊𝚛 𝚎𝚕 𝚋𝚊𝚗𝚗𝚎𝚛.')

    if (value.startsWith('http')) {
      config.banner = value
      return m.reply(`☼︎ 𝚎𝚕 𝚋𝚊𝚗𝚗𝚎𝚛 𝚍𝚎 *${config.namebot}* 𝚏𝚞𝚎 𝚊𝚌𝚝𝚞𝚊𝚕𝚒𝚣𝚊𝚍𝚘 𝚌𝚘𝚗 𝚎́𝚡𝚒𝚝𝚘.`)
    }

    const q = m.quoted ? m.quoted : m.message.imageMessage ? m : m
    const mime = (q.msg || q).mimetype || q.mediaType || ''

    if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime))
      return m.reply('۞ 𝚎𝚕 𝚊𝚛𝚌𝚑𝚒𝚟𝚘 𝚗𝚘 𝚎𝚜 𝚟𝚊́𝚕𝚒𝚍𝚘, 𝚞𝚜𝚊 𝚞𝚗𝚊 𝚒𝚖𝚊𝚐𝚎𝚗 𝚘 𝚟𝚒́𝚍𝚎𝚘.')

    const buffer = await q.download()
    if (!buffer) return m.reply('𖣔 𝚗𝚘 𝚜𝚎 𝚙𝚞𝚍𝚘 𝚘𝚋𝚝𝚎𝚗𝚎𝚛 𝚎𝚕 𝚊𝚛𝚌𝚑𝚒𝚟𝚘.')

    const url = await uploadImage(buffer, mime)
    config.banner = url

    return m.reply(`✵ 𝚋𝚊𝚗𝚗𝚎𝚛 𝚌𝚊𝚖𝚋𝚒𝚊𝚍𝚘 𝚌𝚘𝚛𝚛𝚎𝚌𝚝𝚊𝚖𝚎𝚗𝚝𝚎 𝚎𝚗 *${config.namebot}*.`)
  },
};

async function uploadImage(buffer, mime) {
  const body = new FormData()
  body.append('files[]', buffer, `file.${mime.split('/')[1]}`)
  const res = await fetch('https://uguu.se/upload.php', {
    method: 'POST',
    body,
    headers: body.getHeaders()
  })
  const json = await res.json()
  return json.files?.[0]?.url
}