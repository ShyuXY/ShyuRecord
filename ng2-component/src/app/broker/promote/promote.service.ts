/**
 * 描述：promote  service
 * 作者：busy
 * 时间：2017-3
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import '../../shared/rxjs-operators';

import { AddPromote, AddPromoteList } from './promote';
import { AppConfig } from '../../config/config';
import { BaseService } from '../../shared/base.service';
import { PromoteQueryParams, Promote } from './promote';

@Injectable()
export class PromoteService extends BaseService {
    private urlPath: string = "";
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    private promoteUrl = "";
    private savePromoteDetailUrl = "";
    private editPromoteDetailUrl = "";
    private PromoteCancelUrl = "";
    private PromoteArchiveUrl = "";
    private PromoteConfirmUrl = "";
    //private supplierDetailUrl = 'app/customer/customer-list.json';

    constructor(private http: Http) {
        super();
        let config: AppConfig = new AppConfig();
        this.urlPath = config.urlPath;
        this.promoteUrl = this.urlPath + 'generalizeRule/getExtensionInfo';
        this.savePromoteDetailUrl = this.urlPath + 'generalizeRule/addBrokerGeneralize'
        this.editPromoteDetailUrl = this.urlPath + 'generalizeRule/getExtension'
        this.PromoteCancelUrl = this.urlPath + 'generalizeRule/revokeState';
        this.PromoteArchiveUrl = this.urlPath + 'generalizeRule/updateFileGrenealize';
        this.PromoteConfirmUrl = this.urlPath + 'generalizeRule/updateAffirmStatus';
    }
    //查询接口
    getPromotes(pageIndex: string, param: PromoteQueryParams): Observable<any> {
        let params = new URLSearchParams();
        params.set('pageIndex', pageIndex);
        params.set('pageSize', param.pageSize);
        params.set('startDate', param.startDate);
        params.set('endDate', param.endDate);
        params.set('ptId', param.ptId);
        params.set('status', param.status);
        //console.log(_json);

        return this.http
            .get(this.promoteUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }
    //撤销
    cancel(extensionNo: string): Observable<any> {
        let params = new URLSearchParams();
        params.set('extensionNo', extensionNo);
        return this.http
            .get(this.PromoteCancelUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }
    //归档
    archive(extensionNo: string): Observable<any> {
        let params = new URLSearchParams();
        params.set('extensionNo', extensionNo);
        return this.http
            .get(this.PromoteArchiveUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    //确认
    confirm(extensionNo: string): Observable<any> {
        let params = new URLSearchParams();
        params.set('extensionNo', extensionNo);
        params.set('flag', '1');
        return this.http
            .get(this.PromoteConfirmUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }
    //取消确认
    unconfirm(extensionNo: string): Observable<any> {
        let params = new URLSearchParams();
        params.set('extensionNo', extensionNo);
        params.set('flag', 'cancle');
        return this.http
            .get(this.PromoteConfirmUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }
    //保存
    savePromoteDetail(name: AddPromote): Observable<void> {
        return this.http
            .post(this.savePromoteDetailUrl, name, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //编辑 
    editPromoteDetail(name: any) {
        let params = new URLSearchParams();
        params.set("extensionNo", name);

        return this.http.get(this.editPromoteDetailUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }


}



