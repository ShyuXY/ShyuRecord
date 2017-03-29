/**
 * 描述：申请结算业务service层
 * 作者：busy
 * 创建时间：2017-3-5
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import '../../shared/rxjs-operators';

import { SeachParams, DetailList } from './applypromote';
import { AppConfig } from '../../config/config';
import { BaseService } from '../../shared/base.service';

@Injectable()
export class PromoteService extends BaseService {
    private urlPath: string = "";
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    private promoteUrl = "";
    private applyUrl = "";
    private applyAllUrl = "";
    private searchDetailsUrl = "";
    private moneyUrl = "";

    constructor(private http: Http) {
        super();
        let config: AppConfig = new AppConfig();
        this.urlPath = config.urlPath;
        //this.urlPath = "http://192.168.0.202:8188/trade-manager/";
        this.promoteUrl = this.urlPath + 'broker/settlement/promoteSettlementList';
        this.applyUrl = this.urlPath + 'broker/settlement/promoteSettlementApply';
        this.applyAllUrl = this.urlPath + 'broker/settlement/promoteSettlementAll';
        this.searchDetailsUrl = this.urlPath + 'broker/settlement/details';
        this.moneyUrl = this.urlPath + 'broker/settlement/promoteSettlementAmount';
    }
//查询
    getPromotes(pageIndex: string, param: SeachParams): Observable<any> {
        let params = new URLSearchParams();
        params.set('pageIndex', pageIndex);
        params.set('pageSize', param.pageSize);
        params.set('companyName', param.companyName);
        params.set('broker', param.broker);
        params.set('custName', param.custName);
        params.set('custType', param.custType);
        params.set('incentiveStartDate', param.incentiveStartDate);
        params.set('incentiveEndDate', param.incentiveEndDate);

        return this.http
            .get(this.promoteUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }
    //查钱
    getMoney(pageIndex: string, param: SeachParams): Observable<any> {
        let params = new URLSearchParams();
        params.set('pageIndex', pageIndex);
        params.set('pageSize', param.pageSize);
        params.set('broker', param.broker);
        params.set('custName', param.custName);
        params.set('custType', param.custType);
        params.set('incentiveStartDate', param.incentiveStartDate);
        params.set('incentiveEndDate', param.incentiveEndDate);

        return this.http
            .get(this.moneyUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }
//结算
    applyPay(param:any): Observable<any> {
        let params = new URLSearchParams();
        params.set('idStr', param);

        return this.http
            .get(this.applyUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }
    //全部结算
    applyPayAll(param:any): Observable<any> {
        let params = new URLSearchParams();
        params.set('broker', param.broker);
        params.set('custName', param.custName);
        params.set('custType', param.custType);
        params.set('incentiveStartDate', param.incentiveStartDate);
        params.set('incentiveEndDate', param.incentiveEndDate);

        return this.http
            .get(this.applyAllUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    //明细页查询
    getdetails(param:any): Observable<any> {
        let params = new URLSearchParams();
        params.set('settlementNo',param);
        //console.log(params);
        return this.http
                   .get(this.searchDetailsUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }

}



