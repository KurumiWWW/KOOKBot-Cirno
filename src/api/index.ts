import axios from 'axios';
import auth from '../configs/auth';

export const getPaintingToken = () =>
    axios.post('https://wenxin.baidu.com/moduleApi/portal/api/oauth/token', {
        grant_type: 'client_credentials',
        client_id: auth.wxApiKey,
        client_secret: auth.wxSecretKey,
    });

export type text2ImgReqBody = {
    access_token: string;
    // 输入内容，长度不超过100个字
    text: string;
    // 图片风格，目前支持风格有：
    // 古风、二次元、写实风格、浮世绘、low poly 、未来主义、像素风格、概念艺术、赛博朋克、洛丽塔风格、巴洛克风格、超现实主义、水彩画、蒸汽波艺术、油画、卡通画
    style: string;
    // 图片尺寸，目前支持的有：1024*1024 方图、1024*1536 长图、1536*1024 横图
    resolution: string;
};
export const textToImg = (p: text2ImgReqBody) =>
    axios.post(
        'https://wenxin.baidu.com/moduleApi/portal/api/rest/1.0/ernievilg/v1/txt2img',
        p
    );

export type getImgReqBody = {
    access_token: string;
    taskId: string; // 从上一章节的提交接口的返回值中获取
};
export const getImg = (p: getImgReqBody) =>
    axios.post(
        'https://wenxin.baidu.com/moduleApi/portal/api/rest/1.0/ernievilg/v1/getImg',
        p
    );
