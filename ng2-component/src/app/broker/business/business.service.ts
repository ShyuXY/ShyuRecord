import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import '../../shared/rxjs-operators';

import { BaseService } from '../../shared/base.service';
import { MasterListItem,BusiSettlSrarch,BusiSettLists,AllSettLists,RecordSearch } from './business';

@Injectable()
export class BusinessService extends BaseService {
    name:string = "123";
    private urlPath: string = "";
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    
    private SettBillSearchUrl = ''
    private ApplicationUrl = ''
    constructor(private http: Http) { 
        super(); 

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
    applicationSettlement(name: any) {
        return this.http.post(this.ApplicationUrl, name, this.options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    

}

