import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { BusinessRoutingModule } from './business-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { MaterialModule } from '@angular/material';

import { BusinessSetComponent } from './business-settlement.component';

import { DialogComponent } from '../../shared/dialog/dialog-confrim.component';
import { DialogAlertComponent } from '../../shared/dialog/dialog-alert.component';
import { DialogService } from '../../shared/dialog/dialog.service';


@NgModule({
    declarations: [
        BusinessSetComponent,
        DialogComponent,
        DialogAlertComponent
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