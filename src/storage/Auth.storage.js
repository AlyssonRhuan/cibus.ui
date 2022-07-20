import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default class Auth{
    static async isAuthenticated(){
        return await localStorage.getItem("Authorization") ? true : false;
    }

    static async isAdmin(){
        return await localStorage.getItem("AuthorizationRole") === 'ROLE_ADMIN'; 
    }

    static async isSeller(){
        return await localStorage.getItem("AuthorizationRole") === 'ROLE_SELLER'; 
    }

    static async isClient(){
        return await localStorage.getItem("AuthorizationRole") === 'ROLE_CLIENT'; 
    }

    static async getUserId(){
        return await localStorage.getItem("AuthorizationId"); 
    }

    static async getToken(){
        return await localStorage.getItem("Authorization"); 
    }

    static async getUserRole(){
        return await localStorage.getItem("AuthorizationRole"); 
    }

    static async onLogout(){
        await localStorage.removeItem("Authorization");
        await localStorage.removeItem("AuthorizationId");
        await localStorage.removeItem("AuthorizationRole");
    }

    static async onLogin(authorization, userId, userRole) {
        await localStorage.setItem("Authorization", authorization);
        await localStorage.setItem("AuthorizationId", userId);
        await localStorage.setItem("AuthorizationRole", userRole);
    }

    static async onResetPassword(){
        await localStorage.removeItem("Authorization");
        await localStorage.removeItem("AuthorizationId");
        await localStorage.removeItem("AuthorizationRole");
    }

    static async getAuthHeader() {
        return {
            headers: { 
                Authorization: localStorage.getItem("Authorization") 
            }
        }
    }
}