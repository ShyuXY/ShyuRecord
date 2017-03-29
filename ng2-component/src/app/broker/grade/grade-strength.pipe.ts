import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ptIdStrength'
})
export class GradeptIdStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "G00000") {
            return "钢源城";
        }
        else  {
            return "";
        }
    }
}
@Pipe({
    name: 'userTypeStrength'
})
export class GradeUserTypeStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "01") {
            return "经纪人";
        }
        else if (value == "02") {
            return "买方";
        }
        else if (value == "03") {
            return "卖方";
        }
        else  {
            return "";
        }
    }
}
@Pipe({
    name: 'statusStrength'
})
export class GradeStatusStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "01") {
            return "有效";
        }
        else if ( value == "02") {
            return "无效";
        }
        else {
            return "";
        }
    }
}
@Pipe({
    name: 'userGradeStrength'
})
export class GradeUserGradeStrengthPipe implements PipeTransform {
    transform(value: string) {
        if ( value == "01") {
            return "一般经纪人";
        }
        else if ( value == "02") {
            return "铜牌经纪人";
        }
        else if ( value == "03") {
            return "银牌经纪人";
        }
        else if ( value == "04") {
            return "金牌经纪人";
        }
        else {
            return "";
        }
    }
}