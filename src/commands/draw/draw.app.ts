import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import {
    getPaintingToken,
    getImg,
    textToImg,
    getImgReqBody,
    text2ImgReqBody,
} from '../../api/index';

const handleDraw = async (p: string): Promise<string> => {
    const token = await (await getPaintingToken()).data.data;
    const form: text2ImgReqBody = {
        access_token: token,
        text: p.split(';')[0],
        style: p.split(';')[1],
        resolution: p.split(';')[2],
    };
    const id = await await (await textToImg(form)).data.data.taskId;

    return `已开始绘图，您的任务id是${id}`;
};

class Draw extends AppCommand {
    code = 'draw'; // 只是用作标记
    trigger = 'draw'; // 用于触发的文字
    help =
        '输入三种参数，并以英文分号`;`隔开\n1. 描述 \n2. 风格(目前仅支持输入`古风、二次元、写实风格、浮世绘、low poly 、未来主义、像素风格、概念艺术、赛博朋克、洛丽塔风格、巴洛克风格、超现实主义、水彩画、蒸汽波艺术、油画、卡通画`) \n3. 像素(`1024*1024、1024*1536、1536*1024`)'; // 帮助文字
    intro = 'draw test';
    func: AppFunc<BaseSession> = async (session) => {
        // console.log(session) 可以在console里查看更多session提供的相关信息
        // 这些信息可以帮助你获取当前的信息发送者、当前信息发送者的频道等
        if (!session.args.length) {
            return session.reply(this.help);
        }
        const res = await handleDraw(`${session.args}`);
        return session.quote(res);
    };
}

export const draw = new Draw();
