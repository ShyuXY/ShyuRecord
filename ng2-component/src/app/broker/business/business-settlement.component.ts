import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { BusiSettLists, BusiSettListsDetails, AllSettLists } from './business';

import { BusinessService } from './business.service';
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
  providers: [Title, BusinessService,DialogService]
})
export class BusinessSetComponent implements OnInit {
  model: BusiSettLists;
  busiSettListsDetails: BusiSettListsDetails[];
  allSettList: AllSettLists;
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
  totalAll:string ="0";
  totalweight:string ="0";

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
    this.model.orderCreateDateStart = event.date.year + '-' + event.date.month + '-' + event.date.day;
    if(this.model.orderCreateDateStart == "0-0-0"){
      this.model.orderCreateDateStart = null;
    }
    //console.log(this.model);
  }

  onDateChanged2(event: IMyDateModel) {
    this.model.orderCreateDateEnd = event.date.year + '-' + event.date.month + '-' + event.date.day;
    if(this.model.orderCreateDateEnd == "0-0-0"){
      this.model.orderCreateDateEnd = null;
    }
    //console.log(this.model);
  }
  //确认弹框
  openDialogConfrim(check) {
    this.dialogService.getData("是否确认结算?","系统提示");//先更改serve的值
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '200px',
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.disabled = "false";
      if(result == "yes"){
          if(check == "全部结算"){
              this.allSettlement();
          }else{
              this.applySettlement();
          }
      }
      
    });
  }
  //提示弹框
  openDialogAlert() {
    let dialogRef = this.dialog.open(DialogAlertComponent, {
      height: '200px',
      width: '300px'
    });
  }



  search(pageIndex: string) {
    this.businessService.getBusinessLists(pageIndex, this.model)
      .subscribe(
      business => {
        if (business["respCode"] == "00000") {
          //console.log(business["resultMap"]);
          this.pagesize = business["resultMap"].size;
          if(business["resultMap"].orderBy){
              this.totalAll=business["resultMap"].orderBy.split("_")[0];
              this.totalweight=business["resultMap"].orderBy.split("_")[1];
          }else{
              this.totalweight="0";
              this.totalAll="0";
          }
          this.busiSettListsDetails = business["resultMap"].list;
          this.pages = business["resultMap"].pages;
          this.totalCount = business["resultMap"].total;

          this.allSettList.brokerName = this.model.brokerName;
          this.allSettList.custName = this.model.custName;
          this.allSettList.orderType = this.model.orderType;
          this.allSettList.orderCreateDateStart = this.model.orderCreateDateStart;
          this.allSettList.orderCreateDateEnd = this.model.orderCreateDateEnd;
          this.allSettList.scopeCode = this.model.scopeCode;
          this.allSettList.brokerComName = this.model.brokerComName;
          this.allSettList.orderNo = this.model.orderNo;
          
        } else {
          this.dialogService.getData(business["memo"],"系统提示");//先更改serve的值
          this.openDialogAlert();//弹出对话框，这两步相当于传值
        }

      },
      error => this.errorMessage = <any>error
      )
  }
  //校验申请结算是否选择一条数据
  applicationSettlement(check) {
    var obj = document.getElementsByName("dx");
    var check_val = [];
    for (var k in obj) {
      if (obj[k]["checked"])
        check_val.push(obj[k]["value"]);
    }
    var arr=[];
    if(check_val.length>0){
      this.disabled = "true";
      this.openDialogConfrim(check);
      
    }else{
      this.dialogService.getData("请选择至少一条待结算的信息","系统提示");//先更改serve的值
      this.openDialogAlert();//弹出对话框，这两步相当于传值
    }
  }

  applySettlement(){
    var obj = document.getElementsByName("dx");
    var check_val = [];
    for (var k in obj) {
      if (obj[k]["checked"])
        check_val.push(obj[k]["value"]);
    }
    var arr=[];

    for(var i=0;i<check_val.length;i++){
        arr.push(this.busiSettListsDetails[check_val[i]].id)
      }
      var json={
        "scopeCode" : this.model.scopeCode,
        csOrderIdList : arr
      }
      //console.log(json);
      this.businessService.applicationSettlement(json)
      .subscribe(
      business => {
        if (business["respCode"] == "00000") {
          this.dialogService.getData(business["memo"],"系统提示");//先更改serve的值
          this.openDialogAlert();//弹出对话框，这两步相当于传值
          this.search("1");
        } else {
          this.dialogService.getData(business["memo"],"系统提示");//先更改serve的值
          this.openDialogAlert();//弹出对话框，这两步相当于传值
        }

      },
      error => this.errorMessage = <any>error
      )
  }

  allSettlement(){
      //console.log(this.allSettList);
      this.businessService.allSettlement(this.allSettList)
                  .subscribe(
                  business => {
                    if (business["respCode"] == "00000") {
                      this.dialogService.getData(business["memo"],"系统提示");//先更改serve的值
                      this.openDialogAlert();//弹出对话框，这两步相当于传值
                      this.search("1");
                    } else {
                      this.dialogService.getData(business["memo"],"系统提示");//先更改serve的值
                      this.openDialogAlert();//弹出对话框，这两步相当于传值
                    }

                  },
                  error => this.errorMessage = <any>error
                  )
  }

  allPick(){
    var obj = document.getElementsByName("dx");
    var allpick = document.getElementsByName("all")[0];
    if(allpick["checked"]){
      for(var i =0;i<obj.length;i++){
          obj[i]["checked"]=true;
      }
    }else{
      for(var k =0;i<obj.length;k++){
          obj[k]["checked"] = false;
      }
    }
  }

  ngOnInit() {
    this.model = new BusiSettLists();
    this.allSettList = new AllSettLists();
    this.appComponent.setTitle("申请结算-业务");
    this.search("1");
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
    this.search(item.toString());
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
