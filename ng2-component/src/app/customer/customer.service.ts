import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import '../shared/rxjs-operators';

import { AppConfig } from '../config/config';
import { BaseService } from '../shared/base.service';
import { Customer, CustomerQueryParams } from './customer';
import { CustomerDetail } from './customer-detail';

@Injectable()
export class CustomerService extends BaseService {
    private urlPath: string = "";



    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    private customersUrl = "";
    private customerDetailUrl = "";
    private customerName = "";
    private customerNameEasy = "";
    private phone = "";
    private email = "";
    private customerEdit = "";

    constructor(private http: Http) {
        super();
        let config: AppConfig = new AppConfig();
        this.urlPath = config.urlPath;
        this.customersUrl = this.urlPath + 'trader/traderManage/list';
        this.customerDetailUrl = this.urlPath + 'trader/traderManage/addOrUpdate';
        this.customerName = this.urlPath + 'trader/traderManage/validCompanyName';
        this.customerNameEasy = this.urlPath + 'trader/traderManage/validShortName';
        this.phone = this.urlPath + 'trader/traderManage/validCompanyMobile';
        this.email = this.urlPath + 'trader/traderManage/validCompanyEmail';
        this.customerEdit = this.urlPath + 'trader/traderManage/initUpdate';
    }

    getCustomers(pageIndex: string, param: CustomerQueryParams): Observable<Customer[]> {
        let _json = {
            'pageIndex': pageIndex,
            'pageSize': param.pageSize,
            'companyType': param.companyType,
            'comId': param.comId,
            'companyName': param.companyName,
            'shortName': param.shortName,
            'mobile': param.mobile,
            'isValid': param.isValid,
            'deleteFlag': param.deleteFlag,
            'bcIsBuyStoreage': param.bcIsBuyStoreage ? "0" : "",
            'bcIsSellTransport': param.bcIsSellTransport ? "0" : "",
            'bcIsOperatorMachining': param.bcIsOperatorMachining ? "0" : ""
        }
        console.log(_json);

        return this.http
            .post(this.customersUrl, _json, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //提交客户详情
    submitCustomerDetail(name: CustomerDetail) {
        let jsonN = name;
        jsonN.bcIsBuyStoreage = name.bcIsBuyStoreage1 ? "0" : "1";
        jsonN.bcIsSellTransport = name.bcIsSellTransport1 ? "0" : "1";
        jsonN.bcIsOperatorMachining = name.bcIsOperatorMachining1 ? "0" : "1";
        return this.http.post(this.customerDetailUrl, jsonN, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    //客户名字接口
    saveOnly(name: any) {
        return this.http.post(this.customerName, name, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    //客户简称接口
    saveOnlyEasy(name: any) {
        return this.http.post(this.customerNameEasy, name, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    //电话接口
    savePhone(name: any) {
        return this.http.post(this.phone, name, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    //邮箱接口
    saveEmail(name: any) {
        return this.http.post(this.email, name, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteCustomer(comId: string): Observable<void> {
        const delCustomerUrl = this.urlPath + 'trader/traderManage/delete';

        return this.http
            .post(delCustomerUrl, { "comId": comId }, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editCustomer(comId: string) {
        return this.http
            .post(this.customerEdit, { comId: comId }, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}

