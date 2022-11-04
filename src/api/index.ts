import axios from 'axios';
import auth from '../configs/auth';

export const getPaintingToken = () =>
    axios.post('https://wenxin.baidu.com/moduleApi/portal/api/oauth/token', {
        grant_type: 'client_credentials',
        client_id: auth.wxApiKey,
        client_secret: auth.wxSecretKey,
    });
