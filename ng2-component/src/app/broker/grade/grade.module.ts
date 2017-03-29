import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { GradeRoutingModule } from './grade-routing.module';

import { GradeListComponent } from './grade-list.component';
import { GradeDetailComponent } from './grade-detail.component';


import { GradeptIdStrengthPipe, GradeUserTypeStrengthPipe, GradeStatusStrengthPipe, GradeUserGradeStrengthPipe } from './grade-strength.pipe';

@NgModule({
    declarations: [
        GradeListComponent,
        GradeDetailComponent,
        GradeptIdStrengthPipe,
        GradeUserTypeStrengthPipe,
        GradeStatusStrengthPipe,
        GradeUserGradeStrengthPipe
    ],
    imports: [
        SharedModule,
        GradeRoutingModule
    ],
    providers: []
})
export class GradeModule { }