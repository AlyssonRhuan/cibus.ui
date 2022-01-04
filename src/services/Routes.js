import CategoryView from '../views/categoryView/Category';
import ProductView from '../views/productView/Product';
import SaleView from '../views/saleView/Sale';
import { AiOutlineUser, AiOutlineAppstore, AiOutlineBulb, AiFillCreditCard, AiOutlineShoppingCart } from "react-icons/ai";
import { MdNotifications, MdAttachMoney } from 'react-icons/md';
import { FaCashRegister } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import MeView from '../views/meView/Me';
import ReportView from '../views/reportView/Report';
import PaymentView from '../views/paymentView/Payment';
import ShopView from '../views/shopView/Shop';
import React from 'react';
import UnavailableService from '../views/errorsView/UnavailableService';
import CashView from '../views/cashView/Cash';
import NotificationView from '../views/notificationView/Notifications';


export default function Routes() {
    const rotas = [
        {
            path: "/shop",
            name: "Loja",
            view: ShopView,
            icon: <AiOutlineShoppingCart/>,
            isInSideBar: true
        },
        {
            path: "/category",
            name: "Categorias",
            view: CategoryView,
            icon: <AiOutlineAppstore/>,
            isInSideBar: true,
            style: {
                marginTop: '20px'
            }
        },
        {
            path: "/product",
            name: "Produtos",
            view: ProductView,
            icon: <AiOutlineBulb/>,
            isInSideBar: true
        },
        {
            path: "/cash",
            name: "Caixas",
            view: CashView,
            icon: <FaCashRegister/>,
            isInSideBar: true
        },
        {
            path: "/sale",
            name: "Vendas",
            view: SaleView,
            icon: <AiFillCreditCard/>,
            isInSideBar: true
        },
        {
            path: "/payment",
            name: "Pagamentos",
            view: PaymentView,
            icon: <MdAttachMoney/>,
            isInSideBar: true
        },
        {
            path: "/notifications",
            name: "Notificações",
            view: NotificationView,
            icon: <MdNotifications/>,
            isInSideBar: true,
        },
        {
            path: "/report",
            name: "Relatórios",
            view: ReportView,
            icon: <HiOutlineDocumentReport/>,
            isInSideBar: true
        },
        {
            path: "/me",
            name: "Eu",
            view: MeView,
            icon: <AiOutlineUser/>,
            isInSideBar: true
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
