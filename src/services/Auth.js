import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default class Auth{
    static isAuthenticated(){
        return localStorage.getItem("Authorization") ? true : false;
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

    static async onLogin(authorization, userId) {
        await localStorage.setItem("Authorization", authorization);
        await localStorage.setItem("AuthorizationId", userId);
    }

    static async getAuthHeader() {
        return {
            headers: { 
                Authorization: localStorage.getItem("Authorization") 
            }
        }
    }
}