/**
 * 描述：结算明细-推广
 * 作者：busy
 * 创建时间：2017-3-5
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { DetailData, DetailList } from './applypromote';
import { AppComponent } from '../../app.component';
import { PromoteService } from './applypromote.service';


@Component({
  selector: 'applypromote-information',
  templateUrl: './applypromote-detail.component.html',
  styleUrls: ['./applypromote-detail.component.css'],
  providers: [Title, PromoteService]
})
export class ApplyPromoteDetailComponent implements OnInit {
  errorMessage: string;//错误信息
  model:DetailData;//单个数据
  detailLists:DetailList[];//list数据
  settlementNo = this.route.snapshot.params["settlementNo"];
  
  constructor(private appComponent: AppComponent, private promoteService: PromoteService, private route: ActivatedRoute, private router: Router) { }
  //查询
  search(settlementNo){
    this.promoteService.getdetails(settlementNo)
      .subscribe(
      data => {
        if (data["respCode"] == "00000") {
          this.model=data["data"];
          this.detailLists=data["data"].details;
        } else {
          alert(data.memo)
        }

      },
      error => this.errorMessage = <any>error
      )
  }
  
  ngOnInit() {
    this.model = new DetailData();
    this.search(this.settlementNo);//调用查询
  }
}