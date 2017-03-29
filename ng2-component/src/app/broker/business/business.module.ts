import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { BusinessRoutingModule } from './business-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { MaterialModule } from '@angular/material';

import { BusinessDetComponent } from './business-details.component';
import { BusinessSetComponent } from './business-settlement.component';
import { SettlementComponent } from './settlement-bill.component';
import { BrokerageRecordComponent } from './brokerage-record.component';
import { BusinessService } from './business.service';

import { DialogComponent } from '../../shared/dialog/dialog-confrim.component';
import { DialogAlertComponent } from '../../shared/dialog/dialog-alert.component';
import { DialogService } from '../../shared/dialog/dialog.service';

import { RewardStatusPipe,BusiBillTypePipe,BusicycleTypePipe,BusicycleOrderTypePipe,CustStrengthPipe,RecordPayStatusPipe } from './business.pipe';

@NgModule({
    declarations: [
        BusinessDetComponent,
        BusinessSetComponent,
        SettlementComponent,
        BrokerageRecordComponent,
        RewardStatusPipe,
        BusiBillTypePipe,
        BusicycleTypePipe,
        BusicycleOrderTypePipe,
        DialogComponent,
        DialogAlertComponent,
        CustStrengthPipe,
        RecordPayStatusPipe
    ],
    imports: [
        SharedModule,
        BusinessRoutingModule,
        MyDatePickerModule,
        MaterialModule.forRoot()
    ],
    providers: [],
    entryComponents:[DialogComponent,DialogAlertComponent]
})
export class BusinessModule { }