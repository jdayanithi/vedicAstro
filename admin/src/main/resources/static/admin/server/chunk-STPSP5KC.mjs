import './polyfills.server.mjs';
import {
  environment
} from "./chunk-FNH7JYNE.mjs";
import {
  HttpClient,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-NFLUKIXG.mjs";

// src/app/services/tag.service.ts
var TagService = class _TagService {
  http;
  apiUrl = `${environment.apiUrl}/tags`;
  constructor(http) {
    this.http = http;
  }
  getTags() {
    return this.http.get(this.apiUrl);
  }
  getTagById(tagId) {
    return this.http.get(`${this.apiUrl}/${tagId}`);
  }
  createTag(tag) {
    return this.http.post(this.apiUrl, tag);
  }
  updateTag(tagId, tag) {
    return this.http.put(`${this.apiUrl}/${tagId}`, tag);
  }
  deleteTag(tagId) {
    return this.http.delete(`${this.apiUrl}/${tagId}`);
  }
  static \u0275fac = function TagService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TagService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TagService, factory: _TagService.\u0275fac, providedIn: "root" });
};

export {
  TagService
};
//# sourceMappingURL=chunk-STPSP5KC.mjs.map
