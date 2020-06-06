import { Client } from 'discord.js';

export default (Bot: Client): void => {

  Bot.on('ready', () => {
    const events = Bot.eventsCallers.get('ready');

    if (events) {
      events.map((event) => {
        Bot.events.get(event)?.run(Bot);
      });
    }
  });

  Bot.on('message', (msg) => {
    const events = Bot.eventsCallers.get('message');

    if (events) {
      events.map((event) => {
        Bot.events.get(event)?.run(Bot, msg);
      });
    }
  });

  Bot.on('guildMemberAdd', (member) => {
    const events = Bot.eventsCallers.get('guildMemberAdd');

    if (events) {
      events.map((event) => {
        Bot.events.get(event)?.run(Bot, member);
      });
    }
  });

  Bot.on('guildMemberRemove', (member) => {
    const events = Bot.eventsCallers.get('guildMemberRemove');

    if (events) {
      events.map((event) => {
        Bot.events.get(event)?.run(Bot, member);
      });
    }
  });

  Bot.on('channelCreate', (channel) => {
    const events = Bot.eventsCallers.get('channelCreate');

    if (events) {
      events.map((event) => {
        Bot.events.get(event)?.run(Bot, channel);
      });
    }
  });

  Bot.on('channelDelete', (channel) => {
    const events = Bot.eventsCallers.get('channelDelete');

    if (events) {
      events.map((event) => {
        Bot.events.get(event)?.run(Bot, channel);
      });
    }
  });

};