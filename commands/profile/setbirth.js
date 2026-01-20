import moment from 'moment'
moment.locale('es')

export default {
  command: ['setbirth'],
  category: 'profile',
  run: async (client, m, args, usedPrefix, command) => {
    const user = global.db.data.users[m.sender]
    const currentYear = new Date().getFullYear()
    const input = args.join(' ').trim()

    if (!input)
      return m.reply(
        `𖣔 𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚝𝚞 𝚏𝚎𝚌𝚑𝚊 𝚍𝚎 𝚗𝚊𝚌𝚒𝚖𝚒𝚎𝚗𝚝𝚘.\n\n` +
        `➤ 𝚎𝚓𝚎𝚖𝚙𝚕𝚘𝚜:\n` +
        `• ${usedPrefix + command} 01/01/2000\n` +
        `• ${usedPrefix + command} 01/01`
      )

    const birth = validarFechaNacimiento(input, currentYear, usedPrefix, command)

    if (typeof birth === 'string' && birth.startsWith('✦'))
      return m.reply(birth)

    if (!birth)
      return m.reply(
        `𖣔 𝚏𝚎𝚌𝚑𝚊 𝚗𝚘 𝚟𝚊́𝚕𝚒𝚍𝚊.\n` +
        `➤ 𝚞𝚜𝚊: ${usedPrefix + command} 01/01/2000`
      )

    user.birth = birth

    return m.reply(
      `☻︎ 𝚏𝚎𝚌𝚑𝚊 𝚍𝚎 𝚗𝚊𝚌𝚒𝚖𝚒𝚎𝚗𝚝𝚘 𝚐𝚞𝚊𝚛𝚍𝚊𝚍𝚊:\n` +
      `➤ ${user.birth}`
    )
  },
}

function validarFechaNacimiento(text, currentYear, usedPrefix, command) {
  const formatos = ['DD/MM/YYYY', 'DD/MM', 'D MMM', 'D MMM YYYY']
  let fecha = null

  for (const formato of formatos) {
    const f = moment(text, formato, true)
    if (f.isValid()) {
      fecha = f
      break
    }
  }

  if (!fecha) return null

  if (!/\d{4}/.test(text)) {
    fecha.year(currentYear)
  }

  const año = fecha.year()
  const edad = currentYear - año

  if (año > currentYear) {
    return `✦ 𝚎𝚕 𝚊𝚗̃𝚘 𝚗𝚘 𝚙𝚞𝚎𝚍𝚎 𝚜𝚎𝚛 𝚖𝚊𝚢𝚘𝚛 𝚊 ${currentYear}\n` +
           `➤ ${usedPrefix + command} 01/12/${currentYear}`
  }

  if (edad > 120) {
    return `✦ 𝚎𝚜𝚊 𝚏𝚎𝚌𝚑𝚊 𝚗𝚘 𝚎𝚜 𝚟𝚊́𝚕𝚒𝚍𝚊`
  }

  const diaSemana = fecha.format('dddd')
  const dia = fecha.date()
  const mes = fecha.format('MMMM')

  return `${diaSemana}, ${dia} 𝚍𝚎 ${mes} 𝚍𝚎 ${año}`
}