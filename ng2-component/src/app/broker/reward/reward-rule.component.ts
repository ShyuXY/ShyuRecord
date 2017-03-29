import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { MasterListItem, ReWardSrarch } from './master';
import { RewardService } from './reward.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'reward-rule',
  templateUrl: './reward-rule.component.html',
  styleUrls: ['./reward-rule.component.css'],
  providers: [Title, RewardService]
})
export class RewardRuleComponent implements OnInit {
  model: ReWardSrarch;
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
  rewardItems: MasterListItem[];
  cancelId: string = "";
  states: string = "";
  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    width: '160px',
    height: '31px',
    todayBtnTxt: '今天',
    dayLabels: { su: "日", mo: "一", tu: "二", we: "三", th: "四", fr: "五", sa: "六" },
    monthLabels: { 1: "１月", 2: "２月", 3: "３月", 4: "４月", 5: "５月", 6: "６月", 7: "７月", 8: "８月", 9: "９月", 10: "１０月", 11: "１１月", 12: "１２月" }
  };

  constructor(private appComponent: AppComponent, private rewardService: RewardService) { }

  onDateChanged1(event: IMyDateModel) {
    this.model.ruleStartTime = event.date.year + '-' + event.date.month + '-' + event.date.day;
    if (this.model.ruleStartTime == "0-0-0") {
      this.model.ruleStartTime = null;
    }
    //console.log(this.model);
  }

  onDateChanged2(event: IMyDateModel) {
    this.model.ruleEndTime = event.date.year + '-' + event.date.month + '-' + event.date.day;
    if (this.model.ruleEndTime == "0-0-0") {
      this.model.ruleEndTime = null;
    }
    //console.log(this.model);
  }

  search(pageIndex: string) {
    //console.log(this.model);
    this.rewardService.getSuppliers(pageIndex, this.model)
      .subscribe(
      rewards => {
        if (rewards["respCode"] == "00000") {
          this.pages = rewards["data"].pages;
          this.totalCount = rewards["data"].total;
          this.rewardItems = rewards["data"].list;
          //console.log(rewards["data"]);
        } else {
          alert(rewards["memo"])
        }

      },
      error => this.errorMessage = <any>error
      )
  }
  showDiolog(){
      alert("aaa");
  }
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
      check_val = "";
    }
    if (check_val != "") {
      this.cancelId = this.rewardItems[check_val]["incentiveNo"];
      this.states = this.rewardItems[check_val]["status"];
      if (this.states == "10") {
        this.rewardService.cancel(this.cancelId)
          .subscribe(
          rewards => {
            if (rewards["respCode"] == "00000") {
              alert(rewards["memo"]);
              this.search(this.cur.toString());
              i = 0;
            } else {
              alert(rewards["memo"])
            }

          },
          error => this.errorMessage = <any>error
          )
      } else {
        alert("只有待确认状态下才可以撤销");
      }
    } else {
      this.cancelId = "";
      this.states = "";
      alert("请选择一条数据再进行操作");
    }
  }
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
      check_val = "";
    }
    if (check_val != "") {
      this.cancelId = this.rewardItems[check_val]["incentiveNo"];
      this.states = this.rewardItems[check_val]["status"];
      if (this.states == "20") {
        this.rewardService.archive(this.cancelId)
          .subscribe(
          rewards => {
            if (rewards["respCode"] == "00000") {
              alert(rewards["memo"]);
              this.search(this.cur.toString());
            } else {
              alert(rewards["memo"])
            }

          },
          error => this.errorMessage = <any>error
          )
      } else {
        alert("只有已确认状态下才可以归档");
      }
    } else {
      this.cancelId = "";
      this.states = "";
      alert("请选择一条数据再进行操作");
    }

  }

  ngOnInit() {
    this.model = new ReWardSrarch();
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