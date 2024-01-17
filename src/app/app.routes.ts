import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:'',component: HomeComponent,
    },
    {
        path:'shopping-cart',
        loadComponent: () => import('./shopping-cart/shopping-cart.component').then(mod => mod.ShoppingCartComponent)
    },
    {
        path: 'my-orders',
        loadComponent: () => import('./my-orders/my-orders.component').then(mod => mod.MyOrdersComponent)
    },
    {
        path: 'manage-orders',
        loadComponent: () => import('./admin/admin-orders/admin-orders.component').then(mod => mod.AdminOrdersComponent)
    },
    {
        path: 'manage-products',
        loadComponent: () => import('./admin/admin-products/admin-products.component').then(mod => mod.AdminProductsComponent)
    },
    {
        path: '**',
        component: HomeComponent,
    }

];
