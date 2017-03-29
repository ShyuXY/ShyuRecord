import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { SupplierService } from './supplier.service';
import { SupplierDetail } from './Supplier-detail';
import { AppComponent } from '../app.component';

@Component({
  selector: 'supplier-detail-show',
  templateUrl: './supplier-detail-show.component.html',
  styleUrls: ['./supplier-detail-show.component.css',],
  providers: [ Title, SupplierService ]
})
export class SupplierDetailShowComponent implements OnInit {

    list : SupplierDetail;
    theCompanyName = '';
    theCompanyEasy = '';
    pathImg="https://imagehttps.91steel.com/";
    public file_srcs: string[] = [];
    public file_srcs1: string[] = [];
    public file_srcs2: string[] = [];
    public file_srcs3: string[] = [];

    constructor( private appComponent: AppComponent, private supplierService: SupplierService, private route: ActivatedRoute ) { }

    ngOnInit() {
        this.list = new  SupplierDetail();
        this.appComponent.setTitle("供应商详情");
        this.route.params
        .switchMap((params: Params) => this.supplierService.editCustomer(params['comId']))
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
                                            this.list.ngbcIsBuyStoreage = '提供仓储服务';
                                            }else{
                                            this.list.ngbcIsBuyStoreage = '';
                                            }
                                            if(this.list.bcIsSellTransport == '0'){
                                            this.list.ngbcIsSellTransport = '提供运输服务';
                                            }else{
                                            this.list.ngbcIsSellTransport = '';
                                            }
                                            if(this.list.bcIsOperatorMachining == '0'){
                                            this.list.ngbcIsOperatorMachining = '提供加工服务';
                                            }else{
                                            this.list.ngbcIsOperatorMachining = '';
                                            }
                                        }else{
                                        }
            },
            error  => alert("系统错误"),
        );
    }

}