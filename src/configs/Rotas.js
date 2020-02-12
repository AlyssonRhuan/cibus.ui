import api from '../services/api'

import HomeView from '../views/homeView/Home'
import UserView from '../views/userView/User'
import ProductView from '../views/productView/Product'
import CategoryView from '../views/categoryView/Category'
import ProfileView from '../views/profileView/Profile'

export default async function Rotas() {
    const { data } = await api.get(`tela`)

    let rotas = []

    data.map(tela => {
        switch (tela.caminho) {
            case "/":
                rotas.push({ ...tela, view: HomeView });
                break;
            case "/user":
                rotas.push({ ...tela, view: UserView });
                break;
            case "/product":
                rotas.push({ ...tela, view: ProductView });
                break;
            case "/category":
                rotas.push({ ...tela, view: CategoryView });
                break;
            case "/profile":
                rotas.push({ ...tela, view: ProfileView });
                break;
            default:
                rotas.push({ ...tela, view: HomeView });
                break;
        }

    })

    await Promise.resolve(rotas);
    return rotas;
}
