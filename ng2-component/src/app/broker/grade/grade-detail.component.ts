import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import 'rxjs/add/operator/switchMap';

import { AppComponent } from '../../app.component';
import { Grade } from './grade';
import { GradeService } from './grade.service';

@Component({
  selector: 'grade-detail',
  templateUrl: './grade-detail.component.html',
  styleUrls: ['./grade-detail.component.css'],
  providers: [ Title, GradeService ],
})
export class GradeDetailComponent implements OnInit {
  model : Grade;
  //hidden = false;
  
  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd.mm.yyyy',
    height: '31px',
    width: '260px',
    inline: false,
    disableUntil: {year: 2016, month: 8, day: 10},
    selectionTxtFontSize: '14px',
    openSelectorTopOfInput: false
  };
  
  constructor( private appComponent: AppComponent, private gradeService:GradeService, private route: ActivatedRoute, private router: Router ) {
     
  }  

  onDateChanged(event: IMyDateModel) {

  }

  onSubmit() {
     if (window.confirm("是否确认保存?")) {
      this.gradeService.submitGradeDetail(this.model)
        .subscribe(
            data  => {
              if(data.respCode === "00000"){
                alert(data.memo);
                this.router.navigate(['/grade-list']);
              }else{
                alert(data.memo);
              }
            },
            error  => {
               alert("保存失败!");
            }
       )
     }
  }

  ngOnInit() {
    this.model = new Grade();
    this.appComponent.setTitle("用户等级规则明细");

    let id = this.route.snapshot.params['id'];
    if(id) {
      this.gradeService.editGrade(id)
      .subscribe(
        data  => {
          if(data["respCode"] === "00000") {
            this.model = data["data"];
          }
          else {
            alert(data["memo"]);
          } 
        }
      )
    }
  }

}
