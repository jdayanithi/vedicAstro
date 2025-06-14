import {
  HttpClient,
  environment,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-LRGABPEH.js";

// src/app/services/course.service.ts
var CourseService = class _CourseService {
  http;
  apiUrl = `${environment.apiUrl}/courses`;
  constructor(http) {
    this.http = http;
  }
  getAllCourses() {
    return this.http.get(this.apiUrl);
  }
  getCourseById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createCourse(course) {
    return this.http.post(this.apiUrl, course);
  }
  updateCourse(id, course) {
    return this.http.put(`${this.apiUrl}/${id}`, course);
  }
  deleteCourse(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  static \u0275fac = function CourseService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CourseService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CourseService, factory: _CourseService.\u0275fac, providedIn: "root" });
};

export {
  CourseService
};
//# sourceMappingURL=chunk-UOS4JHXU.js.map
