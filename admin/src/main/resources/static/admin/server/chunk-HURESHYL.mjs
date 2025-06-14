import './polyfills.server.mjs';
import {
  environment
} from "./chunk-FNH7JYNE.mjs";
import {
  HttpClient,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-NFLUKIXG.mjs";

// src/app/services/lesson.service.ts
var LessonService = class _LessonService {
  http;
  apiUrl = `${environment.apiUrl}/lessons`;
  constructor(http) {
    this.http = http;
  }
  getAllLessons() {
    return this.http.get(this.apiUrl);
  }
  getLessonsByTopicId(topicId) {
    return this.http.get(`${this.apiUrl}/topic/${topicId}`);
  }
  getLessonById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createLesson(lesson) {
    return this.http.post(this.apiUrl, lesson);
  }
  updateLesson(id, lesson) {
    return this.http.put(`${this.apiUrl}/${id}`, lesson);
  }
  deleteLesson(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  static \u0275fac = function LessonService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LessonService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LessonService, factory: _LessonService.\u0275fac, providedIn: "root" });
};

// src/app/services/lesson-keynote.service.ts
var LessonKeynoteService = class _LessonKeynoteService {
  http;
  apiUrl = `${environment.apiUrl}/lesson-keynotes`;
  constructor(http) {
    this.http = http;
  }
  // Basic CRUD operations
  getAllKeynotes() {
    return this.http.get(this.apiUrl);
  }
  getKeynoteById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createKeynote(keynote) {
    return this.http.post(this.apiUrl, keynote);
  }
  updateKeynote(id, keynote) {
    return this.http.put(`${this.apiUrl}/${id}`, keynote);
  }
  deleteKeynote(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  // Specialized operations
  getKeynotesByLessonId(lessonId) {
    return this.http.get(`${this.apiUrl}/lesson/${lessonId}`);
  }
  getImportantKeynotesByLessonId(lessonId) {
    return this.http.get(`${this.apiUrl}/lesson/${lessonId}/important`);
  }
  getKeynotesByContentType(lessonId, contentType) {
    return this.http.get(`${this.apiUrl}/lesson/${lessonId}/content-type/${contentType}`);
  }
  getKeynotesWithVisualAids(lessonId) {
    return this.http.get(`${this.apiUrl}/lesson/${lessonId}/visual-aids`);
  }
  getKeynotesByPlanet(planet) {
    return this.http.get(`${this.apiUrl}/planet/${planet}`);
  }
  getKeynotesByZodiac(zodiac) {
    return this.http.get(`${this.apiUrl}/zodiac/${zodiac}`);
  }
  searchKeynotes(query) {
    return this.http.get(`${this.apiUrl}/search?query=${encodeURIComponent(query)}`);
  }
  reorderKeynotes(lessonId, keynoteIds) {
    return this.http.put(`${this.apiUrl}/lesson/${lessonId}/reorder`, keynoteIds);
  }
  static \u0275fac = function LessonKeynoteService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LessonKeynoteService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LessonKeynoteService, factory: _LessonKeynoteService.\u0275fac, providedIn: "root" });
};

// src/app/services/keynote-tag.service.ts
var KeynoteTagService = class _KeynoteTagService {
  http;
  apiUrl = `${environment.apiUrl}/keynote-tags`;
  constructor(http) {
    this.http = http;
  }
  // Get all keynote tags
  getAllKeynoteTags() {
    return this.http.get(this.apiUrl);
  }
  // Get keynote tag by ID
  getKeynoteTagById(keynoteTagId) {
    return this.http.get(`${this.apiUrl}/${keynoteTagId}`);
  }
  // Get tags by keynote ID
  getTagsByKeynoteId(keynoteId) {
    return this.http.get(`${this.apiUrl}/keynote/${keynoteId}`);
  }
  // Get keynotes by tag ID
  getKeynotesByTagId(tagId) {
    return this.http.get(`${this.apiUrl}/tag/${tagId}`);
  }
  // Get keynote tags by lesson ID
  getKeynoteTagsByLessonId(lessonId) {
    return this.http.get(`${this.apiUrl}/lesson/${lessonId}`);
  }
  // Get tags by keynote ID with minimum relevance score
  getTagsByKeynoteIdWithMinRelevance(keynoteId, minScore) {
    return this.http.get(`${this.apiUrl}/keynote/${keynoteId}/relevance/${minScore}`);
  }
  // Get keynotes by tag ID with minimum relevance score
  getKeynotesByTagIdWithMinRelevance(tagId, minScore) {
    return this.http.get(`${this.apiUrl}/tag/${tagId}/relevance/${minScore}`);
  }
  // Get top tags by relevance for a keynote
  getTopTagsByKeynoteId(keynoteId) {
    return this.http.get(`${this.apiUrl}/keynote/${keynoteId}/top-tags`);
  }
  // Create keynote tag association
  createKeynoteTag(keynoteTag) {
    return this.http.post(this.apiUrl, keynoteTag);
  }
  // Update keynote tag
  updateKeynoteTag(keynoteTagId, keynoteTag) {
    return this.http.put(`${this.apiUrl}/${keynoteTagId}`, keynoteTag);
  }
  // Delete keynote tag by ID
  deleteKeynoteTag(keynoteTagId) {
    return this.http.delete(`${this.apiUrl}/${keynoteTagId}`);
  }
  // Delete keynote tag by keynote and tag IDs
  deleteKeynoteTagByKeynoteAndTag(keynoteId, tagId) {
    return this.http.delete(`${this.apiUrl}/keynote/${keynoteId}/tag/${tagId}`);
  }
  static \u0275fac = function KeynoteTagService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KeynoteTagService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _KeynoteTagService, factory: _KeynoteTagService.\u0275fac, providedIn: "root" });
};

export {
  LessonService,
  LessonKeynoteService,
  KeynoteTagService
};
//# sourceMappingURL=chunk-HURESHYL.mjs.map
