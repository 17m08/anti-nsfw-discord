# Discord NSFW Avatar Detection Bot

A Discord bot designed to **automatically detect potentially NSFW avatars** using the **DeepAI NSFW Detector API**.  
It helps server staff maintain a safe environment by scanning user avatars manually or when members join the server.

---

## 🚀 Features

- 🔍 AI-based NSFW avatar analysis
- 🧪 Manual avatar check via command
- 👋 Automatic scan when a user joins the server
- ⚠️ Configurable NSFW detection threshold
- 📝 Logging system for moderation channels

---

## 📦 Requirements

- **Node.js** v16 or higher
- A **Discord Bot Token**
- A **DeepAI API Key**

---

## 📥 Installation

1. **Clone the repository**
```bash
git clone https://github.com/17m08/anti-nsfw-discord.git
cd discord-nsfw-avatar-bot
```

2. **Install dependencies**

```bash
npm install
```

3. **Complete the `config.json` file**

```json
{
  "TOKEN": "YOUR_DISCORD_BOT_TOKEN"
}
```

4. **Set your DeepAI API key**
   In the main file:

```js
deepai.setApiKey("YOUR_DEEPAI_API_KEY");
```

---

## ⚙️ Configuration

### Log Channel

Replace `CHANNEL_ID` with the ID of the moderation log channel:

```js
const logChannel = guild.channels.cache.get("CHANNEL_ID");
```

### NSFW Threshold

```js
if (score > 0.87)
```

* Higher value → more permissive
* Lower value → stricter detection

---

## ▶️ Usage

### Manual Avatar Check

```txt
!check-avatar
```

Scans the avatar of the user who runs the command and returns the result in the channel.

---

### Automatic Join Scan

* When a user joins the server, their avatar is automatically analyzed.
* The result is sent to the configured log channel.

---

## 📊 Detection Results

* ✅ **Safe avatar detected**
* 🚫 **Inappropriate / NSFW avatar detected**

> The bot does **not** automatically punish users.
> It only provides detection and logging.

---

## 🧠 Built With

* **Node.js**
* **discord.js**
* **DeepAI NSFW Detector API**

---

## ⚠️ Limitations

* AI-based detection may produce false positives
* No automatic moderation actions (kick / ban / timeout)
* API usage depends on DeepAI rate limits

---

## 🔮 Planned Improvements

* Automatic role assignment or sanctions
* Periodic avatar re-scanning
* Multi-server configuration
* Web dashboard
* Slash command support

---

## 📜 License

This project is open-source and intended for educational and community moderation purposes.
Use responsibly.

---

👤 Developed by **17m08**

```
