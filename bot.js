const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Khởi tạo bot Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ],
});

const GUILD_ID = "1396121688663523570";  

// API /online
app.get("/online", async (req, res) => {
  try {
    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) return res.json({ error: "Không tìm thấy guild" });

    await guild.members.fetch();
    const onlineCount = guild.members.cache.filter(
      m => m.presence && m.presence.status !== "offline"
    ).size;

    res.json({ online: onlineCount });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Khi bot sẵn sàng
client.once("ready", () => {
  console.log(`✅ Bot ${client.user.tag} đã online!`);
  app.listen(PORT, () => console.log(`🌐 API chạy tại http://localhost:${PORT}/online`));
});

// Login bằng token từ biến môi trường
client.login(process.env.DISCORD_TOKEN);
