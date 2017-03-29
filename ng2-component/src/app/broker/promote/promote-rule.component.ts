/**
 * 描述：promote查询页
 * 作者：busy
 * 时间：2017-2
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

import { PromoteQueryParams, Promote } from './promote';
import { PromoteService } from './promote.service';
import { AppComponent } from '../../app.component';
//弹框引入
import { MdDialog,MdDialogRef } from '@angular/material' ;
import { DialogComponent } from '../../shared/dialog/dialog-confrim.component';
import { DialogAlertComponent } from '../../shared/dialog/dialog-alert.component';
import { DialogService } from '../../shared/dialog/dialog.service';

@Component({
  selector: 'promote-rule',
  templateUrl: './promote-rule.component.html',
  styleUrls: ['./promote-rule.component.css'],
  providers: [Title, PromoteService,DialogService]
})
export class PromoteRuleComponent implements OnInit {
  cur = 1;
  initNum = 1;
  prevShow = false;
  nextShow = false;
  tabShow = false;
  items = [];
  model: PromoteQueryParams;//查询请求数据
  promotes: Promote[];//查询得到数据
  errorMessage: string;
  extensionNo: string;//id编号

  totalCount: number;
  pages: number;

  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    width: '160px',
    height: '35px',
    editableDateField:false,
    todayBtnTxt:'今天',
    dayLabels: {su: "日", mo: "一", tu: "二", we: "三", th: "四", fr: "五", sa: "六"},
    monthLabels: {1: "１月", 2: "２月", 3: "３月", 4: "４月", 5: "５月", 6: "６月", 7: "７月", 8: "８月", 9: "９月", 10: "１０月", 11: "１１月", 12: "１２月"}
  };

  // dateChanged callback function called when the user select the date. This is mandatory callback
  // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.


  constructor(private appComponent: AppComponent, private promoteService: PromoteService, public dialog : MdDialog,private dialogService: DialogService) { }
  //日期控件1
  onDateChanged(event: IMyDateModel) {
    this.model.startDate = event.date.year + '-' + event.date.month + '-' + event.date.day;
    if(this.model.startDate == "0-0-0"){
      this.model.startDate = null;
    }
  }
  //日期控件2
  onDateChanged1(event: IMyDateModel) {
    this.model.endDate = event.date.year + '-' + event.date.month + '-' + event.date.day;
    if(this.model.endDate == "0-0-0"){
      this.model.endDate = null;
    }
  }
  openDialogAlert() {
    let dialogRef = this.dialog.open(DialogAlertComponent, {
      height: '200px',
      width: '300px'
    });
  }
  //查询
  search(pageIndex: string) {
    this.promoteService.getPromotes(pageIndex, this.model)
      .subscribe(
      promotes => {
        if (promotes["respCode"] == "00000") {
          this.promotes = promotes.data.list;
          this.totalCount = promotes.data.total;
          this.pages = Math.ceil(this.totalCount / 10);
        }

      },
      error => this.errorMessage = <any>error
      )
  }
  //撤销
  cancel() {
    var obj = document.getElementsByName("ssss");
    var check_val;
    var i = 0;
    for (var k in obj) {
      if (obj[k]["checked"]) {
        check_val = obj[k]["value"];
        i = 1;
      }
    }
    if (i == 0) {
      this.dialogService.getData("请选择一条数据再进行撤销操作","系统提示");
      this.openDialogAlert();
    }else{
      this.promoteService.cancel(this.extensionNo)
      .subscribe(
      promotes => {
        if (promotes["respCode"] == "00000") {
          this.dialogService.getData(promotes["memo"],"系统提示");
          this.openDialogAlert();
          this.search(this.cur.toString());
        } else {
          this.dialogService.getData(promotes["memo"],"系统提示");
          this.openDialogAlert();
        }

      },
      error => this.errorMessage = <any>error
      )
    }
    
  }

  //归档
  archive() {
    var obj = document.getElementsByName("ssss");
    var check_val;
    var i = 0;
    for (var k in obj) {
      if (obj[k]["checked"]) {
        check_val = obj[k]["value"];
        i = 1;
      }
    }
    if (i == 0) {
      this.dialogService.getData("请选择一条数据再进行归档操作","系统提示");
      this.openDialogAlert();
    }else{
      this.promoteService.archive(this.extensionNo)
        .subscribe(
        promotes => {
          if (promotes["respCode"] == "00000") {
            this.dialogService.getData(promotes["memo"],"系统提示");
            this.openDialogAlert();
            this.search(this.cur.toString());
          } else {
            this.dialogService.getData(promotes["memo"],"系统提示");
            this.openDialogAlert();
          }

        },
        error => this.errorMessage = <any>error
        )
    }
  }

  ngOnInit() {
    this.model = new PromoteQueryParams();
    //this.appComponent.setTitle("供应商管理");
    this.search("1");//进来就查询
  }
  ngDoCheck() {
    this.pageShow();
  }

  setClasses(item) {
    let classes = {
      paginate_button: true,
      current: this.current(item)
    };
    return classes;
  }

  pageShow() {
    var ar = [];
    if (this.pages > 7) {
      this.initNum = 1;
      this.tabShow = false;
      if (this.cur < this.pages - 3) {
        if (this.cur > 4) {
          ar.push(this.cur - 2);
          ar.push(this.cur - 1);
          ar.push(this.cur);
          ar.push(this.cur + 1);
          ar.push(this.cur + 2);
          this.prevShow = true;
          this.nextShow = true;
        } else {
          ar.push(1);
          ar.push(2);
          ar.push(3);
          ar.push(4);
          ar.push(5);
          this.prevShow = false;
          this.nextShow = true;
        }
      } else {
        if (this.cur > 4) {
          ar.push(this.pages - 4);
          ar.push(this.pages - 3);
          ar.push(this.pages - 2);
          ar.push(this.pages - 1);
          ar.push(this.pages);
          this.prevShow = true;
          this.nextShow = false;
        } else {
          ar.push(this.pages - 4);
          ar.push(this.pages - 3);
          ar.push(this.pages - 2);
          ar.push(this.pages - 1);
          ar.push(this.pages);
          this.prevShow = false;
          this.nextShow = false;
        }

      }

    } else if (this.pages > 0 && this.pages <= 7) {
      this.initNum = 1;
      this.tabShow = false;
      for (var i = 0; i < this.pages; i++) {
        ar.push(i + 1);
        this.prevShow = false;
        this.nextShow = false;
      }
    }
    else {
      this.initNum = 0;
      this.tabShow = true;
    }
    this.items = ar;
  }

  current(item: number) {
    if (this.cur == item) {
      return true;
    }
    return false;
  }

  btnClick(item: number) {
    if (item < 1) {
      item = 1;
    }
    else if (item > this.pages) {
      item = this.pages;
    }
    this.cur = item;
    this.search(item.toString());
  }

  firstPage(item: number) {
    item = 1;
    this.cur = item;
    this.search(item.toString());
  }
  lastPage(item: number) {
    item = this.pages;
    this.cur = item;
    this.search(item.toString());
  }

}