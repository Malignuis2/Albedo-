module.exports = {
  config: {
    name: "markgame",
    aliases: ["mrk"],
    version: "1.0",
    author: "ʬɸʬ 𝐒𝐡𝐢𝐬𝐮𝐢 𝐗 𝐀𝐫𝐜𝐚𝐧𝐨 ʬɸʬ",
    countDown: 10,
    role: 0,
    shortDescription: "Amuses toi bien au jeu du hasard",
    longDescription: "Seul le hasard tu rendras riche ou pauvre...Bonne chance",
    category: "game",
    guide: "{pn} <gamble> <amount of money>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["gamble"].includes(betType)) {
      return message.reply("🧘‍♂️| TAPE 'gamble' FILS");
    }

    if (!Number.isInteger(betAmount) || betAmount < 50) {
      return message.reply("😎 | 𝐌𝐢𝐬𝐞 𝐚𝐮 𝐦𝐨𝐢𝐧𝐬 50$ 𝐨𝐮 𝐩𝐥𝐮𝐬.");
    }

    if (betAmount > userData.money) {
      return message.reply("🖕 | REGARDE TON SOLDE AVANT DE MISER CHIEN");
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
      const winAmount = 2 * betAmount;
      userData.money += winAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`💚𝑴𝑨𝑹𝑲 𝑽𝑬𝑹𝑴𝑰𝑳𝑳𝑰𝑶𝑵💚
 ───────────
👑[ ${resultString} ]👑\n💘|𝑪𝑶𝑶𝑳 𝑻𝑼 𝑮𝑨𝑮𝑵𝑬 🎀${winAmount}€🎀!`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`😐𝑴𝑨𝑹𝑲 𝑽𝑬𝑹𝑴𝑰𝑳𝑳𝑰𝑶𝑵😐
  ─────────── 
🍁[ ${resultString} ]🍁\n🎯| 𝑻𝑼 𝑷𝑬𝑹𝑫𝑺 🎀${betAmount}€🎀\n𝑪𝑶𝑴𝑴𝑬 𝑻𝑼 𝑬𝑺 𝑭𝑨𝑰𝑩𝑳𝑬 😹`);
    }
  }
        }
