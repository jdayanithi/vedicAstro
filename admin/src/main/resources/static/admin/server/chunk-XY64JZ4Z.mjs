import './polyfills.server.mjs';
import {
  TopicService
} from "./chunk-TVUSTIMK.mjs";
import {
  KeynoteTagService,
  LessonKeynoteService,
  LessonService
} from "./chunk-HURESHYL.mjs";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger
} from "./chunk-JT57BULX.mjs";
import {
  MatSlideToggleModule
} from "./chunk-T4K4PR5F.mjs";
import {
  TagService
} from "./chunk-STPSP5KC.mjs";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-RAP4GNMB.mjs";
import {
  CourseService
} from "./chunk-OR4G4BEX.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-3NCYDLW6.mjs";
import {
  QuillEditorComponent,
  QuillModule
} from "./chunk-7WBG2YDQ.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-MFOFOUUF.mjs";
import {
  MatChip,
  MatChipsModule
} from "./chunk-H6LW7J6K.mjs";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-3XSTCTVE.mjs";
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
  MatSelect,
  MatSelectModule
} from "./chunk-REETKESN.mjs";
import {
  CdkPortalOutlet,
  MatInput,
  MatInputModule,
  MatSnackBar,
  MatSnackBarModule,
  PortalModule,
  TemplatePortal
} from "./chunk-575MMOBR.mjs";
import {
  UniqueSelectionDispatcher
} from "./chunk-XIU7TARH.mjs";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
  MatSuffix
} from "./chunk-OKVPDLGM.mjs";
import {
  DefaultValueAccessor,
  ENTER,
  FocusKeyManager,
  FocusMonitor,
  FormArrayName,
  FormBuilder,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatOption,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  RequiredValidator,
  SPACE,
  Validators,
  environment,
  hasModifierKey,
  ɵNgNoValidate
} from "./chunk-FNH7JYNE.mjs";
import {
  ANIMATION_MODULE_TYPE,
  AsyncPipe,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  DatePipe,
  Directive,
  EMPTY,
  ElementRef,
  EventEmitter,
  Host,
  HttpClient,
  Inject,
  InjectionToken,
  Input,
  NgClass,
  NgForOf,
  NgIf,
  NgModule,
  Optional,
  Output,
  QueryList,
  SkipSelf,
  Subject,
  Subscription,
  TemplateRef,
  TitleCasePipe,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation$1,
  animate,
  booleanAttribute,
  debounceTime,
  distinctUntilChanged,
  filter,
  inject,
  merge,
  numberAttribute,
  of,
  setClassMetadata,
  startWith,
  state,
  style,
  switchMap,
  take,
  transition,
  trigger,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-NFLUKIXG.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-PTRYWQQD.mjs";

// src/app/pages/lessons/lesson-list/lesson-list.component.ts
function LessonListComponent_mat_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const topic_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", topic_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.displayTopicFn(topic_r2), " ");
  }
}
function LessonListComponent_mat_card_18_th_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "ID");
    \u0275\u0275elementEnd();
  }
}
function LessonListComponent_mat_card_18_td_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lesson_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(lesson_r4.lessonId);
  }
}
function LessonListComponent_mat_card_18_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Order");
    \u0275\u0275elementEnd();
  }
}
function LessonListComponent_mat_card_18_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lesson_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(lesson_r5.orderNumber);
  }
}
function LessonListComponent_mat_card_18_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Title");
    \u0275\u0275elementEnd();
  }
}
function LessonListComponent_mat_card_18_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lesson_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(lesson_r6.title);
  }
}
function LessonListComponent_mat_card_18_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Content Type");
    \u0275\u0275elementEnd();
  }
}
function LessonListComponent_mat_card_18_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 27)(1, "span", 28);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "titlecase");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const lesson_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap("content-type-" + lesson_r7.contentType);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 3, lesson_r7.contentType), " ");
  }
}
function LessonListComponent_mat_card_18_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Duration");
    \u0275\u0275elementEnd();
  }
}
function LessonListComponent_mat_card_18_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lesson_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", lesson_r8.durationMinutes ? lesson_r8.durationMinutes + " min" : "-", " ");
  }
}
function LessonListComponent_mat_card_18_th_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Free");
    \u0275\u0275elementEnd();
  }
}
function LessonListComponent_mat_card_18_td_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 27)(1, "mat-icon", 29);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const lesson_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("color", lesson_r9.isFree ? "primary" : "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", lesson_r9.isFree ? "check_circle" : "lock", " ");
  }
}
function LessonListComponent_mat_card_18_th_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Created");
    \u0275\u0275elementEnd();
  }
}
function LessonListComponent_mat_card_18_td_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 27);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lesson_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, lesson_r10.createdAt, "short"));
  }
}
function LessonListComponent_mat_card_18_th_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function LessonListComponent_mat_card_18_td_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 27)(1, "button", 30);
    \u0275\u0275listener("click", function LessonListComponent_mat_card_18_td_29_Template_button_click_1_listener() {
      const lesson_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.navigateToEditLesson(lesson_r12.lessonId));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 31);
    \u0275\u0275listener("click", function LessonListComponent_mat_card_18_td_29_Template_button_click_4_listener() {
      const lesson_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteLesson(lesson_r12.lessonId));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function LessonListComponent_mat_card_18_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 32);
  }
}
function LessonListComponent_mat_card_18_tr_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 33);
  }
}
function LessonListComponent_mat_card_18_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "p");
    \u0275\u0275text(2, "No lessons found for this topic.");
    \u0275\u0275elementEnd()();
  }
}
function LessonListComponent_mat_card_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "table", 12);
    \u0275\u0275elementContainerStart(6, 13);
    \u0275\u0275template(7, LessonListComponent_mat_card_18_th_7_Template, 2, 0, "th", 14)(8, LessonListComponent_mat_card_18_td_8_Template, 2, 1, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(9, 16);
    \u0275\u0275template(10, LessonListComponent_mat_card_18_th_10_Template, 2, 0, "th", 14)(11, LessonListComponent_mat_card_18_td_11_Template, 2, 1, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(12, 17);
    \u0275\u0275template(13, LessonListComponent_mat_card_18_th_13_Template, 2, 0, "th", 14)(14, LessonListComponent_mat_card_18_td_14_Template, 2, 1, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(15, 18);
    \u0275\u0275template(16, LessonListComponent_mat_card_18_th_16_Template, 2, 0, "th", 14)(17, LessonListComponent_mat_card_18_td_17_Template, 4, 5, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(18, 19);
    \u0275\u0275template(19, LessonListComponent_mat_card_18_th_19_Template, 2, 0, "th", 14)(20, LessonListComponent_mat_card_18_td_20_Template, 2, 1, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(21, 20);
    \u0275\u0275template(22, LessonListComponent_mat_card_18_th_22_Template, 2, 0, "th", 14)(23, LessonListComponent_mat_card_18_td_23_Template, 3, 2, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(24, 21);
    \u0275\u0275template(25, LessonListComponent_mat_card_18_th_25_Template, 2, 0, "th", 14)(26, LessonListComponent_mat_card_18_td_26_Template, 3, 4, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(27, 22);
    \u0275\u0275template(28, LessonListComponent_mat_card_18_th_28_Template, 2, 0, "th", 14)(29, LessonListComponent_mat_card_18_td_29_Template, 7, 0, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(30, LessonListComponent_mat_card_18_tr_30_Template, 1, 0, "tr", 23)(31, LessonListComponent_mat_card_18_tr_31_Template, 1, 0, "tr", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275template(32, LessonListComponent_mat_card_18_div_32_Template, 3, 0, "div", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Lessons for: ", ctx_r2.selectedTopic.title, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("dataSource", ctx_r2.lessons);
    \u0275\u0275advance(25);
    \u0275\u0275property("matHeaderRowDef", ctx_r2.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r2.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.lessons.length === 0);
  }
}
function LessonListComponent_mat_card_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 35)(1, "mat-card-content")(2, "div", 34)(3, "mat-icon");
    \u0275\u0275text(4, "play_lesson");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Please select a topic to view its lessons.");
    \u0275\u0275elementEnd()()()();
  }
}
var LessonListComponent = class _LessonListComponent {
  lessonService;
  topicService;
  snackBar;
  router;
  lessons = [];
  selectedTopic = null;
  topicSearchControl = new FormControl("");
  filteredTopics = of([]);
  displayedColumns = ["lessonId", "orderNumber", "title", "contentType", "duration", "isFree", "createdAt", "actions"];
  constructor(lessonService, topicService, snackBar, router) {
    this.lessonService = lessonService;
    this.topicService = topicService;
    this.snackBar = snackBar;
    this.router = router;
  }
  ngOnInit() {
    this.setupTopicAutocomplete();
    this.restoreSelectedTopic();
  }
  restoreSelectedTopic() {
    const navigationState = history.state;
    if (navigationState && navigationState.selectedTopic) {
      const topic = navigationState.selectedTopic;
      this.selectedTopic = topic;
      this.topicSearchControl.setValue(topic);
      this.loadLessons();
    }
  }
  setupTopicAutocomplete() {
    this.filteredTopics = this.topicSearchControl.valueChanges.pipe(startWith(""), debounceTime(300), distinctUntilChanged(), switchMap((value) => this._filterTopics(value || "")));
  }
  _filterTopics(value) {
    const filterValue = typeof value === "string" ? value : value?.title || "";
    if (!filterValue || filterValue.trim() === "") {
      return this.topicService.getAllTopics();
    }
    return this.topicService.getAllTopics();
  }
  displayTopicFn = (topic) => {
    if (!topic)
      return "";
    const title = topic.title || "Untitled";
    const id = topic.topicId || "N/A";
    return `${title} (ID: ${id})`;
  };
  onTopicSelected(event) {
    const topic = event.option.value;
    this.selectedTopic = topic;
    this.loadLessons();
  }
  navigateToAddLesson() {
    if (this.selectedTopic) {
      this.router.navigate(["lessons/add"], {
        state: { selectedTopic: this.selectedTopic }
      });
    }
  }
  navigateToEditLesson(lessonId) {
    this.router.navigate(["lessons/update", lessonId], {
      state: { selectedTopic: this.selectedTopic }
    });
  }
  loadLessons() {
    if (this.selectedTopic) {
      this.lessonService.getLessonsByTopicId(this.selectedTopic.topicId).subscribe({
        next: (lessons) => {
          this.lessons = lessons.map((lesson) => __spreadProps(__spreadValues({}, lesson), {
            createdAt: parseBackendDate(lesson.createdAt),
            updatedAt: parseBackendDate(lesson.updatedAt)
          }));
        },
        error: () => {
          this.snackBar.open("Error loading lessons", "Close", {
            duration: 3e3
          });
        }
      });
    }
  }
  deleteLesson(lessonId) {
    if (confirm("Are you sure you want to delete this lesson?")) {
      this.lessonService.deleteLesson(lessonId).subscribe({
        next: () => {
          this.loadLessons();
          this.snackBar.open("Lesson deleted successfully", "Close", {
            duration: 3e3
          });
        },
        error: () => {
          this.snackBar.open("Error deleting lesson", "Close", {
            duration: 3e3
          });
        }
      });
    }
  }
  static \u0275fac = function LessonListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LessonListComponent)(\u0275\u0275directiveInject(LessonService), \u0275\u0275directiveInject(TopicService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LessonListComponent, selectors: [["app-lesson-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 20, vars: 9, consts: [["auto", "matAutocomplete"], [1, "container"], [1, "header"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "filter-card"], [1, "full-width"], ["type", "text", "matInput", "", "placeholder", "Type to search topics...", 3, "formControl", "matAutocomplete"], [3, "optionSelected", "displayWith"], [3, "value", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "placeholder-card", 4, "ngIf"], [3, "value"], ["mat-table", "", 1, "full-width", 3, "dataSource"], ["matColumnDef", "lessonId"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "orderNumber"], ["matColumnDef", "title"], ["matColumnDef", "contentType"], ["matColumnDef", "duration"], ["matColumnDef", "isFree"], ["matColumnDef", "createdAt"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "no-data", 4, "ngIf"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "content-type-badge"], [3, "color"], ["mat-icon-button", "", "color", "primary", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "no-data"], [1, "placeholder-card"]], template: function LessonListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1");
      \u0275\u0275text(3, "Lessons");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function LessonListComponent_Template_button_click_4_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.navigateToAddLesson());
      });
      \u0275\u0275elementStart(5, "mat-icon");
      \u0275\u0275text(6, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Add Lesson ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card", 4)(9, "mat-card-content")(10, "mat-form-field", 5)(11, "mat-label");
      \u0275\u0275text(12, "Search Topic");
      \u0275\u0275elementEnd();
      \u0275\u0275element(13, "input", 6);
      \u0275\u0275elementStart(14, "mat-autocomplete", 7, 0);
      \u0275\u0275listener("optionSelected", function LessonListComponent_Template_mat_autocomplete_optionSelected_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onTopicSelected($event));
      });
      \u0275\u0275template(16, LessonListComponent_mat_option_16_Template, 2, 2, "mat-option", 8);
      \u0275\u0275pipe(17, "async");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(18, LessonListComponent_mat_card_18_Template, 33, 5, "mat-card", 9)(19, LessonListComponent_mat_card_19_Template, 7, 0, "mat-card", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      const auto_r13 = \u0275\u0275reference(15);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.selectedTopic);
      \u0275\u0275advance(9);
      \u0275\u0275property("formControl", ctx.topicSearchControl)("matAutocomplete", auto_r13);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayTopicFn);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", \u0275\u0275pipeBind1(17, 7, ctx.filteredTopics));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.selectedTopic);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.selectedTopic);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    AsyncPipe,
    TitleCasePipe,
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
    MatSlideToggleModule,
    ReactiveFormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    FormControlDirective
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.filter-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  height: 48px;\n  width: 48px;\n  margin-bottom: 16px;\n}\n.placeholder-card[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.content-type-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n}\n.content-type-video[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #1976d2;\n}\n.content-type-article[_ngcontent-%COMP%] {\n  background-color: #f3e5f5;\n  color: #7b1fa2;\n}\n.content-type-quiz[_ngcontent-%COMP%] {\n  background-color: #fff3e0;\n  color: #f57c00;\n}\n.content-type-exercise[_ngcontent-%COMP%] {\n  background-color: #e8f5e8;\n  color: #388e3c;\n}\n/*# sourceMappingURL=lesson-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LessonListComponent, { className: "LessonListComponent", filePath: "src\\app\\pages\\lessons\\lesson-list\\lesson-list.component.ts", lineNumber: 214 });
})();
function parseBackendDate(date) {
  if (!date)
    return null;
  if (date instanceof Date)
    return date;
  if (typeof date === "string" && date.includes(",")) {
    const parts = date.split(",").map(Number);
    if (parts.length >= 3) {
      return new Date(parts[0], parts[1] - 1, parts[2], parts[3] || 0, parts[4] || 0, parts[5] || 0);
    }
  }
  const d = new Date(date);
  return isNaN(d.getTime()) ? null : d;
}

// node_modules/@angular/cdk/fesm2022/accordion.mjs
var nextId$1 = 0;
var CDK_ACCORDION = new InjectionToken("CdkAccordion");
var CdkAccordion = class _CdkAccordion {
  constructor() {
    this._stateChanges = new Subject();
    this._openCloseAllActions = new Subject();
    this.id = `cdk-accordion-${nextId$1++}`;
    this.multi = false;
  }
  /** Opens all enabled accordion items in an accordion where multi is enabled. */
  openAll() {
    if (this.multi) {
      this._openCloseAllActions.next(true);
    }
  }
  /** Closes all enabled accordion items. */
  closeAll() {
    this._openCloseAllActions.next(false);
  }
  ngOnChanges(changes) {
    this._stateChanges.next(changes);
  }
  ngOnDestroy() {
    this._stateChanges.complete();
    this._openCloseAllActions.complete();
  }
  static {
    this.\u0275fac = function CdkAccordion_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkAccordion)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CdkAccordion,
      selectors: [["cdk-accordion"], ["", "cdkAccordion", ""]],
      inputs: {
        multi: [2, "multi", "multi", booleanAttribute]
      },
      exportAs: ["cdkAccordion"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([{
        provide: CDK_ACCORDION,
        useExisting: _CdkAccordion
      }]), \u0275\u0275InputTransformsFeature, \u0275\u0275NgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAccordion, [{
    type: Directive,
    args: [{
      selector: "cdk-accordion, [cdkAccordion]",
      exportAs: "cdkAccordion",
      providers: [{
        provide: CDK_ACCORDION,
        useExisting: CdkAccordion
      }],
      standalone: true
    }]
  }], null, {
    multi: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var nextId = 0;
var CdkAccordionItem = class _CdkAccordionItem {
  /** Whether the AccordionItem is expanded. */
  get expanded() {
    return this._expanded;
  }
  set expanded(expanded) {
    if (this._expanded !== expanded) {
      this._expanded = expanded;
      this.expandedChange.emit(expanded);
      if (expanded) {
        this.opened.emit();
        const accordionId = this.accordion ? this.accordion.id : this.id;
        this._expansionDispatcher.notify(this.id, accordionId);
      } else {
        this.closed.emit();
      }
      this._changeDetectorRef.markForCheck();
    }
  }
  constructor(accordion, _changeDetectorRef, _expansionDispatcher) {
    this.accordion = accordion;
    this._changeDetectorRef = _changeDetectorRef;
    this._expansionDispatcher = _expansionDispatcher;
    this._openCloseAllSubscription = Subscription.EMPTY;
    this.closed = new EventEmitter();
    this.opened = new EventEmitter();
    this.destroyed = new EventEmitter();
    this.expandedChange = new EventEmitter();
    this.id = `cdk-accordion-child-${nextId++}`;
    this._expanded = false;
    this.disabled = false;
    this._removeUniqueSelectionListener = () => {
    };
    this._removeUniqueSelectionListener = _expansionDispatcher.listen((id, accordionId) => {
      if (this.accordion && !this.accordion.multi && this.accordion.id === accordionId && this.id !== id) {
        this.expanded = false;
      }
    });
    if (this.accordion) {
      this._openCloseAllSubscription = this._subscribeToOpenCloseAllActions();
    }
  }
  /** Emits an event for the accordion item being destroyed. */
  ngOnDestroy() {
    this.opened.complete();
    this.closed.complete();
    this.destroyed.emit();
    this.destroyed.complete();
    this._removeUniqueSelectionListener();
    this._openCloseAllSubscription.unsubscribe();
  }
  /** Toggles the expanded state of the accordion item. */
  toggle() {
    if (!this.disabled) {
      this.expanded = !this.expanded;
    }
  }
  /** Sets the expanded state of the accordion item to false. */
  close() {
    if (!this.disabled) {
      this.expanded = false;
    }
  }
  /** Sets the expanded state of the accordion item to true. */
  open() {
    if (!this.disabled) {
      this.expanded = true;
    }
  }
  _subscribeToOpenCloseAllActions() {
    return this.accordion._openCloseAllActions.subscribe((expanded) => {
      if (!this.disabled) {
        this.expanded = expanded;
      }
    });
  }
  static {
    this.\u0275fac = function CdkAccordionItem_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkAccordionItem)(\u0275\u0275directiveInject(CDK_ACCORDION, 12), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(UniqueSelectionDispatcher));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CdkAccordionItem,
      selectors: [["cdk-accordion-item"], ["", "cdkAccordionItem", ""]],
      inputs: {
        expanded: [2, "expanded", "expanded", booleanAttribute],
        disabled: [2, "disabled", "disabled", booleanAttribute]
      },
      outputs: {
        closed: "closed",
        opened: "opened",
        destroyed: "destroyed",
        expandedChange: "expandedChange"
      },
      exportAs: ["cdkAccordionItem"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([
        // Provide `CDK_ACCORDION` as undefined to prevent nested accordion items from
        // registering to the same accordion.
        {
          provide: CDK_ACCORDION,
          useValue: void 0
        }
      ]), \u0275\u0275InputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAccordionItem, [{
    type: Directive,
    args: [{
      selector: "cdk-accordion-item, [cdkAccordionItem]",
      exportAs: "cdkAccordionItem",
      providers: [
        // Provide `CDK_ACCORDION` as undefined to prevent nested accordion items from
        // registering to the same accordion.
        {
          provide: CDK_ACCORDION,
          useValue: void 0
        }
      ],
      standalone: true
    }]
  }], () => [{
    type: CdkAccordion,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CDK_ACCORDION]
    }, {
      type: SkipSelf
    }]
  }, {
    type: ChangeDetectorRef
  }, {
    type: UniqueSelectionDispatcher
  }], {
    closed: [{
      type: Output
    }],
    opened: [{
      type: Output
    }],
    destroyed: [{
      type: Output
    }],
    expandedChange: [{
      type: Output
    }],
    expanded: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var CdkAccordionModule = class _CdkAccordionModule {
  static {
    this.\u0275fac = function CdkAccordionModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkAccordionModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _CdkAccordionModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAccordionModule, [{
    type: NgModule,
    args: [{
      imports: [CdkAccordion, CdkAccordionItem],
      exports: [CdkAccordion, CdkAccordionItem]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/expansion.mjs
var _c0 = ["body"];
var _c1 = [[["mat-expansion-panel-header"]], "*", [["mat-action-row"]]];
var _c2 = ["mat-expansion-panel-header", "*", "mat-action-row"];
function MatExpansionPanel_ng_template_5_Template(rf, ctx) {
}
var _c3 = [[["mat-panel-title"]], [["mat-panel-description"]], "*"];
var _c4 = ["mat-panel-title", "mat-panel-description", "*"];
function MatExpansionPanelHeader_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 1);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 2);
    \u0275\u0275element(2, "path", 3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("@indicatorRotate", ctx_r0._getExpandedState());
  }
}
var MAT_ACCORDION = new InjectionToken("MAT_ACCORDION");
var EXPANSION_PANEL_ANIMATION_TIMING = "225ms cubic-bezier(0.4,0.0,0.2,1)";
var matExpansionAnimations = {
  /** Animation that rotates the indicator arrow. */
  indicatorRotate: trigger("indicatorRotate", [state("collapsed, void", style({
    transform: "rotate(0deg)"
  })), state("expanded", style({
    transform: "rotate(180deg)"
  })), transition("expanded <=> collapsed, void => collapsed", animate(EXPANSION_PANEL_ANIMATION_TIMING))]),
  /** Animation that expands and collapses the panel content. */
  bodyExpansion: trigger("bodyExpansion", [
    state("collapsed, void", style({
      height: "0px",
      visibility: "hidden"
    })),
    // Clear the `visibility` while open, otherwise the content will be visible when placed in
    // a parent that's `visibility: hidden`, because `visibility` doesn't apply to descendants
    // that have a `visibility` of their own (see #27436).
    state("expanded", style({
      height: "*",
      visibility: ""
    })),
    transition("expanded <=> collapsed, void => collapsed", animate(EXPANSION_PANEL_ANIMATION_TIMING))
  ])
};
var MAT_EXPANSION_PANEL = new InjectionToken("MAT_EXPANSION_PANEL");
var MatExpansionPanelContent = class _MatExpansionPanelContent {
  constructor(_template, _expansionPanel) {
    this._template = _template;
    this._expansionPanel = _expansionPanel;
  }
  static {
    this.\u0275fac = function MatExpansionPanelContent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatExpansionPanelContent)(\u0275\u0275directiveInject(TemplateRef), \u0275\u0275directiveInject(MAT_EXPANSION_PANEL, 8));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatExpansionPanelContent,
      selectors: [["ng-template", "matExpansionPanelContent", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelContent, [{
    type: Directive,
    args: [{
      selector: "ng-template[matExpansionPanelContent]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_EXPANSION_PANEL]
    }, {
      type: Optional
    }]
  }], null);
})();
var uniqueId = 0;
var MAT_EXPANSION_PANEL_DEFAULT_OPTIONS = new InjectionToken("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS");
var MatExpansionPanel = class _MatExpansionPanel extends CdkAccordionItem {
  /** Whether the toggle indicator should be hidden. */
  get hideToggle() {
    return this._hideToggle || this.accordion && this.accordion.hideToggle;
  }
  set hideToggle(value) {
    this._hideToggle = value;
  }
  /** The position of the expansion indicator. */
  get togglePosition() {
    return this._togglePosition || this.accordion && this.accordion.togglePosition;
  }
  set togglePosition(value) {
    this._togglePosition = value;
  }
  constructor(accordion, _changeDetectorRef, _uniqueSelectionDispatcher, _viewContainerRef, _document, _animationMode, defaultOptions) {
    super(accordion, _changeDetectorRef, _uniqueSelectionDispatcher);
    this._viewContainerRef = _viewContainerRef;
    this._animationMode = _animationMode;
    this._hideToggle = false;
    this.afterExpand = new EventEmitter();
    this.afterCollapse = new EventEmitter();
    this._inputChanges = new Subject();
    this._headerId = `mat-expansion-panel-header-${uniqueId++}`;
    this.accordion = accordion;
    this._document = _document;
    this._animationsDisabled = _animationMode === "NoopAnimations";
    if (defaultOptions) {
      this.hideToggle = defaultOptions.hideToggle;
    }
  }
  /** Determines whether the expansion panel should have spacing between it and its siblings. */
  _hasSpacing() {
    if (this.accordion) {
      return this.expanded && this.accordion.displayMode === "default";
    }
    return false;
  }
  /** Gets the expanded state string. */
  _getExpandedState() {
    return this.expanded ? "expanded" : "collapsed";
  }
  /** Toggles the expanded state of the expansion panel. */
  toggle() {
    this.expanded = !this.expanded;
  }
  /** Sets the expanded state of the expansion panel to false. */
  close() {
    this.expanded = false;
  }
  /** Sets the expanded state of the expansion panel to true. */
  open() {
    this.expanded = true;
  }
  ngAfterContentInit() {
    if (this._lazyContent && this._lazyContent._expansionPanel === this) {
      this.opened.pipe(startWith(null), filter(() => this.expanded && !this._portal), take(1)).subscribe(() => {
        this._portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
      });
    }
  }
  ngOnChanges(changes) {
    this._inputChanges.next(changes);
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._inputChanges.complete();
  }
  /** Checks whether the expansion panel's content contains the currently-focused element. */
  _containsFocus() {
    if (this._body) {
      const focusedElement = this._document.activeElement;
      const bodyElement = this._body.nativeElement;
      return focusedElement === bodyElement || bodyElement.contains(focusedElement);
    }
    return false;
  }
  /** Called when the expansion animation has started. */
  _animationStarted(event) {
    if (!isInitialAnimation(event) && !this._animationsDisabled && this._body) {
      this._body?.nativeElement.setAttribute("inert", "");
    }
  }
  /** Called when the expansion animation has finished. */
  _animationDone(event) {
    if (!isInitialAnimation(event)) {
      if (event.toState === "expanded") {
        this.afterExpand.emit();
      } else if (event.toState === "collapsed") {
        this.afterCollapse.emit();
      }
      if (!this._animationsDisabled && this._body) {
        this._body.nativeElement.removeAttribute("inert");
      }
    }
  }
  static {
    this.\u0275fac = function MatExpansionPanel_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatExpansionPanel)(\u0275\u0275directiveInject(MAT_ACCORDION, 12), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(UniqueSelectionDispatcher), \u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(DOCUMENT), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8), \u0275\u0275directiveInject(MAT_EXPANSION_PANEL_DEFAULT_OPTIONS, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatExpansionPanel,
      selectors: [["mat-expansion-panel"]],
      contentQueries: function MatExpansionPanel_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatExpansionPanelContent, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._lazyContent = _t.first);
        }
      },
      viewQuery: function MatExpansionPanel_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c0, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._body = _t.first);
        }
      },
      hostAttrs: [1, "mat-expansion-panel"],
      hostVars: 6,
      hostBindings: function MatExpansionPanel_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classProp("mat-expanded", ctx.expanded)("_mat-animation-noopable", ctx._animationsDisabled)("mat-expansion-panel-spacing", ctx._hasSpacing());
        }
      },
      inputs: {
        hideToggle: [2, "hideToggle", "hideToggle", booleanAttribute],
        togglePosition: "togglePosition"
      },
      outputs: {
        afterExpand: "afterExpand",
        afterCollapse: "afterCollapse"
      },
      exportAs: ["matExpansionPanel"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([
        // Provide MatAccordion as undefined to prevent nested expansion panels from registering
        // to the same accordion.
        {
          provide: MAT_ACCORDION,
          useValue: void 0
        },
        {
          provide: MAT_EXPANSION_PANEL,
          useExisting: _MatExpansionPanel
        }
      ]), \u0275\u0275InputTransformsFeature, \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c2,
      decls: 7,
      vars: 4,
      consts: [["body", ""], ["role", "region", 1, "mat-expansion-panel-content", 3, "id"], [1, "mat-expansion-panel-body"], [3, "cdkPortalOutlet"]],
      template: function MatExpansionPanel_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275projectionDef(_c1);
          \u0275\u0275projection(0);
          \u0275\u0275elementStart(1, "div", 1, 0);
          \u0275\u0275listener("@bodyExpansion.start", function MatExpansionPanel_Template_div_animation_bodyExpansion_start_1_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._animationStarted($event));
          })("@bodyExpansion.done", function MatExpansionPanel_Template_div_animation_bodyExpansion_done_1_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._animationDone($event));
          });
          \u0275\u0275elementStart(3, "div", 2);
          \u0275\u0275projection(4, 1);
          \u0275\u0275template(5, MatExpansionPanel_ng_template_5_Template, 0, 0, "ng-template", 3);
          \u0275\u0275elementEnd();
          \u0275\u0275projection(6, 2);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          \u0275\u0275advance();
          \u0275\u0275property("@bodyExpansion", ctx._getExpandedState())("id", ctx.id);
          \u0275\u0275attribute("aria-labelledby", ctx._headerId);
          \u0275\u0275advance(4);
          \u0275\u0275property("cdkPortalOutlet", ctx._portal);
        }
      },
      dependencies: [CdkPortalOutlet],
      styles: ['.mat-expansion-panel{box-sizing:content-box;display:block;margin:0;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative;background:var(--mat-expansion-container-background-color, var(--mat-app-surface));color:var(--mat-expansion-container-text-color, var(--mat-app-on-surface));border-radius:var(--mat-expansion-container-shape)}.mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:var(--mat-expansion-container-shape);border-top-left-radius:var(--mat-expansion-container-shape)}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:var(--mat-expansion-container-shape);border-bottom-left-radius:var(--mat-expansion-container-shape)}.cdk-high-contrast-active .mat-expansion-panel{outline:solid 1px}.mat-expansion-panel.ng-animate-disabled,.ng-animate-disabled .mat-expansion-panel,.mat-expansion-panel._mat-animation-noopable{transition:none}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible;font-family:var(--mat-expansion-container-text-font, var(--mat-app-body-large-font));font-size:var(--mat-expansion-container-text-size, var(--mat-app-body-large-size));font-weight:var(--mat-expansion-container-text-weight, var(--mat-app-body-large-weight));line-height:var(--mat-expansion-container-text-line-height, var(--mat-app-body-large-line-height));letter-spacing:var(--mat-expansion-container-text-tracking, var(--mat-app-body-large-tracking))}.mat-expansion-panel-content[style*="visibility: hidden"] *{visibility:hidden !important}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px;border-top-color:var(--mat-expansion-actions-divider-color, var(--mat-app-outline))}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}'],
      encapsulation: 2,
      data: {
        animation: [matExpansionAnimations.bodyExpansion]
      },
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanel, [{
    type: Component,
    args: [{
      selector: "mat-expansion-panel",
      exportAs: "matExpansionPanel",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      animations: [matExpansionAnimations.bodyExpansion],
      providers: [
        // Provide MatAccordion as undefined to prevent nested expansion panels from registering
        // to the same accordion.
        {
          provide: MAT_ACCORDION,
          useValue: void 0
        },
        {
          provide: MAT_EXPANSION_PANEL,
          useExisting: MatExpansionPanel
        }
      ],
      host: {
        "class": "mat-expansion-panel",
        "[class.mat-expanded]": "expanded",
        "[class._mat-animation-noopable]": "_animationsDisabled",
        "[class.mat-expansion-panel-spacing]": "_hasSpacing()"
      },
      standalone: true,
      imports: [CdkPortalOutlet],
      template: '<ng-content select="mat-expansion-panel-header"></ng-content>\n<div class="mat-expansion-panel-content"\n     role="region"\n     [@bodyExpansion]="_getExpandedState()"\n     (@bodyExpansion.start)="_animationStarted($event)"\n     (@bodyExpansion.done)="_animationDone($event)"\n     [attr.aria-labelledby]="_headerId"\n     [id]="id"\n     #body>\n  <div class="mat-expansion-panel-body">\n    <ng-content></ng-content>\n    <ng-template [cdkPortalOutlet]="_portal"></ng-template>\n  </div>\n  <ng-content select="mat-action-row"></ng-content>\n</div>\n',
      styles: ['.mat-expansion-panel{box-sizing:content-box;display:block;margin:0;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative;background:var(--mat-expansion-container-background-color, var(--mat-app-surface));color:var(--mat-expansion-container-text-color, var(--mat-app-on-surface));border-radius:var(--mat-expansion-container-shape)}.mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:var(--mat-expansion-container-shape);border-top-left-radius:var(--mat-expansion-container-shape)}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:var(--mat-expansion-container-shape);border-bottom-left-radius:var(--mat-expansion-container-shape)}.cdk-high-contrast-active .mat-expansion-panel{outline:solid 1px}.mat-expansion-panel.ng-animate-disabled,.ng-animate-disabled .mat-expansion-panel,.mat-expansion-panel._mat-animation-noopable{transition:none}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible;font-family:var(--mat-expansion-container-text-font, var(--mat-app-body-large-font));font-size:var(--mat-expansion-container-text-size, var(--mat-app-body-large-size));font-weight:var(--mat-expansion-container-text-weight, var(--mat-app-body-large-weight));line-height:var(--mat-expansion-container-text-line-height, var(--mat-app-body-large-line-height));letter-spacing:var(--mat-expansion-container-text-tracking, var(--mat-app-body-large-tracking))}.mat-expansion-panel-content[style*="visibility: hidden"] *{visibility:hidden !important}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px;border-top-color:var(--mat-expansion-actions-divider-color, var(--mat-app-outline))}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}']
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: SkipSelf
    }, {
      type: Inject,
      args: [MAT_ACCORDION]
    }]
  }, {
    type: ChangeDetectorRef
  }, {
    type: UniqueSelectionDispatcher
  }, {
    type: ViewContainerRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_EXPANSION_PANEL_DEFAULT_OPTIONS]
    }, {
      type: Optional
    }]
  }], {
    hideToggle: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    togglePosition: [{
      type: Input
    }],
    afterExpand: [{
      type: Output
    }],
    afterCollapse: [{
      type: Output
    }],
    _lazyContent: [{
      type: ContentChild,
      args: [MatExpansionPanelContent]
    }],
    _body: [{
      type: ViewChild,
      args: ["body"]
    }]
  });
})();
function isInitialAnimation(event) {
  return event.fromState === "void";
}
var MatExpansionPanelActionRow = class _MatExpansionPanelActionRow {
  static {
    this.\u0275fac = function MatExpansionPanelActionRow_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatExpansionPanelActionRow)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatExpansionPanelActionRow,
      selectors: [["mat-action-row"]],
      hostAttrs: [1, "mat-action-row"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelActionRow, [{
    type: Directive,
    args: [{
      selector: "mat-action-row",
      host: {
        class: "mat-action-row"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatExpansionPanelHeader = class _MatExpansionPanelHeader {
  constructor(panel, _element, _focusMonitor, _changeDetectorRef, defaultOptions, _animationMode, tabIndex) {
    this.panel = panel;
    this._element = _element;
    this._focusMonitor = _focusMonitor;
    this._changeDetectorRef = _changeDetectorRef;
    this._animationMode = _animationMode;
    this._parentChangeSubscription = Subscription.EMPTY;
    this.tabIndex = 0;
    const accordionHideToggleChange = panel.accordion ? panel.accordion._stateChanges.pipe(filter((changes) => !!(changes["hideToggle"] || changes["togglePosition"]))) : EMPTY;
    this.tabIndex = parseInt(tabIndex || "") || 0;
    this._parentChangeSubscription = merge(panel.opened, panel.closed, accordionHideToggleChange, panel._inputChanges.pipe(filter((changes) => {
      return !!(changes["hideToggle"] || changes["disabled"] || changes["togglePosition"]);
    }))).subscribe(() => this._changeDetectorRef.markForCheck());
    panel.closed.pipe(filter(() => panel._containsFocus())).subscribe(() => _focusMonitor.focusVia(_element, "program"));
    if (defaultOptions) {
      this.expandedHeight = defaultOptions.expandedHeight;
      this.collapsedHeight = defaultOptions.collapsedHeight;
    }
  }
  /**
   * Whether the associated panel is disabled. Implemented as a part of `FocusableOption`.
   * @docs-private
   */
  get disabled() {
    return this.panel.disabled;
  }
  /** Toggles the expanded state of the panel. */
  _toggle() {
    if (!this.disabled) {
      this.panel.toggle();
    }
  }
  /** Gets whether the panel is expanded. */
  _isExpanded() {
    return this.panel.expanded;
  }
  /** Gets the expanded state string of the panel. */
  _getExpandedState() {
    return this.panel._getExpandedState();
  }
  /** Gets the panel id. */
  _getPanelId() {
    return this.panel.id;
  }
  /** Gets the toggle position for the header. */
  _getTogglePosition() {
    return this.panel.togglePosition;
  }
  /** Gets whether the expand indicator should be shown. */
  _showToggle() {
    return !this.panel.hideToggle && !this.panel.disabled;
  }
  /**
   * Gets the current height of the header. Null if no custom height has been
   * specified, and if the default height from the stylesheet should be used.
   */
  _getHeaderHeight() {
    const isExpanded = this._isExpanded();
    if (isExpanded && this.expandedHeight) {
      return this.expandedHeight;
    } else if (!isExpanded && this.collapsedHeight) {
      return this.collapsedHeight;
    }
    return null;
  }
  /** Handle keydown event calling to toggle() if appropriate. */
  _keydown(event) {
    switch (event.keyCode) {
      case SPACE:
      case ENTER:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          this._toggle();
        }
        break;
      default:
        if (this.panel.accordion) {
          this.panel.accordion._handleHeaderKeydown(event);
        }
        return;
    }
  }
  /**
   * Focuses the panel header. Implemented as a part of `FocusableOption`.
   * @param origin Origin of the action that triggered the focus.
   * @docs-private
   */
  focus(origin, options) {
    if (origin) {
      this._focusMonitor.focusVia(this._element, origin, options);
    } else {
      this._element.nativeElement.focus(options);
    }
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._element).subscribe((origin) => {
      if (origin && this.panel.accordion) {
        this.panel.accordion._handleHeaderFocus(this);
      }
    });
  }
  ngOnDestroy() {
    this._parentChangeSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._element);
  }
  static {
    this.\u0275fac = function MatExpansionPanelHeader_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatExpansionPanelHeader)(\u0275\u0275directiveInject(MatExpansionPanel, 1), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(FocusMonitor), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(MAT_EXPANSION_PANEL_DEFAULT_OPTIONS, 8), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8), \u0275\u0275injectAttribute("tabindex"));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatExpansionPanelHeader,
      selectors: [["mat-expansion-panel-header"]],
      hostAttrs: ["role", "button", 1, "mat-expansion-panel-header", "mat-focus-indicator"],
      hostVars: 15,
      hostBindings: function MatExpansionPanelHeader_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("click", function MatExpansionPanelHeader_click_HostBindingHandler() {
            return ctx._toggle();
          })("keydown", function MatExpansionPanelHeader_keydown_HostBindingHandler($event) {
            return ctx._keydown($event);
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("id", ctx.panel._headerId)("tabindex", ctx.disabled ? -1 : ctx.tabIndex)("aria-controls", ctx._getPanelId())("aria-expanded", ctx._isExpanded())("aria-disabled", ctx.panel.disabled);
          \u0275\u0275styleProp("height", ctx._getHeaderHeight());
          \u0275\u0275classProp("mat-expanded", ctx._isExpanded())("mat-expansion-toggle-indicator-after", ctx._getTogglePosition() === "after")("mat-expansion-toggle-indicator-before", ctx._getTogglePosition() === "before")("_mat-animation-noopable", ctx._animationMode === "NoopAnimations");
        }
      },
      inputs: {
        expandedHeight: "expandedHeight",
        collapsedHeight: "collapsedHeight",
        tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)]
      },
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c4,
      decls: 5,
      vars: 3,
      consts: [[1, "mat-content"], [1, "mat-expansion-indicator"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 -960 960 960", "aria-hidden", "true", "focusable", "false"], ["d", "M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"]],
      template: function MatExpansionPanelHeader_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef(_c3);
          \u0275\u0275elementStart(0, "span", 0);
          \u0275\u0275projection(1);
          \u0275\u0275projection(2, 1);
          \u0275\u0275projection(3, 2);
          \u0275\u0275elementEnd();
          \u0275\u0275template(4, MatExpansionPanelHeader_Conditional_4_Template, 3, 1, "span", 1);
        }
        if (rf & 2) {
          \u0275\u0275classProp("mat-content-hide-toggle", !ctx._showToggle());
          \u0275\u0275advance(4);
          \u0275\u0275conditional(ctx._showToggle() ? 4 : -1);
        }
      },
      styles: ['.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1);height:var(--mat-expansion-header-collapsed-state-height);font-family:var(--mat-expansion-header-text-font, var(--mat-app-title-medium-font));font-size:var(--mat-expansion-header-text-size, var(--mat-app-title-medium-size));font-weight:var(--mat-expansion-header-text-weight, var(--mat-app-title-medium-weight));line-height:var(--mat-expansion-header-text-line-height, var(--mat-app-title-medium-line-height));letter-spacing:var(--mat-expansion-header-text-tracking, var(--mat-app-title-medium-tracking))}.mat-expansion-panel-header.mat-expanded{height:var(--mat-expansion-header-expanded-state-height)}.mat-expansion-panel-header[aria-disabled=true]{color:var(--mat-expansion-header-disabled-state-text-color)}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-header-hover-state-layer-color)}@media(hover: none){.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-container-background-color, var(--mat-app-surface))}}.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused{background:var(--mat-expansion-header-focus-state-layer-color)}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-content.mat-content-hide-toggle{margin-right:8px}[dir=rtl] .mat-content.mat-content-hide-toggle{margin-right:0;margin-left:8px}.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-right:24px;margin-left:0}.mat-expansion-panel-header-title{color:var(--mat-expansion-header-text-color, var(--mat-app-on-surface))}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description{color:inherit}.mat-expansion-panel-header-description{flex-grow:2;color:var(--mat-expansion-header-description-color, var(--mat-app-on-surface-variant))}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle;color:var(--mat-expansion-header-indicator-color, var(--mat-app-on-surface-variant));display:var(--mat-expansion-legacy-header-indicator-display, inline-block)}.mat-expansion-indicator svg{width:24px;height:24px;margin:0 -8px;vertical-align:middle;fill:var(--mat-expansion-header-indicator-color, var(--mat-app-on-surface-variant));display:var(--mat-expansion-header-indicator-display, none)}.cdk-high-contrast-active .mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}'],
      encapsulation: 2,
      data: {
        animation: [matExpansionAnimations.indicatorRotate]
      },
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelHeader, [{
    type: Component,
    args: [{
      selector: "mat-expansion-panel-header",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      animations: [matExpansionAnimations.indicatorRotate],
      host: {
        "class": "mat-expansion-panel-header mat-focus-indicator",
        "role": "button",
        "[attr.id]": "panel._headerId",
        "[attr.tabindex]": "disabled ? -1 : tabIndex",
        "[attr.aria-controls]": "_getPanelId()",
        "[attr.aria-expanded]": "_isExpanded()",
        "[attr.aria-disabled]": "panel.disabled",
        "[class.mat-expanded]": "_isExpanded()",
        "[class.mat-expansion-toggle-indicator-after]": `_getTogglePosition() === 'after'`,
        "[class.mat-expansion-toggle-indicator-before]": `_getTogglePosition() === 'before'`,
        "[class._mat-animation-noopable]": '_animationMode === "NoopAnimations"',
        "[style.height]": "_getHeaderHeight()",
        "(click)": "_toggle()",
        "(keydown)": "_keydown($event)"
      },
      standalone: true,
      template: '<span class="mat-content" [class.mat-content-hide-toggle]="!_showToggle()">\n  <ng-content select="mat-panel-title"></ng-content>\n  <ng-content select="mat-panel-description"></ng-content>\n  <ng-content></ng-content>\n</span>\n\n@if (_showToggle()) {\n  <span [@indicatorRotate]="_getExpandedState()" class="mat-expansion-indicator">\n    <svg\n      xmlns="http://www.w3.org/2000/svg"\n      viewBox="0 -960 960 960"\n      aria-hidden="true"\n      focusable="false">\n      <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/>\n    </svg>\n  </span>\n}\n',
      styles: ['.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1);height:var(--mat-expansion-header-collapsed-state-height);font-family:var(--mat-expansion-header-text-font, var(--mat-app-title-medium-font));font-size:var(--mat-expansion-header-text-size, var(--mat-app-title-medium-size));font-weight:var(--mat-expansion-header-text-weight, var(--mat-app-title-medium-weight));line-height:var(--mat-expansion-header-text-line-height, var(--mat-app-title-medium-line-height));letter-spacing:var(--mat-expansion-header-text-tracking, var(--mat-app-title-medium-tracking))}.mat-expansion-panel-header.mat-expanded{height:var(--mat-expansion-header-expanded-state-height)}.mat-expansion-panel-header[aria-disabled=true]{color:var(--mat-expansion-header-disabled-state-text-color)}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-header-hover-state-layer-color)}@media(hover: none){.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-container-background-color, var(--mat-app-surface))}}.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused{background:var(--mat-expansion-header-focus-state-layer-color)}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-content.mat-content-hide-toggle{margin-right:8px}[dir=rtl] .mat-content.mat-content-hide-toggle{margin-right:0;margin-left:8px}.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-right:24px;margin-left:0}.mat-expansion-panel-header-title{color:var(--mat-expansion-header-text-color, var(--mat-app-on-surface))}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description{color:inherit}.mat-expansion-panel-header-description{flex-grow:2;color:var(--mat-expansion-header-description-color, var(--mat-app-on-surface-variant))}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle;color:var(--mat-expansion-header-indicator-color, var(--mat-app-on-surface-variant));display:var(--mat-expansion-legacy-header-indicator-display, inline-block)}.mat-expansion-indicator svg{width:24px;height:24px;margin:0 -8px;vertical-align:middle;fill:var(--mat-expansion-header-indicator-color, var(--mat-app-on-surface-variant));display:var(--mat-expansion-header-indicator-display, none)}.cdk-high-contrast-active .mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}']
    }]
  }], () => [{
    type: MatExpansionPanel,
    decorators: [{
      type: Host
    }]
  }, {
    type: ElementRef
  }, {
    type: FocusMonitor
  }, {
    type: ChangeDetectorRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_EXPANSION_PANEL_DEFAULT_OPTIONS]
    }, {
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Attribute,
      args: ["tabindex"]
    }]
  }], {
    expandedHeight: [{
      type: Input
    }],
    collapsedHeight: [{
      type: Input
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }]
  });
})();
var MatExpansionPanelDescription = class _MatExpansionPanelDescription {
  static {
    this.\u0275fac = function MatExpansionPanelDescription_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatExpansionPanelDescription)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatExpansionPanelDescription,
      selectors: [["mat-panel-description"]],
      hostAttrs: [1, "mat-expansion-panel-header-description"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelDescription, [{
    type: Directive,
    args: [{
      selector: "mat-panel-description",
      host: {
        class: "mat-expansion-panel-header-description"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatExpansionPanelTitle = class _MatExpansionPanelTitle {
  static {
    this.\u0275fac = function MatExpansionPanelTitle_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatExpansionPanelTitle)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatExpansionPanelTitle,
      selectors: [["mat-panel-title"]],
      hostAttrs: [1, "mat-expansion-panel-header-title"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelTitle, [{
    type: Directive,
    args: [{
      selector: "mat-panel-title",
      host: {
        class: "mat-expansion-panel-header-title"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatAccordion = class _MatAccordion extends CdkAccordion {
  constructor() {
    super(...arguments);
    this._ownHeaders = new QueryList();
    this.hideToggle = false;
    this.displayMode = "default";
    this.togglePosition = "after";
  }
  ngAfterContentInit() {
    this._headers.changes.pipe(startWith(this._headers)).subscribe((headers) => {
      this._ownHeaders.reset(headers.filter((header) => header.panel.accordion === this));
      this._ownHeaders.notifyOnChanges();
    });
    this._keyManager = new FocusKeyManager(this._ownHeaders).withWrap().withHomeAndEnd();
  }
  /** Handles keyboard events coming in from the panel headers. */
  _handleHeaderKeydown(event) {
    this._keyManager.onKeydown(event);
  }
  _handleHeaderFocus(header) {
    this._keyManager.updateActiveItem(header);
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._keyManager?.destroy();
    this._ownHeaders.destroy();
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MatAccordion_BaseFactory;
      return function MatAccordion_Factory(__ngFactoryType__) {
        return (\u0275MatAccordion_BaseFactory || (\u0275MatAccordion_BaseFactory = \u0275\u0275getInheritedFactory(_MatAccordion)))(__ngFactoryType__ || _MatAccordion);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatAccordion,
      selectors: [["mat-accordion"]],
      contentQueries: function MatAccordion_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatExpansionPanelHeader, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._headers = _t);
        }
      },
      hostAttrs: [1, "mat-accordion"],
      hostVars: 2,
      hostBindings: function MatAccordion_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classProp("mat-accordion-multi", ctx.multi);
        }
      },
      inputs: {
        hideToggle: [2, "hideToggle", "hideToggle", booleanAttribute],
        displayMode: "displayMode",
        togglePosition: "togglePosition"
      },
      exportAs: ["matAccordion"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([{
        provide: MAT_ACCORDION,
        useExisting: _MatAccordion
      }]), \u0275\u0275InputTransformsFeature, \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAccordion, [{
    type: Directive,
    args: [{
      selector: "mat-accordion",
      exportAs: "matAccordion",
      providers: [{
        provide: MAT_ACCORDION,
        useExisting: MatAccordion
      }],
      host: {
        class: "mat-accordion",
        // Class binding which is only used by the test harness as there is no other
        // way for the harness to detect if multiple panel support is enabled.
        "[class.mat-accordion-multi]": "this.multi"
      },
      standalone: true
    }]
  }], null, {
    _headers: [{
      type: ContentChildren,
      args: [MatExpansionPanelHeader, {
        descendants: true
      }]
    }],
    hideToggle: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    displayMode: [{
      type: Input
    }],
    togglePosition: [{
      type: Input
    }]
  });
})();
var MatExpansionModule = class _MatExpansionModule {
  static {
    this.\u0275fac = function MatExpansionModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatExpansionModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatExpansionModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [MatCommonModule, CdkAccordionModule, PortalModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, CdkAccordionModule, PortalModule, MatAccordion, MatExpansionPanel, MatExpansionPanelActionRow, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatExpansionPanelContent],
      exports: [MatAccordion, MatExpansionPanel, MatExpansionPanelActionRow, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatExpansionPanelContent]
    }]
  }], null, null);
})();

// src/app/services/lesson-tag.service.ts
var LessonTagService = class _LessonTagService {
  http;
  apiUrl = `${environment.apiUrl}/lesson-tags`;
  constructor(http) {
    this.http = http;
  }
  getTagsByLessonId(lessonId) {
    return this.http.get(`${this.apiUrl}/lesson/${lessonId}`);
  }
  addLessonTag(lessonTag) {
    return this.http.post(this.apiUrl, lessonTag);
  }
  updateLessonTag(lessonTagId, lessonTag) {
    return this.http.put(`${this.apiUrl}/${lessonTagId}`, lessonTag);
  }
  deleteLessonTag(lessonTagId) {
    return this.http.delete(`${this.apiUrl}/${lessonTagId}`);
  }
  static \u0275fac = function LessonTagService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LessonTagService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LessonTagService, factory: _LessonTagService.\u0275fac, providedIn: "root" });
};

// src/app/pages/lessons/add-lesson/add-lesson.component.ts
function AddLessonComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading lesson data...");
    \u0275\u0275elementEnd()();
  }
}
function AddLessonComponent_form_14_mat_option_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const course_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", course_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.displayCourseFn(course_r3), " ");
  }
}
function AddLessonComponent_form_14_mat_option_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const topic_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", topic_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.displayTopicFn(topic_r4), " ");
  }
}
function AddLessonComponent_form_14_mat_hint_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-hint", 50);
    \u0275\u0275text(1, " Please select a course first to view available topics ");
    \u0275\u0275elementEnd();
  }
}
function AddLessonComponent_form_14_mat_error_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Topic selection is required ");
    \u0275\u0275elementEnd();
  }
}
function AddLessonComponent_form_14_mat_error_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Title is required ");
    \u0275\u0275elementEnd();
  }
}
function AddLessonComponent_form_14_mat_error_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Content type is required ");
    \u0275\u0275elementEnd();
  }
}
function AddLessonComponent_form_14_mat_form_field_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 11)(1, "mat-label");
    \u0275\u0275text(2, "Order Number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 51);
    \u0275\u0275elementStart(4, "mat-hint");
    \u0275\u0275text(5, "Position of this lesson within the topic");
    \u0275\u0275elementEnd()();
  }
}
function AddLessonComponent_form_14_mat_expansion_panel_95_mat_chip_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 106)(1, "mat-icon");
    \u0275\u0275text(2, "star");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Important ");
    \u0275\u0275elementEnd();
  }
}
function AddLessonComponent_form_14_mat_expansion_panel_95_mat_error_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Title is required ");
    \u0275\u0275elementEnd();
  }
}
function AddLessonComponent_form_14_mat_expansion_panel_95_mat_error_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Content type is required ");
    \u0275\u0275elementEnd();
  }
}
function AddLessonComponent_form_14_mat_expansion_panel_95_div_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 107);
    \u0275\u0275text(1, " Content is required ");
    \u0275\u0275elementEnd();
  }
}
function AddLessonComponent_form_14_mat_expansion_panel_95_mat_form_field_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 11)(1, "mat-label");
    \u0275\u0275text(2, "Visual Aid URL");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 108);
    \u0275\u0275elementStart(4, "mat-hint");
    \u0275\u0275text(5, "URL to an image, diagram, or visual aid");
    \u0275\u0275elementEnd()();
  }
}
function AddLessonComponent_form_14_mat_expansion_panel_95_div_113_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tagOption_r8 = ctx.$implicit;
    \u0275\u0275property("value", tagOption_r8.tagId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tagOption_r8.tagName, " ");
  }
}
function AddLessonComponent_form_14_mat_expansion_panel_95_div_113_mat_error_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Tag selection is required ");
    \u0275\u0275elementEnd();
  }
}
function AddLessonComponent_form_14_mat_expansion_panel_95_div_113_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 109)(1, "mat-form-field", 110)(2, "mat-label");
    \u0275\u0275text(3, "Tag");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-select", 111);
    \u0275\u0275template(5, AddLessonComponent_form_14_mat_expansion_panel_95_div_113_mat_option_5_Template, 2, 2, "mat-option", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, AddLessonComponent_form_14_mat_expansion_panel_95_div_113_mat_error_6_Template, 2, 0, "mat-error", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-form-field", 112)(8, "mat-label");
    \u0275\u0275text(9, "Relevance Score");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 113);
    \u0275\u0275elementStart(11, "mat-hint");
    \u0275\u0275text(12, "1-10 scale");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 114);
    \u0275\u0275listener("click", function AddLessonComponent_form_14_mat_expansion_panel_95_div_113_Template_button_click_13_listener() {
      const j_r9 = \u0275\u0275restoreView(_r7).index;
      const i_r6 = \u0275\u0275nextContext().index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeKeynoteTag(i_r6, j_r9));
    });
    \u0275\u0275elementStart(14, "mat-icon");
    \u0275\u0275text(15, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    const keynoteTag_r10 = ctx.$implicit;
    const j_r9 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("formGroupName", j_r9);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.allTags);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_11_0 = keynoteTag_r10.get("tagId")) == null ? null : tmp_11_0.hasError("required"));
  }
}
function AddLessonComponent_form_14_mat_expansion_panel_95_div_114_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 115)(1, "mat-icon");
    \u0275\u0275text(2, "local_offer_outlined");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "No tags added to this keynote yet.");
    \u0275\u0275elementEnd()();
  }
}
function AddLessonComponent_form_14_mat_expansion_panel_95_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-expansion-panel", 52)(1, "mat-expansion-panel-header")(2, "mat-panel-title")(3, "div", 53)(4, "mat-icon", 54);
    \u0275\u0275text(5, "note_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 55);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, AddLessonComponent_form_14_mat_expansion_panel_95_mat_chip_8_Template, 4, 0, "mat-chip", 56);
    \u0275\u0275elementStart(9, "mat-chip", 57);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "mat-panel-description")(12, "span", 58);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 59)(15, "mat-form-field", 11)(16, "mat-label");
    \u0275\u0275text(17, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "input", 60);
    \u0275\u0275template(19, AddLessonComponent_form_14_mat_expansion_panel_95_mat_error_19_Template, 2, 0, "mat-error", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "mat-form-field", 11)(21, "mat-label");
    \u0275\u0275text(22, "Content Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "mat-select", 26)(24, "mat-option", 61);
    \u0275\u0275text(25, "Text");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "mat-option", 62);
    \u0275\u0275text(27, "Bullet Points");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "mat-option", 63);
    \u0275\u0275text(29, "Quote");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "mat-option", 64);
    \u0275\u0275text(31, "Example");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(32, AddLessonComponent_form_14_mat_expansion_panel_95_mat_error_32_Template, 2, 0, "mat-error", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 65)(34, "label", 23);
    \u0275\u0275text(35, "Content");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 66);
    \u0275\u0275element(37, "quill-editor", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 68);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275template(40, AddLessonComponent_form_14_mat_expansion_panel_95_div_40_Template, 2, 0, "div", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 70)(42, "mat-checkbox", 71);
    \u0275\u0275text(43, " Mark as Important ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "mat-checkbox", 72);
    \u0275\u0275text(45, " Has Visual Aid ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(46, AddLessonComponent_form_14_mat_expansion_panel_95_mat_form_field_46_Template, 6, 0, "mat-form-field", 33);
    \u0275\u0275elementStart(47, "div", 70)(48, "mat-form-field", 73)(49, "mat-label");
    \u0275\u0275text(50, "Related Planet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "mat-select", 74)(52, "mat-option", 75);
    \u0275\u0275text(53, "None");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "mat-option", 76);
    \u0275\u0275text(55, "Sun");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "mat-option", 77);
    \u0275\u0275text(57, "Moon");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "mat-option", 78);
    \u0275\u0275text(59, "Mars");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "mat-option", 79);
    \u0275\u0275text(61, "Mercury");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "mat-option", 80);
    \u0275\u0275text(63, "Jupiter");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "mat-option", 81);
    \u0275\u0275text(65, "Venus");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "mat-option", 82);
    \u0275\u0275text(67, "Saturn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "mat-option", 83);
    \u0275\u0275text(69, "Rahu");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "mat-option", 84);
    \u0275\u0275text(71, "Ketu");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(72, "mat-form-field", 73)(73, "mat-label");
    \u0275\u0275text(74, "Related Zodiac");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "mat-select", 85)(76, "mat-option", 75);
    \u0275\u0275text(77, "None");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "mat-option", 86);
    \u0275\u0275text(79, "Aries");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "mat-option", 87);
    \u0275\u0275text(81, "Taurus");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "mat-option", 88);
    \u0275\u0275text(83, "Gemini");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "mat-option", 89);
    \u0275\u0275text(85, "Cancer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "mat-option", 90);
    \u0275\u0275text(87, "Leo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "mat-option", 91);
    \u0275\u0275text(89, "Virgo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "mat-option", 92);
    \u0275\u0275text(91, "Libra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "mat-option", 93);
    \u0275\u0275text(93, "Scorpio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "mat-option", 94);
    \u0275\u0275text(95, "Sagittarius");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "mat-option", 95);
    \u0275\u0275text(97, "Capricorn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "mat-option", 96);
    \u0275\u0275text(99, "Aquarius");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "mat-option", 97);
    \u0275\u0275text(101, "Pisces");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(102, "div", 98)(103, "div", 36)(104, "h4", 99)(105, "mat-icon");
    \u0275\u0275text(106, "local_offer");
    \u0275\u0275elementEnd();
    \u0275\u0275text(107, " Keynote Tags ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "button", 100);
    \u0275\u0275listener("click", function AddLessonComponent_form_14_mat_expansion_panel_95_Template_button_click_108_listener() {
      const i_r6 = \u0275\u0275restoreView(_r5).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.addKeynoteTag(i_r6));
    });
    \u0275\u0275elementStart(109, "mat-icon");
    \u0275\u0275text(110, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(111, " Add Tag ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(112, "div", 101);
    \u0275\u0275template(113, AddLessonComponent_form_14_mat_expansion_panel_95_div_113_Template, 16, 3, "div", 102)(114, AddLessonComponent_form_14_mat_expansion_panel_95_div_114_Template, 5, 0, "div", 103);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(115, "div", 104)(116, "button", 105);
    \u0275\u0275listener("click", function AddLessonComponent_form_14_mat_expansion_panel_95_Template_button_click_116_listener() {
      const i_r6 = \u0275\u0275restoreView(_r5).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeKeynote(i_r6));
    });
    \u0275\u0275elementStart(117, "mat-icon");
    \u0275\u0275text(118, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(119, " Remove ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_12_0;
    let tmp_13_0;
    let tmp_14_0;
    let tmp_16_0;
    let tmp_17_0;
    let tmp_18_0;
    let tmp_19_0;
    const keynote_r11 = ctx.$implicit;
    const i_r6 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("formGroupName", i_r6)("expanded", (tmp_7_0 = keynote_r11.get("isNew")) == null ? null : tmp_7_0.value);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ((tmp_8_0 = keynote_r11.get("title")) == null ? null : tmp_8_0.value) || "New Keynote", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_9_0 = keynote_r11.get("isImportant")) == null ? null : tmp_9_0.value);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "content-type-" + ((tmp_10_0 = keynote_r11.get("contentType")) == null ? null : tmp_10_0.value));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getContentTypeLabel((tmp_11_0 = keynote_r11.get("contentType")) == null ? null : tmp_11_0.value), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getKeynotePreview((tmp_12_0 = keynote_r11.get("content")) == null ? null : tmp_12_0.value), " ");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", (tmp_13_0 = keynote_r11.get("title")) == null ? null : tmp_13_0.hasError("required"));
    \u0275\u0275advance(13);
    \u0275\u0275property("ngIf", (tmp_14_0 = keynote_r11.get("contentType")) == null ? null : tmp_14_0.hasError("required"));
    \u0275\u0275advance(5);
    \u0275\u0275property("modules", ctx_r1.quillModules)("placeholder", ctx_r1.getContentPlaceholder((tmp_16_0 = keynote_r11.get("contentType")) == null ? null : tmp_16_0.value));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getContentHint((tmp_17_0 = keynote_r11.get("contentType")) == null ? null : tmp_17_0.value));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_18_0 = keynote_r11.get("content")) == null ? null : tmp_18_0.hasError("required"));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", (tmp_19_0 = keynote_r11.get("hasVisualAid")) == null ? null : tmp_19_0.value);
    \u0275\u0275advance(67);
    \u0275\u0275property("ngForOf", ctx_r1.getKeynoteTags(i_r6).controls);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getKeynoteTags(i_r6).length === 0);
  }
}
function AddLessonComponent_form_14_div_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 116)(1, "mat-icon");
    \u0275\u0275text(2, "note_add");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, 'No keynotes added yet. Click "Add Keynote" to get started.');
    \u0275\u0275elementEnd()();
  }
}
function AddLessonComponent_form_14_div_109_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tagOption_r13 = ctx.$implicit;
    \u0275\u0275property("value", tagOption_r13.tagId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tagOption_r13.tagName, " ");
  }
}
function AddLessonComponent_form_14_div_109_mat_error_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Tag selection is required ");
    \u0275\u0275elementEnd();
  }
}
function AddLessonComponent_form_14_div_109_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 117)(1, "mat-form-field", 11)(2, "mat-label");
    \u0275\u0275text(3, "Tag");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-select", 111);
    \u0275\u0275template(5, AddLessonComponent_form_14_div_109_mat_option_5_Template, 2, 2, "mat-option", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, AddLessonComponent_form_14_div_109_mat_error_6_Template, 2, 0, "mat-error", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-form-field", 11)(8, "mat-label");
    \u0275\u0275text(9, "Relevance Score");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 118);
    \u0275\u0275elementStart(11, "mat-hint");
    \u0275\u0275text(12, "Enter a score from 1-10 indicating relevance to the lesson");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 119)(14, "button", 120);
    \u0275\u0275listener("click", function AddLessonComponent_form_14_div_109_Template_button_click_14_listener() {
      const i_r14 = \u0275\u0275restoreView(_r12).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveTag(i_r14));
    });
    \u0275\u0275elementStart(15, "mat-icon");
    \u0275\u0275text(16, "save");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 121);
    \u0275\u0275listener("click", function AddLessonComponent_form_14_div_109_Template_button_click_17_listener() {
      const i_r14 = \u0275\u0275restoreView(_r12).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeTag(i_r14));
    });
    \u0275\u0275elementStart(18, "mat-icon");
    \u0275\u0275text(19, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " Remove ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_8_0;
    const tag_r15 = ctx.$implicit;
    const i_r14 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("formGroupName", i_r14);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.allTags);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_8_0 = tag_r15.get("tagId")) == null ? null : tmp_8_0.hasError("required"));
  }
}
function AddLessonComponent_form_14_div_110_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 122)(1, "mat-icon");
    \u0275\u0275text(2, "label_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, 'No tags added yet. Click "Add Tag" to get started.');
    \u0275\u0275elementEnd()();
  }
}
function AddLessonComponent_form_14_mat_spinner_116_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 123);
  }
}
function AddLessonComponent_form_14_span_118_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" with ", ctx_r1.keynotes.length, " Keynote(s)");
  }
}
function AddLessonComponent_form_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 8);
    \u0275\u0275listener("ngSubmit", function AddLessonComponent_form_14_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 9)(2, "h3", 10)(3, "mat-icon");
    \u0275\u0275text(4, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Lesson Information ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-form-field", 11)(7, "mat-label");
    \u0275\u0275text(8, "Search Course");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 12);
    \u0275\u0275elementStart(10, "mat-autocomplete", 13, 0);
    \u0275\u0275listener("optionSelected", function AddLessonComponent_form_14_Template_mat_autocomplete_optionSelected_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCourseSelected($event));
    });
    \u0275\u0275template(12, AddLessonComponent_form_14_mat_option_12_Template, 2, 2, "mat-option", 14);
    \u0275\u0275pipe(13, "async");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-icon", 15);
    \u0275\u0275text(15, "school");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "mat-hint");
    \u0275\u0275text(17, "Select a course to filter topics");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "mat-form-field", 11)(19, "mat-label");
    \u0275\u0275text(20, "Course ID");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 16);
    \u0275\u0275elementStart(22, "mat-hint");
    \u0275\u0275text(23, "Selected from course search above");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "mat-form-field", 11)(25, "mat-label");
    \u0275\u0275text(26, "Search Topic");
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "input", 17);
    \u0275\u0275elementStart(28, "mat-autocomplete", 13, 1);
    \u0275\u0275listener("optionSelected", function AddLessonComponent_form_14_Template_mat_autocomplete_optionSelected_28_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTopicSelected($event));
    });
    \u0275\u0275template(30, AddLessonComponent_form_14_mat_option_30_Template, 2, 2, "mat-option", 14);
    \u0275\u0275pipe(31, "async");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "mat-icon", 15);
    \u0275\u0275text(33, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275template(34, AddLessonComponent_form_14_mat_hint_34_Template, 2, 0, "mat-hint", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "mat-form-field", 11)(36, "mat-label");
    \u0275\u0275text(37, "Topic ID");
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "input", 19);
    \u0275\u0275elementStart(39, "mat-hint");
    \u0275\u0275text(40, "Selected from topic search above");
    \u0275\u0275elementEnd();
    \u0275\u0275template(41, AddLessonComponent_form_14_mat_error_41_Template, 2, 0, "mat-error", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "mat-form-field", 11)(43, "mat-label");
    \u0275\u0275text(44, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275element(45, "input", 21);
    \u0275\u0275template(46, AddLessonComponent_form_14_mat_error_46_Template, 2, 0, "mat-error", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 22)(48, "label", 23);
    \u0275\u0275text(49, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 24);
    \u0275\u0275element(51, "quill-editor", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "mat-form-field", 11)(53, "mat-label");
    \u0275\u0275text(54, "Content Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "mat-select", 26)(56, "mat-option", 27);
    \u0275\u0275text(57, "Video");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "mat-option", 28);
    \u0275\u0275text(59, "Article");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "mat-option", 29);
    \u0275\u0275text(61, "Quiz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "mat-option", 30);
    \u0275\u0275text(63, "Exercise");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(64, AddLessonComponent_form_14_mat_error_64_Template, 2, 0, "mat-error", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "mat-form-field", 11)(66, "mat-label");
    \u0275\u0275text(67, "Content URL");
    \u0275\u0275elementEnd();
    \u0275\u0275element(68, "input", 31);
    \u0275\u0275elementStart(69, "mat-hint");
    \u0275\u0275text(70, "URL to the lesson content (video, article, etc.)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "mat-form-field", 11)(72, "mat-label");
    \u0275\u0275text(73, "Duration (minutes)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(74, "input", 32);
    \u0275\u0275elementStart(75, "mat-hint");
    \u0275\u0275text(76, "Estimated time to complete this lesson");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(77, AddLessonComponent_form_14_mat_form_field_77_Template, 6, 0, "mat-form-field", 33);
    \u0275\u0275elementStart(78, "div", 34)(79, "mat-checkbox", 35)(80, "strong");
    \u0275\u0275text(81, "Free lesson");
    \u0275\u0275elementEnd();
    \u0275\u0275text(82, " (accessible without payment) ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(83, "mat-divider");
    \u0275\u0275elementStart(84, "div", 9)(85, "div", 36)(86, "h3", 10)(87, "mat-icon");
    \u0275\u0275text(88, "note_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(89, " Lesson Keynotes ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "button", 37);
    \u0275\u0275listener("click", function AddLessonComponent_form_14_Template_button_click_90_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addKeynote());
    });
    \u0275\u0275elementStart(91, "mat-icon");
    \u0275\u0275text(92, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(93, " Add Keynote ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(94, "div", 38);
    \u0275\u0275template(95, AddLessonComponent_form_14_mat_expansion_panel_95_Template, 120, 16, "mat-expansion-panel", 39)(96, AddLessonComponent_form_14_div_96_Template, 5, 0, "div", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(97, "mat-divider");
    \u0275\u0275elementStart(98, "div", 9)(99, "div", 36)(100, "h3", 10)(101, "mat-icon");
    \u0275\u0275text(102, "label");
    \u0275\u0275elementEnd();
    \u0275\u0275text(103, " Lesson Tags ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(104, "button", 41);
    \u0275\u0275listener("click", function AddLessonComponent_form_14_Template_button_click_104_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addTag());
    });
    \u0275\u0275elementStart(105, "mat-icon");
    \u0275\u0275text(106, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(107, " Add Tag ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(108, "div", 42);
    \u0275\u0275template(109, AddLessonComponent_form_14_div_109_Template, 21, 3, "div", 43)(110, AddLessonComponent_form_14_div_110_Template, 5, 0, "div", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(111, "mat-divider");
    \u0275\u0275elementStart(112, "div", 45)(113, "button", 46);
    \u0275\u0275listener("click", function AddLessonComponent_form_14_Template_button_click_113_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(114, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(115, "button", 47);
    \u0275\u0275template(116, AddLessonComponent_form_14_mat_spinner_116_Template, 1, 0, "mat-spinner", 48);
    \u0275\u0275text(117);
    \u0275\u0275template(118, AddLessonComponent_form_14_span_118_Template, 2, 1, "span", 20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_8_0;
    let tmp_11_0;
    let tmp_12_0;
    let tmp_13_0;
    let tmp_15_0;
    const courseAuto_r16 = \u0275\u0275reference(11);
    const auto_r17 = \u0275\u0275reference(29);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.lessonForm);
    \u0275\u0275advance(9);
    \u0275\u0275property("matAutocomplete", courseAuto_r16);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r1.displayCourseFn);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", \u0275\u0275pipeBind1(13, 22, ctx_r1.filteredCourses));
    \u0275\u0275advance(15);
    \u0275\u0275property("matAutocomplete", auto_r17)("disabled", !((tmp_8_0 = ctx_r1.lessonForm.get("courseId")) == null ? null : tmp_8_0.value));
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r1.displayTopicFn);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", \u0275\u0275pipeBind1(31, 24, ctx_r1.filteredTopics));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !((tmp_11_0 = ctx_r1.lessonForm.get("courseId")) == null ? null : tmp_11_0.value));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", (tmp_12_0 = ctx_r1.lessonForm.get("topicId")) == null ? null : tmp_12_0.hasError("required"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", (tmp_13_0 = ctx_r1.lessonForm.get("title")) == null ? null : tmp_13_0.hasError("required"));
    \u0275\u0275advance(5);
    \u0275\u0275property("modules", ctx_r1.quillModules);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngIf", (tmp_15_0 = ctx_r1.lessonForm.get("contentType")) == null ? null : tmp_15_0.hasError("required"));
    \u0275\u0275advance(13);
    \u0275\u0275property("ngIf", ctx_r1.isEditMode);
    \u0275\u0275advance(18);
    \u0275\u0275property("ngForOf", ctx_r1.keynotes.controls);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.keynotes.length === 0);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.tags.controls);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tags.length === 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.lessonForm.invalid || ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.submitting ? ctx_r1.isEditMode ? "Updating..." : "Creating..." : ctx_r1.isEditMode ? "Update" : "Create", " Lesson ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.keynotes.length > 0 && !ctx_r1.submitting);
  }
}
var AddLessonComponent = class _AddLessonComponent {
  lessonForm;
  filteredTopics = of([]);
  filteredCourses = of([]);
  isEditMode = false;
  lessonId = null;
  allTags = [];
  // Available tags for selection
  allCourses = [];
  // Available courses for selection
  loading = false;
  submitting = false;
  // Quill editor configuration
  quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ "header": 1 }, { "header": 2 }],
      [{ "list": "ordered" }, { "list": "bullet" }],
      [{ "script": "sub" }, { "script": "super" }],
      [{ "indent": "-1" }, { "indent": "+1" }],
      [{ "direction": "rtl" }],
      [{ "size": ["small", false, "large", "huge"] }],
      [{ "header": [1, 2, 3, 4, 5, 6, false] }],
      [{ "color": [] }, { "background": [] }],
      [{ "font": [] }],
      [{ "align": [] }],
      ["clean"],
      ["link"]
    ]
  };
  fb = inject(FormBuilder);
  lessonService = inject(LessonService);
  topicService = inject(TopicService);
  courseService = inject(CourseService);
  keynoteService = inject(LessonKeynoteService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  snackBar = inject(MatSnackBar);
  lessonTagService = inject(LessonTagService);
  keynoteTagService = inject(KeynoteTagService);
  tagService = inject(TagService);
  constructor() {
    this.lessonForm = this.fb.group({
      title: ["", Validators.required],
      description: [""],
      courseId: [""],
      courseSearch: [""],
      topicId: ["", Validators.required],
      topicSearch: [""],
      contentType: ["", Validators.required],
      contentUrl: [""],
      durationMinutes: [""],
      orderNumber: [1],
      isFree: [false],
      tags: this.fb.array([]),
      keynotes: this.fb.array([])
    });
  }
  get tags() {
    return this.lessonForm.get("tags");
  }
  get keynotes() {
    return this.lessonForm.get("keynotes");
  }
  ngOnInit() {
    this.setupCourseAutocomplete();
    this.setupTopicAutocomplete();
    this.checkEditMode();
    this.loadAllTags();
    this.loadAllCourses();
    this.handleNavigationState();
  }
  handleNavigationState() {
    const navigation = this.router.getCurrentNavigation();
    const state2 = navigation?.extras?.state || window.history.state;
    if (state2 && state2.selectedTopic && !this.isEditMode) {
      const selectedTopic = state2.selectedTopic;
      this.courseService.getCourseById(selectedTopic.courseId).subscribe({
        next: (course) => {
          this.lessonForm.patchValue({
            courseId: selectedTopic.courseId,
            courseSearch: course,
            topicId: selectedTopic.topicId,
            topicSearch: selectedTopic
          });
        },
        error: () => {
          console.error("Error loading course for selected topic");
        }
      });
    }
  }
  setupCourseAutocomplete() {
    this.filteredCourses = this.lessonForm.get("courseSearch").valueChanges.pipe(startWith(""), debounceTime(300), distinctUntilChanged(), switchMap((value) => this._filterCourses(value)));
  }
  setupTopicAutocomplete() {
    this.filteredTopics = this.lessonForm.get("topicSearch").valueChanges.pipe(startWith(""), debounceTime(300), distinctUntilChanged(), switchMap((value) => this._filterTopics(value)));
  }
  _filterCourses(value) {
    if (typeof value !== "string") {
      return of([]);
    }
    if (!value || value.trim() === "") {
      return this.courseService.getAllCourses();
    }
    const filterValue = value.toLowerCase();
    return this.courseService.getAllCourses().pipe(switchMap((courses) => of(courses.filter((course) => course.title.toLowerCase().includes(filterValue)))));
  }
  _filterTopics(value) {
    if (typeof value !== "string") {
      return of([]);
    }
    const selectedCourseId = this.lessonForm.get("courseId")?.value;
    if (!selectedCourseId) {
      return of([]);
    }
    return this.topicService.getTopicsByCourseId(selectedCourseId).pipe(switchMap((topics) => {
      if (!value || value.trim() === "") {
        return of(topics);
      }
      const filterValue = value.toLowerCase();
      return of(topics.filter((topic) => topic.title.toLowerCase().includes(filterValue)));
    }));
  }
  displayCourseFn = (course) => {
    return course ? `${course.title} (ID: ${course.courseId})` : "";
  };
  displayTopicFn = (topic) => {
    return topic ? `${topic.title} (ID: ${topic.topicId})` : "";
  };
  onCourseSelected(event) {
    const course = event.option.value;
    this.lessonForm.patchValue({
      courseId: course.courseId,
      topicId: "",
      // Clear topic selection when course changes
      topicSearch: ""
      // Clear topic search when course changes
    });
    this.lessonForm.get("topicSearch")?.updateValueAndValidity();
  }
  onTopicSelected(event) {
    const topic = event.option.value;
    this.lessonForm.patchValue({
      topicId: topic.topicId
    });
  }
  loadAllCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses;
      },
      error: (error) => {
        console.error("Error loading courses:", error);
        this.snackBar.open("Error loading courses", "Close", {
          duration: 3e3
        });
      }
    });
  }
  addKeynote() {
    const keynoteForm = this.fb.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      contentType: ["text", Validators.required],
      isImportant: [false],
      hasVisualAid: [false],
      visualAidUrl: [""],
      relatedPlanet: [""],
      relatedZodiac: [""],
      keynoteTags: this.fb.array([]),
      // Add keynote tags form array
      isNew: [true]
      // Flag to expand new keynotes
    });
    this.keynotes.push(keynoteForm);
  }
  removeKeynote(index) {
    this.keynotes.removeAt(index);
  }
  addTag() {
    const tagForm = this.fb.group({
      lessonTagId: [null],
      tagId: [null, Validators.required],
      tagName: [""],
      relevanceScore: [1]
    });
    this.tags.push(tagForm);
  }
  removeTag(index) {
    return __async(this, null, function* () {
      const tagForm = this.tags.at(index);
      const tagData = tagForm.value;
      if (tagData.lessonTagId) {
        try {
          yield this.lessonTagService.deleteLessonTag(tagData.lessonTagId).toPromise();
          this.snackBar.open("Tag deleted successfully.", "Close", { duration: 2e3 });
          this.loadTags();
        } catch (error) {
          let errorMsg = "Failed to delete tag. Please try again.";
          if (error && error.error && error.error.message) {
            errorMsg = error.error.message;
          } else if (error && error.message) {
            errorMsg = error.message;
          }
          this.snackBar.open(errorMsg, "Close", { duration: 5e3 });
          console.error("Error deleting tag:", error);
        }
      } else {
        this.tags.removeAt(index);
      }
    });
  }
  // Keynote Tag methods
  getKeynoteTags(keynoteIndex) {
    const keynote = this.keynotes.at(keynoteIndex);
    return keynote.get("keynoteTags");
  }
  addKeynoteTag(keynoteIndex) {
    const keynoteTagForm = this.fb.group({
      keynoteTagId: [null],
      tagId: [null, Validators.required],
      relevanceScore: [5]
    });
    this.getKeynoteTags(keynoteIndex).push(keynoteTagForm);
  }
  removeKeynoteTag(keynoteIndex, tagIndex) {
    this.getKeynoteTags(keynoteIndex).removeAt(tagIndex);
  }
  getContentTypeLabel(contentType) {
    switch (contentType) {
      case "text":
        return "Text";
      case "bullet_points":
        return "Bullet Points";
      case "quote":
        return "Quote";
      case "example":
        return "Example";
      default:
        return contentType || "Text";
    }
  }
  getKeynotePreview(content) {
    if (!content)
      return "No content";
    const cleanContent = content.replace(/<[^>]*>/g, "");
    return cleanContent.length > 50 ? cleanContent.substring(0, 50) + "..." : cleanContent;
  }
  getContentPlaceholder(contentType) {
    switch (contentType) {
      case "bullet_points":
        return "Enter bullet points, one per line:\n\u2022 Point 1\n\u2022 Point 2\n\u2022 Point 3";
      case "quote":
        return "Enter the quote text...";
      case "example":
        return "Provide a detailed example...";
      default:
        return "Enter the keynote content...";
    }
  }
  getContentHint(contentType) {
    switch (contentType) {
      case "bullet_points":
        return "Use bullet points (\u2022), dashes (-), or asterisks (*) to separate points";
      case "quote":
        return "Inspirational or educational quotes related to the lesson";
      case "example":
        return "Practical examples that illustrate the lesson concepts";
      default:
        return "General text content for the keynote";
    }
  }
  checkEditMode() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId) && numericId > 0) {
        this.isEditMode = true;
        this.lessonId = numericId;
        console.log("Edit mode enabled for lessonId:", this.lessonId);
        this.loadLesson();
      } else {
        console.error("Invalid lesson ID in route:", id);
        this.snackBar.open("Invalid lesson ID provided", "Close", { duration: 3e3 });
        this.router.navigate(["/lessons"]);
      }
    }
  }
  loadLesson() {
    if (this.lessonId) {
      this.loading = true;
      this.lessonService.getLessonById(this.lessonId).subscribe({
        next: (lesson) => {
          this.lessonForm.patchValue({
            title: lesson.title,
            description: lesson.description,
            topicId: lesson.topicId,
            contentType: lesson.contentType,
            contentUrl: lesson.contentUrl,
            durationMinutes: lesson.durationMinutes,
            orderNumber: lesson.orderNumber,
            isFree: lesson.isFree
          });
          this.topicService.getTopicById(lesson.topicId).subscribe({
            next: (topic) => {
              this.lessonForm.patchValue({
                topicSearch: topic,
                courseId: topic.courseId
              });
              this.courseService.getCourseById(topic.courseId).subscribe({
                next: (course) => {
                  this.lessonForm.patchValue({
                    courseSearch: course
                  });
                },
                error: () => {
                  console.error("Error loading course details");
                }
              });
            }
          });
          this.loadKeynotes();
          this.loadTags();
          this.loading = false;
        },
        error: () => {
          this.snackBar.open("Error loading lesson", "Close", {
            duration: 3e3
          });
          this.loading = false;
        }
      });
    }
  }
  loadKeynotes() {
    if (this.lessonId) {
      this.keynoteService.getKeynotesByLessonId(this.lessonId).subscribe({
        next: (keynotes) => {
          while (this.keynotes.length !== 0) {
            this.keynotes.removeAt(0);
          }
          keynotes.forEach((keynote) => {
            const keynoteForm = this.fb.group({
              keynoteId: [keynote.keynoteId],
              title: [keynote.title, Validators.required],
              content: [keynote.content, Validators.required],
              contentType: [keynote.contentType, Validators.required],
              isImportant: [keynote.isImportant || false],
              hasVisualAid: [keynote.hasVisualAid || false],
              visualAidUrl: [keynote.visualAidUrl || ""],
              relatedPlanet: [keynote.relatedPlanet || ""],
              relatedZodiac: [keynote.relatedZodiac || ""],
              keynoteTags: this.fb.array([]),
              // Add keynote tags form array
              isNew: [false]
              // Existing keynotes are not expanded by default
            });
            this.keynotes.push(keynoteForm);
            if (keynote.keynoteId) {
              this.loadKeynoteTags(keynote.keynoteId, this.keynotes.length - 1);
            }
          });
        },
        error: () => {
          this.snackBar.open("Error loading keynotes", "Close", {
            duration: 3e3
          });
        }
      });
    }
  }
  loadTags() {
    if (this.lessonId && typeof this.lessonId === "number" && this.lessonId > 0) {
      console.log("Loading tags for lessonId:", this.lessonId);
      this.lessonTagService.getTagsByLessonId(this.lessonId).subscribe({
        next: (tags) => {
          console.log("Tags loaded successfully:", tags);
          while (this.tags.length !== 0) {
            this.tags.removeAt(0);
          }
          tags.forEach((tag) => {
            const tagForm = this.fb.group({
              lessonTagId: [tag.lessonTagId],
              tagId: [tag.tagId, Validators.required],
              tagName: [tag.tagName || ""],
              relevanceScore: [tag.relevanceScore || 1]
            });
            this.tags.push(tagForm);
          });
          console.log("Tags form array updated, length:", this.tags.length);
        },
        error: (error) => {
          console.error("Error loading tags:", error);
          let errorMessage = "Error loading tags";
          if (error.status) {
            errorMessage += ` (${error.status})`;
          }
          if (error.error && error.error.message) {
            errorMessage += `: ${error.error.message}`;
          }
          this.snackBar.open(errorMessage, "Close", { duration: 5e3 });
        }
      });
    } else {
      console.log("lessonId is not valid for loadTags:", this.lessonId, typeof this.lessonId);
    }
  }
  loadAllTags() {
    this.tagService.getTags().subscribe({
      next: (tags) => {
        this.allTags = tags;
      },
      error: () => {
        this.snackBar.open("Error loading tags", "Close", { duration: 3e3 });
      }
    });
  }
  loadKeynoteTags(keynoteId, keynoteIndex) {
    this.keynoteTagService.getTagsByKeynoteId(keynoteId).subscribe({
      next: (keynoteTags) => {
        const keynoteTagsArray = this.getKeynoteTags(keynoteIndex);
        while (keynoteTagsArray.length !== 0) {
          keynoteTagsArray.removeAt(0);
        }
        keynoteTags.forEach((keynoteTag) => {
          const keynoteTagForm = this.fb.group({
            keynoteTagId: [keynoteTag.keynoteTagId],
            tagId: [keynoteTag.tagId, Validators.required],
            relevanceScore: [keynoteTag.relevanceScore || 5]
          });
          keynoteTagsArray.push(keynoteTagForm);
        });
      },
      error: () => {
        this.snackBar.open("Error loading keynote tags", "Close", { duration: 3e3 });
      }
    });
  }
  onSubmit() {
    if (this.lessonForm.valid) {
      this.submitting = true;
      const formData = this.lessonForm.value;
      const lessonData = __spreadValues({
        title: formData.title,
        description: formData.description,
        topicId: formData.topicId,
        contentType: formData.contentType,
        contentUrl: formData.contentUrl,
        durationMinutes: formData.durationMinutes,
        isFree: formData.isFree
      }, this.isEditMode && { orderNumber: formData.orderNumber });
      if (this.isEditMode && this.lessonId) {
        this.lessonService.updateLesson(this.lessonId, lessonData).subscribe({
          next: () => __async(this, null, function* () {
            try {
              yield this.handleKeynotes(this.lessonId);
              yield this.handleTags(this.lessonId);
              this.snackBar.open(`Lesson updated successfully with ${this.keynotes.length} keynote(s) and ${this.tags.length} tag(s)!`, "Close", { duration: 3e3 });
              this.submitting = false;
              this.goBack();
            } catch (error) {
              console.error("Error updating keynotes/tags:", error);
              this.snackBar.open("Lesson updated but some keynotes or tags failed to save", "Close", { duration: 5e3 });
              this.submitting = false;
              this.goBack();
            }
          }),
          error: (error) => {
            console.error("Error updating lesson:", error);
            this.snackBar.open("Error updating lesson. Please try again.", "Close", {
              duration: 5e3
            });
            this.submitting = false;
          }
        });
      } else {
        this.lessonService.createLesson(lessonData).subscribe({
          next: (lesson) => __async(this, null, function* () {
            try {
              yield this.handleKeynotes(lesson.lessonId);
              yield this.handleTags(lesson.lessonId);
              this.snackBar.open(`Lesson created successfully with ${this.keynotes.length} keynote(s) and ${this.tags.length} tag(s)!`, "Close", { duration: 3e3 });
              this.submitting = false;
              this.goBack();
            } catch (error) {
              console.error("Error creating keynotes/tags:", error);
              this.snackBar.open("Lesson created but some keynotes or tags failed to save", "Close", { duration: 5e3 });
              this.submitting = false;
              this.goBack();
            }
          }),
          error: (error) => {
            console.error("Error creating lesson:", error);
            this.snackBar.open("Error creating lesson. Please try again.", "Close", {
              duration: 5e3
            });
            this.submitting = false;
          }
        });
      }
    } else {
      this.snackBar.open("Please fill in all required fields correctly.", "Close", {
        duration: 3e3
      });
    }
  }
  handleKeynotes(lessonId) {
    return __async(this, null, function* () {
      const keynotePromises = [];
      const formKeynotes = this.lessonForm.get("keynotes")?.value || [];
      for (let index = 0; index < formKeynotes.length; index++) {
        const keynoteData = formKeynotes[index];
        const keynotePayload = {
          lessonId,
          title: keynoteData.title,
          content: keynoteData.content,
          contentType: keynoteData.contentType,
          isImportant: keynoteData.isImportant || false,
          hasVisualAid: keynoteData.hasVisualAid || false,
          visualAidUrl: keynoteData.visualAidUrl || null,
          relatedPlanet: keynoteData.relatedPlanet || null,
          relatedZodiac: keynoteData.relatedZodiac || null
        };
        try {
          let savedKeynote;
          if (keynoteData.keynoteId) {
            savedKeynote = yield this.keynoteService.updateKeynote(keynoteData.keynoteId, keynotePayload).toPromise();
          } else {
            savedKeynote = yield this.keynoteService.createKeynote(keynotePayload).toPromise();
          }
          if (savedKeynote && savedKeynote.keynoteId && keynoteData.keynoteTags) {
            yield this.handleKeynoteTags(savedKeynote.keynoteId, keynoteData.keynoteTags);
          }
        } catch (error) {
          console.error("Error handling keynote:", error);
          throw error;
        }
      }
    });
  }
  handleKeynoteTags(keynoteId, keynoteTags) {
    return __async(this, null, function* () {
      if (this.isEditMode) {
        try {
          const existingKeynoteTags = yield this.keynoteTagService.getTagsByKeynoteId(keynoteId).toPromise();
          const currentKeynoteTags = existingKeynoteTags || [];
          const formKeynoteTagIds = keynoteTags.map((kt) => kt.keynoteTagId).filter((id) => id);
          const keynoteTagsToDelete = currentKeynoteTags.filter((kt) => kt.keynoteTagId && !formKeynoteTagIds.includes(kt.keynoteTagId));
          const deletePromises = keynoteTagsToDelete.filter((kt) => kt.keynoteTagId).map((kt) => this.keynoteTagService.deleteKeynoteTag(kt.keynoteTagId).toPromise());
          if (deletePromises.length > 0) {
            yield Promise.all(deletePromises);
          }
          const keynoteTagPromises = [];
          keynoteTags.forEach((keynoteTagData) => {
            const keynoteTagPayload = {
              keynoteId,
              tagId: keynoteTagData.tagId,
              relevanceScore: keynoteTagData.relevanceScore || 5
            };
            if (keynoteTagData.keynoteTagId) {
              keynoteTagPromises.push(this.keynoteTagService.updateKeynoteTag(keynoteTagData.keynoteTagId, keynoteTagPayload).toPromise());
            } else {
              keynoteTagPromises.push(this.keynoteTagService.createKeynoteTag(keynoteTagPayload).toPromise());
            }
          });
          if (keynoteTagPromises.length > 0) {
            yield Promise.all(keynoteTagPromises);
          }
        } catch (error) {
          console.error("Error handling keynote tags:", error);
          throw error;
        }
      } else {
        const keynoteTagPromises = [];
        keynoteTags.forEach((keynoteTagData) => {
          const keynoteTagPayload = {
            keynoteId,
            tagId: keynoteTagData.tagId,
            relevanceScore: keynoteTagData.relevanceScore || 5
          };
          keynoteTagPromises.push(this.keynoteTagService.createKeynoteTag(keynoteTagPayload).toPromise());
        });
        if (keynoteTagPromises.length > 0) {
          yield Promise.all(keynoteTagPromises);
        }
      }
    });
  }
  handleTags(lessonId) {
    return __async(this, null, function* () {
      const formTags = this.lessonForm.get("tags")?.value || [];
      if (this.isEditMode) {
        try {
          const existingTags = yield this.lessonTagService.getTagsByLessonId(lessonId).toPromise();
          const currentTags = existingTags || [];
          const formTagIds = formTags.map((tag) => tag.lessonTagId).filter((id) => id);
          const tagsToDelete = currentTags.filter((tag) => tag.lessonTagId && !formTagIds.includes(tag.lessonTagId));
          const deletePromises = tagsToDelete.filter((tag) => tag.lessonTagId).map((tag) => this.lessonTagService.deleteLessonTag(tag.lessonTagId).toPromise());
          if (deletePromises.length > 0) {
            yield Promise.all(deletePromises);
          }
          const tagPromises = [];
          formTags.forEach((tagData) => {
            const tagPayload = {
              lessonId,
              tagId: tagData.tagId,
              relevanceScore: tagData.relevanceScore || 1
            };
            if (tagData.lessonTagId) {
              tagPromises.push(this.lessonTagService.updateLessonTag(tagData.lessonTagId, tagPayload).toPromise());
            } else {
              tagPromises.push(this.lessonTagService.addLessonTag(tagPayload).toPromise());
            }
          });
          if (tagPromises.length > 0) {
            yield Promise.all(tagPromises);
          }
        } catch (error) {
          console.error("Error handling tags:", error);
          throw error;
        }
      } else {
        const tagPromises = [];
        formTags.forEach((tagData) => {
          const tagPayload = {
            lessonId,
            tagId: tagData.tagId,
            relevanceScore: tagData.relevanceScore || 1
          };
          tagPromises.push(this.lessonTagService.addLessonTag(tagPayload).toPromise());
        });
        if (tagPromises.length > 0) {
          yield Promise.all(tagPromises);
        }
      }
    });
  }
  goBack() {
    const currentTopicId = this.lessonForm.get("topicId")?.value;
    const currentTopic = this.lessonForm.get("topicSearch")?.value;
    if (currentTopicId && currentTopic) {
      this.router.navigate(["/lessons"], {
        state: { selectedTopic: currentTopic }
      });
    } else {
      this.router.navigate(["/lessons"]);
    }
  }
  saveTag(i) {
    return __async(this, null, function* () {
      const tagForm = this.tags.at(i);
      if (!tagForm.valid) {
        this.snackBar.open("Please select a tag and enter a valid relevance score.", "Close", { duration: 3e3 });
        return;
      }
      if (!this.lessonId || typeof this.lessonId !== "number") {
        this.snackBar.open("Lesson ID is missing. Cannot save tag.", "Close", { duration: 3e3 });
        return;
      }
      const tagData = tagForm.value;
      const tagPayload = {
        lessonId: this.lessonId,
        tagId: Number(tagData.tagId),
        relevanceScore: Number(tagData.relevanceScore)
      };
      try {
        if (tagData.lessonTagId) {
          yield this.lessonTagService.updateLessonTag(tagData.lessonTagId, __spreadProps(__spreadValues({}, tagPayload), { lessonTagId: tagData.lessonTagId })).toPromise();
          this.snackBar.open("Tag updated successfully.", "Close", { duration: 2e3 });
        } else {
          const created = yield this.lessonTagService.addLessonTag(tagPayload).toPromise();
          if (created && created.lessonTagId) {
            tagForm.patchValue({ lessonTagId: created.lessonTagId });
          }
          this.snackBar.open("Tag added successfully.", "Close", { duration: 2e3 });
        }
        this.loadTags();
      } catch (error) {
        let errorMsg = "Failed to save tag. Please try again.";
        if (error && error.error && error.error.message) {
          errorMsg = error.error.message;
        } else if (error && error.message) {
          errorMsg = error.message;
        }
        this.snackBar.open(errorMsg, "Close", { duration: 5e3 });
        console.error("Error saving tag:", error);
      }
    });
  }
  static \u0275fac = function AddLessonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddLessonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddLessonComponent, selectors: [["app-add-lesson"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 15, vars: 3, consts: [["courseAuto", "matAutocomplete"], ["auto", "matAutocomplete"], [1, "container"], [1, "header"], ["mat-button", "", 3, "click"], ["class", "loading-container", 4, "ngIf"], [3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "loading-container"], [3, "ngSubmit", "formGroup"], [1, "section"], [1, "section-title"], ["appearance", "outline", 1, "full-width"], ["type", "text", "matInput", "", "formControlName", "courseSearch", "placeholder", "Type to search courses...", 3, "matAutocomplete"], [3, "optionSelected", "displayWith"], [3, "value", 4, "ngFor", "ngForOf"], ["matSuffix", ""], ["matInput", "", "formControlName", "courseId", "readonly", ""], ["type", "text", "matInput", "", "formControlName", "topicSearch", "placeholder", "Type to search topics...", 3, "matAutocomplete", "disabled"], ["class", "course-warning", 4, "ngIf"], ["matInput", "", "formControlName", "topicId", "required", "", "readonly", ""], [4, "ngIf"], ["matInput", "", "formControlName", "title", "required", "", "placeholder", "Enter lesson title..."], [1, "rich-text-field"], [1, "rich-text-label"], [1, "rich-text-container"], ["formControlName", "description", "placeholder", "Enter lesson description...", "theme", "snow", 3, "modules"], ["formControlName", "contentType", "required", ""], ["value", "video"], ["value", "article"], ["value", "quiz"], ["value", "exercise"], ["matInput", "", "formControlName", "contentUrl", "type", "url", "placeholder", "https://example.com/content"], ["matInput", "", "type", "number", "formControlName", "durationMinutes", "min", "0", "placeholder", "0"], ["appearance", "outline", "class", "full-width", 4, "ngIf"], [1, "checkbox-container"], ["formControlName", "isFree", 1, "full-width"], [1, "section-header"], ["mat-raised-button", "", "color", "accent", "type", "button", 1, "add-keynote-btn", 3, "click"], ["formArrayName", "keynotes", 1, "keynotes-container"], ["class", "keynote-panel", 3, "formGroupName", "expanded", 4, "ngFor", "ngForOf"], ["class", "no-keynotes", 4, "ngIf"], ["mat-raised-button", "", "color", "accent", "type", "button", 1, "add-tag-btn", 3, "click"], ["formArrayName", "tags", 1, "tags-container"], ["class", "tag-item", 3, "formGroupName", 4, "ngFor", "ngForOf"], ["class", "no-tags", 4, "ngIf"], [1, "button-container"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20", 4, "ngIf"], [3, "value"], [1, "course-warning"], ["matInput", "", "type", "number", "formControlName", "orderNumber", "min", "1"], [1, "keynote-panel", 3, "formGroupName", "expanded"], [1, "keynote-title-container"], [1, "keynote-icon"], [1, "keynote-title"], ["class", "important-chip", 4, "ngIf"], [1, "content-type-chip", 3, "ngClass"], [1, "keynote-preview"], [1, "keynote-form"], ["matInput", "", "formControlName", "title", "required", ""], ["value", "text"], ["value", "bullet_points"], ["value", "quote"], ["value", "example"], [1, "rich-text-field", "keynote-field"], [1, "rich-text-container", "keynote-editor"], ["formControlName", "content", "theme", "snow", 3, "modules", "placeholder"], [1, "rich-text-hint"], ["class", "rich-text-error", 4, "ngIf"], [1, "form-row"], ["formControlName", "isImportant", 1, "checkbox-field"], ["formControlName", "hasVisualAid", 1, "checkbox-field"], ["appearance", "outline", 1, "half-width"], ["formControlName", "relatedPlanet"], ["value", ""], ["value", "Sun"], ["value", "Moon"], ["value", "Mars"], ["value", "Mercury"], ["value", "Jupiter"], ["value", "Venus"], ["value", "Saturn"], ["value", "Rahu"], ["value", "Ketu"], ["formControlName", "relatedZodiac"], ["value", "Aries"], ["value", "Taurus"], ["value", "Gemini"], ["value", "Cancer"], ["value", "Leo"], ["value", "Virgo"], ["value", "Libra"], ["value", "Scorpio"], ["value", "Sagittarius"], ["value", "Capricorn"], ["value", "Aquarius"], ["value", "Pisces"], [1, "keynote-tags-section"], [1, "section-subtitle"], ["mat-button", "", "color", "accent", "type", "button", 1, "add-keynote-tag-btn", 3, "click"], ["formArrayName", "keynoteTags", 1, "keynote-tags-container"], ["class", "keynote-tag-item", 3, "formGroupName", 4, "ngFor", "ngForOf"], ["class", "no-keynote-tags", 4, "ngIf"], [1, "keynote-actions"], ["mat-button", "", "color", "warn", "type", "button", "matTooltip", "Remove this keynote", 3, "click"], [1, "important-chip"], [1, "rich-text-error"], ["matInput", "", "formControlName", "visualAidUrl", "type", "url"], [1, "keynote-tag-item", 3, "formGroupName"], ["appearance", "outline", 1, "tag-select"], ["formControlName", "tagId", "required", ""], ["appearance", "outline", 1, "relevance-score"], ["matInput", "", "formControlName", "relevanceScore", "type", "number", "min", "1", "max", "10"], ["mat-icon-button", "", "color", "warn", "type", "button", "matTooltip", "Remove this tag", 1, "remove-tag-btn", 3, "click"], [1, "no-keynote-tags"], [1, "no-keynotes"], [1, "tag-item", 3, "formGroupName"], ["matInput", "", "formControlName", "relevanceScore", "type", "number", "min", "1"], [1, "tag-actions"], ["mat-icon-button", "", "color", "primary", "type", "button", "matTooltip", "Save this tag", 1, "save-tag-btn", 3, "click"], ["mat-button", "", "color", "warn", "type", "button", "matTooltip", "Remove this tag", 3, "click"], [1, "no-tags"], ["diameter", "20"]], template: function AddLessonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 4);
      \u0275\u0275listener("click", function AddLessonComponent_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(5, "mat-icon");
      \u0275\u0275text(6, "arrow_back");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Back to Lessons ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card")(9, "mat-card-header")(10, "mat-card-title");
      \u0275\u0275text(11, "Lesson Information");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "mat-card-content");
      \u0275\u0275template(13, AddLessonComponent_div_13_Template, 4, 0, "div", 5)(14, AddLessonComponent_form_14_Template, 119, 26, "form", 6);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit Lesson" + (ctx.lessonId ? " (ID: " + ctx.lessonId + ")" : "") : "Add New Lesson");
      \u0275\u0275advance(10);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    RequiredValidator,
    MinValidator,
    MaxValidator,
    FormGroupDirective,
    FormControlName,
    FormGroupName,
    FormArrayName,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatHint,
    MatError,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatAutocompleteModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    MatSelectModule,
    MatSelect,
    MatCheckboxModule,
    MatCheckbox,
    MatSnackBarModule,
    MatExpansionModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatIconModule,
    MatIcon,
    MatChipsModule,
    MatChip,
    MatDividerModule,
    MatDivider,
    MatTooltipModule,
    MatTooltip,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    QuillModule,
    QuillEditorComponent
  ], styles: ['\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1000px;\n  margin: 0 auto;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #1976d2;\n  font-weight: 500;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 60px 20px;\n  color: #666;\n}\n.loading-container[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.section[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n}\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 18px;\n  font-weight: 500;\n  margin-bottom: 20px;\n  color: #333;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.add-keynote-btn[_ngcontent-%COMP%], \n.add-tag-btn[_ngcontent-%COMP%] {\n  min-width: 140px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 15px;\n}\n.course-warning[_ngcontent-%COMP%] {\n  color: #ff6b6b !important;\n  font-weight: 500;\n}\n.rich-text-field[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 16px;\n}\n.rich-text-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  font-family:\n    Roboto,\n    "Helvetica Neue",\n    sans-serif;\n}\n.rich-text-container[_ngcontent-%COMP%] {\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  border-radius: 4px;\n  min-height: 120px;\n  background-color: white;\n  transition: border-color 0.15s ease;\n}\n.rich-text-container[_ngcontent-%COMP%]   .ql-editor[_ngcontent-%COMP%] {\n  min-height: 100px;\n  font-family:\n    Roboto,\n    "Helvetica Neue",\n    sans-serif;\n  font-size: 14px;\n  line-height: 1.5;\n}\n.rich-text-container[_ngcontent-%COMP%]   .ql-toolbar[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n  font-family:\n    Roboto,\n    "Helvetica Neue",\n    sans-serif;\n}\n.rich-text-container[_ngcontent-%COMP%]:focus-within {\n  border-color: #1976d2;\n  box-shadow: 0 0 0 1px #1976d2;\n}\n.rich-text-hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.6);\n  margin-top: 4px;\n  font-family:\n    Roboto,\n    "Helvetica Neue",\n    sans-serif;\n}\n.rich-text-error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #f44336;\n  margin-top: 4px;\n  font-family:\n    Roboto,\n    "Helvetica Neue",\n    sans-serif;\n}\n.keynote-field[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.keynote-editor[_ngcontent-%COMP%] {\n  min-height: 100px;\n}\n.keynote-editor[_ngcontent-%COMP%]   .ql-editor[_ngcontent-%COMP%] {\n  min-height: 80px;\n}\n.half-width[_ngcontent-%COMP%] {\n  width: 48%;\n  margin-bottom: 15px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  margin-bottom: 15px;\n}\n.checkbox-field[_ngcontent-%COMP%] {\n  margin-right: 20px;\n}\n.keynotes-container[_ngcontent-%COMP%], \n.tags-container[_ngcontent-%COMP%] {\n  max-height: 600px;\n  overflow-y: auto;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  padding: 12px;\n  background-color: #fafafa;\n}\n.tag-item[_ngcontent-%COMP%] {\n  background-color: white;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n  position: relative;\n}\n.tag-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.tag-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 12px;\n  padding-top: 12px;\n  border-top: 1px solid #f0f0f0;\n}\n.keynote-tags-section[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding: 16px;\n  background-color: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n}\n.section-subtitle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 16px;\n  font-weight: 500;\n  margin: 0;\n  color: #495057;\n}\n.keynote-tag-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background-color: white;\n  border: 1px solid #dee2e6;\n  border-radius: 6px;\n  padding: 12px;\n  margin-bottom: 8px;\n}\n.tag-select[_ngcontent-%COMP%] {\n  flex: 2;\n  margin-bottom: 0;\n}\n.relevance-score[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-bottom: 0;\n}\n.remove-tag-btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 40px;\n  height: 40px;\n}\n.add-keynote-tag-btn[_ngcontent-%COMP%] {\n  font-size: 12px;\n  height: 32px;\n}\n.no-keynote-tags[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #6c757d;\n  font-style: italic;\n  padding: 12px;\n  justify-content: center;\n}\n.keynote-panel[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.keynote-panel[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.keynote-title-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex: 1;\n}\n.keynote-icon[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 20px;\n}\n.keynote-title[_ngcontent-%COMP%] {\n  font-weight: 500;\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.important-chip[_ngcontent-%COMP%] {\n  background-color: #ff6b6b;\n  color: white;\n  font-size: 11px;\n  height: 24px;\n  min-height: 24px;\n}\n.content-type-chip[_ngcontent-%COMP%] {\n  font-size: 11px;\n  height: 24px;\n  min-height: 24px;\n  color: white;\n}\n.content-type-text[_ngcontent-%COMP%] {\n  background-color: #4caf50;\n}\n.content-type-bullet_points[_ngcontent-%COMP%] {\n  background-color: #ff9800;\n}\n.content-type-quote[_ngcontent-%COMP%] {\n  background-color: #9c27b0;\n}\n.content-type-example[_ngcontent-%COMP%] {\n  background-color: #2196f3;\n}\n.keynote-preview[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 12px;\n  max-width: 150px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.keynote-form[_ngcontent-%COMP%] {\n  padding: 20px;\n  background-color: white;\n  border-radius: 8px;\n  margin: 8px 0;\n}\n.keynote-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid #f0f0f0;\n}\n.no-keynotes[_ngcontent-%COMP%], \n.no-tags[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #666;\n}\n.no-keynotes[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.no-tags[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n.button-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  margin-top: 30px;\n  padding-top: 20px;\n  border-top: 1px solid #e0e0e0;\n}\n.button-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 120px;\n}\n.button-container[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n.checkbox-container[_ngcontent-%COMP%] {\n  margin: 20px 0;\n  padding: 16px;\n  background-color: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n}\nmat-checkbox[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\nmat-divider[_ngcontent-%COMP%] {\n  margin: 30px 0;\n}\n@media (max-width: 768px) {\n  .section-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .half-width[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .keynote-title-container[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .keynote-title[_ngcontent-%COMP%] {\n    max-width: 150px;\n  }\n}\n/*# sourceMappingURL=add-lesson.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddLessonComponent, { className: "AddLessonComponent", filePath: "src\\app\\pages\\lessons\\add-lesson\\add-lesson.component.ts", lineNumber: 914 });
})();

// src/app/pages/lessons/lessons.routes.ts
var LESSONS_ROUTES = [
  { path: "", component: LessonListComponent },
  { path: "add", component: AddLessonComponent },
  { path: "update/:id", component: AddLessonComponent }
];
export {
  LESSONS_ROUTES
};
//# sourceMappingURL=chunk-XY64JZ4Z.mjs.map
