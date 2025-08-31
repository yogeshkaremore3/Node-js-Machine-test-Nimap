import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ProductsComponent } from "./products.component";
import { ProductFormComponent } from "./product-form.component";
import { CategoriesComponent } from "./categories.component";
import { CategoryFormComponent } from "./category-form.component";
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductFormComponent,
    CategoriesComponent,
    CategoryFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "products", pathMatch: "full" },
      { path: "products", component: ProductsComponent },
      { path: "products/new", component: ProductFormComponent },
      { path: "products/edit/:id", component: ProductFormComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "categories/new", component: CategoryFormComponent },
      { path: "categories/edit/:id", component: CategoryFormComponent },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
