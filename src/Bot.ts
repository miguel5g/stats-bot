import Discord from 'discord.js';

import botConfig from './config/BotConfig'; // Configurações do bot

// Importar handlers
import CommandsLoader from './handlers/Commands';
import EventsLoader from './handlers/Events';
import Listeners from './handlers/Listeners';

// Criar client
const Bot = new Discord.Client();

// Criar as collections e salvar as configurações no client
Bot.commands = new Discord.Collection();
Bot.events = new Discord.Collection();
Bot.aliases = new Discord.Collection();
Bot.eventsCallers = new Discord.Collection();
Bot.channelsUpdates = new Discord.Collection();
Bot.voiceUsers = new Discord.Collection();
Bot.voiceChannels = new Discord.Collection();
Bot.botConfig = botConfig;

// Carregar comandos, events e listeners
const commandsLoader = new CommandsLoader(Bot);
const eventsLoader = new EventsLoader(Bot);
commandsLoader.load();
eventsLoader.load();

Listeners(Bot);

// Verificar se existe token e iniciar o client
const token: string | undefined = botConfig.devlopment ? botConfig.devlopment.token : botConfig.token;
token ? Bot.login(token) : console.log('Token not found');