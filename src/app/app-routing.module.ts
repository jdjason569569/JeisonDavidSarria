import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddProductComponent } from './components/add-product/add-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/list-products', pathMatch: 'full' },
  { path: 'list-products', component: ListProductsComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: '**', redirectTo: '/list-products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
