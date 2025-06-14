import './polyfills.server.mjs';
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
  TagService
} from "./chunk-STPSP5KC.mjs";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-RAP4GNMB.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-3NCYDLW6.mjs";
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
  Router,
  RouterLink
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
  MatInput,
  MatInputModule,
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-575MMOBR.mjs";
import "./chunk-XIU7TARH.mjs";
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
  FormArrayName,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  FormsModule,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatOption,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
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
  NgClass,
  NgForOf,
  NgIf,
  inject,
  map,
  startWith,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-NFLUKIXG.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-PTRYWQQD.mjs";

// src/app/pages/keynotes/keynote-list/keynote-list.component.ts
var _c0 = (a0) => ["/keynotes", a0];
function KeynoteListComponent_mat_option_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lesson_r1 = ctx.$implicit;
    \u0275\u0275property("value", lesson_r1.lessonId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", lesson_r1.title, " ");
  }
}
function KeynoteListComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementEnd();
  }
}
function KeynoteListComponent_div_46_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Order");
    \u0275\u0275elementEnd();
  }
}
function KeynoteListComponent_div_46_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33)(1, "span", 34);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const keynote_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(keynote_r2.orderSequence);
  }
}
function KeynoteListComponent_div_46_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Title");
    \u0275\u0275elementEnd();
  }
}
function KeynoteListComponent_div_46_td_7_mat_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 38);
    \u0275\u0275text(1, "star");
    \u0275\u0275elementEnd();
  }
}
function KeynoteListComponent_div_46_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33)(1, "div", 35)(2, "span", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, KeynoteListComponent_div_46_td_7_mat_icon_4_Template, 2, 0, "mat-icon", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const keynote_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(keynote_r3.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", keynote_r3.isImportant);
  }
}
function KeynoteListComponent_div_46_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Lesson");
    \u0275\u0275elementEnd();
  }
}
function KeynoteListComponent_div_46_td_10_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const keynote_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(keynote_r4.topicTitle);
  }
}
function KeynoteListComponent_div_46_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33)(1, "div", 39)(2, "span", 40);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, KeynoteListComponent_div_46_td_10_span_4_Template, 2, 1, "span", 41);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const keynote_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(keynote_r4.lessonTitle);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", keynote_r4.topicTitle);
  }
}
function KeynoteListComponent_div_46_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Type");
    \u0275\u0275elementEnd();
  }
}
function KeynoteListComponent_div_46_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const keynote_r5 = ctx.$implicit;
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("content-type-chip content-type-", keynote_r5.contentType, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r5.getContentTypeLabel(keynote_r5.contentType), " ");
  }
}
function KeynoteListComponent_div_46_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Content Preview");
    \u0275\u0275elementEnd();
  }
}
function KeynoteListComponent_div_46_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33)(1, "div", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const keynote_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", keynote_r7.content);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", keynote_r7.content.length > 100 ? keynote_r7.content.substring(0, 100) + "..." : keynote_r7.content, " ");
  }
}
function KeynoteListComponent_div_46_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Features");
    \u0275\u0275elementEnd();
  }
}
function KeynoteListComponent_div_46_td_19_mat_chip_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 48)(1, "mat-icon");
    \u0275\u0275text(2, "image");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Visual Aid ");
    \u0275\u0275elementEnd();
  }
}
function KeynoteListComponent_div_46_td_19_mat_chip_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const keynote_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", keynote_r8.relatedPlanet, " ");
  }
}
function KeynoteListComponent_div_46_td_19_mat_chip_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const keynote_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", keynote_r8.relatedZodiac, " ");
  }
}
function KeynoteListComponent_div_46_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33)(1, "div", 44);
    \u0275\u0275template(2, KeynoteListComponent_div_46_td_19_mat_chip_2_Template, 4, 0, "mat-chip", 45)(3, KeynoteListComponent_div_46_td_19_mat_chip_3_Template, 2, 1, "mat-chip", 46)(4, KeynoteListComponent_div_46_td_19_mat_chip_4_Template, 2, 1, "mat-chip", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const keynote_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", keynote_r8.hasVisualAid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", keynote_r8.relatedPlanet);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", keynote_r8.relatedZodiac);
  }
}
function KeynoteListComponent_div_46_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function KeynoteListComponent_div_46_td_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 33)(1, "button", 51)(2, "mat-icon");
    \u0275\u0275text(3, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 52);
    \u0275\u0275listener("click", function KeynoteListComponent_div_46_td_22_Template_button_click_4_listener() {
      const keynote_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.editKeynote(keynote_r10.keynoteId));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 53);
    \u0275\u0275listener("click", function KeynoteListComponent_div_46_td_22_Template_button_click_7_listener() {
      const keynote_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.deleteKeynote(keynote_r10));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const keynote_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c0, keynote_r10.keynoteId));
  }
}
function KeynoteListComponent_div_46_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 54);
  }
}
function KeynoteListComponent_div_46_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 55);
  }
}
function KeynoteListComponent_div_46_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "mat-icon");
    \u0275\u0275text(2, "note_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No keynotes found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 2);
    \u0275\u0275text(6, " Add First Keynote ");
    \u0275\u0275elementEnd()();
  }
}
function KeynoteListComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "table", 19);
    \u0275\u0275elementContainerStart(2, 20);
    \u0275\u0275template(3, KeynoteListComponent_div_46_th_3_Template, 2, 0, "th", 21)(4, KeynoteListComponent_div_46_td_4_Template, 3, 1, "td", 22);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 23);
    \u0275\u0275template(6, KeynoteListComponent_div_46_th_6_Template, 2, 0, "th", 21)(7, KeynoteListComponent_div_46_td_7_Template, 5, 2, "td", 22);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 24);
    \u0275\u0275template(9, KeynoteListComponent_div_46_th_9_Template, 2, 0, "th", 21)(10, KeynoteListComponent_div_46_td_10_Template, 5, 2, "td", 22);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 25);
    \u0275\u0275template(12, KeynoteListComponent_div_46_th_12_Template, 2, 0, "th", 21)(13, KeynoteListComponent_div_46_td_13_Template, 3, 4, "td", 22);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 26);
    \u0275\u0275template(15, KeynoteListComponent_div_46_th_15_Template, 2, 0, "th", 21)(16, KeynoteListComponent_div_46_td_16_Template, 3, 2, "td", 22);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 27);
    \u0275\u0275template(18, KeynoteListComponent_div_46_th_18_Template, 2, 0, "th", 21)(19, KeynoteListComponent_div_46_td_19_Template, 5, 3, "td", 22);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 28);
    \u0275\u0275template(21, KeynoteListComponent_div_46_th_21_Template, 2, 0, "th", 21)(22, KeynoteListComponent_div_46_td_22_Template, 10, 3, "td", 22);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(23, KeynoteListComponent_div_46_tr_23_Template, 1, 0, "tr", 29)(24, KeynoteListComponent_div_46_tr_24_Template, 1, 0, "tr", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, KeynoteListComponent_div_46_div_25_Template, 7, 0, "div", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r5.keynotes);
    \u0275\u0275advance(22);
    \u0275\u0275property("matHeaderRowDef", ctx_r5.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r5.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r5.keynotes.length === 0);
  }
}
var KeynoteListComponent = class _KeynoteListComponent {
  keynoteService;
  lessonService;
  router;
  snackBar;
  keynotes = [];
  lessons = [];
  displayedColumns = ["order", "title", "lesson", "contentType", "content", "features", "actions"];
  loading = false;
  searchQuery = "";
  selectedLessonId = "";
  selectedContentType = "";
  showImportantOnly = false;
  constructor(keynoteService, lessonService, router, snackBar) {
    this.keynoteService = keynoteService;
    this.lessonService = lessonService;
    this.router = router;
    this.snackBar = snackBar;
  }
  ngOnInit() {
    this.loadLessons();
    this.loadKeynotes();
  }
  loadLessons() {
    this.lessonService.getAllLessons().subscribe({
      next: (lessons) => {
        this.lessons = lessons;
      },
      error: (error) => {
        console.error("Error loading lessons:", error);
      }
    });
  }
  loadKeynotes() {
    this.loading = true;
    if (this.selectedLessonId && this.showImportantOnly) {
      this.keynoteService.getImportantKeynotesByLessonId(+this.selectedLessonId).subscribe({
        next: (keynotes) => this.handleKeynotesResponse(keynotes),
        error: (error) => this.handleError(error)
      });
    } else if (this.selectedLessonId) {
      this.keynoteService.getKeynotesByLessonId(+this.selectedLessonId).subscribe({
        next: (keynotes) => this.handleKeynotesResponse(keynotes),
        error: (error) => this.handleError(error)
      });
    } else if (this.searchQuery.trim()) {
      this.keynoteService.searchKeynotes(this.searchQuery).subscribe({
        next: (keynotes) => this.handleKeynotesResponse(keynotes),
        error: (error) => this.handleError(error)
      });
    } else {
      this.keynoteService.getAllKeynotes().subscribe({
        next: (keynotes) => this.handleKeynotesResponse(keynotes),
        error: (error) => this.handleError(error)
      });
    }
  }
  handleKeynotesResponse(keynotes) {
    let filteredKeynotes = keynotes;
    if (this.showImportantOnly && !this.selectedLessonId) {
      filteredKeynotes = keynotes.filter((k) => k.isImportant);
    }
    if (this.selectedContentType) {
      filteredKeynotes = filteredKeynotes.filter((k) => k.contentType === this.selectedContentType);
    }
    this.keynotes = filteredKeynotes;
    this.loading = false;
  }
  handleError(error) {
    console.error("Error loading keynotes:", error);
    this.snackBar.open("Error loading keynotes", "Close", { duration: 3e3 });
    this.loading = false;
  }
  onSearchChange() {
    if (this.searchQuery.trim()) {
      this.selectedLessonId = "";
      this.loadKeynotes();
    } else {
      this.loadKeynotes();
    }
  }
  onLessonFilterChange() {
    this.searchQuery = "";
    this.loadKeynotes();
  }
  onContentTypeFilterChange() {
    this.loadKeynotes();
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
        return contentType;
    }
  }
  editKeynote(id) {
    this.router.navigate(["/keynotes/edit", id]);
  }
  deleteKeynote(keynote) {
    if (confirm(`Are you sure you want to delete the keynote "${keynote.title}"?`)) {
      this.keynoteService.deleteKeynote(keynote.keynoteId).subscribe({
        next: () => {
          this.snackBar.open("Keynote deleted successfully", "Close", { duration: 3e3 });
          this.loadKeynotes();
        },
        error: (error) => {
          console.error("Error deleting keynote:", error);
          this.snackBar.open("Error deleting keynote", "Close", { duration: 3e3 });
        }
      });
    }
  }
  static \u0275fac = function KeynoteListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KeynoteListComponent)(\u0275\u0275directiveInject(LessonKeynoteService), \u0275\u0275directiveInject(LessonService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _KeynoteListComponent, selectors: [["app-keynote-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 47, vars: 8, consts: [[1, "container"], [1, "header"], ["mat-raised-button", "", "color", "primary", "routerLink", "/keynotes/add"], [1, "filters-container"], ["appearance", "outline", 1, "filter-field"], ["matInput", "", "placeholder", "Search by title or content...", 3, "ngModelChange", "input", "ngModel"], ["matSuffix", ""], [3, "ngModelChange", "selectionChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["value", "text"], ["value", "bullet_points"], ["value", "quote"], ["value", "example"], ["mat-stroked-button", "", 3, "click", "color"], ["class", "loading-container", 4, "ngIf"], [4, "ngIf"], [3, "value"], [1, "loading-container"], ["mat-table", "", 1, "full-width", 3, "dataSource"], ["matColumnDef", "order"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "title"], ["matColumnDef", "lesson"], ["matColumnDef", "contentType"], ["matColumnDef", "content"], ["matColumnDef", "features"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "no-data", 4, "ngIf"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "order-badge"], [1, "title-cell"], [1, "keynote-title"], ["class", "important-icon", "color", "warn", 4, "ngIf"], ["color", "warn", 1, "important-icon"], [1, "lesson-info"], [1, "lesson-title"], ["class", "topic-title", 4, "ngIf"], [1, "topic-title"], [1, "content-preview", 3, "matTooltip"], [1, "feature-chips"], ["class", "feature-chip visual-aid-chip", 4, "ngIf"], ["class", "feature-chip planet-chip", 4, "ngIf"], ["class", "feature-chip zodiac-chip", 4, "ngIf"], [1, "feature-chip", "visual-aid-chip"], [1, "feature-chip", "planet-chip"], [1, "feature-chip", "zodiac-chip"], ["mat-icon-button", "", "color", "primary", "matTooltip", "View Details", 3, "routerLink"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Edit Keynote", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Delete Keynote", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "no-data"]], template: function KeynoteListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Lesson Keynotes Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2)(5, "mat-icon");
      \u0275\u0275text(6, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Add Keynote ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card")(9, "mat-card-header")(10, "mat-card-title");
      \u0275\u0275text(11, "Keynotes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "mat-card-content")(13, "div", 3)(14, "mat-form-field", 4)(15, "mat-label");
      \u0275\u0275text(16, "Search keynotes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function KeynoteListComponent_Template_input_ngModelChange_17_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("input", function KeynoteListComponent_Template_input_input_17_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "mat-icon", 6);
      \u0275\u0275text(19, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "mat-form-field", 4)(21, "mat-label");
      \u0275\u0275text(22, "Filter by Lesson");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "mat-select", 7);
      \u0275\u0275twoWayListener("ngModelChange", function KeynoteListComponent_Template_mat_select_ngModelChange_23_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedLessonId, $event) || (ctx.selectedLessonId = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function KeynoteListComponent_Template_mat_select_selectionChange_23_listener() {
        return ctx.onLessonFilterChange();
      });
      \u0275\u0275elementStart(24, "mat-option", 8);
      \u0275\u0275text(25, "All Lessons");
      \u0275\u0275elementEnd();
      \u0275\u0275template(26, KeynoteListComponent_mat_option_26_Template, 2, 2, "mat-option", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "mat-form-field", 4)(28, "mat-label");
      \u0275\u0275text(29, "Content Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "mat-select", 7);
      \u0275\u0275twoWayListener("ngModelChange", function KeynoteListComponent_Template_mat_select_ngModelChange_30_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedContentType, $event) || (ctx.selectedContentType = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function KeynoteListComponent_Template_mat_select_selectionChange_30_listener() {
        return ctx.onContentTypeFilterChange();
      });
      \u0275\u0275elementStart(31, "mat-option", 8);
      \u0275\u0275text(32, "All Types");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "mat-option", 10);
      \u0275\u0275text(34, "Text");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "mat-option", 11);
      \u0275\u0275text(36, "Bullet Points");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "mat-option", 12);
      \u0275\u0275text(38, "Quote");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "mat-option", 13);
      \u0275\u0275text(40, "Example");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "button", 14);
      \u0275\u0275listener("click", function KeynoteListComponent_Template_button_click_41_listener() {
        ctx.showImportantOnly = !ctx.showImportantOnly;
        return ctx.loadKeynotes();
      });
      \u0275\u0275elementStart(42, "mat-icon");
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275text(44, " Important Only ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(45, KeynoteListComponent_div_45_Template, 2, 0, "div", 15)(46, KeynoteListComponent_div_46_Template, 26, 4, "div", 16);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(17);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedLessonId);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.lessons);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedContentType);
      \u0275\u0275advance(11);
      \u0275\u0275property("color", ctx.showImportantOnly ? "primary" : "");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.showImportantOnly ? "star" : "star_border");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
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
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatChipsModule,
    MatChip,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatTooltipModule,
    MatTooltip
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.filters-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.filter-field[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 40px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.order-badge[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #1565c0;\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n}\n.title-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.keynote-title[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.important-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.lesson-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.lesson-title[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n}\n.topic-title[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n}\n.content-type-chip[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n}\n.content-type-text[_ngcontent-%COMP%] {\n  background-color: #e8f5e8;\n  color: #2e7d32;\n}\n.content-type-bullet_points[_ngcontent-%COMP%] {\n  background-color: #fff3e0;\n  color: #e65100;\n}\n.content-type-quote[_ngcontent-%COMP%] {\n  background-color: #f3e5f5;\n  color: #7b1fa2;\n}\n.content-type-example[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #1565c0;\n}\n.content-preview[_ngcontent-%COMP%] {\n  max-width: 300px;\n  line-height: 1.4;\n  color: #666;\n}\n.feature-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  flex-wrap: wrap;\n}\n.feature-chip[_ngcontent-%COMP%] {\n  font-size: 10px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.visual-aid-chip[_ngcontent-%COMP%] {\n  background-color: #fff9c4;\n  color: #f57f17;\n}\n.planet-chip[_ngcontent-%COMP%] {\n  background-color: #fce4ec;\n  color: #c2185b;\n}\n.zodiac-chip[_ngcontent-%COMP%] {\n  background-color: #e1f5fe;\n  color: #0277bd;\n}\n.feature-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n  width: 12px;\n  height: 12px;\n}\n.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 16px;\n}\n.no-data[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 16px 0 24px 0;\n  font-size: 16px;\n}\n.mat-mdc-cell[_ngcontent-%COMP%], \n.mat-mdc-header-cell[_ngcontent-%COMP%] {\n  padding: 12px 8px;\n}\n.mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n@media (max-width: 768px) {\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .filters-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .filter-field[_ngcontent-%COMP%] {\n    min-width: auto;\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=keynote-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(KeynoteListComponent, { className: "KeynoteListComponent", filePath: "src\\app\\pages\\keynotes\\keynote-list\\keynote-list.component.ts", lineNumber: 391 });
})();

