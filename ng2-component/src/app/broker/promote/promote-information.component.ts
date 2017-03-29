import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AddPromote, AddPromoteList } from './promote';
import { AppComponent } from '../../app.component';
import { PromoteService } from './promote.service';


@Component({
  selector: 'promote-information',
  templateUrl: './promote-information.component.html',
  styleUrls: ['./promote-information.component.css'],
  providers: [Title, PromoteService]
})
export class PromoteInformationComponent implements OnInit {
  addPromoteItem: AddPromote;
  errorMessage: string;
  id: string = this.route.snapshot.params['xxx'];
  date1: Object;//日期控件日期
  date2: Object;//日期控件日期
  indexId: number;//传过来的id

  //日期控件属性
  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    width: '180px',
    height: '35px',
    editableDateField: false,
    todayBtnTxt: '今天',
    dayLabels: { su: "日", mo: "一", tu: "二", we: "三", th: "四", fr: "五", sa: "六" },
    monthLabels: { 1: "１月", 2: "２月", 3: "３月", 4: "４月", 5: "５月", 6: "６月", 7: "７月", 8: "８月", 9: "９月", 10: "１０月", 11: "１１月", 12: "１２月" }
  };


  constructor(private appComponent: AppComponent, private promoteService: PromoteService, private route: ActivatedRoute, private router: Router) { }

  //新增明细
  newList() {
    let json: AddPromoteList = {
      userType: "10",
      extensionType: "10",
      settlementCycle: "10",
      valueType: "10",
      valueData: "",
      terminalType: "10",
      remark: "",
      ext1: "",
      ext1Description: "",
      ext2: "",
      ext2Description: "",
      ext3: "",
      ext3Description: "",
      ext4: "",
      ext4Description: "",
      ext5: "",
      ext5Description: ""
    }
    this.addPromoteItem.list.push(json);
    //console.log(this.addPromoteItem);
  }

  //删除明细
  delList() {
    var obj = document.getElementsByName("dx");
    var check_val = [];
    for (var k in obj) {
      if (obj[k]["checked"])
        check_val.push(obj[k]["value"]);
    }
    //console.log(check_val);
    if (check_val.length > 0) {
      var n = 0;
      for (var i in check_val) {
        this.addPromoteItem.list.splice(check_val[i] - n, 1);
        n++;
      }
      check_val = null;
    } else {
      alert('请选择一条数据再进行删除');
    }
  }

  //复制明细
  copyList() {
    var obj = document.getElementsByName("dx");
    var check_val = [];
    for (var k in obj) {
      if (obj[k]["checked"])
        check_val.push(obj[k]["value"]);
    }

    if (check_val.length > 0) {
      var arr1 = [];
      for (var p in check_val) {
        arr1.push(this.addPromoteItem.list[check_val[p]])
      }


      for (var i in arr1) {
        var json2 = new AddPromoteList();
        for (var name in arr1[i]) {
          json2[name] = arr1[i][name];
        }
        this.addPromoteItem.list.push(json2);
      }



    } else {
      alert('请选择一条数据再进行复制');
    }
  }

  //设置时间
  setDate(value) {
    if (value == '' || value == null) {
      return '';
    }
    let d = new Date(value);
    let year = d.getFullYear();
    let month: number = d.getMonth() + 1;
    let day = d.getDate();
    return year + '-' + month + '-' + day;
  }

  //确认
  onConfirm() {
    this.promoteService.confirm(this.addPromoteItem["extensionNo"])
      .subscribe(
      promotes => {
        if (promotes["respCode"] == "00000") {
          this.router.navigate(['/promote-information', this.id]);
          this.seachDetail(this.id);
        } else {
          alert(promotes["memo"]);
        }

      },
      error => this.errorMessage = <any>error
      )
  }
  //取消确认
  disonConfirm() {
    this.promoteService.unconfirm(this.addPromoteItem["extensionNo"])
      .subscribe(
      promotes => {
        if (promotes["respCode"] == "00000") {
          this.router.navigate(['/promote-information', this.id]);
          this.seachDetail(this.id);
        } else {
          alert(promotes["memo"]);
        }

      },
      error => this.errorMessage = <any>error
      )
  }

  //保存
  onSubmit() {
    this.promoteService.savePromoteDetail(this.addPromoteItem)
      .subscribe(
      promotes => {
        if (promotes["respCode"] == "00000") {
          // console.log(promotes['data']);
          // alert(promotes["memo"]);
          // this.router.navigate(['/promote-information', promotes['data']]);
          // this.seachDetail(this.id);
          if (this.id) {
            alert(promotes["memo"]);
            this.router.navigate(['/promote-information', this.id]);
            this.seachDetail(this.id);
          } else {
            alert(promotes["memo"]);
            this.id = promotes["data"];
            this.router.navigate(['/promote-information', this.id]);
            this.seachDetail(this.id);
          }
        } else {
          alert(promotes["memo"]);
        }


      },
      error => this.errorMessage = <any>error
      )
  }
  //获取日期
  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.addPromoteItem.startDate = event.date.year + "-" + event.date.month + "-" + event.date.day;
  }
  
  onDateChanged1(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.addPromoteItem.endDate = event.date.year + "-" + event.date.month + "-" + event.date.day;
  }
  //明细如果传了id
  seachDetail(id) {
    this.promoteService.editPromoteDetail(id)
      .subscribe(
      data => {
        //console.log(data);
        if (data.respCode == "00000") {
          data.data.brokerGeneralize.createDate = this.setDate(data.data.brokerGeneralize.createDate);
          this.addPromoteItem = data.data.brokerGeneralize;
          this.addPromoteItem.list = data.data.list;
          let d1 = new Date(this.addPromoteItem.startDate);
          let year1 = d1.getFullYear();
          let month1 = d1.getMonth() + 1;
          let day1 = d1.getDate();
          this.date1 = { date: { year: year1, month: month1, day: day1 } };
          let d2 = new Date(this.addPromoteItem.endDate);
          let year2 = d2.getFullYear();
          let month2 = d2.getMonth() + 1;
          let day2 = d2.getDate();
          this.date2 = { date: { year: year2, month: month2, day: day2 } };
          this.addPromoteItem.endDate = year2 + '-' + month2 + '-' + day2;
          this.addPromoteItem.startDate = year1 + '-' + month1 + '-' + day1;
          //console.log(this.addPromoteItem);
          //console.log(this.addPromoteItem.executeFlag);
        }

      },
      error => this.errorMessage = <any>error
      )
  }
  ngOnInit() {

    this.addPromoteItem = new AddPromote();
    if (this.id) {
      //判断传了id没有
      this.seachDetail(this.id);
    }
  }
}