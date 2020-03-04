import api from './api'

export default async function Me() {       
    const userId = await localStorage.getItem("AuthorizationId"); 
    const { data } = await api.get(`me/${userId}`)
    return data;
}
