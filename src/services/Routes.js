import CategoryView from '../views/categoryView/Category';
import ProductView from '../views/productView/Product';
import SaleView from '../views/saleView/Sale';
import { AiOutlineUser, AiOutlineAppstore, AiOutlineBulb, AiFillCreditCard } from "react-icons/ai";
import MeView from '../views/meView/Me';
import React from 'react';


export default function Routes() {
    const rotas = [
        {
            path: "/category",
            name: "Category",
            view: CategoryView,
            icon: <AiOutlineAppstore/>,
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
            path: "/sale",
            name: "Sales",
            view: SaleView,
            icon: <AiFillCreditCard/>,
            isInSideBar: true
        },
        {
            path: "/me",
            name: "Me",
            view: MeView,
            icon: <AiOutlineUser/>,
            isInSideBar: true
        }
    ];

    return rotas;
}
