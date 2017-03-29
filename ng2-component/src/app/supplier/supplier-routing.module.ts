import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SupplierListComponent } from './supplier-list.component';
import { SupplierDetailComponent } from './supplier-detail.component';
import { SupplierDetailShowComponent } from './supplier-detail-show.component';

const routes: Routes = [
    {
        path: 'supplier-list',
        component: SupplierListComponent
    },
    {
        path: 'supplier-detail',
        component: SupplierDetailComponent
    },
    {
        path: 'supplier-detail/:comId',
        component: SupplierDetailComponent
    },
    {
        path: 'supplier-detail-show/:comId',
        component: SupplierDetailShowComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class SupplierRoutingModule {}