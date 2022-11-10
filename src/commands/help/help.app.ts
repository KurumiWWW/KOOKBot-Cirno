import { AppCommand, AppFunc, BaseSession } from 'kbotify';

class Help extends AppCommand {
    code = 'help'; // 只是用作标记
    trigger = 'help'; // 用于触发的文字
    help = '帮助信息建设中...'; // 帮助文字
    intro = '帮助信息';
    func: AppFunc<BaseSession> = async (session) => {
        return session.reply(this.help);
    };
}

export const help = new Help();
