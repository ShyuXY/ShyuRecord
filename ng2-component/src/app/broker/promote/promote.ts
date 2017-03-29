//rule页面查询请求的数据类
export class PromoteQueryParams {
  pageIndex: string;
  pageSize: string = "10";
  startDate?: string;
  endDate?: string = "";
  ptId?: string = "";
  status?: string = "";
}
//rule页面查询得到的数据类
export class Promote {
  extensionNo: string;
  status: string;
  ptId: string;
  description: string;
  startDate: string;
  endDate: string;
  creator: string;
  confirmUser: number;
  remarks: string;
}

//information页面保存时的数据类
export class AddPromote {
  ptId: string = "G00000";
  ptName: string = "钢源城";
  executeFlag: string;
  description: string = "";
  remarks: string = "";
  status: string = "10";
  startDate: string = "";
  endDate: string = "";
  list: AddPromoteList[] =[];
  confirmUser: number;
}
//多余的类忘记删除了
export class PromoteDetail {
  id: string = "";
  extensionNo: string = "";
  ptId: string = "";
  ptName: string = "";
  description: string = "";
  status: string = "";
  executeFlag: string = "";
  endDate: string = "";
  creator: string = "";
  createDate: string = "";
  updatePeople: string = "";
  updateDate: string = "";
  confirmUser: string = "";
  list: AddPromoteList[];
}
//information页面保存时列表中的类
export class AddPromoteList {
  userType: string;
  extensionType: string;
  settlementCycle: string;
  valueType: string;
  valueData: string;
  terminalType: string;
  remark: string;
  ext1: string;
  ext1Description: string;
  ext2: string;
  ext2Description: string;
  ext3: string;
  ext3Description: string;
  ext4: string;
  ext4Description: string;
  ext5: string;
  ext5Description: string;
}



