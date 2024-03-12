import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDestinationsComponent } from './pages/admin-destinations/admin-destinations.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserDestinationsComponent } from './pages/user-destinations/user-destinations.component';
import { AdminLodgingsComponent } from './pages/admin-lodgings/admin-lodgings.component';
import { AdminPlansComponent } from './pages/admin-plans/admin-plans.component';
import { AdminDestinationPlansComponent } from './pages/admin-destination-plans/admin-destination-plans.component';
import { UserDestinationPlansComponent } from './pages/user-destination-plans/user-destination-plans.component';
import { CreateDestinationsComponent } from './pages/create-destinations/create-destinations.component';
import { CreateLodgingComponent } from './pages/create-lodging/create-lodging.component';
import { CreatePlansComponent } from './pages/create-plans/create-plans.component';
import { UserPlansComponent } from './pages/user-plans/user-plans.component';
import { UserDestinationComponent } from './pages/user-destination/user-destination.component';

export const routes: Routes = [
    {
        path: '',
        component: localStorage.getItem('logged') === 'true' ? localStorage.getItem('userRole') === 'ROLE_ADMIN' ? AdminHomeComponent : UserHomeComponent : HomeComponent
    },
    {
        path: 'registro',
        component: localStorage.getItem('logged') === 'true' ? NotFoundComponent : RegisterComponent
    },
    {
        path: 'login',
        component: localStorage.getItem('logged') === 'true' ? NotFoundComponent : LoginComponent
    },
    {
        path: 'destinos',
        component: localStorage.getItem('logged') === 'true' ? localStorage.getItem('userRole') === 'ROLE_ADMIN' ? AdminDestinationsComponent : UserDestinationsComponent : NotFoundComponent
    },
    {
        path: 'destinos/hospedajes/:destinationTag',
        component: (localStorage.getItem('logged') === 'true' && localStorage.getItem('userRole') === 'ROLE_ADMIN') ? AdminLodgingsComponent : NotFoundComponent
    },
    {
        path: 'destinos/ver/:destinationTag',
        component: (localStorage.getItem('logged') === 'true' && localStorage.getItem('userRole') === 'ROLE_USER') ? UserDestinationComponent : NotFoundComponent
    },
    {
        path: 'planes',
        component: (localStorage.getItem('logged') === 'true' && localStorage.getItem('userRole') === 'ROLE_ADMIN') ? AdminPlansComponent : NotFoundComponent
    },
    {
        path: 'destinos/planes/:destinationTag',
        component: localStorage.getItem('logged') === 'true' ? localStorage.getItem('userRole') === 'ROLE_ADMIN' ? AdminDestinationPlansComponent : UserDestinationPlansComponent : NotFoundComponent
    },
    {
        path: 'destinos/agregar',
        component: (localStorage.getItem('logged') === 'true' && localStorage.getItem('userRole') === 'ROLE_ADMIN') ? CreateDestinationsComponent : NotFoundComponent
    },
    {
        path: 'destinos/hospedajes/agregar/:destinationId',
        component: (localStorage.getItem('logged') === 'true' && localStorage.getItem('userRole') === 'ROLE_ADMIN') ? CreateLodgingComponent : NotFoundComponent
    },
    {
        path: 'planes/agregar',
        component: (localStorage.getItem('logged') === 'true' && localStorage.getItem('userRole') === 'ROLE_ADMIN') ? CreatePlansComponent : NotFoundComponent
    },
    {
        path: 'mis-planes',
        component: (localStorage.getItem('logged') === 'true' && localStorage.getItem('userRole') === 'ROLE_USER') ? UserPlansComponent : NotFoundComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
