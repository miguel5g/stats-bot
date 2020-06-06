import {
  Client,
  Message,
  ClientEvents,
} from 'discord.js';

interface RunCommand {
  (Bot: Client, msg: Message, args: string[]): void;
}

export interface Command {
  name: string,
  description: string,
  usage: string,
  aliases: string[],
  enable: boolean,
  dm: boolean,
  run: RunCommand,
}

interface RunBotEvent {
  (Bot: Client, props?: any): void;
}

export interface BotEvent {
  name: string,
  description: string,
  caller: keyof ClientEvents,
  enable: boolean,
  run: RunBotEvent,
}

/* Estrutura do banco de dados */
export interface GuildData {
  id: string,
  prefix: string,
}

export interface ChannelData {
  id: string,
  guild_id: string,
  average: number,
  last_update: number,
}

export interface MessageData {
  id: string,
  guild_id: string,
  channel_id: string,
  user_id: string,
  created_at: number,
}

export interface UserData {
  id: string,
  username: string,
}

/* Estrutura do banco de dados */
