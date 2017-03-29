/**
 * 描述：申请结算-推广
 * 作者：busy
 * 时间：2017-3
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

import { SeachParams,getParams } from './applypromote';
import { PromoteService } from './applypromote.service';
import { AppComponent } from '../../app.component';
//弹框引入
import { MdDialog,MdDialogRef } from '@angular/material' ;
import { DialogComponent } from '../../shared/dialog/dialog-confrim.component';
import { DialogAlertComponent } from '../../shared/dialog/dialog-alert.component';
import { DialogService } from '../../shared/dialog/dialog.service';

@Component({
  selector: 'applypromote-list',
  templateUrl: './applypromote-list.component.html',
  styleUrls: ['./applypromote-list.component.css'],
  providers: [Title, PromoteService,DialogService]
})
export class ApplyPromoteListComponent implements OnInit {
  cur = 1;
  initNum = 1;
  prevShow = false;
  nextShow = false;
  tabShow = false;
  items = [];
  seachAll:Object;//查询信息  和model雷同
  model: SeachParams;//查询信息
  errorMessage:string;//错误信息
  getList:getParams[];//查询得到的列表
  allMoney:string="0";//总金额
  disabled:string = "false";

  totalCount: number=0;
  pages: number;

  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    width: '180px',
    height: '35px',
    editableDateField:false,
    todayBtnTxt:'今天',
    dayLabels: {su: "日", mo: "一", tu: "二", we: "三", th: "四", fr: "五", sa: "六"},
    monthLabels: {1: "１月", 2: "２月", 3: "３月", 4: "４月", 5: "５月", 6: "６月", 7: "７月", 8: "８月", 9: "９月", 10: "１０月", 11: "１１月", 12: "１２月"}
  };

  // dateChanged callback function called when the user select the date. This is mandatory callback
  // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.


  constructor(private appComponent: AppComponent, private promoteService: PromoteService, public dialog : MdDialog,private dialogService: DialogService) { }
  //开始日期
  onDateChanged(event: IMyDateModel) {
    this.model.incentiveStartDate = event.date.year + '-' + event.date.month + '-' + event.date.day;
    if(this.model.incentiveStartDate == "0-0-0"){
      this.model.incentiveStartDate = null;
    }
  }
  //结束日期
  onDateChanged1(event: IMyDateModel) {
    this.model.incentiveEndDate = event.date.year + '-' + event.date.month + '-' + event.date.day;
    if(this.model.incentiveEndDate == "0-0-0"){
      this.model.incentiveEndDate = null;
    }
  }
  //提示弹框
  openDialogAlert() {
    let dialogRef = this.dialog.open(DialogAlertComponent, {
      height: '200px',
      width: '300px'
    });
  }
  //校验申请结算是否选择一条数据
  applicationSettlement(check) {
    var obj = document.getElementsByName("ck");
    var check_val = [];
    for (var k in obj) {
      if (obj[k]["checked"])
        check_val.push(obj[k]["value"]);
    }
    var arr=[];
    if(check_val.length==0){
      this.disabled = "true";
      this.openDialogConfrim(check);
      
    }else{
      this.dialogService.getData("请选择至少一条待结算的信息","系统提示");//先更改serve的值
      this.openDialogAlert();//弹出对话框，这两步相当于传值
    }
  }
  //是否确认弹框
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
              this.applyAll();
          }else{
              this.applysum();
          }
      }
      
    });
  }
  //查询
  search(pageIndex: string) {
      this.promoteService.getPromotes(pageIndex, this.model)
      .subscribe(
      data => {
        if (data["respCode"] == "00000") {
          this.getList = data.data.list;
          this.totalCount = data.data.total;
          this.pages = Math.ceil(this.totalCount / 10);
          let All = document.getElementsByName('all')[0];
          All['checked'] = false;
          this.seachAll = {};
          for(var name in this.model){
            this.seachAll[name] = this.model[name];
          }
        }else{
          this.dialogService.getData(data["memo"],"系统提示");
          this.openDialogAlert();
        }

      },
      error => this.errorMessage = <any>error
      )

      this.promoteService.getMoney(pageIndex, this.model)
      .subscribe(
      data => {
        if (data["respCode"] == "00000") {
          this.allMoney = data.data;
        }else{
          this.dialogService.getData(data["memo"],"系统提示");
          this.openDialogAlert();
        }

      },
      error => this.errorMessage = <any>error
      )
  }
  //全部结算
  applyAll(){
    //console.log(this.seachAll)
    if(this.seachAll!=undefined){
        if(this.seachAll == {}){
          this.seachAll = "";
        }
        this.promoteService.applyPayAll(this.seachAll)
          .subscribe(
            data => {
              if (data["respCode"] == "00000") {
                this.dialogService.getData(data["memo"],"系统提示");
                this.openDialogAlert();
                let All = document.getElementsByName('all')[0];
                All['checked'] = false;
                this.search("1");
              }else{
                if(data["memo"]==null){
                    data["memo"] = "申请结算失败";
                }
                this.dialogService.getData(data["memo"],"系统提示");
                this.openDialogAlert();
              }

            },
            error => this.errorMessage = <any>error
          )
    }
    
  }
  //申请结算
  applysum(){
    let aCk = document.getElementsByName('ck');
    let str = "";
    let first = true
    for(let i=0;i<aCk.length;i++){
      if(aCk[i]["checked"]){
        if(first){
          str = str + this.getList[i]['id'];
          first = false;
        }else{
          str = str + "," + this.getList[i]['id'];
        }
      }
    }
    this.promoteService.applyPay(str)
      .subscribe(
      data => {
        if (data["respCode"] == "00000") {
          this.dialogService.getData(data["memo"],"系统提示");
          this.openDialogAlert();
          this.search("1");
        }else{
          if(data["memo"]==null){
              data["memo"] = "申请结算失败";
          }
          this.dialogService.getData(data["memo"],"系统提示");
          this.openDialogAlert();
        }

      },
      error => this.errorMessage = <any>error
      )
  }
  //全选
  selectAll(){
    let aCk = document.getElementsByName('ck');
    let All = document.getElementsByName('all')[0];
    for(let i = 0; i < aCk.length; i++){
      if(!aCk[i].hidden){
        aCk[i]["checked"] = All["checked"];
      };
		}
  }
  //选一个 联动
  one(){
    let count = 0;
    let aCk = document.getElementsByName('ck');
    let All = document.getElementsByName('all')[0];
    for(var i = 0; i < aCk.length; i++){
      if(aCk[i]["checked"]){
        count++;
      }
    }
    All["checked"] = count == aCk.length;
  }

  ngOnInit() {
    this.model = new SeachParams();
    this.appComponent.setTitle("申请结算-推广");
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