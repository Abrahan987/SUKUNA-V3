export default {
  command: ["report", "reporte", "sug", "suggest"],
  category: "info",
  run: async (client, m, args, usedPrefix, command, text) => {
    const texto = text.trim();
    const now = Date.now();
    const cooldown = global.db.data.users[m.sender].sugCooldown || 0;
    const restante = cooldown - now;

    if (restante > 0) {
      return m.reply(
        `☢︎︎ 𝙰𝚞́𝚗 𝚍𝚎𝚋𝚎𝚜 𝚎𝚜𝚙𝚎𝚛𝚊𝚛 *${msToTime(restante)}* 𝚙𝚊𝚛𝚊 𝚎𝚗𝚟𝚒𝚊𝚛 𝚘𝚝𝚛𝚘 𝚖𝚎𝚗𝚜𝚊𝚓𝚎.`,
      );
    }

    if (!texto) {
      return m.reply(`☢︎︎ 𝙴𝚜𝚌𝚛𝚒𝚋𝚎 𝚎𝚕 𝚍𝚎𝚝𝚊𝚕𝚕𝚎 𝚍𝚎 𝚝𝚞 𝚛𝚎𝚙𝚘𝚛𝚝𝚎 𝚘 𝚜𝚞𝚐𝚎𝚛𝚎𝚗𝚌𝚒𝚊.`);
    }

    if (texto.length < 10) {
      return m.reply(
        `☢︎︎ 𝚃𝚞 𝚖𝚎𝚗𝚜𝚊𝚓𝚎 𝚎𝚜 𝚖𝚞𝚢 𝚌𝚘𝚛𝚝𝚘, 𝚎𝚡𝚙𝚕𝚒́𝚌𝚊𝚕𝚘 𝚖𝚎𝚓𝚘𝚛 (𝚖𝚒́𝚗𝚒𝚖𝚘 10 𝚌𝚊𝚛𝚊𝚌𝚝𝚎𝚛𝚎𝚜).`,
      );
    }

    const fecha = new Date();
    const fechaLocal = fecha.toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const esReporte = ["report", "reporte"].includes(command);
    const tipo = esReporte ? "𝚁𝚎𝚙𝚘𝚛𝚝𝚎" : "𝚂𝚞𝚐𝚎𝚛𝚎𝚗𝚌𝚒𝚊";
    const encabezado = esReporte
      ? "☢︎︎ 𝚁𝚎𝚙𝚘𝚛𝚝𝚎 𝚁𝚎𝚌𝚒𝚋𝚒𝚍𝚘"
      : "☢︎︎ 𝚂𝚞𝚐𝚎𝚛𝚎𝚗𝚌𝚒𝚊 𝙴𝚗𝚟𝚒𝚊𝚍𝚊";

    const user = m.pushName || "Usuario";
    const numero = m.sender.split("@")[0];
    const pp = await client
      .profilePictureUrl(m.sender, "image")
      .catch(() => "https://cdn.yuki-wabot.my.id/files/nufq.jpeg");

    let reportMsg = `☢︎︎ *${tipo}*

❖ 𝙽𝚘𝚖𝚋𝚛𝚎
> ${user}

❖ 𝙽𝚞́𝚖𝚎𝚛𝚘
> wa.me/${numero}

❖ 𝙵𝚎𝚌𝚑𝚊
> ${fechaLocal}

❖ 𝙼𝚎𝚗𝚜𝚊𝚓𝚎
> ${texto}
`;

    for (const num of global.owner) {
      try {
        await global.client.sendContextInfoIndex(
          `${num}@s.whatsapp.net`,
          reportMsg,
          {},
          null,
          false,
          null,
          {
            banner: pp,
            title: encabezado,
            body: "☢︎︎ 𝙼𝚎𝚗𝚜𝚊𝚓𝚎 𝚎𝚗𝚟𝚒𝚊𝚍𝚘 𝚊𝚕 𝚎𝚚𝚞𝚒𝚙𝚘.",
            redes:
              global.db.data.settings[
                client.user.id.split(":")[0] + "@s.whatsapp.net"
              ].link,
          },
        );
      } catch {}
    }

    global.db.data.users[m.sender].sugCooldown = now + 24 * 60 * 60000;

    m.reply(
      `☢︎︎ 𝙶𝚛𝚊𝚌𝚒𝚊𝚜 𝚙𝚘𝚛 𝚝𝚞 *${esReporte ? "reporte" : "sugerencia"}*.\n\n` +
        `> 𝚃𝚞 𝚖𝚎𝚗𝚜𝚊𝚓𝚎 𝚢𝚊 𝚏𝚞𝚎 𝚎𝚗𝚟𝚒𝚊𝚍𝚘 𝚊𝚕 𝚜𝚝𝚊𝚏𝚏.`,
    );
  },
};

const msToTime = (duration) => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  const parts = [];
  if (days > 0) parts.push(`${days} día${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hora${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minuto${minutes > 1 ? "s" : ""}`);
  parts.push(`${seconds} segundo${seconds > 1 ? "s" : ""}`);

  return parts.join(", ");
};
