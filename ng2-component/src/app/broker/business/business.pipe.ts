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
