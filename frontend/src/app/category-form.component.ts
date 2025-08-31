import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  template: `<h2 *ngIf="!id">Add Category</h2>
    <h2 *ngIf="id">Edit Category</h2>
    <form (ngSubmit)="save()">
      <div>
        <label>CategoryName</label
        ><input [(ngModel)]="name" name="CategoryName" required />
      </div>
      <div style="margin-top:12px">
        <button type="submit">Save</button
        ><button type="button" (click)="cancel()">Cancel</button>
      </div>
    </form>`,
})
export class CategoryFormComponent implements OnInit {
  id: any = null;
  name = "";
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
  }
  load() {
    this.http.get<any[]>("/api/categories").subscribe((list) => {
      const c = list.find((x) => x.CategoryId == this.id);
      if (c) this.name = c.CategoryName;
    });
  }
  save() {
    if (this.id)
      this.http
        .put(`/api/categories/${this.id}`, { CategoryName: this.name })
        .subscribe(() => this.router.navigate(["/categories"]));
    else
      this.http
        .post("/api/categories", { CategoryName: this.name })
        .subscribe(() => this.router.navigate(["/categories"]));
  }
  cancel() {
    this.router.navigate(["/categories"]);
  }
}
