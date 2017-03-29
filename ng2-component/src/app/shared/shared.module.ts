import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  imports:      [ CommonModule],
  declarations: [ ],
  exports:      [ CommonModule, FormsModule,  MyDatePickerModule  ]
})
export class SharedModule { }