import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MasterInformationComponent } from './master-information.component';
import { RewardRuleComponent } from './reward-rule.component';

const routes: Routes = [
    {
        path: 'master-information',
        component: MasterInformationComponent
    },
    {
        path: 'reward-rule',
        component: RewardRuleComponent
    },
    {
        path: 'master-information/:incentiveNo',
        component: MasterInformationComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class RewardRoutingModule {}