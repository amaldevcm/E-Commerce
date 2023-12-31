import { NgModule } from "@angular/core";
import { UserComponent } from "./component/user.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UserCreateComponent } from "./component/user-create.component";
import { UserRoutingModule } from "./user-routing.module";
import { AppCommonModule } from "../app-common/common.module";

@NgModule({
    declarations: [
        UserComponent,
        UserCreateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        UserRoutingModule,
        ReactiveFormsModule,
        AppCommonModule
    ]
})

export class UserModule { }