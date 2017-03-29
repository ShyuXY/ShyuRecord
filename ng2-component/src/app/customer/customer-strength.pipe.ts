import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'buyStrength'
})
export class CustomerBuyStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "0") {
            return "买方";
        }
        else {
            return "";
        }
    }
}
@Pipe({
    name: 'sellStrength'
})
export class CustomerSellStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "0") {
            return "卖方";
        }
        else {
            return "";
        }
    }
}
@Pipe({
    name: 'operatorStrength'
})
export class CustomerOperatorStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "0") {
            return "运营方";
        }
        else {
            return "";
        }
    }
}
@Pipe({
    name: 'statusStrength'
})
export class CustomerStatusStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "0") {
            return "有效";
        }
        else if ( value == "1") {
            return "无效";
        }
        else {
            return "";
        }
    }
}