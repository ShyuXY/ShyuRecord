//list页面查询请求类
export class SeachParams {
  pageIndex: string;
  pageSize: string = "10";
  companyName: string = "";
  broker?: string = "";
  custName?: string = "";
  custType?: string = "";
  incentiveStartDate?: string = "";
  incentiveEndDate?:string = "";
}
//list页面查询得到的数据类
export class getParams{
  brokerName:string;
  companyName:string;
  custName:string;
  incentiveType:string;
  incentiveDate:string;
  custType:string;
  brokerageCharges:string;
}

//detail页查询得到的明细数据头部
export class DetailData {
    id: string = "";
    settlementNo: string = "";
    brokerCompanyName: string = "";
    billType: string = "";
    settlementCycle: string = "";
    status: string = "";
    details: Object;
}
//detail页查到的明细列表
export class DetailList {
    id: string = "";
    brokerName: string = "";
    custName: string = "";
    incentiveType: string = "";
    incentiveTime: string = "";
    brokerageIncludeTax: string = "";
}