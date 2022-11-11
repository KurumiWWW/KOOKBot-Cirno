import { bot } from 'init/client';
import { commandList } from 'commands';

bot.messageSource.on('message', (e) => {
    console.debug(`公屏消息:`, e);
});

commandList.forEach((command) => {
    bot.addCommands(command);
});

bot.connect();
bot.API.game.activity().then((res) => {
    console.log(res);
});

console.debug('system init success');
