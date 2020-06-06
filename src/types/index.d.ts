import 'discord.js';

import { BotConfig } from '../config/BotConfig';
import { Command, BotEvent } from './types';

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, Command>;
    events: Collection<string, BotEvent>;
    aliases: Collection<string, string>;
    eventsCallers: Collection<string, string[]>;
    botConfig: BotConfig;
    startTime: number;
  }
}