"use strict";
(self["webpackChunkblogWeb"] = self["webpackChunkblogWeb"] || []).push([["src_app_pages_courses_topic-detail_topic-detail_component_ts"],{

/***/ 7414:
/*!**********************************************************************!*\
  !*** ./src/app/pages/courses/topic-detail/topic-detail.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TopicDetailComponent: () => (/* binding */ TopicDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/chips */ 2772);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/divider */ 4102);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _service_topic_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/topic.service */ 3296);















function TopicDetailComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-progress-spinner", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Loading topic details...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function TopicDetailComponent_div_2_div_32_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 31)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "schedule");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const lesson_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", lesson_r4.durationMinutes, " min ");
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 39);
  }
  if (rf & 2) {
    const lesson_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", lesson_r4.description, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 40)(1, "p")(2, "em");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Lesson description not available in summary view. Open full lesson details for complete content.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 41)(1, "h4", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Lesson Content");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const lesson_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", lesson_r4.content, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_4_a_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 49)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "play_circle_filled");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Watch Video");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const lesson_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", lesson_r4.videoUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_4_a_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 50)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "headphones");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Listen Audio");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const lesson_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", lesson_r4.audioUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_4_a_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 51)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "description");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "View Document");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const lesson_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", lesson_r4.documentUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 44)(1, "h4", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Resources");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, TopicDetailComponent_div_2_div_32_div_19_div_4_a_4_Template, 5, 1, "a", 46)(5, TopicDetailComponent_div_2_div_32_div_19_div_4_a_5_Template, 5, 1, "a", 47)(6, TopicDetailComponent_div_2_div_32_div_19_div_4_a_6_Template, 5, 1, "a", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const lesson_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", lesson_r4.videoUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", lesson_r4.audioUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", lesson_r4.documentUrl);
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_5_div_4_div_4_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const keynote_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](keynote_r6.relatedPlanet);
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_5_div_4_div_4_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const keynote_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](keynote_r6.relatedZodiac);
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_5_div_4_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, TopicDetailComponent_div_2_div_32_div_19_div_5_div_4_div_4_span_1_Template, 2, 1, "span", 61)(2, TopicDetailComponent_div_2_div_32_div_19_div_5_div_4_div_4_span_2_Template, 2, 1, "span", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const keynote_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", keynote_r6.relatedPlanet);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", keynote_r6.relatedZodiac);
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_5_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 55)(1, "div", 56)(2, "h5", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, TopicDetailComponent_div_2_div_32_div_19_div_5_div_4_div_4_Template, 3, 2, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const keynote_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("important", keynote_r6.isImportant);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](keynote_r6.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", keynote_r6.relatedPlanet || keynote_r6.relatedZodiac);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", keynote_r6.content, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 52)(1, "h4", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Key Insights");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, TopicDetailComponent_div_2_div_32_div_19_div_5_div_4_Template, 6, 5, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const lesson_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", lesson_r4.keynotes);
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_6_mat_chip_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-chip", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tag_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", tag_r7.tagName, " ");
  }
}
function TopicDetailComponent_div_2_div_32_div_19_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 65)(1, "h4", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Tags");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 66)(4, "mat-chip-set");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, TopicDetailComponent_div_2_div_32_div_19_div_6_mat_chip_5_Template, 2, 1, "mat-chip", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const lesson_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", lesson_r4.tags);
  }
}
function TopicDetailComponent_div_2_div_32_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, TopicDetailComponent_div_2_div_32_div_19_div_1_Template, 1, 1, "div", 33)(2, TopicDetailComponent_div_2_div_32_div_19_div_2_Template, 4, 0, "div", 34)(3, TopicDetailComponent_div_2_div_32_div_19_div_3_Template, 4, 1, "div", 35)(4, TopicDetailComponent_div_2_div_32_div_19_div_4_Template, 7, 3, "div", 36)(5, TopicDetailComponent_div_2_div_32_div_19_div_5_Template, 5, 1, "div", 37)(6, TopicDetailComponent_div_2_div_32_div_19_div_6_Template, 6, 1, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const lesson_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", lesson_r4.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !lesson_r4.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", lesson_r4.content);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", lesson_r4.videoUrl || lesson_r4.audioUrl || lesson_r4.documentUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", lesson_r4.keynotes && lesson_r4.keynotes.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", lesson_r4.tags && lesson_r4.tags.length > 0);
  }
}
function TopicDetailComponent_div_2_div_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 19)(1, "div", 20)(2, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 22)(5, "h3", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, TopicDetailComponent_div_2_div_32_span_8_Template, 4, 1, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 27)(12, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TopicDetailComponent_div_2_div_32_Template_button_click_12_listener($event) {
      const lesson_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.navigateToLesson(lesson_r4.lessonId, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "visibility");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, " View ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TopicDetailComponent_div_2_div_32_Template_button_click_16_listener($event) {
      const i_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3).index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.toggleLesson(i_r5, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, TopicDetailComponent_div_2_div_32_div_19_Template, 7, 6, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const lesson_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](lesson_r4.orderNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](lesson_r4.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", lesson_r4.durationMinutes);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](lesson_r4.isFree ? "free" : "premium");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", lesson_r4.isFree ? "Free" : "Premium", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("expanded", ctx_r1.expandedLessons.has(i_r5));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.expandedLessons.has(i_r5) ? "expand_less" : "expand_more");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.expandedLessons.has(i_r5));
  }
}
function TopicDetailComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6)(1, "div", 7)(2, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TopicDetailComponent_div_2_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.goBack());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "arrow_back");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 9)(6, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 11)(9, "h1", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "p", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 14)(14, "div", 15)(15, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "menu_book");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 15)(20, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "schedule");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 15)(25, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "star");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 16)(30, "h2", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Lessons");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](32, TopicDetailComponent_div_2_div_32_Template, 20, 10, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.topicDetail.orderNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.topicDetail.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.topicDetail.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r1.topicDetail.lessons.length, " Lessons");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r1.getTotalDuration(), " min");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r1.getFreeCount(), " Free");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.topicDetail.lessons);
  }
}
function TopicDetailComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 69)(1, "mat-icon", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "error_outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Topic not found");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "The requested topic could not be loaded.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TopicDetailComponent_div_3_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.goBack());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " Go Back ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
let TopicDetailComponent = /*#__PURE__*/(() => {
  class TopicDetailComponent {
    constructor(route, router, topicService) {
      this.route = route;
      this.router = router;
      this.topicService = topicService;
      this.topicDetail = null;
      this.loading = true;
      this.expandedLessons = new Set();
    }
    ngOnInit() {
      const topicId = this.route.snapshot.paramMap.get('id');
      if (topicId) {
        this.loadTopicDetails(parseInt(topicId, 10));
      } else {
        this.loading = false;
      }
    }
    loadTopicDetails(topicId) {
      this.topicService.getTopicDetails(topicId).subscribe({
        next: topicDetail => {
          this.topicDetail = topicDetail;
          this.loading = false;
        },
        error: error => {
          console.error('Error loading topic details:', error);
          this.loading = false;
        }
      });
    }
    toggleLesson(lessonIndex, event) {
      if (event) {
        event.stopPropagation(); // Prevent triggering navigateToLesson
      }
      if (this.expandedLessons.has(lessonIndex)) {
        this.expandedLessons.delete(lessonIndex);
      } else {
        this.expandedLessons.add(lessonIndex);
      }
    }
    navigateToLesson(lessonId, event) {
      console.log('Navigating to lesson with ID:', lessonId);
      event.stopPropagation(); // Prevent triggering toggleLesson
      this.router.navigate(['/lesson', lessonId], {
        queryParams: {
          topicId: this.topicDetail?.topicId,
          source: 'topic-detail'
        }
      }).then(success => {
        console.log('Navigation success:', success);
      }).catch(error => {
        console.error('Navigation error:', error);
      });
    }
    getTotalDuration() {
      if (!this.topicDetail) return 0;
      return this.topicDetail.lessons.reduce((total, lesson) => total + (lesson.durationMinutes || 0), 0);
    }
    getFreeCount() {
      if (!this.topicDetail) return 0;
      return this.topicDetail.lessons.filter(lesson => lesson.isFree).length;
    }
    goBack() {
      this.router.navigate(['/course', this.topicDetail?.courseId || '']);
    }
    static {
      this.ɵfac = function TopicDetailComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || TopicDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_service_topic_service__WEBPACK_IMPORTED_MODULE_0__.TopicService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: TopicDetailComponent,
        selectors: [["app-topic-detail"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
        decls: 4,
        vars: 3,
        consts: [[1, "topic-detail-container"], ["class", "loading-container", 4, "ngIf"], ["class", "topic-content", 4, "ngIf"], ["class", "error-container", 4, "ngIf"], [1, "loading-container"], ["mode", "indeterminate", "diameter", "60"], [1, "topic-content"], [1, "topic-header"], ["mat-icon-button", "", 1, "back-button", 3, "click"], [1, "topic-info"], [1, "topic-number"], [1, "topic-text"], [1, "topic-title"], [1, "topic-description"], [1, "topic-stats"], [1, "stat-item"], [1, "lessons-container"], [1, "lessons-title"], ["class", "lesson-card", 4, "ngFor", "ngForOf"], [1, "lesson-card"], [1, "lesson-header"], [1, "lesson-number"], [1, "lesson-info"], [1, "lesson-title"], [1, "lesson-meta"], ["class", "lesson-duration", 4, "ngIf"], [1, "lesson-status"], [1, "lesson-actions"], ["mat-raised-button", "", "color", "primary", 1, "view-lesson-btn", 3, "click"], ["mat-icon-button", "", "title", "Toggle lesson preview", 1, "expand-button", 3, "click"], ["class", "lesson-content", 4, "ngIf"], [1, "lesson-duration"], [1, "lesson-content"], ["class", "lesson-description", 3, "innerHTML", 4, "ngIf"], ["class", "lesson-description-placeholder", 4, "ngIf"], ["class", "lesson-main-content", 4, "ngIf"], ["class", "lesson-media", 4, "ngIf"], ["class", "keynotes-section", 4, "ngIf"], ["class", "tags-section", 4, "ngIf"], [1, "lesson-description", 3, "innerHTML"], [1, "lesson-description-placeholder"], [1, "lesson-main-content"], [1, "content-section-title"], [1, "content-body", 3, "innerHTML"], [1, "lesson-media"], [1, "media-links"], ["target", "_blank", "class", "media-link video", 3, "href", 4, "ngIf"], ["target", "_blank", "class", "media-link audio", 3, "href", 4, "ngIf"], ["target", "_blank", "class", "media-link document", 3, "href", 4, "ngIf"], ["target", "_blank", 1, "media-link", "video", 3, "href"], ["target", "_blank", 1, "media-link", "audio", 3, "href"], ["target", "_blank", 1, "media-link", "document", 3, "href"], [1, "keynotes-section"], [1, "keynotes-list"], ["class", "keynote-item", 3, "important", 4, "ngFor", "ngForOf"], [1, "keynote-item"], [1, "keynote-header"], [1, "keynote-title"], ["class", "keynote-meta", 4, "ngIf"], [1, "keynote-content", 3, "innerHTML"], [1, "keynote-meta"], ["class", "meta-tag planet", 4, "ngIf"], ["class", "meta-tag zodiac", 4, "ngIf"], [1, "meta-tag", "planet"], [1, "meta-tag", "zodiac"], [1, "tags-section"], [1, "tags-list"], ["class", "lesson-tag", 4, "ngFor", "ngForOf"], [1, "lesson-tag"], [1, "error-container"], [1, "error-icon"], ["mat-raised-button", "", "color", "primary", 3, "click"]],
        template: function TopicDetailComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, TopicDetailComponent_div_1_Template, 4, 0, "div", 1)(2, TopicDetailComponent_div_2_Template, 33, 7, "div", 2)(3, TopicDetailComponent_div_3_Template, 9, 0, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.topicDetail);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.loading && !ctx.topicDetail);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatIconButton, _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__.MatChipsModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__.MatChip, _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__.MatChipSet, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__.MatProgressSpinner, _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__.MatDividerModule],
        styles: [".topic-detail-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\n  padding: 20px;\n}\n\n.loading-container[_ngcontent-%COMP%], .error-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 50vh;\n  text-align: center;\n}\n\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  font-size: 1.1rem;\n  color: #666;\n}\n\n.error-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  width: 4rem;\n  height: 4rem;\n  color: #ff5722;\n  margin-bottom: 20px;\n}\n\n.topic-content[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n\n\n.topic-header[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 30px;\n  border-radius: 16px;\n  margin-bottom: 30px;\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  position: relative;\n  overflow: hidden;\n}\n\n.topic-header[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);\n  pointer-events: none;\n}\n\n.back-button[_ngcontent-%COMP%] {\n  color: white !important;\n  background: rgba(255, 255, 255, 0.2);\n  z-index: 2;\n}\n\n.back-button[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.3);\n}\n\n.topic-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  flex: 1;\n  z-index: 2;\n}\n\n.topic-number[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n\n.topic-title[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin: 0 0 8px 0;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n}\n\n.topic-description[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin: 0;\n  opacity: 0.9;\n  line-height: 1.5;\n}\n\n\n\n.topic-stats[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 12px;\n  margin-bottom: 30px;\n  display: flex;\n  gap: 30px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n}\n\n.stat-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #666;\n  font-weight: 500;\n}\n\n.stat-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n\n\n\n.lessons-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n}\n\n.lessons-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n  padding: 30px 30px 20px 30px;\n  color: #333;\n  border-bottom: 2px solid #f0f4ff;\n}\n\n\n\n.lesson-card[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f0f4ff;\n}\n\n.lesson-card[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.lesson-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 20px 30px;\n  transition: all 0.3s ease;\n  gap: 20px;\n  border-radius: 8px;\n  margin: 4px;\n  position: relative;\n  background: white;\n  border: 1px solid #e0e0e0;\n}\n\n.lesson-header[_ngcontent-%COMP%]:hover {\n  background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);\n}\n\n.lesson-number[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  background: linear-gradient(135deg, #ff6b6b, #ee5a52);\n  color: white;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  flex-shrink: 0;\n}\n\n.lesson-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.lesson-title[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  margin: 0 0 8px 0;\n  color: #333;\n  transition: color 0.2s ease;\n}\n\n.lesson-header[_ngcontent-%COMP%]:hover   .lesson-title[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n\n.lesson-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.view-lesson-btn[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;\n  color: white !important;\n  font-weight: 600 !important;\n  padding: 8px 16px !important;\n  border-radius: 20px !important;\n  font-size: 0.9rem !important;\n  transition: all 0.3s ease !important;\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3) !important;\n}\n\n.view-lesson-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px) !important;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4) !important;\n}\n\n.view-lesson-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 4px !important;\n  font-size: 1.1rem !important;\n}\n\n.expand-button[_ngcontent-%COMP%] {\n  color: #666 !important;\n  opacity: 0.7;\n  transition: all 0.2s ease;\n  background: rgba(102, 126, 234, 0.1) !important;\n  border-radius: 50% !important;\n}\n\n.expand-button[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n  background: rgba(102, 126, 234, 0.2) !important;\n  color: #667eea !important;\n  transform: scale(1.1);\n}\n\n.expand-button.expanded[_ngcontent-%COMP%] {\n  background: rgba(102, 126, 234, 0.2) !important;\n  color: #667eea !important;\n}\n\n.lesson-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.lesson-duration[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  color: #666;\n  font-size: 0.9rem;\n}\n\n.lesson-duration[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  width: 1rem;\n  height: 1rem;\n}\n\n.lesson-status[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n\n.lesson-status.free[_ngcontent-%COMP%] {\n  background: #e8f5e8;\n  color: #2e7d32;\n}\n\n.lesson-status.premium[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #ef6c00;\n}\n\n.expand-button[_ngcontent-%COMP%] {\n  color: #666;\n  transition: transform 0.3s ease;\n}\n\n.expand-button.expanded[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n\n\n\n.lesson-content[_ngcontent-%COMP%] {\n  padding: 0 30px 30px 90px;\n  background: #f8f9ff;\n}\n\n.lesson-description[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  line-height: 1.6;\n  color: #666;\n}\n\n.lesson-description-placeholder[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  padding: 16px;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border-left: 4px solid #dee2e6;\n}\n\n.lesson-description-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #6c757d;\n  font-style: italic;\n  font-size: 0.9rem;\n}\n\n.content-section-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #333;\n  margin: 20px 0 12px 0;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.content-section-title[_ngcontent-%COMP%]::before {\n  content: \"\";\n  width: 4px;\n  height: 20px;\n  background: #667eea;\n  border-radius: 2px;\n}\n\n.lesson-main-content[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.content-body[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n  border-left: 4px solid #667eea;\n  line-height: 1.6;\n  color: #444;\n}\n\n\n\n.lesson-media[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.media-links[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n.media-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  background: white;\n  border-radius: 8px;\n  text-decoration: none;\n  color: #333;\n  border: 2px solid transparent;\n  transition: all 0.3s ease;\n}\n\n.media-link[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n\n.media-link.video[_ngcontent-%COMP%] {\n  border-color: #ff4444;\n}\n\n.media-link.video[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #ff4444;\n}\n\n.media-link.audio[_ngcontent-%COMP%] {\n  border-color: #9c27b0;\n}\n\n.media-link.audio[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #9c27b0;\n}\n\n.media-link.document[_ngcontent-%COMP%] {\n  border-color: #2196f3;\n}\n\n.media-link.document[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #2196f3;\n}\n\n\n\n.keynotes-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.keynotes-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.keynote-item[_ngcontent-%COMP%] {\n  background: white;\n  padding: 16px;\n  border-radius: 8px;\n  border-left: 4px solid #e0e7ff;\n  transition: border-color 0.3s ease;\n}\n\n.keynote-item.important[_ngcontent-%COMP%] {\n  border-left-color: #ff6b6b;\n  background: #fff8f8;\n}\n\n.keynote-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 8px;\n  gap: 12px;\n}\n\n.keynote-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0;\n  color: #333;\n  flex: 1;\n}\n\n.keynote-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n\n.meta-tag[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n\n.meta-tag.planet[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #ef6c00;\n}\n\n.meta-tag.zodiac[_ngcontent-%COMP%] {\n  background: #f3e5f5;\n  color: #7b1fa2;\n}\n\n.keynote-content[_ngcontent-%COMP%] {\n  line-height: 1.5;\n  color: #666;\n}\n\n\n\n.tags-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.tags-list[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n\n.lesson-tag[_ngcontent-%COMP%] {\n  background: #e3f2fd !important;\n  color: #1976d2 !important;\n}\n\n\n\n@media (max-width: 768px) {\n  .topic-detail-container[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .topic-header[_ngcontent-%COMP%] {\n    padding: 20px;\n    flex-direction: column;\n    text-align: center;\n  }\n  .topic-info[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .topic-title[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .topic-stats[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .lesson-content[_ngcontent-%COMP%] {\n    padding: 0 20px 20px 20px;\n  }\n  .media-links[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .keynote-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvcGljLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0k7RUFDRSxpQkFBQTtFQUNBLDZEQUFBO0VBQ0EsYUFBQTtBQUFOOztBQUdJO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFBTjs7QUFHSTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0FBQU47O0FBR0k7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7QUFBTjs7QUFHSTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtBQUFOOztBQUdJLGlCQUFBO0FBQ0E7RUFDRSw2REFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBQU47O0FBR0k7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsNEZBQUE7RUFDQSxvQkFBQTtBQUFOOztBQUdJO0VBQ0UsdUJBQUE7RUFDQSxvQ0FBQTtFQUNBLFVBQUE7QUFBTjs7QUFHSTtFQUNFLG9DQUFBO0FBQU47O0FBR0k7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFVBQUE7QUFBTjs7QUFHSTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFBTjs7QUFHSTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLHlDQUFBO0FBQU47O0FBR0k7RUFDRSxpQkFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7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STtFQUNFLGdCQUFBO0VBQ0EsV0FBQTtBQVdOOztBQVJJLFNBQUE7QUFDQTtFQUNFLG1CQUFBO0FBV047O0FBUkk7RUFDRSxlQUFBO0FBV047O0FBUkk7RUFDRSw4QkFBQTtFQUNBLHlCQUFBO0FBV047O0FBUkksc0JBQUE7QUFDQTtFQUNFO0lBQ0UsYUFBQTtFQVdOO0VBUkk7SUFDRSxhQUFBO0lBQ0Esc0JBQUE7SUFDQSxrQkFBQTtFQVVOO0VBUEk7SUFDRSxzQkFBQTtJQUNBLFNBQUE7RUFTTjtFQU5JO0lBQ0UsZUFBQTtFQVFOO0VBTEk7SUFDRSxzQkFBQTtJQUNBLFNBQUE7RUFPTjtFQUpJO0lBQ0UseUJBQUE7RUFNTjtFQUhJO0lBQ0Usc0JBQUE7RUFLTjtFQUZJO0lBQ0Usc0JBQUE7SUFDQSx1QkFBQTtFQUlOO0FBQ0YiLCJmaWxlIjoidG9waWMtZGV0YWlsLmNvbXBvbmVudC50cyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIC50b3BpYy1kZXRhaWwtY29udGFpbmVyIHtcbiAgICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2Y1ZjdmYSAwJSwgI2MzY2ZlMiAxMDAlKTtcbiAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgfVxuXG4gICAgLmxvYWRpbmctY29udGFpbmVyLCAuZXJyb3ItY29udGFpbmVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgbWluLWhlaWdodDogNTB2aDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG5cbiAgICAubG9hZGluZy1jb250YWluZXIgcCB7XG4gICAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICB9XG5cbiAgICAuZXJyb3ItaWNvbiB7XG4gICAgICBmb250LXNpemU6IDRyZW07XG4gICAgICB3aWR0aDogNHJlbTtcbiAgICAgIGhlaWdodDogNHJlbTtcbiAgICAgIGNvbG9yOiAjZmY1NzIyO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICB9XG5cbiAgICAudG9waWMtY29udGVudCB7XG4gICAgICBtYXgtd2lkdGg6IDEyMDBweDtcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIH1cblxuICAgIC8qIFRvcGljIEhlYWRlciAqL1xuICAgIC50b3BpYy1oZWFkZXIge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIHBhZGRpbmc6IDMwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiAyMHB4O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG5cbiAgICAudG9waWMtaGVhZGVyOjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDA7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICBib3R0b206IDA7XG4gICAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDIwJSA4MCUsIHJnYmEoMjU1LDI1NSwyNTUsMC4xKSAwJSwgdHJhbnNwYXJlbnQgNTAlKTtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIH1cblxuICAgIC5iYWNrLWJ1dHRvbiB7XG4gICAgICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgICAgIHotaW5kZXg6IDI7XG4gICAgfVxuXG4gICAgLmJhY2stYnV0dG9uOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgICB9XG5cbiAgICAudG9waWMtaW5mbyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMjBweDtcbiAgICAgIGZsZXg6IDE7XG4gICAgICB6LWluZGV4OiAyO1xuICAgIH1cblxuICAgIC50b3BpYy1udW1iZXIge1xuICAgICAgd2lkdGg6IDYwcHg7XG4gICAgICBoZWlnaHQ6IDYwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgfVxuXG4gICAgLnRvcGljLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMi41cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIG1hcmdpbjogMCAwIDhweCAwO1xuICAgICAgdGV4dC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMyk7XG4gICAgfVxuXG4gICAgLnRvcGljLWRlc2NyaXB0aW9uIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgb3BhY2l0eTogMC45O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICB9XG5cbiAgICAvKiBUb3BpYyBTdGF0cyAqL1xuICAgIC50b3BpYy1zdGF0cyB7XG4gICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDMwcHg7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAyMHB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgICB9XG5cbiAgICAuc3RhdC1pdGVtIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA4cHg7XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuXG4gICAgLnN0YXQtaXRlbSBtYXQtaWNvbiB7XG4gICAgICBjb2xvcjogIzY2N2VlYTtcbiAgICB9XG5cbiAgICAvKiBMZXNzb25zIENvbnRhaW5lciAqL1xuICAgIC5sZXNzb25zLWNvbnRhaW5lciB7XG4gICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgYm94LXNoYWRvdzogMCA4cHggMzJweCByZ2JhKDAsMCwwLDAuMSk7XG4gICAgfVxuXG4gICAgLmxlc3NvbnMtdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgcGFkZGluZzogMzBweCAzMHB4IDIwcHggMzBweDtcbiAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNmMGY0ZmY7XG4gICAgfVxuXG4gICAgLyogTGVzc29uIENhcmQgKi9cbiAgICAubGVzc29uLWNhcmQge1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGY0ZmY7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1jYXJkOmxhc3QtY2hpbGQge1xuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICB9ICAgIC5sZXNzb24taGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgcGFkZGluZzogMjBweCAzMHB4O1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgICAgIGdhcDogMjBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIG1hcmdpbjogNHB4O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xuICAgIH1cblxuICAgIC5sZXNzb24taGVhZGVyOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmOGY5ZmYgMCUsICNlM2YyZmQgMTAwJSk7XG4gICAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgxMDIsIDEyNiwgMjM0LCAwLjEpOyAgICB9XG5cbiAgICAubGVzc29uLW51bWJlciB7XG4gICAgICB3aWR0aDogNDBweDtcbiAgICAgIGhlaWdodDogNDBweDtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmZjZiNmIsICNlZTVhNTIpO1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBmbGV4LXNocmluazogMDtcbiAgICB9ICAgIC5sZXNzb24taW5mbyB7XG4gICAgICBmbGV4OiAxO1xuICAgIH0gICAgLmxlc3Nvbi10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBtYXJnaW46IDAgMCA4cHggMDtcbiAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlO1xuICAgIH1cblxuICAgIC5sZXNzb24taGVhZGVyOmhvdmVyIC5sZXNzb24tdGl0bGUge1xuICAgICAgY29sb3I6ICM2NjdlZWE7XG4gICAgfSAgICAubGVzc29uLWFjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDEycHg7XG4gICAgfVxuXG4gICAgLnZpZXctbGVzc29uLWJ0biB7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhIDAlLCAjNzY0YmEyIDEwMCUpICFpbXBvcnRhbnQ7XG4gICAgICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDAgIWltcG9ydGFudDtcbiAgICAgIHBhZGRpbmc6IDhweCAxNnB4ICFpbXBvcnRhbnQ7XG4gICAgICBib3JkZXItcmFkaXVzOiAyMHB4ICFpbXBvcnRhbnQ7XG4gICAgICBmb250LXNpemU6IDAuOXJlbSAhaW1wb3J0YW50O1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZSAhaW1wb3J0YW50O1xuICAgICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMTAyLCAxMjYsIDIzNCwgMC4zKSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC52aWV3LWxlc3Nvbi1idG46aG92ZXIge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpICFpbXBvcnRhbnQ7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMTAyLCAxMjYsIDIzNCwgMC40KSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC52aWV3LWxlc3Nvbi1idG4gbWF0LWljb24ge1xuICAgICAgbWFyZ2luLXJpZ2h0OiA0cHggIWltcG9ydGFudDtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtICFpbXBvcnRhbnQ7XG4gICAgfSAgICAuZXhwYW5kLWJ1dHRvbiB7XG4gICAgICBjb2xvcjogIzY2NiAhaW1wb3J0YW50O1xuICAgICAgb3BhY2l0eTogMC43O1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMTAyLCAxMjYsIDIzNCwgMC4xKSAhaW1wb3J0YW50O1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLmV4cGFuZC1idXR0b246aG92ZXIge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMTAyLCAxMjYsIDIzNCwgMC4yKSAhaW1wb3J0YW50O1xuICAgICAgY29sb3I6ICM2NjdlZWEgIWltcG9ydGFudDtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcbiAgICB9XG5cbiAgICAuZXhwYW5kLWJ1dHRvbi5leHBhbmRlZCB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuMikgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiAjNjY3ZWVhICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1tZXRhIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiAxNnB4O1xuICAgIH1cblxuICAgIC5sZXNzb24tZHVyYXRpb24ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDRweDtcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1kdXJhdGlvbiBtYXQtaWNvbiB7XG4gICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICB3aWR0aDogMXJlbTtcbiAgICAgIGhlaWdodDogMXJlbTtcbiAgICB9XG5cbiAgICAubGVzc29uLXN0YXR1cyB7XG4gICAgICBwYWRkaW5nOiA0cHggMTJweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIH1cblxuICAgIC5sZXNzb24tc3RhdHVzLmZyZWUge1xuICAgICAgYmFja2dyb3VuZDogI2U4ZjVlODtcbiAgICAgIGNvbG9yOiAjMmU3ZDMyO1xuICAgIH1cblxuICAgIC5sZXNzb24tc3RhdHVzLnByZW1pdW0ge1xuICAgICAgYmFja2dyb3VuZDogI2ZmZjNlMDtcbiAgICAgIGNvbG9yOiAjZWY2YzAwO1xuICAgIH1cblxuICAgIC5leHBhbmQtYnV0dG9uIHtcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcbiAgICB9XG5cbiAgICAuZXhwYW5kLWJ1dHRvbi5leHBhbmRlZCB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuICAgIH1cblxuICAgIC8qIExlc3NvbiBDb250ZW50ICovXG4gICAgLmxlc3Nvbi1jb250ZW50IHtcbiAgICAgIHBhZGRpbmc6IDAgMzBweCAzMHB4IDkwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZmO1xuICAgIH1cblxuICAgIC5sZXNzb24tZGVzY3JpcHRpb24ge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICB9XG5cbiAgICAubGVzc29uLWRlc2NyaXB0aW9uLXBsYWNlaG9sZGVyIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICBwYWRkaW5nOiAxNnB4O1xuICAgICAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgI2RlZTJlNjtcbiAgICB9XG5cbiAgICAubGVzc29uLWRlc2NyaXB0aW9uLXBsYWNlaG9sZGVyIHAge1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgY29sb3I6ICM2Yzc1N2Q7XG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICB9XG5cbiAgICAuY29udGVudC1zZWN0aW9uLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgbWFyZ2luOiAyMHB4IDAgMTJweCAwO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICB9XG5cbiAgICAuY29udGVudC1zZWN0aW9uLXRpdGxlOjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICB3aWR0aDogNHB4O1xuICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgYmFja2dyb3VuZDogIzY2N2VlYTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICB9XG5cbiAgICAubGVzc29uLW1haW4tY29udGVudCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIH1cblxuICAgIC5jb250ZW50LWJvZHkge1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjNjY3ZWVhO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgICAgIGNvbG9yOiAjNDQ0O1xuICAgIH1cblxuICAgIC8qIE1lZGlhIExpbmtzICovXG4gICAgLmxlc3Nvbi1tZWRpYSB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIH1cblxuICAgIC5tZWRpYS1saW5rcyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiAxMnB4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgIH1cblxuICAgIC5tZWRpYS1saW5rIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA4cHg7XG4gICAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgYm9yZGVyOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICAgIH1cblxuICAgIC5tZWRpYS1saW5rOmhvdmVyIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLDAsMCwwLjEpO1xuICAgIH1cblxuICAgIC5tZWRpYS1saW5rLnZpZGVvIHtcbiAgICAgIGJvcmRlci1jb2xvcjogI2ZmNDQ0NDtcbiAgICB9XG5cbiAgICAubWVkaWEtbGluay52aWRlbyBtYXQtaWNvbiB7XG4gICAgICBjb2xvcjogI2ZmNDQ0NDtcbiAgICB9XG5cbiAgICAubWVkaWEtbGluay5hdWRpbyB7XG4gICAgICBib3JkZXItY29sb3I6ICM5YzI3YjA7XG4gICAgfVxuXG4gICAgLm1lZGlhLWxpbmsuYXVkaW8gbWF0LWljb24ge1xuICAgICAgY29sb3I6ICM5YzI3YjA7XG4gICAgfVxuXG4gICAgLm1lZGlhLWxpbmsuZG9jdW1lbnQge1xuICAgICAgYm9yZGVyLWNvbG9yOiAjMjE5NmYzO1xuICAgIH1cblxuICAgIC5tZWRpYS1saW5rLmRvY3VtZW50IG1hdC1pY29uIHtcbiAgICAgIGNvbG9yOiAjMjE5NmYzO1xuICAgIH1cblxuICAgIC8qIEtleW5vdGVzICovXG4gICAgLmtleW5vdGVzLXNlY3Rpb24ge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICB9XG5cbiAgICAua2V5bm90ZXMtbGlzdCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogMTJweDtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1pdGVtIHtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgcGFkZGluZzogMTZweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgI2UwZTdmZjtcbiAgICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjNzIGVhc2U7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtaXRlbS5pbXBvcnRhbnQge1xuICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICNmZjZiNmI7XG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmOGY4O1xuICAgIH1cblxuICAgIC5rZXlub3RlLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgICBnYXA6IDEycHg7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgZmxleDogMTtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1tZXRhIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDhweDtcbiAgICB9XG5cbiAgICAubWV0YS10YWcge1xuICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBmb250LXNpemU6IDAuNzVyZW07XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cblxuICAgIC5tZXRhLXRhZy5wbGFuZXQge1xuICAgICAgYmFja2dyb3VuZDogI2ZmZjNlMDtcbiAgICAgIGNvbG9yOiAjZWY2YzAwO1xuICAgIH1cblxuICAgIC5tZXRhLXRhZy56b2RpYWMge1xuICAgICAgYmFja2dyb3VuZDogI2YzZTVmNTtcbiAgICAgIGNvbG9yOiAjN2IxZmEyO1xuICAgIH1cblxuICAgIC5rZXlub3RlLWNvbnRlbnQge1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgIH1cblxuICAgIC8qIFRhZ3MgKi9cbiAgICAudGFncy1zZWN0aW9uIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgfVxuXG4gICAgLnRhZ3MtbGlzdCB7XG4gICAgICBtYXJnaW4tdG9wOiA4cHg7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi10YWcge1xuICAgICAgYmFja2dyb3VuZDogI2UzZjJmZCAhaW1wb3J0YW50O1xuICAgICAgY29sb3I6ICMxOTc2ZDIgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAvKiBSZXNwb25zaXZlIERlc2lnbiAqL1xuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgLnRvcGljLWRldGFpbC1jb250YWluZXIge1xuICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgfVxuXG4gICAgICAudG9waWMtaGVhZGVyIHtcbiAgICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgfVxuXG4gICAgICAudG9waWMtaW5mbyB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGdhcDogMTJweDtcbiAgICAgIH1cblxuICAgICAgLnRvcGljLXRpdGxlIHtcbiAgICAgICAgZm9udC1zaXplOiAycmVtO1xuICAgICAgfVxuXG4gICAgICAudG9waWMtc3RhdHMge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBnYXA6IDE2cHg7XG4gICAgICB9XG5cbiAgICAgIC5sZXNzb24tY29udGVudCB7XG4gICAgICAgIHBhZGRpbmc6IDAgMjBweCAyMHB4IDIwcHg7XG4gICAgICB9XG5cbiAgICAgIC5tZWRpYS1saW5rcyB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICB9XG5cbiAgICAgIC5rZXlub3RlLWhlYWRlciB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgfVxuICAgIH1cbiAgIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvY291cnNlcy90b3BpYy1kZXRhaWwvdG9waWMtZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDSTtFQUNFLGlCQUFBO0VBQ0EsNkRBQUE7RUFDQSxhQUFBO0FBQU47O0FBR0k7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUFOOztBQUdJO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7QUFBTjs7QUFHSTtFQUNFLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQUFOOztBQUdJO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0FBQU47O0FBR0ksaUJBQUE7QUFDQTtFQUNFLDZEQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFBTjs7QUFHSTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSw0RkFBQTtFQUNBLG9CQUFBO0FBQU47O0FBR0k7RUFDRSx1QkFBQTtFQUNBLG9DQUFBO0VBQ0EsVUFBQTtBQUFOOztBQUdJO0VBQ0Usb0NBQUE7QUFBTjs7QUFHSTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsVUFBQTtBQUFOOztBQUdJO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxvQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUFOOztBQUdJO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EseUNBQUE7QUFBTjs7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LGNBQUE7QUFXTjs7QUFSSTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtBQVdOOztBQVJJO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0FBV047O0FBUkksU0FBQTtBQUNBO0VBQ0UsbUJBQUE7QUFXTjs7QUFSSTtFQUNFLGVBQUE7QUFXTjs7QUFSSTtFQUNFLDhCQUFBO0VBQ0EseUJBQUE7QUFXTjs7QUFSSSxzQkFBQTtBQUNBO0VBQ0U7SUFDRSxhQUFBO0VBV047RUFSSTtJQUNFLGFBQUE7SUFDQSxzQkFBQTtJQUNBLGtCQUFBO0VBVU47RUFQSTtJQUNFLHNCQUFBO0lBQ0EsU0FBQTtFQVNOO0VBTkk7SUFDRSxlQUFBO0VBUU47RUFMSTtJQUNFLHNCQUFBO0lBQ0EsU0FBQTtFQU9OO0VBSkk7SUFDRSx5QkFBQTtFQU1OO0VBSEk7SUFDRSxzQkFBQTtFQUtOO0VBRkk7SUFDRSxzQkFBQTtJQUNBLHVCQUFBO0VBSU47QUFDRjtBQUNBLDR5bUJBQTR5bUIiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAudG9waWMtZGV0YWlsLWNvbnRhaW5lciB7XG4gICAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmNWY3ZmEgMCUsICNjM2NmZTIgMTAwJSk7XG4gICAgICBwYWRkaW5nOiAyMHB4O1xuICAgIH1cblxuICAgIC5sb2FkaW5nLWNvbnRhaW5lciwgLmVycm9yLWNvbnRhaW5lciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIG1pbi1oZWlnaHQ6IDUwdmg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLmxvYWRpbmctY29udGFpbmVyIHAge1xuICAgICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgICAgY29sb3I6ICM2NjY7XG4gICAgfVxuXG4gICAgLmVycm9yLWljb24ge1xuICAgICAgZm9udC1zaXplOiA0cmVtO1xuICAgICAgd2lkdGg6IDRyZW07XG4gICAgICBoZWlnaHQ6IDRyZW07XG4gICAgICBjb2xvcjogI2ZmNTcyMjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgfVxuXG4gICAgLnRvcGljLWNvbnRlbnQge1xuICAgICAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gICAgICBtYXJnaW46IDAgYXV0bztcbiAgICB9XG5cbiAgICAvKiBUb3BpYyBIZWFkZXIgKi9cbiAgICAudG9waWMtaGVhZGVyIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2NjdlZWEgMCUsICM3NjRiYTIgMTAwJSk7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBwYWRkaW5nOiAzMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMjBweDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgfVxuXG4gICAgLnRvcGljLWhlYWRlcjo6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCAyMCUgODAlLCByZ2JhKDI1NSwyNTUsMjU1LDAuMSkgMCUsIHRyYW5zcGFyZW50IDUwJSk7XG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICB9XG5cbiAgICAuYmFjay1idXR0b24ge1xuICAgICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG4gICAgICB6LWluZGV4OiAyO1xuICAgIH1cblxuICAgIC5iYWNrLWJ1dHRvbjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyk7XG4gICAgfVxuXG4gICAgLnRvcGljLWluZm8ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDIwcHg7XG4gICAgICBmbGV4OiAxO1xuICAgICAgei1pbmRleDogMjtcbiAgICB9XG5cbiAgICAudG9waWMtbnVtYmVyIHtcbiAgICAgIHdpZHRoOiA2MHB4O1xuICAgICAgaGVpZ2h0OiA2MHB4O1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIH1cblxuICAgIC50b3BpYy10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDIuNXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBtYXJnaW46IDAgMCA4cHggMDtcbiAgICAgIHRleHQtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLDAsMCwwLjMpO1xuICAgIH1cblxuICAgIC50b3BpYy1kZXNjcmlwdGlvbiB7XG4gICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIG9wYWNpdHk6IDAuOTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgfVxuXG4gICAgLyogVG9waWMgU3RhdHMgKi9cbiAgICAudG9waWMtc3RhdHMge1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiAzMHB4O1xuICAgICAgYm94LXNoYWRvdzogMCA0cHggMjBweCByZ2JhKDAsMCwwLDAuMSk7XG4gICAgfVxuXG4gICAgLnN0YXQtaXRlbSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgY29sb3I6ICM2NjY7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cblxuICAgIC5zdGF0LWl0ZW0gbWF0LWljb24ge1xuICAgICAgY29sb3I6ICM2NjdlZWE7XG4gICAgfVxuXG4gICAgLyogTGVzc29ucyBDb250YWluZXIgKi9cbiAgICAubGVzc29ucy1jb250YWluZXIge1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIGJveC1zaGFkb3c6IDAgOHB4IDMycHggcmdiYSgwLDAsMCwwLjEpO1xuICAgIH1cblxuICAgIC5sZXNzb25zLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIHBhZGRpbmc6IDMwcHggMzBweCAyMHB4IDMwcHg7XG4gICAgICBjb2xvcjogIzMzMztcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZjBmNGZmO1xuICAgIH1cblxuICAgIC8qIExlc3NvbiBDYXJkICovXG4gICAgLmxlc3Nvbi1jYXJkIHtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjBmNGZmO1xuICAgIH1cblxuICAgIC5sZXNzb24tY2FyZDpsYXN0LWNoaWxkIHtcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gICAgfSAgICAubGVzc29uLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IDIwcHggMzBweDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgICBnYXA6IDIwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBtYXJnaW46IDRweDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2UwZTBlMDtcbiAgICB9XG5cbiAgICAubGVzc29uLWhlYWRlcjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjhmOWZmIDAlLCAjZTNmMmZkIDEwMCUpO1xuICAgICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMTAyLCAxMjYsIDIzNCwgMC4xKTsgICAgfVxuXG4gICAgLmxlc3Nvbi1udW1iZXIge1xuICAgICAgd2lkdGg6IDQwcHg7XG4gICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmY2YjZiLCAjZWU1YTUyKTtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgfSAgICAubGVzc29uLWluZm8ge1xuICAgICAgZmxleDogMTtcbiAgICB9ICAgIC5sZXNzb24tdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgbWFyZ2luOiAwIDAgOHB4IDA7XG4gICAgICBjb2xvcjogIzMzMztcbiAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZTtcbiAgICB9XG5cbiAgICAubGVzc29uLWhlYWRlcjpob3ZlciAubGVzc29uLXRpdGxlIHtcbiAgICAgIGNvbG9yOiAjNjY3ZWVhO1xuICAgIH0gICAgLmxlc3Nvbi1hY3Rpb25zIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiAxMnB4O1xuICAgIH1cblxuICAgIC52aWV3LWxlc3Nvbi1idG4ge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKSAhaW1wb3J0YW50O1xuICAgICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gICAgICBmb250LXdlaWdodDogNjAwICFpbXBvcnRhbnQ7XG4gICAgICBwYWRkaW5nOiA4cHggMTZweCAhaW1wb3J0YW50O1xuICAgICAgYm9yZGVyLXJhZGl1czogMjBweCAhaW1wb3J0YW50O1xuICAgICAgZm9udC1zaXplOiAwLjlyZW0gIWltcG9ydGFudDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UgIWltcG9ydGFudDtcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuMykgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAudmlldy1sZXNzb24tYnRuOmhvdmVyIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KSAhaW1wb3J0YW50O1xuICAgICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuNCkgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAudmlldy1sZXNzb24tYnRuIG1hdC1pY29uIHtcbiAgICAgIG1hcmdpbi1yaWdodDogNHB4ICFpbXBvcnRhbnQ7XG4gICAgICBmb250LXNpemU6IDEuMXJlbSAhaW1wb3J0YW50O1xuICAgIH0gICAgLmV4cGFuZC1idXR0b24ge1xuICAgICAgY29sb3I6ICM2NjYgIWltcG9ydGFudDtcbiAgICAgIG9wYWNpdHk6IDAuNztcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuMSkgIWltcG9ydGFudDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC5leHBhbmQtYnV0dG9uOmhvdmVyIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuMikgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiAjNjY3ZWVhICFpbXBvcnRhbnQ7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG4gICAgfVxuXG4gICAgLmV4cGFuZC1idXR0b24uZXhwYW5kZWQge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgxMDIsIDEyNiwgMjM0LCAwLjIpICFpbXBvcnRhbnQ7XG4gICAgICBjb2xvcjogIzY2N2VlYSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC5sZXNzb24tbWV0YSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMTZweDtcbiAgICB9XG5cbiAgICAubGVzc29uLWR1cmF0aW9uIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgIH1cblxuICAgIC5sZXNzb24tZHVyYXRpb24gbWF0LWljb24ge1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgd2lkdGg6IDFyZW07XG4gICAgICBoZWlnaHQ6IDFyZW07XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1zdGF0dXMge1xuICAgICAgcGFkZGluZzogNHB4IDEycHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICB9XG5cbiAgICAubGVzc29uLXN0YXR1cy5mcmVlIHtcbiAgICAgIGJhY2tncm91bmQ6ICNlOGY1ZTg7XG4gICAgICBjb2xvcjogIzJlN2QzMjtcbiAgICB9XG5cbiAgICAubGVzc29uLXN0YXR1cy5wcmVtaXVtIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmYzZTA7XG4gICAgICBjb2xvcjogI2VmNmMwMDtcbiAgICB9XG5cbiAgICAuZXhwYW5kLWJ1dHRvbiB7XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XG4gICAgfVxuXG4gICAgLmV4cGFuZC1idXR0b24uZXhwYW5kZWQge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbiAgICB9XG5cbiAgICAvKiBMZXNzb24gQ29udGVudCAqL1xuICAgIC5sZXNzb24tY29udGVudCB7XG4gICAgICBwYWRkaW5nOiAwIDMwcHggMzBweCA5MHB4O1xuICAgICAgYmFja2dyb3VuZDogI2Y4ZjlmZjtcbiAgICB9XG5cbiAgICAubGVzc29uLWRlc2NyaXB0aW9uIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICBsaW5lLWhlaWdodDogMS42O1xuICAgICAgY29sb3I6ICM2NjY7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1kZXNjcmlwdGlvbi1wbGFjZWhvbGRlciB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgcGFkZGluZzogMTZweDtcbiAgICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNkZWUyZTY7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1kZXNjcmlwdGlvbi1wbGFjZWhvbGRlciBwIHtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGNvbG9yOiAjNmM3NTdkO1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgfVxuXG4gICAgLmNvbnRlbnQtc2VjdGlvbi10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogIzMzMztcbiAgICAgIG1hcmdpbjogMjBweCAwIDEycHggMDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA4cHg7XG4gICAgfVxuXG4gICAgLmNvbnRlbnQtc2VjdGlvbi10aXRsZTo6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgd2lkdGg6IDRweDtcbiAgICAgIGhlaWdodDogMjBweDtcbiAgICAgIGJhY2tncm91bmQ6ICM2NjdlZWE7XG4gICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1tYWluLWNvbnRlbnQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICB9XG5cbiAgICAuY29udGVudC1ib2R5IHtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgIzY2N2VlYTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgICBjb2xvcjogIzQ0NDtcbiAgICB9XG5cbiAgICAvKiBNZWRpYSBMaW5rcyAqL1xuICAgIC5sZXNzb24tbWVkaWEge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICB9XG5cbiAgICAubWVkaWEtbGlua3Mge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogMTJweDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICB9XG5cbiAgICAubWVkaWEtbGluayB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgcGFkZGluZzogMTJweCAxNnB4O1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICBjb2xvcjogIzMzMztcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgICB9XG5cbiAgICAubWVkaWEtbGluazpob3ZlciB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgICB9XG5cbiAgICAubWVkaWEtbGluay52aWRlbyB7XG4gICAgICBib3JkZXItY29sb3I6ICNmZjQ0NDQ7XG4gICAgfVxuXG4gICAgLm1lZGlhLWxpbmsudmlkZW8gbWF0LWljb24ge1xuICAgICAgY29sb3I6ICNmZjQ0NDQ7XG4gICAgfVxuXG4gICAgLm1lZGlhLWxpbmsuYXVkaW8ge1xuICAgICAgYm9yZGVyLWNvbG9yOiAjOWMyN2IwO1xuICAgIH1cblxuICAgIC5tZWRpYS1saW5rLmF1ZGlvIG1hdC1pY29uIHtcbiAgICAgIGNvbG9yOiAjOWMyN2IwO1xuICAgIH1cblxuICAgIC5tZWRpYS1saW5rLmRvY3VtZW50IHtcbiAgICAgIGJvcmRlci1jb2xvcjogIzIxOTZmMztcbiAgICB9XG5cbiAgICAubWVkaWEtbGluay5kb2N1bWVudCBtYXQtaWNvbiB7XG4gICAgICBjb2xvcjogIzIxOTZmMztcbiAgICB9XG5cbiAgICAvKiBLZXlub3RlcyAqL1xuICAgIC5rZXlub3Rlcy1zZWN0aW9uIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgfVxuXG4gICAgLmtleW5vdGVzLWxpc3Qge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBnYXA6IDEycHg7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtaXRlbSB7XG4gICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNlMGU3ZmY7XG4gICAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4zcyBlYXNlO1xuICAgIH1cblxuICAgIC5rZXlub3RlLWl0ZW0uaW1wb3J0YW50IHtcbiAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAjZmY2YjZiO1xuICAgICAgYmFja2dyb3VuZDogI2ZmZjhmODtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgICAgZ2FwOiAxMnB4O1xuICAgIH1cblxuICAgIC5rZXlub3RlLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBjb2xvcjogIzMzMztcbiAgICAgIGZsZXg6IDE7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtbWV0YSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiA4cHg7XG4gICAgfVxuXG4gICAgLm1ldGEtdGFnIHtcbiAgICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG5cbiAgICAubWV0YS10YWcucGxhbmV0IHtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmYzZTA7XG4gICAgICBjb2xvcjogI2VmNmMwMDtcbiAgICB9XG5cbiAgICAubWV0YS10YWcuem9kaWFjIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmM2U1ZjU7XG4gICAgICBjb2xvcjogIzdiMWZhMjtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1jb250ZW50IHtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICB9XG5cbiAgICAvKiBUYWdzICovXG4gICAgLnRhZ3Mtc2VjdGlvbiB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIH1cblxuICAgIC50YWdzLWxpc3Qge1xuICAgICAgbWFyZ2luLXRvcDogOHB4O1xuICAgIH1cblxuICAgIC5sZXNzb24tdGFnIHtcbiAgICAgIGJhY2tncm91bmQ6ICNlM2YyZmQgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiAjMTk3NmQyICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLyogUmVzcG9uc2l2ZSBEZXNpZ24gKi9cbiAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAgIC50b3BpYy1kZXRhaWwtY29udGFpbmVyIHtcbiAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgIH1cblxuICAgICAgLnRvcGljLWhlYWRlciB7XG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLnRvcGljLWluZm8ge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBnYXA6IDEycHg7XG4gICAgICB9XG5cbiAgICAgIC50b3BpYy10aXRsZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgIH1cblxuICAgICAgLnRvcGljLXN0YXRzIHtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgZ2FwOiAxNnB4O1xuICAgICAgfVxuXG4gICAgICAubGVzc29uLWNvbnRlbnQge1xuICAgICAgICBwYWRkaW5nOiAwIDIwcHggMjBweCAyMHB4O1xuICAgICAgfVxuXG4gICAgICAubWVkaWEtbGlua3Mge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgfVxuXG4gICAgICAua2V5bm90ZS1oZWFkZXIge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIH1cbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0= */"]
      });
    }
  }
  return TopicDetailComponent;
})();

