import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'status'
})
export class RewardStatusPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "00") {
            return "撤销";
        }
        else if(value == "10"){
            return "未审核";
        }else if(value == "20"){
            return "待支付";
        }else if(value == "30"){
            return "已支付";
        } else{
            return '';
        }
    }
}

@Pipe({
    name: 'billType'
})
export class BusiBillTypePipe implements PipeTransform {
    transform(value: string) {
        if ( value == "0") {
            return "推广佣金";
        }
        else if(value == "1"){
            return "业务佣金";
        } else{
            return '';
        }
    }
}

@Pipe({
    name: 'cycle'
})
export class BusicycleTypePipe implements PipeTransform {
    transform(value: string) {
        if ( value == "10") {
            return "即时";
        }
        else if(value == "20"){
            return "天";
        }else if(value == "30"){
            return "周";
        }else if(value == "40"){
            return "月";
        }else if(value == "50"){
            return "年";
        } else{
            return '';
        }
    }
}

@Pipe({
    name: 'orderType'
})
export class BusicycleOrderTypePipe implements PipeTransform {
    transform(value: string) {
        if ( value == "10") {
            return "自营销售订单";
        }
        else if(value == "20"){
            return "第三方销售订单";
        }else if(value == "30"){
            return "第三方采购订单";
        }else if(value == "40"){
            return "撮合订单";
        }else if(value == "50"){
            return "自营协议销售订单";
        } else{
            return '';
        }
    }
}

@Pipe({
    name: 'custType'//客户类型
})
export class CustStrengthPipe implements PipeTransform {
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
    name: 'commissionStatus'
})
export class RecordPayStatusPipe implements PipeTransform {
    transform(value: string) {
        if(value == "10"){
            return "未出账";
        }else if(value == "20"){
            return "已出账";
        }else if(value == "30"){
            return "已支付";
        } else{
            return '';
        }
    }
}