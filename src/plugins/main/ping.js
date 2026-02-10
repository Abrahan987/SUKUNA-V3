export default {
  command: ["ping", "p"],
  category: "info",
  run: async (client, m) => {
    const start = Date.now();

    const botId = client.user.id.split(":")[0] + "@s.whatsapp.net";
    const botName = global.db.data.settings[botId]?.namebot || "Bot";

    const sent = await client.sendMessage(
      m.chat,
      {
        text: `☢︎︎ 𝙿𝚒𝚗𝚐

❖ 𝙴𝚜𝚝𝚊𝚍𝚘
> 𝙲𝚘𝚖𝚙𝚛𝚘𝚋𝚊𝚗𝚍𝚘…

❖ 𝙱𝚘𝚝
> ${botName}`,
      },
      { quoted: m },
    );

    const latency = Date.now() - start;

    await client.sendMessage(
      m.chat,
      {
        text: `☢︎︎ 𝙿𝚘𝚗𝚐

❖ 𝙻𝚊𝚝𝚎𝚗𝚌𝚒𝚊
> ${latency} 𝚖𝚜`,
        edit: sent.key,
      },
      { quoted: m },
    );
  },
};
