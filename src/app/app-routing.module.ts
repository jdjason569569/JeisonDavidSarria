import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-products', pathMatch: 'full' },
  { path: 'list-products', component: ListProductsComponent },
  { path: 'add-product', component: ManageProductComponent },
  { path: 'edit-product/:id', component: ManageProductComponent },
  { path: '**', redirectTo: 'list-products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
