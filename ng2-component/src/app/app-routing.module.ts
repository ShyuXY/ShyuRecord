import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'customer',
        loadChildren: '../app/customer/customer.module#CustomerModule'
    },
    {
        path: 'supplier',
        loadChildren: '../app/supplier/supplier.module#SupplierModule'
    },
    {
        path: 'promote',
        loadChildren: '../app/broker/promote/promote.module#PromoteModule'
    },
    {
        path: 'grade',
        loadChildren: '../app/broker/grade/grade.module#GradeModule'
    },
    {
        path: 'reward',
        loadChildren: '../app/broker/reward/reward.module#RewardModule'
    },
    {
        path: 'applypromote',
        loadChildren: '../app/broker/apply-promote/applypromote.module#ApplyPromoteModule'
    },
    {
        path: 'business',
        loadChildren: '../app/broker/business/business.module#BusinessModule'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {useHash:true}) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}