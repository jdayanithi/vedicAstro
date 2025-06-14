import './polyfills.server.mjs';
import {
  TopicService
} from "./chunk-TVUSTIMK.mjs";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger
} from "./chunk-JT57BULX.mjs";
import {
  CourseService
} from "./chunk-OR4G4BEX.mjs";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-ZFEZQRSD.mjs";
import {
  ActivatedRoute,
  Router
} from "./chunk-7VTN37JO.mjs";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-XDMFUZ2M.mjs";
import {
  MatSelectModule
} from "./chunk-REETKESN.mjs";
import {
  MatInput,
  MatInputModule,
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-575MMOBR.mjs";
import "./chunk-XIU7TARH.mjs";
import {
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel
} from "./chunk-OKVPDLGM.mjs";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatOption,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  ɵNgNoValidate
} from "./chunk-FNH7JYNE.mjs";
import {
  AsyncPipe,
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf,
  debounceTime,
  distinctUntilChanged,
  inject,
  of,
  startWith,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-NFLUKIXG.mjs";
import {
  __spreadValues
} from "./chunk-PTRYWQQD.mjs";

// src/app/pages/topics/topic-list/topic-list.component.ts
function TopicListComponent_mat_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const course_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", course_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.displayCourseFn(course_r2), " ");
  }
}
function TopicListComponent_mat_card_18_th_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "ID");
    \u0275\u0275elementEnd();
  }
}
function TopicListComponent_mat_card_18_td_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const topic_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(topic_r4.topicId);
  }
}
function TopicListComponent_mat_card_18_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "Order");
    \u0275\u0275elementEnd();
  }
}
function TopicListComponent_mat_card_18_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const topic_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(topic_r5.orderNumber);
  }
}
function TopicListComponent_mat_card_18_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "Title");
    \u0275\u0275elementEnd();
  }
}
function TopicListComponent_mat_card_18_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const topic_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(topic_r6.title);
  }
}
function TopicListComponent_mat_card_18_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "Description");
    \u0275\u0275elementEnd();
  }
}
function TopicListComponent_mat_card_18_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const topic_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", topic_r7.description ? topic_r7.description.length > 100 ? topic_r7.description.substring(0, 100) + "..." : topic_r7.description : "-", " ");
  }
}
function TopicListComponent_mat_card_18_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "Created");
    \u0275\u0275elementEnd();
  }
}
function TopicListComponent_mat_card_18_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const topic_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, topic_r8.createdAt, "short"));
  }
}
function TopicListComponent_mat_card_18_th_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function TopicListComponent_mat_card_18_td_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 25)(1, "button", 26);
    \u0275\u0275listener("click", function TopicListComponent_mat_card_18_td_23_Template_button_click_1_listener() {
      const topic_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.navigateToEditTopic(topic_r10.topicId));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 27);
    \u0275\u0275listener("click", function TopicListComponent_mat_card_18_td_23_Template_button_click_4_listener() {
      const topic_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteTopic(topic_r10.topicId));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function TopicListComponent_mat_card_18_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 28);
  }
}
function TopicListComponent_mat_card_18_tr_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 29);
  }
}
function TopicListComponent_mat_card_18_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "p");
    \u0275\u0275text(2, "No topics found for this course.");
    \u0275\u0275elementEnd()();
  }
}
function TopicListComponent_mat_card_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "table", 12);
    \u0275\u0275elementContainerStart(6, 13);
    \u0275\u0275template(7, TopicListComponent_mat_card_18_th_7_Template, 2, 0, "th", 14)(8, TopicListComponent_mat_card_18_td_8_Template, 2, 1, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(9, 16);
    \u0275\u0275template(10, TopicListComponent_mat_card_18_th_10_Template, 2, 0, "th", 14)(11, TopicListComponent_mat_card_18_td_11_Template, 2, 1, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(12, 17);
    \u0275\u0275template(13, TopicListComponent_mat_card_18_th_13_Template, 2, 0, "th", 14)(14, TopicListComponent_mat_card_18_td_14_Template, 2, 1, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(15, 18);
    \u0275\u0275template(16, TopicListComponent_mat_card_18_th_16_Template, 2, 0, "th", 14)(17, TopicListComponent_mat_card_18_td_17_Template, 2, 1, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(18, 19);
    \u0275\u0275template(19, TopicListComponent_mat_card_18_th_19_Template, 2, 0, "th", 14)(20, TopicListComponent_mat_card_18_td_20_Template, 3, 4, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(21, 20);
    \u0275\u0275template(22, TopicListComponent_mat_card_18_th_22_Template, 2, 0, "th", 14)(23, TopicListComponent_mat_card_18_td_23_Template, 7, 0, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(24, TopicListComponent_mat_card_18_tr_24_Template, 1, 0, "tr", 21)(25, TopicListComponent_mat_card_18_tr_25_Template, 1, 0, "tr", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, TopicListComponent_mat_card_18_div_26_Template, 3, 0, "div", 23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Topics for: ", ctx_r2.selectedCourse.title, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("dataSource", ctx_r2.topics);
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r2.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r2.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.topics.length === 0);
  }
}
function TopicListComponent_mat_card_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 31)(1, "mat-card-content")(2, "div", 30)(3, "mat-icon");
    \u0275\u0275text(4, "school");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Please select a course to view its topics.");
    \u0275\u0275elementEnd()()()();
  }
}
var TopicListComponent = class _TopicListComponent {
  topicService;
  courseService;
  snackBar;
  router;
  topics = [];
  selectedCourse = null;
  courseSearchControl = new FormControl("");
  filteredCourses = of([]);
  displayedColumns = ["topicId", "orderNumber", "title", "description", "createdAt", "actions"];
  constructor(topicService, courseService, snackBar, router) {
    this.topicService = topicService;
    this.courseService = courseService;
    this.snackBar = snackBar;
    this.router = router;
  }
  ngOnInit() {
    this.setupCourseAutocomplete();
    this.restoreSelectedCourse();
  }
  restoreSelectedCourse() {
    const navigationState = history.state;
    if (navigationState && navigationState.selectedCourse) {
      const course = navigationState.selectedCourse;
      this.selectedCourse = course;
      this.courseSearchControl.setValue(course);
      this.loadTopics();
    }
  }
  setupCourseAutocomplete() {
    this.filteredCourses = this.courseSearchControl.valueChanges.pipe(startWith(""), debounceTime(300), distinctUntilChanged(), switchMap((value) => this._filterCourses(value || "")));
  }
  _filterCourses(value) {
    const filterValue = typeof value === "string" ? value : value?.title || "";
    if (!filterValue || filterValue.trim() === "") {
      return this.courseService.getAllCourses();
    }
    return this.courseService.getAllCourses();
  }
  displayCourseFn = (course) => {
    if (!course)
      return "";
    const title = course.title || "Untitled";
    const id = course.courseId || "N/A";
    return `${title} (ID: ${id})`;
  };
  onCourseSelected(event) {
    const course = event.option.value;
    this.selectedCourse = course;
    this.loadTopics();
  }
  loadTopics() {
    if (this.selectedCourse) {
      this.topicService.getTopicsByCourseId(this.selectedCourse.courseId).subscribe({
        next: (topics) => {
          this.topics = topics;
        },
        error: () => {
          this.snackBar.open("Error loading topics", "Close", {
            duration: 3e3
          });
        }
      });
    }
  }
  deleteTopic(topicId) {
    if (confirm("Are you sure you want to delete this topic?")) {
      this.topicService.deleteTopic(topicId).subscribe({
        next: () => {
          this.loadTopics();
          this.snackBar.open("Topic deleted successfully", "Close", {
            duration: 3e3
          });
        },
        error: () => {
          this.snackBar.open("Error deleting topic", "Close", {
            duration: 3e3
          });
        }
      });
    }
  }
  navigateToAddTopic() {
    if (this.selectedCourse) {
      this.router.navigate(["topics/add"], {
        state: { selectedCourse: this.selectedCourse }
      });
    }
  }
  navigateToEditTopic(topicId) {
    this.router.navigate(["topics/update", topicId], {
      state: { selectedCourse: this.selectedCourse }
    });
  }
  static \u0275fac = function TopicListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TopicListComponent)(\u0275\u0275directiveInject(TopicService), \u0275\u0275directiveInject(CourseService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TopicListComponent, selectors: [["app-topic-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 20, vars: 9, consts: [["auto", "matAutocomplete"], [1, "container"], [1, "header"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "filter-card"], [1, "full-width"], ["type", "text", "matInput", "", "placeholder", "Type to search courses...", 3, "formControl", "matAutocomplete"], [3, "optionSelected", "displayWith"], [3, "value", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "placeholder-card", 4, "ngIf"], [3, "value"], ["mat-table", "", 1, "full-width", 3, "dataSource"], ["matColumnDef", "topicId"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "orderNumber"], ["matColumnDef", "title"], ["matColumnDef", "description"], ["matColumnDef", "createdAt"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "no-data", 4, "ngIf"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-icon-button", "", "color", "primary", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "no-data"], [1, "placeholder-card"]], template: function TopicListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1");
      \u0275\u0275text(3, "Topics");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function TopicListComponent_Template_button_click_4_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.navigateToAddTopic());
      });
      \u0275\u0275elementStart(5, "mat-icon");
      \u0275\u0275text(6, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Add Topic ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card", 4)(9, "mat-card-content")(10, "mat-form-field", 5)(11, "mat-label");
      \u0275\u0275text(12, "Search Course");
      \u0275\u0275elementEnd();
      \u0275\u0275element(13, "input", 6);
      \u0275\u0275elementStart(14, "mat-autocomplete", 7, 0);
      \u0275\u0275listener("optionSelected", function TopicListComponent_Template_mat_autocomplete_optionSelected_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCourseSelected($event));
      });
      \u0275\u0275template(16, TopicListComponent_mat_option_16_Template, 2, 2, "mat-option", 8);
      \u0275\u0275pipe(17, "async");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(18, TopicListComponent_mat_card_18_Template, 27, 5, "mat-card", 9)(19, TopicListComponent_mat_card_19_Template, 7, 0, "mat-card", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      const auto_r11 = \u0275\u0275reference(15);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.selectedCourse);
      \u0275\u0275advance(9);
      \u0275\u0275property("formControl", ctx.courseSearchControl)("matAutocomplete", auto_r11);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayCourseFn);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", \u0275\u0275pipeBind1(17, 7, ctx.filteredCourses));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.selectedCourse);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.selectedCourse);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    AsyncPipe,
    DatePipe,
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatOption,
    MatAutocompleteModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatInputModule,
    MatInput,
    MatSnackBarModule,
    ReactiveFormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    FormControlDirective
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.filter-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  height: 48px;\n  width: 48px;\n  margin-bottom: 16px;\n}\n.placeholder-card[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n/*# sourceMappingURL=topic-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TopicListComponent, { className: "TopicListComponent", filePath: "src\\app\\pages\\topics\\topic-list\\topic-list.component.ts", lineNumber: 172 });
})();

// src/app/pages/topics/add-topic/add-topic.component.ts
function AddTopicComponent_mat_option_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const course_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", course_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.displayCourseFn(course_r2), " ");
  }
}
function AddTopicComponent_mat_form_field_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 3)(1, "mat-label");
    \u0275\u0275text(2, "Order Number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 15);
    \u0275\u0275elementEnd();
  }
}
var AddTopicComponent = class _AddTopicComponent {
  topicForm;
  filteredCourses = of([]);
  isEditMode = false;
  topicId = null;
  fb = inject(FormBuilder);
  topicService = inject(TopicService);
  courseService = inject(CourseService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  snackBar = inject(MatSnackBar);
  constructor() {
    this.topicForm = this.fb.group({
      title: ["", Validators.required],
      description: [""],
      courseId: ["", Validators.required],
      courseSearch: [""],
      orderNumber: [1]
    });
  }
  ngOnInit() {
    this.setupCourseAutocomplete();
    this.checkEditMode();
    this.handleNavigationState();
  }
  handleNavigationState() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state || window.history.state;
    if (state && state.selectedCourse && !this.isEditMode) {
      const selectedCourse = state.selectedCourse;
      this.topicForm.patchValue({
        courseId: selectedCourse.courseId,
        courseSearch: selectedCourse
      });
    }
  }
  setupCourseAutocomplete() {
    this.filteredCourses = this.topicForm.get("courseSearch").valueChanges.pipe(startWith(""), debounceTime(300), distinctUntilChanged(), switchMap((value) => this._filterCourses(value)));
  }
  _filterCourses(value) {
    if (typeof value !== "string") {
      return of([]);
    }
    if (!value || value.trim() === "") {
      return this.courseService.getAllCourses();
    }
    return this.courseService.getAllCourses();
  }
  displayCourseFn = (course) => {
    return course ? `${course.title} (ID: ${course.courseId})` : "";
  };
  onCourseSelected(event) {
    const course = event.option.value;
    this.topicForm.patchValue({
      courseId: course.courseId
    });
  }
  checkEditMode() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.topicId = +id;
      this.loadTopic();
    }
  }
  loadTopic() {
    if (this.topicId) {
      this.topicService.getTopicById(this.topicId).subscribe({
        next: (topic) => {
          this.topicForm.patchValue({
            title: topic.title,
            description: topic.description,
            courseId: topic.courseId,
            orderNumber: topic.orderNumber
          });
          this.courseService.getCourseById(topic.courseId).subscribe({
            next: (course) => {
              this.topicForm.patchValue({
                courseSearch: course
              });
            }
          });
        },
        error: () => {
          this.snackBar.open("Error loading topic", "Close", {
            duration: 3e3
          });
        }
      });
    }
  }
  onSubmit() {
    if (this.topicForm.valid) {
      const formData = this.topicForm.value;
      const topicData = __spreadValues({
        title: formData.title,
        description: formData.description,
        courseId: formData.courseId
      }, this.isEditMode && { orderNumber: formData.orderNumber });
      if (this.isEditMode && this.topicId) {
        this.topicService.updateTopic(this.topicId, topicData).subscribe({
          next: () => {
            this.snackBar.open("Topic updated successfully", "Close", {
              duration: 3e3
            });
            this.goBack();
          },
          error: () => {
            this.snackBar.open("Error updating topic", "Close", {
              duration: 3e3
            });
          }
        });
      } else {
        this.topicService.createTopic(topicData).subscribe({
          next: () => {
            this.snackBar.open("Topic created successfully", "Close", {
              duration: 3e3
            });
            this.goBack();
          },
          error: () => {
            this.snackBar.open("Error creating topic", "Close", {
              duration: 3e3
            });
          }
        });
      }
    }
  }
  goBack() {
    const currentCourseId = this.topicForm.get("courseId")?.value;
    const currentCourse = this.topicForm.get("courseSearch")?.value;
    if (currentCourseId && currentCourse) {
      this.router.navigate(["/topics"], {
        state: { selectedCourse: currentCourse }
      });
    } else {
      this.router.navigate(["/topics"]);
    }
  }
  static \u0275fac = function AddTopicComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddTopicComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddTopicComponent, selectors: [["app-add-topic"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 35, vars: 10, consts: [["auto", "matAutocomplete"], [1, "container"], [3, "ngSubmit", "formGroup"], ["appearance", "fill", 1, "full-width"], ["type", "text", "matInput", "", "formControlName", "courseSearch", "placeholder", "Type to search courses...", 3, "matAutocomplete"], [3, "optionSelected", "displayWith"], [3, "value", 4, "ngFor", "ngForOf"], ["matInput", "", "formControlName", "courseId", "required", "", "readonly", ""], ["matInput", "", "formControlName", "title", "required", ""], ["matInput", "", "formControlName", "description", "rows", "4"], ["appearance", "fill", "class", "full-width", 4, "ngIf"], [1, "button-container"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], [3, "value"], ["matInput", "", "type", "number", "formControlName", "orderNumber", "min", "1"]], template: function AddTopicComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title");
      \u0275\u0275text(4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "mat-card-content")(6, "form", 2);
      \u0275\u0275listener("ngSubmit", function AddTopicComponent_Template_form_ngSubmit_6_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSubmit());
      });
      \u0275\u0275elementStart(7, "mat-form-field", 3)(8, "mat-label");
      \u0275\u0275text(9, "Search Course");
      \u0275\u0275elementEnd();
      \u0275\u0275element(10, "input", 4);
      \u0275\u0275elementStart(11, "mat-autocomplete", 5, 0);
      \u0275\u0275listener("optionSelected", function AddTopicComponent_Template_mat_autocomplete_optionSelected_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCourseSelected($event));
      });
      \u0275\u0275template(13, AddTopicComponent_mat_option_13_Template, 2, 2, "mat-option", 6);
      \u0275\u0275pipe(14, "async");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "mat-form-field", 3)(16, "mat-label");
      \u0275\u0275text(17, "Course ID");
      \u0275\u0275elementEnd();
      \u0275\u0275element(18, "input", 7);
      \u0275\u0275elementStart(19, "mat-hint");
      \u0275\u0275text(20, "Selected from course search above");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "mat-form-field", 3)(22, "mat-label");
      \u0275\u0275text(23, "Title");
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "input", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "mat-form-field", 3)(26, "mat-label");
      \u0275\u0275text(27, "Description");
      \u0275\u0275elementEnd();
      \u0275\u0275element(28, "textarea", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275template(29, AddTopicComponent_mat_form_field_29_Template, 4, 0, "mat-form-field", 10);
      \u0275\u0275elementStart(30, "div", 11)(31, "button", 12);
      \u0275\u0275listener("click", function AddTopicComponent_Template_button_click_31_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.goBack());
      });
      \u0275\u0275text(32, "Cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "button", 13);
      \u0275\u0275text(34);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      const auto_r4 = \u0275\u0275reference(12);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit Topic" + (ctx.topicId ? " (ID: " + ctx.topicId + ")" : "") : "Add New Topic");
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.topicForm);
      \u0275\u0275advance(4);
      \u0275\u0275property("matAutocomplete", auto_r4);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayCourseFn);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", \u0275\u0275pipeBind1(14, 8, ctx.filteredCourses));
      \u0275\u0275advance(16);
      \u0275\u0275property("ngIf", ctx.isEditMode);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.topicForm.invalid);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Update" : "Create", " ");
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, AsyncPipe, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, FormGroupDirective, FormControlName, MatFormFieldModule, MatFormField, MatLabel, MatHint, MatInputModule, MatInput, MatButtonModule, MatButton, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatAutocompleteModule, MatAutocomplete, MatOption, MatAutocompleteTrigger, MatSnackBarModule], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 15px;\n}\n.button-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 20px;\n}\n/*# sourceMappingURL=add-topic.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddTopicComponent, { className: "AddTopicComponent", filePath: "src\\app\\pages\\topics\\add-topic\\add-topic.component.ts", lineNumber: 108 });
})();

// src/app/pages/topics/topics.routes.ts
var TOPICS_ROUTES = [
  { path: "", component: TopicListComponent },
  { path: "add", component: AddTopicComponent },
  { path: "update/:id", component: AddTopicComponent }
];
export {
  TOPICS_ROUTES
};
//# sourceMappingURL=chunk-YMZUEACA.mjs.map
