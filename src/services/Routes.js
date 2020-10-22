import CategoryView from '../views/categoryView/Category';
import ProductView from '../views/productView/Product';
import { AiOutlineUser, AiOutlineAppstore, AiOutlineBulb } from "react-icons/ai";
import MeView from '../views/meView/Me';
import React from 'react';


export default function Routes() {
    const rotas = [
        {
            path: "/me",
            name: "Me",
            view: MeView,
            icon: <AiOutlineUser/>,
            isInSideBar: true
        },
        {
            path: "/product",
            name: "Product",
            view: ProductView,
            icon: <AiOutlineBulb/>,
            isInSideBar: true
        },
        {
            path: "/category",
            name: "Category",
            view: CategoryView,
            icon: <AiOutlineAppstore/>,
            isInSideBar: true
        },
    ];

    return rotas;
}
