import { Client } from 'discord.js';

import { BotEvent } from '../types/types';

export default (Bot: Client): void => {

  Bot.on('ready', () => {
    const events = Bot.eventsCallers.get('ready');

    if (events) {
      events.map((event) => {
        const runEvent: BotEvent | undefined = Bot.events.get(event);
        if (runEvent && runEvent.enable) runEvent.run(Bot);
      });
    }
  });

  Bot.on('message', (msg) => {
    const events = Bot.eventsCallers.get('message');

    if (events) {
      events.map((event) => {
        const runEvent: BotEvent | undefined = Bot.events.get(event);
        if (runEvent && runEvent.enable) runEvent.run(Bot, msg);
      });
    }
  });

  Bot.on('guildMemberAdd', (member) => {
    const events = Bot.eventsCallers.get('guildMemberAdd');

    if (events) {
      events.map((event) => {
        const runEvent: BotEvent | undefined = Bot.events.get(event);
        if (runEvent && runEvent.enable) runEvent.run(Bot, member);
      });
    }
  });

  Bot.on('guildMemberRemove', (member) => {
    const events = Bot.eventsCallers.get('guildMemberRemove');

    if (events) {
      events.map((event) => {
        const runEvent: BotEvent | undefined = Bot.events.get(event);
        if (runEvent && runEvent.enable) runEvent.run(Bot, member);
      });
    }
  });

  Bot.on('channelCreate', (channel) => {
    const events = Bot.eventsCallers.get('channelCreate');

    if (events) {
      events.map((event) => {
        const runEvent: BotEvent | undefined = Bot.events.get(event);
        if (runEvent && runEvent.enable) runEvent.run(Bot, channel);
      });
    }
  });

  Bot.on('channelDelete', (channel) => {
    const events = Bot.eventsCallers.get('channelDelete');

    if (events) {
      events.map((event) => {
        const runEvent: BotEvent | undefined = Bot.events.get(event);
        if (runEvent && runEvent.enable) runEvent.run(Bot, channel);
      });
    }
  });

  Bot.on('guildCreate', (guild) => {
    const events = Bot.eventsCallers.get('guildCreate');

    if (events) {
      events.map((event) => {
        const runEvent: BotEvent | undefined = Bot.events.get(event);
        if (runEvent && runEvent.enable) runEvent.run(Bot, guild);
      });
    }
  });

  Bot.on('guildDelete', (guild) => {
    const events = Bot.eventsCallers.get('guildDelete');

    if (events) {
      events.map((event) => {
        const runEvent: BotEvent | undefined = Bot.events.get(event);
        if (runEvent && runEvent.enable) runEvent.run(Bot, guild);
      });
    }
  });

  Bot.on('voiceStateUpdate', (oldVoiceState, newVoiceState) => {
    const events = Bot.eventsCallers.get('voiceStateUpdate');

    if (events) {
      events.map((event) => {
        const runEvent: BotEvent | undefined = Bot.events.get(event);
        if (runEvent && runEvent.enable) runEvent.run(Bot, [oldVoiceState, newVoiceState]);
      });
    }
  });

};
