export class Grade {
  id: string;
  gradeNo: string;
  ptId: string = "G00000";
  userType: string = "";
  status: string = "01";
  userGrade: string = "";
  gradeDescribe: string;
  gradeVal: number;
  creator: string;
  createTime: string;
  revokePerson: string;
  revokeTime: string;
  remark: string;
  ext1: string;
  ext1Desc: string;
  ext2: string;
  ext2Desc: string;
  ext3: string;
  ext3Desc: string;
  ext4: string;
  ext4Desc: string;
  ext5: string;
  ext5Desc: string;
  updateUser: string;
  updateTime: string;
}

export class GradeQueryParams {
  // pageIndex: string;
  // pageSize: string = "10";
  pt_id?:string = "G00000";
  status?:string = "";
  userType?: string = ""; 
}