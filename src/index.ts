import { bot } from 'init/client';
import { echoMenu } from './commands/echo/echo.menu';
import { testKmd } from './commands/your-command/your-command.some-app.app';

bot.messageSource.on('message', (e) => {
    bot.logger.debug(`received:`, e);
    // 如果想要在console里查看收到信息也可以用
    console.log(e);
});

bot.addCommands(echoMenu);
bot.addCommands(testKmd);

bot.connect();
console.log('bot connect successful');

bot.logger.debug('system init success');
