/**
 * 描述：客户详情
 * 作者：busy
 * 时间：2017-2
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AppConfig } from '../config/config';
import { AppComponent } from '../app.component';
import { CustomerDetail } from './customer-detail';
import { CustomerService } from './customer.service';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
  providers: [Title, CustomerService],
})
export class CustomerDetailComponent implements OnInit {
  list: CustomerDetail;
  theCompanyName = '';
  theCompanyEasy = '';
  thePhone = '';
  theEmail = '';
  pathImg = "https://imagehttps.91steel.com/";
  public file_srcs: string[] = [];
  public file_srcs1: string[] = [];
  public file_srcs2: string[] = [];
  public file_srcs3: string[] = [];
  public clickd: boolean = true;

  constructor(private appComponent: AppComponent, private customerService: CustomerService, private route: ActivatedRoute, private router: Router) {

  }
  //保存
  onSubmit() {
    if (this.clickd) {
      if (this.list.companyName != this.theCompanyName && this.list.shortName != this.theCompanyEasy) {
        this.clickd = false;
      }
      if (this.file_srcs.length == 0) {
        this.list.businessLicenseRegnoFile = null
      }
      if (this.file_srcs1.length == 0) {
        this.list.orgNoCardFile = null
      }
      if (this.file_srcs2.length == 0) {
        this.list.taxRegCardFile = null
      }
      if (this.file_srcs3.length == 0) {
        this.list.uniteSocietyCreditFile = null
      }
      if (this.list.companyName != this.theCompanyName) {
        //公司名称
        this.customerService.saveOnly({ companyName: this.list.companyName, companyType: this.list.companyType })
          .subscribe(
          data => {
            if (data.respCode === "00000") {
              if (this.list.shortName != this.theCompanyEasy) {
                //公司简称
                this.customerService.saveOnlyEasy({ shortName: this.list.shortName, companyType: this.list.companyType })
                  .subscribe(
                  data => {
                    if (data.respCode === "00000") {
                      if (this.list.mobile != this.thePhone) {
                        //手机                  
                        this.customerService.savePhone({ mobile: this.list.mobile, companyType: this.list.companyType })
                          .subscribe(
                          data => {
                            if (data.respCode === "00000") {
                              if (this.list.email != this.theEmail) {
                                //邮箱
                                this.customerService.saveEmail({ email: this.list.email, companyType: this.list.companyType })
                                  .subscribe(
                                  data => {
                                    if (data.respCode === "00000") {
                                      this.customerService.submitCustomerDetail(this.list)
                                        .subscribe(
                                        data => {
                                          if (data.respCode === "00000") {
                                            alert(data.memo);

                                            this.router.navigate(['/customer-list']);
                                          } else {
                                            alert(data.memo);
                                          }
                                        },
                                        error => {
                                          alert("保存失败");
                                          this.clickd = true;
                                        },
                                      )
                                    } else {
                                      if (data.respCode === "10022") {
                                        alert('邮箱已经存在');
                                      } else {
                                        alert('系统错误')
                                      }

                                      this.clickd = true;
                                    }
                                  },
                                  error => {
                                    alert("保存失败");
                                    this.clickd = true;
                                  }
                                  );
                              } else {
                                this.customerService.submitCustomerDetail(this.list)
                                  .subscribe(
                                  data => {
                                    if (data.respCode === "00000") {
                                      alert(data.memo);
                                      //window.location.href='/trade-manager/trader/cust/index#/customer-list'
                                      this.router.navigate(['/customer-list']);
                                    } else {
                                      alert(data.memo);
                                    }
                                  },
                                  error => {
                                    alert("保存失败");
                                    this.clickd = true;
                                  },
                                )
                              }
                            } else {
                              if (data.respCode === "10022") {
                                alert('手机号码已经存在');
                              } else {
                                alert('系统错误')
                              }
                              this.clickd = true;
                            }
                          },
                          error => {
                            alert("保存失败");
                            this.clickd = true;
                          }
                          );

                      } else {
                        this.customerService.submitCustomerDetail(this.list)
                          .subscribe(
                          data => {
                            if (data.respCode === "00000") {
                              alert(data.memo);
                              //window.location.href='/trade-manager/trader/cust/index#/customer-list'
                              this.router.navigate(['/customer-list']);
                            } else {
                              alert(data.memo);
                            }
                          },
                          error => {
                            alert("保存失败");
                            this.clickd = true;
                          },
                        )
                      }
                    } else {
                      if (data.respCode === "10022") {
                        alert('客户简称已经存在');
                      } else {
                        alert('系统错误')
                      }
                      this.clickd = true;
                    }
                  },
                  error => {
                    alert("保存失败");
                    this.clickd = true;
                  }
                  );
              } else {
                this.customerService.submitCustomerDetail(this.list)
                  .subscribe(
                  data => {
                    if (data.respCode === "00000") {
                      alert(data.memo);
                      //window.location.href='/trade-manager/trader/cust/index#/customer-list'
                      this.router.navigate(['/customer-list']);
                    } else {
                      alert(data.memo);
                    }
                  },
                  error => {
                    alert("保存失败");
                    this.clickd = true;
                  },
                )
              }
            } else {
              if (data.respCode === "10022") {
                alert('客户名称已经存在');
              } else {
                alert('系统错误')
              }
              this.clickd = true;
            }
          },
          error => {
            alert("保存失败");
            this.clickd = true;
          }
          );
      } else {
        this.customerService.submitCustomerDetail(this.list)
          .subscribe(
          data => {
            if (data.respCode === "00000") {
              alert(data.memo);
              //window.location.href='/trade-manager/trader/cust/index#/customer-list'
              this.router.navigate(['/customer-list']);
            } else {
              alert(data.memo);
            }
          },
          error => {
            alert("保存失败");
            this.clickd = true;
          },
        )
      }

    }
  }


  ngOnInit() {
    this.list = new CustomerDetail();
    this.appComponent.setTitle("客户管理");
    let id = this.route.snapshot.params['comId'];
    //编辑
    if (id) {
      this.route.params
        .switchMap((params: Params) => this.customerService.editCustomer(params['comId']))
        .subscribe(
        data => {
          if (data.respCode === "00000") {
            this.list = data.data;
            this.theCompanyName = data.data.companyName;
            this.theCompanyEasy = data.data.shortName;
            this.thePhone = data.data.mobile;
            this.theEmail = data.data.email;
            this.list = data.data;
            if (this.list.businessLicenseRegnoFile == null) {
              this.list.businessLicenseRegnoFile = {
                file1Content: "",
                file1Type: "",
                guid: "",
                fileid: ""
              }
            } else {
              this.file_srcs.push(this.pathImg + this.list.businessLicenseRegnoFile.filePath1)
            }
            if (this.list.orgNoCardFile == null) {
              this.list.orgNoCardFile = {
                file1Content: "",
                file1Type: "",
                guid: "",
                fileid: ""
              }
            } else {
              this.file_srcs1.push(this.pathImg + this.list.orgNoCardFile.filePath1)
            }
            if (this.list.taxRegCardFile == null) {
              this.list.taxRegCardFile = {
                file1Content: "",
                file1Type: "",
                guid: "",
                fileid: ""
              }
            } else {
              this.file_srcs2.push(this.pathImg + this.list.taxRegCardFile.filePath1)
            }
            if (this.list.uniteSocietyCreditFile == null) {
              this.list.uniteSocietyCreditFile = {
                file1Content: "",
                file1Type: "",
                guid: "",
                fileid: ""
              }
            } else {
              this.file_srcs3.push(this.pathImg + this.list.uniteSocietyCreditFile.filePath1)
            }


            if (this.list.bcIsBuyStoreage == '0') {
              this.list.bcIsBuyStoreage1 = true;
            } else {
              this.list.bcIsBuyStoreage1 = false;
            }
            if (this.list.bcIsSellTransport == '0') {
              this.list.bcIsSellTransport1 = true;
            } else {
              this.list.bcIsSellTransport1 = false;
            }
            if (this.list.bcIsOperatorMachining == '0') {
              this.list.bcIsOperatorMachining1 = true;
            } else {
              this.list.bcIsOperatorMachining1 = false;
            }
          } else {
          }
        },
        //error  => alert("保存失败"),
      );
    }

  }

  //图片上传


  fileChange(input, i) {
    this.readFiles(input.files, i);
  }

  readFile(file, reader, callback) {

    reader.onload = () => {
      callback(reader.result);
    }

    reader.readAsDataURL(file);
  }

  readFiles(files, i) {
    let reader = new FileReader();

    this.readFile(files[0], reader, (result) => {

      var img = document.createElement("img");
      img.src = result;

      this.resize(img, 100, 100, (resized_jpeg, before, after) => {
        var index = resized_jpeg.indexOf(",") + 1;
        var base64 = resized_jpeg.substr(index);
        if (i == 0) {
          this.file_srcs = [];
          this.file_srcs.push(resized_jpeg);
          this.list.businessLicenseRegnoFile.file1Content = base64;
          this.list.businessLicenseRegnoFile.file1Type = files[0].name.split(".")[1];
        } else if (i == 1) {
          this.file_srcs1 = [];
          this.file_srcs1.push(resized_jpeg);
          this.list.orgNoCardFile.file1Content = resized_jpeg.substr(index);
          this.list.orgNoCardFile.file1Type = files[0].name.split(".")[1];
        } else if (i == 2) {
          this.file_srcs2 = [];
          this.file_srcs2.push(resized_jpeg);
          this.list.taxRegCardFile.file1Content = resized_jpeg.substr(index);
          this.list.taxRegCardFile.file1Type = files[0].name.split(".")[1];
        } else if (i == 3) {
          this.file_srcs3 = [];
          this.file_srcs3.push(resized_jpeg);
          this.list.uniteSocietyCreditFile.file1Content = resized_jpeg.substr(index);
          this.list.uniteSocietyCreditFile.file1Type = files[0].name.split(".")[1];
        }

      });
    });
  }


  resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {

    return img.onload = () => {

      var width = img.width;
      var height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      var canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0, width, height);

      var dataUrl = canvas.toDataURL('image/jpeg');

      callback(dataUrl, img.src.length, dataUrl.length);
    };
  }

}
