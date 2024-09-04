import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NewDirectionComponent } from './components/new-direction/new-direction.component';
import { DefaultDataComponent } from './components/default-data/default-data.component';


export const routes: Routes = [
    { path: '', title: `Home`, component: HomeComponent  },
    { path: 'register', title: `Register`, component: RegisterComponent  },
    { path: 'login', title: `Login`, component: LoginComponent },
    { path: 'product/:id', title: `Product`, component: ProductComponent },
    { path: 'collection/:clotheCollection', title: `Collection`, component: CollectionComponent },
    { path: 'category', title: `Category`, component: CategoriasComponent},
    { path: 'category/:category', title: `Category-Filter`, component: CategoriasComponent},
    { path: 'data/:id', title: `Data`, component: DefaultDataComponent},
    { path: 'update-data/:id', title: `NewDirection`, component: NewDirectionComponent},
    { path: 'purchase/:id', title: `Purchase`, component: PurchaseComponent},
    { path: 'payment', title: `Payment`, component: PaymentComponent},
];
