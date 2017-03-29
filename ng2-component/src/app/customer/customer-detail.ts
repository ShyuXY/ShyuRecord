export class CustomerDetail {
	comId: string = "";
	companyType: string = "0";
	companyName: string = "";
	shortName: string = "";
	taxRegNo: string = "";
	legalPerson: string = "";
	linkman: string = "";
	mobile: string = "";
	email: string = "";
	address: string = "";
	phoneNumber: string = "";
	faxNumber: string = "";
	isValid: string = "0";
	bcIsBuyStoreage: any;
	bcIsSellTransport: any;
	bcIsOperatorMachining: any;
	bcIsBuyStoreage1: any;
	bcIsSellTransport1: any;
	bcIsOperatorMachining1: any;
	bankName: string = "";
	bankNo: string = "";
	bankNoCreatedate: string = "";
	invoicePhone: string = "";
	invoiceAddress: string = "";
	guid: string = "";
	memo: string = "";
	businessLicenseRegnoFile:any={
		file1Content:"",
		file1Type:"",
		guid:"",
		fileid:""
	};
	orgNoCardFile:any={
		file1Content:"",
		file1Type:"",
		guid:"",
		fileid:""
	};
	taxRegCardFile:any={
		file1Content:"",
		file1Type:"",
		guid:"",
		fileid:""
	};
	uniteSocietyCreditFile:any={
		file1Content:"",
		file1Type:"",
		guid:"",
		fileid:""
	}
}