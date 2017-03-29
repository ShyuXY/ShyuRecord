/**
 * 描述：此文件夹管道
 * 作者：busy
 * 时间2017-3
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusStrength'//状态码
})
export class PromoteStatusStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "10") {
            return "待确认";
        }
        else if ( value == "20") {
            return "已确认";
        }
        else if ( value == "99") {
            return "归档";
        }
        else if ( value == "00") {
            return "无效";
        }
        else {
            return "";
        }
    }
}

@Pipe({
    name: 'NameStrength'//平台状态码
})
export class PromoteNameStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "G00000") {
            return "钢源城";
        }
        else {
            return "";
        }
    }
}