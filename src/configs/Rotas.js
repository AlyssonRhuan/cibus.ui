import api from '../services/api'
import Icons from '../utils/IconsUtils'

import NotFoundView from '../views/notFoundView/NotFound'
import HomeView from '../views/homeView/Home'
import UserView from '../views/userView/User'
import ProductView from '../views/productView/Product'
import CategoryView from '../views/categoryView/Category'
import ProfileView from '../views/profileView/Profile'

export default async function Rotas() {
    const { data } = await api.get(`tela`)

    let rotas = []

    data.map(tela => {
        rotas.push({ ...tela, view: NotFoundView });
    })

    rotas.map(tela => {
        switch (tela.caminho) {
            case "/":
                tela.view = HomeView;
                tela.icon = Icons.HomeWhite;
                tela.iconHome = Icons.Home;
                break;
            case "/user":
                tela.view = UserView;
                tela.icon = Icons.UserWhite;   
                tela.iconHome = Icons.User;             
                break;
            case "/product":
                tela.view = ProductView;
                tela.icon = Icons.ProductWhite;
                tela.iconHome = Icons.Product;
                break;
            case "/category":
                tela.view = CategoryView;
                tela.icon = Icons.CategoryWhite;
                tela.iconHome = Icons.Category;
                break;
            case "/profile":
                tela.view = ProfileView;
                tela.icon = Icons.ProfileWhite;
                tela.iconHome = Icons.Profile;
                break;
            default:
                tela.view = HomeView;
                break;
        }
    })

    await Promise.resolve(rotas);
    return rotas;
}
