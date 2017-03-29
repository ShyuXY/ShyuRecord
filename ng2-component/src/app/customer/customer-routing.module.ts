import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerListComponent } from './customer-list.component';
import { CustomerDetailComponent } from './customer-detail.component';
import { CustomerDetailShowComponent } from './customer-detail-show.component';

const routes: Routes = [
    {
        path: 'customer-list',
        component: CustomerListComponent
    },
    {
        path: 'customer-detail',
        component: CustomerDetailComponent
    },
    {
        path: 'customer-detail/:comId',
        component: CustomerDetailComponent
    },
    {
        path: 'customer-detail-show/:comId',
        component: CustomerDetailShowComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class CustomerRoutingModule {}