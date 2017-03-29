import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { BusiDetailsLists,BusiMainLists } from './business';
import { BusinessService } from './business.service';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css'],
  providers: [Title, BusinessService]
})
export class BusinessDetComponent implements OnInit {
  model: BusiMainLists;
  busiDetailsLists: BusiDetailsLists[];
  errorMessage: string;

  settlementNo = this.route.snapshot.params["settlementNo"];

  constructor(private appComponent: AppComponent, private businessService: BusinessService, private route: ActivatedRoute, private router: Router) { }

  search(settlementNo) {
      this.businessService.getdetails(settlementNo)
          .subscribe(
          business => {
            if (business["respCode"] == "00000") {
              //console.log(business["data"]);
              this.model=business["data"];
              this.busiDetailsLists=business["data"].details;
            } else {
              alert(business["memo"])
            }

          },
          error => this.errorMessage = <any>error
          )
  }

  ngOnInit() {
    this.model = new BusiMainLists();
    this.search(this.settlementNo);
    this.appComponent.setTitle("结算明细-业务");
  }
}