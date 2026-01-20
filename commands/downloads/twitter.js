import fetch from 'node-fetch'

export default {
  command: ['twitter', 'x', 'xdl'],
  category: 'downloader',
  run: async (client, m, args, usedPrefix, command) => {
    if (!args[0]) {
      return m.reply('《✧》 Por favor, ingrese un enlace de Twitter/X.')
    }
    if (!args[0].match(/(twitter|x)\.com\/\w+\/status\//)) {
      return m.reply('《✧》 El enlace no parece válido. Asegúrate de que sea de Twitter/X.')
    }
    try {
      const data = await getTwitterMedia(args[0])
      if (!data) return m.reply('《✧》 No se pudo obtener el contenido.')
      const caption =
        `ㅤ۟∩　ׅ　★ ໌　ׅ　🅣witter 🅓ownload　ׄᰙ\n\n` +
        `${data.title ? `𖣣ֶㅤ֯⌗ ❀  ⬭ *Título* › ${data.title}\n` : ''}` +
        `${data.author ? `𖣣ֶㅤ֯⌗ ❀  ⬭ *Autor* › ${data.author}\n` : ''}` +
        `${data.date ? `𖣣ֶㅤ֯⌗ ❀  ⬭ *Fecha* › ${data.date}\n` : ''}` +
        `${data.duration ? `𖣣ֶㅤ֯⌗ ❀  ⬭ *Duración* › ${data.duration}\n` : ''}` +
        `${data.resolution ? `𖣣ֶㅤ֯⌗ ❀  ⬭ *Resolución* › ${data.resolution}\n` : ''}` +
        `${data.views ? `𖣣ֶㅤ֯⌗ ❀  ⬭ *Vistas* › ${data.views}\n` : ''}` +
        `${data.likes ? `𖣣ֶㅤ֯⌗ ❀  ⬭ *Likes* › ${data.likes}\n` : ''}` +
        `${data.comments ? `𖣣ֶㅤ֯⌗ ❀  ⬭ *Comentarios* › ${data.comments}\n` : ''}` +
        `${data.retweets ? `𖣣ֶㅤ֯⌗ ❀  ⬭ *Retweets* › ${data.retweets}\n` : ''}` +
        `𖣣ֶㅤ֯⌗ ❀  ⬭ *Enlace* › ${args[0]}`
      if (data.type === 'video') {
        await client.sendMessage(m.chat, { video: { url: data.url }, caption, mimetype: 'video/mp4', fileName: 'twitter.mp4' }, { quoted: m })
      } else if (data.type === 'image') {
        await client.sendMessage(m.chat, { image: { url: data.url }, caption }, { quoted: m })
      } else {
        throw new Error('Contenido no soportado.')
      }
    } catch (e) {
      await m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  }
}

async function getTwitterMedia(url) {
  const apis = [
    { endpoint: `${global.APIs.stellar.url}/dl/twitter?url=${encodeURIComponent(url)}&key=${global.APIs.stellar.key}`, extractor: res => {
        if (!res.status || !res.data?.result?.length) return null
        const media = res.data.result[0]
        return { type: res.data.type, title: res.data.title || null, duration: res.data.duration || null, resolution: media.quality || null, url: media.url, thumbnail: res.data.thumbnail || null }
      }
    },
    { endpoint: `${global.APIs.nekolabs.url}/downloader/twitter?url=${encodeURIComponent(url)}`, extractor: res => {
        if (!res.success || !res.result?.media?.length) return null
        const media = res.result.media[0]
        const variant = media.variants?.at(-1)
        return { type: media.type, title: res.result.title || null, resolution: variant?.resolution || null, url: variant?.url || null, thumbnail: media.thumbnail || null }
      }
    },
    { endpoint: `${global.APIs.delirius.url}/download/twitterv2?url=${encodeURIComponent(url)}`, extractor: res => {
        if (!res.status || !res.data?.media?.length) return null
        const media = res.data.media[0]
        const video = media.videos?.at(-1)
        return { type: media.type, title: res.data.description || null, author: res.data.author?.username || null, date: res.data.createdAt || null, duration: media.duration || null, resolution: video?.quality || null, url: video?.url || null, thumbnail: media.cover || null, views: res.data.view || null, likes: res.data.favorite || null, comments: res.data.replie || null, retweets: res.data.retweet || null }
      }
    },
    { endpoint: `${global.APIs.siputzx.url}/api/d/twitter?url=${encodeURIComponent(url)}`, extractor: res => {
        if (!res.status || !res.data?.downloadLink) return null
        return { type: 'video', title: res.data.videoTitle || null, url: res.data.downloadLink, thumbnail: res.data.imgUrl || null }
      }
    }
  ]

  for (const { endpoint, extractor } of apis) {
    try {
      const res = await fetch(endpoint).then(r => r.json())
      const result = extractor(res)
      if (result) return result
    } catch {}
    await new Promise(r => setTimeout(r, 500))
  }
  return null
}