import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ProductComponent } from './components/product/product.component';



export const routes: Routes = [
    { path: '', title: `Home`, component: HomeComponent  },
    { path: 'register', title: `Register`, component: RegisterComponent  },
    { path: 'login', title: `Login`, component: LoginComponent },
    { path: 'categorias', title: `Categorias`, component: CategoriasComponent},
    { path: 'product/:id', title: `Product`, component: ProductComponent}
];
