import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import '../shared/rxjs-operators';

import { AppConfig } from '../config/config';
import { BaseService } from '../shared/base.service';
import { Supplier, SupplierQueryParams } from './supplier';
import { SupplierDetail } from './supplier-detail';

@Injectable()
export class SupplierService extends BaseService {
    private urlPath: string = "";
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    private suppliersUrl = "";
    private supplierDetailUrl = "";
    private supplierCheckUrl = "";
    private customerNameEasy = "";
    private customerEdit = "";
    private phone = "";
    private email = "";
     //private supplierDetailUrl = 'app/customer/customer-list.json';
    
    constructor(private http: Http) { 
        super(); 
        let config: AppConfig = new AppConfig();
        this.urlPath = config.urlPath;
        this.suppliersUrl = this.urlPath + 'trader/traderManage/list';
        this.supplierDetailUrl = this.urlPath + 'trader/traderManage/addOrUpdate';
        this.supplierCheckUrl = this.urlPath + 'trader/traderManage/validCompanyName';
        this.customerNameEasy = this.urlPath + 'trader/traderManage/validShortName';
        this.phone = this.urlPath + 'trader/traderManage/validCompanyMobile';
        this.email = this.urlPath + 'trader/traderManage/validCompanyEmail';
        this.customerEdit = this.urlPath + 'trader/traderManage/initUpdate';
    }

    getSuppliers(pageIndex: string, param: SupplierQueryParams): Observable<Supplier[]> {
        let _json = {
            'pageIndex': pageIndex,
            'pageSize': param.pageSize,
            'companyType': param.companyType,
            'comId': param.comId,
            'companyName': param.companyName,
            'shortName': param.shortName,
            'mobile': param.mobile,
            'isValid': param.isValid,
            'deleteFlag': param.deleteFlag
        }
        //console.log(_json);

        return this.http
                   .post(this.suppliersUrl, _json, this.options)
                   .map(this.extractData)
                   .catch(this.handleError);
    }
    
    deleteSupplier(comId: string): Observable<void> {
        const delSupplierUrl = this.urlPath + 'trader/traderManage/delete';

        return this.http
                   .post(delSupplierUrl, { "comId": comId }, this.options)
                   .map(this.extractData)
                   .catch(this.handleError);              
    }   

    submitSupplierDetail(name: SupplierDetail){
        return this.http.post(this.supplierDetailUrl, name, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    saveOnly(name: any){
         return this.http.post(this.supplierCheckUrl, name, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    saveOnlyEasy(name: any){
         return this.http.post(this.customerNameEasy, name, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    savePhone(name: any) {
        return this.http.post(this.phone, name, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    saveEmail(name: any) {
        return this.http.post(this.email, name, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editCustomer(comId: string){
        return this.http
                   .post(this.customerEdit, { comId: comId }, this.options)
                   .map(this.extractData)
                   .catch(this.handleError);
    }
}

