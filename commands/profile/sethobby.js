export default {
  command: ['setpasatiempo', 'sethobby'],
  category: 'rpg',
  run: async (client, m, args, usedPrefix) => {
    const user = global.db.data.users[m.sender]
    const input = args.join(' ').trim()

    const pasatiemposDisponibles = [
      '📚 Leer', '✍️ Escribir', '🎤 Cantar', '💃 Bailar', '🎮 Jugar',
      '🎨 Dibujar', '🍳 Cocinar', '✈️ Viajar', '🏊 Nadar', '📸 Fotografía',
      '🎧 Escuchar música', '🏀 Deportes', '🎬 Ver películas', '🌿 Jardinería',
      '🧵 Manualidades', '🎲 Juegos de mesa', '🏋️‍♂️ Gimnasio', '🚴 Ciclismo',
      '🎯 Tiro con arco', '🍵 Ceremonia del té', '🧘‍♂️ Meditación', '🎪 Malabares',
      '🛠️ Bricolaje', '🎹 Tocar instrumentos', '🐶 Cuidar mascotas', '🌌 Astronomía',
      '♟️ Ajedrez', '🍷 Catación de vinos', '🛍️ Compras', '🏕️ Acampar',
      '🎣 Pescar', '📱 Tecnología', '🎭 Teatro', '🍽️ Gastronomía', '🏺 Coleccionar',
      '✂️ Costura', '🧁 Repostería', '📝 Blogging', '🚗 Automóviles', '🧩 Rompecabezas',
      '🎳 Bolos', '🏄 Surf', '⛷️ Esquí', '🎿 Snowboard', '🤿 Buceo', '🏹 Tiro al blanco',
      '🧭 Orientación', '🏇 Equitación', '🎨 Pintura', '📊 Invertir', '🌡️ Meteorología',
      '🔍 Investigar', '💄 Maquillaje', '💇‍♂️ Peluquería', '🛌 Dormir', '🍺 Cervecería',
      '🪓 Carpintería', '🧪 Experimentos', '📻 Radioafición', '🗺️ Geografía',
      '💎 Joyería', 'Otro 🌟'
    ]

    if (!input) {
      let lista = '☢︎ 𝚜𝚎𝚕𝚎𝚌𝚌𝚒𝚘𝚗𝚊 𝚞𝚗 𝚙𝚊𝚜𝚊𝚝𝚒𝚎𝚖𝚙𝚘 𝚍𝚎 𝚕𝚊 𝚕𝚒𝚜𝚝𝚊:\n\n'
      pasatiemposDisponibles.forEach((p, i) => {
        lista += `${i + 1}) ${p}\n`
      })
      lista +=
        `\n➤ 𝚏𝚘𝚛𝚖𝚊𝚜 𝚍𝚎 𝚞𝚜𝚘:\n` +
        `${usedPrefix}setpasatiempo 1\n` +
        `${usedPrefix}setpasatiempo Leer\n` +
        `${usedPrefix}setpasatiempo "Otro 🌟"`
      return m.reply(lista)
    }

    let pasatiempoSeleccionado = ''

    if (/^\d+$/.test(input)) {
      const index = parseInt(input) - 1
      if (index >= 0 && index < pasatiemposDisponibles.length) {
        pasatiempoSeleccionado = pasatiemposDisponibles[index]
      } else {
        return m.reply(
          `☼︎ 𝚗𝚞́𝚖𝚎𝚛𝚘 𝚏𝚞𝚎𝚛𝚊 𝚍𝚎 𝚛𝚊𝚗𝚐𝚘, 𝚞𝚜𝚊 𝟷–${pasatiemposDisponibles.length}.`
        )
      }
    } else {
      const inputLimpio = input.replace(/[^\w\s]/g, '').toLowerCase().trim()
      const encontrado = pasatiemposDisponibles.find(p =>
        p.replace(/[^\w\s]/g, '').toLowerCase().includes(inputLimpio)
      )
      if (encontrado) {
        pasatiempoSeleccionado = encontrado
      } else {
        return m.reply(
          '۞ 𝚗𝚘 𝚜𝚎 𝚎𝚗𝚌𝚘𝚗𝚝𝚛𝚘́ 𝚎𝚜𝚎 𝚙𝚊𝚜𝚊𝚝𝚒𝚎𝚖𝚙𝚘, 𝚛𝚎𝚟𝚒𝚜𝚊 𝚕𝚊 𝚕𝚒𝚜𝚝𝚊 𝚌𝚘𝚖𝚙𝚕𝚎𝚝𝚊.'
        )
      }
    }

    if (user.pasatiempo === pasatiempoSeleccionado) {
      return m.reply(
        `𖣔 𝚢𝚊 𝚝𝚒𝚎𝚗𝚎𝚜 𝚎𝚜𝚎 𝚙𝚊𝚜𝚊𝚝𝚒𝚎𝚖𝚙𝚘 𝚊𝚜𝚒𝚐𝚗𝚊𝚍𝚘:\n*${user.pasatiempo}*`
      )
    }

    user.pasatiempo = pasatiempoSeleccionado

    return m.reply(
      `✵ 𝚙𝚊𝚜𝚊𝚝𝚒𝚎𝚖𝚙𝚘 𝚐𝚞𝚊𝚛𝚍𝚊𝚍𝚘 𝚌𝚘𝚗 𝚎́𝚡𝚒𝚝𝚘:\n> *${user.pasatiempo}*`
    )
  },
};