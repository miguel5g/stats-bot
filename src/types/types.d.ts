import {
  Client,
  Message,
  ClientEvents,
  PermissionResolvable,
} from 'discord.js';

interface RunCommand {
  (Bot: Client, msg: Message, args?: string[]): void;
}

export interface Command {
  name: string,
  description: string,
  usage: string,
  aliases: string[],
  permissions?: PermissionResolvable,
  noPermission?: string,
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
  worse_t_channel: string,
  worse_v_channel: string,
  most_active_user: string,
  less_active_user: string,
  day_messages: number,
  joined_amount: number,
  quited_amount: number,
  last_update: number,
}

export interface CreateGuildData {
  id: string,
  prefix?: string,
  best_t_channel?: string,
  best_v_channel?: string,
  worse_t_channel?: string,
  worse_v_channel?: string,
  most_active_user?: string,
  less_active_user?: string,
  day_messages?: number,
  joined_amount?: number,
  quited_amount?: number,
  last_update?: number,
}

export interface TextChannelData {
  id: string,
  guild_id: string,
  average: number,
  msg_per_hour: number,
  last_update: number,
}
export interface VoiceChannelData {
  id: string,
  guild_id: string,
  average: number,
  conversation_time: number,
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
  conversation_time: number,
}

export interface GuildUserData {
  id?: number,
  user_id: string,
  username: string,
  guild_id: string,
  action: 'join' | 'quit',
  date: number,
}

export interface UserActiveData {
  id?: number,
  user_id: string,
  channel_id: string,
  guild_id: string,
  action: 'send_message' | 'quit_voice_channel',
  created_at: number,
}

/* Estrutura do banco de dados */

interface UserVoiceState {
  channel_id: string,
  started_at: number,
}

export interface BotConfig {
  name: string,
  version: string,
  defaultPrefix: string,
  token: string | undefined,
  enable: boolean,

  server: {
    enable: boolean,
    port: number | string,
  },

  devlopment: {
    enable: boolean,
    token: string | undefined,
    enableBot: boolean,
    enableServer: boolean,
  },
}
