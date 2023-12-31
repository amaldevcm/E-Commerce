import { AfterViewInit, Component, OnInit } from "@angular/core";
import { CommonService } from "../../common.service";
import { HttpClient } from "@angular/common/http";
import * as feather from 'feather-icons';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit,AfterViewInit{
    isAdmin: boolean = false;
    itemList = [];
    cart = [];
    showCartItems = true;
    totalAmount = 0;

    constructor(private common: CommonService, private http: HttpClient) {
        this.isAdmin = this.common.isAdmin;
        this.cart = this.common.cart;
    }

    ngOnInit(): void {
        this.getItemList();
    }

    ngAfterViewInit(): void {
        feather.replace();         
    }

    getItemList() {
        this.http.get("http://localhost:3000/api/items").subscribe(result => {
            if(result && result !== undefined) {
                this.itemList = result['items'];
                this.itemList = this.itemList.concat(this.itemList);
                this.itemList.forEach(item => {
                    item.cartQty = 1;
                });
            }
            this.changeQty(this.itemList[0], 2);
        });
    }

    changeQty(data, opr) {
        if(opr === "subtract") {
            data.cartQty -= 1;
            this.totalAmount -= data.cartQty*data.selling;
        } else {
            data.cartQty += 1;
            this.totalAmount += data.cartQty*data.selling;
        }
        this.cart = this.itemList.filter(data => data.cartQty !== 0);
        this.common.cart = this.cart;
    }

    toggleCartItems(){
        this.showCartItems = !this.showCartItems;
    }
}

