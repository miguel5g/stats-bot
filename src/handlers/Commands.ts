import fs from 'fs';
import path from 'path';
import { Client } from 'discord.js';

import { Command } from '../types/types';

const commandsDir: string = path.resolve(__dirname, '..', 'commands');

class CommandsLoader {
  private Bot: Client;

  constructor(Bot: Client) {
    this.Bot = Bot;
  };

  load() {
    fs
      .readdirSync(commandsDir)
      .map(folder => {
        if (folder.includes('.')) return;
        fs
          .readdirSync(path.resolve(commandsDir, folder))
          .map(async commandFile => {
            try {
              const { default: commandProps }: { default: Command } = await import(path.resolve(commandsDir, folder, commandFile));

              this.Bot.commands.set(commandProps.name, commandProps);

              console.log(`Successfully loaded ${commandFile}`);
            } catch (err) {
              console.error(`Error while trying to load ${commandFile} - ${err.message}`);
            }
          });
      });
  };
};

export default CommandsLoader;