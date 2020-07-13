import 'discord.js';

import { BotConfig } from './types';
import { Command, BotEvent, UserVoiceState } from './types';

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, Command>;
    events: Collection<string, BotEvent>;
    aliases: Collection<string, string>;
    eventsCallers: Collection<string, string[]>;
    channelsUpdates: Collection<string, number>;
    voiceUsers:Collection<string, UserVoiceState>;
    voiceChannels:Collection<string, number>;

    botConfig: BotConfig;
    startTime: number;
  }
}