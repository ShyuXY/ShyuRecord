import { Component, OnInit } from '@angular/core';

import { MdDialogRef,MaterialModule } from '@angular/material';
import { DialogConfrim } from './dialog';
import { DialogService } from './dialog.service';

@Component({
  selector: 'dialog-confrim',
  templateUrl: './dialog-confrim.component.html',
  styleUrls: ['./dialog-confrim.component.css'],
  providers: [DialogService]
})

export class DialogComponent {
  content: string = "";
  title:string = "";
  constructor(public dialogRef: MdDialogRef<DialogComponent>, private dialogService: DialogService) {
      this.dialogService.updateData().then(data => {
        this.content = data.content;
        this.title = data.title;
      });
  }
}