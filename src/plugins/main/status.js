import fs from "fs";
import os from "os";
import { sizeFormatter } from "human-readable";

function getDefaultHostId() {
  if (process.env.HOSTNAME) {
    return process.env.HOSTNAME.split("-")[0];
  }
  return "default_host_id";
}

const format = sizeFormatter({
  std: "JEDEC",
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

export default {
  command: ["status", "estado"],
  category: "info",
  run: async (client, m) => {
    const hostId = getDefaultHostId();
    const registeredGroups = global.db.data.chats
      ? Object.keys(global.db.data.chats).length
      : 0;

    const botId = client.user.id.split(":")[0] + "@s.whatsapp.net";
    const botSettings = global.db.data.settings[botId] || {};
    const botname = botSettings.botname || "Bot";

    const userCount = Object.keys(global.db.data.users).length || 0;
    const totalCommands = Object.values(global.db.data.users).reduce(
      (acc, user) => acc + (user.usedcommands || 0),
      0,
    );

    const estadoBot = `☢︎︎ *𝙴𝚜𝚝𝚊𝚍𝚘 𝚍𝚎 ${botname}*

❖ 𝚄𝚜𝚞𝚊𝚛𝚒𝚘𝚜 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚊𝚍𝚘𝚜
> ${userCount.toLocaleString()}

❖ 𝙶𝚛𝚞𝚙𝚘𝚜 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚊𝚍𝚘𝚜
> ${registeredGroups.toLocaleString()}

❖ 𝙲𝚘𝚖𝚊𝚗𝚍𝚘𝚜 𝚎𝚓𝚎𝚌𝚞𝚝𝚊𝚍𝚘𝚜
> ${toNum(totalCommands)}
`;

    const sistema = os.type();
    const cpu = os.cpus().length;
    const ramTotal = format(os.totalmem());
    const ramUsada = format(os.totalmem() - os.freemem());
    const arquitectura = os.arch();

    const estadoServidor = `☢︎︎ *𝙴𝚜𝚝𝚊𝚍𝚘 𝚍𝚎𝚕 𝚂𝚎𝚛𝚟𝚒𝚍𝚘𝚛*

❖ 𝚂𝚒𝚜𝚝𝚎𝚖𝚊
> ${sistema}

❖ 𝙲𝙿𝚄
> ${cpu} 𝚌𝚘𝚛𝚎𝚜

❖ 𝚁𝙰𝙼 𝚃𝚘𝚝𝚊𝚕
> ${ramTotal}

❖ 𝚁𝙰𝙼 𝚄𝚜𝚊𝚍𝚊
> ${ramUsada}

❖ 𝙰𝚛𝚚𝚞𝚒𝚝𝚎𝚌𝚝𝚞𝚛𝚊
> ${arquitectura}

❖ 𝙷𝚘𝚜𝚝 𝙸𝙳
> ${hostId}

☢︎︎ *𝚄𝚜𝚘 𝚍𝚎 𝙼𝚎𝚖𝚘𝚛𝚒𝚊 𝙽𝙾𝙳𝙴𝙹𝚂*

◆ 𝚁𝙰𝙼 𝚄𝚝𝚒𝚕𝚒𝚣𝚊𝚍𝚊
> ${format(process.memoryUsage().rss)}

◆ 𝙷𝚎𝚊𝚙 𝚁𝚎𝚜𝚎𝚛𝚟𝚊𝚍𝚘
> ${format(process.memoryUsage().heapTotal)}

◆ 𝙷𝚎𝚊𝚙 𝚄𝚜𝚊𝚍𝚘
> ${format(process.memoryUsage().heapUsed)}

◆ 𝙼𝚘́𝚍𝚞𝚕𝚘𝚜 𝙽𝚊𝚝𝚒𝚟𝚘𝚜
> ${format(process.memoryUsage().external)}

◆ 𝙱𝚞𝚏𝚏𝚎𝚛𝚜
> ${format(process.memoryUsage().arrayBuffers)}
`;

    await client.reply(m.chat, `${estadoBot}\n${estadoServidor}`, m);
  },
};

function toNum(number) {
  if (number >= 1_000 && number < 1_000_000) {
    return (number / 1_000).toFixed(1) + "k";
  }
  if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  }
  return number.toString();
}
