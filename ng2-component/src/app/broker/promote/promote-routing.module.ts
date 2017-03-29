import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PromoteRuleComponent } from './promote-rule.component';
import { PromoteInformationComponent } from './promote-information.component';

const routes: Routes = [
    {
        path: 'promote-rule',
        component: PromoteRuleComponent
    },
    {
        path: 'promote-information',
        component: PromoteInformationComponent
    },
    {
        path: 'promote-information/:xxx',
        component: PromoteInformationComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PromoteRoutingModule {}