/***/ }),

/***/ 3296:
/*!******************************************!*\
  !*** ./src/app/service/topic.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TopicService: () => (/* binding */ TopicService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);



let TopicService = /*#__PURE__*/(() => {
  class TopicService {
    constructor(http) {
      this.http = http;
      this.apiUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/secure/topics`;
    }
    getAllTopics() {
      return this.http.post(`${this.apiUrl}/get-all`, {});
    }
    getTopicById(topicId) {
      return this.http.post(`${this.apiUrl}/get-by-id`, {
        id: topicId
      });
    }
    getTopicsByCourseId(courseId) {
      return this.http.post(`${this.apiUrl}/get-by-course`, {
        courseId: courseId
      });
    }
    getTopicDetails(topicId) {
      return this.http.post(`${this.apiUrl}/get-details`, {
        id: topicId
      });
    }
    createTopic(topic) {
      return this.http.post(this.apiUrl, topic);
    }
    updateTopic(topicId, topic) {
      return this.http.put(`${this.apiUrl}/${topicId}`, topic);
    }
    deleteTopic(topicId) {
      return this.http.delete(`${this.apiUrl}/${topicId}`);
    }
    static {
      this.ɵfac = function TopicService_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || TopicService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
      };
    }
    static {
      this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: TopicService,
        factory: TopicService.ɵfac,
        providedIn: 'root'
      });
    }
  }
  return TopicService;
})();

/***/ })

}]);
//# sourceMappingURL=src_app_pages_courses_topic-detail_topic-detail_component_ts.js.map