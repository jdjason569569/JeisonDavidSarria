import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { DeleteProductModalComponent } from './components/delete-product-modal/delete-product-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    ManageProductComponent,
    DropdownComponent,
    DeleteProductModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
