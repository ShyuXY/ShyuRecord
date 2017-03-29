import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';

import { AppComponent } from '../../app.component';
import { Grade, GradeQueryParams } from './grade';
import { GradeService } from './grade.service';

@Component({
  selector: 'grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.css'],
  providers: [ Title, GradeService ]
})
export class GradeListComponent implements OnInit {
  cur = 1;
  initNum = 1;
  prevShow = false;
  nextShow = false;
  tabShow = false;
  items = [];

  errorMessage: string;
  grades: Grade[];
  gradeQueryParams: GradeQueryParams;
  totalCount: number;
  pages: number;
  userId: string;

  constructor( private appComponent: AppComponent, private gradeService: GradeService ) { }

  //分页
  // search(pageIndex: string) {
  //   this.gradeService.getGrades(pageIndex, this.gradeQueryParams)
  //                           .subscribe(
  //                             grades => {
  //                               if (grades["respCode"] == "00000") {
  //                                 this.grades = grades["resultMap"];
  //                                 this.totalCount = grades["resultCount"]; 
  //                                 this.pages = Math.ceil(this.totalCount/10);
  //                               }          
  //                               else {
  //                                 alert(grades["memo"]);
  //                               }                      
  //                             },
  //                             error => this.errorMessage = <any>error
  //                           )
  // }

  search() {
    this.gradeService.getGrades(this.gradeQueryParams)
         .subscribe(
            grades => {
               if (grades["respCode"] == "00000") {
                   this.grades = grades["data"];
               }          
               else {
                   alert(grades["memo"]);
               }                      
            },
           error => this.errorMessage = <any>error
        )
  }

  cancel() {     
    if (this.userId) {
      if (window.confirm("是否确认撤销?")) {
        this.gradeService.cancelGrade(this.userId)
         .subscribe(
            data => {
               if (data["respCode"] == "00000") {
                   console.log("OK");
                   alert(data["memo"]);
                   window.location.reload();
               }          
               else {
                   alert(data["memo"]);
               }                      
            },
           error => this.errorMessage = <any>error
        )
      }      
    }
    else {
      alert("请选择用户！");
    }
    
  }

  ngOnInit() {
    this.gradeQueryParams = new GradeQueryParams();
    this.appComponent.setTitle("用户等级规则");
    this.search();
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
    //this.search(item.toString());
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
