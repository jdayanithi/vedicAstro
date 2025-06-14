import './polyfills.server.mjs';
import {
  environment
} from "./chunk-FNH7JYNE.mjs";
import {
  HttpClient,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-NFLUKIXG.mjs";

// src/app/services/topic.service.ts
var TopicService = class _TopicService {
  http;
  apiUrl = `${environment.apiUrl}/topics`;
  constructor(http) {
    this.http = http;
  }
  getAllTopics() {
    return this.http.get(this.apiUrl);
  }
  getTopicsByCourseId(courseId) {
    return this.http.get(`${this.apiUrl}/course/${courseId}`);
  }
  getTopicById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createTopic(topic) {
    return this.http.post(this.apiUrl, topic);
  }
  updateTopic(id, topic) {
    return this.http.put(`${this.apiUrl}/${id}`, topic);
  }
  deleteTopic(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  static \u0275fac = function TopicService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TopicService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TopicService, factory: _TopicService.\u0275fac, providedIn: "root" });
};

export {
  TopicService
};
//# sourceMappingURL=chunk-TVUSTIMK.mjs.map
