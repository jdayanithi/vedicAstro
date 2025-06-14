import './polyfills.server.mjs';
import {
  environment
} from "./chunk-FNH7JYNE.mjs";
import {
  HttpClient,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-NFLUKIXG.mjs";

// src/app/services/category.service.ts
var CategoryService = class _CategoryService {
  http;
  apiUrl = `${environment.apiUrl}/categories`;
  constructor(http) {
    this.http = http;
  }
  getCategories() {
    return this.http.get(this.apiUrl);
  }
  getRootCategories() {
    return this.http.get(`${this.apiUrl}/root`);
  }
  createCategory(category) {
    return this.http.post(this.apiUrl, category);
  }
  updateCategory(id, category) {
    return this.http.put(`${this.apiUrl}/${id}`, category);
  }
  deleteCategory(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  static \u0275fac = function CategoryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoryService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CategoryService, factory: _CategoryService.\u0275fac, providedIn: "root" });
};

export {
  CategoryService
};
//# sourceMappingURL=chunk-XIYEH7QB.mjs.map
