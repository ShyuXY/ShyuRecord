import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


import { IMyOptions, IMyDateModel } from 'mydatepicker';

import { AppComponent } from '../../app.component';
//弹框引入
import { MdDialog,MdDialogRef } from '@angular/material' ;
import { DialogComponent } from '../../shared/dialog/dialog-confrim.component';
import { DialogAlertComponent } from '../../shared/dialog/dialog-alert.component';
import { DialogService } from '../../shared/dialog/dialog.service';


@Component({
  selector: 'business-settlement',
  templateUrl: './business-settlement.component.html',
  styleUrls: ['./business-settlement.component.css'],
  providers: [Title,DialogService]
})
export class BusinessSetComponent implements OnInit {



  


  ngOnInit() {

  }


}
