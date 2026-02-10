export default {
  command: ["setusername"],
  category: "socket",
  run: async (client, m, args, usedPrefix, command) => {
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
        `✵ 𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚟𝚊𝚕𝚒𝚍𝚘 .\n> 𝙴𝚓𝚎𝚖𝚙𝚕𝚘: *${usedPrefix + command} 𝙰𝙱𝚁𝙰𝙷𝙰𝙽 𝙼*`,
      );
    await client.updateProfileName(value);
    return m.reply(`𖦹 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚍𝚎𝚕 𝚋𝚘𝚝 𝚊𝚌𝚝𝚞𝚕𝚒𝚣𝚊𝚍𝚘 𝚊 *${value}*!`);
  },
};
