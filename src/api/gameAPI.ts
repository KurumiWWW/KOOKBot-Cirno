import axios from 'axios';
import auth from '../configs/auth';
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

export const gameAPI = new GameAPI();
