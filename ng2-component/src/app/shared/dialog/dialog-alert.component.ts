import { Component, OnInit } from '@angular/core';

import { MdDialogRef,MaterialModule } from '@angular/material';
import { DialogAlert } from './dialog';
import { DialogService } from './dialog.service';

@Component({
  selector: 'dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css'],
  providers: [DialogService]
})

export class DialogAlertComponent {
  content: string = "";
  title:string = "";
  constructor(public dialogRef: MdDialogRef<DialogAlertComponent>, private dialogService: DialogService) {
    this.dialogService.updateData().then(data => {
      this.content = data.content;
      this.title = data.title;
    });
    
  }
}