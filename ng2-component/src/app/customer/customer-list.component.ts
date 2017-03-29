import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';

import { Customer, CustomerQueryParams } from './customer';
import { CustomerService } from './customer.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css',],
  providers: [ Title, CustomerService ]
})
export class CustomerListComponent implements OnInit {
  cur = 1;
  initNum = 1;
  prevShow = false;
  nextShow = false;
  tabShow = false;
  items = [];

  errorMessage: string;
  customers: Customer[];
  totalCount: number;
  pages: number;
  customerQueryParams: CustomerQueryParams;

  constructor( private appComponent: AppComponent, private customerService: CustomerService ) { }

  search(pageIndex: string) {
    this.customerService.getCustomers(pageIndex, this.customerQueryParams)
                            .subscribe(
                              customers => {
                                if (customers["respCode"] == "00000") {
                                  this.customers = customers["resultMap"];
                                  this.totalCount = customers["resultCount"]; 
                                  this.pages = Math.ceil(this.totalCount/10);
                                }          
                                else {
                                  alert(customers["memo"]);
                                }                      
                              },
                              error => this.errorMessage = <any>error
                            )
  }

  delete(comId: string) {
    //console.log(comId)
    if (window.confirm("是否确认删除?")) {
      this.customerService.deleteCustomer(comId)
                            .subscribe(
                              data => {
                                if (data["respCode"] == "00000") {
                                  alert ("删除成功!");
                                  this.search('1');
                                  this.cur = 1;
                                }
                                else {
                                  alert (data["memo"]);
                                }
                              },
                              error => alert("删除失败!")
                            );
    }
    
  }

  ngOnInit() {
    this.customerQueryParams = new CustomerQueryParams();
    this.appComponent.setTitle("客户管理");
    this.search("1");
  }
  ngDoCheck() {
    this.pageShow();
  }

  setClasses(item) {
    let classes = {
      paginate_button: true,
      current: this.current(item)
    };
    return classes;
  }

  pageShow() {
    var ar = [];
    if (this.pages > 7) {
       this.initNum = 1;
       this.tabShow = false;
       if (this.cur < this.pages - 3) {
          if (this.cur > 4) {
              ar.push(this.cur - 2);
              ar.push(this.cur - 1);
              ar.push(this.cur);
              ar.push(this.cur + 1);
              ar.push(this.cur + 2);
              this.prevShow = true;
              this.nextShow = true;
          } else {
              ar.push(1);
              ar.push(2);
              ar.push(3);
              ar.push(4);
              ar.push(5);
              this.prevShow = false;
              this.nextShow = true;
           }
        } else {
           if (this.cur > 4) {
              ar.push(this.pages - 4);
              ar.push(this.pages - 3);
              ar.push(this.pages - 2);
              ar.push(this.pages - 1);
              ar.push(this.pages);
              this.prevShow = true;
              this.nextShow = false;
           } else {
              ar.push(this.pages - 4);
              ar.push(this.pages - 3);
              ar.push(this.pages - 2);
              ar.push(this.pages - 1);
              ar.push(this.pages);
              this.prevShow = false;
              this.nextShow = false;
           }

         }

      } else if (this.pages > 0 && this.pages <= 7) {
          this.initNum = 1;
          this.tabShow = false;
          for (var i = 0; i < this.pages; i++) {
             ar.push(i + 1);
             this.prevShow = false;
             this.nextShow = false;
          }
       }
       else {
          this.initNum = 0;
          this.tabShow = true;
       }
       this.items = ar;
  }

  current(item: number) {
    if (this.cur == item) {
       return true;
    }
    return false;
  }

  btnClick(item: number) {    
    if (item < 1) {
       item = 1;
    }
    else if (item > this.pages) {
        item = this.pages;
    }
    this.cur = item;
    this.search(item.toString());
  }

  firstPage(item: number) {
    item = 1;
    this.cur = item;
  }
  lastPage(item: number) {
    item = this.pages;
    this.cur = item;
  }
}
