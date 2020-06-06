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

export interface GuildData {
  id: string,
  prefix: string,
}