// 请参考echo文件夹内的用法
import { AppCommand, AppFunc, BaseSession } from 'kbotify';
class TestKmd extends AppCommand {
    code = 'test'; // 只是用作标记
    trigger = 'test'; // 用于触发的文字
    help = '`帮助文字`'; // 帮助文字
    intro = 'test intro';
    func: AppFunc<BaseSession> = async (session) => {
        // console.log(session) 可以在console里查看更多session提供的相关信息
        // 这些信息可以帮助你获取当前的信息发送者、当前信息发送者的频道等
        if (!session.args.length) {
            return session.reply(this.help);
        }
        // return session.quote(`${session.args}`);
        return session.quote('123');
    };
}

export const testKmd = new TestKmd();
