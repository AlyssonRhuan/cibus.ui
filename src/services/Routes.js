import CategoryView from '../views/categoryView/Category';
import ProductView from '../views/productView/Product';
import SaleView from '../views/saleView/Sale';
import { AiOutlineUser, AiOutlineAppstore, AiOutlineBulb, AiFillCreditCard, AiOutlineShoppingCart } from "react-icons/ai";
import MeView from '../views/meView/Me';
import PurchaseView from '../views/purchaseView/Purchase';
import React from 'react';
import UnavailableService from '../views/errorsView/UnavailableService';


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
        },
        {
            path: "/purchase",
            name: "Purchase",
            view: PurchaseView,
            icon: <AiOutlineShoppingCart/>,
            isInSideBar: true,
            style: {
                marginTop: '20px'
            }
        },
        {
            path: "/unavailableservice",
            name: "UnavailableService",
            view: UnavailableService,
            icon: <AiOutlineUser/>,
            isInSideBar: false
        }
    ];

    return rotas;
}
