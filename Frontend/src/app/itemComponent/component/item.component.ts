import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})

export class ItemsComponent implements OnInit{
    itemList = [];
    isEdited = false;
    editData:any = null;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.getItemList();    
    }

    getItemList() {
        this.http.get("http://localhost:3000/api/items").subscribe(response => {
            if(response && response !== undefined) {
                this.itemList = response['items'];
                this.itemList.forEach(item => {
                    item.createdDate = item.createdDate? moment(item.createdDate).format('DD-MM-YYYY'): null;
                    item.updatedDate = item.updatedDate? moment(item.updatedDate).format('DD-MM-YYYY'): null;
                });
            }
        })
    }

    editItem(data) {
        this.isEdited = true;
        this.editData = JSON.parse(JSON.stringify(data));
    }

    cancel() {
        this.isEdited = false;
        this.getItemList();
    }
} 