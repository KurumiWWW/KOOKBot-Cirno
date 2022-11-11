import axios from 'axios';
import { KBotify } from 'kbotify';
import { API } from 'kbotify/dist/core/kbotify/api';
import { BotConfig } from 'kbotify/dist/core/kbotify/types';
import auth from '../configs/auth';

class ExKBotify extends KBotify {
    constructor(config: BotConfig & { debug?: boolean }, omit = true) {
        super(config);
        this.API = new ExtAPI(this);
    }
    API: ExtAPI;
}
class ExtAPI extends API {
    game: GameAPI;
    constructor(client: KBotify) {
        super(client);
        this.game = new GameAPI();
    }
}
class GameAPI {
    // 游戏列表
    list() {}
    // 添加游戏
    create() {}
    // 更新游戏
    update() {}
    // 删除游戏
    delete() {}
    // 添加游戏记录(开始玩)
    activity() {
        // https://www.kookapp.cn/api/v3/game/activity
        return axios.post(
            'https://www.kookapp.cn/api/v3/game/activity',
            {
                id: 11,
                data_type: 2,
                software: 'cloudmusic',
                singer: auth.botname,
                music_name: `使用[.help]获得帮助`,
            },
            {
                headers: {
                    Authorization: `Bot ${auth.khltoken}`,
                },
            }
        );
    }
    // 删除游戏记录(结束玩)
    deleteActivity() {}
}

export const bot = new ExKBotify({
    mode: 'websocket', //确保和开黑啦应用的后台设置一样。如果使用webhook，请详细阅读开发者手册关于"?compress=0"的部分。
    token: auth.khltoken,
    port: auth.khlport,
    verifyToken: auth.khlverify,
    key: auth.khlkey,
    ignoreDecryptError: true,
});
