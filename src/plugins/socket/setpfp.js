import * as Jimp from 'jimp';

async function resizeImage(media) {
  const jimp = await Jimp.read(media)
  const min = jimp.getWidth()
  const max = jimp.getHeight()
  const cropped = jimp.crop(0, 0, min, max)
  return { img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG), preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG) }
}

export default {
  command: ['setimage', 'setpfp'],
  category: 'socket',
  run: async (client, m, args) => {
    const idBot = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = global.db.data.settings[idBot]
    const isOwner2 = [idBot, ...(config.owner ? [config.owner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(m.sender)
    if (!isOwner2) return m.reply(mess.socket)
    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!/image/g.test(mime)) return m.reply('𝙳𝚎𝚋𝚎𝚜 𝚎𝚗𝚟𝚒𝚊𝚛 𝚞𝚗𝚊 𝚒𝚖𝚊𝚐𝚎𝚗 𝚘 𝚛𝚎𝚜𝚙𝚘𝚗𝚍𝚎𝚛 𝚙𝚊𝚛𝚊 𝚊𝚌𝚝𝚞𝚊𝚕𝚒𝚣𝚊𝚛 𝚕𝚊 𝚏𝚘𝚝𝚘 𝚍𝚎 𝚙𝚎𝚛𝚏𝚒𝚕 𝚍𝚎𝚕 𝚋𝚘𝚝.')
    const media = await q.download()
    if (!media) return m.reply('☹ 𝙴𝚛𝚛𝚘𝚛 𝚊𝚕 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚛︎.')
    const jid = client.user.id.split(':')[0] + '@s.whatsapp.net'
    if (args[1] === 'full') {
      const { img } = await resizeImage(media)
      await client.query({ tag: 'iq', attrs: { to: jid, type: 'set', xmlns: 'w:profile:picture', }, content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]})
    } else {
      await client.updateProfilePicture(jid, media)
    }
    return m.reply(`ఌ︎ 𝙵𝚘𝚝𝚘 𝚍𝚎 𝚙𝚎𝚛𝚏𝚒𝚕 𝚊𝚌𝚝𝚞𝚊𝚕𝚒𝚣𝚊𝚍𝚊 𝚊  *${config.namebot}*!`)
  },
};