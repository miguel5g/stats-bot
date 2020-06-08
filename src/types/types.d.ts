import {
  Client,
  Message,
  ClientEvents,
} from 'discord.js';

interface RunCommand {
  (Bot: Client, msg: Message, args?: string[]): void;
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
  best_t_channel: string,
  best_v_channel: string,
  joined_amount: number,
  quited_amount: number,
  last_update: number,
}

export interface ChannelData {
  id: string,
  guild_id: string,
  type: string,
  average: number,
  msg_per_hour: number,
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

export interface GuildUserData {
  id?: number,
  user_id: string,
  username: string,
  guild_id: string,
  action: string,
  date: number,
}

/* Estrutura do banco de dados */
