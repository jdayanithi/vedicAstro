"use strict";
(self["webpackChunkblogWeb"] = self["webpackChunkblogWeb"] || []).push([["src_app_pages_courses_customer-course-view_customer-course-view_component_ts"],{

/***/ 3656:
/*!**************************************************************************************!*\
  !*** ./src/app/pages/courses/customer-course-view/customer-course-view.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomerCourseViewComponent: () => (/* binding */ CustomerCourseViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/select */ 5175);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/chips */ 2772);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ 2587);
/* harmony import */ var _lesson_detail_modal_lesson_detail_modal_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lesson-detail-modal/lesson-detail-modal.component */ 5850);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _service_category_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/category.service */ 9097);
/* harmony import */ var _service_course_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/course.service */ 3524);
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/auth.service */ 7355);
/* harmony import */ var _service_lesson_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/lesson.service */ 2969);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/core */ 4646);


























function CustomerCourseViewComponent_p_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Explore ancient wisdom through our comprehensive courses");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function CustomerCourseViewComponent_p_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Master the ancient wisdom of ", ctx_r0.selectedCourse.title, "");
  }
}
function CustomerCourseViewComponent_div_8_mat_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const cat_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", cat_r3.categoryId);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](cat_r3.name);
  }
}
function CustomerCourseViewComponent_div_8_mat_option_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const course_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", course_r4.courseId);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](course_r4.title);
  }
}
function CustomerCourseViewComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 11)(1, "div", 12)(2, "div", 13)(3, "mat-form-field", 14)(4, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "Choose Category");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "mat-select", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function CustomerCourseViewComponent_div_8_Template_mat_select_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r0.selectedCategoryId, $event) || (ctx_r0.selectedCategoryId = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectionChange", function CustomerCourseViewComponent_div_8_Template_mat_select_selectionChange_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r0.onCategoryChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, CustomerCourseViewComponent_div_8_mat_option_7_Template, 2, 2, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "mat-form-field", 14)(9, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "Choose Course");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "mat-select", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function CustomerCourseViewComponent_div_8_Template_mat_select_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r0.selectedCourseId, $event) || (ctx_r0.selectedCourseId = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectionChange", function CustomerCourseViewComponent_div_8_Template_mat_select_selectionChange_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r0.onCourseChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, CustomerCourseViewComponent_div_8_mat_option_12_Template, 2, 2, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r0.selectedCategoryId);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.categories);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r0.selectedCourseId);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx_r0.selectedCategoryId);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.filteredCourses);
  }
}
function CustomerCourseViewComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "mat-progress-spinner", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Loading course content...");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function CustomerCourseViewComponent_div_10_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "img", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("src", ctx_r0.selectedCourse.thumbnailUrl, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"])("alt", ctx_r0.selectedCourse.title);
  }
}
function CustomerCourseViewComponent_div_10_div_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 34)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "currency_rupee");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("\u20B9", ctx_r0.selectedCourse.price, "");
  }
}
function CustomerCourseViewComponent_div_10_div_38_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CustomerCourseViewComponent_div_10_div_38_button_4_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r0.expandAll());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "unfold_more");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, " Expand All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function CustomerCourseViewComponent_div_10_div_38_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CustomerCourseViewComponent_div_10_div_38_button_5_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r0.collapseAll());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "unfold_less");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, " Collapse All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function CustomerCourseViewComponent_div_10_div_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 44)(1, "h3", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Course Topics");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, CustomerCourseViewComponent_div_10_div_38_button_4_Template, 4, 0, "button", 47)(5, CustomerCourseViewComponent_div_10_div_38_button_5_Template, 4, 0, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.inlineExpandedTopics.size < ctx_r0.topics.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.inlineExpandedTopics.size > 0);
  }
}
function CustomerCourseViewComponent_div_10_div_39_div_18_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 34)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "schedule");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const topic_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.getTopicDuration(topic_r9), " min ");
  }
}
function CustomerCourseViewComponent_div_10_div_39_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 63)(1, "div", 64)(2, "span", 34)(3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "menu_book");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](6, CustomerCourseViewComponent_div_10_div_39_div_18_span_6_Template, 4, 1, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "span", 34)(8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "play_circle_filled");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "p", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "Click topic header to expand lessons or ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14, "open_in_new");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15, " for detailed view");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const topic_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", topic_r9.lessons.length, " Lessons ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.getTopicDuration(topic_r9) > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.getTopicFreeCount(topic_r9), " Free ");
  }
}
function CustomerCourseViewComponent_div_10_div_39_div_19_div_4_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const lesson_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", lesson_r11.duration, " min");
  }
}
function CustomerCourseViewComponent_div_10_div_39_div_19_div_4_span_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 83)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "lightbulb");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const lesson_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", lesson_r11.keynotes.length, " Key Insights ");
  }
}
function CustomerCourseViewComponent_div_10_div_39_div_19_div_4_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 83)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "local_offer");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const lesson_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", lesson_r11.tags.length, " Tags ");
  }
}
function CustomerCourseViewComponent_div_10_div_39_div_19_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 70)(1, "div", 71)(2, "div", 72)(3, "h4", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 74)(6, "span", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, CustomerCourseViewComponent_div_10_div_39_div_19_div_4_span_8_Template, 2, 1, "span", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, CustomerCourseViewComponent_div_10_div_39_div_19_div_4_span_11_Template, 4, 1, "span", 79)(12, CustomerCourseViewComponent_div_10_div_39_div_19_div_4_span_12_Template, 4, 1, "span", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "div", 80)(14, "button", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CustomerCourseViewComponent_div_10_div_39_div_19_div_4_Template_button_click_14_listener() {
      const lesson_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10).$implicit;
      const topic_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r0.viewLessonDetails(lesson_r11.lessonId, topic_r9.topicId));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16, "visibility");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, " View Details ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const lesson_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](lesson_r11.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassMap"](lesson_r11.isFree ? "free" : "premium");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", lesson_r11.isFree ? "Free" : "Premium", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", lesson_r11.duration);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("innerHTML", lesson_r11.description, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", lesson_r11.keynotes && lesson_r11.keynotes.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", lesson_r11.tags && lesson_r11.tags.length > 0);
  }
}
function CustomerCourseViewComponent_div_10_div_39_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 66)(1, "div", 67)(2, "h4", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Lessons in this Topic");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, CustomerCourseViewComponent_div_10_div_39_div_19_div_4_Template, 18, 8, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    const topic_r9 = ctx_r11.$implicit;
    const i_r8 = ctx_r11.index;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("inline-expanded", ctx_r0.inlineExpandedTopics.has(i_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", topic_r9.lessons);
  }
}
function CustomerCourseViewComponent_div_10_div_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 51)(1, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CustomerCourseViewComponent_div_10_div_39_Template_div_click_1_listener() {
      const i_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7).index;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r0.toggleTopic(i_r8));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 54)(5, "h3", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "p", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "Click to expand");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 58)(12, "button", 59)(13, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CustomerCourseViewComponent_div_10_div_39_Template_button_click_15_listener($event) {
      const i_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7).index;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r0.viewTopicDetails(i_r8, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, "open_in_new");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](18, CustomerCourseViewComponent_div_10_div_39_div_18_Template, 16, 3, "div", 61)(19, CustomerCourseViewComponent_div_10_div_39_div_19_Template, 5, 3, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const topic_r9 = ctx.$implicit;
    const i_r8 = ctx.index;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](i_r8 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](topic_r9.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", topic_r9.description, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("expanded", ctx_r0.inlineExpandedTopics.has(i_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.inlineExpandedTopics.has(i_r8) ? "expand_less" : "expand_more");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r0.inlineExpandedTopics.has(i_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.inlineExpandedTopics.has(i_r8));
  }
}
function CustomerCourseViewComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 21)(1, "div", 22)(2, "div", 23)(3, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, CustomerCourseViewComponent_div_10_div_4_Template, 2, 2, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 26)(6, "div", 27)(7, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "mat-icon", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "chevron_right");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "h1", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "div", 32)(16, "div", 33)(17, "div", 34)(18, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, "menu_book");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "div", 34)(23, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24, "schedule");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "div", 34)(28, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](29, "star");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](32, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](33, CustomerCourseViewComponent_div_10_div_33_Template, 5, 1, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "div", 37)(35, "p", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](38, CustomerCourseViewComponent_div_10_div_38_Template, 6, 2, "div", 40)(39, CustomerCourseViewComponent_div_10_div_39_Template, 20, 8, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedCourse.thumbnailUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.getCategoryName(ctx_r0.selectedCourse.categoryId));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.selectedCourse.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.selectedCourse.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx_r0.getTotalLessonsCount(), " Lessons");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx_r0.getTotalDuration(), " min");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](32, 11, ctx_r0.selectedCourse.difficultyLevel));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedCourse.price);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.selectedCourse.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.topics.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.topics);
  }
}
function CustomerCourseViewComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 84)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "search_off");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "No course found");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Please try selecting a different course.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
let CustomerCourseViewComponent = /*#__PURE__*/(() => {
  class CustomerCourseViewComponent {
    constructor(router, route, categoryService, courseService, authService, topicService, lessonService, dialog) {
      this.router = router;
      this.route = route;
      this.categoryService = categoryService;
      this.courseService = courseService;
      this.authService = authService;
      this.topicService = topicService;
      this.lessonService = lessonService;
      this.dialog = dialog;
      this.categories = [];
      this.courses = [];
      this.filteredCourses = [];
      this.topics = [];
      this.selectedCategoryId = null;
      this.selectedCourseId = null;
      this.selectedCourse = null;
      this.loading = false;
      this.isViewingSpecificCourse = false;
      this.inlineExpandedTopics = new Set();
    }
    ngOnInit() {
      // Get courseId from route parameter
      const courseId = this.route.snapshot.paramMap.get('id');
      if (courseId) {
        this.isViewingSpecificCourse = true;
        this.selectedCourseId = parseInt(courseId, 10);
        this.loadSpecificCourse(this.selectedCourseId);
      } else {
        this.isViewingSpecificCourse = false;
        // Fallback to original behavior if no courseId in route
        this.loadCategories();
        this.loadCourses();
      }
    }
    loadSpecificCourse(courseId) {
      this.loading = true;
      // Load the specific course
      this.courseService.getCourseById(courseId).subscribe({
        next: course => {
          this.selectedCourse = course;
          this.selectedCategoryId = course.categoryId;
          this.loadCategories();
          this.loadTopicsForCourse(courseId);
        },
        error: error => {
          console.error('Error loading course:', error);
          this.loading = false;
        }
      });
    }
    loadTopicsForCourse(courseId) {
      this.topicService.getTopicsByCourseId(courseId).subscribe({
        next: topics => {
          this.loadLessonsForTopics(topics);
        },
        error: error => {
          console.error('Error loading topics:', error);
          this.loading = false;
        }
      });
    }
    loadLessonsForTopics(topics) {
      const topicRequests = topics.map(topic => this.lessonService.getLessonsByTopicId(topic.topicId).toPromise().then(lessons => {
        return {
          ...topic,
          lessons: lessons || []
        };
      }));
      Promise.all(topicRequests).then(topicsWithLessons => {
        this.topics = topicsWithLessons;
        this.loading = false;
      }).catch(error => {
        console.error('Error loading lessons:', error);
        this.loading = false;
      });
    }
    loadCategories() {
      this.categoryService.getAllCategories().subscribe({
        next: categories => {
          this.categories = categories.filter(cat => cat.isPublished);
        },
        error: error => {
          console.error('Error loading categories:', error);
        }
      });
    }
    loadCourses() {
      this.courseService.getAllCourses().subscribe({
        next: courses => {
          this.courses = courses.filter(course => course.isPublished);
        },
        error: error => {
          console.error('Error loading courses:', error);
        }
      });
    }
    onCategoryChange() {
      this.selectedCourseId = null;
      this.selectedCourse = null;
      this.topics = [];
      this.inlineExpandedTopics.clear();
      this.filteredCourses = this.courses.filter(c => c.categoryId === this.selectedCategoryId);
    }
    onCourseChange() {
      this.selectedCourse = this.courses.find(c => c.courseId === this.selectedCourseId) || null;
      this.topics = [];
      this.inlineExpandedTopics.clear();
      if (this.selectedCourseId) {
        this.loading = true;
        // Load topics from the database
        this.loadTopicsFromDatabase();
      }
    }
    loadTopicsFromDatabase() {
      this.topicService.getTopicsByCourseId(this.selectedCourseId).subscribe({
        next: topics => {
          // Load lessons for each topic
          const topicLoaders = topics.map(topic => this.lessonService.getLessonsByTopicId(topic.topicId).subscribe({
            next: lessons => {
              topic.lessons = lessons;
            },
            error: error => {
              console.error(`Error loading lessons for topic ${topic.topicId}:`, error);
              topic.lessons = [];
            }
          }));
          this.topics = topics;
          this.loading = false;
        },
        error: error => {
          console.error('Error loading topics:', error);
          this.loading = false;
        }
      });
    }
    toggleTopic(topicIndex) {
      // Toggle inline expansion for showing lesson titles
      if (this.inlineExpandedTopics.has(topicIndex)) {
        this.inlineExpandedTopics.delete(topicIndex);
      } else {
        this.inlineExpandedTopics.add(topicIndex);
      }
    }
    viewTopicDetails(topicIndex, event) {
      // Prevent event bubbling to avoid triggering toggleTopic
      event.stopPropagation();
      // Navigate to the topic detail view for full content with keynotes and tags
      const topic = this.topics[topicIndex];
      if (topic) {
        this.router.navigate(['/topic', topic.topicId]);
      }
    }
    viewLessonDetails(lessonId, topicId) {
      // Open lesson details in a full-screen modal/overlay
      const dialogRef = this.dialog.open(_lesson_detail_modal_lesson_detail_modal_component__WEBPACK_IMPORTED_MODULE_0__.LessonDetailModalComponent, {
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: {
          lessonId: lessonId,
          topicId: topicId,
          courseId: this.selectedCourseId
        },
        panelClass: 'lesson-detail-modal-fullscreen',
        autoFocus: false,
        restoreFocus: false,
        hasBackdrop: true,
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result => {
        // Handle any actions after modal closes if needed
        console.log('Lesson detail modal closed');
      });
    }
    expandAll() {
      this.topics.forEach((_, index) => {
        this.inlineExpandedTopics.add(index);
      });
    }
    collapseAll() {
      this.inlineExpandedTopics.clear();
    }
    getDisplayLessons(topic, topicIndex) {
      return this.inlineExpandedTopics.has(topicIndex) ? topic.lessons : topic.lessons.slice(0, 2);
    }
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.categoryId === categoryId);
      return category ? category.name : 'Unknown Category';
    }
    getTotalLessonsCount() {
      return this.topics.reduce((total, topic) => total + topic.lessons.length, 0);
    }
    getTotalDuration() {
      let totalMinutes = 0;
      this.topics.forEach(topic => {
        topic.lessons.forEach(lesson => {
          if (lesson.duration) {
            totalMinutes += lesson.duration;
          }
        });
      });
      return totalMinutes;
    }
    getTopicDuration(topic) {
      return topic.lessons.reduce((total, lesson) => total + (lesson.duration || 0), 0);
    }
    getTopicFreeCount(topic) {
      return topic.lessons.filter(lesson => lesson.isFree).length;
    }
    static {
      this.ɵfac = function CustomerCourseViewComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || CustomerCourseViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_service_category_service__WEBPACK_IMPORTED_MODULE_1__.CategoryService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_service_course_service__WEBPACK_IMPORTED_MODULE_2__.CourseService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_service_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_service_lesson_service__WEBPACK_IMPORTED_MODULE_4__.TopicService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_service_lesson_service__WEBPACK_IMPORTED_MODULE_4__.LessonService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialog));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: CustomerCourseViewComponent,
        selectors: [["app-customer-course-view"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
        decls: 12,
        vars: 6,
        consts: [[1, "modern-customer-view"], [1, "hero-section"], [1, "hero-content"], [1, "hero-title"], ["class", "hero-subtitle", 4, "ngIf"], [1, "hero-bg-pattern"], ["class", "filter-section", 4, "ngIf"], ["class", "loading-section", 4, "ngIf"], ["class", "content-section", 4, "ngIf"], ["class", "no-data-modern", 4, "ngIf"], [1, "hero-subtitle"], [1, "filter-section"], [1, "filter-container"], [1, "filter-group"], ["appearance", "fill", 1, "modern-select"], [3, "ngModelChange", "selectionChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [3, "ngModelChange", "selectionChange", "ngModel", "disabled"], [3, "value"], [1, "loading-section"], ["mode", "indeterminate", "color", "primary", "diameter", "60"], [1, "content-section"], [1, "course-heading-section"], [1, "course-heading-content"], [1, "course-header-with-image"], ["class", "course-image-container", 4, "ngIf"], [1, "course-title-info"], [1, "course-breadcrumb"], [1, "breadcrumb-item"], [1, "breadcrumb-separator"], [1, "breadcrumb-item", "current"], [1, "course-main-title"], [1, "course-summary"], [1, "course-stats"], [1, "stat-item"], [1, "difficulty"], ["class", "stat-item", 4, "ngIf"], [1, "course-description-section"], [1, "course-description"], [1, "topics-container"], ["class", "topics-header", 4, "ngIf"], ["class", "topic-block", 4, "ngFor", "ngForOf"], [1, "course-image-container"], [1, "course-image-integrated", 3, "src", "alt"], [1, "topics-header"], [1, "topics-title"], [1, "topics-actions"], ["mat-raised-button", "", "color", "primary", "class", "expand-all-btn", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "color", "accent", "class", "collapse-all-btn", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 1, "expand-all-btn", 3, "click"], ["mat-raised-button", "", "color", "accent", 1, "collapse-all-btn", 3, "click"], [1, "topic-block"], [1, "topic-header-modern", 3, "click"], [1, "topic-number"], [1, "topic-info"], [1, "topic-title-modern"], [1, "topic-desc-modern"], [1, "click-hint"], [1, "topic-actions"], ["mat-icon-button", "", 1, "expand-button"], ["mat-icon-button", "", "title", "View detailed lessons with keynotes and tags", 1, "detail-button", 3, "click"], ["class", "topic-preview", 4, "ngIf"], ["class", "lessons-grid", 3, "inline-expanded", 4, "ngIf"], [1, "topic-preview"], [1, "topic-stats"], [1, "view-hint"], [1, "lessons-grid"], [1, "lessons-header"], [1, "lessons-section-title"], ["class", "lesson-item", 4, "ngFor", "ngForOf"], [1, "lesson-item"], [1, "lesson-content"], [1, "lesson-header-modern"], [1, "lesson-title-modern"], [1, "lesson-status"], [1, "status-badge"], ["class", "duration-badge", 4, "ngIf"], [1, "lesson-desc-modern", 3, "innerHTML"], [1, "lesson-meta-info"], ["class", "meta-item", 4, "ngIf"], [1, "lesson-actions"], ["mat-raised-button", "", "color", "primary", 1, "view-lesson-details-btn", 3, "click"], [1, "duration-badge"], [1, "meta-item"], [1, "no-data-modern"]],
        template: function CustomerCourseViewComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Discover Vedic Astrology");
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, CustomerCourseViewComponent_p_5_Template, 2, 0, "p", 4)(6, CustomerCourseViewComponent_p_6_Template, 2, 1, "p", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, CustomerCourseViewComponent_div_8_Template, 13, 5, "div", 6)(9, CustomerCourseViewComponent_div_9_Template, 4, 0, "div", 7)(10, CustomerCourseViewComponent_div_10_Template, 40, 13, "div", 8)(11, CustomerCourseViewComponent_div_11_Template, 7, 0, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.selectedCourse);
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.selectedCourse);
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.isViewingSpecificCourse);
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.selectedCourse && !ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.selectedCourseId && !ctx.selectedCourse && !ctx.loading);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.TitleCasePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_11__.MatSelectModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_11__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MatOption, _angular_material_card__WEBPACK_IMPORTED_MODULE_13__.MatCardModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_14__.MatChipsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_16__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_16__.MatProgressSpinner, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__.MatIconButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialogModule],
        styles: [".modern-customer-view[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\n}\n\n\n\n.hero-section[_ngcontent-%COMP%] {\n  position: relative;\n  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);\n  color: white;\n  padding: 80px 20px 60px;\n  text-align: center;\n  overflow: hidden;\n}\n\n.hero-bg-pattern[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-image: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);\n  pointer-events: none;\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  max-width: 800px;\n  margin: 0 auto;\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  font-weight: 700;\n  margin-bottom: 16px;\n  background: linear-gradient(45deg, #fff, #ecf0f1);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.hero-subtitle[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  opacity: 0.9;\n  font-weight: 300;\n}\n\n\n\n.filter-section[_ngcontent-%COMP%] {\n  background: white;\n  padding: 40px 20px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n}\n\n.filter-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n.modern-select[_ngcontent-%COMP%] {\n  min-width: 250px;\n}\n\n\n\n.loading-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 20px;\n  color: #666;\n}\n\n.loading-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  font-size: 1.1rem;\n} \n\n.content-section[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 20px 40px;\n} \n\n.course-header-with-image[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  align-items: flex-start;\n  margin-bottom: 24px;\n}\n\n.course-image-container[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 200px;\n}\n\n.course-image-integrated[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 150px;\n  object-fit: cover;\n  border-radius: 12px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s ease;\n}\n\n.course-image-integrated[_ngcontent-%COMP%]:hover {\n  transform: scale(1.02);\n}\n\n.course-title-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.course-main-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 600;\n  color: #2c3e50;\n  margin: 8px 0 0 0;\n  line-height: 1.2;\n}\n\n\n\n.course-heading-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 40px;\n  margin: 40px 0;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n}\n\n.course-breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 20px;\n  font-size: 0.9rem;\n  color: #666;\n}\n\n.breadcrumb-item.current[_ngcontent-%COMP%] {\n  color: #3f51b5;\n  font-weight: 500;\n}\n\n.breadcrumb-separator[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n\n.course-summary[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  gap: 20px;\n}\n\n.course-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n\n.stat-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #f8f9fa;\n  padding: 12px 16px;\n  border-radius: 8px;\n  font-weight: 500;\n  color: #555;\n}\n\n.stat-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #3f51b5;\n  font-size: 20px;\n}\n\n\n\n.course-description-section[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  padding-top: 24px;\n  border-top: 1px solid #e9ecef;\n}\n\n.course-description[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  line-height: 1.6;\n  color: #666;\n  margin: 0;\n}\n\n\n\n.topics-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 40px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n}\n\n.topics-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.topics-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 600;\n  color: #2c3e50;\n  margin: 0;\n}\n\n.topics-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n\n\n\n.topic-block[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  border: 1px solid #e0e0e0;\n  border-radius: 12px;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n\n.topic-block[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n}\n\n.topic-header-modern[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  padding: 24px;\n  background: #f8f9fa;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.topic-header-modern[_ngcontent-%COMP%]:hover {\n  background: #e9ecef;\n}\n\n.topic-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.topic-number[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 60px;\n  height: 60px;\n  background: linear-gradient(135deg, #3f51b5, #5c6bc0);\n  color: white;\n  border-radius: 50%;\n  font-size: 1.5rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n\n.topic-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.topic-title-modern[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  font-weight: 600;\n  color: #2c3e50;\n  margin: 0 0 8px 0;\n}\n\n.topic-desc-modern[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #666;\n  margin: 0;\n  line-height: 1.5;\n}\n\n.expand-button[_ngcontent-%COMP%] {\n  transition: transform 0.3s ease;\n}\n\n.expand-button.expanded[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n\n\n\n.topic-preview[_ngcontent-%COMP%] {\n  padding: 20px 30px;\n  background: #f8f9ff;\n  border-top: 1px solid #e0e7ff;\n}\n\n.topic-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  margin-bottom: 12px;\n  flex-wrap: wrap;\n}\n\n.topic-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: #666;\n  font-size: 0.9rem;\n  font-weight: 500;\n}\n\n.topic-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  width: 1rem;\n  height: 1rem;\n  color: #667eea;\n}\n\n.view-hint[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n  color: #888;\n  font-style: italic;\n}\n\n\n\n.lessons-grid[_ngcontent-%COMP%] {\n  padding: 0;\n  background: white;\n}\n\n.lessons-grid.inline-expanded[_ngcontent-%COMP%] {\n  padding: 24px;\n  border-top: 1px solid #e0e0e0;\n}\n\n.lesson-item[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f0f0f0;\n  transition: all 0.3s ease;\n}\n\n.lesson-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.lesson-item[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n}\n\n.lesson-content[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n}\n\n.lesson-header-modern[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 12px;\n  gap: 16px;\n}\n\n.lesson-title-modern[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #2c3e50;\n  margin: 0;\n  flex: 1;\n}\n\n.lesson-status[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-shrink: 0;\n}\n\n.status-badge[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n\n.status-badge.free[_ngcontent-%COMP%] {\n  background: #e8f5e8;\n  color: #2e7d32;\n}\n\n.status-badge.premium[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #f57c00;\n}\n\n.duration-badge[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  background: #f0f4ff;\n  color: #667eea;\n  border-radius: 8px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  margin-left: 8px;\n}\n\n.lesson-desc-modern[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #666;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.lesson-desc-preview[_ngcontent-%COMP%] {\n  max-height: 60px;\n  overflow: hidden;\n  position: relative;\n}\n\n.lesson-desc-preview[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 20px;\n  background: linear-gradient(transparent, white);\n}\n\n.lesson-preview[_ngcontent-%COMP%] {\n  opacity: 0.8;\n  transition: opacity 0.3s ease;\n}\n\n.lesson-preview[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n\n\n.keynotes-modern[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid #f0f0f0;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #3f51b5;\n  margin: 0 0 12px 0;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.keynotes-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.keynote-item[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-radius: 8px;\n  padding: 12px;\n  border-left: 3px solid #3f51b5;\n}\n\n.keynote-item.important[_ngcontent-%COMP%] {\n  border-left-color: #ff5722;\n  background: #fff3e0;\n}\n\n.keynote-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 8px;\n  gap: 12px;\n}\n\n.keynote-title-modern[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n  font-size: 0.9rem;\n}\n\n.keynote-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n\n.meta-tag[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n\n.meta-tag.planet[_ngcontent-%COMP%] {\n  background: #e8f5e8;\n  color: #2e7d32;\n}\n\n.meta-tag.zodiac[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1976d2;\n}\n\n.keynote-content-modern[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #666;\n  line-height: 1.5;\n}\n\n\n\n.tags-modern[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding-top: 12px;\n  border-top: 1px solid #f0f0f0;\n}\n\n.tag-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n\n.tag-modern[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  background: #e9ecef;\n  color: #495057;\n  border-radius: 12px;\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n\n\n\n.more-lessons-indicator[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 16px;\n  background: #f8f9fa;\n  border-radius: 8px;\n  margin: 12px 24px;\n  color: #666;\n  font-style: italic;\n}\n\n.click-hint[_ngcontent-%COMP%] {\n  color: #ff6b6b;\n  font-weight: 500;\n}\n\n\n\n.no-data-modern[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 20px;\n  color: #666;\n  text-align: center;\n}\n\n.no-data-modern[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 20px;\n  color: #ccc;\n}\n\n.no-data-modern[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin-bottom: 8px;\n}\n\n\n\n.topic-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.detail-button[_ngcontent-%COMP%] {\n  color: #667eea !important;\n  background: rgba(102, 126, 234, 0.1);\n}\n\n.detail-button[_ngcontent-%COMP%]:hover {\n  background: rgba(102, 126, 234, 0.2);\n}\n\n\n\n.lessons-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 0;\n  border-bottom: 2px solid #e0e7ff;\n  margin-bottom: 16px;\n}\n\n.lessons-section-title[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #333;\n  margin: 0;\n}\n\n.view-details-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.9rem;\n} \n\n.lesson-meta-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-top: 12px;\n  padding-top: 12px;\n  border-top: 1px solid #f0f4ff;\n}\n\n.meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  color: #666;\n  font-size: 0.85rem;\n}\n\n.meta-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  width: 1rem;\n  height: 1rem;\n  color: #667eea;\n}\n\n\n\n.lesson-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  margin-top: 16px;\n  padding-top: 12px;\n  border-top: 1px solid #f0f4ff;\n}\n\n.view-lesson-details-btn[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;\n  color: white !important;\n  font-weight: 600 !important;\n  padding: 8px 16px !important;\n  border-radius: 20px !important;\n  font-size: 0.9rem !important;\n  transition: all 0.3s ease !important;\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3) !important;\n}\n\n.view-lesson-details-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px) !important;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4) !important;\n}\n\n.view-lesson-details-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 4px !important;\n  font-size: 1.1rem !important;\n} \n\n@media (max-width: 768px) {\n  .hero-title[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .filter-group[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .modern-select[_ngcontent-%COMP%] {\n    min-width: auto;\n  }\n  .course-header-with-image[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .course-image-container[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .course-image-integrated[_ngcontent-%COMP%] {\n    height: 200px;\n  }\n  .course-main-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .course-heading-section[_ngcontent-%COMP%], \n   .topics-container[_ngcontent-%COMP%] {\n    padding: 24px;\n    margin: 24px 0;\n  }\n  .course-summary[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .course-stats[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .topics-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .topics-actions[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .topic-header-modern[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .lesson-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbWVyLWNvdXJzZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDSTtFQUNFLGlCQUFBO0VBQ0EsNkRBQUE7QUFBTjs7QUFHSSxpQkFBQTtBQUNBO0VBQ0Usa0JBQUE7RUFDQSw2REFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFBTjs7QUFHSTtFQUNFLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLG9MQUFBO0VBRUEsb0JBQUE7QUFETjs7QUFJSTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUROOztBQUlJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpREFBQTtFQUNBLDZCQUFBO0VBQ0Esb0NBQUE7RUFDQSxxQkFBQTtBQUROOztBQUlJO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUFETjs7QUFJSSxtQkFBQTtBQUNBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlDQUFBO0FBRE47O0FBSUk7RUFDRSxpQkFBQTtFQUNBLGNBQUE7QUFETjs7QUFJSTtFQUNFLGFBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0FBRE47O0FBSUk7RUFDRSxnQkFBQTtBQUROOztBQUlJLG9CQUFBO0FBQ0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBRE47O0FBSUk7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0FBRE4sRUFFUyxvQkFBQTtBQUNMO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0VBQ0Esb0JBQUE7QUFETixFQUVTLDRDQUFBO0FBQ0w7RUFDRSxhQUFBO0VBQ0EsU0FBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFETjs7QUFJSTtFQUNFLGNBQUE7RUFDQSxZQUFBO0FBRE47O0FBSUk7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5Q0FBQTtFQUNBLCtCQUFBO0FBRE47O0FBSUk7RUFDRSxzQkFBQTtBQUROOztBQUlJO0VBQ0UsT0FBQTtFQUNBLFlBQUE7QUFETjs7QUFJSTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBRE47O0FBSUksbUJBQUE7QUFDQTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLHlDQUFBO0FBRE47O0FBSUk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7QUFETjs7QUFJSTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtBQUROOztBQUdNO0VBQ0EsZUFBQTtBQUFOOztBQUdJO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtBQUFOOztBQUdJO0VBQ0UsYUFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0FBQU47O0FBR0k7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0FBQU47O0FBRU07RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQUNOOztBQUVJLCtCQUFBO0FBQ0E7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsNkJBQUE7QUFDTjs7QUFFSTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtBQUNOOztBQUVJLHFCQUFBO0FBQ0E7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLHlDQUFBO0FBQ047O0FBRUk7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7QUFDTjs7QUFFSTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNB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RSxhQUFBO0VBSE47RUFNSTtJQUNFLGlCQUFBO0VBSk47RUFNTTs7SUFFQSxhQUFBO0lBQ0EsY0FBQTtFQUpOO0VBT0k7SUFDRSxzQkFBQTtJQUNBLG9CQUFBO0VBTE47RUFRSTtJQUNFLHVCQUFBO0VBTk47RUFTSTtJQUNFLHNCQUFBO0lBQ0Esb0JBQUE7RUFQTjtFQVVJO0lBQ0UsdUJBQUE7RUFSTjtFQVdJO0lBQ0UsYUFBQTtFQVROO0VBWUk7SUFDRSxhQUFBO0VBVk47QUFDRiIsImZpbGUiOiJjdXN0b21lci1jb3Vyc2Utdmlldy5jb21wb25lbnQudHMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAubW9kZXJuLWN1c3RvbWVyLXZpZXcge1xuICAgICAgbWluLWhlaWdodDogMTAwdmg7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjVmN2ZhIDAlLCAjYzNjZmUyIDEwMCUpO1xuICAgIH1cblxuICAgIC8qIEhlcm8gU2VjdGlvbiAqL1xuICAgIC5oZXJvLXNlY3Rpb24ge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzJjM2U1MCAwJSwgIzM0NDk1ZSAxMDAlKTtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIHBhZGRpbmc6IDgwcHggMjBweCA2MHB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG4gICAgXG4gICAgLmhlcm8tYmctcGF0dGVybiB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDA7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICBib3R0b206IDA7XG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDIwJSA4MCUsIHJnYmEoMjU1LDI1NSwyNTUsMC4xKSAwJSwgdHJhbnNwYXJlbnQgNTAlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgODAlIDIwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjEpIDAlLCB0cmFuc3BhcmVudCA1MCUpO1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuICAgIFxuICAgIC5oZXJvLWNvbnRlbnQge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgei1pbmRleDogMjtcbiAgICAgIG1heC13aWR0aDogODAwcHg7XG4gICAgICBtYXJnaW46IDAgYXV0bztcbiAgICB9XG4gICAgXG4gICAgLmhlcm8tdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAzcmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNmZmYsICNlY2YwZjEpO1xuICAgICAgLXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG4gICAgICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICBiYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG4gICAgfVxuICAgIFxuICAgIC5oZXJvLXN1YnRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgb3BhY2l0eTogMC45O1xuICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICB9XG5cbiAgICAvKiBGaWx0ZXIgU2VjdGlvbiAqL1xuICAgIC5maWx0ZXItc2VjdGlvbiB7XG4gICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgIHBhZGRpbmc6IDQwcHggMjBweDtcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDEwcHggcmdiYSgwLDAsMCwwLjEpO1xuICAgIH1cbiAgICBcbiAgICAuZmlsdGVyLWNvbnRhaW5lciB7XG4gICAgICBtYXgtd2lkdGg6IDEyMDBweDtcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIH1cbiAgICBcbiAgICAuZmlsdGVyLWdyb3VwIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDIwcHg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB9XG4gICAgXG4gICAgLm1vZGVybi1zZWxlY3Qge1xuICAgICAgbWluLXdpZHRoOiAyNTBweDtcbiAgICB9XG5cbiAgICAvKiBMb2FkaW5nIFNlY3Rpb24gKi9cbiAgICAubG9hZGluZy1zZWN0aW9uIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgcGFkZGluZzogODBweCAyMHB4O1xuICAgICAgY29sb3I6ICM2NjY7XG4gICAgfVxuICAgIFxuICAgIC5sb2FkaW5nLXNlY3Rpb24gcCB7XG4gICAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgfSAgICAvKiBDb250ZW50IFNlY3Rpb24gKi9cbiAgICAuY29udGVudC1zZWN0aW9uIHtcbiAgICAgIG1heC13aWR0aDogMTIwMHB4O1xuICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICBwYWRkaW5nOiAwIDIwcHggNDBweDtcbiAgICB9ICAgIC8qIENvdXJzZSBIZWFkZXIgd2l0aCBJbnRlZ3JhdGVkIFRodW1ibmFpbCAqL1xuICAgIC5jb3Vyc2UtaGVhZGVyLXdpdGgtaW1hZ2Uge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogMjRweDtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgICB9XG4gICAgXG4gICAgLmNvdXJzZS1pbWFnZS1jb250YWluZXIge1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICB3aWR0aDogMjAwcHg7XG4gICAgfVxuICAgIFxuICAgIC5jb3Vyc2UtaW1hZ2UtaW50ZWdyYXRlZCB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogMTUwcHg7XG4gICAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxNnB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XG4gICAgfVxuICAgIFxuICAgIC5jb3Vyc2UtaW1hZ2UtaW50ZWdyYXRlZDpob3ZlciB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDIpO1xuICAgIH1cbiAgICBcbiAgICAuY291cnNlLXRpdGxlLWluZm8ge1xuICAgICAgZmxleDogMTtcbiAgICAgIG1pbi13aWR0aDogMDtcbiAgICB9XG4gICAgXG4gICAgLmNvdXJzZS1tYWluLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogIzJjM2U1MDtcbiAgICAgIG1hcmdpbjogOHB4IDAgMCAwO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgICB9XG5cbiAgICAvKiBDb3Vyc2UgSGVhZGluZyAqL1xuICAgIC5jb3Vyc2UtaGVhZGluZy1zZWN0aW9uIHtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIHBhZGRpbmc6IDQwcHg7XG4gICAgICBtYXJnaW46IDQwcHggMDtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDIwcHggcmdiYSgwLDAsMCwwLjEpO1xuICAgIH1cbiAgICBcbiAgICAuY291cnNlLWJyZWFkY3J1bWIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgIH1cbiAgICBcbiAgICAuYnJlYWRjcnVtYi1pdGVtLmN1cnJlbnQge1xuICAgICAgY29sb3I6ICMzZjUxYjU7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cbiAgICAgIC5icmVhZGNydW1iLXNlcGFyYXRvciB7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgfVxuICAgIFxuICAgIC5jb3Vyc2Utc3VtbWFyeSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgZ2FwOiAyMHB4O1xuICAgIH1cbiAgICBcbiAgICAuY291cnNlLXN0YXRzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgfVxuICAgIFxuICAgIC5zdGF0LWl0ZW0ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gICAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY29sb3I6ICM1NTU7XG4gICAgfVxuICAgICAgLnN0YXQtaXRlbSBtYXQtaWNvbiB7XG4gICAgICBjb2xvcjogIzNmNTFiNTtcbiAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICB9XG5cbiAgICAvKiBDb3Vyc2UgRGVzY3JpcHRpb24gU2VjdGlvbiAqL1xuICAgIC5jb3Vyc2UtZGVzY3JpcHRpb24tc2VjdGlvbiB7XG4gICAgICBtYXJnaW4tdG9wOiAyNHB4O1xuICAgICAgcGFkZGluZy10b3A6IDI0cHg7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2U5ZWNlZjtcbiAgICB9XG4gICAgXG4gICAgLmNvdXJzZS1kZXNjcmlwdGlvbiB7XG4gICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICAgIG1hcmdpbjogMDtcbiAgICB9XG5cbiAgICAvKiBUb3BpY3MgQ29udGFpbmVyICovXG4gICAgLnRvcGljcy1jb250YWluZXIge1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgcGFkZGluZzogNDBweDtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDIwcHggcmdiYSgwLDAsMCwwLjEpO1xuICAgIH1cbiAgICBcbiAgICAudG9waWNzLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgfVxuICAgIFxuICAgIC50b3BpY3MtdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAycmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiAjMmMzZTUwO1xuICAgICAgbWFyZ2luOiAwO1xuICAgIH1cbiAgICBcbiAgICAudG9waWNzLWFjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogMTJweDtcbiAgICB9XG5cbiAgICAvKiBUb3BpYyBCbG9ja3MgKi9cbiAgICAudG9waWMtYmxvY2sge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlMGUwZTA7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgfVxuICAgIFxuICAgIC50b3BpYy1ibG9jazpob3ZlciB7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAyMHB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgICB9XG4gICAgICAudG9waWMtaGVhZGVyLW1vZGVybiB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMjBweDtcbiAgICAgIHBhZGRpbmc6IDI0cHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XG4gICAgfVxuICAgIFxuICAgIC50b3BpYy1oZWFkZXItbW9kZXJuOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6ICNlOWVjZWY7XG4gICAgfVxuXG4gICAgLnRvcGljLWluZm8ge1xuICAgICAgZmxleDogMTtcbiAgICAgIG1pbi13aWR0aDogMDtcbiAgICB9XG4gICAgXG4gICAgLnRvcGljLW51bWJlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgd2lkdGg6IDYwcHg7XG4gICAgICBoZWlnaHQ6IDYwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjM2Y1MWI1LCAjNWM2YmMwKTtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIH1cbiAgICBcbiAgICAudG9waWMtaW5mbyB7XG4gICAgICBmbGV4OiAxO1xuICAgIH1cbiAgICBcbiAgICAudG9waWMtdGl0bGUtbW9kZXJuIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4zcmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiAjMmMzZTUwO1xuICAgICAgbWFyZ2luOiAwIDAgOHB4IDA7XG4gICAgfVxuICAgIFxuICAgIC50b3BpYy1kZXNjLW1vZGVybiB7XG4gICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgfVxuICAgIFxuICAgIC5leHBhbmQtYnV0dG9uIHtcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XG4gICAgfVxuICAgIFxuICAgIC5leHBhbmQtYnV0dG9uLmV4cGFuZGVkIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG4gICAgfVxuXG4gICAgLyogVG9waWMgUHJldmlldyAqL1xuICAgIC50b3BpYy1wcmV2aWV3IHtcbiAgICAgIHBhZGRpbmc6IDIwcHggMzBweDtcbiAgICAgIGJhY2tncm91bmQ6ICNmOGY5ZmY7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2UwZTdmZjtcbiAgICB9XG5cbiAgICAudG9waWMtc3RhdHMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogMjBweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgfVxuXG4gICAgLnRvcGljLXN0YXRzIC5zdGF0LWl0ZW0ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDZweDtcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cblxuICAgIC50b3BpYy1zdGF0cyAuc3RhdC1pdGVtIG1hdC1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgIHdpZHRoOiAxcmVtO1xuICAgICAgaGVpZ2h0OiAxcmVtO1xuICAgICAgY29sb3I6ICM2NjdlZWE7XG4gICAgfVxuXG4gICAgLnZpZXctaGludCB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgIGNvbG9yOiAjODg4O1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIH1cblxuICAgIC8qIExlc3NvbnMgR3JpZCAqL1xuICAgIC5sZXNzb25zLWdyaWQge1xuICAgICAgcGFkZGluZzogMDtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIH1cbiAgICBcbiAgICAubGVzc29ucy1ncmlkLmlubGluZS1leHBhbmRlZCB7XG4gICAgICBwYWRkaW5nOiAyNHB4O1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlMGUwZTA7XG4gICAgfVxuICAgIFxuICAgIC5sZXNzb24taXRlbSB7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YwZjBmMDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgfVxuICAgIFxuICAgIC5sZXNzb24taXRlbTpsYXN0LWNoaWxkIHtcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gICAgfVxuICAgIFxuICAgIC5sZXNzb24taXRlbTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgIH1cbiAgICBcbiAgICAubGVzc29uLWNvbnRlbnQge1xuICAgICAgcGFkZGluZzogMjBweCAyNHB4O1xuICAgIH1cbiAgICBcbiAgICAubGVzc29uLWhlYWRlci1tb2Rlcm4ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICAgIGdhcDogMTZweDtcbiAgICB9XG4gICAgXG4gICAgLmxlc3Nvbi10aXRsZS1tb2Rlcm4ge1xuICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6ICMyYzNlNTA7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBmbGV4OiAxO1xuICAgIH1cbiAgICBcbiAgICAubGVzc29uLXN0YXR1cyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiA4cHg7XG4gICAgICBmbGV4LXNocmluazogMDtcbiAgICB9XG4gICAgXG4gICAgLnN0YXR1cy1iYWRnZSB7XG4gICAgICBwYWRkaW5nOiA0cHggMTJweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIH1cbiAgICBcbiAgICAuc3RhdHVzLWJhZGdlLmZyZWUge1xuICAgICAgYmFja2dyb3VuZDogI2U4ZjVlODtcbiAgICAgIGNvbG9yOiAjMmU3ZDMyO1xuICAgIH1cbiAgICBcbiAgICAuc3RhdHVzLWJhZGdlLnByZW1pdW0ge1xuICAgICAgYmFja2dyb3VuZDogI2ZmZjNlMDtcbiAgICAgIGNvbG9yOiAjZjU3YzAwO1xuICAgIH1cbiAgICBcbiAgICAuZHVyYXRpb24tYmFkZ2Uge1xuICAgICAgcGFkZGluZzogMnB4IDhweDtcbiAgICAgIGJhY2tncm91bmQ6ICNmMGY0ZmY7XG4gICAgICBjb2xvcjogIzY2N2VlYTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBtYXJnaW4tbGVmdDogOHB4O1xuICAgIH1cbiAgICBcbiAgICAubGVzc29uLWRlc2MtbW9kZXJuIHtcbiAgICAgIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgICAgIG1hcmdpbjogMDtcbiAgICB9XG4gICAgXG4gICAgLmxlc3Nvbi1kZXNjLXByZXZpZXcge1xuICAgICAgbWF4LWhlaWdodDogNjBweDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuICAgIFxuICAgIC5sZXNzb24tZGVzYy1wcmV2aWV3OjphZnRlciB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIGhlaWdodDogMjBweDtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0cmFuc3BhcmVudCwgd2hpdGUpO1xuICAgIH1cbiAgICBcbiAgICAubGVzc29uLXByZXZpZXcge1xuICAgICAgb3BhY2l0eTogMC44O1xuICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2U7XG4gICAgfVxuICAgIFxuICAgIC5sZXNzb24tcHJldmlldzpob3ZlciB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cblxuICAgIC8qIEtleW5vdGVzICovXG4gICAgLmtleW5vdGVzLW1vZGVybiB7XG4gICAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICAgICAgcGFkZGluZy10b3A6IDE2cHg7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjBmMDtcbiAgICB9XG4gICAgXG4gICAgLnNlY3Rpb24tdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6ICMzZjUxYjU7XG4gICAgICBtYXJnaW46IDAgMCAxMnB4IDA7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICAgIH1cbiAgICBcbiAgICAua2V5bm90ZXMtbGlzdCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogMTJweDtcbiAgICB9XG4gICAgXG4gICAgLmtleW5vdGUtaXRlbSB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgcGFkZGluZzogMTJweDtcbiAgICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgIzNmNTFiNTtcbiAgICB9XG4gICAgXG4gICAgLmtleW5vdGUtaXRlbS5pbXBvcnRhbnQge1xuICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICNmZjU3MjI7XG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmM2UwO1xuICAgIH1cbiAgICBcbiAgICAua2V5bm90ZS1oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgICAgZ2FwOiAxMnB4O1xuICAgIH1cbiAgICBcbiAgICAua2V5bm90ZS10aXRsZS1tb2Rlcm4ge1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiAjMmMzZTUwO1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgfVxuICAgIFxuICAgIC5rZXlub3RlLW1ldGEge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogNnB4O1xuICAgIH1cbiAgICBcbiAgICAubWV0YS10YWcge1xuICAgICAgcGFkZGluZzogMnB4IDhweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBmb250LXNpemU6IDAuNzVyZW07XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cbiAgICBcbiAgICAubWV0YS10YWcucGxhbmV0IHtcbiAgICAgIGJhY2tncm91bmQ6ICNlOGY1ZTg7XG4gICAgICBjb2xvcjogIzJlN2QzMjtcbiAgICB9XG4gICAgXG4gICAgLm1ldGEtdGFnLnpvZGlhYyB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZTNmMmZkO1xuICAgICAgY29sb3I6ICMxOTc2ZDI7XG4gICAgfVxuICAgIFxuICAgIC5rZXlub3RlLWNvbnRlbnQtbW9kZXJuIHtcbiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICB9XG5cbiAgICAvKiBUYWdzICovXG4gICAgLnRhZ3MtbW9kZXJuIHtcbiAgICAgIG1hcmdpbi10b3A6IDE2cHg7XG4gICAgICBwYWRkaW5nLXRvcDogMTJweDtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGYwO1xuICAgIH1cbiAgICBcbiAgICAudGFnLWxpc3Qge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGdhcDogNnB4O1xuICAgIH1cbiAgICBcbiAgICAudGFnLW1vZGVybiB7XG4gICAgICBwYWRkaW5nOiA0cHggMTBweDtcbiAgICAgIGJhY2tncm91bmQ6ICNlOWVjZWY7XG4gICAgICBjb2xvcjogIzQ5NTA1NztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuXG4gICAgLyogTW9yZSBMZXNzb25zIEluZGljYXRvciAqL1xuICAgIC5tb3JlLWxlc3NvbnMtaW5kaWNhdG9yIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgbWFyZ2luOiAxMnB4IDI0cHg7XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICB9XG4gICAgXG4gICAgLmNsaWNrLWhpbnQge1xuICAgICAgY29sb3I6ICNmZjZiNmI7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cblxuICAgIC8qIE5vIERhdGEgKi9cbiAgICAubm8tZGF0YS1tb2Rlcm4ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA4MHB4IDIwcHg7XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gICAgXG4gICAgLm5vLWRhdGEtbW9kZXJuIG1hdC1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogNjRweDtcbiAgICAgIHdpZHRoOiA2NHB4O1xuICAgICAgaGVpZ2h0OiA2NHB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgIGNvbG9yOiAjY2NjO1xuICAgIH1cbiAgICBcbiAgICAubm8tZGF0YS1tb2Rlcm4gaDMge1xuICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgfVxuXG4gICAgLyogVG9waWMgQWN0aW9ucyAqL1xuICAgIC50b3BpYy1hY3Rpb25zIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA4cHg7XG4gICAgfVxuXG4gICAgLmRldGFpbC1idXR0b24ge1xuICAgICAgY29sb3I6ICM2NjdlZWEgIWltcG9ydGFudDtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMTAyLCAxMjYsIDIzNCwgMC4xKTtcbiAgICB9XG5cbiAgICAuZGV0YWlsLWJ1dHRvbjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuMik7XG4gICAgfVxuXG4gICAgLyogTGVzc29ucyBIZWFkZXIgKi9cbiAgICAubGVzc29ucy1oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiAxNnB4IDA7XG4gICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2UwZTdmZjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgfVxuXG4gICAgLmxlc3NvbnMtc2VjdGlvbi10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogIzMzMztcbiAgICAgIG1hcmdpbjogMDtcbiAgICB9XG5cbiAgICAudmlldy1kZXRhaWxzLWJ0biB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgfSAgICAvKiBMZXNzb24gTWV0YSBJbmZvICovXG4gICAgLmxlc3Nvbi1tZXRhLWluZm8ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogMTZweDtcbiAgICAgIG1hcmdpbi10b3A6IDEycHg7XG4gICAgICBwYWRkaW5nLXRvcDogMTJweDtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmNGZmO1xuICAgIH1cblxuICAgIC5tZXRhLWl0ZW0ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDRweDtcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xuICAgIH1cblxuICAgIC5tZXRhLWl0ZW0gbWF0LWljb24ge1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgd2lkdGg6IDFyZW07XG4gICAgICBoZWlnaHQ6IDFyZW07XG4gICAgICBjb2xvcjogIzY2N2VlYTtcbiAgICB9XG5cbiAgICAvKiBMZXNzb24gQWN0aW9ucyAqL1xuICAgIC5sZXNzb24tYWN0aW9ucyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBtYXJnaW4tdG9wOiAxNnB4O1xuICAgICAgcGFkZGluZy10b3A6IDEycHg7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjRmZjtcbiAgICB9XG5cbiAgICAudmlldy1sZXNzb24tZGV0YWlscy1idG4ge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKSAhaW1wb3J0YW50O1xuICAgICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gICAgICBmb250LXdlaWdodDogNjAwICFpbXBvcnRhbnQ7XG4gICAgICBwYWRkaW5nOiA4cHggMTZweCAhaW1wb3J0YW50O1xuICAgICAgYm9yZGVyLXJhZGl1czogMjBweCAhaW1wb3J0YW50O1xuICAgICAgZm9udC1zaXplOiAwLjlyZW0gIWltcG9ydGFudDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UgIWltcG9ydGFudDtcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuMykgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAudmlldy1sZXNzb24tZGV0YWlscy1idG46aG92ZXIge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpICFpbXBvcnRhbnQ7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMTAyLCAxMjYsIDIzNCwgMC40KSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC52aWV3LWxlc3Nvbi1kZXRhaWxzLWJ0biBtYXQtaWNvbiB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDRweCAhaW1wb3J0YW50O1xuICAgICAgZm9udC1zaXplOiAxLjFyZW0gIWltcG9ydGFudDtcbiAgICB9ICAgIC8qIFJlc3BvbnNpdmUgRGVzaWduICovXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgICAuaGVyby10aXRsZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmZpbHRlci1ncm91cCB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICAgICAgfVxuICAgICAgXG4gICAgICAubW9kZXJuLXNlbGVjdCB7XG4gICAgICAgIG1pbi13aWR0aDogYXV0bztcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmNvdXJzZS1oZWFkZXItd2l0aC1pbWFnZSB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGdhcDogMTZweDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmNvdXJzZS1pbWFnZS1jb250YWluZXIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmNvdXJzZS1pbWFnZS1pbnRlZ3JhdGVkIHtcbiAgICAgICAgaGVpZ2h0OiAyMDBweDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmNvdXJzZS1tYWluLXRpdGxlIHtcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICB9XG4gICAgICAgIC5jb3Vyc2UtaGVhZGluZy1zZWN0aW9uLFxuICAgICAgLnRvcGljcy1jb250YWluZXIge1xuICAgICAgICBwYWRkaW5nOiAyNHB4O1xuICAgICAgICBtYXJnaW46IDI0cHggMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmNvdXJzZS1zdW1tYXJ5IHtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5jb3Vyc2Utc3RhdHMge1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLnRvcGljcy1oZWFkZXIge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLnRvcGljcy1hY3Rpb25zIHtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC50b3BpYy1oZWFkZXItbW9kZXJuIHtcbiAgICAgICAgcGFkZGluZzogMTZweDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmxlc3Nvbi1jb250ZW50IHtcbiAgICAgICAgcGFkZGluZzogMTZweDtcbiAgICAgIH1cbiAgICB9XG4gICJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvY291cnNlcy9jdXN0b21lci1jb3Vyc2Utdmlldy9jdXN0b21lci1jb3Vyc2Utdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0k7RUFDRSxpQkFBQTtFQUNBLDZEQUFBO0FBQU47O0FBR0ksaUJBQUE7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsNkRBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBQU47O0FBR0k7RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxvTEFBQTtFQUVBLG9CQUFBO0FBRE47O0FBSUk7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFETjs7QUFJSTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaURBQUE7RUFDQSw2QkFBQTtFQUNBLG9DQUFBO0VBQ0EscUJBQUE7QUFETjs7QUFJSTtFQUNFLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBRE47O0FBSUksbUJBQUE7QUFDQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5Q0FBQTtBQUROOztBQUlJO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0FBRE47O0FBSUk7RUFDRSxhQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQTtBQUROOztBQUlJO0VBQ0UsZ0JBQUE7QUFETjs7QUFJSSxvQkFBQTtBQUNBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQUROOztBQUlJO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtBQUROLEVBRVMsb0JBQUE7QUFDTDtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0FBRE4sRUFFUyw0Q0FBQTtBQUNMO0VBQ0UsYUFBQTtFQUNBLFNBQUE7RUFDQSx1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O0lBQ0Usc0JBQUE7SUFDQSxTQUFBO0VBRE47RUFJSTtJQUNFLFdBQUE7RUFGTjtFQUtJO0lBQ0UsYUFBQTtFQUhOO0VBTUk7SUFDRSxpQkFBQTtFQUpOO0VBTU07O0lBRUEsYUFBQTtJQUNBLGNBQUE7RUFKTjtFQU9JO0lBQ0Usc0JBQUE7SUFDQSxvQkFBQTtFQUxOO0VBUUk7SUFDRSx1QkFBQTtFQU5OO0VBU0k7SUFDRSxzQkFBQTtJQUNBLG9CQUFBO0VBUE47RUFVSTtJQUNFLHVCQUFBO0VBUk47RUFXSTtJQUNFLGFBQUE7RUFUTjtFQVlJO0lBQ0UsYUFBQTtFQVZOO0FBQ0Y7QUFDQSxnazNCQUFnazNCIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLm1vZGVybi1jdXN0b21lci12aWV3IHtcbiAgICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2Y1ZjdmYSAwJSwgI2MzY2ZlMiAxMDAlKTtcbiAgICB9XG5cbiAgICAvKiBIZXJvIFNlY3Rpb24gKi9cbiAgICAuaGVyby1zZWN0aW9uIHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMyYzNlNTAgMCUsICMzNDQ5NWUgMTAwJSk7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBwYWRkaW5nOiA4MHB4IDIwcHggNjBweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgfVxuICAgIFxuICAgIC5oZXJvLWJnLXBhdHRlcm4ge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgYmFja2dyb3VuZC1pbWFnZTogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCAyMCUgODAlLCByZ2JhKDI1NSwyNTUsMjU1LDAuMSkgMCUsIHRyYW5zcGFyZW50IDUwJSksXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDgwJSAyMCUsIHJnYmEoMjU1LDI1NSwyNTUsMC4xKSAwJSwgdHJhbnNwYXJlbnQgNTAlKTtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIH1cbiAgICBcbiAgICAuaGVyby1jb250ZW50IHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHotaW5kZXg6IDI7XG4gICAgICBtYXgtd2lkdGg6IDgwMHB4O1xuICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgfVxuICAgIFxuICAgIC5oZXJvLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogM3JlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZmZmLCAjZWNmMGYxKTtcbiAgICAgIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xuICAgICAgLXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xuICAgIH1cbiAgICBcbiAgICAuaGVyby1zdWJ0aXRsZSB7XG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgIG9wYWNpdHk6IDAuOTtcbiAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgfVxuXG4gICAgLyogRmlsdGVyIFNlY3Rpb24gKi9cbiAgICAuZmlsdGVyLXNlY3Rpb24ge1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBwYWRkaW5nOiA0MHB4IDIwcHg7XG4gICAgICBib3gtc2hhZG93OiAwIDJweCAxMHB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgICB9XG4gICAgXG4gICAgLmZpbHRlci1jb250YWluZXIge1xuICAgICAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gICAgICBtYXJnaW46IDAgYXV0bztcbiAgICB9XG4gICAgXG4gICAgLmZpbHRlci1ncm91cCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiAyMHB4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgfVxuICAgIFxuICAgIC5tb2Rlcm4tc2VsZWN0IHtcbiAgICAgIG1pbi13aWR0aDogMjUwcHg7XG4gICAgfVxuXG4gICAgLyogTG9hZGluZyBTZWN0aW9uICovXG4gICAgLmxvYWRpbmctc2VjdGlvbiB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IDgwcHggMjBweDtcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgIH1cbiAgICBcbiAgICAubG9hZGluZy1zZWN0aW9uIHAge1xuICAgICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgIH0gICAgLyogQ29udGVudCBTZWN0aW9uICovXG4gICAgLmNvbnRlbnQtc2VjdGlvbiB7XG4gICAgICBtYXgtd2lkdGg6IDEyMDBweDtcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgcGFkZGluZzogMCAyMHB4IDQwcHg7XG4gICAgfSAgICAvKiBDb3Vyc2UgSGVhZGVyIHdpdGggSW50ZWdyYXRlZCBUaHVtYm5haWwgKi9cbiAgICAuY291cnNlLWhlYWRlci13aXRoLWltYWdlIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDI0cHg7XG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gICAgfVxuICAgIFxuICAgIC5jb3Vyc2UtaW1hZ2UtY29udGFpbmVyIHtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAgd2lkdGg6IDIwMHB4O1xuICAgIH1cbiAgICBcbiAgICAuY291cnNlLWltYWdlLWludGVncmF0ZWQge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDE1MHB4O1xuICAgICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgYm94LXNoYWRvdzogMCA0cHggMTZweCByZ2JhKDAsMCwwLDAuMSk7XG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xuICAgIH1cbiAgICBcbiAgICAuY291cnNlLWltYWdlLWludGVncmF0ZWQ6aG92ZXIge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjAyKTtcbiAgICB9XG4gICAgXG4gICAgLmNvdXJzZS10aXRsZS1pbmZvIHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBtaW4td2lkdGg6IDA7XG4gICAgfVxuICAgIFxuICAgIC5jb3Vyc2UtbWFpbi10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDJyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6ICMyYzNlNTA7XG4gICAgICBtYXJnaW46IDhweCAwIDAgMDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjI7XG4gICAgfVxuXG4gICAgLyogQ291cnNlIEhlYWRpbmcgKi9cbiAgICAuY291cnNlLWhlYWRpbmctc2VjdGlvbiB7XG4gICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBwYWRkaW5nOiA0MHB4O1xuICAgICAgbWFyZ2luOiA0MHB4IDA7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAyMHB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgICB9XG4gICAgXG4gICAgLmNvdXJzZS1icmVhZGNydW1iIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA4cHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICB9XG4gICAgXG4gICAgLmJyZWFkY3J1bWItaXRlbS5jdXJyZW50IHtcbiAgICAgIGNvbG9yOiAjM2Y1MWI1O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG4gICAgICAuYnJlYWRjcnVtYi1zZXBhcmF0b3Ige1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgIH1cbiAgICBcbiAgICAuY291cnNlLXN1bW1hcnkge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGdhcDogMjBweDtcbiAgICB9XG4gICAgXG4gICAgLmNvdXJzZS1zdGF0cyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiAxNnB4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgIH1cbiAgICBcbiAgICAuc3RhdC1pdGVtIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA4cHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgICAgcGFkZGluZzogMTJweCAxNnB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGNvbG9yOiAjNTU1O1xuICAgIH1cbiAgICAgIC5zdGF0LWl0ZW0gbWF0LWljb24ge1xuICAgICAgY29sb3I6ICMzZjUxYjU7XG4gICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgfVxuXG4gICAgLyogQ291cnNlIERlc2NyaXB0aW9uIFNlY3Rpb24gKi9cbiAgICAuY291cnNlLWRlc2NyaXB0aW9uLXNlY3Rpb24ge1xuICAgICAgbWFyZ2luLXRvcDogMjRweDtcbiAgICAgIHBhZGRpbmctdG9wOiAyNHB4O1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlOWVjZWY7XG4gICAgfVxuICAgIFxuICAgIC5jb3Vyc2UtZGVzY3JpcHRpb24ge1xuICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgICBsaW5lLWhlaWdodDogMS42O1xuICAgICAgY29sb3I6ICM2NjY7XG4gICAgICBtYXJnaW46IDA7XG4gICAgfVxuXG4gICAgLyogVG9waWNzIENvbnRhaW5lciAqL1xuICAgIC50b3BpY3MtY29udGFpbmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIHBhZGRpbmc6IDQwcHg7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAyMHB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgICB9XG4gICAgXG4gICAgLnRvcGljcy1oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgZ2FwOiAxNnB4O1xuICAgIH1cbiAgICBcbiAgICAudG9waWNzLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogIzJjM2U1MDtcbiAgICAgIG1hcmdpbjogMDtcbiAgICB9XG4gICAgXG4gICAgLnRvcGljcy1hY3Rpb25zIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDEycHg7XG4gICAgfVxuXG4gICAgLyogVG9waWMgQmxvY2tzICovXG4gICAgLnRvcGljLWJsb2NrIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICAgIH1cbiAgICBcbiAgICAudG9waWMtYmxvY2s6aG92ZXIge1xuICAgICAgYm94LXNoYWRvdzogMCA0cHggMjBweCByZ2JhKDAsMCwwLDAuMSk7XG4gICAgfVxuICAgICAgLnRvcGljLWhlYWRlci1tb2Rlcm4ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDIwcHg7XG4gICAgICBwYWRkaW5nOiAyNHB4O1xuICAgICAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xuICAgIH1cbiAgICBcbiAgICAudG9waWMtaGVhZGVyLW1vZGVybjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZTllY2VmO1xuICAgIH1cblxuICAgIC50b3BpYy1pbmZvIHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBtaW4td2lkdGg6IDA7XG4gICAgfVxuICAgIFxuICAgIC50b3BpYy1udW1iZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIHdpZHRoOiA2MHB4O1xuICAgICAgaGVpZ2h0OiA2MHB4O1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzNmNTFiNSwgIzVjNmJjMCk7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBmbGV4LXNocmluazogMDtcbiAgICB9XG4gICAgXG4gICAgLnRvcGljLWluZm8ge1xuICAgICAgZmxleDogMTtcbiAgICB9XG4gICAgXG4gICAgLnRvcGljLXRpdGxlLW1vZGVybiB7XG4gICAgICBmb250LXNpemU6IDEuM3JlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogIzJjM2U1MDtcbiAgICAgIG1hcmdpbjogMCAwIDhweCAwO1xuICAgIH1cbiAgICBcbiAgICAudG9waWMtZGVzYy1tb2Rlcm4ge1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgY29sb3I6ICM2NjY7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgIH1cbiAgICBcbiAgICAuZXhwYW5kLWJ1dHRvbiB7XG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xuICAgIH1cbiAgICBcbiAgICAuZXhwYW5kLWJ1dHRvbi5leHBhbmRlZCB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuICAgIH1cblxuICAgIC8qIFRvcGljIFByZXZpZXcgKi9cbiAgICAudG9waWMtcHJldmlldyB7XG4gICAgICBwYWRkaW5nOiAyMHB4IDMwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZmO1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlMGU3ZmY7XG4gICAgfVxuXG4gICAgLnRvcGljLXN0YXRzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDIwcHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgIH1cblxuICAgIC50b3BpYy1zdGF0cyAuc3RhdC1pdGVtIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA2cHg7XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG5cbiAgICAudG9waWMtc3RhdHMgLnN0YXQtaXRlbSBtYXQtaWNvbiB7XG4gICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICB3aWR0aDogMXJlbTtcbiAgICAgIGhlaWdodDogMXJlbTtcbiAgICAgIGNvbG9yOiAjNjY3ZWVhO1xuICAgIH1cblxuICAgIC52aWV3LWhpbnQge1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICBjb2xvcjogIzg4ODtcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICB9XG5cbiAgICAvKiBMZXNzb25zIEdyaWQgKi9cbiAgICAubGVzc29ucy1ncmlkIHtcbiAgICAgIHBhZGRpbmc6IDA7XG4gICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICB9XG4gICAgXG4gICAgLmxlc3NvbnMtZ3JpZC5pbmxpbmUtZXhwYW5kZWQge1xuICAgICAgcGFkZGluZzogMjRweDtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTBlMGUwO1xuICAgIH1cbiAgICBcbiAgICAubGVzc29uLWl0ZW0ge1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjA7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICAgIH1cbiAgICBcbiAgICAubGVzc29uLWl0ZW06bGFzdC1jaGlsZCB7XG4gICAgICBib3JkZXItYm90dG9tOiBub25lO1xuICAgIH1cbiAgICBcbiAgICAubGVzc29uLWl0ZW06aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcbiAgICB9XG4gICAgXG4gICAgLmxlc3Nvbi1jb250ZW50IHtcbiAgICAgIHBhZGRpbmc6IDIwcHggMjRweDtcbiAgICB9XG4gICAgXG4gICAgLmxlc3Nvbi1oZWFkZXItbW9kZXJuIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgfVxuICAgIFxuICAgIC5sZXNzb24tdGl0bGUtbW9kZXJuIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiAjMmMzZTUwO1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgZmxleDogMTtcbiAgICB9XG4gICAgXG4gICAgLmxlc3Nvbi1zdGF0dXMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgfVxuICAgIFxuICAgIC5zdGF0dXMtYmFkZ2Uge1xuICAgICAgcGFkZGluZzogNHB4IDEycHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICB9XG4gICAgXG4gICAgLnN0YXR1cy1iYWRnZS5mcmVlIHtcbiAgICAgIGJhY2tncm91bmQ6ICNlOGY1ZTg7XG4gICAgICBjb2xvcjogIzJlN2QzMjtcbiAgICB9XG4gICAgXG4gICAgLnN0YXR1cy1iYWRnZS5wcmVtaXVtIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmYzZTA7XG4gICAgICBjb2xvcjogI2Y1N2MwMDtcbiAgICB9XG4gICAgXG4gICAgLmR1cmF0aW9uLWJhZGdlIHtcbiAgICAgIHBhZGRpbmc6IDJweCA4cHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjBmNGZmO1xuICAgICAgY29sb3I6ICM2NjdlZWE7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBmb250LXNpemU6IDAuNzVyZW07XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgbWFyZ2luLWxlZnQ6IDhweDtcbiAgICB9XG4gICAgXG4gICAgLmxlc3Nvbi1kZXNjLW1vZGVybiB7XG4gICAgICBmb250LXNpemU6IDAuOTVyZW07XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgICBtYXJnaW46IDA7XG4gICAgfVxuICAgIFxuICAgIC5sZXNzb24tZGVzYy1wcmV2aWV3IHtcbiAgICAgIG1heC1oZWlnaHQ6IDYwcHg7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cbiAgICBcbiAgICAubGVzc29uLWRlc2MtcHJldmlldzo6YWZ0ZXIge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBib3R0b206IDA7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICBoZWlnaHQ6IDIwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodHJhbnNwYXJlbnQsIHdoaXRlKTtcbiAgICB9XG4gICAgXG4gICAgLmxlc3Nvbi1wcmV2aWV3IHtcbiAgICAgIG9wYWNpdHk6IDAuODtcbiAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlO1xuICAgIH1cbiAgICBcbiAgICAubGVzc29uLXByZXZpZXc6aG92ZXIge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG5cbiAgICAvKiBLZXlub3RlcyAqL1xuICAgIC5rZXlub3Rlcy1tb2Rlcm4ge1xuICAgICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICAgIHBhZGRpbmctdG9wOiAxNnB4O1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjA7XG4gICAgfVxuICAgIFxuICAgIC5zZWN0aW9uLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiAjM2Y1MWI1O1xuICAgICAgbWFyZ2luOiAwIDAgMTJweCAwO1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgICB9XG4gICAgXG4gICAgLmtleW5vdGVzLWxpc3Qge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBnYXA6IDEycHg7XG4gICAgfVxuICAgIFxuICAgIC5rZXlub3RlLWl0ZW0ge1xuICAgICAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIHBhZGRpbmc6IDEycHg7XG4gICAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICMzZjUxYjU7XG4gICAgfVxuICAgIFxuICAgIC5rZXlub3RlLWl0ZW0uaW1wb3J0YW50IHtcbiAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAjZmY1NzIyO1xuICAgICAgYmFja2dyb3VuZDogI2ZmZjNlMDtcbiAgICB9XG4gICAgXG4gICAgLmtleW5vdGUtaGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgIGdhcDogMTJweDtcbiAgICB9XG4gICAgXG4gICAgLmtleW5vdGUtdGl0bGUtbW9kZXJuIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogIzJjM2U1MDtcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgIH1cbiAgICBcbiAgICAua2V5bm90ZS1tZXRhIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDZweDtcbiAgICB9XG4gICAgXG4gICAgLm1ldGEtdGFnIHtcbiAgICAgIHBhZGRpbmc6IDJweCA4cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG4gICAgXG4gICAgLm1ldGEtdGFnLnBsYW5ldCB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZThmNWU4O1xuICAgICAgY29sb3I6ICMyZTdkMzI7XG4gICAgfVxuICAgIFxuICAgIC5tZXRhLXRhZy56b2RpYWMge1xuICAgICAgYmFja2dyb3VuZDogI2UzZjJmZDtcbiAgICAgIGNvbG9yOiAjMTk3NmQyO1xuICAgIH1cbiAgICBcbiAgICAua2V5bm90ZS1jb250ZW50LW1vZGVybiB7XG4gICAgICBmb250LXNpemU6IDAuODVyZW07XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgfVxuXG4gICAgLyogVGFncyAqL1xuICAgIC50YWdzLW1vZGVybiB7XG4gICAgICBtYXJnaW4tdG9wOiAxNnB4O1xuICAgICAgcGFkZGluZy10b3A6IDEycHg7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjBmMDtcbiAgICB9XG4gICAgXG4gICAgLnRhZy1saXN0IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBnYXA6IDZweDtcbiAgICB9XG4gICAgXG4gICAgLnRhZy1tb2Rlcm4ge1xuICAgICAgcGFkZGluZzogNHB4IDEwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZTllY2VmO1xuICAgICAgY29sb3I6ICM0OTUwNTc7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cblxuICAgIC8qIE1vcmUgTGVzc29ucyBJbmRpY2F0b3IgKi9cbiAgICAubW9yZS1sZXNzb25zLWluZGljYXRvciB7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiAxNnB4O1xuICAgICAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIG1hcmdpbjogMTJweCAyNHB4O1xuICAgICAgY29sb3I6ICM2NjY7XG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuICAgIFxuICAgIC5jbGljay1oaW50IHtcbiAgICAgIGNvbG9yOiAjZmY2YjZiO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG5cbiAgICAvKiBObyBEYXRhICovXG4gICAgLm5vLWRhdGEtbW9kZXJuIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgcGFkZGluZzogODBweCAyMHB4O1xuICAgICAgY29sb3I6ICM2NjY7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuICAgIFxuICAgIC5uby1kYXRhLW1vZGVybiBtYXQtaWNvbiB7XG4gICAgICBmb250LXNpemU6IDY0cHg7XG4gICAgICB3aWR0aDogNjRweDtcbiAgICAgIGhlaWdodDogNjRweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICBjb2xvcjogI2NjYztcbiAgICB9XG4gICAgXG4gICAgLm5vLWRhdGEtbW9kZXJuIGgzIHtcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgIH1cblxuICAgIC8qIFRvcGljIEFjdGlvbnMgKi9cbiAgICAudG9waWMtYWN0aW9ucyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogOHB4O1xuICAgIH1cblxuICAgIC5kZXRhaWwtYnV0dG9uIHtcbiAgICAgIGNvbG9yOiAjNjY3ZWVhICFpbXBvcnRhbnQ7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuMSk7XG4gICAgfVxuXG4gICAgLmRldGFpbC1idXR0b246aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgxMDIsIDEyNiwgMjM0LCAwLjIpO1xuICAgIH1cblxuICAgIC8qIExlc3NvbnMgSGVhZGVyICovXG4gICAgLmxlc3NvbnMtaGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgcGFkZGluZzogMTZweCAwO1xuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNlMGU3ZmY7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICAgIH1cblxuICAgIC5sZXNzb25zLXNlY3Rpb24tdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgICBtYXJnaW46IDA7XG4gICAgfVxuXG4gICAgLnZpZXctZGV0YWlscy1idG4ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgIH0gICAgLyogTGVzc29uIE1ldGEgSW5mbyAqL1xuICAgIC5sZXNzb24tbWV0YS1pbmZvIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgICBtYXJnaW4tdG9wOiAxMnB4O1xuICAgICAgcGFkZGluZy10b3A6IDEycHg7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjRmZjtcbiAgICB9XG5cbiAgICAubWV0YS1pdGVtIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBjb2xvcjogIzY2NjtcbiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICB9XG5cbiAgICAubWV0YS1pdGVtIG1hdC1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgIHdpZHRoOiAxcmVtO1xuICAgICAgaGVpZ2h0OiAxcmVtO1xuICAgICAgY29sb3I6ICM2NjdlZWE7XG4gICAgfVxuXG4gICAgLyogTGVzc29uIEFjdGlvbnMgKi9cbiAgICAubGVzc29uLWFjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgbWFyZ2luLXRvcDogMTZweDtcbiAgICAgIHBhZGRpbmctdG9wOiAxMnB4O1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGY0ZmY7XG4gICAgfVxuXG4gICAgLnZpZXctbGVzc29uLWRldGFpbHMtYnRuIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2NjdlZWEgMCUsICM3NjRiYTIgMTAwJSkgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMCAhaW1wb3J0YW50O1xuICAgICAgcGFkZGluZzogOHB4IDE2cHggIWltcG9ydGFudDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHggIWltcG9ydGFudDtcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtICFpbXBvcnRhbnQ7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlICFpbXBvcnRhbnQ7XG4gICAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgxMDIsIDEyNiwgMjM0LCAwLjMpICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLnZpZXctbGVzc29uLWRldGFpbHMtYnRuOmhvdmVyIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KSAhaW1wb3J0YW50O1xuICAgICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuNCkgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAudmlldy1sZXNzb24tZGV0YWlscy1idG4gbWF0LWljb24ge1xuICAgICAgbWFyZ2luLXJpZ2h0OiA0cHggIWltcG9ydGFudDtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtICFpbXBvcnRhbnQ7XG4gICAgfSAgICAvKiBSZXNwb25zaXZlIERlc2lnbiAqL1xuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgLmhlcm8tdGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDJyZW07XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5maWx0ZXItZ3JvdXAge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLm1vZGVybi1zZWxlY3Qge1xuICAgICAgICBtaW4td2lkdGg6IGF1dG87XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5jb3Vyc2UtaGVhZGVyLXdpdGgtaW1hZ2Uge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBnYXA6IDE2cHg7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5jb3Vyc2UtaW1hZ2UtY29udGFpbmVyIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5jb3Vyc2UtaW1hZ2UtaW50ZWdyYXRlZCB7XG4gICAgICAgIGhlaWdodDogMjAwcHg7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5jb3Vyc2UtbWFpbi10aXRsZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgfVxuICAgICAgICAuY291cnNlLWhlYWRpbmctc2VjdGlvbixcbiAgICAgIC50b3BpY3MtY29udGFpbmVyIHtcbiAgICAgICAgcGFkZGluZzogMjRweDtcbiAgICAgICAgbWFyZ2luOiAyNHB4IDA7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5jb3Vyc2Utc3VtbWFyeSB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICAgICAgfVxuICAgICAgXG4gICAgICAuY291cnNlLXN0YXRzIHtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC50b3BpY3MtaGVhZGVyIHtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC50b3BpY3MtYWN0aW9ucyB7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgfVxuICAgICAgXG4gICAgICAudG9waWMtaGVhZGVyLW1vZGVybiB7XG4gICAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5sZXNzb24tY29udGVudCB7XG4gICAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICB9XG4gICAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
      });
    }
  }
  return CustomerCourseViewComponent;
})();

