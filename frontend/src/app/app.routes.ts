import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { PurchaseEmailComponent } from './components/purchase-email/purchase-email.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
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
    { path: 'purchase', title: `Purchase`, component: PurchaseEmailComponent},
    { path: 'personalData', title: `PeronalData`, component: PersonalDataComponent},
    { path: 'payment', title: `Payment`, component: PaymentComponent},
    { path: 'collection/:clotheCollection', title: `Collection`, component: CollectionComponent },
    { path: 'product/:id', title: `Product`, component: ProductComponent},
    { path: 'newDirection', title: `NewDirection`, component: NewDirectionComponent},
    { path: 'default', title: `Default`, component: DefaultDataComponent}
];
