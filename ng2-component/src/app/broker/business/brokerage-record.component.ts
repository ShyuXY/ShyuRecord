import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { RecordSearch,RecordLists } from './business';

import { BusinessService } from './business.service';
import { AppComponent } from '../../app.component';
//弹框引入
import { MdDialog,MdDialogRef } from '@angular/material' ;
import { DialogAlertComponent } from '../../shared/dialog/dialog-alert.component';
import { DialogService } from '../../shared/dialog/dialog.service';


@Component({
  selector: 'brokerage-record',
  templateUrl: './brokerage-record.component.html',
  styleUrls: ['./brokerage-record.component.css'],
  providers: [Title, BusinessService,DialogService]
})
export class BrokerageRecordComponent implements OnInit {
  model: RecordSearch;
  recordLists:RecordLists[];

  cur = 1;
  initNum = 1;
  prevShow = false;
  nextShow = false;
  tabShow = false;
  items = [];
  conNumber: string;
  disabled:string = "false";

  errorMessage: string;
  totalCount: number=0;
  pages: number = 0;
  pagesize:number = 0;

  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    width: '160px',
    height: '31px',
    todayBtnTxt: '今天',
    dayLabels: { su: "日", mo: "一", tu: "二", we: "三", th: "四", fr: "五", sa: "六" },
    monthLabels: { 1: "１月", 2: "２月", 3: "３月", 4: "４月", 5: "５月", 6: "６月", 7: "７月", 8: "８月", 9: "９月", 10: "１０月", 11: "１１月", 12: "１２月" }
  };

  constructor(private appComponent: AppComponent, private businessService: BusinessService, public dialog : MdDialog,private dialogService: DialogService) { }

  onDateChanged1(event: IMyDateModel) {
    this.model.startTime = event.date.year + '-' + event.date.month + '-' + event.date.day;
    if(this.model.startTime == "0-0-0"){
      this.model.startTime = null;
    }
    //console.log(this.model);
  }

  onDateChanged2(event: IMyDateModel) {
    this.model.endTime = event.date.year + '-' + event.date.month + '-' + event.date.day;
    if(this.model.endTime == "0-0-0"){
      this.model.endTime = null;
    }
    //console.log(this.model);
  }
  //提示弹框
  openDialogAlert() {
    let dialogRef = this.dialog.open(DialogAlertComponent, {
      height: '200px',
      width: '300px'
    });
  }



  search(pageNum: string,pageSize:string) {
    console.log(this.model);
    this.businessService.getRecordLists(pageNum,pageSize,this.model)
      .subscribe(
      record => {
        if (record["respCode"] == "00000") {
          console.log(record);
          this.pages = record["data"].pages;
          this.totalCount = record["data"].total;
          this.recordLists = record["data"].list;
        } else {
          this.dialogService.getData(record["memo"],"系统提示");
          this.openDialogAlert();
        }

      },
      error => this.errorMessage = <any>error
      )
  }

  ngOnInit() {
    this.model = new RecordSearch();
    this.appComponent.setTitle("佣金记录");
    this.search("1","10");
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
    this.conNumber = item.toString();
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
    this.search(item.toString(),"10");
  }

  firstPage(item: number) {
    item = 1;
    this.cur = item;
  }
  lastPage(item: number) {
    item = this.pages;
    this.cur = item;
  }

}
