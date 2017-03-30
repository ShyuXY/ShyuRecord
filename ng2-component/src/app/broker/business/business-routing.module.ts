import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusinessSetComponent } from './business-settlement.component';

const routes: Routes = [
    {
        path: 'business-settlement',
        component: BusinessSetComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class BusinessRoutingModule {}