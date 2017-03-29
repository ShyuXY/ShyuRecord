export class MasterListItem {
    pageNum: number;
    pageSize: number;
    size: number;
    startRow: number;
    endRow: number;
    total: number;
    pages: number;
    firstPage: number;
    nextPage: number;
    lastPage: number;
    prePage: number;
    list: any = {
        id: "",
        incentiveNo: "",
        ptId: "",
        ptName: "",
        status: "",
        ruleDesc: "",
        ruleStartTime: "",
        ruleEndTime: "",
        remark: "",
        executeFlag: "",
        createUser: "",
        createUserName: "",
        createTime: "",
        confirmUser: "",
        confirmUserName: "",
        confirmTime: "",
        updateUser: "",
        updateTime: ""
    }

}

export class BusiSettlSrarch {
    pageSize: string = '10';
    brokerCompanyName?: string = "";
    status: string = "";
    billType: string = "";
}

export class BusiSettlLists {
    id: string = '';
    status: string = "";
    brokerCompanyName: string = "";
    brokerageIncludeTax: string = "";
    billType: string = '10';
    settlementCycle: string = "";
    createTime: string = "";
}

export class BusiMainLists {
    id: string = "";
    settlementNo: string = "";
    brokerCompanyName: string = "";
    billType: string = "";
    settlementCycle: string = "";
    status: string = "";
    details: Object;

}
export class BusiDetailsLists {
    id: string = "";
    orderNo: string = "";
    brokerName: string = "";
    brokerCompanyName: string = "";
    custName: string = "";
    supplierName: string = "";
    orderType: string = "";
    orderCreateTime: string = "";
    tradingVolume: string = "";
    brokerageIncludeTax: string = "";
    amountIncludeTax: string = "";
    brokerComName: string = "";
    settVolume: string = "";
    totalTaxIncluded: string = "";
    settTotalTaxIncluded: string = "";
}

export class BusiSettLists {
    pageSize: string = "10";
    brokerName: string = "";
    custName: string = "";
    orderType: string = "";
    orderCreateDateStart: string = "";
    orderCreateDateEnd: string = "";
    scopeCode: string = "10";
    brokerComName: string = "";
    orderNo: string = "";
}

export class BusiSettListsDetails {
    id: string = "";
    brokerName: string = "";
    brokerComName: string = "";
    orderNo: string = "";
    custName: string = "";
    supplierName: string = "";
    orderCreateDate: string = "";
    orderType: string = "";
    volume: string = "";
    totalTaxIncluded: string = "";
    settTotalTaxIncluded: string = "";
    settVolume: string = "";
    outCommission:string = "";
}

export class AllSettLists {
    brokerName: string = "";
    custName: string = "";
    orderType: string = "";
    orderCreateDateStart: string = "";
    orderCreateDateEnd: string = "";
    scopeCode: string = "";
    brokerComName: string = "";
    orderNo: string = "";
}
//佣金记录请求参数
export class RecordSearch {
    brokerName: string = "";
    custName: string = "";
    incentiveType: string = "";
    startTime: string = "";
    endTime: string = "";
    commissionStatus: string = "";
    brokerCompanyName: string = "";
    orderNo: string = "";
    custType:string = "";
}
//佣金记录列表数据
export class RecordLists {
    brokerName: string = "";
    custName: string = "";
    incentiveType: string = "10";
    startTime: string = "";
    endTime: string = "";
    commissionStatus: string = "10";
    brokerCompanyName: string = "";
    orderNo: string = "";
    custType:string = "10";
    businessRemark:string = "";
    noOutCommission:string = "";
}