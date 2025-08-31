import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  template: `<h2 *ngIf="!id">Add Product</h2>
    <h2 *ngIf="id">Edit Product</h2>
    <form (ngSubmit)="save()">
      <div>
        <label>ProductName</label
        ><input [(ngModel)]="data.ProductName" name="ProductName" required />
      </div>
      <div>
        <label>Category</label
        ><select [(ngModel)]="data.CategoryId" name="CategoryId" required>
          <option *ngFor="let c of categories" [value]="c.CategoryId">
            {{ c.CategoryName }}
          </option>
        </select>
      </div>
      <div style="margin-top:12px">
        <button type="submit">Save</button
        ><button type="button" (click)="cancel()">Cancel</button>
      </div>
    </form>`,
})
export class ProductFormComponent implements OnInit {
  id: any = null;
  data: any = { ProductName: "", CategoryId: "" };
  categories: any[] = [];
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe((p) => {
      this.id = p["id"];
      if (this.id) this.load();
    });
    this.http
      .get<any[]>("/api/categories")
      .subscribe((c) => (this.categories = c));
  }
  load() {
    this.http.get<any>(`/api/products?page=1&size=1000`).subscribe((res) => {
      const prod = res.data.find((x: any) => x.ProductId == this.id);
      if (prod)
        this.data = {
          ProductName: prod.ProductName,
          CategoryId: prod.CategoryId,
        };
    });
  }
  save() {
    if (this.id)
      this.http
        .put(`/api/products/${this.id}`, this.data)
        .subscribe(() => this.router.navigate(["/products"]));
    else
      this.http
        .post("/api/products", this.data)
        .subscribe(() => this.router.navigate(["/products"]));
  }
  cancel() {
    this.router.navigate(["/products"]);
  }
}
