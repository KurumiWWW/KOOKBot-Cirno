import { AppCommand, MenuCommand } from 'kbotify';
import { echoMenu } from './echo/echo.menu';

// 注册指令
export const commandList: Array<MenuCommand | AppCommand> = [echoMenu];
