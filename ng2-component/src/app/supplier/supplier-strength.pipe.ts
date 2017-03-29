import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'buyStrength'
})
export class SupplierBuyStrengthPipe implements PipeTransform {
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
export class SupplierSellStrengthPipe implements PipeTransform {
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
export class SupplierOperatorStrengthPipe implements PipeTransform {
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
export class SupplierStatusStrengthPipe implements PipeTransform {
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