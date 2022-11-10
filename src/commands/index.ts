import { AppCommand, MenuCommand } from 'kbotify';
import { echoMenu } from './echo/echo.menu';
import { help } from './help/help.app';
import { draw } from './draw/draw.app';
import { getDraw } from './draw/getImg.app';

// 注册指令
export const commandList: Array<MenuCommand | AppCommand> = [
    echoMenu,
    draw,
    getDraw,
    help,
];
