"use strict";
(self["webpackChunkblogWeb"] = self["webpackChunkblogWeb"] || []).push([["src_app_pages_courses_lesson-detail_lesson-detail_component_ts"],{

/***/ 270:
/*!************************************************************************!*\
  !*** ./src/app/pages/courses/lesson-detail/lesson-detail.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LessonDetailComponent: () => (/* binding */ LessonDetailComponent)
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
/* harmony import */ var _service_lesson_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/lesson.service */ 2969);














function LessonDetailComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-progress-spinner", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Loading lesson details...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function LessonDetailComponent_div_2_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 23)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "schedule");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r1.lessonDetail.durationMinutes, " minutes ");
  }
}
function LessonDetailComponent_div_2_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 24)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Lesson Content");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", ctx_r1.lessonDetail.content, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
  }
}
function LessonDetailComponent_div_2_div_23_div_6_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 41)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "priority_high");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " Important ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function LessonDetailComponent_div_2_div_23_div_6_span_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 42)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "brightness_1");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const keynote_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", keynote_r3.relatedPlanet, " ");
  }
}
function LessonDetailComponent_div_2_div_23_div_6_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 43)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "stars");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const keynote_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", keynote_r3.relatedZodiac, " ");
  }
}
function LessonDetailComponent_div_2_div_23_div_6_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "img", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const keynote_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", keynote_r3.visualAidUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"])("alt", keynote_r3.title);
  }
}
function LessonDetailComponent_div_2_div_23_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 30)(1, "div", 31)(2, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 33)(5, "h4", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, LessonDetailComponent_div_2_div_23_div_6_span_8_Template, 4, 0, "span", 36)(9, LessonDetailComponent_div_2_div_23_div_6_span_9_Template, 4, 1, "span", 37)(10, LessonDetailComponent_div_2_div_23_div_6_span_10_Template, 4, 1, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, LessonDetailComponent_div_2_div_23_div_6_div_12_Template, 2, 2, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const keynote_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("important", keynote_r3.isImportant);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](i_r4 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](keynote_r3.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", keynote_r3.isImportant);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", keynote_r3.relatedPlanet);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", keynote_r3.relatedZodiac);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", keynote_r3.content, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", keynote_r3.hasVisualAid && keynote_r3.visualAidUrl);
  }
}
function LessonDetailComponent_div_2_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 26)(1, "h3", 27)(2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "lightbulb");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, LessonDetailComponent_div_2_div_23_div_6_Template, 13, 9, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Key Insights (", ctx_r1.lessonDetail.keynotes.length, ") ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.getSortedKeynotes());
  }
}
function LessonDetailComponent_div_2_div_24_a_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 51)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "play_circle_filled");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Watch Video");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Video content for this lesson");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", ctx_r1.lessonDetail.videoUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function LessonDetailComponent_div_2_div_24_a_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 52)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "headphones");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Listen Audio");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Audio content for this lesson");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", ctx_r1.lessonDetail.audioUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function LessonDetailComponent_div_2_div_24_a_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 53)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "description");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "View Document");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Additional reading material");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", ctx_r1.lessonDetail.documentUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function LessonDetailComponent_div_2_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 46)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Resources");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, LessonDetailComponent_div_2_div_24_a_4_Template, 7, 1, "a", 48)(5, LessonDetailComponent_div_2_div_24_a_5_Template, 7, 1, "a", 49)(6, LessonDetailComponent_div_2_div_24_a_6_Template, 7, 1, "a", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.lessonDetail.videoUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.lessonDetail.audioUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.lessonDetail.documentUrl);
  }
}
function LessonDetailComponent_div_2_div_25_div_7_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tag_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](tag_r5.description);
  }
}
function LessonDetailComponent_div_2_div_25_div_7_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tag_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Category: ", tag_r5.tagCategory, "");
  }
}
function LessonDetailComponent_div_2_div_25_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 59)(1, "div", 60)(2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, LessonDetailComponent_div_2_div_25_div_7_div_6_Template, 2, 1, "div", 62)(7, LessonDetailComponent_div_2_div_25_div_7_div_7_Template, 2, 1, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tag_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](tag_r5.tagName);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", tag_r5.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", tag_r5.tagCategory);
  }
}
function LessonDetailComponent_div_2_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 54)(1, "h3", 55)(2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "local_offer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 56)(6, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, LessonDetailComponent_div_2_div_25_div_7_Template, 8, 3, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Tags (", ctx_r1.lessonDetail.tags.length, ") ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.lessonDetail.tags);
  }
}
function LessonDetailComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6)(1, "div", 7)(2, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LessonDetailComponent_div_2_Template_button_click_2_listener() {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, LessonDetailComponent_div_2_span_12_Template, 4, 1, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "span", 15)(14, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 16)(18, "div", 17)(19, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "Lesson Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](21, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, LessonDetailComponent_div_2_div_22_Template, 4, 1, "div", 19)(23, LessonDetailComponent_div_2_div_23_Template, 7, 2, "div", 20)(24, LessonDetailComponent_div_2_div_24_Template, 7, 3, "div", 21)(25, LessonDetailComponent_div_2_div_25_Template, 8, 2, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.lessonDetail.orderNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.lessonDetail.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.lessonDetail.durationMinutes);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx_r1.lessonDetail.isFree ? "free" : "premium");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.lessonDetail.isFree ? "card_giftcard" : "star");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r1.lessonDetail.isFree ? "Free Lesson" : "Premium Lesson", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", ctx_r1.lessonDetail.description, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.lessonDetail.content);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.lessonDetail.keynotes && ctx_r1.lessonDetail.keynotes.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.lessonDetail.videoUrl || ctx_r1.lessonDetail.audioUrl || ctx_r1.lessonDetail.documentUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.lessonDetail.tags && ctx_r1.lessonDetail.tags.length > 0);
  }
}
function LessonDetailComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 66)(1, "mat-icon", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "error_outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Lesson not found");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "The requested lesson could not be loaded.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LessonDetailComponent_div_3_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.goBack());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " Go Back ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
let LessonDetailComponent = /*#__PURE__*/(() => {
  class LessonDetailComponent {
    constructor(route, router, lessonService) {
      this.route = route;
      this.router = router;
      this.lessonService = lessonService;
      this.lessonDetail = null;
      this.loading = true;
      this.topicId = null;
      this.source = null;
      this.courseId = null;
    }
    ngOnInit() {
      console.log('LessonDetailComponent ngOnInit called');
      // Scroll to top immediately when component initializes
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      const lessonId = this.route.snapshot.paramMap.get('id');
      console.log('Lesson ID from route:', lessonId);
      // Get query parameters for navigation context
      this.topicId = this.route.snapshot.queryParamMap.get('topicId') ? parseInt(this.route.snapshot.queryParamMap.get('topicId'), 10) : null;
      this.source = this.route.snapshot.queryParamMap.get('source');
      this.courseId = this.route.snapshot.queryParamMap.get('courseId') ? parseInt(this.route.snapshot.queryParamMap.get('courseId'), 10) : null;
      console.log('Topic ID from query params:', this.topicId);
      console.log('Source from query params:', this.source);
      console.log('Course ID from query params:', this.courseId);
      if (lessonId) {
        this.loadLessonDetails(parseInt(lessonId, 10));
      } else {
        console.log('No lesson ID found, setting loading to false');
        this.loading = false;
      }
    }
    loadLessonDetails(lessonId) {
      console.log('Loading lesson details for ID:', lessonId);
      this.lessonService.getLessonDetails(lessonId).subscribe({
        next: lessonDetail => {
          console.log('Lesson details loaded successfully:', lessonDetail);
          this.lessonDetail = lessonDetail;
          this.loading = false;
          // Ensure page is at top after content loads
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: 'instant'
            });
          }, 50);
        },
        error: error => {
          console.error('Error loading lesson details:', error);
          this.loading = false;
        }
      });
    }
    getSortedKeynotes() {
      if (!this.lessonDetail?.keynotes) return [];
      return this.lessonDetail.keynotes.sort((a, b) => {
        // Sort by orderSequence if available, otherwise by keynoteId
        if (a.orderSequence !== undefined && b.orderSequence !== undefined) {
          return a.orderSequence - b.orderSequence;
        }
        return a.keynoteId - b.keynoteId;
      });
    }
    goBack() {
      // Navigate back based on the source
      if (this.source === 'course' && this.courseId) {
        // Navigate back to the course view
        this.router.navigate(['/course', this.courseId]);
      } else if (this.source === 'topic-detail' && this.topicId) {
        // Navigate back to the topic detail view
        this.router.navigate(['/topic', this.topicId]);
      } else if (this.topicId) {
        // Fallback to topic detail if we have topicId
        this.router.navigate(['/topic', this.topicId]);
      } else if (this.lessonDetail?.topicId) {
        // Fallback to topic detail using lesson's topicId
        this.router.navigate(['/topic', this.lessonDetail.topicId]);
      } else {
        // Final fallback to courses
        this.router.navigate(['/courses']);
      }
    }
    static {
      this.ɵfac = function LessonDetailComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || LessonDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_service_lesson_service__WEBPACK_IMPORTED_MODULE_0__.LessonService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: LessonDetailComponent,
        selectors: [["app-lesson-detail"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
        decls: 4,
        vars: 3,
        consts: [[1, "lesson-detail-container"], ["class", "loading-container", 4, "ngIf"], ["class", "lesson-content", 4, "ngIf"], ["class", "error-container", 4, "ngIf"], [1, "loading-container"], ["mode", "indeterminate", "diameter", "60"], [1, "lesson-content"], [1, "lesson-header"], ["mat-icon-button", "", 1, "back-button", 3, "click"], [1, "lesson-info"], [1, "lesson-number"], [1, "lesson-text"], [1, "lesson-title"], [1, "lesson-meta"], ["class", "lesson-duration", 4, "ngIf"], [1, "lesson-status"], [1, "lesson-content-main"], [1, "lesson-description"], [1, "description-content", 3, "innerHTML"], ["class", "lesson-main-content", 4, "ngIf"], ["class", "key-insights-section", 4, "ngIf"], ["class", "media-section", 4, "ngIf"], ["class", "tags-section", 4, "ngIf"], [1, "lesson-duration"], [1, "lesson-main-content"], [1, "content-body", 3, "innerHTML"], [1, "key-insights-section"], [1, "insights-title"], [1, "keynotes-container"], ["class", "keynote-card", 3, "important", 4, "ngFor", "ngForOf"], [1, "keynote-card"], [1, "keynote-header"], [1, "keynote-number"], [1, "keynote-info"], [1, "keynote-title"], [1, "keynote-badges"], ["class", "important-badge", 4, "ngIf"], ["class", "meta-badge planet", 4, "ngIf"], ["class", "meta-badge zodiac", 4, "ngIf"], [1, "keynote-content", 3, "innerHTML"], ["class", "keynote-visual", 4, "ngIf"], [1, "important-badge"], [1, "meta-badge", "planet"], [1, "meta-badge", "zodiac"], [1, "keynote-visual"], [1, "visual-aid", 3, "src", "alt"], [1, "media-section"], [1, "media-grid"], ["target", "_blank", "class", "media-card video", 3, "href", 4, "ngIf"], ["target", "_blank", "class", "media-card audio", 3, "href", 4, "ngIf"], ["target", "_blank", "class", "media-card document", 3, "href", 4, "ngIf"], ["target", "_blank", 1, "media-card", "video", 3, "href"], ["target", "_blank", 1, "media-card", "audio", 3, "href"], ["target", "_blank", 1, "media-card", "document", 3, "href"], [1, "tags-section"], [1, "tags-title"], [1, "tags-container"], [1, "tags-grid"], ["class", "tag-card", 4, "ngFor", "ngForOf"], [1, "tag-card"], [1, "tag-header"], [1, "tag-name"], ["class", "tag-description", 4, "ngIf"], ["class", "tag-category", 4, "ngIf"], [1, "tag-description"], [1, "tag-category"], [1, "error-container"], [1, "error-icon"], ["mat-raised-button", "", "color", "primary", 3, "click"]],
        template: function LessonDetailComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, LessonDetailComponent_div_1_Template, 4, 0, "div", 1)(2, LessonDetailComponent_div_2_Template, 26, 12, "div", 2)(3, LessonDetailComponent_div_3_Template, 9, 0, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.lessonDetail);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.loading && !ctx.lessonDetail);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatIconButton, _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__.MatChipsModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__.MatProgressSpinner, _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__.MatDividerModule],
        styles: [".lesson-detail-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\n  padding: 20px;\n}\n\n.loading-container[_ngcontent-%COMP%], .error-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 50vh;\n  text-align: center;\n}\n\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  font-size: 1.1rem;\n  color: #666;\n}\n\n.error-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  width: 4rem;\n  height: 4rem;\n  color: #ff5722;\n  margin-bottom: 20px;\n}\n\n.lesson-content[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n} \n\n.lesson-header[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);\n  color: white;\n  padding: 30px;\n  border-radius: 16px;\n  margin-bottom: 30px;\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  position: relative;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_slideInFromTop 0.6s ease-out, _ngcontent-%COMP%_headerPulse 2s ease-in-out 0.8s;\n}\n\n@keyframes _ngcontent-%COMP%_slideInFromTop {\n  from {\n    opacity: 0;\n    transform: translateY(-30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_headerPulse {\n  0%, 100% {\n    box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);\n  }\n  50% {\n    box-shadow: 0 12px 40px rgba(255, 107, 107, 0.5);\n  }\n}\n.lesson-header[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);\n  pointer-events: none;\n}\n\n.lesson-header[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  top: -2px;\n  left: -2px;\n  right: -2px;\n  bottom: -2px;\n  background: linear-gradient(45deg, rgba(255, 255, 255, 0.3), transparent);\n  border-radius: 18px;\n  pointer-events: none;\n  opacity: 0;\n  animation: _ngcontent-%COMP%_highlight 2s ease-in-out 0.5s;\n}\n\n@keyframes _ngcontent-%COMP%_highlight {\n  0%, 100% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n.back-button[_ngcontent-%COMP%] {\n  color: white !important;\n  background: rgba(255, 255, 255, 0.2);\n  z-index: 2;\n}\n\n.back-button[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.3);\n}\n\n.lesson-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  flex: 1;\n  z-index: 2;\n}\n\n.lesson-number[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n\n.lesson-title[_ngcontent-%COMP%] {\n  font-size: 2.2rem;\n  font-weight: 700;\n  margin: 0 0 12px 0;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n}\n\n.lesson-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n\n.lesson-duration[_ngcontent-%COMP%], .lesson-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(255, 255, 255, 0.15);\n  padding: 8px 12px;\n  border-radius: 20px;\n  font-weight: 500;\n  -webkit-backdrop-filter: blur(10px);\n          backdrop-filter: blur(10px);\n}\n\n.lesson-status.free[_ngcontent-%COMP%] {\n  background: rgba(76, 175, 80, 0.2);\n}\n\n.lesson-status.premium[_ngcontent-%COMP%] {\n  background: rgba(255, 193, 7, 0.2);\n}\n\n\n\n.lesson-tabs[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n}\n\n  .lesson-tab-group .mat-mdc-tab-header {\n  background: #f8f9ff;\n  border-bottom: 2px solid #e0e7ff;\n} \n\n.lesson-content-main[_ngcontent-%COMP%] {\n  padding: 30px;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\n  animation: _ngcontent-%COMP%_fadeInUp 0.8s ease-out 0.3s both;\n}\n\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n\n.lesson-description[_ngcontent-%COMP%], .lesson-main-content[_ngcontent-%COMP%], .key-insights-section[_ngcontent-%COMP%], .media-section[_ngcontent-%COMP%], .tags-section[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.lesson-description[_ngcontent-%COMP%]:last-child, \n.lesson-main-content[_ngcontent-%COMP%]:last-child, \n.key-insights-section[_ngcontent-%COMP%]:last-child, \n.media-section[_ngcontent-%COMP%]:last-child, \n.tags-section[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.lesson-description[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.lesson-main-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.insights-title[_ngcontent-%COMP%], \n.media-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.tags-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #333;\n  margin: 0 0 20px 0;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding-bottom: 12px;\n  border-bottom: 2px solid #e0e7ff;\n}\n\n.insights-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .tags-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #667eea;\n  font-size: 1.8rem;\n  width: 1.8rem;\n  height: 1.8rem;\n}\n\n.description-content[_ngcontent-%COMP%], .content-body[_ngcontent-%COMP%] {\n  background: #f8f9ff;\n  padding: 20px;\n  border-radius: 12px;\n  border-left: 4px solid #667eea;\n  line-height: 1.6;\n  color: #444;\n}\n\n\n\n.media-section[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n}\n\n.media-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #333;\n  margin: 0 0 16px 0;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.media-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]::before {\n  content: \"\";\n  width: 4px;\n  height: 24px;\n  background: #4caf50;\n  border-radius: 2px;\n}\n\n.media-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 16px;\n}\n\n.media-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 24px;\n  background: white;\n  border-radius: 12px;\n  text-decoration: none;\n  color: #333;\n  border: 2px solid transparent;\n  transition: all 0.3s ease;\n  text-align: center;\n}\n\n.media-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n\n.media-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  width: 3rem;\n  height: 3rem;\n  margin-bottom: 12px;\n}\n\n.media-card.video[_ngcontent-%COMP%] {\n  border-color: #ff4444;\n}\n\n.media-card.video[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #ff4444;\n}\n\n.media-card.audio[_ngcontent-%COMP%] {\n  border-color: #9c27b0;\n}\n\n.media-card.audio[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #9c27b0;\n}\n\n.media-card.document[_ngcontent-%COMP%] {\n  border-color: #2196f3;\n}\n\n.media-card.document[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #2196f3;\n}\n\n.media-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin-bottom: 4px;\n}\n\n.media-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #666;\n} \n\n.key-insights-section[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);\n  padding: 30px;\n  border-radius: 12px;\n  border: 1px solid #e0e7ff;\n}\n\n\n\n.keynotes-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.keynote-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  border-left: 4px solid #e0e7ff;\n  transition: all 0.3s ease;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.keynote-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n\n.keynote-card.important[_ngcontent-%COMP%] {\n  border-left-color: #ff6b6b;\n  background: linear-gradient(135deg, #fff8f8 0%, #ffffff 100%);\n}\n\n.keynote-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n\n.keynote-number[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  color: white;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  flex-shrink: 0;\n}\n\n.keynote-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.keynote-title[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  margin: 0 0 8px 0;\n  color: #333;\n}\n\n.keynote-badges[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.important-badge[_ngcontent-%COMP%], .meta-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n\n.important-badge[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n\n.meta-badge.planet[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #ef6c00;\n}\n\n.meta-badge.zodiac[_ngcontent-%COMP%] {\n  background: #f3e5f5;\n  color: #7b1fa2;\n}\n\n.meta-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  width: 1rem;\n  height: 1rem;\n}\n\n.keynote-content[_ngcontent-%COMP%] {\n  line-height: 1.6;\n  color: #555;\n  margin-bottom: 16px;\n}\n\n.keynote-visual[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.visual-aid[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 300px;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n\n\n\n.tags-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #333;\n  margin: 0 0 20px 0;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.tags-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]::before {\n  content: \"\";\n  width: 4px;\n  height: 24px;\n  background: #2196f3;\n  border-radius: 2px;\n} \n\n.tags-section[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #fff8f0 0%, #fff 100%);\n  padding: 30px;\n  border-radius: 12px;\n  border: 1px solid #f0e7d8;\n}\n\n.tags-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 16px;\n}\n\n.tag-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 16px;\n  border-radius: 12px;\n  border: 1px solid #e0e7ff;\n  transition: all 0.3s ease;\n}\n\n.tag-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border-color: #667eea;\n}\n\n.tag-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n\n.tag-header[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n\n.tag-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n}\n\n.tag-description[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n  line-height: 1.4;\n  margin-bottom: 8px;\n}\n\n.tag-category[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #888;\n  font-style: italic;\n}\n\n\n\n@media (max-width: 768px) {\n  .lesson-detail-container[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .lesson-header[_ngcontent-%COMP%] {\n    padding: 20px;\n    flex-direction: column;\n    text-align: center;\n  }\n  .lesson-info[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .lesson-title[_ngcontent-%COMP%] {\n    font-size: 1.8rem;\n  }\n  .lesson-meta[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .tab-content[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .media-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .keynote-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .tags-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxlc3Nvbi1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNJO0VBQ0UsaUJBQUE7RUFDQSw2REFBQTtFQUNBLGFBQUE7QUFBTjs7QUFHSTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBQU47O0FBR0k7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtBQUFOOztBQUdJO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0FBQU47O0FBR0k7RUFDRSxpQkFBQTtFQUNBLGNBQUE7QUFBTixFQUNTLGtCQUFBO0FBQ0w7RUFDRSw2REFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esd0VBQUE7QUFBTjs7QUFHSTtFQUNFO0lBQ0UsVUFBQTtJQUNBLDRCQUFBO0VBQU47RUFFSTtJQUNFLFVBQUE7SUFDQSx3QkFBQTtFQUFOO0FBQ0Y7QUFHSTtFQUNFO0lBQ0UsK0NBQUE7RUFETjtFQUdJO0lBQ0UsZ0RBQUE7RUFETjtBQUNGO0FBRUs7RUFDQyxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsNEZBQUE7RUFDQSxvQkFBQTtBQUFOOztBQUdJO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHlFQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLFVBQUE7RUFDQSx3Q0FBQTtBQUFOOztBQUdJO0VBQ0U7SUFDRSxVQUFBO0VBQU47RUFFSTtJQUNFLFVBQUE7RUFBTjtBQUNGO0FBR0k7RUFDRSx1QkFBQTtFQUNBLG9DQUFBO0VBQ0EsVUFB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LGlCQUFBO0FBQ0w7RUFDRSwwREFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FBQU47O0FBR0k7RUFDRSxhQUFBO0VBQ0EsNERBQUE7RUFDQSxTQUFBO0FBQU47O0FBR0k7RUFDRSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7QUFBTjs7QUFHSTtFQUNFLDJCQUFBO0VBQ0EseUNBQUE7RUFDQSxxQkFBQTtBQUFOOztBQUdJO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0FBQU47O0FBR0k7RUFDRSxjQUFBO0FBQU47O0FBR0k7RUFDRSxnQkFBQTtFQUNBLFdBQUE7QUFBTjs7QUFHSTtFQUNFLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFBTjs7QUFHSTtFQUNFLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBQU47O0FBR0ksc0JBQUE7QUFDQTtFQUNFO0lBQ0UsYUFBQTtFQUFOO0VBR0k7SUFDRSxhQUFBO0lBQ0Esc0JBQUE7SUFDQSxrQkFBQTtFQUROO0VBSUk7SUFDRSxzQkFBQTtJQUNBLFNBQUE7RUFGTjtFQUtJO0lBQ0UsaUJBQUE7RUFITjtFQU1JO0lBQ0UsdUJBQUE7RUFKTjtFQU9JO0lBQ0UsYUFBQTtFQUxOO0VBUUk7SUFDRSwwQkFBQTtFQU5OO0VBU0k7SUFDRSxzQkFBQTtJQUNBLHVCQUFBO0VBUE47RUFVSTtJQUNFLDBCQUFBO0VBUk47QUFDRiIsImZpbGUiOiJsZXNzb24tZGV0YWlsLmNvbXBvbmVudC50cyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIC5sZXNzb24tZGV0YWlsLWNvbnRhaW5lciB7XG4gICAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmNWY3ZmEgMCUsICNjM2NmZTIgMTAwJSk7XG4gICAgICBwYWRkaW5nOiAyMHB4O1xuICAgIH1cblxuICAgIC5sb2FkaW5nLWNvbnRhaW5lciwgLmVycm9yLWNvbnRhaW5lciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIG1pbi1oZWlnaHQ6IDUwdmg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLmxvYWRpbmctY29udGFpbmVyIHAge1xuICAgICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgICAgY29sb3I6ICM2NjY7XG4gICAgfVxuXG4gICAgLmVycm9yLWljb24ge1xuICAgICAgZm9udC1zaXplOiA0cmVtO1xuICAgICAgd2lkdGg6IDRyZW07XG4gICAgICBoZWlnaHQ6IDRyZW07XG4gICAgICBjb2xvcjogI2ZmNTcyMjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1jb250ZW50IHtcbiAgICAgIG1heC13aWR0aDogMTIwMHB4O1xuICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgfSAgICAvKiBMZXNzb24gSGVhZGVyICovXG4gICAgLmxlc3Nvbi1oZWFkZXIge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmNmI2YiAwJSwgI2VlNWE1MiAxMDAlKTtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIHBhZGRpbmc6IDMwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiAyMHB4O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIGFuaW1hdGlvbjogc2xpZGVJbkZyb21Ub3AgMC42cyBlYXNlLW91dCwgaGVhZGVyUHVsc2UgMnMgZWFzZS1pbi1vdXQgMC44cztcbiAgICB9XG5cbiAgICBAa2V5ZnJhbWVzIHNsaWRlSW5Gcm9tVG9wIHtcbiAgICAgIGZyb20ge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMwcHgpO1xuICAgICAgfVxuICAgICAgdG8ge1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQGtleWZyYW1lcyBoZWFkZXJQdWxzZSB7XG4gICAgICAwJSwgMTAwJSB7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgOHB4IDMycHggcmdiYSgyNTUsIDEwNywgMTA3LCAwLjMpO1xuICAgICAgfVxuICAgICAgNTAlIHtcbiAgICAgICAgYm94LXNoYWRvdzogMCAxMnB4IDQwcHggcmdiYSgyNTUsIDEwNywgMTA3LCAwLjUpO1xuICAgICAgfVxuICAgIH0ubGVzc29uLWhlYWRlcjo6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCAyMCUgODAlLCByZ2JhKDI1NSwyNTUsMjU1LDAuMSkgMCUsIHRyYW5zcGFyZW50IDUwJSk7XG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICB9XG5cbiAgICAubGVzc29uLWhlYWRlcjo6YWZ0ZXIge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IC0ycHg7XG4gICAgICBsZWZ0OiAtMnB4O1xuICAgICAgcmlnaHQ6IC0ycHg7XG4gICAgICBib3R0b206IC0ycHg7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsIHJnYmEoMjU1LDI1NSwyNTUsMC4zKSwgdHJhbnNwYXJlbnQpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIGFuaW1hdGlvbjogaGlnaGxpZ2h0IDJzIGVhc2UtaW4tb3V0IDAuNXM7XG4gICAgfVxuXG4gICAgQGtleWZyYW1lcyBoaWdobGlnaHQge1xuICAgICAgMCUsIDEwMCUge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgfVxuICAgICAgNTAlIHtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuYmFjay1idXR0b24ge1xuICAgICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG4gICAgICB6LWluZGV4OiAyO1xuICAgIH1cblxuICAgIC5iYWNrLWJ1dHRvbjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyk7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1pbmZvIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiAyMHB4O1xuICAgICAgZmxleDogMTtcbiAgICAgIHotaW5kZXg6IDI7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1udW1iZXIge1xuICAgICAgd2lkdGg6IDYwcHg7XG4gICAgICBoZWlnaHQ6IDYwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDIuMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBtYXJnaW46IDAgMCAxMnB4IDA7XG4gICAgICB0ZXh0LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwwLDAsMC4zKTtcbiAgICB9XG5cbiAgICAubGVzc29uLW1ldGEge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogMjBweDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1kdXJhdGlvbiwgLmxlc3Nvbi1zdGF0dXMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDZweDtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSk7XG4gICAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEwcHgpO1xuICAgIH1cblxuICAgIC5sZXNzb24tc3RhdHVzLmZyZWUge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSg3NiwgMTc1LCA4MCwgMC4yKTtcbiAgICB9XG5cbiAgICAubGVzc29uLXN0YXR1cy5wcmVtaXVtIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAxOTMsIDcsIDAuMik7XG4gICAgfVxuXG4gICAgLyogTGVzc29uIFRhYnMgKi9cbiAgICAubGVzc29uLXRhYnMge1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIGJveC1zaGFkb3c6IDAgOHB4IDMycHggcmdiYSgwLDAsMCwwLjEpO1xuICAgIH1cblxuICAgIDo6bmctZGVlcCAubGVzc29uLXRhYi1ncm91cCAubWF0LW1kYy10YWItaGVhZGVyIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmOGY5ZmY7XG4gICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2UwZTdmZjtcbiAgICB9ICAgIC8qIExlc3NvbiBDb250ZW50IE1haW4gKi9cbiAgICAubGVzc29uLWNvbnRlbnQtbWFpbiB7XG4gICAgICBwYWRkaW5nOiAzMHB4O1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgYm94LXNoYWRvdzogMCA0cHggMjBweCByZ2JhKDAsMCwwLDAuMDUpO1xuICAgICAgYW5pbWF0aW9uOiBmYWRlSW5VcCAwLjhzIGVhc2Utb3V0IDAuM3MgYm90aDtcbiAgICB9XG5cbiAgICBAa2V5ZnJhbWVzIGZhZGVJblVwIHtcbiAgICAgIGZyb20ge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMzBweCk7XG4gICAgICB9XG4gICAgICB0byB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBDb250ZW50IFNlY3Rpb25zICovXG4gICAgLmxlc3Nvbi1kZXNjcmlwdGlvbiwgLmxlc3Nvbi1tYWluLWNvbnRlbnQsIC5rZXktaW5zaWdodHMtc2VjdGlvbiwgLm1lZGlhLXNlY3Rpb24sIC50YWdzLXNlY3Rpb24ge1xuICAgICAgbWFyZ2luLWJvdHRvbTogNDBweDtcbiAgICB9XG5cbiAgICAubGVzc29uLWRlc2NyaXB0aW9uOmxhc3QtY2hpbGQsIFxuICAgIC5sZXNzb24tbWFpbi1jb250ZW50Omxhc3QtY2hpbGQsIFxuICAgIC5rZXktaW5zaWdodHMtc2VjdGlvbjpsYXN0LWNoaWxkLCBcbiAgICAubWVkaWEtc2VjdGlvbjpsYXN0LWNoaWxkLCBcbiAgICAudGFncy1zZWN0aW9uOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG5cbiAgICAubGVzc29uLWRlc2NyaXB0aW9uIGgzLCBcbiAgICAubGVzc29uLW1haW4tY29udGVudCBoMywgXG4gICAgLmluc2lnaHRzLXRpdGxlLCBcbiAgICAubWVkaWEtc2VjdGlvbiBoMywgXG4gICAgLnRhZ3MtdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgICBtYXJnaW46IDAgMCAyMHB4IDA7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMTJweDtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNlMGU3ZmY7XG4gICAgfSAgICAuaW5zaWdodHMtdGl0bGUgbWF0LWljb24sIC50YWdzLXRpdGxlIG1hdC1pY29uIHtcbiAgICAgIGNvbG9yOiAjNjY3ZWVhO1xuICAgICAgZm9udC1zaXplOiAxLjhyZW07XG4gICAgICB3aWR0aDogMS44cmVtO1xuICAgICAgaGVpZ2h0OiAxLjhyZW07XG4gICAgfVxuXG4gICAgLmRlc2NyaXB0aW9uLWNvbnRlbnQsIC5jb250ZW50LWJvZHkge1xuICAgICAgYmFja2dyb3VuZDogI2Y4ZjlmZjtcbiAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjNjY3ZWVhO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgICAgIGNvbG9yOiAjNDQ0O1xuICAgIH1cblxuICAgIC8qIE1lZGlhIFNlY3Rpb24gKi9cbiAgICAubWVkaWEtc2VjdGlvbiB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICAgIH1cblxuICAgIC5tZWRpYS1zZWN0aW9uIGgzIHtcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgbWFyZ2luOiAwIDAgMTZweCAwO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDEycHg7XG4gICAgfVxuXG4gICAgLm1lZGlhLXNlY3Rpb24gaDM6OmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHdpZHRoOiA0cHg7XG4gICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjNGNhZjUwO1xuICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIH1cblxuICAgIC5tZWRpYS1ncmlkIHtcbiAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI4MHB4LCAxZnIpKTtcbiAgICAgIGdhcDogMTZweDtcbiAgICB9XG5cbiAgICAubWVkaWEtY2FyZCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiAyNHB4O1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgICBib3JkZXI6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLm1lZGlhLWNhcmQ6aG92ZXIge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC00cHgpO1xuICAgICAgYm94LXNoYWRvdzogMCA4cHggMjRweCByZ2JhKDAsMCwwLDAuMTUpO1xuICAgIH1cblxuICAgIC5tZWRpYS1jYXJkIG1hdC1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogM3JlbTtcbiAgICAgIHdpZHRoOiAzcmVtO1xuICAgICAgaGVpZ2h0OiAzcmVtO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICB9XG5cbiAgICAubWVkaWEtY2FyZC52aWRlbyB7XG4gICAgICBib3JkZXItY29sb3I6ICNmZjQ0NDQ7XG4gICAgfVxuXG4gICAgLm1lZGlhLWNhcmQudmlkZW8gbWF0LWljb24ge1xuICAgICAgY29sb3I6ICNmZjQ0NDQ7XG4gICAgfVxuXG4gICAgLm1lZGlhLWNhcmQuYXVkaW8ge1xuICAgICAgYm9yZGVyLWNvbG9yOiAjOWMyN2IwO1xuICAgIH1cblxuICAgIC5tZWRpYS1jYXJkLmF1ZGlvIG1hdC1pY29uIHtcbiAgICAgIGNvbG9yOiAjOWMyN2IwO1xuICAgIH1cblxuICAgIC5tZWRpYS1jYXJkLmRvY3VtZW50IHtcbiAgICAgIGJvcmRlci1jb2xvcjogIzIxOTZmMztcbiAgICB9XG5cbiAgICAubWVkaWEtY2FyZC5kb2N1bWVudCBtYXQtaWNvbiB7XG4gICAgICBjb2xvcjogIzIxOTZmMztcbiAgICB9XG5cbiAgICAubWVkaWEtY2FyZCBzcGFuIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICB9XG5cbiAgICAubWVkaWEtY2FyZCBzbWFsbCB7XG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgIH0gICAgLyogS2V5IEluc2lnaHRzIFNlY3Rpb24gKi9cbiAgICAua2V5LWluc2lnaHRzLXNlY3Rpb24ge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2Y4ZjlmZiAwJSwgI2UzZjJmZCAxMDAlKTtcbiAgICAgIHBhZGRpbmc6IDMwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2UwZTdmZjtcbiAgICB9XG5cbiAgICAvKiBLZXlub3RlcyBDb250YWluZXIgKi9cbiAgICAua2V5bm90ZXMtY29udGFpbmVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgZ2FwOiAyMHB4O1xuICAgIH1cblxuICAgIC5rZXlub3RlLWNhcmQge1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgI2UwZTdmZjtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLDAsMCwwLjEpO1xuICAgIH1cblxuICAgIC5rZXlub3RlLWNhcmQ6aG92ZXIge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICAgICAgYm94LXNoYWRvdzogMCA4cHggMjRweCByZ2JhKDAsMCwwLDAuMTUpO1xuICAgIH1cblxuICAgIC5rZXlub3RlLWNhcmQuaW1wb3J0YW50IHtcbiAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAjZmY2YjZiO1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmZjhmOCAwJSwgI2ZmZmZmZiAxMDAlKTtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgZ2FwOiAxNnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1udW1iZXIge1xuICAgICAgd2lkdGg6IDQwcHg7XG4gICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhLCAjNzY0YmEyKTtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtaW5mbyB7XG4gICAgICBmbGV4OiAxO1xuICAgIH1cblxuICAgIC5rZXlub3RlLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIG1hcmdpbjogMCAwIDhweCAwO1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtYmFkZ2VzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICB9XG5cbiAgICAuaW1wb3J0YW50LWJhZGdlLCAubWV0YS1iYWRnZSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogNHB4O1xuICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuXG4gICAgLmltcG9ydGFudC1iYWRnZSB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZmZlYmVlO1xuICAgICAgY29sb3I6ICNjNjI4Mjg7XG4gICAgfVxuXG4gICAgLm1ldGEtYmFkZ2UucGxhbmV0IHtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmYzZTA7XG4gICAgICBjb2xvcjogI2VmNmMwMDtcbiAgICB9XG5cbiAgICAubWV0YS1iYWRnZS56b2RpYWMge1xuICAgICAgYmFja2dyb3VuZDogI2YzZTVmNTtcbiAgICAgIGNvbG9yOiAjN2IxZmEyO1xuICAgIH1cblxuICAgIC5tZXRhLWJhZGdlIG1hdC1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgIHdpZHRoOiAxcmVtO1xuICAgICAgaGVpZ2h0OiAxcmVtO1xuICAgIH1cblxuICAgIC5rZXlub3RlLWNvbnRlbnQge1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgICAgIGNvbG9yOiAjNTU1O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICB9XG5cbiAgICAua2V5bm90ZS12aXN1YWwge1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cblxuICAgIC52aXN1YWwtYWlkIHtcbiAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgIG1heC1oZWlnaHQ6IDMwMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMSk7XG4gICAgfVxuXG4gICAgLyogVGFncyBUYWIgKi9cbiAgICAudGFncy1jb250YWluZXIgaDMge1xuICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgICBtYXJnaW46IDAgMCAyMHB4IDA7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMTJweDtcbiAgICB9XG5cbiAgICAudGFncy1jb250YWluZXIgaDM6OmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHdpZHRoOiA0cHg7XG4gICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjMjE5NmYzO1xuICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIH0gICAgLyogVGFncyBTZWN0aW9uICovXG4gICAgLnRhZ3Mtc2VjdGlvbiB7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmZmOGYwIDAlLCAjZmZmIDEwMCUpO1xuICAgICAgcGFkZGluZzogMzBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZjBlN2Q4O1xuICAgIH1cblxuICAgIC50YWdzLWdyaWQge1xuICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZmlsbCwgbWlubWF4KDI1MHB4LCAxZnIpKTtcbiAgICAgIGdhcDogMTZweDtcbiAgICB9XG5cbiAgICAudGFnLWNhcmQge1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBwYWRkaW5nOiAxNnB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlMGU3ZmY7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICAgIH1cblxuICAgIC50YWctY2FyZDpob3ZlciB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgICAgIGJvcmRlci1jb2xvcjogIzY2N2VlYTtcbiAgICB9XG5cbiAgICAudGFnLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgIH1cblxuICAgIC50YWctaGVhZGVyIG1hdC1pY29uIHtcbiAgICAgIGNvbG9yOiAjNjY3ZWVhO1xuICAgIH1cblxuICAgIC50YWctbmFtZSB7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgfVxuXG4gICAgLnRhZy1kZXNjcmlwdGlvbiB7XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICB9XG5cbiAgICAudGFnLWNhdGVnb3J5IHtcbiAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgY29sb3I6ICM4ODg7XG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuXG4gICAgLyogUmVzcG9uc2l2ZSBEZXNpZ24gKi9cbiAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAgIC5sZXNzb24tZGV0YWlsLWNvbnRhaW5lciB7XG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICB9XG5cbiAgICAgIC5sZXNzb24taGVhZGVyIHtcbiAgICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgfVxuXG4gICAgICAubGVzc29uLWluZm8ge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBnYXA6IDEycHg7XG4gICAgICB9XG5cbiAgICAgIC5sZXNzb24tdGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDEuOHJlbTtcbiAgICAgIH1cblxuICAgICAgLmxlc3Nvbi1tZXRhIHtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICB9XG5cbiAgICAgIC50YWItY29udGVudCB7XG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICB9XG5cbiAgICAgIC5tZWRpYS1ncmlkIHtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gICAgICB9XG5cbiAgICAgIC5rZXlub3RlLWhlYWRlciB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgfVxuXG4gICAgICAudGFncy1ncmlkIHtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gICAgICB9XG4gICAgfVxuICAiXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvY291cnNlcy9sZXNzb24tZGV0YWlsL2xlc3Nvbi1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNJO0VBQ0UsaUJBQUE7RUFDQSw2REFBQTtFQUNBLGFBQUE7QUFBTjs7QUFHSTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBQU47O0FBR0k7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtBQUFOOztBQUdJO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0FBQU47O0FBR0k7RUFDRSxpQkFBQTtFQUNBLGNBQUE7QUFBTixFQUNTLGtCQUFBO0FBQ0w7RUFDRSw2REFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esd0VBQUE7QUFBTjs7QUFHSTtFQUNFO0lBQ0UsVUFBQTtJQUNBLDRCQUFBO0VBQU47RUFFSTtJQUNFLFVBQUE7SUFDQSx3QkFBQTtFQUFOO0FBQ0Y7QUFHSTtFQUNFO0lBQ0UsK0NBQUE7RUFETjtFQUdJO0lBQ0UsZ0RBQUE7RUFETjtBQUNGO0FBRUs7RUFDQyxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsNEZBQUE7RUFDQSxvQkFBQTtBQUFOOztBQUdJO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHlFQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLFVBQUE7RUFDQSx3Q0FBQTtBQUFOOztBQUdJO0VBQ0U7SUFDRSxVQUFBO0VBQU47RUFFSTtJQUNFLFVB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QSxVQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUFBTixFQUNTLGlCQUFBO0FBQ0w7RUFDRSwwREFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FBQU47O0FBR0k7RUFDRSxhQUFBO0VBQ0EsNERBQUE7RUFDQSxTQUFBO0FBQU47O0FBR0k7RUFDRSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7QUFBTjs7QUFHSTtFQUNFLDJCQUFBO0VBQ0EseUNBQUE7RUFDQSxxQkFBQTtBQUFOOztBQUdJO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0FBQU47O0FBR0k7RUFDRSxjQUFBO0FBQU47O0FBR0k7RUFDRSxnQkFBQTtFQUNBLFdBQUE7QUFBTjs7QUFHSTtFQUNFLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFBTjs7QUFHSTtFQUNFLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBQU47O0FBR0ksc0JBQUE7QUFDQTtFQUNFO0lBQ0UsYUFBQTtFQUFOO0VBR0k7SUFDRSxhQUFBO0lBQ0Esc0JBQUE7SUFDQSxrQkFBQTtFQUROO0VBSUk7SUFDRSxzQkFBQTtJQUNBLFNBQUE7RUFGTjtFQUtJO0lBQ0UsaUJBQUE7RUFITjtFQU1JO0lBQ0UsdUJBQUE7RUFKTjtFQU9JO0lBQ0UsYUFBQTtFQUxOO0VBUUk7SUFDRSwwQkFBQTtFQU5OO0VBU0k7SUFDRSxzQkFBQTtJQUNBLHVCQUFBO0VBUE47RUFVSTtJQUNFLDBCQUFBO0VBUk47QUFDRjtBQUVBLGcxcUJBQWcxcUIiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAubGVzc29uLWRldGFpbC1jb250YWluZXIge1xuICAgICAgbWluLWhlaWdodDogMTAwdmg7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjVmN2ZhIDAlLCAjYzNjZmUyIDEwMCUpO1xuICAgICAgcGFkZGluZzogMjBweDtcbiAgICB9XG5cbiAgICAubG9hZGluZy1jb250YWluZXIsIC5lcnJvci1jb250YWluZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBtaW4taGVpZ2h0OiA1MHZoO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cblxuICAgIC5sb2FkaW5nLWNvbnRhaW5lciBwIHtcbiAgICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgIH1cblxuICAgIC5lcnJvci1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogNHJlbTtcbiAgICAgIHdpZHRoOiA0cmVtO1xuICAgICAgaGVpZ2h0OiA0cmVtO1xuICAgICAgY29sb3I6ICNmZjU3MjI7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIH1cblxuICAgIC5sZXNzb24tY29udGVudCB7XG4gICAgICBtYXgtd2lkdGg6IDEyMDBweDtcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIH0gICAgLyogTGVzc29uIEhlYWRlciAqL1xuICAgIC5sZXNzb24taGVhZGVyIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmZjZiNmIgMCUsICNlZTVhNTIgMTAwJSk7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBwYWRkaW5nOiAzMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMjBweDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBhbmltYXRpb246IHNsaWRlSW5Gcm9tVG9wIDAuNnMgZWFzZS1vdXQsIGhlYWRlclB1bHNlIDJzIGVhc2UtaW4tb3V0IDAuOHM7XG4gICAgfVxuXG4gICAgQGtleWZyYW1lcyBzbGlkZUluRnJvbVRvcCB7XG4gICAgICBmcm9tIHtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMHB4KTtcbiAgICAgIH1cbiAgICAgIHRvIHtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgfVxuICAgIH1cblxuICAgIEBrZXlmcmFtZXMgaGVhZGVyUHVsc2Uge1xuICAgICAgMCUsIDEwMCUge1xuICAgICAgICBib3gtc2hhZG93OiAwIDhweCAzMnB4IHJnYmEoMjU1LCAxMDcsIDEwNywgMC4zKTtcbiAgICAgIH1cbiAgICAgIDUwJSB7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMTJweCA0MHB4IHJnYmEoMjU1LCAxMDcsIDEwNywgMC41KTtcbiAgICAgIH1cbiAgICB9Lmxlc3Nvbi1oZWFkZXI6OmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgMjAlIDgwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjEpIDAlLCB0cmFuc3BhcmVudCA1MCUpO1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1oZWFkZXI6OmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAtMnB4O1xuICAgICAgbGVmdDogLTJweDtcbiAgICAgIHJpZ2h0OiAtMnB4O1xuICAgICAgYm90dG9tOiAtMnB4O1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCByZ2JhKDI1NSwyNTUsMjU1LDAuMyksIHRyYW5zcGFyZW50KTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDE4cHg7XG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICBhbmltYXRpb246IGhpZ2hsaWdodCAycyBlYXNlLWluLW91dCAwLjVzO1xuICAgIH1cblxuICAgIEBrZXlmcmFtZXMgaGlnaGxpZ2h0IHtcbiAgICAgIDAlLCAxMDAlIHtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgIH1cbiAgICAgIDUwJSB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmJhY2stYnV0dG9uIHtcbiAgICAgIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICAgICAgei1pbmRleDogMjtcbiAgICB9XG5cbiAgICAuYmFjay1idXR0b246aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xuICAgIH1cblxuICAgIC5sZXNzb24taW5mbyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMjBweDtcbiAgICAgIGZsZXg6IDE7XG4gICAgICB6LWluZGV4OiAyO1xuICAgIH1cblxuICAgIC5sZXNzb24tbnVtYmVyIHtcbiAgICAgIHdpZHRoOiA2MHB4O1xuICAgICAgaGVpZ2h0OiA2MHB4O1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIH1cblxuICAgIC5sZXNzb24tdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAyLjJyZW07XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbWFyZ2luOiAwIDAgMTJweCAwO1xuICAgICAgdGV4dC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMyk7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1tZXRhIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDIwcHg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgIH1cblxuICAgIC5sZXNzb24tZHVyYXRpb24sIC5sZXNzb24tc3RhdHVzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA2cHg7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpO1xuICAgICAgcGFkZGluZzogOHB4IDEycHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigxMHB4KTtcbiAgICB9XG5cbiAgICAubGVzc29uLXN0YXR1cy5mcmVlIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoNzYsIDE3NSwgODAsIDAuMik7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1zdGF0dXMucHJlbWl1bSB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTkzLCA3LCAwLjIpO1xuICAgIH1cblxuICAgIC8qIExlc3NvbiBUYWJzICovXG4gICAgLmxlc3Nvbi10YWJzIHtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBib3gtc2hhZG93OiAwIDhweCAzMnB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgICB9XG5cbiAgICA6Om5nLWRlZXAgLmxlc3Nvbi10YWItZ3JvdXAgLm1hdC1tZGMtdGFiLWhlYWRlciB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZmO1xuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNlMGU3ZmY7XG4gICAgfSAgICAvKiBMZXNzb24gQ29udGVudCBNYWluICovXG4gICAgLmxlc3Nvbi1jb250ZW50LW1haW4ge1xuICAgICAgcGFkZGluZzogMzBweDtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDIwcHggcmdiYSgwLDAsMCwwLjA1KTtcbiAgICAgIGFuaW1hdGlvbjogZmFkZUluVXAgMC44cyBlYXNlLW91dCAwLjNzIGJvdGg7XG4gICAgfVxuXG4gICAgQGtleWZyYW1lcyBmYWRlSW5VcCB7XG4gICAgICBmcm9tIHtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDMwcHgpO1xuICAgICAgfVxuICAgICAgdG8ge1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogQ29udGVudCBTZWN0aW9ucyAqL1xuICAgIC5sZXNzb24tZGVzY3JpcHRpb24sIC5sZXNzb24tbWFpbi1jb250ZW50LCAua2V5LWluc2lnaHRzLXNlY3Rpb24sIC5tZWRpYS1zZWN0aW9uLCAudGFncy1zZWN0aW9uIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDQwcHg7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1kZXNjcmlwdGlvbjpsYXN0LWNoaWxkLCBcbiAgICAubGVzc29uLW1haW4tY29udGVudDpsYXN0LWNoaWxkLCBcbiAgICAua2V5LWluc2lnaHRzLXNlY3Rpb246bGFzdC1jaGlsZCwgXG4gICAgLm1lZGlhLXNlY3Rpb246bGFzdC1jaGlsZCwgXG4gICAgLnRhZ3Mtc2VjdGlvbjpsYXN0LWNoaWxkIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1kZXNjcmlwdGlvbiBoMywgXG4gICAgLmxlc3Nvbi1tYWluLWNvbnRlbnQgaDMsIFxuICAgIC5pbnNpZ2h0cy10aXRsZSwgXG4gICAgLm1lZGlhLXNlY3Rpb24gaDMsIFxuICAgIC50YWdzLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgbWFyZ2luOiAwIDAgMjBweCAwO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDEycHg7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZTBlN2ZmO1xuICAgIH0gICAgLmluc2lnaHRzLXRpdGxlIG1hdC1pY29uLCAudGFncy10aXRsZSBtYXQtaWNvbiB7XG4gICAgICBjb2xvcjogIzY2N2VlYTtcbiAgICAgIGZvbnQtc2l6ZTogMS44cmVtO1xuICAgICAgd2lkdGg6IDEuOHJlbTtcbiAgICAgIGhlaWdodDogMS44cmVtO1xuICAgIH1cblxuICAgIC5kZXNjcmlwdGlvbi1jb250ZW50LCAuY29udGVudC1ib2R5IHtcbiAgICAgIGJhY2tncm91bmQ6ICNmOGY5ZmY7XG4gICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgIzY2N2VlYTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgICBjb2xvcjogIzQ0NDtcbiAgICB9XG5cbiAgICAvKiBNZWRpYSBTZWN0aW9uICovXG4gICAgLm1lZGlhLXNlY3Rpb24ge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICB9XG5cbiAgICAubWVkaWEtc2VjdGlvbiBoMyB7XG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogIzMzMztcbiAgICAgIG1hcmdpbjogMCAwIDE2cHggMDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiAxMnB4O1xuICAgIH1cblxuICAgIC5tZWRpYS1zZWN0aW9uIGgzOjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICB3aWR0aDogNHB4O1xuICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgYmFja2dyb3VuZDogIzRjYWY1MDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICB9XG5cbiAgICAubWVkaWEtZ3JpZCB7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyODBweCwgMWZyKSk7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgfVxuXG4gICAgLm1lZGlhLWNhcmQge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgcGFkZGluZzogMjRweDtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgYm9yZGVyOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cblxuICAgIC5tZWRpYS1jYXJkOmhvdmVyIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNHB4KTtcbiAgICAgIGJveC1zaGFkb3c6IDAgOHB4IDI0cHggcmdiYSgwLDAsMCwwLjE1KTtcbiAgICB9XG5cbiAgICAubWVkaWEtY2FyZCBtYXQtaWNvbiB7XG4gICAgICBmb250LXNpemU6IDNyZW07XG4gICAgICB3aWR0aDogM3JlbTtcbiAgICAgIGhlaWdodDogM3JlbTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgfVxuXG4gICAgLm1lZGlhLWNhcmQudmlkZW8ge1xuICAgICAgYm9yZGVyLWNvbG9yOiAjZmY0NDQ0O1xuICAgIH1cblxuICAgIC5tZWRpYS1jYXJkLnZpZGVvIG1hdC1pY29uIHtcbiAgICAgIGNvbG9yOiAjZmY0NDQ0O1xuICAgIH1cblxuICAgIC5tZWRpYS1jYXJkLmF1ZGlvIHtcbiAgICAgIGJvcmRlci1jb2xvcjogIzljMjdiMDtcbiAgICB9XG5cbiAgICAubWVkaWEtY2FyZC5hdWRpbyBtYXQtaWNvbiB7XG4gICAgICBjb2xvcjogIzljMjdiMDtcbiAgICB9XG5cbiAgICAubWVkaWEtY2FyZC5kb2N1bWVudCB7XG4gICAgICBib3JkZXItY29sb3I6ICMyMTk2ZjM7XG4gICAgfVxuXG4gICAgLm1lZGlhLWNhcmQuZG9jdW1lbnQgbWF0LWljb24ge1xuICAgICAgY29sb3I6ICMyMTk2ZjM7XG4gICAgfVxuXG4gICAgLm1lZGlhLWNhcmQgc3BhbiB7XG4gICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gICAgfVxuXG4gICAgLm1lZGlhLWNhcmQgc21hbGwge1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICB9ICAgIC8qIEtleSBJbnNpZ2h0cyBTZWN0aW9uICovXG4gICAgLmtleS1pbnNpZ2h0cy1zZWN0aW9uIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmOGY5ZmYgMCUsICNlM2YyZmQgMTAwJSk7XG4gICAgICBwYWRkaW5nOiAzMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlMGU3ZmY7XG4gICAgfVxuXG4gICAgLyogS2V5bm90ZXMgQ29udGFpbmVyICovXG4gICAgLmtleW5vdGVzLWNvbnRhaW5lciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogMjBweDtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1jYXJkIHtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNlMGU3ZmY7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICAgICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1jYXJkOmhvdmVyIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgICAgIGJveC1zaGFkb3c6IDAgOHB4IDI0cHggcmdiYSgwLDAsMCwwLjE1KTtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1jYXJkLmltcG9ydGFudCB7XG4gICAgICBib3JkZXItbGVmdC1jb2xvcjogI2ZmNmI2YjtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmZmY4ZjggMCUsICNmZmZmZmYgMTAwJSk7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtaGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIGdhcDogMTZweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtbnVtYmVyIHtcbiAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSwgIzc2NGJhMik7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIH1cblxuICAgIC5rZXlub3RlLWluZm8ge1xuICAgICAgZmxleDogMTtcbiAgICB9XG5cbiAgICAua2V5bm90ZS10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBtYXJnaW46IDAgMCA4cHggMDtcbiAgICAgIGNvbG9yOiAjMzMzO1xuICAgIH1cblxuICAgIC5rZXlub3RlLWJhZGdlcyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiA4cHg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgfVxuXG4gICAgLmltcG9ydGFudC1iYWRnZSwgLm1ldGEtYmFkZ2Uge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDRweDtcbiAgICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cblxuICAgIC5pbXBvcnRhbnQtYmFkZ2Uge1xuICAgICAgYmFja2dyb3VuZDogI2ZmZWJlZTtcbiAgICAgIGNvbG9yOiAjYzYyODI4O1xuICAgIH1cblxuICAgIC5tZXRhLWJhZGdlLnBsYW5ldCB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmM2UwO1xuICAgICAgY29sb3I6ICNlZjZjMDA7XG4gICAgfVxuXG4gICAgLm1ldGEtYmFkZ2Uuem9kaWFjIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmM2U1ZjU7XG4gICAgICBjb2xvcjogIzdiMWZhMjtcbiAgICB9XG5cbiAgICAubWV0YS1iYWRnZSBtYXQtaWNvbiB7XG4gICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICB3aWR0aDogMXJlbTtcbiAgICAgIGhlaWdodDogMXJlbTtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1jb250ZW50IHtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgICBjb2xvcjogIzU1NTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtdmlzdWFsIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG5cbiAgICAudmlzdWFsLWFpZCB7XG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICBtYXgtaGVpZ2h0OiAzMDBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLDAsMCwwLjEpO1xuICAgIH1cblxuICAgIC8qIFRhZ3MgVGFiICovXG4gICAgLnRhZ3MtY29udGFpbmVyIGgzIHtcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgbWFyZ2luOiAwIDAgMjBweCAwO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDEycHg7XG4gICAgfVxuXG4gICAgLnRhZ3MtY29udGFpbmVyIGgzOjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICB3aWR0aDogNHB4O1xuICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgYmFja2dyb3VuZDogIzIxOTZmMztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICB9ICAgIC8qIFRhZ3MgU2VjdGlvbiAqL1xuICAgIC50YWdzLXNlY3Rpb24ge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmZjhmMCAwJSwgI2ZmZiAxMDAlKTtcbiAgICAgIHBhZGRpbmc6IDMwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2YwZTdkODtcbiAgICB9XG5cbiAgICAudGFncy1ncmlkIHtcbiAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgyNTBweCwgMWZyKSk7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgfVxuXG4gICAgLnRhZy1jYXJkIHtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgcGFkZGluZzogMTZweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTBlN2ZmO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgICB9XG5cbiAgICAudGFnLWNhcmQ6aG92ZXIge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICAgICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMSk7XG4gICAgICBib3JkZXItY29sb3I6ICM2NjdlZWE7XG4gICAgfVxuXG4gICAgLnRhZy1oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICB9XG5cbiAgICAudGFnLWhlYWRlciBtYXQtaWNvbiB7XG4gICAgICBjb2xvcjogIzY2N2VlYTtcbiAgICB9XG5cbiAgICAudGFnLW5hbWUge1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiAjMzMzO1xuICAgIH1cblxuICAgIC50YWctZGVzY3JpcHRpb24ge1xuICAgICAgY29sb3I6ICM2NjY7XG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgfVxuXG4gICAgLnRhZy1jYXRlZ29yeSB7XG4gICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIGNvbG9yOiAjODg4O1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIH1cblxuICAgIC8qIFJlc3BvbnNpdmUgRGVzaWduICovXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgICAubGVzc29uLWRldGFpbC1jb250YWluZXIge1xuICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgfVxuXG4gICAgICAubGVzc29uLWhlYWRlciB7XG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLmxlc3Nvbi1pbmZvIHtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgZ2FwOiAxMnB4O1xuICAgICAgfVxuXG4gICAgICAubGVzc29uLXRpdGxlIHtcbiAgICAgICAgZm9udC1zaXplOiAxLjhyZW07XG4gICAgICB9XG5cbiAgICAgIC5sZXNzb24tbWV0YSB7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgfVxuXG4gICAgICAudGFiLWNvbnRlbnQge1xuICAgICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgfVxuXG4gICAgICAubWVkaWEtZ3JpZCB7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICAgICAgfVxuXG4gICAgICAua2V5bm90ZS1oZWFkZXIge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIH1cblxuICAgICAgLnRhZ3MtZ3JpZCB7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICAgICAgfVxuICAgIH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
      });
    }
  }
  return LessonDetailComponent;
})();

/***/ })

}]);
//# sourceMappingURL=src_app_pages_courses_lesson-detail_lesson-detail_component_ts.js.map