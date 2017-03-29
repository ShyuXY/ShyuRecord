/**
 * 描述：此文件夹管道
 * 作者：busy
 * 时间：2017-3
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'IncentiveStrength'//激励类型
})
export class PromoteIncentiveStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "10") {
            return "客户开拓";
        }
        else if( value == "20") {
            return "稳定开展";
        }
        else{
            return "";
        }
    }
}

@Pipe({
    name: 'CustStrength'//客户类型
})
export class PromoteCustStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "10") {
            return "终端用户";
        }
        else if( value == "20") {
            return "钢厂";
        }
        else if( value == "30") {
            return "资源提供方";
        }
        else if( value == "40") {
            return "仓库";
        }
        else if( value == "50") {
            return "承运商";
        }
        else if( value == "60") {
            return "车辆";
        }
        else if( value == "70") {
            return "非终端用户";
        }
        else{
            return "";
        }
    }
}

@Pipe({
    name: 'StatusStrength'//状态类型
})
export class PromoteStatusStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "00") {
            return "撤销";
        }
        else if( value == "10") {
            return "未审核";
        }
        else if( value == "20") {
            return "待支付";
        }
        else if( value == "30") {
            return "已支付";
        }
        else{
            return "";
        }
    }
}

@Pipe({
    name: 'Classtrength'//结算类型
})
export class PromoteClassStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "0") {
            return "推广";
        }
        else if( value == "1") {
            return "业务";
        }
        else{
            return "";
        }
    }
}
