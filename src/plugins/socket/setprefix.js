import GraphemeSplitter from "grapheme-splitter";

export default {
  command: ["setprefix", "setbotprefix"],
  category: "socket",
  run: async (client, m, args, usedPrefix, command) => {
    const idBot = client.user.id.split(":")[0] + "@s.whatsapp.net";
    const config = global.db.data.settings[idBot];
    const isOwner2 = [
      idBot,
      ...(config.owner ? [config.owner] : []),
      ...global.owner.map((num) => num + "@s.whatsapp.net"),
    ].includes(m.sender);
    if (!isOwner2) return client.reply(m.chat, mess.socket, m);
    const value = args.join(" ").trim();
    const defaultPrefix = ["#", "/", "!", "."];
    if (!value) {
      const lista = (
        Array.isArray(config.prefix) ? config.prefix : [config.prefix || "/"]
      )
        .map((p) => `\`${p}\``)
        .join(", ");
      return m.reply(
        `𝙴𝚕𝚒𝚐𝚒 𝚞𝚗 𝚖𝚎𝚝𝚘𝚍𝚘 𝚙𝚊𝚛𝚊 𝚎𝚕 𝚙𝚛𝚎𝚏𝚒𝚡.\n\n> *○ Only-Prefix* » ${usedPrefix + command} *.*\n> *○ Multi-Prefix* » ${usedPrefix + command} *!/.#*\n\nꕥ Actualmente se está usando: ${lista}`,
      );
    }
    if (value.toLowerCase() === "reset") {
      config.prefix = defaultPrefix;
      return client.reply(
        m.chat,
        `𖦹 𝙿𝚛𝚎𝚏𝚒𝚓𝚘 𝚘𝚛𝚒𝚐𝚒𝚗𝚊𝚕 𝚊𝚌𝚝𝚒𝚊𝚕𝚒𝚣𝚊𝚍𝚘: *${defaultPrefix.join(" ")}*`,
        m,
      );
    }
    const splitter = new GraphemeSplitter();
    const graphemes = splitter.splitGraphemes(value);
    const lista = [];
    for (const g of graphemes) {
      if (/^[a-zA-Z]+$/.test(g)) continue;
      if (!lista.includes(g)) lista.push(g);
    }
    if (lista.length === 0)
      return client.reply(
        m.chat,
        "𝙽𝚘 𝚜𝚎 𝚎𝚗𝚌𝚘𝚗𝚝𝚛𝚘 𝚗𝚊𝚍𝚊 𝚟𝚊𝚕𝚒𝚍𝚘 𝚍𝚎𝚋𝚎𝚜 𝚒𝚗𝚌𝚕𝚞𝚒𝚛 𝚞𝚗 𝚜𝚒𝚖𝚋𝚘𝚕𝚘 𝚘 𝚎𝚖𝚘𝚓𝚒 .",
        m,
      );
    if (lista.length > 6) return client.reply(m.chat, "༆ 𝙼𝚊𝚡𝚒𝚖𝚘 6.", m);
    config.prefix = lista;
    return client.reply(
      m.chat,
      `❀ 𝚂𝚎 𝚑𝚊 𝚊𝚌𝚝𝚞𝚊𝚕𝚒𝚣𝚊𝚍𝚘 *${lista.join(" ")}* 𝚎𝚡𝚒𝚝𝚘𝚡𝚊𝚖𝚎𝚗𝚝𝚎 .`,
      m,
    );
  },
};
