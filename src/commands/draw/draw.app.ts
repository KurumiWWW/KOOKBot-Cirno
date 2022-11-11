import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import {
    getPaintingToken,
    getImg,
    textToImg,
    getImgReqBody,
    text2ImgReqBody,
} from '../../api/index';
import { bot } from '../../init/client';

const handleDraw = async (session: BaseSession): Promise<string> => {
    const token = await (await getPaintingToken()).data.data;
    const form: text2ImgReqBody = {
        access_token: token,
        text: `${session.args}`.split(';')[0],
        style: `${session.args}`.split(';')[1],
        resolution: `${session.args}`.split(';')[2],
    };
    const res = (await textToImg(form)).data;

    if (res.code != 0) {
        return '出现错误';
    }
    const form2: getImgReqBody = {
        access_token: token,
        taskId: res.data.taskId,
    };
    const res2 = (await getImg(form2)).data;
    const userId = session.userId;

    bot.API.message.create(
        1,
        session.channel.id,
        `(met)${userId}(met) 已开始绘图，预计等待时间：${res2.data.waiting}...`,
        session.msg.msgId
    );

    // 步进值（轮询频率） ms
    const step = 10000;
    return new Promise((resolve, reject) => {
        let timer = setInterval(async () => {
            const res2 = (await getImg(form2)).data;
            console.log(res2);

            if (res2.data.imgUrls.length > 0) {
                let arr = res2.data.imgUrls.map(
                    (item: any) => `[${item.image}](${item.image})`
                );
                // return
                clearInterval(timer);
                resolve(`(met)${userId}(met) \n${arr.join('\n')}`);
            }
        }, step);
    });
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
        const res = await handleDraw(session);
        return session.quote(res);
    };
}

export const draw = new Draw();
