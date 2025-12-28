const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const deepai = require("deepai");

deepai.setApiKey("DEEP_AI_APIKEY");

client.on("ready", () => {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
    client.user.setPresence({
        status: "dnd",
        activity: {
            name: "surveiller les avatars",
            type: "WATCHING"
        }
    });
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (message.content.startsWith("!check-avatar")) {
        const data = await get_data(message.author.avatarURL);
        const score = data?.output?.nsfw_score;

        if (!score) return;

        if (score > 0.87) {
            return message.channel.send("🚫 **Avatar inapproprié détecté** (contenu potentiellement NSFW).");
        } else {
            return message.channel.send("✅ **Avatar conforme** : aucun contenu inapproprié détecté.");
        }
    }
});

client.on("guildMemberAdd", async (member) => {
    const guild = member.guild;
    const logChannel = guild.channels.cache.get("CHANNEL_ID");

    if (!logChannel) return;

    const data = await get_data(member.user.avatarURL);
    const score = data?.output?.nsfw_score;

    if (!score) return;

    if (score > 0.87) {
        logChannel.send(
            `🚨 **Avatar NSFW détecté** pour ${member.user.tag} (score élevé de contenu sexuel).`
        );
    } else {
        logChannel.send(
            `🟢 Avatar vérifié pour ${member.user.tag} : aucun problème détecté.`
        );
    }
});

client.login(config.TOKEN);

function get_data(imageUrl) {
    return new Promise(async (resolve) => {
        resolve(
            await deepai.callStandardApi("nsfw-detector", {
                image: imageUrl
            })
        );
    });
}
