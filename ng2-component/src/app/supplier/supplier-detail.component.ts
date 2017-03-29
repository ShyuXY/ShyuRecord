import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AppComponent } from '../app.component';
import { SupplierDetail } from './Supplier-detail';

import { AppConfig } from '../config/config';
import { SupplierService } from './supplier.service';

@Component({
  selector: 'supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css'],
  providers: [Title, SupplierService]
})
export class SupplierDetailComponent implements OnInit {
  private urlPath: string = "";
  model: SupplierDetail;
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

  constructor(private appComponent: AppComponent, private supplierService: SupplierService, private route: ActivatedRoute, private router: Router) {
    let config: AppConfig = new AppConfig();
    this.urlPath = config.urlPath;
  }
  changeObj() {
    if (this.file_srcs.length == 0) {
      this.model.businessLicenseRegnoFile = {
        file1Content: "",
        file1Type: "",
        guid: "",
        fileid: ""
      };
    }
    if (this.file_srcs1.length == 0) {
      this.model.orgNoCardFile = {
        file1Content: "",
        file1Type: "",
        guid: "",
        fileid: ""
      };
    }
    if (this.file_srcs2.length == 0) {
      this.model.taxRegCardFile = {
        file1Content: "",
        file1Type: "",
        guid: "",
        fileid: ""
      };
    }
    if (this.file_srcs3.length == 0) {
      this.model.uniteSocietyCreditFile = {
        file1Content: "",
        file1Type: "",
        guid: "",
        fileid: ""
      };
    }
  }
  onSubmit() {
    if (this.clickd) {
      if (this.model.companyName != this.theCompanyName && this.model.shortName != this.theCompanyEasy) {
        this.clickd = false;
      }
      if (this.model.ngbcIsBuyStoreage == true) {
        this.model.bcIsBuyStoreage = '0';
      } else {
        this.model.bcIsBuyStoreage = '1';
      }
      if (this.model.ngbcIsSellTransport == true) {
        this.model.bcIsSellTransport = '0';
      } else {
        this.model.bcIsSellTransport = '1';
      }
      if (this.model.ngbcIsOperatorMachining == true) {
        this.model.bcIsOperatorMachining = '0';
      } else {
        this.model.bcIsOperatorMachining = '1';
      }
      //console.log(this.file_srcs.length);
      // console.log(this.file_srcs1.length);
      // console.log(this.file_srcs2.length);
      //console.log(this.file_srcs3.length);
      if (this.file_srcs.length == 0) {
        this.model.businessLicenseRegnoFile = null
      }
      if (this.file_srcs1.length == 0) {
        this.model.orgNoCardFile = null
      }
      if (this.file_srcs2.length == 0) {
        this.model.taxRegCardFile = null
      }
      if (this.file_srcs3.length == 0) {
        this.model.uniteSocietyCreditFile = null
      }
      // console.log(this.model);
      if (this.model.companyName != this.theCompanyName) {
        //公司名称
        this.supplierService.saveOnly({ companyName: this.model.companyName, companyType: this.model.companyType })
          .subscribe(
          data => {
            if (data) {
              if (data.respCode === "00000") {
                if (this.model.shortName != this.theCompanyEasy) {
                  //公司简称
                  this.supplierService.saveOnlyEasy({ shortName: this.model.shortName, companyType: this.model.companyType })
                    .subscribe(
                    data => {
                      if (data) {
                        if (data.respCode === "00000") {
                          if (this.model.mobile != this.thePhone) {
                            //手机                  
                            this.supplierService.savePhone({ mobile: this.model.mobile, companyType: this.model.companyType })
                              .subscribe(
                              data => {
                                if (data) {
                                  if (data.respCode === "00000") {
                                    if (this.model.email != this.theEmail) {
                                      //邮箱
                                      this.supplierService.saveEmail({ email: this.model.email, companyType: this.model.companyType })
                                        .subscribe(
                                        data => {
                                          if (data) {
                                            if (data.respCode === "00000") {
                                              this.supplierService.submitSupplierDetail(this.model)
                                                .subscribe(
                                                data => {
                                                  if (data) {
                                                    if (data.respCode === "00000") {
                                                      alert(data.memo);
                                                      this.router.navigate(['/supplier-list']);
                                                    } else {
                                                      alert(data.memo);
                                                    }
                                                  } else {
                                                    alert("系统错误")
                                                  }
                                                },
                                                error => {
                                                  alert("保存失败");
                                                  this.clickd = true;
                                                },
                                              )
                                            } else if (data.respCode === "10022") {
                                              alert('邮箱已经存在');
                                              this.changeObj();
                                              this.clickd = true;
                                            } else {
                                              alert('系统错误');
                                              this.changeObj();
                                              this.clickd = true;
                                            }
                                          } else {
                                            alert("系统错误")
                                          }
                                        },
                                        error => {
                                          alert("保存失败");
                                          this.clickd = true;
                                        }
                                        );
                                    } else {
                                      this.supplierService.submitSupplierDetail(this.model)
                                        .subscribe(
                                        data => {
                                          if (data) {
                                            if (data.respCode === "00000") {
                                              alert(data.memo);
                                              this.router.navigate(['/supplier-list']);
                                            } else {
                                              alert(data.memo);
                                            }
                                          } else {
                                            alert("系统错误")
                                          }
                                        },
                                        error => {
                                          alert("保存失败");
                                          this.clickd = true;
                                        },
                                      )
                                    }
                                  } else if (data.respCode === "10022") {
                                    alert('手机号码已经存在');
                                    this.changeObj();
                                    this.clickd = true;
                                  } else {
                                    alert('系统错误');
                                    this.changeObj();
                                    this.clickd = true;
                                  }
                                } else {
                                  alert("系统错误")
                                }
                              },
                              error => {
                                alert("保存失败");
                                this.clickd = true;
                              }
                              );
                          } else {
                            this.supplierService.submitSupplierDetail(this.model)
                              .subscribe(
                              data => {
                                if (data) {
                                  if (data.respCode === "00000") {
                                    alert(data.memo);
                                    this.router.navigate(['/supplier-list']);
                                  } else {
                                    alert(data.memo);
                                  }
                                } else {
                                  alert("系统错误")
                                }
                              },
                              error => {
                                alert("保存失败");
                                this.clickd = true;
                              },
                            )
                          }
                        } else if (data.respCode === "10022") {
                          alert('供应商简称已经存在');
                          this.changeObj();
                          this.clickd = true;
                        } else {
                          alert('系统错误');
                          this.changeObj();
                          this.clickd = true;
                        }
                      } else {
                        alert("系统错误")
                      }
                    },
                    error => {
                      alert("保存失败");
                      this.clickd = true;
                    }
                    );
                } else {
                  this.supplierService.submitSupplierDetail(this.model)
                    .subscribe(
                    data => {
                      if (data) {
                        if (data.respCode === "00000") {
                          alert(data.memo);
                          this.router.navigate(['/supplier-list']);
                        } else {
                          alert(data.memo);
                        }
                      } else {
                        alert("系统错误")
                      }
                    },
                    error => {
                      alert("保存失败");
                      this.clickd = true;
                    },
                  )
                }
              } else if (data.respCode === "10022") {
                //console.log(4);
                alert('供应商名称已经存在');
                this.changeObj();
                this.clickd = true;
              } else {
                alert('系统错误');
                this.changeObj();
                this.clickd = true;
              }
            } else {
              alert("系统错误");
            }
          },
          error => {
            alert("保存失败");
            this.clickd = true;
          }
          );
      } else {
        this.supplierService.submitSupplierDetail(this.model)
          .subscribe(
          data => {
            if (data) {
              if (data.respCode === "00000") {
                //console.log(7);
                alert(data.memo);
                this.router.navigate(['/supplier-list']);
              } else {
                //console.log(8);
                alert(data.memo);
              }
            } else {
              alert("系统错误")
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
    this.model = new SupplierDetail();
    this.appComponent.setTitle("供应商新增");
    let id = this.route.snapshot.params['comId'];
    if (id) {
      this.route.params
        .switchMap((params: Params) => this.supplierService.editCustomer(params['comId']))
        .subscribe(
        data => {
          if (data) {
            if (data.respCode === "00000") {
              // console.log(data.data);
              this.model = data.data;

              if (this.model.businessLicenseRegnoFile == null) {
                this.model.businessLicenseRegnoFile = {
                  file1Content: "",
                  file1Type: "",
                  guid: "",
                  fileid: ""
                }
              } else {
                this.file_srcs.push(this.pathImg + data.data.businessLicenseRegnoFile.filePath1)
              }
              if (this.model.orgNoCardFile == null) {
                this.model.orgNoCardFile = {
                  file1Content: "",
                  file1Type: "",
                  guid: "",
                  fileid: ""
                }
              } else {
                this.file_srcs1.push(this.pathImg + data.data.orgNoCardFile.filePath1)
              }
              if (this.model.taxRegCardFile == null) {
                this.model.taxRegCardFile = {
                  file1Content: "",
                  file1Type: "",
                  guid: "",
                  fileid: ""
                }
              } else {
                this.file_srcs2.push(this.pathImg + data.data.taxRegCardFile.filePath1)
              }
              if (this.model.uniteSocietyCreditFile == null) {
                this.model.uniteSocietyCreditFile = {
                  file1Content: "",
                  file1Type: "",
                  guid: "",
                  fileid: ""
                }
              } else {
                this.file_srcs3.push(this.pathImg + data.data.uniteSocietyCreditFile.filePath1)
              }
              //console.log(this.model);
              this.theCompanyName = data.data.companyName;
              this.theCompanyEasy = data.data.shortName;
              if (this.model.bcIsBuyStoreage == '0') {
                // console.log(1);
                this.model.ngbcIsBuyStoreage = true;
              } else {
                //console.log(2);
                this.model.ngbcIsBuyStoreage = false;
              }
              if (this.model.bcIsSellTransport == '0') {
                this.model.ngbcIsSellTransport = true;
              } else {
                this.model.ngbcIsSellTransport = false;
              }
              if (this.model.bcIsOperatorMachining == '0') {
                this.model.ngbcIsOperatorMachining = true;
              } else {
                this.model.ngbcIsOperatorMachining = false;
              }
            } else {
            }
          } else {
            alert("系统错误")
          }
        },
        //error  => alert("系统错误"),
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
      //console.log(img.src);

      this.resize(img, 100, 100, (resized_jpeg, before, after) => {
        var index = resized_jpeg.indexOf(",") + 1;
        var base64 = resized_jpeg.substr(index);
        // console.log(resized_jpeg.substr(index))
        if (i == 0) {
          this.file_srcs = [];
          this.file_srcs.push(resized_jpeg);
          this.model.businessLicenseRegnoFile.file1Content = base64;
          this.model.businessLicenseRegnoFile.file1Type = files[0].name.split(".")[1];
          //console.log(this.model)
        } else if (i == 1) {
          this.file_srcs1 = [];
          this.file_srcs1.push(resized_jpeg);
          this.model.orgNoCardFile.file1Content = base64;
          this.model.orgNoCardFile.file1Type = files[0].name.split(".")[1];
          //console.log(this.model)
        } else if (i == 2) {
          this.file_srcs2 = [];
          this.file_srcs2.push(resized_jpeg);
          this.model.taxRegCardFile.file1Content = base64;
          this.model.taxRegCardFile.file1Type = files[0].name.split(".")[1];
          //console.log(this.model)
        } else if (i == 3) {
          this.file_srcs3 = [];
          this.file_srcs3.push(resized_jpeg);
          this.model.uniteSocietyCreditFile.file1Content = base64;
          this.model.uniteSocietyCreditFile.file1Type = files[0].name.split(".")[1];
          //console.log(this.model)
        }

      });
    });
  }


  resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {

    return img.onload = () => {
      //console.log("img loaded");

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
