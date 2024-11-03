const { REST, Routes } = require('discord.js');
const { clientId, token, guildId } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
//
const commands = [
    {
        "name": "actions",
        "description": "Perform moderation actions on users",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "User to moderate",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Reason of the moderation",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    },
    {
        "name": "announce",
        "description": "Send an Announcement through the bot",
        "dm_permission": "false",
        options: [
            {
                "name": "channel",
                "description": "Announcement Channel",
                "type": 7,
                "required": "false"
            },
            {
                "name": "mention",
                "description": "Role/Member to mention",
                "type": 9,
                "required": "false"
            },
        ]
    },
    {
        "name": "avatar",
        "description": "Get the avatar of a selected user, or your own avatar",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options : [
            {
                "name": "user",
                "description": "the user's avatar to show",
                "type": 6,
                "required": "false"
            }
        ]
    },
    {
        "name": "ban",
        "description": "Ban a Member",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "Member to Ban",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Ban Reason",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    },
    {
        "name": "channel",
        "description": "Get information about a channel",
        "dm_permission": "false",
        options: [
            {
                "name": "channel",
                "description": "The channel to get information about",
                "type": 7,
                "required": "true"
            }
        ]
    },
    {
        "name": "deafen",
        "description": "Deafen a Member",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "Member to deafen",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Deafen reason",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    },
    {
        "name": "disconnect",
        "description": "Disconnect a Member from a Voice Channel",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "Member to disconnect",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Disconnect reason",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    },
    {
        "name": "embed",
        "description": "Create an embed with text and settings decided by you",
        "dm_permission": "false",
        options: [
            {
                "name": "color",
                "description": "Select the embed color",
                "type": 3,
                "required": "false",
                choices: [
                    {
                        "name": "Pink",
                        "type": 3,
                        "value": "pink"
                    },
                    {
                        "name": "Red",
                        "type": 3,
                        "value": "red"
                    },
                    {
                        "name": "Orange",
                        "type": 3,
                        "value": "orange"
                    },
                    {
                        "name": "Yellow",
                        "type": 3,
                        "value": "yellow"
                    },
                    {
                        "name": "Green",
                        "type": 3,
                        "value": "green"
                    },
                    {
                        "name": "Blue",
                        "type": 3,
                        "value": "blue"
                    },
                    {
                        "name": "Purple",
                        "type": 3,
                        "value": "purple"
                    },
                    {
                        "name": "White",
                        "type": 3,
                        "value": "white"
                    },
                    {
                        "name": "Black",
                        "type": 3,
                        "value": "black"
                    }
                ]
            },
            {
                "name": "footericon",
                "description": "Should we add your avatar as footericon?",
                "type": 5,
                "required": "false"
            },
            {
                "name": "image",
                "description": "Upload an image for the embed",
                "type": 11,
                "required": "false"
            }
        ]
    },
    {
        "name": "faq",
        "description": "USF Bot Frequently Asked Questions",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    {
        "name": "help",
        "description": "Get commands and info about the bot",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    {
        "name": "highlow",
        "description": "Play a game of highlow",
        "dm_permission": "false",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
    },
    {
        "name": "info",
        "description": "Get informations about the bot",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    {
        "name": "invite",
        "description": "Invite the Bot to your servers!",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    {
        "name": "kick",
        "description": "Select and kick a member from the server",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "The member to kick",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Kick reason",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    },
    {
        "name": "lock",
        "description": "Lock a channel and post an embed with the reason",
        "dm_permission": "false",
        options: [
            {
                "name": "channel",
                "description": "Channel to lock",
                "type": 7,
                "required": "false"
            },
            {
                "name": "reason",
                "description": "Reason of the lock",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    },
    {
        "name": "mcstatus",
        "description": "Get the status of a Java, Bedrock or Education Edition Minecraft Server",
        "dm_permission": "false",
        options: [
            {
                "name": "address",
                "description": "IP address of the Minecraft server (without port)",
                "type": 3,
                "required": "true"
            }
        ]
    },
    {
        "name": "meme",
        "description": "Generate a random meme",
        "dm_permission": "false"
    },
    {
        "name": "modnick",
        "description": "Moderate an user nickname",
        "dm_permission": "false",
        options: [
            {
                "name": "user",
                "description": "User to moderate the nickname of",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Moderation Reason",
                "type": 3,
                "max_length": 200,
                "required": "false"
            },
            {
                "name": "notify",
                "description": "Should the bot notify the user via this chat?",
                "type": 5,
                "required": "false"
            }
        ]
    },
    {
        "name": "move",
        "description": "Move a Member to another Voice Channel",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "Member to move",
                "type": 6,
                "required": "true"
            },
            {
                "name": "channel",
                "description": "Channel where to move the Member",
                "type": 7,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Move reason",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    },
    {
        "name": "ping",
        "description": "Return the ping of the bot",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    {
        "name": "poll",
        "description": "Create a poll in the server, max 10 options",
        "dm_permission": "false",
        options: [
            {
                "name": "message",
                "description": "Poll Message",
                "type": 3,
                "required": "true"
            },
            {
                "name": "option1",
                "description": "Option 1",
                "type": 3,
                "required": "true"
            },
            {
                "name": "option2",
                "description": "Option 2",
                "type": 3,
                "required": "true"
            },
            {
                "name": "option3",
                "description": "Option 3",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option4",
                "description": "Option 4",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option5",
                "description": "Option 5",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option6",
                "description": "Option 6",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option7",
                "description": "Option 7",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option8",
                "description": "Option 8",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option9",
                "description": "Option 9",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option10",
                "description": "Option 10",
                "type": 3,
                "required": "false"
            }
        ]
    },
    {
        "name": "prune",
        "description": "Prune messages in a channel, up to 200",
        "dm_permission": "false",
        options: [
            {
                "name": "amount",
                "description": "Amount of messages to prune",
                "type": 4,
                "required": "true"
            }
        ]
    },
    {
        "name": "report",
        "description": "Report an user or something wrong with the bot",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options: [
            {
                "name": "type",
                "description": "What are you reporting? choose an option",
                "type": 3,
                "required": "true",
                choices: [
                    {
                        "name": "Discord User",
                        "type": 3,
                        "value": "user"
                    },
                    {
                        "name": "Bot Issue/Bug",
                        "type": 3,
                        "value": "bot"
                    }
                ]
            },
            {
                "name": "description",
                "description": "Informations about your report",
                "type": 3,
                "required": "true"
            },
            {
                "name": "proof",
                "description": "Proof about your report",
                "type": 11,
                "required": "false"
            }
        ]
    },
    {
        "name": "role",
        "description": "Get Role Informations",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "Target Role to check",
                "type": 8,
                "required": "true"
            }
        ]
    },
    {
        "name": "rps",
        "description": "Play Rock Paper Scissors with the bot",
        "dm_permission": "false",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    {
        "name": "say",
        "description": "Say something in chat through the bot",
        "dm_permission": "false",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    {
        "name": "search",
        "description": "Generate Search Links",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options: [
            {
                "name": "text",
                "description": "Search that for you",
                "type": 3,
                "max_length": 100,
                "required": "true"
            }
        ]
    },
    {
        "name": "server",
        "description": "Display info about this server",
        "dm_permission": "false"
    },
    {
        "name": "setnick",
        "description": "Set the nickname of an user",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "User to change the name of",
                "type": 6,
                "required": "true"
            },
            {
                "name": "new-nickname",
                "description": "The nickname to set to the user",
                "type": 3,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Moderation Reason",
                "type": 3,
                "max_length": 200,
                "required": "false"
            },
            {
                "name": "notify",
                "description": "Should the bot notify the user via this chat?",
                "type": 5,
                "required": "false"
            }
        ]
    },
    {
        "name": "suggestion",
        "description": "Suggest Commands or Functions for the Bot",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options: [
            {
                "name": "type",
                "description": "Suggestion Type",
                "type": 3,
                "required": "true",
                choices: [
                    {
                        "name": "Add Command",
                        "type": 3,
                        "value": "addCmd"
                    },
                    {
                        "name": "Update Command",
                        "type": 3,
                        "value": "updateCmd"
                    },
                    {
                        "name": "Add Function",
                        "type": 3,
                        "value": "addFunc"
                    },
                    {
                        "name": "Update Function",
                        "type": 3,
                        "value": "updateFunc"
                    }
                ]
            },
            {
                "name": "description",
                "description": "Describe in detail what you want to add/change",
                "type": 3,
                "required": "true"
            }
        ]
    },
    {
        "name": "timeout",
        "description": "Timeout a guild member",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "Member to timeout",
                "type": 6,
                "required": "true"
            },
            {
                "name": "duration",
                "description": "Duration of the timeout",
                "type": 3,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Reason of the timeout",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    },
    {
        "name": "timestamp",
        "description": "Generate your timestamp",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options : [
            {
                "name": "type",
                "description": "Type of the timestamp",
                "type": 3,
                "required": "true",
                choices : [
                    {"name": 'Short Time', "type": 3, "value": '1'},
                    {"name": 'Long Time', "type": 3, "value": '2'},
                    {"name": 'Short Date', "type": 3, "value": '3'},
                    {"name": 'Long Date', "type": 3, "value": '4'},
                    {"name": 'Long Date with Short Time', "type": 3, value: '5'},
                    {"name": 'Long Date with day of the week and short time', "type": 3, "value": '6'},
                    {"name": 'Relative', "type": 3, "value": '7'}
                ]
            },
            {
                "name": "year",
                "description": "Year of the timestamp",
                "type": 4,
                "required": "true"
            },
            {
                "name": "month",
                "description": "Month of the timestamp",
                "type": 4,
                "required": "true"
            },
            {
                "name": "day",
                "description": "Day of the timestamp",
                "type": 4,
                "required": "true"
            },
            {
                "name": "hour",
                "description": "Hour of the timestamp",
                "type": 4,
                "required": "false"
            },
            {
                "name": "minute",
                "description": "Minute of the timestamp",
                "type": 4,
                "required": "false"
            },
        ]
    },
    {
        "name": "unban",
        "description": "Unban an user from the server",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "Target user of the moderation",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Reason of the moderation",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    },
    {
        "name": "undeafen",
        "description": "Undeafen a Member",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "Member to undeafen",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Undeafen reason",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    },
    {
        "name": "unlock",
        "description": "Unlock a channel and post an embed with the reason",
        "dm_permission": "false",
        options: [
            {
                "name": "channel",
                "description": "Channel to unlock",
                "type": 7,
                "required": "false"
            },
            {
                "name": "reason",
                "description": "Reason of the unlock",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    },
    {
        "name": "unmute",
        "description": "Unmute a Member",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "Member to unmute",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Unmute reason",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    },
    {
        "name": "user",
        "description": "Get informations about an user",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options: [
            {
                "name": "target",
                "description": "User you want to view",
                "type": 6,
                "required": "false"
            }
        ]
    },
    {
        "name": "vmute",
        "description": "Voice Mute a Member",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "Member to voice mute",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "voice mute reason",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    },
    {
        "name": "vunmute",
        "description": "Voice Unmute a Member",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "Member to voice unmute",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "voice unmute reason",
                "type": 3,
                "max_length": 200,
                "required": "false"
            }
        ]
    }
];
console.log(commands);
const usfcmds = [
    {
        "name": "leave",
        "description": "Leaves a Guild",
        "dm_permission": "false",
        options: [
            {
                "name": "guildid",
                "description": "ID of the Guild",
                "type": 3,
                "required": "true"
            }
        ]
    }
];
const commandsPath = path.join(__dirname, 'src');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
//
for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	commands.push(command.data.toJSON());
}
const rest = new REST({ version: '10' }).setToken(token);
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
(async () => {
	try {
		console.log(`Started refreshing ${usfcmds.length} guild application (/) commands.`);
		const data2 = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: usfcmds },
		);

		console.log(`Successfully reloaded ${data2.length} guild application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();