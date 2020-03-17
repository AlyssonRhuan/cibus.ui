import api from './api'
import Auth from './Auth';

export default async function Me() {       
    const userId = await Auth.getUserId(); 
    const { me } = await (await api.get(`me/${userId}`, await Auth.getAuthHeader()))

    return me;
}
