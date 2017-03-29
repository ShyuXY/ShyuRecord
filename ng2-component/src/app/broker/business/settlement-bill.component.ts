/**
 * 描述:
 * 作者:
 * 创建时间:
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusiSettlSrarch, BusiSettlLists } from './business';
import { BusinessService } from './business.service';
import { AppComponent } from '../../app.component';

//弹框引入
import { MdDialog,MdDialogRef } from '@angular/material' ;
import { DialogComponent } from '../../shared/dialog/dialog-confrim.component';
import { DialogAlertComponent } from '../../shared/dialog/dialog-alert.component';
import { DialogService } from '../../shared/dialog/dialog.service';

@Component({
  selector: 'settlement-bill',
  templateUrl: './settlement-bill.component.html',
  styleUrls: ['./settlement-bill.component.css'],
  providers: [Title, BusinessService,DialogService]
})
export class SettlementComponent implements OnInit {
  model: BusiSettlSrarch;
  cur = 1;
  initNum = 1;
  prevShow = false;
  nextShow = false;
  tabShow = false;
  items = [];
  conNumber: string;

  errorMessage: string;
  totalCount: number;
  pages: number;
  busiSettlLists: BusiSettlLists[];
  cancelId: string = "";
  states: string = "";

  constructor(private appComponent: AppComponent, private businessService: BusinessService, private route: ActivatedRoute, private router: Router, public dialog : MdDialog,private dialogService: DialogService) { }

  search(pageIndex: string) {
    this.businessService.getBills(pageIndex, this.model)
      .subscribe(
      business => {
        if (business["respCode"] == "00000") {
          //console.log(business["data"]);
          this.pages = business["data"].pages;
          this.totalCount = business["data"].total;
          this.busiSettlLists = business["data"].list;
        } else {
          this.dialogService.getData(business["memo"],"系统提示");
          this.openDialogAlert();
        }

      },
      error => this.errorMessage = <any>error
      )
  }
  //提示弹框
  openDialogAlert() {
    let dialogRef = this.dialog.open(DialogAlertComponent, {
      height: '200px',
      width: '300px'
    });
  }

  jump(type, settlementNo) {
    if (type == "0") {
      //alert("推广");
      this.router.navigate(['/applypromote-detail', settlementNo]);
    } else {
      this.router.navigate(['/business-details', settlementNo]);
    }
  }

  pass() {
    var obj = document.getElementsByName("dx");
    var check_val = [];
    for (var k in obj) {
      if (obj[k]["checked"])
        check_val.push(obj[k]["value"]);
    }
    var str = "";
    if (check_val.length != 0) {
      for (var i = 0; i < check_val.length; i++) {
        str += this.busiSettlLists[check_val[i]]["settlementNo"] + ","
      }
      str = str.substring(0, str.length - 1);
      //console.log(str);
      this.businessService.pass(str)
        .subscribe(
        rewards => {
          if (rewards["respCode"] == "00000") {
            this.dialogService.getData(rewards["memo"],"系统提示");
            this.openDialogAlert();
            this.search(this.cur.toString());
          } else {
            this.dialogService.getData(rewards["memo"],"系统提示");
            this.openDialogAlert();
          }
        },
        error => this.errorMessage = <any>error
        )
    } else {
      this.dialogService.getData("请选择至少一条数据再进行操作","系统提示");
      this.openDialogAlert();
    }
  }
  cancel() {
    var obj = document.getElementsByName("dx");
    var check_val = [];
    for (var k in obj) {
      if (obj[k]["checked"])
        check_val.push(obj[k]["value"]);
    }
    var str = "";
    if (check_val.length != 0) {
      for (var i = 0; i < check_val.length; i++) {
        str += this.busiSettlLists[check_val[i]]["settlementNo"] + ","
      }
      str = str.substring(0, str.length - 1);
      //console.log(str);
      this.businessService.cancel(str)
        .subscribe(
        rewards => {
          if (rewards["respCode"] == "00000") {
            this.dialogService.getData(rewards["memo"],"系统提示");
            this.openDialogAlert();
            this.search(this.cur.toString());
          } else {
            this.dialogService.getData(rewards["memo"],"系统提示");
            this.openDialogAlert();
          }
        },
        error => this.errorMessage = <any>error
        )
    } else {
      this.dialogService.getData("请选择至少一条数据再进行操作","系统提示");
      this.openDialogAlert();
    }

  }

  pay(settlementNo) {
    //console.log(settlementNo)
    this.businessService.pay(settlementNo)
      .subscribe(
      rewards => {
        if (rewards["respCode"] == "00000") {
          this.dialogService.getData(rewards["memo"],"系统提示");
          this.openDialogAlert();
          this.search(this.cur.toString());
        } else {
          this.dialogService.getData(rewards["memo"],"系统提示");
          this.openDialogAlert();
        }
      },
      error => this.errorMessage = <any>error
      )
  }
  display() {
    var _show = document.getElementsByClassName("show");
    _show[0]["style"].display = "block";
    _show[1]["style"].display = "block";
  }
  hidden() {
    var _show = document.getElementsByClassName("show");
    _show[0]["style"].display = "none";
    _show[1]["style"].display = "none";
  }

  ngOnInit() {
    this.model = new BusiSettlSrarch();
    this.appComponent.setTitle("结算单");
    this.search('1');
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