import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import '../../shared/rxjs-operators';

import { AppConfig } from '../../config/config';
import { BaseService } from '../../shared/base.service';
import { MasterListItem,ReWardSrarch,ReWardMain } from './master';

@Injectable()
export class RewardService extends BaseService {
    private urlPath: string = "";
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    private RewardRuleUrl = '';
    private RewardCancelUrl = '';
    private RewardArchiveUrl = '';

    private RewardDetailUrl = '';
    private RewardConfirmUrl = '';
    private RewardSaveUrl = '' ;
    constructor(private http: Http) { 
        super(); 
        
        let config: AppConfig = new AppConfig();
        this.urlPath = config.urlPath;
        //this.urlPath = "http://192.168.0.217/";

        this.RewardRuleUrl = this.urlPath + 'broker/incentiveRule/list';
        this.RewardCancelUrl = this.urlPath + 'broker/incentiveRule/cancle';
        this.RewardArchiveUrl = this.urlPath + 'broker/incentiveRule/archive';
        this.RewardDetailUrl = this.urlPath + 'broker/incentiveRule/detail';
        this.RewardConfirmUrl = this.urlPath + 'broker/incentiveRule/confirm';
        this.RewardSaveUrl = this.urlPath + 'broker/incentiveRule/save';

    }
    //激励规则主页
    //分页查询
    getSuppliers(pageIndex: string, param: ReWardSrarch): Observable<MasterListItem[]> {
        let params = new URLSearchParams();
        params.set('page',pageIndex);
        params.set('size',param.size);
        params.set('ptId',param.ptId);
        params.set('status',param.status);
        params.set('confirmUserName',param.confirmUserName);
        params.set('ruleStartTime',param.ruleStartTime);
        params.set('ruleEndTime',param.ruleEndTime);
        //console.log(params);

        return this.http
                   .get(this.RewardRuleUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }
    //撤销
    cancel(incentiveNos: string):Observable<MasterListItem[]>{
        let params = new URLSearchParams();
        params.set('incentiveNos',incentiveNos);
        return this.http
                   .get(this.RewardCancelUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }
    //归档
    archive(incentiveNos: string):Observable<MasterListItem[]>{
        let params = new URLSearchParams();
        params.set('incentiveNos',incentiveNos);
        return this.http
                   .get(this.RewardArchiveUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }
    //激励规则详细信息页
    //详情查询
    getDetails(incentiveNo: string):Observable<MasterListItem[]>{
        let params = new URLSearchParams();
        params.set('incentiveNo',incentiveNo);
        return this.http
                   .get(this.RewardDetailUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }
    //确认和撤销确认
    confirm(incentiveNo: string,isConfirm: string):Observable<MasterListItem[]>{
        let params = new URLSearchParams();
        params.set('incentiveNo',incentiveNo);
        params.set('isConfirm',isConfirm);
        return this.http
                   .get(this.RewardConfirmUrl, { search : params })
                   .map(this.extractData)
                   .catch(this.handleError);
    }

    save(name: any) {
        return this.http.post(this.RewardSaveUrl, name, this.options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

}

