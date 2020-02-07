import HomeView from '../views/homeView/Home'
import UserView from '../views/userView/User'
import ProductView from '../views/productView/Product'
import CategoryView from '../views/categoryView/Category'


export default [
    {        
        id: 1, 
        path: '/', 
        label: 'Home',
        view: HomeView
    },
    {        
        id: 2, 
        path: '/user', 
        label: 'User',
        view: UserView
    },
    {        
        id: 3,
        path: '/product', 
        label: 'Product',
        view: ProductView
    },
    {
        id: 4,
        path: '/category', 
        label: 'Category',
        view: CategoryView
    }
]