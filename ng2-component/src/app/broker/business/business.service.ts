import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import '../../shared/rxjs-operators';

import { AppConfig } from '../../config/config';
import { BaseService } from '../../shared/base.service';
import { MasterListItem,BusiSettlSrarch,BusiSettLists,AllSettLists,RecordSearch } from './business';

@Injectable()
export class BusinessService extends BaseService {
    name:string = "123";
    private urlPath: string = "";
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    private SettBillSearchUrl = 'http://192.168.0.217/broker/settlement/list';
    private SettDetailsUrl = 'http://192.168.0.217/broker/settlement/details';
    private SettPassUrl = 'http://192.168.0.217/broker/settlement/pass';
    private SettCancelUrl = 'http://192.168.0.217/broker/settlement/cancle';
    private SettPayUrl = 'http://192.168.0.217/broker/settlement/pay';

    private BusiSettSearchUrl = 'http://192.168.0.160:8080/trade-manager/broker/canSettlement/getList'
    private ApplicationUrl = 'http://192.168.0.160:8080/trade-manager/broker/canSettlement/doSettlement'
    private AlllicationUrl = 'http://192.168.0.160:8080/trade-manager/broker/canSettlement/doSettlementAll'
    
    private RecordUrl = ''

    constructor(private http: Http) { 
        super(); 
        let config: AppConfig = new AppConfig();
        this.urlPath = config.urlPath;
        //this.urlPath = "http://10.66.1.131:9080/trade-manager/";

        this.SettBillSearchUrl =this.urlPath + 'broker/settlement/list';
        this.SettDetailsUrl = this.urlPath + 'broker/settlement/details';
        this.SettPassUrl = this.urlPath + 'broker/settlement/pass';
        this.SettCancelUrl = this.urlPath + 'broker/settlement/cancle';
        this.SettPayUrl = this.urlPath + 'broker/settlement/pay';

        this.BusiSettSearchUrl = this.urlPath + 'broker/canSettlement/getList'
        this.ApplicationUrl = this.urlPath + 'broker/canSettlement/doSettlement'
        this.AlllicationUrl = this.urlPath + 'broker/canSettlement/doSettlementAll'
        
        this.RecordUrl = this.urlPath + 'broker/commissionLog/getList'
        //this.RecordUrl = "http://192.168.0.177:8081/trade-manager/broker/commissionLog/getList";
    }
    //结算单分页查询
    getBills(pageIndex: string, param: BusiSettlSrarch): Observable<MasterListItem[]> {
        let params = new URLSearchParams();
        params.set('pageNum',pageIndex);
        params.set('pageSize',param.pageSize);
        params.set('brokerCompanyName',param.brokerCompanyName);
        params.set('status',param.status);
        params.set('billType',param.billType);
        //console.log(params);

        return this.http
                   .get(this.SettBillSearchUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }
    //明细页查询
    getdetails(settlementNo: string): Observable<MasterListItem[]> {
        let params = new URLSearchParams();
        params.set('settlementNo',settlementNo);
        //console.log(params);
        return this.http
                   .get(this.SettDetailsUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }
    //通过
    pass(settlementNo: string): Observable<MasterListItem[]> {
        let params = new URLSearchParams();
        params.set('settlementNos',settlementNo);
        //console.log(params);
        return this.http
                   .get(this.SettPassUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }
    //撤销
    cancel(settlementNo: string): Observable<MasterListItem[]> {
        let params = new URLSearchParams();
        params.set('settlementNos',settlementNo);
        //console.log(params);
        return this.http
                   .get(this.SettCancelUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }
    //支付
    pay(settlementNo: string): Observable<MasterListItem[]> {
        let params = new URLSearchParams();
        params.set('settlementNo',settlementNo);
        //console.log(params);
        return this.http
                   .get(this.SettPayUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }

    //申请结算-业务查询
    getBusinessLists(pageIndex: string, param: BusiSettLists): Observable<MasterListItem[]> {
        let params = new URLSearchParams();
        params.set('pageIndex',pageIndex);
        params.set('pageSize',param.pageSize);
        params.set('brokerName',param.brokerName);
        params.set('custName',param.custName);
        params.set('orderType',param.orderType);
        params.set('orderCreateDateStart',param.orderCreateDateStart);
        params.set('orderCreateDateEnd',param.orderCreateDateEnd);
        params.set('scopeCode',param.scopeCode);
        params.set('brokerComName',param.brokerComName);
        params.set('orderNo',param.orderNo);
        //console.log(params);

        return this.http
                   .get(this.BusiSettSearchUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }
    //申请结算功能
    //  applicationSettlement(scopeCode: string , arr: string):Observable<MasterListItem[]>{
    //     let params = new URLSearchParams();
    //     params.set('scopeCode',scopeCode);
    //     params.set("csOrderIdList",arr);
    //     return this.http
    //                .get(this.ApplicationUrl, { search : params })
    //                .map(this.extractData)
    //                .catch(this.handleError);
    // }
    applicationSettlement(name: any) {
        return this.http.post(this.ApplicationUrl, name, this.options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    //全部结算功能
    allSettlement(allSettList:AllSettLists):Observable<MasterListItem[]>{
        let params = new URLSearchParams();
        params.set('brokerName',allSettList.brokerName);
        params.set('custName',allSettList.custName);
        params.set('orderType',allSettList.orderType);
        params.set('orderCreateDateStart',allSettList.orderCreateDateStart);
        params.set('orderCreateDateEnd',allSettList.orderCreateDateEnd);
        params.set('scopeCode',allSettList.scopeCode);
        params.set('orderNo',allSettList.orderNo);
        params.set('brokerComName',allSettList.brokerComName);
        return this.http
                   .get(this.AlllicationUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }
    //佣金记录查询
    getRecordLists(pageNum: string, pageSize: string, param: RecordSearch): Observable<MasterListItem[]> {
        let params = new URLSearchParams();
        params.set('pageNum',pageNum);
        params.set('pageSize',pageSize);
        params.set('brokerName',param.brokerName);
        params.set('custName',param.custName);
        params.set('incentiveType',param.incentiveType);
        params.set('startTime',param.startTime);
        params.set('endTime',param.endTime);
        params.set('commissionStatus',param.commissionStatus);
        params.set('brokerCompanyName',param.brokerCompanyName);
        params.set('orderNo',param.orderNo);
        params.set('custType',param.custType);
        //console.log(params);

        return this.http
                   .get(this.RecordUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }
    

}

