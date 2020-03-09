export default class Auth{
    static isAuthenticated(){
        return false;
    }

    static async getUserId(){
        return await localStorage.getItem("AuthorizationId"); 
    }

    static async getToken(){
        return await localStorage.getItem("Authorization"); 
    }

    static async onLogout(){
        await localStorage.removeItem("Authorization");
        await localStorage.removeItem("AuthorizationId");
    }
}