import fs from 'fs';
import path from 'path';
import { Client } from 'discord.js';

import { BotEvent } from '../types/types';

const eventDir: string = path.resolve(__dirname, '..', 'events');

class EventsLoader {
  private Bot: Client;

  constructor(Bot: Client) {
    this.Bot = Bot;
  };

  private filterEventsCaller() {
    const newEventsCaller: [[string, string[]]?] = [];
    this.Bot.eventsCallers.forEach((eventsName, key) => {
      const filteredEventsName = eventsName
        .filter((item, index) => eventsName.indexOf(item) === index);
      newEventsCaller.push([key, filteredEventsName]);
    });

    newEventsCaller.map(filteredEvent => {
      if (filteredEvent && filteredEvent[0] && filteredEvent[1]) {
        this.Bot.eventsCallers.set(filteredEvent[0], filteredEvent[1]);
      }
    });
  };

  async load() {
    fs
      .readdirSync(eventDir)
      .map(async (eventFile, key) => {
        try {
          const { default: eventProps }: { default: BotEvent } = await import(path.resolve(eventDir, eventFile));

          this.Bot.events.set(eventProps.name, eventProps);

          const eventsCaller: string[] | undefined = this.Bot.eventsCallers.get(eventProps.caller);

          if (eventsCaller) {
            eventsCaller.push(eventProps.name);
            this.Bot.eventsCallers.set(eventProps.caller, eventsCaller);
          }
          else {
            this.Bot.eventsCallers.set(eventProps.caller, [eventProps.name]);
          }

          if (key + 1 === fs.readdirSync(eventDir).length) this.filterEventsCaller();

          console.log(`Successfully loaded ${eventFile}`);

        } catch (err) {
          console.error(`Error while trying to load ${eventFile} - ${err.message}`);
        }
      });
  };
};

export default EventsLoader;