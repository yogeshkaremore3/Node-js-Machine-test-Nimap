import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  template: `<div
      style="display:flex;justify-content:space-between;align-items:center"
    >
      <h2>Categories</h2>
      <a routerLink="/categories/new" class="button">Add a New Category</a>
    </div>
    <table style="margin-top:12px">
      <thead>
        <tr>
          <th>CategoryId</th>
          <th>CategoryName</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of categories">
          <td>{{ c.CategoryId }}</td>
          <td>{{ c.CategoryName }}</td>
          <td>
            <a class="Edit_Act_btn" [routerLink]="['/categories/edit', c.CategoryId]">Edit</a
            ><a
            class="Delete_Act_btn"
              href="#"
              (click)="del(c.CategoryId); $event.preventDefault()"
              
              >Delete</a
            >
          </td>
        </tr>
      </tbody>
    </table>`,
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.http
      .get<any[]>("/api/categories")
      .subscribe((r) => (this.categories = r));
  }
  del(id: number) {
    if (confirm("Delete?"))
      this.http.delete(`/api/categories/${id}`).subscribe(() => this.load());
  }
}
