import { resolveLidToRealJid } from "../../lib/utils.js";

export default {
  command: ["warns"],
  category: "group",
  isAdmin: true,
  run: async (client, m, args) => {
    const chat = global.db.data.chats[m.chat];
    const mentioned = m.mentionedJid;
    const who2 =
      mentioned.length > 0 ? mentioned[0] : m.quoted ? m.quoted.sender : false;
    const userId = await resolveLidToRealJid(who2, client, m.chat);

    if (!who2 || !chat.users[userId]) {
      return m.reply(
        "☢︎︎ 𝙼𝚎𝚗𝚌𝚒𝚘𝚗𝚊 𝚘 𝚛𝚎𝚜𝚙𝚘𝚗𝚍𝚎 𝚊 𝚞𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚟𝚊́𝚕𝚒𝚍𝚘 𝚙𝚊𝚛𝚊 𝚟𝚎𝚛 𝚜𝚞 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚘.",
      );
    }

    const user = chat.users[userId];
    const total = user.warnings?.length || 0;

    if (total === 0) {
      return client.reply(
        m.chat,
        `☼︎ 𝙴𝚕 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 @${userId.split("@")[0]} 𝚗𝚘 𝚝𝚒𝚎𝚗𝚎 𝚊𝚍𝚟𝚎𝚛𝚝𝚎𝚗𝚌𝚒𝚊𝚜 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚊𝚍𝚊𝚜.`,
        m,
        { mentions: [userId] },
      );
    }

    const name = global.db.data.users[userId].name || "Usuario";

    const warningList = user.warnings
      .map((w, i) => {
        const index = total - i;
        const author = w.by ? `\n> 𝙰𝚞𝚝𝚘𝚛: @${w.by.split("@")[0]}` : "";
        return `\`#${index}\` 𝙼𝚘𝚝𝚒𝚟𝚘: ${w.reason}\n> 𝙵𝚎𝚌𝚑𝚊: ${w.timestamp}${author}`;
      })
      .join("\n\n");

    await client.reply(
      m.chat,
      `۞ 𝙰𝚍𝚟𝚎𝚛𝚝𝚎𝚗𝚌𝚒𝚊𝚜 𝚍𝚎 @${userId.split("@")[0]} (${name})\n> 𝚃𝚘𝚝𝚊𝚕 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚊𝚍𝚊𝚜: \`${total}\`\n\n${warningList}`,
      m,
      { mentions: [userId, ...user.warnings.map((w) => w.by).filter(Boolean)] },
    );
  },
};
