import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthguardService } from './services/authguard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    {
        path:'',component: ProductsComponent,
    },
    {
        path:'shopping-cart',
        loadComponent: () => import('./shopping-cart/shopping-cart.component').then(mod => mod.ShoppingCartComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent)
    },

    {
        path:'check-out',
        loadComponent: () => import('./check-out/check-out.component').then(mod => mod.CheckOutComponent),
        canActivate:[AuthguardService]
    },
    {
        path: 'my-orders',
        loadComponent: () => import('./my-orders/my-orders.component').then(mod => mod.MyOrdersComponent),
        canActivate:[AuthguardService]
    },
    {
        path: 'order-success/:id',
        loadComponent: () => import('./order-success/order-success.component').then(mod => mod.OrderSuccessComponent),
        canActivate:[AuthguardService]
    },
    {
        path: 'manage-orders',
        loadComponent: () => import('./admin/admin-orders/admin-orders.component').then(mod => mod.AdminOrdersComponent),
        canActivate:[AuthguardService,AdminAuthGuardService]
    },
    {
        path: 'add-new-products',
        loadComponent: () => import('./admin/product-form/product-form.component').then(mod => mod.ProductFormComponent),
        canActivate:[AuthguardService,AdminAuthGuardService]
    },
    {
        path: 'manage-products/:id',
       
        loadComponent: () => import('./admin/product-form/product-form.component').then(mod => mod.ProductFormComponent),
        canActivate:[AuthguardService,AdminAuthGuardService]
    },
    {
        path: 'manage-products',
        loadComponent: () => import('./admin/admin-products/admin-products.component').then(mod => mod.AdminProductsComponent),
        canActivate:[AuthguardService,AdminAuthGuardService]
    },

    {
        path: '**',
        component: HomeComponent,
    }

];
