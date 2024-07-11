module.exports = {
  config: {
    name: "kategame",
    aliases: ["kag"],
    version: "1.0",
    author: "Arcano Malignuis ",
    countDown: 10,
    role: 0,
    shortDescription: "Play king, the oldest gambling game",
    longDescription: "Play king, the oldest gambling game, and earn money",
    category: "game",
    guide: "{pn} <money> <amount of money>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["money"].includes(betType)) {
      return message.reply("💜| 𝘾'𝙚𝙨𝙩 '𝙢𝙤𝙣𝙚𝙮' 𝙘𝙝𝙤𝙪 😘");
    }

    if (!Number.isInteger(betAmount) || betAmount < 1000) {
      return message.reply("🎯| 𝙪𝙣 𝙢𝙤𝙣𝙩𝙖𝙣𝙩 𝙖𝙪 𝙢𝙤𝙞𝙣𝙨 𝙚𝙜𝙖𝙡𝙚 𝙖 1000");
    }

    if (betAmount > userData.money) {
      return message.reply("😯| 𝘝𝘢 𝘧𝘢𝘪𝘳𝘦 𝘶𝘯 𝘱𝘳𝘦𝘵 𝘰𝘶 𝘥𝘦𝘮𝘢𝘯𝘥𝘦 𝘢𝘶 𝘮𝘢𝘪𝘵𝘳𝘦 💁‍♀️");
    }

    const dice = [1, 2, 3, 4, 5, 6];
    const results = [];

    for (let i = 0; i < 3; i++) {
      const result = dice[Math.floor(Math.random() * dice.length)];
      results.push(result);
    }

    const winConditions = {
      small: results.filter((num, index, arr) => num >= 1 && num <= 3 && arr.indexOf(num) !== index).length > 0,
      big: results.filter((num, index, arr) => num >= 4 && num <= 6 && arr.indexOf(num) !== index).length > 0,
    };

    const resultString = results.join(" | ");

    if ((winConditions[betType] && Math.random() <= 0.4) || (!winConditions[betType] && Math.random() > 0.4)) {
      const winAmount = 4 * betAmount;
      userData.money += winAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`🎀𝙆𝘼𝙏𝙀 𝙑𝙀𝙍𝙈𝙄𝙇𝙇𝙄𝙊𝙉🎀\n_________________\n💙[ ${resultString} ]💙\n🎉 | 𝑻𝑼 𝑮𝑨𝑮𝑵𝑬𝑺 💓${winAmount}€💓 𝑻𝑼 𝑷𝑶𝑼𝑹𝑨𝑺 𝑩𝑰𝑬𝑵𝑻𝑶𝑻 𝑬𝑻𝑹𝑬 𝑴𝑶𝑵 𝑽𝑰𝑷 😶`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`🎀𝙆𝘼𝙏𝙀 𝙑𝙀𝙍𝙈𝙄𝙇𝙇𝙄𝙊𝙉🎀\n_________________\n💔[ ${resultString} ]💔\n🙊 | 𝑻𝑼 𝑷𝑬𝑹𝑫𝑺 🌾${betAmount}€🌾 𝑹𝑬𝑪𝑶𝑴𝑴𝑬𝑵𝑪𝑬 𝑳𝑨 𝑷𝑹𝑶𝑪𝑯𝑨𝑰𝑵𝑬 𝑭𝑶𝑰𝑺 😿`);
    }
  }
};
