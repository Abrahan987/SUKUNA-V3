export default {
  command: ["kick"],
  category: "grupo",
  isAdmin: true,
  botAdmin: true,
  run: async (client, m, args, usedPrefix, command) => {
    if (!m.mentionedJid[0] && !m.quoted) {
      return m.reply(
        "☢︎︎ Etiqueta o responde al *mensaje* de la persona que deseas eliminar del grupo.",
        m,
      );
    }

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    const groupInfo = await client.groupMetadata(m.chat);
    const ownerGroup =
      groupInfo.owner || m.chat.split`-`[0] + "@s.whatsapp.net";
    const ownerBot = global.owner[0][0] + "@s.whatsapp.net";
    const participant = groupInfo.participants.find(
      (p) =>
        p.phoneNumber === user ||
        p.jid === user ||
        p.id === user ||
        p.lid === user,
    );

    if (!participant) {
      return client.reply(
        m.chat,
        `☼︎ @${user.split("@")[0]} ya no forma parte del grupo.`,
        m,
        { mentions: [user] },
      );
    }

    if (user === client.decodeJid(client.user.id)) {
      return m.reply("𖦹 No puedo eliminar al *bot* del grupo.", m);
    }

    if (user === ownerGroup) {
      return m.reply("☻︎ No puedo eliminar al *propietario* del grupo.", m);
    }

    if (user === ownerBot) {
      return m.reply("۞ No puedo eliminar al *propietario* del bot.", m);
    }

    try {
      await client.groupParticipantsUpdate(m.chat, [user], "remove");
      client.reply(
        m.chat,
        `☹︎ @${user.split("@")[0]} ha sido *eliminado* exitosamente.`,
        m,
        { mentions: [user] },
      );
    } catch (e) {
      return m.reply(
        `✵ Ocurrió un error al ejecutar el comando *${usedPrefix + command}*.\n> Intenta nuevamente o contacta soporte.\n> [Error: *${e.message}*]`,
        m,
      );
    }
  },
};
