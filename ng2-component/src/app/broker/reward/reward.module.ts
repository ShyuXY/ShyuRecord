import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { RewardRoutingModule } from './reward-routing.module';
import { MyDatePickerModule } from 'mydatepicker';

import { MasterInformationComponent } from './master-information.component';
import { RewardRuleComponent } from './reward-rule.component';
import { RewardService } from './reward.service';

import { RewardStatusPipe } from './reward.pipe';

@NgModule({
    declarations: [
        MasterInformationComponent,
        RewardRuleComponent,
        RewardStatusPipe
    ],
    imports: [
        SharedModule,
        RewardRoutingModule,
        MyDatePickerModule
    ],
    providers: []
})
export class RewardModule { }