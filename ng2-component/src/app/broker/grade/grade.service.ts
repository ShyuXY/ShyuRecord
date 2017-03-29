import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import '../../shared/rxjs-operators';

import { AppConfig } from '../../config/config';
import { BaseService } from '../../shared/base.service';
import { Grade, GradeQueryParams } from './grade';

@Injectable()
export class GradeService extends BaseService {
    private urlPath: string = "";

    private headers = new Headers({ 'Content-Type': 'text/plain' });
    private options = new RequestOptions({ headers: this.headers });

    private gradesUrl = "";
    private gradesDetailUrl = "";
    private gradeEditUrl = "";
    private gradeCancelUrl = "";

    constructor(private http: Http) {
        super();
        let config: AppConfig = new AppConfig();
        this.urlPath = config.urlPath;
        //this.gradesUrl = '../../../../src/app/broker/grade/grade.json';
        //this.gradesDetailUrl = this.urlPath + 'Broker/UserRule/saveBrokerUserRuleInfo';
        //this.gradeEditUrl = '../../../../src/app/broker/grade/grade.json';
        //this.gradeCancelUrl = this.urlPath + 'Broker/UserRule/cancelBrokerUserRule';

        // this.gradesUrl = 'http://192.168.0.200:8080/trade-manager/Broker/UserRule/findBrokerUserRuleList';
        // this.gradesDetailUrl = 'http://192.168.0.200:8080/trade-manager/Broker/UserRule/addOrUpdateBrokerUserRule';
        // this.gradeEditUrl = 'http://192.168.0.200:8080/trade-manager/Broker/UserRule/getBrokerUserRuleInfo';
        // this.gradeCancelUrl = 'http://192.168.0.200:8080/trade-manager/Broker/UserRule/cancelBrokerUserRule';
        this.gradesUrl = this.urlPath + 'Broker/UserRule/findBrokerUserRuleList';
        this.gradesDetailUrl = this.urlPath + 'Broker/UserRule/addOrUpdateBrokerUserRule';
        this.gradeEditUrl = this.urlPath + 'Broker/UserRule/getBrokerUserRuleInfo';
        this.gradeCancelUrl = this.urlPath + 'Broker/UserRule/cancelBrokerUserRule';
    }

    //分页
    // getGrades(pageIndex: string, param: GradeQueryParams): Observable<Grade[]> {
    //     let _json = {
    //         'pageIndex': pageIndex,
    //         'pageSize': param.pageSize,
    //         'ptId': param.ptId,
    //         'status': param.status,
    //         'userType': param.userType
    //     }
    //     console.log(_json);

    //     return this.http
    //         .get(this.gradesUrl, _json)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    getGrades(param: GradeQueryParams): Observable<Grade[]> {

        let params = new URLSearchParams();
        params.set('pt_id', param.pt_id);
        params.set('status', param.status);
        params.set('userType', param.userType);

        return this.http
            .get(this.gradesUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    submitGradeDetail(param: Grade) {
        // let _json = {
        //     'brokerUserRuleInfo': JSON.stringify(param)
        // };
        // let params = new URLSearchParams();
        // params.set('brokerUserRuleInfo', JSON.stringify(param));
        return this.http.post(this.gradesDetailUrl, param, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editGrade(id: string) {
        let params = new URLSearchParams();
        params.set('id', id);
        return this.http
            .get(this.gradeEditUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    cancelGrade(id: string) {
        let params = new URLSearchParams();
        params.set('id', id);
        return this.http
            .get(this.gradeCancelUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

}