/***/ }),

/***/ 5850:
/*!************************************************************************************!*\
  !*** ./src/app/pages/courses/lesson-detail-modal/lesson-detail-modal.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LessonDetailModalComponent: () => (/* binding */ LessonDetailModalComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 2587);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/chips */ 2772);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/divider */ 4102);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _service_lesson_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/lesson.service */ 2969);
















function LessonDetailModalComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-progress-spinner", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Loading lesson details...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function LessonDetailModalComponent_div_15_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 28)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "schedule");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.lessonDetail.durationMinutes, " minutes ");
  }
}
function LessonDetailModalComponent_div_15_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 29)(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Content");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", ctx_r0.lessonDetail.content, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
  }
}
function LessonDetailModalComponent_div_15_div_18_div_7_div_7_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Important");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function LessonDetailModalComponent_div_15_div_18_div_7_div_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const keynote_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](keynote_r2.relatedPlanet);
  }
}
function LessonDetailModalComponent_div_15_div_18_div_7_div_7_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const keynote_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](keynote_r2.relatedZodiac);
  }
}
function LessonDetailModalComponent_div_15_div_18_div_7_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, LessonDetailModalComponent_div_15_div_18_div_7_div_7_span_1_Template, 2, 0, "span", 41)(2, LessonDetailModalComponent_div_15_div_18_div_7_div_7_span_2_Template, 2, 1, "span", 42)(3, LessonDetailModalComponent_div_15_div_18_div_7_div_7_span_3_Template, 2, 1, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const keynote_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", keynote_r2.isImportant);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", keynote_r2.relatedPlanet);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", keynote_r2.relatedZodiac);
  }
}
function LessonDetailModalComponent_div_15_div_18_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 34)(1, "div", 35)(2, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "h5", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, LessonDetailModalComponent_div_15_div_18_div_7_div_7_Template, 4, 3, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const keynote_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("important", keynote_r2.isImportant);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](i_r3 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](keynote_r2.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", keynote_r2.content, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", keynote_r2.isImportant || keynote_r2.relatedPlanet || keynote_r2.relatedZodiac);
  }
}
function LessonDetailModalComponent_div_15_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31)(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\n+ ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "lightbulb");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, LessonDetailModalComponent_div_15_div_18_div_7_Template, 8, 6, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Key Insights (", ctx_r0.lessonDetail.keynotes.length, ") ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.getSortedKeynotes());
  }
}
function LessonDetailModalComponent_div_15_div_19_a_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 52)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "play_circle_filled");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Video");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", ctx_r0.lessonDetail.videoUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function LessonDetailModalComponent_div_15_div_19_a_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 53)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "headphones");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Audio");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", ctx_r0.lessonDetail.audioUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function LessonDetailModalComponent_div_15_div_19_a_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 54)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "description");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Document");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", ctx_r0.lessonDetail.documentUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function LessonDetailModalComponent_div_15_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 47)(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Resources");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, LessonDetailModalComponent_div_15_div_19_a_4_Template, 5, 1, "a", 49)(5, LessonDetailModalComponent_div_15_div_19_a_5_Template, 5, 1, "a", 50)(6, LessonDetailModalComponent_div_15_div_19_a_6_Template, 5, 1, "a", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.lessonDetail.videoUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.lessonDetail.audioUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.lessonDetail.documentUrl);
  }
}
function LessonDetailModalComponent_div_15_div_20_mat_chip_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tag_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](tag_r4.tagName);
  }
}
function LessonDetailModalComponent_div_15_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 55)(1, "h4")(2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "local_offer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, " Tags ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 56)(6, "mat-chip-set");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, LessonDetailModalComponent_div_15_div_20_mat_chip_7_Template, 2, 1, "mat-chip", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.lessonDetail.tags);
  }
}
function LessonDetailModalComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 14)(1, "div", 15)(2, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 17)(5, "h3", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, LessonDetailModalComponent_div_15_span_8_Template, 4, 1, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "span", 21)(10, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 22)(14, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, LessonDetailModalComponent_div_15_div_17_Template, 4, 1, "div", 24)(18, LessonDetailModalComponent_div_15_div_18_Template, 8, 2, "div", 25)(19, LessonDetailModalComponent_div_15_div_19_Template, 7, 3, "div", 26)(20, LessonDetailModalComponent_div_15_div_20_Template, 8, 1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.lessonDetail.orderNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.lessonDetail.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.lessonDetail.durationMinutes);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx_r0.lessonDetail.isFree ? "free" : "premium");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.lessonDetail.isFree ? "card_giftcard" : "star");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.lessonDetail.isFree ? "Free" : "Premium", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", ctx_r0.lessonDetail.description, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.lessonDetail.content);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.lessonDetail.keynotes && ctx_r0.lessonDetail.keynotes.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.lessonDetail.videoUrl || ctx_r0.lessonDetail.audioUrl || ctx_r0.lessonDetail.documentUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.lessonDetail.tags && ctx_r0.lessonDetail.tags.length > 0);
  }
}
function LessonDetailModalComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 58)(1, "mat-icon", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "error_outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Lesson not found");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "The requested lesson could not be loaded.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
let LessonDetailModalComponent = /*#__PURE__*/(() => {
  class LessonDetailModalComponent {
    constructor(dialogRef, data, lessonService) {
      this.dialogRef = dialogRef;
      this.data = data;
      this.lessonService = lessonService;
      this.lessonDetail = null;
      this.loading = true;
    }
    ngOnInit() {
      this.loadLessonDetails(this.data.lessonId);
    }
    loadLessonDetails(lessonId) {
      this.lessonService.getLessonDetails(lessonId).subscribe({
        next: lessonDetail => {
          this.lessonDetail = lessonDetail;
          this.loading = false;
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
        if (a.orderSequence !== undefined && b.orderSequence !== undefined) {
          return a.orderSequence - b.orderSequence;
        }
        return a.keynoteId - b.keynoteId;
      });
    }
    close() {
      this.dialogRef.close();
    }
    static {
      this.ɵfac = function LessonDetailModalComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || LessonDetailModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_service_lesson_service__WEBPACK_IMPORTED_MODULE_0__.LessonService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: LessonDetailModalComponent,
        selectors: [["app-lesson-detail-modal"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
        decls: 20,
        vars: 3,
        consts: [[1, "lesson-modal-wrapper"], [1, "lesson-modal-header"], [1, "header-left"], ["mat-icon-button", "", "title", "Back", 1, "back-button", 3, "click"], ["mat-dialog-title", ""], ["mat-icon-button", "", "title", "Close", 1, "close-button", 3, "click"], [1, "lesson-modal-content"], ["class", "loading-container", 4, "ngIf"], ["class", "lesson-content", 4, "ngIf"], ["class", "error-container", 4, "ngIf"], ["align", "end"], ["mat-button", "", 3, "click"], [1, "loading-container"], ["mode", "indeterminate", "diameter", "40"], [1, "lesson-content"], [1, "lesson-header"], [1, "lesson-number"], [1, "lesson-info"], [1, "lesson-title"], [1, "lesson-meta"], ["class", "lesson-duration", 4, "ngIf"], [1, "lesson-status"], [1, "lesson-description"], [1, "description-content", 3, "innerHTML"], ["class", "lesson-main-content", 4, "ngIf"], ["class", "key-insights-section", 4, "ngIf"], ["class", "media-section", 4, "ngIf"], ["class", "tags-section", 4, "ngIf"], [1, "lesson-duration"], [1, "lesson-main-content"], [1, "content-body", 3, "innerHTML"], [1, "key-insights-section"], [1, "keynotes-container"], ["class", "keynote-card", 3, "important", 4, "ngFor", "ngForOf"], [1, "keynote-card"], [1, "keynote-header"], [1, "keynote-number"], [1, "keynote-title"], [1, "keynote-content", 3, "innerHTML"], ["class", "keynote-badges", 4, "ngIf"], [1, "keynote-badges"], ["class", "important-badge", 4, "ngIf"], ["class", "planet-badge", 4, "ngIf"], ["class", "zodiac-badge", 4, "ngIf"], [1, "important-badge"], [1, "planet-badge"], [1, "zodiac-badge"], [1, "media-section"], [1, "media-grid"], ["target", "_blank", "class", "media-card video", 3, "href", 4, "ngIf"], ["target", "_blank", "class", "media-card audio", 3, "href", 4, "ngIf"], ["target", "_blank", "class", "media-card document", 3, "href", 4, "ngIf"], ["target", "_blank", 1, "media-card", "video", 3, "href"], ["target", "_blank", 1, "media-card", "audio", 3, "href"], ["target", "_blank", 1, "media-card", "document", 3, "href"], [1, "tags-section"], [1, "tags-container"], [4, "ngFor", "ngForOf"], [1, "error-container"], [1, "error-icon"]],
        template: function LessonDetailModalComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LessonDetailModalComponent_Template_button_click_3_listener() {
              return ctx.close();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-icon");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "arrow_back");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "h2", 4)(7, "mat-icon");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "school");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " Lesson Details ");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "button", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LessonDetailModalComponent_Template_button_click_10_listener() {
              return ctx.close();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-icon");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "close");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "mat-dialog-content", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, LessonDetailModalComponent_div_14_Template, 4, 0, "div", 7)(15, LessonDetailModalComponent_div_15_Template, 21, 12, "div", 8)(16, LessonDetailModalComponent_div_16_Template, 7, 0, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-dialog-actions", 10)(18, "button", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LessonDetailModalComponent_Template_button_click_18_listener() {
              return ctx.close();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Close");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.lessonDetail);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.loading && !ctx.lessonDetail);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatIconButton, _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__.MatChipsModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__.MatChip, _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__.MatChipSet, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__.MatProgressSpinner, _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__.MatDividerModule],
        styles: [".lesson-modal-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  max-height: 100vh;\n}\n\n.lesson-modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  border-bottom: 1px solid #e0e0e0;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  min-height: 60px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n  flex-shrink: 0;\n  z-index: 10;\n}\n\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.back-button[_ngcontent-%COMP%] {\n  color: white !important;\n  background: rgba(255, 255, 255, 0.1) !important;\n  border: 1px solid rgba(255, 255, 255, 0.2) !important;\n  border-radius: 50% !important;\n  width: 40px !important;\n  height: 40px !important;\n  display: flex !important;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n\n.back-button[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.2) !important;\n  transform: translateX(-2px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);\n}\n\n.back-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n\n.lesson-modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1.3rem;\n  font-weight: 500;\n}\n\n.close-button[_ngcontent-%COMP%] {\n  color: white !important;\n  opacity: 0.8;\n  transition: opacity 0.3s ease;\n}\n\n.close-button[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n  background: rgba(255, 255, 255, 0.1) !important;\n}\n\n.lesson-modal-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding: 24px 32px;\n  background: #fafbfc;\n  max-height: calc(100vh - 140px);\n}\n\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 60px 20px;\n  text-align: center;\n}\n\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  color: #666;\n  font-size: 0.95rem;\n}\n\n.lesson-content[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-in;\n  max-width: 1000px;\n  margin: 0 auto;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.lesson-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  padding: 24px;\n  background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);\n  border-radius: 16px;\n  margin-bottom: 28px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  border: 1px solid #e8eafd;\n}\n\n.lesson-number[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  color: white;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 1.1rem;\n  flex-shrink: 0;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n\n.lesson-title[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: 600;\n  margin: 0 0 8px 0;\n  color: #2d3748;\n  line-height: 1.3;\n}\n\n.lesson-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n\n.lesson-duration[_ngcontent-%COMP%], .lesson-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  border-radius: 16px;\n  font-size: 0.85rem;\n  font-weight: 500;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.lesson-duration[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1976d2;\n  border: 1px solid #bbdefb;\n}\n\n.lesson-status.free[_ngcontent-%COMP%] {\n  background: #e8f5e8;\n  color: #2e7d32;\n  border: 1px solid #c8e6c9;\n}\n\n.lesson-status.premium[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #f57c00;\n  border: 1px solid #ffcc02;\n}\n\n.lesson-description[_ngcontent-%COMP%], .lesson-main-content[_ngcontent-%COMP%], .key-insights-section[_ngcontent-%COMP%], .media-section[_ngcontent-%COMP%], .tags-section[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n\n.lesson-description[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \n.lesson-main-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \n.key-insights-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \n.media-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \n.tags-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #2d3748;\n  margin: 0 0 16px 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding-bottom: 12px;\n  border-bottom: 2px solid #e0e7ff;\n}\n\n.description-content[_ngcontent-%COMP%], .content-body[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 12px;\n  border-left: 4px solid #667eea;\n  line-height: 1.6;\n  color: #4a5568;\n  font-size: 0.95rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n  border: 1px solid #e2e8f0;\n}\n\n.keynotes-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.keynote-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  border-left: 4px solid #e0e7ff;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  border: 1px solid #e2e8f0;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.keynote-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);\n}\n\n.keynote-card.important[_ngcontent-%COMP%] {\n  border-left-color: #ff6b6b;\n  background: linear-gradient(135deg, #fff8f8 0%, #ffffff 100%);\n  border-color: #fed7d7;\n}\n\n.keynote-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 12px;\n}\n\n.keynote-number[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  color: white;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.85rem;\n  font-weight: 600;\n  flex-shrink: 0;\n  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);\n}\n\n.keynote-title[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 600;\n  margin: 0;\n  color: #2d3748;\n  line-height: 1.3;\n}\n\n.keynote-content[_ngcontent-%COMP%] {\n  line-height: 1.5;\n  color: #4a5568;\n  margin-bottom: 12px;\n  font-size: 0.9rem;\n}\n\n.keynote-badges[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.important-badge[_ngcontent-%COMP%], .planet-badge[_ngcontent-%COMP%], .zodiac-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  border: 1px solid;\n}\n\n.important-badge[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n  border-color: #ffcdd2;\n}\n\n.planet-badge[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #ef6c00;\n  border-color: #ffcc02;\n}\n\n.zodiac-badge[_ngcontent-%COMP%] {\n  background: #f3e5f5;\n  color: #7b1fa2;\n  border-color: #ce93d8;\n}\n\n.media-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: 16px;\n}\n\n.media-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n  background: white;\n  border-radius: 12px;\n  text-decoration: none;\n  color: #333;\n  border: 2px solid transparent;\n  transition: all 0.3s ease;\n  text-align: center;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  border: 1px solid #e2e8f0;\n}\n\n.media-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);\n  border-color: #667eea;\n}\n\n.media-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 2.2rem;\n  width: 2.2rem;\n  height: 2.2rem;\n  margin-bottom: 10px;\n}\n\n.media-card.video[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #ff4444;\n}\n\n.media-card.audio[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #9c27b0;\n}\n\n.media-card.document[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #2196f3;\n}\n\n.media-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 500;\n}\n\n.tags-container[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n\n.tags-container[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%] {\n  background: #e0e7ff !important;\n  color: #5b21b6 !important;\n  border: 1px solid #c4b5fd !important;\n  margin: 4px !important;\n}\n\n.error-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 60px 20px;\n  text-align: center;\n}\n\n.error-icon[_ngcontent-%COMP%] {\n  font-size: 3.5rem;\n  width: 3.5rem;\n  height: 3.5rem;\n  color: #ff5722;\n  margin-bottom: 20px;\n}\n\n.error-container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #2d3748;\n  margin-bottom: 8px;\n}\n\n.error-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n} \n\n@media (max-width: 768px) {\n  .lesson-modal-content[_ngcontent-%COMP%] {\n    padding: 20px 16px;\n    max-height: calc(100vh - 120px);\n    -webkit-overflow-scrolling: touch;\n  }\n  .lesson-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    gap: 16px;\n    padding: 20px;\n  }\n  .lesson-title[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n  .media-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .keynote-header[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .keynote-title[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .lesson-modal-header[_ngcontent-%COMP%] {\n    padding: 12px 16px;\n  }\n  .back-button[_ngcontent-%COMP%] {\n    width: 36px !important;\n    height: 36px !important;\n  }\n  .back-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 18px;\n    width: 18px;\n    height: 18px;\n  }\n} \n\n.lesson-modal-content[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n\n.lesson-modal-content[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 4px;\n  margin: 4px 0;\n}\n\n.lesson-modal-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border-radius: 4px;\n  border: 1px solid #f1f1f1;\n}\n\n.lesson-modal-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #a8a8a8;\n}\n\n.lesson-modal-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:active {\n  background: #999999;\n}\n\n\n\n.lesson-modal-content[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: #c1c1c1 #f1f1f1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxlc3Nvbi1kZXRhaWwtbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFJO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQUNOOztBQUVJO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdDQUFBO0VBQ0EsNkRBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5Q0FBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBQ047O0FBRUk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FBQ047O0FBRUk7RUFDRSx1QkFBQTtFQUNBLCtDQUFBO0VBQ0EscURBQUE7RUFDQSw2QkFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSx3QkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLHdDQUFBO0FBQ047O0FBRUk7RUFDRSwrQ0FBQTtFQUNBLDJCQUFBO0VBQ0Esd0NBQUE7QUFDTjs7QUFFSTtFQUNFLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUNOOztBQUVJO0VBQ0UsU0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBQ047O0FBRUk7RUFDRSx1QkFBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtBQUNOOztBQUVJO0VBQ0UsVUFBQTtFQUNBLCtDQUFBO0FBQ047O0FBQVM7RUFDSCxPQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSwrQkFBQTtBQUdOOztBQUFJO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FBR047O0FBQUk7RUFDRSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtBQUdOOztBQUFJO0VBQ0UsOEJBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFHTjs7QUFBSTtFQUNFO0lBQU8sVUFBQTtJQUFZLDJCQUFBO0VBS3ZCO0VBSkk7SUFBSyxVQUFBO0lBQVksd0JBQUE7RUFRckI7QUFDRjtBQU5JO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSw2REFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSx5Q0FBQTtFQUNBLHlCQUFBO0FBUU47O0FBTEk7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHFEQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLCtDQUFBO0FBUU47O0FBTEk7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7QUFRTjs7QUFMSTtFQUNFLGFBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBUU47O0FBTEk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx3Q0FBQTtBQVFOOztBQUxJO0VBQ0UsbUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7QUFRTjs7QUFMSTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0FBUU47O0FBTEk7RUFDRSxtQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQVFOOztBQUxJO0VBQ0UsbUJBQUE7QUFRTjs7QUFMSTs7Ozs7RUFLRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLG9CQUFBO0VBQ0EsZ0NBQUE7QUFRTjs7QUFMSTtFQUNFLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLHlDQUFBO0VBQ0EseUJBQUE7QUFRTjs7QUFMSTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7QUFRTjs7QUFMSTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSx5Q0FBQTtFQUNBLHlCQUFBO0VBQ0EscURBQUE7QUFRTjs7QUFMSTtFQUNFLDJCQUFBO0VBQ0EsMENBQUE7QUFRTjs7QUFMSTtFQUNFLDBCQUFBO0VBQ0EsNkRBQUE7RUFDQSxxQkFBQTtBQVFOOztBQUxJO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBUU47O0FBTEk7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHFEQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLDhDQUFBO0FBUU47O0FBTEk7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsU0FBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQVFOOztBQUxJO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQVFOOztBQUxJO0VBQ0UsYUFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0FBUU47O0FBTEk7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBUU47O0FBTEk7RUFDRSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtBQVFOOztBQUxJO0VBQ0UsbUJBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7QUFRTjs7QUFMSTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0FBUU47O0FBTEk7RUFDRSxhQUFBO0VBQ0EsMkRBQUE7RUFDQSxTQUFBO0FBUU47O0FBTEk7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxXQUFBO0VBQ0EsNkJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EseUNBQUE7RUFDQSx5QkFBQTtBQVFOOztBQUxJO0VBQ0UsMkJBQUE7RUFDQSwwQ0FBQTtFQUNBLHFCQUFBO0FBUU47O0FBTEk7RUFDRSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7QUFRTjs7QUFMSTtFQUE2QixjQUFBO0FBU2pDOztBQVJJO0VBQTZCLGNBQUE7QUFZakM7O0FBWEk7RUFBZ0MsY0FBQTtBQWVwQzs7QUFiSTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7QUFnQk47O0FBYkk7RUFDRSxnQkFBQTtBQWdCTjs7QUFiSTtFQUNFLDhCQUFBO0VBQ0EseUJBQUE7RUFDQSxvQ0FBQTtFQUNBLHNCQUFBO0FBZ0JOOztBQWJJO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FBZ0JOOztBQWJJO0VBQ0UsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQWdCTjs7QUFiSTtFQUNFLGNBQUE7RUFDQSxrQkFBQTtBQWdCTjs7QUFiSTtFQUNFLGNBQUE7QUFnQk4sRUFmUyx5QkFBQTtBQUNMO0VBQ0U7SUFDRSxrQkFBQTtJQUNBLCtCQUFBO0lBQ0EsaUNBQUE7RUFnQk47RUFiSTtJQUNFLHNCQUFBO0lBQ0Esa0JBQUE7SUFDQSxTQUFBO0lBQ0EsYUFBQTtFQWVOO0VBWkk7SUFDRSxrQkFBQTtFQWNOO0VBWEk7SUFDRSwwQkFBQTtFQWFOO0VBVkk7SUFDRSxTQUFBO0VBWU47RUFUSTtJQUNFLGVBQUE7RUFXTjtFQVZXO0lBQ0wsa0JBQUE7RUFZTjtFQVRJO0lBQ0Usc0JBQUE7SUFDQSx1QkFBQTtFQVdOO0VBUkk7SUFDRSxlQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7RUFVTjtBQUNGLEVBVFMsc0JBQUE7QUFDTDtFQUNFLFVBQUE7QUFVTjs7QUFQSTtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FBVU47O0FBUEk7RUFDRSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QUFVTjs7QUFQSTtFQUNFLG1CQUFBO0FBVU47O0FBUEk7RUFDRSxtQkFBQTtBQVVOOztBQVBJLGdCQUFBO0FBQ0E7RUFDRSxxQkFBQTtFQUNBLGdDQUFBO0FBVU4iLCJmaWxlIjoibGVzc29uLWRldGFpbC1tb2RhbC5jb21wb25lbnQudHMiLCJzb3VyY2VzQ29udGVudCI6WyIgICAgLmxlc3Nvbi1tb2RhbC13cmFwcGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBtYXgtaGVpZ2h0OiAxMDB2aDtcbiAgICB9XG5cbiAgICAubGVzc29uLW1vZGFsLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IDE2cHggMjRweDtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIG1pbi1oZWlnaHQ6IDYwcHg7XG4gICAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLDAsMCwwLjE1KTtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAgei1pbmRleDogMTA7XG4gICAgfVxuXG4gICAgLmhlYWRlci1sZWZ0IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiAxMnB4O1xuICAgIH1cblxuICAgIC5iYWNrLWJ1dHRvbiB7XG4gICAgICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSAhaW1wb3J0YW50O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpICFpbXBvcnRhbnQ7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCUgIWltcG9ydGFudDtcbiAgICAgIHdpZHRoOiA0MHB4ICFpbXBvcnRhbnQ7XG4gICAgICBoZWlnaHQ6IDQwcHggIWltcG9ydGFudDtcbiAgICAgIGRpc3BsYXk6IGZsZXggIWltcG9ydGFudDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLDAsMCwwLjIpO1xuICAgIH1cblxuICAgIC5iYWNrLWJ1dHRvbjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMikgIWltcG9ydGFudDtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMnB4KTtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDhweCByZ2JhKDAsMCwwLDAuMyk7XG4gICAgfVxuXG4gICAgLmJhY2stYnV0dG9uIG1hdC1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgIH1cblxuICAgIC5sZXNzb24tbW9kYWwtaGVhZGVyIGgyIHtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA4cHg7XG4gICAgICBmb250LXNpemU6IDEuM3JlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuXG4gICAgLmNsb3NlLWJ1dHRvbiB7XG4gICAgICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgICAgIG9wYWNpdHk6IDAuODtcbiAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlO1xuICAgIH1cblxuICAgIC5jbG9zZS1idXR0b246aG92ZXIge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSAhaW1wb3J0YW50O1xuICAgIH0gICAgLmxlc3Nvbi1tb2RhbC1jb250ZW50IHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgICAgcGFkZGluZzogMjRweCAzMnB4O1xuICAgICAgYmFja2dyb3VuZDogI2ZhZmJmYztcbiAgICAgIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSAxNDBweCk7XG4gICAgfVxuXG4gICAgLmxvYWRpbmctY29udGFpbmVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IDYwcHggMjBweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG5cbiAgICAubG9hZGluZy1jb250YWluZXIgcCB7XG4gICAgICBtYXJnaW4tdG9wOiAxNnB4O1xuICAgICAgY29sb3I6ICM2NjY7XG4gICAgICBmb250LXNpemU6IDAuOTVyZW07XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1jb250ZW50IHtcbiAgICAgIGFuaW1hdGlvbjogZmFkZUluIDAuM3MgZWFzZS1pbjtcbiAgICAgIG1heC13aWR0aDogMTAwMHB4O1xuICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgfVxuXG4gICAgQGtleWZyYW1lcyBmYWRlSW4ge1xuICAgICAgZnJvbSB7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTsgfVxuICAgICAgdG8geyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH1cbiAgICB9XG5cbiAgICAubGVzc29uLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMjBweDtcbiAgICAgIHBhZGRpbmc6IDI0cHg7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjhmOWZmIDAlLCAjZTNmMmZkIDEwMCUpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDI4cHg7XG4gICAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLDAsMCwwLjA4KTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlOGVhZmQ7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1udW1iZXIge1xuICAgICAgd2lkdGg6IDQ4cHg7XG4gICAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhLCAjNzY0YmEyKTtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgICBmbGV4LXNocmluazogMDtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgxMDIsIDEyNiwgMjM0LCAwLjMpO1xuICAgIH1cblxuICAgIC5sZXNzb24tdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxLjRyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgbWFyZ2luOiAwIDAgOHB4IDA7XG4gICAgICBjb2xvcjogIzJkMzc0ODtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjM7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1tZXRhIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDEycHg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgIH1cblxuICAgIC5sZXNzb24tZHVyYXRpb24sIC5sZXNzb24tc3RhdHVzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA2cHg7XG4gICAgICBwYWRkaW5nOiA2cHggMTJweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICBmb250LXNpemU6IDAuODVyZW07XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgICB9XG5cbiAgICAubGVzc29uLWR1cmF0aW9uIHtcbiAgICAgIGJhY2tncm91bmQ6ICNlM2YyZmQ7XG4gICAgICBjb2xvcjogIzE5NzZkMjtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNiYmRlZmI7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1zdGF0dXMuZnJlZSB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZThmNWU4O1xuICAgICAgY29sb3I6ICMyZTdkMzI7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjYzhlNmM5O1xuICAgIH1cblxuICAgIC5sZXNzb24tc3RhdHVzLnByZW1pdW0ge1xuICAgICAgYmFja2dyb3VuZDogI2ZmZjNlMDtcbiAgICAgIGNvbG9yOiAjZjU3YzAwO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2ZmY2MwMjtcbiAgICB9XG5cbiAgICAubGVzc29uLWRlc2NyaXB0aW9uLCAubGVzc29uLW1haW4tY29udGVudCwgLmtleS1pbnNpZ2h0cy1zZWN0aW9uLCAubWVkaWEtc2VjdGlvbiwgLnRhZ3Mtc2VjdGlvbiB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAzMnB4O1xuICAgIH1cblxuICAgIC5sZXNzb24tZGVzY3JpcHRpb24gaDQsIFxuICAgIC5sZXNzb24tbWFpbi1jb250ZW50IGg0LCBcbiAgICAua2V5LWluc2lnaHRzLXNlY3Rpb24gaDQsIFxuICAgIC5tZWRpYS1zZWN0aW9uIGg0LCBcbiAgICAudGFncy1zZWN0aW9uIGg0IHtcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiAjMmQzNzQ4O1xuICAgICAgbWFyZ2luOiAwIDAgMTZweCAwO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDEwcHg7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZTBlN2ZmO1xuICAgIH1cblxuICAgIC5kZXNjcmlwdGlvbi1jb250ZW50LCAuY29udGVudC1ib2R5IHtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICM2NjdlZWE7XG4gICAgICBsaW5lLWhlaWdodDogMS42O1xuICAgICAgY29sb3I6ICM0YTU1Njg7XG4gICAgICBmb250LXNpemU6IDAuOTVyZW07XG4gICAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLDAsMCwwLjA2KTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XG4gICAgfVxuXG4gICAgLmtleW5vdGVzLWNvbnRhaW5lciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogMTZweDtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1jYXJkIHtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNlMGU3ZmY7XG4gICAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLDAsMCwwLjA4KTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLCBib3gtc2hhZG93IDAuMnMgZWFzZTtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1jYXJkOmhvdmVyIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXB4KTtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDE2cHggcmdiYSgwLDAsMCwwLjEyKTtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1jYXJkLmltcG9ydGFudCB7XG4gICAgICBib3JkZXItbGVmdC1jb2xvcjogI2ZmNmI2YjtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmZmY4ZjggMCUsICNmZmZmZmYgMTAwJSk7XG4gICAgICBib3JkZXItY29sb3I6ICNmZWQ3ZDc7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtaGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiAxNHB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICB9XG5cbiAgICAua2V5bm90ZS1udW1iZXIge1xuICAgICAgd2lkdGg6IDI4cHg7XG4gICAgICBoZWlnaHQ6IDI4cHg7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhLCAjNzY0YmEyKTtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBmb250LXNpemU6IDAuODVyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICBib3gtc2hhZG93OiAwIDJweCA2cHggcmdiYSgxMDIsIDEyNiwgMjM0LCAwLjMpO1xuICAgIH1cblxuICAgIC5rZXlub3RlLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4wNXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBjb2xvcjogIzJkMzc0ODtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjM7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtY29udGVudCB7XG4gICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgY29sb3I6ICM0YTU1Njg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgfVxuXG4gICAgLmtleW5vdGUtYmFkZ2VzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICB9XG5cbiAgICAuaW1wb3J0YW50LWJhZGdlLCAucGxhbmV0LWJhZGdlLCAuem9kaWFjLWJhZGdlIHtcbiAgICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkO1xuICAgIH1cblxuICAgIC5pbXBvcnRhbnQtYmFkZ2Uge1xuICAgICAgYmFja2dyb3VuZDogI2ZmZWJlZTtcbiAgICAgIGNvbG9yOiAjYzYyODI4O1xuICAgICAgYm9yZGVyLWNvbG9yOiAjZmZjZGQyO1xuICAgIH1cblxuICAgIC5wbGFuZXQtYmFkZ2Uge1xuICAgICAgYmFja2dyb3VuZDogI2ZmZjNlMDtcbiAgICAgIGNvbG9yOiAjZWY2YzAwO1xuICAgICAgYm9yZGVyLWNvbG9yOiAjZmZjYzAyO1xuICAgIH1cblxuICAgIC56b2RpYWMtYmFkZ2Uge1xuICAgICAgYmFja2dyb3VuZDogI2YzZTVmNTtcbiAgICAgIGNvbG9yOiAjN2IxZmEyO1xuICAgICAgYm9yZGVyLWNvbG9yOiAjY2U5M2Q4O1xuICAgIH1cblxuICAgIC5tZWRpYS1ncmlkIHtcbiAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDEyMHB4LCAxZnIpKTtcbiAgICAgIGdhcDogMTZweDtcbiAgICB9XG5cbiAgICAubWVkaWEtY2FyZCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgICBib3JkZXI6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLDAsMCwwLjA4KTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XG4gICAgfVxuXG4gICAgLm1lZGlhLWNhcmQ6aG92ZXIge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICAgICAgYm94LXNoYWRvdzogMCA2cHggMjBweCByZ2JhKDAsMCwwLDAuMTUpO1xuICAgICAgYm9yZGVyLWNvbG9yOiAjNjY3ZWVhO1xuICAgIH1cblxuICAgIC5tZWRpYS1jYXJkIG1hdC1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMi4ycmVtO1xuICAgICAgd2lkdGg6IDIuMnJlbTtcbiAgICAgIGhlaWdodDogMi4ycmVtO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICB9XG5cbiAgICAubWVkaWEtY2FyZC52aWRlbyBtYXQtaWNvbiB7IGNvbG9yOiAjZmY0NDQ0OyB9XG4gICAgLm1lZGlhLWNhcmQuYXVkaW8gbWF0LWljb24geyBjb2xvcjogIzljMjdiMDsgfVxuICAgIC5tZWRpYS1jYXJkLmRvY3VtZW50IG1hdC1pY29uIHsgY29sb3I6ICMyMTk2ZjM7IH1cblxuICAgIC5tZWRpYS1jYXJkIHNwYW4ge1xuICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cblxuICAgIC50YWdzLWNvbnRhaW5lciB7XG4gICAgICBtYXJnaW4tdG9wOiAxMnB4O1xuICAgIH1cblxuICAgIC50YWdzLWNvbnRhaW5lciBtYXQtY2hpcCB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZTBlN2ZmICFpbXBvcnRhbnQ7XG4gICAgICBjb2xvcjogIzViMjFiNiAhaW1wb3J0YW50O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2M0YjVmZCAhaW1wb3J0YW50O1xuICAgICAgbWFyZ2luOiA0cHggIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAuZXJyb3ItY29udGFpbmVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IDYwcHggMjBweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG5cbiAgICAuZXJyb3ItaWNvbiB7XG4gICAgICBmb250LXNpemU6IDMuNXJlbTtcbiAgICAgIHdpZHRoOiAzLjVyZW07XG4gICAgICBoZWlnaHQ6IDMuNXJlbTtcbiAgICAgIGNvbG9yOiAjZmY1NzIyO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICB9XG5cbiAgICAuZXJyb3ItY29udGFpbmVyIGgzIHtcbiAgICAgIGNvbG9yOiAjMmQzNzQ4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgIH1cblxuICAgIC5lcnJvci1jb250YWluZXIgcCB7XG4gICAgICBjb2xvcjogIzcxODA5NjtcbiAgICB9ICAgIC8qIE1vYmlsZSBvcHRpbWl6YXRpb25zICovXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgICAubGVzc29uLW1vZGFsLWNvbnRlbnQge1xuICAgICAgICBwYWRkaW5nOiAyMHB4IDE2cHg7XG4gICAgICAgIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSAxMjBweCk7XG4gICAgICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmxlc3Nvbi1oZWFkZXIge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGdhcDogMTZweDtcbiAgICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmxlc3Nvbi10aXRsZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLm1lZGlhLWdyaWQge1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgICAgIH1cblxuICAgICAgLmtleW5vdGUtaGVhZGVyIHtcbiAgICAgICAgZ2FwOiAxMnB4O1xuICAgICAgfVxuXG4gICAgICAua2V5bm90ZS10aXRsZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgIH0gICAgICAubGVzc29uLW1vZGFsLWhlYWRlciB7XG4gICAgICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICAgIH1cblxuICAgICAgLmJhY2stYnV0dG9uIHtcbiAgICAgICAgd2lkdGg6IDM2cHggIWltcG9ydGFudDtcbiAgICAgICAgaGVpZ2h0OiAzNnB4ICFpbXBvcnRhbnQ7XG4gICAgICB9XG5cbiAgICAgIC5iYWNrLWJ1dHRvbiBtYXQtaWNvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgd2lkdGg6IDE4cHg7XG4gICAgICAgIGhlaWdodDogMThweDtcbiAgICAgIH1cbiAgICB9ICAgIC8qIFNjcm9sbGJhciBzdHlsaW5nICovXG4gICAgLmxlc3Nvbi1tb2RhbC1jb250ZW50Ojotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICB3aWR0aDogOHB4O1xuICAgIH1cblxuICAgIC5sZXNzb24tbW9kYWwtY29udGVudDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgICAgYmFja2dyb3VuZDogI2YxZjFmMTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIG1hcmdpbjogNHB4IDA7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1tb2RhbC1jb250ZW50Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gICAgICBiYWNrZ3JvdW5kOiAjYzFjMWMxO1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2YxZjFmMTtcbiAgICB9XG5cbiAgICAubGVzc29uLW1vZGFsLWNvbnRlbnQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6ICNhOGE4YTg7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1tb2RhbC1jb250ZW50Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYjphY3RpdmUge1xuICAgICAgYmFja2dyb3VuZDogIzk5OTk5OTtcbiAgICB9XG5cbiAgICAvKiBGb3IgRmlyZWZveCAqL1xuICAgIC5sZXNzb24tbW9kYWwtY29udGVudCB7XG4gICAgICBzY3JvbGxiYXItd2lkdGg6IHRoaW47XG4gICAgICBzY3JvbGxiYXItY29sb3I6ICNjMWMxYzEgI2YxZjFmMTtcbiAgICB9XG4gICJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvY291cnNlcy9sZXNzb24tZGV0YWlsLW1vZGFsL2xlc3Nvbi1kZXRhaWwtbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFJO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQUNOOztBQUVJO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdDQUFBO0VBQ0EsNkRBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5Q0FBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBQ047O0FBRUk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FBQ047O0FBRUk7RUFDRSx1QkFBQTtFQUNBLCtDQUFBO0VBQ0EscURBQUE7RUFDQSw2QkFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSx3QkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLHdDQUFBO0FBQ047O0FBRUk7RUFDRSwrQ0FBQTtFQUNBLDJCQUFBO0VBQ0Esd0NBQUE7QUFDTjs7QUFFSTtFQUNFLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUNOOztBQUVJO0VBQ0UsU0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBQ047O0FBRUk7RUFDRSx1QkFBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtBQUNOOztBQUVJO0VBQ0UsVUFBQTtFQUNBLCtDQUFBO0FBQ047O0FBQVM7RUFDSCxPQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSwrQkFBQTtBQUdOOztBQUFJO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FBR047O0FBQUk7RUFDRSxnQkFBQTtFQUNBLFdB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STtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FBVU47O0FBUEk7RUFDRSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QUFVTjs7QUFQSTtFQUNFLG1CQUFBO0FBVU47O0FBUEk7RUFDRSxtQkFBQTtBQVVOOztBQVBJLGdCQUFBO0FBQ0E7RUFDRSxxQkFBQTtFQUNBLGdDQUFBO0FBVU47QUFDQSxvdWxCQUFvdWxCIiwic291cmNlc0NvbnRlbnQiOlsiICAgIC5sZXNzb24tbW9kYWwtd3JhcHBlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgbWF4LWhlaWdodDogMTAwdmg7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1tb2RhbC1oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiAxNnB4IDI0cHg7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2NjdlZWEgMCUsICM3NjRiYTIgMTAwJSk7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBtaW4taGVpZ2h0OiA2MHB4O1xuICAgICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwwLDAsMC4xNSk7XG4gICAgICBmbGV4LXNocmluazogMDtcbiAgICAgIHotaW5kZXg6IDEwO1xuICAgIH1cblxuICAgIC5oZWFkZXItbGVmdCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMTJweDtcbiAgICB9XG5cbiAgICAuYmFjay1idXR0b24ge1xuICAgICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkgIWltcG9ydGFudDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSAhaW1wb3J0YW50O1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlICFpbXBvcnRhbnQ7XG4gICAgICB3aWR0aDogNDBweCAhaW1wb3J0YW50O1xuICAgICAgaGVpZ2h0OiA0MHB4ICFpbXBvcnRhbnQ7XG4gICAgICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICAgICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwwLDAsMC4yKTtcbiAgICB9XG5cbiAgICAuYmFjay1idXR0b246aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpICFpbXBvcnRhbnQ7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTJweCk7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCA4cHggcmdiYSgwLDAsMCwwLjMpO1xuICAgIH1cblxuICAgIC5iYWNrLWJ1dHRvbiBtYXQtaWNvbiB7XG4gICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICB3aWR0aDogMjBweDtcbiAgICAgIGhlaWdodDogMjBweDtcbiAgICB9XG5cbiAgICAubGVzc29uLW1vZGFsLWhlYWRlciBoMiB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgZm9udC1zaXplOiAxLjNyZW07XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cblxuICAgIC5jbG9zZS1idXR0b24ge1xuICAgICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gICAgICBvcGFjaXR5OiAwLjg7XG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcbiAgICB9XG5cbiAgICAuY2xvc2UtYnV0dG9uOmhvdmVyIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkgIWltcG9ydGFudDtcbiAgICB9ICAgIC5sZXNzb24tbW9kYWwtY29udGVudCB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICAgIHBhZGRpbmc6IDI0cHggMzJweDtcbiAgICAgIGJhY2tncm91bmQ6ICNmYWZiZmM7XG4gICAgICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTQwcHgpO1xuICAgIH1cblxuICAgIC5sb2FkaW5nLWNvbnRhaW5lciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA2MHB4IDIwcHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLmxvYWRpbmctY29udGFpbmVyIHAge1xuICAgICAgbWFyZ2luLXRvcDogMTZweDtcbiAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgZm9udC1zaXplOiAwLjk1cmVtO1xuICAgIH1cblxuICAgIC5sZXNzb24tY29udGVudCB7XG4gICAgICBhbmltYXRpb246IGZhZGVJbiAwLjNzIGVhc2UtaW47XG4gICAgICBtYXgtd2lkdGg6IDEwMDBweDtcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIH1cblxuICAgIEBrZXlmcmFtZXMgZmFkZUluIHtcbiAgICAgIGZyb20geyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTBweCk7IH1cbiAgICAgIHRvIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDIwcHg7XG4gICAgICBwYWRkaW5nOiAyNHB4O1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2Y4ZjlmZiAwJSwgI2UzZjJmZCAxMDAlKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyOHB4O1xuICAgICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwwLDAsMC4wOCk7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZThlYWZkO1xuICAgIH1cblxuICAgIC5sZXNzb24tbnVtYmVyIHtcbiAgICAgIHdpZHRoOiA0OHB4O1xuICAgICAgaGVpZ2h0OiA0OHB4O1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSwgIzc2NGJhMik7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMTAyLCAxMjYsIDIzNCwgMC4zKTtcbiAgICB9XG5cbiAgICAubGVzc29uLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMS40cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIG1hcmdpbjogMCAwIDhweCAwO1xuICAgICAgY29sb3I6ICMyZDM3NDg7XG4gICAgICBsaW5lLWhlaWdodDogMS4zO1xuICAgIH1cblxuICAgIC5sZXNzb24tbWV0YSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiAxMnB4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICB9XG5cbiAgICAubGVzc29uLWR1cmF0aW9uLCAubGVzc29uLXN0YXR1cyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogNnB4O1xuICAgICAgcGFkZGluZzogNnB4IDEycHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSk7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1kdXJhdGlvbiB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZTNmMmZkO1xuICAgICAgY29sb3I6ICMxOTc2ZDI7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjYmJkZWZiO1xuICAgIH1cblxuICAgIC5sZXNzb24tc3RhdHVzLmZyZWUge1xuICAgICAgYmFja2dyb3VuZDogI2U4ZjVlODtcbiAgICAgIGNvbG9yOiAjMmU3ZDMyO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2M4ZTZjOTtcbiAgICB9XG5cbiAgICAubGVzc29uLXN0YXR1cy5wcmVtaXVtIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmYzZTA7XG4gICAgICBjb2xvcjogI2Y1N2MwMDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNmZmNjMDI7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1kZXNjcmlwdGlvbiwgLmxlc3Nvbi1tYWluLWNvbnRlbnQsIC5rZXktaW5zaWdodHMtc2VjdGlvbiwgLm1lZGlhLXNlY3Rpb24sIC50YWdzLXNlY3Rpb24ge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMzJweDtcbiAgICB9XG5cbiAgICAubGVzc29uLWRlc2NyaXB0aW9uIGg0LCBcbiAgICAubGVzc29uLW1haW4tY29udGVudCBoNCwgXG4gICAgLmtleS1pbnNpZ2h0cy1zZWN0aW9uIGg0LCBcbiAgICAubWVkaWEtc2VjdGlvbiBoNCwgXG4gICAgLnRhZ3Mtc2VjdGlvbiBoNCB7XG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogIzJkMzc0ODtcbiAgICAgIG1hcmdpbjogMCAwIDE2cHggMDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiAxMHB4O1xuICAgICAgcGFkZGluZy1ib3R0b206IDEycHg7XG4gICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2UwZTdmZjtcbiAgICB9XG5cbiAgICAuZGVzY3JpcHRpb24tY29udGVudCwgLmNvbnRlbnQtYm9keSB7XG4gICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjNjY3ZWVhO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgICAgIGNvbG9yOiAjNGE1NTY4O1xuICAgICAgZm9udC1zaXplOiAwLjk1cmVtO1xuICAgICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwwLDAsMC4wNik7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwO1xuICAgIH1cblxuICAgIC5rZXlub3Rlcy1jb250YWluZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBnYXA6IDE2cHg7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtY2FyZCB7XG4gICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjZTBlN2ZmO1xuICAgICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwwLDAsMC4wOCk7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwO1xuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZSwgYm94LXNoYWRvdyAwLjJzIGVhc2U7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtY2FyZDpob3ZlciB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFweCk7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxNnB4IHJnYmEoMCwwLDAsMC4xMik7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtY2FyZC5pbXBvcnRhbnQge1xuICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICNmZjZiNmI7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmZmOGY4IDAlLCAjZmZmZmZmIDEwMCUpO1xuICAgICAgYm9yZGVyLWNvbG9yOiAjZmVkN2Q3O1xuICAgIH1cblxuICAgIC5rZXlub3RlLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMTRweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgfVxuXG4gICAgLmtleW5vdGUtbnVtYmVyIHtcbiAgICAgIHdpZHRoOiAyOHB4O1xuICAgICAgaGVpZ2h0OiAyOHB4O1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSwgIzc2NGJhMik7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgZm9udC1zaXplOiAwLjg1cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAgYm94LXNoYWRvdzogMCAycHggNnB4IHJnYmEoMTAyLCAxMjYsIDIzNCwgMC4zKTtcbiAgICB9XG5cbiAgICAua2V5bm90ZS10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDEuMDVyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgY29sb3I6ICMyZDM3NDg7XG4gICAgICBsaW5lLWhlaWdodDogMS4zO1xuICAgIH1cblxuICAgIC5rZXlub3RlLWNvbnRlbnQge1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICAgIGNvbG9yOiAjNGE1NTY4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgIH1cblxuICAgIC5rZXlub3RlLWJhZGdlcyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiA4cHg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgfVxuXG4gICAgLmltcG9ydGFudC1iYWRnZSwgLnBsYW5ldC1iYWRnZSwgLnpvZGlhYy1iYWRnZSB7XG4gICAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZDtcbiAgICB9XG5cbiAgICAuaW1wb3J0YW50LWJhZGdlIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmViZWU7XG4gICAgICBjb2xvcjogI2M2MjgyODtcbiAgICAgIGJvcmRlci1jb2xvcjogI2ZmY2RkMjtcbiAgICB9XG5cbiAgICAucGxhbmV0LWJhZGdlIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmYzZTA7XG4gICAgICBjb2xvcjogI2VmNmMwMDtcbiAgICAgIGJvcmRlci1jb2xvcjogI2ZmY2MwMjtcbiAgICB9XG5cbiAgICAuem9kaWFjLWJhZGdlIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmM2U1ZjU7XG4gICAgICBjb2xvcjogIzdiMWZhMjtcbiAgICAgIGJvcmRlci1jb2xvcjogI2NlOTNkODtcbiAgICB9XG5cbiAgICAubWVkaWEtZ3JpZCB7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgxMjBweCwgMWZyKSk7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgfVxuXG4gICAgLm1lZGlhLWNhcmQge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgYm9yZGVyOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwwLDAsMC4wOCk7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwO1xuICAgIH1cblxuICAgIC5tZWRpYS1jYXJkOmhvdmVyIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgICAgIGJveC1zaGFkb3c6IDAgNnB4IDIwcHggcmdiYSgwLDAsMCwwLjE1KTtcbiAgICAgIGJvcmRlci1jb2xvcjogIzY2N2VlYTtcbiAgICB9XG5cbiAgICAubWVkaWEtY2FyZCBtYXQtaWNvbiB7XG4gICAgICBmb250LXNpemU6IDIuMnJlbTtcbiAgICAgIHdpZHRoOiAyLjJyZW07XG4gICAgICBoZWlnaHQ6IDIuMnJlbTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgfVxuXG4gICAgLm1lZGlhLWNhcmQudmlkZW8gbWF0LWljb24geyBjb2xvcjogI2ZmNDQ0NDsgfVxuICAgIC5tZWRpYS1jYXJkLmF1ZGlvIG1hdC1pY29uIHsgY29sb3I6ICM5YzI3YjA7IH1cbiAgICAubWVkaWEtY2FyZC5kb2N1bWVudCBtYXQtaWNvbiB7IGNvbG9yOiAjMjE5NmYzOyB9XG5cbiAgICAubWVkaWEtY2FyZCBzcGFuIHtcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG5cbiAgICAudGFncy1jb250YWluZXIge1xuICAgICAgbWFyZ2luLXRvcDogMTJweDtcbiAgICB9XG5cbiAgICAudGFncy1jb250YWluZXIgbWF0LWNoaXAge1xuICAgICAgYmFja2dyb3VuZDogI2UwZTdmZiAhaW1wb3J0YW50O1xuICAgICAgY29sb3I6ICM1YjIxYjYgIWltcG9ydGFudDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjNGI1ZmQgIWltcG9ydGFudDtcbiAgICAgIG1hcmdpbjogNHB4ICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLmVycm9yLWNvbnRhaW5lciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA2MHB4IDIwcHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLmVycm9yLWljb24ge1xuICAgICAgZm9udC1zaXplOiAzLjVyZW07XG4gICAgICB3aWR0aDogMy41cmVtO1xuICAgICAgaGVpZ2h0OiAzLjVyZW07XG4gICAgICBjb2xvcjogI2ZmNTcyMjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgfVxuXG4gICAgLmVycm9yLWNvbnRhaW5lciBoMyB7XG4gICAgICBjb2xvcjogIzJkMzc0ODtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICB9XG5cbiAgICAuZXJyb3ItY29udGFpbmVyIHAge1xuICAgICAgY29sb3I6ICM3MTgwOTY7XG4gICAgfSAgICAvKiBNb2JpbGUgb3B0aW1pemF0aW9ucyAqL1xuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgLmxlc3Nvbi1tb2RhbC1jb250ZW50IHtcbiAgICAgICAgcGFkZGluZzogMjBweCAxNnB4O1xuICAgICAgICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTIwcHgpO1xuICAgICAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5sZXNzb24taGVhZGVyIHtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBnYXA6IDE2cHg7XG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5sZXNzb24tdGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgICB9XG4gICAgICBcbiAgICAgIC5tZWRpYS1ncmlkIHtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gICAgICB9XG5cbiAgICAgIC5rZXlub3RlLWhlYWRlciB7XG4gICAgICAgIGdhcDogMTJweDtcbiAgICAgIH1cblxuICAgICAgLmtleW5vdGUtdGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICB9ICAgICAgLmxlc3Nvbi1tb2RhbC1oZWFkZXIge1xuICAgICAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gICAgICB9XG5cbiAgICAgIC5iYWNrLWJ1dHRvbiB7XG4gICAgICAgIHdpZHRoOiAzNnB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIGhlaWdodDogMzZweCAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICAuYmFjay1idXR0b24gbWF0LWljb24ge1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgIHdpZHRoOiAxOHB4O1xuICAgICAgICBoZWlnaHQ6IDE4cHg7XG4gICAgICB9XG4gICAgfSAgICAvKiBTY3JvbGxiYXIgc3R5bGluZyAqL1xuICAgIC5sZXNzb24tbW9kYWwtY29udGVudDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgICAgd2lkdGg6IDhweDtcbiAgICB9XG5cbiAgICAubGVzc29uLW1vZGFsLWNvbnRlbnQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmMWYxZjE7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBtYXJnaW46IDRweCAwO1xuICAgIH1cblxuICAgIC5sZXNzb24tbW9kYWwtY29udGVudDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgICAgYmFja2dyb3VuZDogI2MxYzFjMTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNmMWYxZjE7XG4gICAgfVxuXG4gICAgLmxlc3Nvbi1tb2RhbC1jb250ZW50Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiAjYThhOGE4O1xuICAgIH1cblxuICAgIC5sZXNzb24tbW9kYWwtY29udGVudDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6YWN0aXZlIHtcbiAgICAgIGJhY2tncm91bmQ6ICM5OTk5OTk7XG4gICAgfVxuXG4gICAgLyogRm9yIEZpcmVmb3ggKi9cbiAgICAubGVzc29uLW1vZGFsLWNvbnRlbnQge1xuICAgICAgc2Nyb2xsYmFyLXdpZHRoOiB0aGluO1xuICAgICAgc2Nyb2xsYmFyLWNvbG9yOiAjYzFjMWMxICNmMWYxZjE7XG4gICAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
      });
    }
  }
  return LessonDetailModalComponent;
})();

/***/ })

}]);
//# sourceMappingURL=src_app_pages_courses_customer-course-view_customer-course-view_component_ts.js.map