import { bot } from 'init/client';
import { commandList } from 'commands';
import { gameAPI } from './api/GameAPI';

bot.messageSource.on('message', (e) => {
    console.debug(`公屏消息:`, e);
});

commandList.forEach((command) => {
    bot.addCommands(command);
});

bot.connect();
// bot.API.game
gameAPI.activity().then((res) => {
    console.log(res);
});

console.debug('system init success');
