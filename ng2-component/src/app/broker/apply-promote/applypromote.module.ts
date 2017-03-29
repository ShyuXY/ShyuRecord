import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MyDatePickerModule } from 'mydatepicker';

import { PromoteRoutingModule } from './applypromote-routing.module';

import { ApplyPromoteListComponent } from './applypromote-list.component';
import { PromoteIncentiveStrengthPipe, PromoteCustStrengthPipe, PromoteStatusStrengthPipe, PromoteClassStrengthPipe } from './applypromote-strength.pipe';
import { ApplyPromoteDetailComponent } from './applypromote-detail.component';
import { PromoteService } from './applypromote.service';

@NgModule({
    declarations: [
        ApplyPromoteListComponent,
        ApplyPromoteDetailComponent,
        PromoteIncentiveStrengthPipe,
        PromoteCustStrengthPipe,
        PromoteStatusStrengthPipe,
        PromoteClassStrengthPipe
    ],
    imports: [
        SharedModule,
        PromoteRoutingModule,
        MyDatePickerModule
    ],
    providers: []
})
export class ApplyPromoteModule { }