import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplyPromoteListComponent } from './applypromote-list.component';
import { ApplyPromoteDetailComponent } from './applypromote-detail.component';

const routes: Routes = [
    {
        path: 'applypromote-list',
        component: ApplyPromoteListComponent
    },
    {
        path: 'applypromote-detail/:settlementNo',
        component: ApplyPromoteDetailComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PromoteRoutingModule {}