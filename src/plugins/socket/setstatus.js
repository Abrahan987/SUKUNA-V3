export default {
  command: ["setstatus"],
  category: "socket",
  run: async (client, m, args) => {
    const idBot = client.user.id.split(":")[0] + "@s.whatsapp.net";
    const config = global.db.data.settings[idBot];
    const isOwner2 = [
      idBot,
      ...(config.owner ? [config.owner] : []),
      ...global.owner.map((num) => num + "@s.whatsapp.net"),
    ].includes(m.sender);
    if (!isOwner2) return m.reply(mess.socket);
    const value = args.join(" ").trim();
    if (!value)
      return m.reply(
        `❀ 𝙴𝚜𝚌𝚛𝚒𝚋𝚎 𝚞𝚗 𝚎𝚜𝚝𝚊𝚍𝚘 𝚟𝚊𝚕𝚒𝚍𝚘.\n> 𝙴𝚓𝚎𝚖𝚙𝚕𝚘: *${usedPrefix + command} 𝙷𝚘𝚕𝚊! 𝚜𝚘𝚢 𝙰𝙱𝚁𝙰𝙷𝙰𝙽*`,
      );
    await client.updateProfileStatus(value);
    return m.reply(`✿ 𝙴𝚜𝚝𝚊𝚍𝚘 𝚍𝚎𝚕 𝚋𝚘𝚝 𝚜𝚎 𝚊𝚌𝚝𝚞𝚊𝚕𝚒𝚣𝚘 𝚊 *${value}*!`);
  },
};