// src/app/pages/keynotes/keynote-details/keynote-details.component.ts
var _c02 = (a0) => ["/keynotes/edit", a0];
function KeynoteDetailsComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 8)(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Edit Keynote ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c02, ctx_r0.keynote.keynoteId));
  }
}
function KeynoteDetailsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementEnd();
  }
}
function KeynoteDetailsComponent_div_11_mat_chip_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 31)(1, "mat-icon");
    \u0275\u0275text(2, "star");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Important ");
    \u0275\u0275elementEnd();
  }
}
function KeynoteDetailsComponent_div_11_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 21);
    \u0275\u0275text(2, "Topic:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.keynote.topicTitle);
  }
}
function KeynoteDetailsComponent_div_11_div_36_li_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const point_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(point_r2);
  }
}
function KeynoteDetailsComponent_div_11_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "ul");
    \u0275\u0275template(2, KeynoteDetailsComponent_div_11_div_36_li_2_Template, 2, 1, "li", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.getBulletPoints(ctx_r0.keynote.content));
  }
}
function KeynoteDetailsComponent_div_11_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "blockquote")(2, "mat-icon");
    \u0275\u0275text(3, "format_quote");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.keynote.content, " ");
  }
}
function KeynoteDetailsComponent_div_11_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.keynote.content);
  }
}
function KeynoteDetailsComponent_div_11_mat_card_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 18)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Visual Aid");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "div", 36)(6, "img", 37);
    \u0275\u0275listener("error", function KeynoteDetailsComponent_div_11_mat_card_39_Template_img_error_6_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onImageError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 38)(8, "span", 21);
    \u0275\u0275text(9, "URL:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "a", 39);
    \u0275\u0275text(11);
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "open_in_new");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("src", ctx_r0.keynote.visualAidUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r0.keynote.title);
    \u0275\u0275advance(4);
    \u0275\u0275property("href", ctx_r0.keynote.visualAidUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.keynote.visualAidUrl, " ");
  }
}
function KeynoteDetailsComponent_div_11_mat_card_40_mat_chip_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 43)(1, "mat-icon");
    \u0275\u0275text(2, "brightness_1");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.keynote.relatedPlanet, " ");
  }
}
function KeynoteDetailsComponent_div_11_mat_card_40_mat_chip_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 44)(1, "mat-icon");
    \u0275\u0275text(2, "stars");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.keynote.relatedZodiac, " ");
  }
}
function KeynoteDetailsComponent_div_11_mat_card_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 18)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Astrological Relations");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "div", 40);
    \u0275\u0275template(6, KeynoteDetailsComponent_div_11_mat_card_40_mat_chip_6_Template, 4, 1, "mat-chip", 41)(7, KeynoteDetailsComponent_div_11_mat_card_40_mat_chip_7_Template, 4, 1, "mat-chip", 42);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r0.keynote.relatedPlanet);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.keynote.relatedZodiac);
  }
}
function KeynoteDetailsComponent_div_11_div_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 21);
    \u0275\u0275text(2, "Created:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 24);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, ctx_r0.keynote.createdAt, "medium"));
  }
}
function KeynoteDetailsComponent_div_11_div_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 21);
    \u0275\u0275text(2, "Last Updated:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 24);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, ctx_r0.keynote.updatedAt, "medium"));
  }
}
function KeynoteDetailsComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "mat-card", 11)(2, "mat-card-content")(3, "div", 12)(4, "div", 13)(5, "h2", 14);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 15)(8, "mat-chip", 16);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, KeynoteDetailsComponent_div_11_mat_chip_10_Template, 4, 0, "mat-chip", 17);
    \u0275\u0275elementStart(11, "mat-chip");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(13, "mat-card", 18)(14, "mat-card-header")(15, "mat-card-title");
    \u0275\u0275text(16, "Lesson Information");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "mat-card-content")(18, "div", 19)(19, "div", 20)(20, "span", 21);
    \u0275\u0275text(21, "Lesson:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 22);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(24, KeynoteDetailsComponent_div_11_div_24_Template, 5, 1, "div", 23);
    \u0275\u0275elementStart(25, "div", 20)(26, "span", 21);
    \u0275\u0275text(27, "Lesson ID:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 24);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(30, "mat-card", 25)(31, "mat-card-header")(32, "mat-card-title");
    \u0275\u0275text(33, "Content");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "mat-card-content")(35, "div", 26);
    \u0275\u0275template(36, KeynoteDetailsComponent_div_11_div_36_Template, 3, 1, "div", 27)(37, KeynoteDetailsComponent_div_11_div_37_Template, 5, 1, "div", 28)(38, KeynoteDetailsComponent_div_11_div_38_Template, 3, 1, "div", 29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(39, KeynoteDetailsComponent_div_11_mat_card_39_Template, 14, 4, "mat-card", 30)(40, KeynoteDetailsComponent_div_11_mat_card_40_Template, 8, 2, "mat-card", 30);
    \u0275\u0275elementStart(41, "mat-card", 18)(42, "mat-card-header")(43, "mat-card-title");
    \u0275\u0275text(44, "System Information");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "mat-card-content")(46, "div", 19)(47, "div", 20)(48, "span", 21);
    \u0275\u0275text(49, "Keynote ID:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span", 24);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(52, KeynoteDetailsComponent_div_11_div_52_Template, 6, 4, "div", 23)(53, KeynoteDetailsComponent_div_11_div_53_Template, 6, 4, "div", 23);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.keynote.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Order: ", ctx_r0.keynote.orderSequence, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.keynote.isImportant);
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("content-type-badge content-type-", ctx_r0.keynote.contentType, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getContentTypeLabel(ctx_r0.keynote.contentType), " ");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r0.keynote.lessonTitle);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.keynote.topicTitle);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.keynote.lessonId);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngClass", "content-type-" + ctx_r0.keynote.contentType);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.keynote.contentType === "bullet_points");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.keynote.contentType === "quote");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.keynote.contentType === "text" || ctx_r0.keynote.contentType === "example");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.keynote.hasVisualAid && ctx_r0.keynote.visualAidUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.keynote.relatedPlanet || ctx_r0.keynote.relatedZodiac);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r0.keynote.keynoteId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.keynote.createdAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.keynote.updatedAt);
  }
}
function KeynoteDetailsComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "mat-icon");
    \u0275\u0275text(2, "note_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Keynote Not Found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "The keynote you're looking for doesn't exist or has been deleted.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 46);
    \u0275\u0275listener("click", function KeynoteDetailsComponent_div_12_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goBack());
    });
    \u0275\u0275text(8, " Go Back to Keynotes ");
    \u0275\u0275elementEnd()();
  }
}
var KeynoteDetailsComponent = class _KeynoteDetailsComponent {
  route;
  router;
  keynoteService;
  snackBar;
  keynoteId = null;
  keynote = null;
  loading = false;
  constructor(route, router, keynoteService, snackBar) {
    this.route = route;
    this.router = router;
    this.keynoteService = keynoteService;
    this.snackBar = snackBar;
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.keynoteId = +params["id"];
        this.loadKeynote();
      }
    });
  }
  loadKeynote() {
    if (!this.keynoteId)
      return;
    this.loading = true;
    this.keynoteService.getKeynoteById(this.keynoteId).subscribe({
      next: (keynote) => {
        this.keynote = keynote;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading keynote:", error);
        this.snackBar.open("Error loading keynote details", "Close", { duration: 3e3 });
        this.loading = false;
      }
    });
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
        return contentType;
    }
  }
  getBulletPoints(content) {
    return content.split("\n").map((line) => line.trim()).filter((line) => line.length > 0).map((line) => line.replace(/^[•\-\*]\s*/, ""));
  }
  onImageError(event) {
    event.target.style.display = "none";
  }
  goBack() {
    this.router.navigate(["/keynotes"]);
  }
  static \u0275fac = function KeynoteDetailsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KeynoteDetailsComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(LessonKeynoteService), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _KeynoteDetailsComponent, selectors: [["app-keynote-details"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 13, vars: 4, consts: [[1, "container"], [1, "header"], [1, "actions"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "accent", 3, "routerLink", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], ["class", "keynote-details", 4, "ngIf"], ["class", "no-keynote", 4, "ngIf"], ["mat-raised-button", "", "color", "accent", 3, "routerLink"], [1, "loading-container"], [1, "keynote-details"], [1, "info-card", "header-card"], [1, "keynote-header"], [1, "title-section"], [1, "keynote-title"], [1, "badges"], [1, "order-badge"], ["class", "important-badge", 4, "ngIf"], [1, "info-card"], [1, "info-grid"], [1, "info-item"], [1, "label"], [1, "value", "lesson-link"], ["class", "info-item", 4, "ngIf"], [1, "value"], [1, "info-card", "content-card"], [1, "content-display", 3, "ngClass"], ["class", "bullet-content", 4, "ngIf"], ["class", "quote-content", 4, "ngIf"], ["class", "text-content", 4, "ngIf"], ["class", "info-card", 4, "ngIf"], [1, "important-badge"], [1, "bullet-content"], [4, "ngFor", "ngForOf"], [1, "quote-content"], [1, "text-content"], [1, "visual-aid-container"], [1, "visual-aid-image", 3, "error", "src", "alt"], [1, "visual-aid-url"], ["target", "_blank", 1, "url-link", 3, "href"], [1, "astro-chips"], ["class", "planet-chip", 4, "ngIf"], ["class", "zodiac-chip", 4, "ngIf"], [1, "planet-chip"], [1, "zodiac-chip"], [1, "no-keynote"], ["mat-raised-button", "", "color", "primary", 3, "click"]], template: function KeynoteDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Keynote Details");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
      \u0275\u0275listener("click", function KeynoteDetailsComponent_Template_button_click_5_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(6, "mat-icon");
      \u0275\u0275text(7, "arrow_back");
      \u0275\u0275elementEnd();
      \u0275\u0275text(8, " Back to Keynotes ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, KeynoteDetailsComponent_button_9_Template, 4, 3, "button", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(10, KeynoteDetailsComponent_div_10_Template, 2, 0, "div", 5)(11, KeynoteDetailsComponent_div_11_Template, 54, 19, "div", 6)(12, KeynoteDetailsComponent_div_12_Template, 9, 0, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", ctx.keynote);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.keynote);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.keynote);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    DatePipe,
    RouterLink,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatButtonModule,
    MatButton,
    MatIconModule,
    MatIcon,
    MatDividerModule,
    MatChipsModule,
    MatChip,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatSnackBarModule
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1000px;\n  margin: 0 auto;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.keynote-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.info-card[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.header-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.header-card[_ngcontent-%COMP%]   .mat-mdc-card-content[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.keynote-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.keynote-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 600;\n  margin: 0 0 16px 0;\n  color: white;\n}\n.badges[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.order-badge[_ngcontent-%COMP%] {\n  background-color: rgba(255, 255, 255, 0.2);\n  color: white;\n}\n.important-badge[_ngcontent-%COMP%] {\n  background-color: #ff6b6b;\n  color: white;\n}\n.content-type-badge[_ngcontent-%COMP%] {\n  color: white;\n  font-weight: 500;\n}\n.content-type-text[_ngcontent-%COMP%] {\n  background-color: rgba(76, 175, 80, 0.8);\n}\n.content-type-bullet_points[_ngcontent-%COMP%] {\n  background-color: rgba(255, 152, 0, 0.8);\n}\n.content-type-quote[_ngcontent-%COMP%] {\n  background-color: rgba(156, 39, 176, 0.8);\n}\n.content-type-example[_ngcontent-%COMP%] {\n  background-color: rgba(33, 150, 243, 0.8);\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  min-height: 40px;\n}\n.label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #666;\n  min-width: 100px;\n  margin-right: 12px;\n}\n.value[_ngcontent-%COMP%] {\n  color: #333;\n  word-break: break-word;\n}\n.lesson-link[_ngcontent-%COMP%] {\n  color: #1976d2;\n  cursor: pointer;\n  text-decoration: underline;\n}\n.content-card[_ngcontent-%COMP%] {\n  min-height: 150px;\n}\n.content-display[_ngcontent-%COMP%] {\n  font-size: 16px;\n  line-height: 1.6;\n}\n.bullet-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 20px;\n}\n.bullet-content[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.quote-content[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 20px;\n  background-color: #f5f5f5;\n  border-left: 4px solid #9c27b0;\n  border-radius: 4px;\n  font-style: italic;\n  position: relative;\n}\n.quote-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  color: #9c27b0;\n  opacity: 0.3;\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.text-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n}\n.visual-aid-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.visual-aid-image[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 400px;\n  border-radius: 8px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n.visual-aid-url[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.url-link[_ngcontent-%COMP%] {\n  color: #1976d2;\n  text-decoration: none;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.url-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.url-link[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.astro-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.planet-chip[_ngcontent-%COMP%] {\n  background-color: #fce4ec;\n  color: #c2185b;\n}\n.zodiac-chip[_ngcontent-%COMP%] {\n  background-color: #e1f5fe;\n  color: #0277bd;\n}\n.planet-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.zodiac-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.no-keynote[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 20px;\n  color: #666;\n}\n.no-keynote[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 16px;\n}\n.no-keynote[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  color: #333;\n}\n@media (max-width: 768px) {\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-start;\n  }\n  .keynote-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .info-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .label[_ngcontent-%COMP%] {\n    min-width: auto;\n    margin-right: 0;\n    margin-bottom: 4px;\n  }\n}\n/*# sourceMappingURL=keynote-details.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(KeynoteDetailsComponent, { className: "KeynoteDetailsComponent", filePath: "src\\app\\pages\\keynotes\\keynote-details\\keynote-details.component.ts", lineNumber: 475 });
})();

// src/app/utils/error-handler.util.ts
var ErrorHandlerUtil = class {
  /**
   * Extracts a user-friendly error message from various error response formats
   * @param error - The error object from HTTP requests
   * @param defaultMessage - Default message to show if no specific error is found
   * @returns A user-friendly error message string
   */
  static extractErrorMessage(error, defaultMessage = "An error occurred. Please try again.") {
    if (!error) {
      return defaultMessage;
    }
    if (error.error && error.error.fieldErrors) {
      const fieldErrors = error.error.fieldErrors;
      const errorMessages = Object.entries(fieldErrors).map(([field, message]) => `${field}: ${message}`).join(", ");
      return errorMessages || error.error.message || defaultMessage;
    }
    if (error.error && error.error.message) {
      return error.error.message;
    }
    if (error.error && typeof error.error === "string") {
      return error.error;
    }
    if (error.error && error.error.error) {
      return error.error.error;
    }
    if (error.message) {
      return error.message;
    }
    if (error.status) {
      switch (error.status) {
        case 400:
          return error.error?.message || "Invalid request. Please check your input data.";
        case 401:
          return "Authentication failed. Please log in again.";
        case 403:
          return "You do not have permission to perform this action.";
        case 404:
          return "The requested resource was not found.";
        case 409:
          return error.error?.message || "A conflict occurred. The resource may already exist.";
        case 422:
          return error.error?.message || "Validation failed. Please check your input data.";
        case 500:
          return error.error?.message || "Server error. Please try again later.";
        case 0:
          return "Unable to connect to the server. Please check your internet connection.";
        default:
          return error.error?.message || `Server error (${error.status}). Please try again later.`;
      }
    }
    return defaultMessage;
  }
  /**
   * Formats validation errors for display
   * @param fieldErrors - Object containing field validation errors
   * @returns Formatted error message string
   */
  static formatValidationErrors(fieldErrors) {
    if (!fieldErrors || typeof fieldErrors !== "object") {
      return "Validation failed. Please check your input data.";
    }
    const errorMessages = Object.entries(fieldErrors).map(([field, message]) => {
      const friendlyFieldName = field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim();
      return `${friendlyFieldName}: ${message}`;
    });
    return errorMessages.length === 1 ? errorMessages[0] : `Multiple validation errors: ${errorMessages.join("; ")}`;
  }
  /**
   * Determines if an error is a validation error
   * @param error - The error object
   * @returns True if it's a validation error
   */
  static isValidationError(error) {
    return error?.error?.fieldErrors || error?.status === 400 || error?.status === 422 || error?.error?.message && error.error.message.toLowerCase().includes("validation");
  }
  /**
   * Determines if an error is a conflict error (e.g., duplicate entry)
   * @param error - The error object
   * @returns True if it's a conflict error
   */
  static isConflictError(error) {
    return error?.status === 409 || error?.error?.message && (error.error.message.toLowerCase().includes("duplicate") || error.error.message.toLowerCase().includes("already exists") || error.error.message.toLowerCase().includes("conflict"));
  }
  /**
   * Gets the appropriate snackbar panel class based on error type
   * @param error - The error object
   * @returns CSS class name for snackbar styling
   */
  static getSnackbarClass(error) {
    if (this.isValidationError(error)) {
      return ["warning-snackbar"];
    }
    if (this.isConflictError(error)) {
      return ["warning-snackbar"];
    }
    return ["error-snackbar"];
  }
};

// src/app/services/error-handler.service.ts
var ErrorHandlerService = class _ErrorHandlerService {
  snackBar = inject(MatSnackBar);
  /**
   * Shows an error message using MatSnackBar with appropriate styling
   * @param error - The error object from HTTP requests or other sources
   * @param defaultMessage - Default message if no specific error can be extracted
   * @param duration - Duration to show the snackbar (default: 5000ms)
   */
  showError(error, defaultMessage = "An error occurred. Please try again.", duration = 5e3) {
    const errorMessage = ErrorHandlerUtil.extractErrorMessage(error, defaultMessage);
    const panelClass = ErrorHandlerUtil.getSnackbarClass(error);
    this.snackBar.open(errorMessage, "Close", {
      duration,
      panelClass
    });
  }
  /**
   * Shows a success message using MatSnackBar
   * @param message - Success message to display
   * @param duration - Duration to show the snackbar (default: 3000ms)
   */
  showSuccess(message, duration = 3e3) {
    this.snackBar.open(message, "Close", {
      duration,
      panelClass: ["success-snackbar"]
    });
  }
  /**
   * Shows a warning message using MatSnackBar
   * @param message - Warning message to display
   * @param duration - Duration to show the snackbar (default: 4000ms)
   */
  showWarning(message, duration = 4e3) {
    this.snackBar.open(message, "Close", {
      duration,
      panelClass: ["warning-snackbar"]
    });
  }
  /**
   * Shows an info message using MatSnackBar
   * @param message - Info message to display
   * @param duration - Duration to show the snackbar (default: 3000ms)
   */
  showInfo(message, duration = 3e3) {
    this.snackBar.open(message, "Close", {
      duration,
      panelClass: ["info-snackbar"]
    });
  }
  /**
   * Handles API errors with specific patterns for common scenarios
   * @param error - The error object
   * @param context - Context about what operation failed (e.g., 'saving lesson')
   * @param duration - Duration to show the snackbar
   */
  handleApiError(error, context = "operation", duration = 5e3) {
    let defaultMessage = `Error ${context}. Please try again.`;
    if (ErrorHandlerUtil.isValidationError(error)) {
      defaultMessage = `Validation failed while ${context}. Please check your input data.`;
    } else if (ErrorHandlerUtil.isConflictError(error)) {
      defaultMessage = `A conflict occurred while ${context}. The resource may already exist.`;
    } else if (error?.status === 404) {
      defaultMessage = `Resource not found while ${context}.`;
    } else if (error?.status === 403) {
      defaultMessage = `You do not have permission to perform this ${context}.`;
    } else if (error?.status === 401) {
      defaultMessage = `Authentication required to ${context}. Please log in again.`;
    }
    this.showError(error, defaultMessage, duration);
  }
  /**
   * Handles form validation errors specifically
   * @param error - The error object
   * @param formContext - Context about what form failed (e.g., 'lesson form')
   */
  handleFormError(error, formContext = "form") {
    if (ErrorHandlerUtil.isValidationError(error) && error?.error?.fieldErrors) {
      const validationMessage = ErrorHandlerUtil.formatValidationErrors(error.error.fieldErrors);
      this.showWarning(validationMessage, 6e3);
    } else {
      this.handleApiError(error, `submitting ${formContext}`);
    }
  }
  /**
   * Logs error details to console for debugging
   * @param error - The error object
   * @param context - Context about where the error occurred
   */
  logError(error, context) {
    console.error(`Error in ${context}:`, error);
    if (error?.error) {
      console.error("Error details:", error.error);
    }
    if (error?.status) {
      console.error("HTTP Status:", error.status);
    }
    if (error?.message) {
      console.error("Error message:", error.message);
    }
  }
  static \u0275fac = function ErrorHandlerService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ErrorHandlerService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ErrorHandlerService, factory: _ErrorHandlerService.\u0275fac, providedIn: "root" });
};

