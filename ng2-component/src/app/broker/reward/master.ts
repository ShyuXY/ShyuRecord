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
export class ReWardSrarch {
    size: string = '10';
    ptId?: string = "G00000";
    status: string = "";
    confirmUserName: string = "";
    ruleStartTime: string = "";
    ruleEndTime: string = "";
}

export class ReWardMain {
    id: string;
    incentiveNo: string;
    ptId: string = "G00000";
    ptName: string = "刚源城";
    status: string = "10";
    ruleDesc: string;
    ruleStartTime: any;
    ruleEndTime: any;
    remark: string;
    executeFlag: boolean;
    createUser: string;
    createUserName: string;
    createTime: any;
    confirmUser: string;
    confirmUserName: string;
    confirmTime: any;
    updateUser: string;
    updateTime: any;
    details: Object;
}

export class AddRewardList {
    id: string ="";
    incentiveNo: string ="";
    brokerType: number=99;
    businessType: number=0;
    interval: number=3;
    calcUnit: number=0;
    calcValue:number;
    incentiveType: number=0;
    incentiveValue: number;
    createUser: string ="";
    createTime: string ="";
    updateUser:string = "";
    updateTime:string = "";
    ext1: string = "";
    ext1Description: string = "";
    ext2: string = "";
    ext2Description: string = "";
    ext3: string = "";
    ext3Description: string = "";
    ext4: string = "";
    ext4Description: string = "";
    ext5: string = "";
    ext5Description: string = "";
}
