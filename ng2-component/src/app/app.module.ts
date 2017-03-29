import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { CustomerModule } from './customer/customer.module';
import { SupplierModule } from './supplier/supplier.module';
import { PromoteModule } from './broker/promote/promote.module';
import { GradeModule } from './broker/grade/grade.module';
import { RewardModule } from './broker/reward/reward.module';
import { ApplyPromoteModule } from './broker/apply-promote/applypromote.module';
import { BusinessModule } from './broker/business/business.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    CustomerModule,
    SupplierModule,
    PromoteModule,
    GradeModule,
    RewardModule,
    ApplyPromoteModule,
    BusinessModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
