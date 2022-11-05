import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import { getPaintingToken, getImg, getImgReqBody } from '../../api/index';

type getDrawResBody = {
    imgUrls: Array<string>;
    waiting: string;
};
const handleGetDraw = async (p: string): Promise<getDrawResBody> => {
    const token = await (await getPaintingToken()).data.data;
    const form: getImgReqBody = {
        access_token: token,
        taskId: p,
    };
    console.log(form);

    const res = await getImg(form);

    return res.data.data;
};

class GetDraw extends AppCommand {
    code = 'getdraw'; // 只是用作标记
    trigger = 'getdraw'; // 用于触发的文字
    help = '`getdraw test`'; // 帮助文字
    intro = 'getdraw test';
    func: AppFunc<BaseSession> = async (session) => {
        // console.log(session) 可以在console里查看更多session提供的相关信息
        // 这些信息可以帮助你获取当前的信息发送者、当前信息发送者的频道等
        if (!session.args.length) {
            return session.reply(this.help);
        }

        const res = await handleGetDraw(`${session.args}`);
        console.log(res);
        if (res.imgUrls.length == 0) {
            return session.quote(
                `你先别急，还没画完，预计等待时间${res.waiting}`
            );
        } else {
            let arr = res.imgUrls.map(
                (item: any) => `[${item.image}](${item.image})`
            );
            return session.quote(arr.join('\n'));
        }
    };
}

export const getDraw = new GetDraw();
