import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MyDatePickerModule } from 'mydatepicker';

import { PromoteRoutingModule } from './promote-routing.module';

import { PromoteRuleComponent } from './promote-rule.component';
import { PromoteStatusStrengthPipe,PromoteNameStrengthPipe } from './promote-strength.pipe';
import { PromoteInformationComponent } from './promote-information.component';
import { PromoteService } from './promote.service';

@NgModule({
    declarations: [
        PromoteRuleComponent,
        PromoteInformationComponent,
        PromoteStatusStrengthPipe,
        PromoteNameStrengthPipe
    ],
    imports: [
        SharedModule,
        PromoteRoutingModule,
        MyDatePickerModule
    ],
    providers: []
})
export class PromoteModule { }