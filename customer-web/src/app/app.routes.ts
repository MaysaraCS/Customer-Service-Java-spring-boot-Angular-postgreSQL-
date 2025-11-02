import { Routes } from '@angular/router';
import { Home } from './customer/home/home';
import { FullscreenOverlayContainer } from '@angular/cdk/overlay';

export const routes: Routes = [
    {path:"customer/home",component:Home},
    {path:"customer",redirectTo:"customer/home", pathMatch:"full"},
    {path:"",redirectTo:"customer/home", pathMatch:"full"},
];
