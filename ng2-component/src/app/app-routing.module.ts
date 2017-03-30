import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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