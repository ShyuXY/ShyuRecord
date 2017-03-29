import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { SupplierRoutingModule } from './supplier-routing.module';

import { SupplierBuyStrengthPipe, SupplierSellStrengthPipe, SupplierOperatorStrengthPipe, SupplierStatusStrengthPipe } from './supplier-strength.pipe';

import { SupplierDetailComponent } from './supplier-detail.component';
import { SupplierListComponent } from './supplier-list.component';
import { SupplierDetailShowComponent } from './supplier-detail-show.component';
import { SupplierService } from './supplier.service';

@NgModule({
    declarations: [
        SupplierDetailComponent,
        SupplierListComponent,
        SupplierDetailShowComponent,
        SupplierBuyStrengthPipe,
        SupplierSellStrengthPipe,
        SupplierOperatorStrengthPipe,
        SupplierStatusStrengthPipe
    ],
    imports: [
        SharedModule,
        SupplierRoutingModule
    ],
    providers: [],
    exports: [
        SupplierDetailComponent,
        SupplierListComponent,
        SupplierDetailShowComponent
    ]
})
export class SupplierModule { }