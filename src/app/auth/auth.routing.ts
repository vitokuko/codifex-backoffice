import { RegisterComponent } from './register/register.component';
/**
 * Created by souaibou on 12/01/2018.
 */
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';


const APP_ROUTES: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ],
  },
];
export const routing = RouterModule.forRoot(APP_ROUTES);