// src/app/pages/keynotes/add-keynote/add-keynote.component.ts
function AddKeynoteComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementEnd();
  }
}
function AddKeynoteComponent_form_14_mat_option_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 40)(1, "div", 41)(2, "span", 42);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const lesson_r3 = ctx.$implicit;
    \u0275\u0275property("value", lesson_r3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(lesson_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lesson_r3.topicTitle);
  }
}
function AddKeynoteComponent_form_14_mat_error_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Lesson is required ");
    \u0275\u0275elementEnd();
  }
}
function AddKeynoteComponent_form_14_mat_error_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Title is required ");
    \u0275\u0275elementEnd();
  }
}
function AddKeynoteComponent_form_14_mat_error_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Content type is required ");
    \u0275\u0275elementEnd();
  }
}
function AddKeynoteComponent_form_14_span_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " Use bullet points format (\u2022 item 1, \u2022 item 2, etc.) ");
    \u0275\u0275elementEnd();
  }
}
function AddKeynoteComponent_form_14_span_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " Include quotation marks for quotes ");
    \u0275\u0275elementEnd();
  }
}
function AddKeynoteComponent_form_14_mat_error_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Content is required ");
    \u0275\u0275elementEnd();
  }
}
function AddKeynoteComponent_form_14_mat_form_field_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 10)(1, "mat-label");
    \u0275\u0275text(2, "Visual Aid URL");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 44);
    \u0275\u0275elementStart(4, "mat-hint");
    \u0275\u0275text(5, "URL to image, diagram, or other visual content");
    \u0275\u0275elementEnd()();
  }
}
function AddKeynoteComponent_form_14_mat_option_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const planet_r4 = ctx.$implicit;
    \u0275\u0275property("value", planet_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", planet_r4, " ");
  }
}
function AddKeynoteComponent_form_14_mat_option_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sign_r5 = ctx.$implicit;
    \u0275\u0275property("value", sign_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sign_r5, " ");
  }
}
function AddKeynoteComponent_form_14_div_93_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tagOption_r7 = ctx.$implicit;
    \u0275\u0275property("value", tagOption_r7.tagId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tagOption_r7.tagName, " ");
  }
}
function AddKeynoteComponent_form_14_div_93_mat_error_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Tag selection is required ");
    \u0275\u0275elementEnd();
  }
}
function AddKeynoteComponent_form_14_div_93_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "mat-form-field", 46)(2, "mat-label");
    \u0275\u0275text(3, "Tag");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-select", 47);
    \u0275\u0275template(5, AddKeynoteComponent_form_14_div_93_mat_option_5_Template, 2, 2, "mat-option", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, AddKeynoteComponent_form_14_div_93_mat_error_6_Template, 2, 0, "mat-error", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-form-field", 46)(8, "mat-label");
    \u0275\u0275text(9, "Relevance Score");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 48);
    \u0275\u0275elementStart(11, "mat-hint");
    \u0275\u0275text(12, "Enter a score from 1-10 indicating relevance to the keynote");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 49)(14, "button", 50);
    \u0275\u0275listener("click", function AddKeynoteComponent_form_14_div_93_Template_button_click_14_listener() {
      const i_r8 = \u0275\u0275restoreView(_r6).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveTag(i_r8));
    });
    \u0275\u0275elementStart(15, "mat-icon");
    \u0275\u0275text(16, "save");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 51);
    \u0275\u0275listener("click", function AddKeynoteComponent_form_14_div_93_Template_button_click_17_listener() {
      const i_r8 = \u0275\u0275restoreView(_r6).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeTag(i_r8));
    });
    \u0275\u0275elementStart(18, "mat-icon");
    \u0275\u0275text(19, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " Remove ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_7_0;
    const tag_r9 = ctx.$implicit;
    const i_r8 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("formGroupName", i_r8);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.allTags);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_7_0 = tag_r9.get("tagId")) == null ? null : tmp_7_0.hasError("required"));
  }
}
function AddKeynoteComponent_form_14_div_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "mat-icon");
    \u0275\u0275text(2, "label_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, 'No tags added yet. Click "Add Tag" to start tagging this keynote.');
    \u0275\u0275elementEnd()();
  }
}
function AddKeynoteComponent_form_14_mat_spinner_99_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 53);
  }
}
function AddKeynoteComponent_form_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275listener("ngSubmit", function AddKeynoteComponent_form_14_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 8)(2, "h3");
    \u0275\u0275text(3, "Basic Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 9)(5, "mat-form-field", 10)(6, "mat-label");
    \u0275\u0275text(7, "Lesson");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 11);
    \u0275\u0275elementStart(9, "mat-autocomplete", 12, 0);
    \u0275\u0275template(11, AddKeynoteComponent_form_14_mat_option_11_Template, 6, 3, "mat-option", 13);
    \u0275\u0275pipe(12, "async");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, AddKeynoteComponent_form_14_mat_error_13_Template, 2, 0, "mat-error", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-form-field", 10)(15, "mat-label");
    \u0275\u0275text(16, "Order Sequence");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "mat-form-field", 10)(19, "mat-label");
    \u0275\u0275text(20, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 16);
    \u0275\u0275template(22, AddKeynoteComponent_form_14_mat_error_22_Template, 2, 0, "mat-error", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 9)(24, "mat-form-field", 10)(25, "mat-label");
    \u0275\u0275text(26, "Content Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "mat-select", 17)(28, "mat-option", 18);
    \u0275\u0275text(29, "Text");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "mat-option", 19);
    \u0275\u0275text(31, "Bullet Points");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "mat-option", 20);
    \u0275\u0275text(33, "Quote");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "mat-option", 21);
    \u0275\u0275text(35, "Example");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(36, AddKeynoteComponent_form_14_mat_error_36_Template, 2, 0, "mat-error", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 22)(38, "mat-checkbox", 23)(39, "mat-icon");
    \u0275\u0275text(40, "star");
    \u0275\u0275elementEnd();
    \u0275\u0275text(41, " Mark as Important ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(42, "div", 8)(43, "h3");
    \u0275\u0275text(44, "Content");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "mat-form-field", 10)(46, "mat-label");
    \u0275\u0275text(47, "Content");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "textarea", 24);
    \u0275\u0275text(49, "                ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "mat-hint");
    \u0275\u0275template(51, AddKeynoteComponent_form_14_span_51_Template, 2, 0, "span", 14)(52, AddKeynoteComponent_form_14_span_52_Template, 2, 0, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(53, AddKeynoteComponent_form_14_mat_error_53_Template, 2, 0, "mat-error", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 8)(55, "h3");
    \u0275\u0275text(56, "Visual Aid");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 22)(58, "mat-checkbox", 25);
    \u0275\u0275listener("change", function AddKeynoteComponent_form_14_Template_mat_checkbox_change_58_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onVisualAidChange($event));
    });
    \u0275\u0275elementStart(59, "mat-icon");
    \u0275\u0275text(60, "image");
    \u0275\u0275elementEnd();
    \u0275\u0275text(61, " Has Visual Aid ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(62, AddKeynoteComponent_form_14_mat_form_field_62_Template, 6, 0, "mat-form-field", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 8)(64, "h3");
    \u0275\u0275text(65, "Astrological Relations");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div", 9)(67, "mat-form-field", 10)(68, "mat-label");
    \u0275\u0275text(69, "Related Planet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "mat-select", 27)(71, "mat-option", 28);
    \u0275\u0275text(72, "None");
    \u0275\u0275elementEnd();
    \u0275\u0275template(73, AddKeynoteComponent_form_14_mat_option_73_Template, 2, 2, "mat-option", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(74, "mat-form-field", 10)(75, "mat-label");
    \u0275\u0275text(76, "Related Zodiac Sign");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "mat-select", 29)(78, "mat-option", 28);
    \u0275\u0275text(79, "None");
    \u0275\u0275elementEnd();
    \u0275\u0275template(80, AddKeynoteComponent_form_14_mat_option_80_Template, 2, 2, "mat-option", 13);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275element(81, "mat-divider");
    \u0275\u0275elementStart(82, "div", 8)(83, "div", 30)(84, "h3", 31)(85, "mat-icon");
    \u0275\u0275text(86, "label");
    \u0275\u0275elementEnd();
    \u0275\u0275text(87, " Keynote Tags ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "button", 32);
    \u0275\u0275listener("click", function AddKeynoteComponent_form_14_Template_button_click_88_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addTag());
    });
    \u0275\u0275elementStart(89, "mat-icon");
    \u0275\u0275text(90, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(91, " Add Tag ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "div", 33);
    \u0275\u0275template(93, AddKeynoteComponent_form_14_div_93_Template, 21, 3, "div", 34)(94, AddKeynoteComponent_form_14_div_94_Template, 5, 0, "div", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "div", 36)(96, "button", 37);
    \u0275\u0275listener("click", function AddKeynoteComponent_form_14_Template_button_click_96_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(97, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "button", 38);
    \u0275\u0275template(99, AddKeynoteComponent_form_14_mat_spinner_99_Template, 1, 0, "mat-spinner", 39);
    \u0275\u0275text(100);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_12_0;
    const lessonAuto_r10 = \u0275\u0275reference(10);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.keynoteForm);
    \u0275\u0275advance(8);
    \u0275\u0275property("matAutocomplete", lessonAuto_r10);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r1.displayLessonFn);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", \u0275\u0275pipeBind1(12, 18, ctx_r1.filteredLessons));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (tmp_6_0 = ctx_r1.keynoteForm.get("lessonSearch")) == null ? null : tmp_6_0.hasError("required"));
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", (tmp_7_0 = ctx_r1.keynoteForm.get("title")) == null ? null : tmp_7_0.hasError("required"));
    \u0275\u0275advance(14);
    \u0275\u0275property("ngIf", (tmp_8_0 = ctx_r1.keynoteForm.get("contentType")) == null ? null : tmp_8_0.hasError("required"));
    \u0275\u0275advance(15);
    \u0275\u0275property("ngIf", ((tmp_9_0 = ctx_r1.keynoteForm.get("contentType")) == null ? null : tmp_9_0.value) === "bullet_points");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_10_0 = ctx_r1.keynoteForm.get("contentType")) == null ? null : tmp_10_0.value) === "quote");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_11_0 = ctx_r1.keynoteForm.get("content")) == null ? null : tmp_11_0.hasError("required"));
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", (tmp_12_0 = ctx_r1.keynoteForm.get("hasVisualAid")) == null ? null : tmp_12_0.value);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngForOf", ctx_r1.planets);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.zodiacSigns);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.keynoteTags.controls);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.keynoteTags.length === 0);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.keynoteForm.invalid || ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.submitting ? "Saving..." : ctx_r1.isEditMode ? "Update Keynote" : "Create Keynote", " ");
  }
}
var AddKeynoteComponent = class _AddKeynoteComponent {
  fb;
  keynoteService;
  lessonService;
  keynoteTagService;
  tagService;
  errorHandler;
  router;
  route;
  snackBar;
  keynoteForm;
  isEditMode = false;
  keynoteId = null;
  loading = false;
  submitting = false;
  lessons = [];
  filteredLessons;
  allTags = [];
  planets = [
    "Sun",
    "Moon",
    "Mars",
    "Mercury",
    "Jupiter",
    "Venus",
    "Saturn",
    "Rahu",
    "Ketu"
  ];
  zodiacSigns = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces"
  ];
  constructor(fb, keynoteService, lessonService, keynoteTagService, tagService, errorHandler, router, route, snackBar) {
    this.fb = fb;
    this.keynoteService = keynoteService;
    this.lessonService = lessonService;
    this.keynoteTagService = keynoteTagService;
    this.tagService = tagService;
    this.errorHandler = errorHandler;
    this.router = router;
    this.route = route;
    this.snackBar = snackBar;
    this.keynoteForm = this.createForm();
    this.filteredLessons = this.keynoteForm.get("lessonSearch").valueChanges.pipe(startWith(""), map((value) => this.filterLessons(value)));
  }
  ngOnInit() {
    this.loadLessons();
    this.loadAllTags();
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.isEditMode = true;
        this.keynoteId = +params["id"];
        this.loadKeynote();
      }
    });
  }
  get keynoteTags() {
    return this.keynoteForm.get("keynoteTags");
  }
  createForm() {
    return this.fb.group({
      lessonSearch: ["", [Validators.required]],
      lessonId: [""],
      title: ["", [Validators.required]],
      content: ["", [Validators.required]],
      contentType: ["text", [Validators.required]],
      orderSequence: [""],
      isImportant: [false],
      hasVisualAid: [false],
      visualAidUrl: [""],
      relatedPlanet: [""],
      relatedZodiac: [""],
      keynoteTags: this.fb.array([])
    });
  }
  loadLessons() {
    this.lessonService.getAllLessons().subscribe({
      next: (lessons) => {
        this.lessons = lessons;
      },
      error: (error) => {
        console.error("Error loading lessons:", error);
        this.errorHandler.handleApiError(error, "loading lessons");
      }
    });
  }
  loadKeynote() {
    if (!this.keynoteId)
      return;
    this.loading = true;
    this.keynoteService.getKeynoteById(this.keynoteId).subscribe({
      next: (keynote) => {
        const lesson = this.lessons.find((l) => l.lessonId === keynote.lessonId);
        this.keynoteForm.patchValue(__spreadProps(__spreadValues({}, keynote), {
          lessonSearch: lesson
        }));
        this.loadKeynoteTags();
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading keynote:", error);
        this.errorHandler.handleApiError(error, "loading keynote details");
        this.loading = false;
      }
    });
  }
  filterLessons(value) {
    if (!value || typeof value === "object") {
      return this.lessons;
    }
    const filterValue = value.toLowerCase();
    return this.lessons.filter((lesson) => lesson.title.toLowerCase().includes(filterValue) || lesson.topicTitle?.toLowerCase().includes(filterValue));
  }
  displayLessonFn = (lesson) => {
    return lesson ? lesson.title : "";
  };
  onVisualAidChange(event) {
    if (!event.checked) {
      this.keynoteForm.patchValue({ visualAidUrl: "" });
    }
  }
  onSubmit() {
    if (this.keynoteForm.invalid)
      return;
    this.submitting = true;
    const formValue = this.keynoteForm.value;
    const selectedLesson = formValue.lessonSearch;
    if (!selectedLesson || !selectedLesson.lessonId) {
      this.snackBar.open("Please select a valid lesson", "Close", { duration: 3e3 });
      this.submitting = false;
      return;
    }
    const keynoteData = {
      lessonId: selectedLesson.lessonId,
      title: formValue.title,
      content: formValue.content,
      contentType: formValue.contentType,
      orderSequence: formValue.orderSequence || void 0,
      isImportant: formValue.isImportant,
      hasVisualAid: formValue.hasVisualAid,
      visualAidUrl: formValue.hasVisualAid ? formValue.visualAidUrl : null,
      relatedPlanet: formValue.relatedPlanet || null,
      relatedZodiac: formValue.relatedZodiac || null
    };
    const request = this.isEditMode ? this.keynoteService.updateKeynote(this.keynoteId, keynoteData) : this.keynoteService.createKeynote(keynoteData);
    request.subscribe({
      next: (result) => __async(this, null, function* () {
        try {
          if (!this.isEditMode && result.keynoteId) {
            this.keynoteId = result.keynoteId;
          }
          yield this.handleKeynoteTags();
          const message = this.isEditMode ? `Keynote updated successfully with ${this.keynoteTags.length} tag(s)!` : `Keynote created successfully with ${this.keynoteTags.length} tag(s)!`;
          this.errorHandler.showSuccess(message);
          this.router.navigate(["/keynotes"]);
        } catch (error) {
          console.error("Error handling keynote tags:", error);
          const fallbackMessage = this.isEditMode ? "Keynote updated but some tags failed to save" : "Keynote created but some tags failed to save";
          this.errorHandler.showWarning(fallbackMessage);
          this.router.navigate(["/keynotes"]);
        }
      }),
      error: (error) => {
        console.error("Error saving keynote:", error);
        this.errorHandler.handleApiError(error, "saving keynote");
        this.submitting = false;
      }
    });
  }
  handleKeynoteTags() {
    return __async(this, null, function* () {
      if (!this.keynoteId) {
        throw new Error("Keynote ID is required to handle tags");
      }
      const formTags = this.keynoteTags.value || [];
      for (let i = 0; i < formTags.length; i++) {
        const tagData = formTags[i];
        if (!tagData.tagId || !tagData.relevanceScore) {
          continue;
        }
        const tagPayload = {
          keynoteId: this.keynoteId,
          tagId: Number(tagData.tagId),
          relevanceScore: Number(tagData.relevanceScore)
        };
        try {
          if (tagData.keynoteTagId) {
            yield this.keynoteTagService.updateKeynoteTag(tagData.keynoteTagId, __spreadProps(__spreadValues({}, tagPayload), {
              keynoteTagId: tagData.keynoteTagId
            })).toPromise();
          } else {
            const created = yield this.keynoteTagService.createKeynoteTag(tagPayload).toPromise();
            if (created && created.keynoteTagId) {
              const tagForm = this.keynoteTags.at(i);
              tagForm.patchValue({ keynoteTagId: created.keynoteTagId });
            }
          }
        } catch (error) {
          console.error(`Error handling keynote tag at index ${i}:`, error);
          throw error;
        }
      }
    });
  }
  // Tag-related methods
  loadAllTags() {
    this.tagService.getTags().subscribe({
      next: (tags) => {
        this.allTags = tags;
      },
      error: (error) => {
        this.errorHandler.handleApiError(error, "loading tags");
      }
    });
  }
  loadKeynoteTags() {
    if (!this.keynoteId)
      return;
    this.keynoteTagService.getTagsByKeynoteId(this.keynoteId).subscribe({
      next: (keynoteTags) => {
        while (this.keynoteTags.length !== 0) {
          this.keynoteTags.removeAt(0);
        }
        keynoteTags.forEach((keynoteTag) => {
          const keynoteTagForm = this.fb.group({
            keynoteTagId: [keynoteTag.keynoteTagId],
            tagId: [keynoteTag.tagId, Validators.required],
            relevanceScore: [keynoteTag.relevanceScore || 5]
          });
          this.keynoteTags.push(keynoteTagForm);
        });
      },
      error: (error) => {
        this.errorHandler.handleApiError(error, "loading keynote tags");
      }
    });
  }
  addTag() {
    const tagForm = this.fb.group({
      keynoteTagId: [null],
      tagId: [null, Validators.required],
      relevanceScore: [5]
    });
    this.keynoteTags.push(tagForm);
  }
  saveTag(index) {
    return __async(this, null, function* () {
      const tagForm = this.keynoteTags.at(index);
      if (!tagForm.valid) {
        this.snackBar.open("Please select a tag and enter a valid relevance score.", "Close", { duration: 3e3 });
        return;
      }
      if (!this.keynoteId) {
        this.snackBar.open("Keynote must be saved before adding tags.", "Close", { duration: 3e3 });
        return;
      }
      const tagData = tagForm.value;
      const tagPayload = {
        keynoteId: this.keynoteId,
        tagId: Number(tagData.tagId),
        relevanceScore: Number(tagData.relevanceScore)
      };
      try {
        if (tagData.keynoteTagId) {
          yield this.keynoteTagService.updateKeynoteTag(tagData.keynoteTagId, __spreadProps(__spreadValues({}, tagPayload), {
            keynoteTagId: tagData.keynoteTagId
          })).toPromise();
          this.errorHandler.showSuccess("Tag updated successfully.");
        } else {
          const created = yield this.keynoteTagService.createKeynoteTag(tagPayload).toPromise();
          if (created && created.keynoteTagId) {
            tagForm.patchValue({ keynoteTagId: created.keynoteTagId });
          }
          this.errorHandler.showSuccess("Tag added successfully.");
        }
        this.loadKeynoteTags();
      } catch (error) {
        this.errorHandler.handleApiError(error, "saving tag");
      }
    });
  }
  removeTag(index) {
    return __async(this, null, function* () {
      const tagForm = this.keynoteTags.at(index);
      const tagData = tagForm.value;
      if (tagData.keynoteTagId) {
        try {
          yield this.keynoteTagService.deleteKeynoteTag(tagData.keynoteTagId).toPromise();
          this.errorHandler.showSuccess("Tag deleted successfully.");
          this.loadKeynoteTags();
        } catch (error) {
          this.errorHandler.handleApiError(error, "deleting tag");
        }
      } else {
        this.keynoteTags.removeAt(index);
      }
    });
  }
  goBack() {
    this.router.navigate(["/keynotes"]);
  }
  static \u0275fac = function AddKeynoteComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddKeynoteComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(LessonKeynoteService), \u0275\u0275directiveInject(LessonService), \u0275\u0275directiveInject(KeynoteTagService), \u0275\u0275directiveInject(TagService), \u0275\u0275directiveInject(ErrorHandlerService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddKeynoteComponent, selectors: [["app-add-keynote"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 15, vars: 4, consts: [["lessonAuto", "matAutocomplete"], [1, "container"], [1, "header"], ["mat-button", "", 3, "click"], ["class", "loading-container", 4, "ngIf"], ["class", "keynote-form", 3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "loading-container"], [1, "keynote-form", 3, "ngSubmit", "formGroup"], [1, "section"], [1, "form-row"], ["appearance", "outline"], ["matInput", "", "formControlName", "lessonSearch", "placeholder", "Search and select lesson", 3, "matAutocomplete"], [3, "displayWith"], [3, "value", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["matInput", "", "type", "number", "formControlName", "orderSequence", "placeholder", "Auto-assigned if empty"], ["matInput", "", "formControlName", "title", "placeholder", "Enter keynote title"], ["formControlName", "contentType"], ["value", "text"], ["value", "bullet_points"], ["value", "quote"], ["value", "example"], [1, "checkbox-group"], ["formControlName", "isImportant"], ["matInput", "", "formControlName", "content", "rows", "6", "placeholder", "Enter keynote content"], ["formControlName", "hasVisualAid", 3, "change"], ["appearance", "outline", 4, "ngIf"], ["formControlName", "relatedPlanet"], ["value", ""], ["formControlName", "relatedZodiac"], [1, "section-header"], [1, "section-title"], ["mat-raised-button", "", "color", "accent", "type", "button", 1, "add-tag-btn", 3, "click"], ["formArrayName", "keynoteTags", 1, "tags-container"], ["class", "tag-item", 3, "formGroupName", 4, "ngFor", "ngForOf"], ["class", "no-tags", 4, "ngIf"], [1, "form-actions"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20", 4, "ngIf"], [3, "value"], [1, "lesson-option"], [1, "lesson-title"], [1, "topic-title"], ["matInput", "", "formControlName", "visualAidUrl", "placeholder", "Enter image/media URL"], [1, "tag-item", 3, "formGroupName"], ["appearance", "outline", 1, "full-width"], ["formControlName", "tagId", "required", ""], ["matInput", "", "formControlName", "relevanceScore", "type", "number", "min", "1", "max", "10"], [1, "tag-actions"], ["mat-icon-button", "", "color", "primary", "type", "button", "matTooltip", "Save this tag", 1, "save-tag-btn", 3, "click"], ["mat-button", "", "color", "warn", "type", "button", "matTooltip", "Remove this tag", 3, "click"], [1, "no-tags"], ["diameter", "20"]], template: function AddKeynoteComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function AddKeynoteComponent_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(5, "mat-icon");
      \u0275\u0275text(6, "arrow_back");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Back to Keynotes ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card")(9, "mat-card-header")(10, "mat-card-title");
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "mat-card-content");
      \u0275\u0275template(13, AddKeynoteComponent_div_13_Template, 2, 0, "div", 4)(14, AddKeynoteComponent_form_14_Template, 101, 20, "form", 5);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit Keynote" : "Add New Keynote");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit Keynote Details" : "Keynote Information");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
    }
  }, dependencies: [
    CommonModule,
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
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatHint,
    MatError,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatCheckboxModule,
    MatCheckbox,
    MatIconModule,
    MatIcon,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatAutocompleteModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatDividerModule,
    MatDivider,
    MatTooltipModule,
    MatTooltip
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 900px;\n  margin: 0 auto;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 40px;\n}\n.keynote-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.section[_ngcontent-%COMP%] {\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  padding: 20px;\n  background-color: #fafafa;\n}\n.section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  color: #333;\n  font-size: 16px;\n  font-weight: 500;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  align-items: start;\n}\n.form-row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\nmat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.checkbox-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 8px;\n}\n.checkbox-group[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.lesson-option[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: 8px 0;\n}\n.lesson-title[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n}\n.topic-title[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  padding-top: 20px;\n  border-top: 1px solid #e0e0e0;\n}\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 120px;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n  color: #333;\n  font-size: 16px;\n  font-weight: 500;\n}\n.add-tag-btn[_ngcontent-%COMP%] {\n  min-width: auto;\n}\n.tags-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.tag-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr auto;\n  gap: 12px;\n  align-items: start;\n  padding: 16px;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  background-color: #fff;\n}\n.tag-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.save-tag-btn[_ngcontent-%COMP%] {\n  background-color: #4caf50;\n  color: white;\n}\n.no-tags[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #666;\n  border: 2px dashed #e0e0e0;\n  border-radius: 8px;\n  background-color: #f9f9f9;\n}\n.no-tags[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #ccc;\n  margin-bottom: 8px;\n}\n.no-tags[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n}\n@media (max-width: 768px) {\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=add-keynote.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddKeynoteComponent, { className: "AddKeynoteComponent", filePath: "src\\app\\pages\\keynotes\\add-keynote\\add-keynote.component.ts", lineNumber: 475 });
})();

// src/app/pages/keynotes/keynotes.routes.ts
var KEYNOTES_ROUTES = [
  { path: "", component: KeynoteListComponent },
  { path: "add", component: AddKeynoteComponent },
  { path: "edit/:id", component: AddKeynoteComponent },
  { path: ":id", component: KeynoteDetailsComponent }
];
export {
  KEYNOTES_ROUTES
};
//# sourceMappingURL=chunk-CDOYMYLP.mjs.map
