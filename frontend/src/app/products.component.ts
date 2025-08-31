import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  template: `
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h2>Products</h2>
      <a routerLink="/products/new" class="button">Add a New Product</a>
    </div>

  

    <table>
      <thead>
        <tr>
          <th>ProductId</th>
          <th>ProductName</th>
          <th>CategoryName</th>
          <th>CategoryId</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of products">
          <td>{{ p.ProductId }}</td>
          <td>{{ p.ProductName }}</td>
          <td>{{ p.CategoryName }}</td>
          <td>{{ p.CategoryId }}</td>
          <td>
            <a class="Edit_Act_btn" [routerLink]="['/products/edit', p.ProductId]">Edit</a>
            <a class="Delete_Act_btn"
              href="#"
              (click)="deleteProduct(p.ProductId); $event.preventDefault()"
              >Delete</a
            >
          </td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top:16px">
      <button id="first_btn" (click)="go(1)" [disabled]="page === 1">First</button>
      <button id="prev_btn" (click)="go(page - 1)" [disabled]="page === 1">Prev</button>
      <span style="margin:0 8px">{{ page }}</span>
      <button id="next_btn" (click)="go(page + 1)" [disabled]="page === totalPages">
        Next
      </button>
      <button id="last_btn" (click)="go(totalPages)" [disabled]="page === totalPages">
        Last
      </button>

      <span style="margin-left:12px">
        Size:
        <a class="size_btn" href="#" (click)="setSize(5); $event.preventDefault()">5</a> |
        <a class="size_btn" href="#" (click)="setSize(10); $event.preventDefault()">10</a> |
        <a class="size_btn" href="#" (click)="setSize(20); $event.preventDefault()">20</a>
      </span>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  page = 1;
  size = 10;
  totalPages = 1;
  count = 0;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.http
      .get<any>(`/api/products?page=${this.page}&size=${this.size}`)
      .subscribe((res) => {
        this.products = res.data;
        this.page = res.page;
        this.size = res.size;
        this.totalPages = res.totalPages;
        this.count = res.count;
      });
  }
  go(p: number) {
    if (p < 1) p = 1;
    if (p > this.totalPages) p = this.totalPages;
    this.page = p;
    this.load();
  }
  setSize(s: number) {
    this.size = s;
    this.page = 1;
    this.load();
  }
  deleteProduct(id: number) {
    if (confirm("Delete?"))
      this.http.delete(`/api/products/${id}`).subscribe(() => this.load());
  }
}
