export class Supplier {
  guid: number;
  comId: string;
  companyType: string;
  companyName: string;
  shortName: string;
  taxRegNo: string;
  legalPerson: string;
  linkman: string;
  mobile: string;
  email: string;
  address: string;
  phoneNumber: string;
  faxNumber: string;
  isValid: string;
  bcIsBuyStoreage: string;
  bcIsSellTransport: string;
  bcIsOperatorMachining: string;
  bankName: string;
  bankNo: string;
  bankNoCreatedate: string;
  invoicePhone: string;
  invoiceAddress: string;
  businessLicenseRegnoFileid: string;
  orgNoCardFileid: string;
  taxRegCardFileid: string;
  uniteSocietyCreditFileid: string;
  createUserId: string;
  createTime: string;
  updateUserId: string;
  updateTime: string;
  deleteFlag: string;
  ext1: string;
  ext2: string;
  ext3: string;
  memo: string;
}

export class SupplierQueryParams {
  pageIndex: string;
  pageSize: string = "10";
  companyType:string = "1";
  comId?:string = "";
  companyName?: string = ""; 
  shortName?: string = ""; 
  mobile?:string = ""; 
  isValid?: string = "";
  deleteFlag?: string = "0";
}