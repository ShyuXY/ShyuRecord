import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { CustomerService } from './customer.service';
import { CustomerDetail } from './customer-detail';
import { AppComponent } from '../app.component';

@Component({
  selector: 'customer-detail-show',
  templateUrl: './customer-detail-show.component.html',
  styleUrls: ['./customer-detail-show.component.css',],
  providers: [ Title, CustomerService ]
})
export class CustomerDetailShowComponent implements OnInit {

    list : CustomerDetail;
    theCompanyName = '';
    theCompanyEasy = '';
    pathImg="https://imagehttps.91steel.com/";
    public file_srcs: string[] = [];
    public file_srcs1: string[] = [];
    public file_srcs2: string[] = [];
    public file_srcs3: string[] = [];

    constructor( private appComponent: AppComponent, private customerService: CustomerService, private route: ActivatedRoute ) { }

    ngOnInit() {
        this.list = new  CustomerDetail();
        this.appComponent.setTitle("客户详情");
        this.route.params
        .switchMap((params: Params) => this.customerService.editCustomer(params['comId']))
        .subscribe(
            data  => {
                if(data.respCode === "00000"){
                                            this.list = data.data;
                                            if(this.list.businessLicenseRegnoFile==null){
                                          this.list.businessLicenseRegnoFile={
                                             file1Content:"",
                                              file1Type:"",
                                              guid:"",
                                              fileid:""
                                          }
                                        }else{
                                           this.file_srcs.push(this.pathImg+this.list.businessLicenseRegnoFile.filePath1)
                                        }
                                        if(this.list.orgNoCardFile==null){
                                          this.list.orgNoCardFile={
                                             file1Content:"",
                                              file1Type:"",
                                              guid:"",
                                              fileid:""
                                          }
                                        }else{
                                           this.file_srcs1.push(this.pathImg+this.list.orgNoCardFile.filePath1)
                                        }
                                        if(this.list.taxRegCardFile==null){
                                          this.list.taxRegCardFile={
                                             file1Content:"",
                                              file1Type:"",
                                              guid:"",
                                              fileid:""
                                          }
                                        }else{
                                           this.file_srcs2.push(this.pathImg+this.list.taxRegCardFile.filePath1)
                                        }
                                        if(this.list.uniteSocietyCreditFile==null){
                                          this.list.uniteSocietyCreditFile={
                                             file1Content:"",
                                              file1Type:"",
                                              guid:"",
                                              fileid:""
                                          }
                                        }else{
                                           this.file_srcs3.push(this.pathImg+this.list.uniteSocietyCreditFile.filePath1)
                                        }
                                            this.theCompanyName = data.data.companyName;
                                            this.theCompanyEasy = data.data.shortName;
                                            if(this.list.isValid == '0') {
                                                this.list.isValid = '有效';
                                            }
                                            else {
                                                this.list.isValid = '无效';
                                            }
                                            if(this.list.bcIsBuyStoreage == '0'){
                                            this.list.bcIsBuyStoreage1 = '买家';
                                            }else{
                                            this.list.bcIsBuyStoreage1 = '';
                                            }
                                            if(this.list.bcIsSellTransport == '0'){
                                            this.list.bcIsSellTransport1 = '卖家';
                                            }else{
                                            this.list.bcIsSellTransport1 = '';
                                            }
                                            if(this.list.bcIsOperatorMachining == '0'){
                                            this.list.bcIsOperatorMachining1 = '运营方';
                                            }else{
                                            this.list.bcIsOperatorMachining1 = '';
                                            }
                                        }else{
                                        }
            },
            error  => alert("系统错误"),
        );
    }

}