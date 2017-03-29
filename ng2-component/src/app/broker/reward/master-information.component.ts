import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { ReWardMain, AddRewardList } from './master';
import { RewardService } from './reward.service';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'master-information',
  templateUrl: './master-information.component.html',
  styleUrls: ['./master-information.component.css'],
  providers: [Title, RewardService]
})
export class MasterInformationComponent implements OnInit {
  rewardMain: ReWardMain;
  addRewardLists: AddRewardList[];
  i: number;
  indexId: number;
  sign: number = 0;
  errorMessage: string;
  cancelId: string = 'JL170301009';
  isConfirm: string;
  incentiveNo = this.route.snapshot.params['incentiveNo'];
  date1: any;
  date2: any;
  //日期插件引入
  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'yyyy-mm-dd',
    width: '180px',
    height: '31px',
    todayBtnTxt: '今天',
    dayLabels: { su: "日", mo: "一", tu: "二", we: "三", th: "四", fr: "五", sa: "六" },
    monthLabels: { 1: "１月", 2: "２月", 3: "３月", 4: "４月", 5: "５月", 6: "６月", 7: "７月", 8: "８月", 9: "９月", 10: "１０月", 11: "１１月", 12: "１２月" }
  };
  constructor(private appComponent: AppComponent, private rewardService: RewardService, private route: ActivatedRoute, private router: Router) { }
  //时间戳转化日期格式
  dateFormat(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  }
  //日期格式初始化
  onDateChanged1(event: IMyDateModel) {
    if (event.date.month < 10) {
      this.rewardMain.ruleStartTime = event.date.year + '-0' + event.date.month + '-' + event.date.day;
      if (this.rewardMain.ruleStartTime == "0-00-00") {
        this.rewardMain.ruleStartTime = null;
      }
      if (event.date.day < 10) {
        this.rewardMain.ruleStartTime = event.date.year + '-0' + event.date.month + '-0' + event.date.day;
        if (this.rewardMain.ruleStartTime == "0-00-00") {
          this.rewardMain.ruleStartTime = null;
        }
      }
    } else {
      if (event.date.day < 10) {
        this.rewardMain.ruleStartTime = event.date.year + '-' + event.date.month + '-0' + event.date.day;
        if (this.rewardMain.ruleStartTime == "0-00-00") {
          this.rewardMain.ruleStartTime = null;
        }
      }
    }
  }
  //日期格式初始化
  onDateChanged2(event: IMyDateModel) {
    if (event.date.month < 10) {
      this.rewardMain.ruleEndTime = event.date.year + '-0' + event.date.month + '-' + event.date.day;
      if (this.rewardMain.ruleEndTime == "0-00-00") {
        this.rewardMain.ruleEndTime = null;
      }
      if (event.date.day < 10) {
        this.rewardMain.ruleEndTime = event.date.year + '-0' + event.date.month + '-0' + event.date.day;
        if (this.rewardMain.ruleEndTime == "0-00-00") {
          this.rewardMain.ruleEndTime = null;
        }
      }
    } else {
      if (event.date.day < 10) {
        this.rewardMain.ruleEndTime = event.date.year + '-' + event.date.month + '-0' + event.date.day;
        if (this.rewardMain.ruleEndTime == "0-00-00") {
          this.rewardMain.ruleEndTime = null;
        }
      }
    }
  }
  //大于0校验
  check0(index) {
    //console.log(index);
    if (this.addRewardLists[index].incentiveValue <= 0) {
      alert("激励值必须是大于0的数字");
      this.addRewardLists[index].incentiveValue = null;
    }
  }
  //新增明细操作
  addOne() {
    let json = new AddRewardList();
    this.addRewardLists.push(json);
  }
  //删除明细操作
  delete() {
    var obj = document.getElementsByName("dx");
    var check_val = [];
    for (var k in obj) {
      if (obj[k]["checked"])
        check_val.push(obj[k]["value"]);
    }
    if (check_val.length > 0) {
      var n = 0;
      for (var i in check_val) {
        this.addRewardLists.splice(check_val[i] - n, 1);
        n++;
      }
      check_val = null;
    } else {
      alert('请选择一条数据再进行删除');
    }
  }
  //复制明细操作
  copy() {
    var obj = document.getElementsByName("dx");
    var check_val = [];
    for (var k in obj) {
      if (obj[k]["checked"])
        check_val.push(obj[k]["value"]);
    }

    if (check_val.length > 0) {
      var arr1 = [];
      for (var p in check_val) {
        arr1.push(this.addRewardLists[check_val[p]])
      }
      for (var i in arr1) {
        var json2 = new AddRewardList();
        for (var name in arr1[i]) {
          json2[name] = arr1[i][name];
        }
        //console.log(json2)
        this.addRewardLists.push(json2);
      }



    } else {
      alert('请选择一条数据再进行复制');
    }
  }
  //获取数据渲染页面
  getDetails(incentiveNo) {
    //console.log(this.cancelId);
    this.rewardService.getDetails(incentiveNo)
      .subscribe(
      rewards => {
        if (rewards["respCode"] == "00000") {

          this.rewardMain = rewards["data"];
          this.rewardMain.ruleStartTime = this.dateFormat(new Date(this.rewardMain.ruleStartTime))
          this.rewardMain.ruleEndTime = this.dateFormat(new Date(this.rewardMain.ruleEndTime))
          this.rewardMain.createTime = this.dateFormat(new Date(this.rewardMain.createTime))
          this.rewardMain.details = rewards["data"].details;
          this.addRewardLists = rewards["data"].details;

          let d1 = new Date(this.rewardMain.ruleStartTime);
          let year1 = d1.getFullYear();
          let month1 = d1.getMonth() + 1;
          let day1 = d1.getDate();
          this.date1 = { date: { year: year1, month: month1, day: day1 } };

          let d2 = new Date(this.rewardMain.ruleEndTime);
          let year2 = d2.getFullYear();
          let month2 = d2.getMonth() + 1;
          let day2 = d2.getDate();
          this.date2 = { date: { year: year2, month: month2, day: day2 } };
          //console.log(this.rewardMain);
        } else {
          alert(rewards["memo"])
        }

      },
      error => this.errorMessage = <any>error
      )
  }
  //确认和取消确认操作
  confirm(isConfirm) {
    //console.log(this.cancelId);
    if (this.sign == 0) {//校验新增时是否保存过
      this.rewardService.confirm(this.incentiveNo, isConfirm)
        .subscribe(
        rewards => {
          if (rewards["respCode"] == "00000") {
            alert(rewards["memo"]);
            this.router.navigate(['/master-information', this.incentiveNo]);
            this.getDetails(this.incentiveNo);

          } else {
            alert(rewards["memo"])
          }

        },
        error => this.errorMessage = <any>error
        )
    } else {
      alert("请先保存在进行确认操作");
    }

  }
  //保存操作
  save() {
    console.log(this.rewardMain.ruleEndTime);
    console.log(this.date2=="");
    //校验必填项是否填写
    if (this.rewardMain.ruleDesc == undefined || this.date1 == undefined || this.date1 == "" || this.date2 == "" || this.date2 == undefined || this.rewardMain.remark == undefined) {
      alert("请填写：规则描述,规则有效期,备注")
    } else {
      if (this.rewardMain.ruleEndTime < this.rewardMain.ruleStartTime) {
        alert("起始日期不能大于结束日期");
      } else {
        if (this.addRewardLists.length < 1) {
          alert("请录入明细规则后再进行保存")
        } else {
          //校验列表信息是否重复
          for (var i in this.addRewardLists) {
            var temp = this.addRewardLists[i].brokerType + '-' + this.addRewardLists[i].businessType + '-' + this.addRewardLists[i].interval
            var n = 0;
            for (var k in this.addRewardLists) {
              var tempTest = this.addRewardLists[k].brokerType + '-' + this.addRewardLists[k].businessType + '-' + this.addRewardLists[k].interval
              if (tempTest === temp) {
                n++;
              }
            }
          }

          if (n > 1) {
            alert('经济人类型，业务类型，结算周期不能完全一致');
          } else {
            var p = 0;
            for (var n = 0; n < this.addRewardLists.length; n++) {
              //if(this.addRewardLists[n].calcValue)
              if (this.addRewardLists[n].calcValue == null || this.addRewardLists[n].incentiveValue == null) {
                p = 1;
              }
            }
            if (p == 1) {
              alert("计量值和激励值必须填写");
            } else {
              this.rewardService.save(this.rewardMain)
                .subscribe(
                rewards => {
                  if (rewards["respCode"] == "00000") {
                    alert(rewards["memo"]);
                    if (this.incentiveNo) {
                      this.router.navigate(['/master-information', this.incentiveNo]);
                      this.getDetails(this.incentiveNo);
                    } else {
                      this.sign = 0;
                      this.incentiveNo = rewards["data"];
                      this.router.navigate(['/master-information', this.incentiveNo]);
                      this.getDetails(this.incentiveNo);
                    }
                  } else {
                    alert(rewards["memo"])
                  }
                },
                error => this.errorMessage = <any>error
                )
            }

          }

        }
      }

    }

  }

  ngOnInit() {
    this.rewardMain = new ReWardMain();
    this.addRewardLists = [new AddRewardList()];
    this.rewardMain.details = this.addRewardLists;

    if (this.incentiveNo) {
      this.getDetails(this.incentiveNo);
    } else {
      this.sign = 1;
    }


  }
}