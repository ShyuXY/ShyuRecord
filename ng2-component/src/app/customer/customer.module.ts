import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CustomerRoutingModule } from './customer-routing.module';

import { CustomerBuyStrengthPipe, CustomerSellStrengthPipe, CustomerOperatorStrengthPipe, CustomerStatusStrengthPipe } from './customer-strength.pipe';

import { CustomerDetailComponent } from './customer-detail.component';
import { CustomerListComponent } from './customer-list.component';
import { CustomerDetailShowComponent } from './customer-detail-show.component';
import { CustomerService } from './customer.service';

@NgModule({
    declarations: [
        CustomerDetailComponent,
        CustomerListComponent,
        CustomerDetailShowComponent,
        CustomerBuyStrengthPipe,
        CustomerSellStrengthPipe,
        CustomerOperatorStrengthPipe,
        CustomerStatusStrengthPipe
    ],
    imports: [
        SharedModule,
        CustomerRoutingModule
    ],
    providers: []
})
export class CustomerModule { }