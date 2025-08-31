import { Component } from "@angular/core";
@Component({
  selector: "app-root",
  template: `<nav>
      <a routerLink="/products">Products</a
      ><a routerLink="/categories">Categories</a>
    </nav>
    <div
      style="max-width:900px;margin:24px auto;background:#fff;padding:24px;border-radius:8px"
    >
      <router-outlet></router-outlet>
    </div>`,
})
export class AppComponent {}
