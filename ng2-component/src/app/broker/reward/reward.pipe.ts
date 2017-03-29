import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'status'
})
export class RewardStatusPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "00") {
            return "无效";
        }
        else if(value == "10"){
            return "待确认";
        }else if(value == "20"){
            return "已确认";
        }else if(value == "99"){
            return "归档";
        } else{
            return '';
        }
    }
}
