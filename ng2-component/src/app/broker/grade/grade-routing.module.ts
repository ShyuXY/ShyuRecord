import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GradeListComponent } from './grade-list.component';
import { GradeDetailComponent } from './grade-detail.component';

const routes: Routes = [
    {
        path: 'grade-list',
        component: GradeListComponent
    },
    {
        path: 'grade-detail',
        component: GradeDetailComponent
    },
    {
        path: 'grade-detail/:id',
        component: GradeDetailComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class GradeRoutingModule {}