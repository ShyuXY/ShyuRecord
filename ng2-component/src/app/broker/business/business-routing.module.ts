import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusinessDetComponent } from './business-details.component';
import { BusinessSetComponent } from './business-settlement.component';
import { SettlementComponent } from './settlement-bill.component';
import { BrokerageRecordComponent } from './brokerage-record.component';

const routes: Routes = [
    {
        path: 'business-settlement',
        component: BusinessSetComponent
    },
    {
        path: 'business-details',
        component: BusinessDetComponent
    },
    {
        path: 'settlement-bill',
        component: SettlementComponent
    },
    {
        path: 'business-details/:settlementNo',
        component: BusinessDetComponent
    },
    {
        path: 'brokerage-record',
        component: BrokerageRecordComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class BusinessRoutingModule {}