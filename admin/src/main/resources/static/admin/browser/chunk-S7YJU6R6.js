import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-V3YO3QG2.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-256D732O.js";
import {
  UserService
} from "./chunk-BJT3KOPX.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-CPKJDMHJ.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-XGBBJFGJ.js";
import {
  CategoryService
} from "./chunk-GQCAG6EO.js";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger
} from "./chunk-A4VKRCXJ.js";
import {
  CourseService
} from "./chunk-UOS4JHXU.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-VKZGNGI5.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-2SYMFJLH.js";
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
} from "./chunk-FPOTVELD.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-SQMEDFUW.js";
import {
  MatInput,
  MatInputModule,
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-HII6Y6OL.js";
import "./chunk-6XXSRBVR.js";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
  MatSuffix
} from "./chunk-F45HU3ZL.js";
import {
  AsyncPipe,
  CommonModule,
  CurrencyPipe,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatOption,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule,
  RequiredValidator,
  SlicePipe,
  Validators,
  debounceTime,
  distinctUntilChanged,
  inject,
  map,
  of,
  startWith,
  switchMap,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵpipeBind3,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-LRGABPEH.js";
import {
  __spreadValues
} from "./chunk-4MWRP73S.js";

// src/app/pages/courses/add-course/add-course.component.ts
function AddCourseComponent_mat_error_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Title is required ");
    \u0275\u0275elementEnd();
  }
}
function AddCourseComponent_mat_option_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", user_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.displayFn(user_r2), " ");
  }
}
function AddCourseComponent_mat_error_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Login ID is required ");
    \u0275\u0275elementEnd();
  }
}
function AddCourseComponent_mat_option_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", category_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.displayCategoryFn(category_r4), " ");
  }
}
function AddCourseComponent_mat_error_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Difficulty level is required ");
    \u0275\u0275elementEnd();
  }
}
function AddCourseComponent_mat_error_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Price is required ");
    \u0275\u0275elementEnd();
  }
}
function AddCourseComponent_mat_error_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Price must be greater than or equal to 0 ");
    \u0275\u0275elementEnd();
  }
}
function AddCourseComponent_mat_error_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Duration must be greater than or equal to 0 ");
    \u0275\u0275elementEnd();
  }
}
function AddCourseComponent_div_88_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "h4");
    \u0275\u0275text(2, "Thumbnail Preview:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 33)(4, "img", 34);
    \u0275\u0275listener("error", function AddCourseComponent_div_88_Template_img_error_4_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onThumbnailError($event));
    })("load", function AddCourseComponent_div_88_Template_img_load_4_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onThumbnailLoad($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 35)(6, "mat-icon");
    \u0275\u0275text(7, "broken_image");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "Invalid image URL");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("src", (tmp_3_0 = ctx_r2.courseForm.get("thumbnailUrl")) == null ? null : tmp_3_0.value, \u0275\u0275sanitizeUrl);
  }
}
function AddCourseComponent_mat_spinner_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 36);
  }
}
var AddCourseComponent = class _AddCourseComponent {
  courseForm;
  submitting = false;
  filteredUsers = of([]);
  filteredCategories = of([]);
  fb = inject(FormBuilder);
  userService = inject(UserService);
  categoryService = inject(CategoryService);
  courseService = inject(CourseService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  constructor() {
    this.courseForm = this.fb.group({
      title: ["", Validators.required],
      description: [""],
      loginId: ["", Validators.required],
      userSearch: [""],
      categoryId: [""],
      categorySearch: [""],
      difficultyLevel: ["beginner", Validators.required],
      price: ["", [Validators.required, Validators.min(0)]],
      durationHours: ["", Validators.min(0)],
      thumbnailUrl: [""],
      isPublished: [false]
    });
  }
  ngOnInit() {
    this.setupAutocomplete();
  }
  setupAutocomplete() {
    this.filteredUsers = this.courseForm.get("userSearch").valueChanges.pipe(startWith(""), debounceTime(300), distinctUntilChanged(), switchMap((value) => this._filterUsers(value)));
    this.filteredCategories = this.courseForm.get("categorySearch").valueChanges.pipe(startWith(""), debounceTime(300), distinctUntilChanged(), switchMap((value) => this._filterCategories(value)));
  }
  _filterUsers(value) {
    if (typeof value !== "string") {
      return of([]);
    }
    console.log("Filtering users with value:", value);
    const filterValue = value.trim().toLowerCase();
    return this.userService.searchUsers(filterValue);
  }
  _filterCategories(value) {
    return this.categoryService.getCategories().pipe(map((categories) => {
      const filterValue = typeof value === "string" ? value.toLowerCase() : "";
      return categories.filter((category) => category.name.toLowerCase().includes(filterValue));
    }));
  }
  displayFn = (user) => {
    return user ? `${user.firstName} ${user.lastName} (${user.username})` : "";
  };
  displayCategoryFn = (category) => {
    return category ? category.name : "";
  };
  onUserSelected(event) {
    const user = event.option.value;
    this.courseForm.patchValue({
      loginId: user.id
    });
  }
  onCategorySelected(event) {
    const category = event.option.value;
    this.courseForm.patchValue({
      categoryId: category.categoryId
    });
  }
  onSubmit() {
    if (this.courseForm.valid) {
      this.submitting = true;
      const formData = __spreadValues({}, this.courseForm.value);
      delete formData.userSearch;
      delete formData.categorySearch;
      console.log("Creating course with data:", formData);
      this.courseService.createCourse(formData).subscribe({
        next: (response) => {
          console.log("Course created successfully:", response);
          this.snackBar.open("Course created successfully!", "Close", {
            duration: 3e3,
            panelClass: ["success-snackbar"]
          });
          this.router.navigate(["/courses"]);
        },
        error: (error) => {
          console.error("Error creating course:", error);
          this.snackBar.open("Error creating course. Please try again.", "Close", {
            duration: 5e3,
            panelClass: ["error-snackbar"]
          });
          this.submitting = false;
        }
      });
    } else {
      this.snackBar.open("Please fill in all required fields correctly.", "Close", {
        duration: 3e3,
        panelClass: ["warning-snackbar"]
      });
    }
  }
  goBack() {
    this.router.navigate(["/courses"]);
  }
  onThumbnailError(event) {
    event.target.style.display = "none";
    const placeholder = event.target.parentElement.querySelector(".preview-placeholder");
    if (placeholder) {
      placeholder.style.display = "flex";
    }
  }
  onThumbnailLoad(event) {
    event.target.style.display = "block";
    const placeholder = event.target.parentElement.querySelector(".preview-placeholder");
    if (placeholder) {
      placeholder.style.display = "none";
    }
  }
  static \u0275fac = function AddCourseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddCourseComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddCourseComponent, selectors: [["app-add-course"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 98, vars: 21, consts: [["auto", "matAutocomplete"], ["categoryAuto", "matAutocomplete"], [1, "container"], [1, "header"], ["mat-button", "", 3, "click"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "title", "required", "", "placeholder", "Enter course title..."], [4, "ngIf"], ["matInput", "", "formControlName", "description", "rows", "3", "placeholder", "Enter course description..."], ["type", "text", "matInput", "", "formControlName", "userSearch", "placeholder", "Type to search users...", 3, "matAutocomplete"], [3, "optionSelected", "displayWith"], [3, "value", 4, "ngFor", "ngForOf"], ["matSuffix", ""], ["matInput", "", "formControlName", "loginId", "required", "", "readonly", ""], ["type", "text", "matInput", "", "formControlName", "categorySearch", "placeholder", "Type to search categories...", 3, "matAutocomplete"], ["matInput", "", "formControlName", "categoryId", "readonly", ""], ["formControlName", "difficultyLevel", "required", ""], ["value", "beginner"], ["value", "intermediate"], ["value", "advanced"], ["matInput", "", "type", "number", "formControlName", "price", "required", "", "min", "0", "step", "0.01"], ["matInput", "", "type", "number", "formControlName", "durationHours", "min", "0", "step", "0.5"], ["matInput", "", "formControlName", "thumbnailUrl", "placeholder", "https://example.com/image.jpg"], ["class", "thumbnail-preview", 4, "ngIf"], [1, "checkbox-field"], ["formControlName", "isPublished"], [1, "button-container"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20", 4, "ngIf"], [3, "value"], [1, "thumbnail-preview"], [1, "preview-container"], ["alt", "Course thumbnail preview", 1, "preview-image", 3, "error", "load", "src"], [1, "preview-placeholder", 2, "display", "none"], ["diameter", "20"]], template: function AddCourseComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h1");
      \u0275\u0275text(3, "Add New Course");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 4);
      \u0275\u0275listener("click", function AddCourseComponent_Template_button_click_4_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.goBack());
      });
      \u0275\u0275elementStart(5, "mat-icon");
      \u0275\u0275text(6, "arrow_back");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Back to Courses ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card")(9, "mat-card-header")(10, "mat-card-title");
      \u0275\u0275text(11, "Course Information");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "mat-card-content")(13, "form", 5);
      \u0275\u0275listener("ngSubmit", function AddCourseComponent_Template_form_ngSubmit_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSubmit());
      });
      \u0275\u0275elementStart(14, "mat-form-field", 6)(15, "mat-label");
      \u0275\u0275text(16, "Title");
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "input", 7);
      \u0275\u0275template(18, AddCourseComponent_mat_error_18_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "mat-form-field", 6)(20, "mat-label");
      \u0275\u0275text(21, "Description");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "textarea", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "mat-form-field", 6)(24, "mat-label");
      \u0275\u0275text(25, "Search User");
      \u0275\u0275elementEnd();
      \u0275\u0275element(26, "input", 10);
      \u0275\u0275elementStart(27, "mat-autocomplete", 11, 0);
      \u0275\u0275listener("optionSelected", function AddCourseComponent_Template_mat_autocomplete_optionSelected_27_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onUserSelected($event));
      });
      \u0275\u0275template(29, AddCourseComponent_mat_option_29_Template, 2, 2, "mat-option", 12);
      \u0275\u0275pipe(30, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "mat-icon", 13);
      \u0275\u0275text(32, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "mat-form-field", 6)(34, "mat-label");
      \u0275\u0275text(35, "Login ID");
      \u0275\u0275elementEnd();
      \u0275\u0275element(36, "input", 14);
      \u0275\u0275elementStart(37, "mat-hint");
      \u0275\u0275text(38, "Selected from user search above");
      \u0275\u0275elementEnd();
      \u0275\u0275template(39, AddCourseComponent_mat_error_39_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "mat-form-field", 6)(41, "mat-label");
      \u0275\u0275text(42, "Search Category");
      \u0275\u0275elementEnd();
      \u0275\u0275element(43, "input", 15);
      \u0275\u0275elementStart(44, "mat-autocomplete", 11, 1);
      \u0275\u0275listener("optionSelected", function AddCourseComponent_Template_mat_autocomplete_optionSelected_44_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCategorySelected($event));
      });
      \u0275\u0275template(46, AddCourseComponent_mat_option_46_Template, 2, 2, "mat-option", 12);
      \u0275\u0275pipe(47, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "mat-icon", 13);
      \u0275\u0275text(49, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "mat-form-field", 6)(51, "mat-label");
      \u0275\u0275text(52, "Category ID");
      \u0275\u0275elementEnd();
      \u0275\u0275element(53, "input", 16);
      \u0275\u0275elementStart(54, "mat-hint");
      \u0275\u0275text(55, "Selected from category search above");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "mat-form-field", 6)(57, "mat-label");
      \u0275\u0275text(58, "Difficulty Level");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "mat-select", 17)(60, "mat-option", 18);
      \u0275\u0275text(61, "Beginner");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "mat-option", 19);
      \u0275\u0275text(63, "Intermediate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "mat-option", 20);
      \u0275\u0275text(65, "Advanced");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(66, AddCourseComponent_mat_error_66_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "mat-form-field", 6)(68, "mat-label");
      \u0275\u0275text(69, "Price");
      \u0275\u0275elementEnd();
      \u0275\u0275element(70, "input", 21);
      \u0275\u0275elementStart(71, "mat-hint");
      \u0275\u0275text(72, "Enter price in USD");
      \u0275\u0275elementEnd();
      \u0275\u0275template(73, AddCourseComponent_mat_error_73_Template, 2, 0, "mat-error", 8)(74, AddCourseComponent_mat_error_74_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "mat-form-field", 6)(76, "mat-label");
      \u0275\u0275text(77, "Duration (Hours)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(78, "input", 22);
      \u0275\u0275elementStart(79, "mat-hint");
      \u0275\u0275text(80, "Course duration in hours");
      \u0275\u0275elementEnd();
      \u0275\u0275template(81, AddCourseComponent_mat_error_81_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "mat-form-field", 6)(83, "mat-label");
      \u0275\u0275text(84, "Thumbnail URL");
      \u0275\u0275elementEnd();
      \u0275\u0275element(85, "input", 23);
      \u0275\u0275elementStart(86, "mat-hint");
      \u0275\u0275text(87, "URL for course thumbnail image");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(88, AddCourseComponent_div_88_Template, 10, 1, "div", 24);
      \u0275\u0275elementStart(89, "div", 25)(90, "mat-checkbox", 26);
      \u0275\u0275text(91, " Publish this course ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(92, "div", 27)(93, "button", 28);
      \u0275\u0275listener("click", function AddCourseComponent_Template_button_click_93_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.goBack());
      });
      \u0275\u0275text(94, " Cancel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "button", 29);
      \u0275\u0275template(96, AddCourseComponent_mat_spinner_96_Template, 1, 0, "mat-spinner", 30);
      \u0275\u0275text(97);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_7_0;
      let tmp_11_0;
      let tmp_12_0;
      let tmp_13_0;
      let tmp_14_0;
      let tmp_15_0;
      const auto_r6 = \u0275\u0275reference(28);
      const categoryAuto_r7 = \u0275\u0275reference(45);
      \u0275\u0275advance(13);
      \u0275\u0275property("formGroup", ctx.courseForm);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_3_0 = ctx.courseForm.get("title")) == null ? null : tmp_3_0.hasError("required"));
      \u0275\u0275advance(8);
      \u0275\u0275property("matAutocomplete", auto_r6);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayFn);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", \u0275\u0275pipeBind1(30, 17, ctx.filteredUsers));
      \u0275\u0275advance(10);
      \u0275\u0275property("ngIf", (tmp_7_0 = ctx.courseForm.get("loginId")) == null ? null : tmp_7_0.hasError("required"));
      \u0275\u0275advance(4);
      \u0275\u0275property("matAutocomplete", categoryAuto_r7);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayCategoryFn);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", \u0275\u0275pipeBind1(47, 19, ctx.filteredCategories));
      \u0275\u0275advance(20);
      \u0275\u0275property("ngIf", (tmp_11_0 = ctx.courseForm.get("difficultyLevel")) == null ? null : tmp_11_0.hasError("required"));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", (tmp_12_0 = ctx.courseForm.get("price")) == null ? null : tmp_12_0.hasError("required"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_13_0 = ctx.courseForm.get("price")) == null ? null : tmp_13_0.hasError("min"));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", (tmp_14_0 = ctx.courseForm.get("durationHours")) == null ? null : tmp_14_0.hasError("min"));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", (tmp_15_0 = ctx.courseForm.get("thumbnailUrl")) == null ? null : tmp_15_0.value);
      \u0275\u0275advance(7);
      \u0275\u0275property("disabled", ctx.courseForm.invalid || ctx.submitting);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.submitting);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.submitting ? "Creating..." : "Create Course", " ");
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, AsyncPipe, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, FormGroupDirective, FormControlName, MatFormFieldModule, MatFormField, MatLabel, MatHint, MatError, MatSuffix, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatButtonModule, MatButton, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCheckboxModule, MatCheckbox, MatAutocompleteModule, MatAutocomplete, MatAutocompleteTrigger, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatSnackBarModule], styles: ["\n\n.add-course[_ngcontent-%COMP%] {\n  max-width: 600px;\n  margin: auto;\n  padding: 20px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  background-color: #f9f9f9;\n}\n.add-course[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 20px;\n}\n.add-course[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n.add-course[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 5px;\n}\n.add-course[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.add-course[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \n.add-course[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n.add-course[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  padding: 10px;\n  background-color: #007bff;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.add-course[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background-color: #0056b3;\n}\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n  font-size: 28px;\n  font-weight: 500;\n}\n.container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%] {\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  border-radius: 8px;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 500;\n  margin: 0;\n  color: #333;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .checkbox-field[_ngcontent-%COMP%] {\n  margin: 16px 0;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .checkbox-field[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  margin-top: 24px;\n  padding-top: 20px;\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 120px;\n  font-weight: 500;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:first-child {\n  color: #666;\n}\n  .mat-mdc-form-field .mat-mdc-form-field-hint {\n  font-size: 12px;\n  opacity: 0.7;\n}\n  .mat-mdc-form-field .mat-mdc-form-field-error {\n  font-size: 12px;\n}\n  .mat-mdc-autocomplete-panel {\n  max-height: 256px !important;\n}\n  .success-snackbar {\n  background-color: #4caf50 !important;\n  color: white !important;\n}\n  .error-snackbar {\n  background-color: #f44336 !important;\n  color: white !important;\n}\n  .warning-snackbar {\n  background-color: #ff9800 !important;\n  color: white !important;\n}\n@media (max-width: 768px) {\n  .container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 16px;\n  }\n  .container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n    gap: 16px;\n  }\n  .container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=add-course.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddCourseComponent, { className: "AddCourseComponent", filePath: "src\\app\\pages\\courses\\add-course\\add-course.component.ts", lineNumber: 40 });
})();

// src/app/pages/courses/update-course/update-course.component.ts
function UpdateCourseComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading course data...");
    \u0275\u0275elementEnd()();
  }
}
function UpdateCourseComponent_form_14_mat_error_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Title is required ");
    \u0275\u0275elementEnd();
  }
}
function UpdateCourseComponent_form_14_mat_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", user_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.displayFn(user_r3), " ");
  }
}
function UpdateCourseComponent_form_14_mat_error_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Login ID is required ");
    \u0275\u0275elementEnd();
  }
}
function UpdateCourseComponent_form_14_mat_option_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", category_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.displayCategoryFn(category_r4), " ");
  }
}
function UpdateCourseComponent_form_14_mat_error_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Difficulty level is required ");
    \u0275\u0275elementEnd();
  }
}
function UpdateCourseComponent_form_14_mat_error_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Price is required ");
    \u0275\u0275elementEnd();
  }
}
function UpdateCourseComponent_form_14_mat_error_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Price must be greater than or equal to 0 ");
    \u0275\u0275elementEnd();
  }
}
function UpdateCourseComponent_form_14_mat_error_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Duration must be greater than or equal to 0 ");
    \u0275\u0275elementEnd();
  }
}
function UpdateCourseComponent_form_14_mat_spinner_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 34);
  }
}
function UpdateCourseComponent_form_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 8);
    \u0275\u0275listener("ngSubmit", function UpdateCourseComponent_form_14_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "mat-form-field", 9)(2, "mat-label");
    \u0275\u0275text(3, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 10);
    \u0275\u0275template(5, UpdateCourseComponent_form_14_mat_error_5_Template, 2, 0, "mat-error", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-form-field", 9)(7, "mat-label");
    \u0275\u0275text(8, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "textarea", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-form-field", 9)(11, "mat-label");
    \u0275\u0275text(12, "Search User");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 13);
    \u0275\u0275elementStart(14, "mat-autocomplete", 14, 0);
    \u0275\u0275listener("optionSelected", function UpdateCourseComponent_form_14_Template_mat_autocomplete_optionSelected_14_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onUserSelected($event));
    });
    \u0275\u0275template(16, UpdateCourseComponent_form_14_mat_option_16_Template, 2, 2, "mat-option", 15);
    \u0275\u0275pipe(17, "async");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "mat-icon", 16);
    \u0275\u0275text(19, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "mat-form-field", 9)(21, "mat-label");
    \u0275\u0275text(22, "Login ID");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "input", 17);
    \u0275\u0275elementStart(24, "mat-hint");
    \u0275\u0275text(25, "Selected from user search above");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, UpdateCourseComponent_form_14_mat_error_26_Template, 2, 0, "mat-error", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "mat-form-field", 9)(28, "mat-label");
    \u0275\u0275text(29, "Search Category");
    \u0275\u0275elementEnd();
    \u0275\u0275element(30, "input", 18);
    \u0275\u0275elementStart(31, "mat-autocomplete", 14, 1);
    \u0275\u0275listener("optionSelected", function UpdateCourseComponent_form_14_Template_mat_autocomplete_optionSelected_31_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCategorySelected($event));
    });
    \u0275\u0275template(33, UpdateCourseComponent_form_14_mat_option_33_Template, 2, 2, "mat-option", 15);
    \u0275\u0275pipe(34, "async");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "mat-icon", 16);
    \u0275\u0275text(36, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "mat-form-field", 9)(38, "mat-label");
    \u0275\u0275text(39, "Category ID");
    \u0275\u0275elementEnd();
    \u0275\u0275element(40, "input", 19);
    \u0275\u0275elementStart(41, "mat-hint");
    \u0275\u0275text(42, "Selected from category search above");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "mat-form-field", 9)(44, "mat-label");
    \u0275\u0275text(45, "Difficulty Level");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "mat-select", 20)(47, "mat-option", 21);
    \u0275\u0275text(48, "Beginner");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "mat-option", 22);
    \u0275\u0275text(50, "Intermediate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "mat-option", 23);
    \u0275\u0275text(52, "Advanced");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(53, UpdateCourseComponent_form_14_mat_error_53_Template, 2, 0, "mat-error", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "mat-form-field", 9)(55, "mat-label");
    \u0275\u0275text(56, "Price");
    \u0275\u0275elementEnd();
    \u0275\u0275element(57, "input", 24);
    \u0275\u0275elementStart(58, "mat-hint");
    \u0275\u0275text(59, "Enter price in USD");
    \u0275\u0275elementEnd();
    \u0275\u0275template(60, UpdateCourseComponent_form_14_mat_error_60_Template, 2, 0, "mat-error", 11)(61, UpdateCourseComponent_form_14_mat_error_61_Template, 2, 0, "mat-error", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "mat-form-field", 9)(63, "mat-label");
    \u0275\u0275text(64, "Duration (Hours)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(65, "input", 25);
    \u0275\u0275elementStart(66, "mat-hint");
    \u0275\u0275text(67, "Course duration in hours");
    \u0275\u0275elementEnd();
    \u0275\u0275template(68, UpdateCourseComponent_form_14_mat_error_68_Template, 2, 0, "mat-error", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "mat-form-field", 9)(70, "mat-label");
    \u0275\u0275text(71, "Thumbnail URL");
    \u0275\u0275elementEnd();
    \u0275\u0275element(72, "input", 26);
    \u0275\u0275elementStart(73, "mat-hint");
    \u0275\u0275text(74, "URL for course thumbnail image");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "div", 27)(76, "mat-checkbox", 28);
    \u0275\u0275text(77, " Publish this course ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 29)(79, "button", 30);
    \u0275\u0275listener("click", function UpdateCourseComponent_form_14_Template_button_click_79_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(80, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "button", 31);
    \u0275\u0275template(82, UpdateCourseComponent_form_14_mat_spinner_82_Template, 1, 0, "mat-spinner", 32);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_8_0;
    let tmp_12_0;
    let tmp_13_0;
    let tmp_14_0;
    let tmp_15_0;
    const auto_r5 = \u0275\u0275reference(15);
    const categoryAuto_r6 = \u0275\u0275reference(32);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.courseForm);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", (tmp_4_0 = ctx_r1.courseForm.get("title")) == null ? null : tmp_4_0.hasError("required"));
    \u0275\u0275advance(8);
    \u0275\u0275property("matAutocomplete", auto_r5);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r1.displayFn);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", \u0275\u0275pipeBind1(17, 16, ctx_r1.filteredUsers));
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", (tmp_8_0 = ctx_r1.courseForm.get("loginId")) == null ? null : tmp_8_0.hasError("required"));
    \u0275\u0275advance(4);
    \u0275\u0275property("matAutocomplete", categoryAuto_r6);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r1.displayCategoryFn);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", \u0275\u0275pipeBind1(34, 18, ctx_r1.filteredCategories));
    \u0275\u0275advance(20);
    \u0275\u0275property("ngIf", (tmp_12_0 = ctx_r1.courseForm.get("difficultyLevel")) == null ? null : tmp_12_0.hasError("required"));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", (tmp_13_0 = ctx_r1.courseForm.get("price")) == null ? null : tmp_13_0.hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_14_0 = ctx_r1.courseForm.get("price")) == null ? null : tmp_14_0.hasError("min"));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", (tmp_15_0 = ctx_r1.courseForm.get("durationHours")) == null ? null : tmp_15_0.hasError("min"));
    \u0275\u0275advance(13);
    \u0275\u0275property("disabled", ctx_r1.courseForm.invalid || ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.submitting ? "Updating..." : "Update Course", " ");
  }
}
var UpdateCourseComponent = class _UpdateCourseComponent {
  courseForm;
  courseId;
  loading = false;
  submitting = false;
  filteredUsers = of([]);
  filteredCategories = of([]);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  courseService = inject(CourseService);
  userService = inject(UserService);
  categoryService = inject(CategoryService);
  snackBar = inject(MatSnackBar);
  constructor() {
    this.courseForm = this.fb.group({
      title: ["", Validators.required],
      description: [""],
      loginId: ["", Validators.required],
      userSearch: [""],
      categoryId: [""],
      categorySearch: [""],
      difficultyLevel: ["BEGINNER", Validators.required],
      price: ["", [Validators.required, Validators.min(0)]],
      durationHours: ["", Validators.min(0)],
      thumbnailUrl: [""],
      isPublished: [false]
    });
    this.courseId = +this.route.snapshot.params["id"];
  }
  ngOnInit() {
    this.loadCourse();
    this.setupAutocomplete();
  }
  loadCourse() {
    this.loading = true;
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.courseForm.patchValue({
          title: course.title,
          description: course.description,
          loginId: course.loginId,
          categoryId: course.categoryId,
          difficultyLevel: course.difficultyLevel,
          price: course.price,
          durationHours: course.durationHours,
          thumbnailUrl: course.thumbnailUrl,
          isPublished: course.isPublished
        });
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading course:", error);
        this.snackBar.open("Error loading course data", "Close", {
          duration: 5e3,
          panelClass: ["error-snackbar"]
        });
        this.loading = false;
      }
    });
  }
  setupAutocomplete() {
    this.filteredUsers = this.courseForm.get("userSearch").valueChanges.pipe(startWith(""), debounceTime(300), distinctUntilChanged(), switchMap((value) => this._filterUsers(value)));
    this.filteredCategories = this.courseForm.get("categorySearch").valueChanges.pipe(startWith(""), debounceTime(300), distinctUntilChanged(), switchMap((value) => this._filterCategories(value)));
  }
  _filterUsers(value) {
    if (typeof value !== "string") {
      return of([]);
    }
    const filterValue = value.trim().toLowerCase();
    if (!filterValue) {
      return of([]);
    }
    return this.userService.searchUsers(filterValue);
  }
  _filterCategories(value) {
    return this.categoryService.getCategories().pipe(map((categories) => {
      const filterValue = typeof value === "string" ? value.toLowerCase() : "";
      return categories.filter((category) => category.name.toLowerCase().includes(filterValue));
    }));
  }
  displayFn = (user) => {
    return user ? `${user.firstName} ${user.lastName} (${user.username})` : "";
  };
  displayCategoryFn = (category) => {
    return category ? category.name : "";
  };
  onUserSelected(event) {
    const user = event.option.value;
    this.courseForm.patchValue({
      loginId: user.id
    });
  }
  onCategorySelected(event) {
    const category = event.option.value;
    this.courseForm.patchValue({
      categoryId: category.categoryId
    });
  }
  onSubmit() {
    if (this.courseForm.valid) {
      this.submitting = true;
      const formData = __spreadValues({}, this.courseForm.value);
      delete formData.userSearch;
      delete formData.categorySearch;
      this.courseService.updateCourse(this.courseId, formData).subscribe({
        next: (response) => {
          this.snackBar.open("Course updated successfully!", "Close", {
            duration: 3e3,
            panelClass: ["success-snackbar"]
          });
          this.router.navigate(["/courses"]);
        },
        error: (error) => {
          console.error("Error updating course:", error);
          this.snackBar.open("Error updating course. Please try again.", "Close", {
            duration: 5e3,
            panelClass: ["error-snackbar"]
          });
          this.submitting = false;
        }
      });
    } else {
      this.snackBar.open("Please fill in all required fields correctly.", "Close", {
        duration: 3e3,
        panelClass: ["warning-snackbar"]
      });
    }
  }
  goBack() {
    this.router.navigate(["/courses"]);
  }
  static \u0275fac = function UpdateCourseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UpdateCourseComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UpdateCourseComponent, selectors: [["app-update-course"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 15, vars: 2, consts: [["auto", "matAutocomplete"], ["categoryAuto", "matAutocomplete"], [1, "container"], [1, "header"], ["mat-button", "", 3, "click"], ["class", "loading-container", 4, "ngIf"], [3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "loading-container"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "title", "required", ""], [4, "ngIf"], ["matInput", "", "formControlName", "description", "rows", "3", "placeholder", "Enter course description..."], ["type", "text", "matInput", "", "formControlName", "userSearch", "placeholder", "Type to search users...", 3, "matAutocomplete"], [3, "optionSelected", "displayWith"], [3, "value", 4, "ngFor", "ngForOf"], ["matSuffix", ""], ["matInput", "", "formControlName", "loginId", "required", "", "readonly", ""], ["type", "text", "matInput", "", "formControlName", "categorySearch", "placeholder", "Type to search categories...", 3, "matAutocomplete"], ["matInput", "", "formControlName", "categoryId", "readonly", ""], ["formControlName", "difficultyLevel", "required", ""], ["value", "beginner"], ["value", "intermediate"], ["value", "advanced"], ["matInput", "", "type", "number", "formControlName", "price", "required", "", "min", "0", "step", "0.01"], ["matInput", "", "type", "number", "formControlName", "durationHours", "min", "0", "step", "0.5"], ["matInput", "", "formControlName", "thumbnailUrl", "placeholder", "https://example.com/image.jpg"], [1, "checkbox-field"], ["formControlName", "isPublished"], [1, "button-container"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20", 4, "ngIf"], [3, "value"], ["diameter", "20"]], template: function UpdateCourseComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h1");
      \u0275\u0275text(3, "Update Course");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 4);
      \u0275\u0275listener("click", function UpdateCourseComponent_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(5, "mat-icon");
      \u0275\u0275text(6, "arrow_back");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Back to Courses ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card")(9, "mat-card-header")(10, "mat-card-title");
      \u0275\u0275text(11, "Course Information");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "mat-card-content");
      \u0275\u0275template(13, UpdateCourseComponent_div_13_Template, 4, 0, "div", 5)(14, UpdateCourseComponent_form_14_Template, 84, 20, "form", 6);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, AsyncPipe, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, FormGroupDirective, FormControlName, MatFormFieldModule, MatFormField, MatLabel, MatHint, MatError, MatSuffix, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatButtonModule, MatButton, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCheckboxModule, MatCheckbox, MatAutocompleteModule, MatAutocomplete, MatAutocompleteTrigger, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatSnackBarModule], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n  font-size: 28px;\n  font-weight: 500;\n}\n.container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%] {\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  border-radius: 8px;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 500;\n  margin: 0;\n  color: #333;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 40px;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .loading-container[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin: 0;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .checkbox-field[_ngcontent-%COMP%] {\n  margin: 16px 0;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .checkbox-field[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  margin-top: 24px;\n  padding-top: 20px;\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 120px;\n  font-weight: 500;\n}\n.container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:first-child {\n  color: #666;\n}\n  .mat-mdc-form-field .mat-mdc-form-field-hint {\n  font-size: 12px;\n  opacity: 0.7;\n}\n  .mat-mdc-form-field .mat-mdc-form-field-error {\n  font-size: 12px;\n}\n  .mat-mdc-autocomplete-panel {\n  max-height: 256px !important;\n}\n  .success-snackbar {\n  background-color: #4caf50 !important;\n  color: white !important;\n}\n  .error-snackbar {\n  background-color: #f44336 !important;\n  color: white !important;\n}\n  .warning-snackbar {\n  background-color: #ff9800 !important;\n  color: white !important;\n}\n@media (max-width: 768px) {\n  .container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 16px;\n  }\n  .container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n    gap: 16px;\n  }\n  .container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .button-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=update-course.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UpdateCourseComponent, { className: "UpdateCourseComponent", filePath: "src\\app\\pages\\courses\\update-course\\update-course.component.ts", lineNumber: 40 });
})();

// src/app/pages/courses/course-list/course-list.component.ts
var _c0 = (a0) => ["update", a0];
function CourseListComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading courses...");
    \u0275\u0275elementEnd()();
  }
}
function CourseListComponent_mat_card_46_div_5_p_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Try adjusting your filters or ");
    \u0275\u0275elementStart(2, "button", 23);
    \u0275\u0275listener("click", function CourseListComponent_mat_card_46_div_5_p_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.clearFilters());
    });
    \u0275\u0275text(3, "clear all filters");
    \u0275\u0275elementEnd()();
  }
}
function CourseListComponent_mat_card_46_div_5_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Start by creating your first course.");
    \u0275\u0275elementEnd();
  }
}
function CourseListComponent_mat_card_46_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "mat-icon");
    \u0275\u0275text(2, "school");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No courses found");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, CourseListComponent_mat_card_46_div_5_p_5_Template, 4, 0, "p", 18)(6, CourseListComponent_mat_card_46_div_5_p_6_Template, 2, 0, "p", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.hasActiveFilters());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.hasActiveFilters());
  }
}
function CourseListComponent_mat_card_46_table_6_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, "Thumbnail");
    \u0275\u0275elementEnd();
  }
}
function CourseListComponent_mat_card_46_table_6_td_3_img_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 40);
    \u0275\u0275listener("error", function CourseListComponent_mat_card_46_table_6_td_3_img_2_Template_img_error_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onImageError($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const course_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", course_r4.thumbnailUrl, \u0275\u0275sanitizeUrl)("alt", course_r4.title + " thumbnail");
  }
}
function CourseListComponent_mat_card_46_table_6_td_3_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "mat-icon");
    \u0275\u0275text(2, "image");
    \u0275\u0275elementEnd()();
  }
}
function CourseListComponent_mat_card_46_table_6_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 37)(1, "div", 38);
    \u0275\u0275template(2, CourseListComponent_mat_card_46_table_6_td_3_img_2_Template, 1, 2, "img", 39)(3, CourseListComponent_mat_card_46_table_6_td_3_ng_template_3_Template, 3, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const course_r4 = ctx.$implicit;
    const noThumbnail_r5 = \u0275\u0275reference(4);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", course_r4.thumbnailUrl)("ngIfElse", noThumbnail_r5);
  }
}
function CourseListComponent_mat_card_46_table_6_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, "Title");
    \u0275\u0275elementEnd();
  }
}
function CourseListComponent_mat_card_46_table_6_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 37)(1, "div", 42)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 43)(5, "span", 44);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const course_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(course_r6.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("ID: ", course_r6.courseId, "");
  }
}
function CourseListComponent_mat_card_46_table_6_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, "Description");
    \u0275\u0275elementEnd();
  }
}
function CourseListComponent_mat_card_46_table_6_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 37)(1, "div", 45);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "slice");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const course_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", course_r7.description);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind3(3, 3, course_r7.description, 0, 100), "", (course_r7.description == null ? null : course_r7.description.length) > 100 ? "..." : "", " ");
  }
}
function CourseListComponent_mat_card_46_table_6_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, "Price");
    \u0275\u0275elementEnd();
  }
}
function CourseListComponent_mat_card_46_table_6_td_12_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const course_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", course_r8.durationHours, "h ");
  }
}
function CourseListComponent_mat_card_46_table_6_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 37)(1, "div", 46)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, CourseListComponent_mat_card_46_table_6_td_12_div_5_Template, 2, 1, "div", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const course_r8 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(4, 2, course_r8.price, "USD", "symbol", "1.2-2"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", course_r8.durationHours);
  }
}
function CourseListComponent_mat_card_46_table_6_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, "Difficulty");
    \u0275\u0275elementEnd();
  }
}
function CourseListComponent_mat_card_46_table_6_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 37)(1, "mat-chip", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const course_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap("difficulty-" + (course_r9.difficultyLevel == null ? null : course_r9.difficultyLevel.toLowerCase()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", course_r9.difficultyLevel, " ");
  }
}
function CourseListComponent_mat_card_46_table_6_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, "Status");
    \u0275\u0275elementEnd();
  }
}
function CourseListComponent_mat_card_46_table_6_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 37)(1, "mat-chip", 50)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const course_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(course_r10.isPublished ? "status-published" : "status-draft");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(course_r10.isPublished ? "check_circle" : "edit");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", course_r10.isPublished ? "Published" : "Draft", " ");
  }
}
function CourseListComponent_mat_card_46_table_6_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function CourseListComponent_mat_card_46_table_6_td_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 37)(1, "div", 51)(2, "button", 52)(3, "mat-icon");
    \u0275\u0275text(4, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 53);
    \u0275\u0275listener("click", function CourseListComponent_mat_card_46_table_6_td_21_Template_button_click_5_listener() {
      const course_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deleteCourse(course_r12.courseId, course_r12.title));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const course_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c0, course_r12.courseId));
  }
}
function CourseListComponent_mat_card_46_table_6_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 54);
  }
}
function CourseListComponent_mat_card_46_table_6_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 55);
  }
}
function CourseListComponent_mat_card_46_table_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 24);
    \u0275\u0275elementContainerStart(1, 25);
    \u0275\u0275template(2, CourseListComponent_mat_card_46_table_6_th_2_Template, 2, 0, "th", 26)(3, CourseListComponent_mat_card_46_table_6_td_3_Template, 5, 2, "td", 27);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 28);
    \u0275\u0275template(5, CourseListComponent_mat_card_46_table_6_th_5_Template, 2, 0, "th", 26)(6, CourseListComponent_mat_card_46_table_6_td_6_Template, 7, 2, "td", 27);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 29);
    \u0275\u0275template(8, CourseListComponent_mat_card_46_table_6_th_8_Template, 2, 0, "th", 26)(9, CourseListComponent_mat_card_46_table_6_td_9_Template, 4, 7, "td", 27);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 30);
    \u0275\u0275template(11, CourseListComponent_mat_card_46_table_6_th_11_Template, 2, 0, "th", 26)(12, CourseListComponent_mat_card_46_table_6_td_12_Template, 6, 7, "td", 27);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 31);
    \u0275\u0275template(14, CourseListComponent_mat_card_46_table_6_th_14_Template, 2, 0, "th", 26)(15, CourseListComponent_mat_card_46_table_6_td_15_Template, 3, 3, "td", 27);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 32);
    \u0275\u0275template(17, CourseListComponent_mat_card_46_table_6_th_17_Template, 2, 0, "th", 26)(18, CourseListComponent_mat_card_46_table_6_td_18_Template, 5, 4, "td", 27);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(19, 33);
    \u0275\u0275template(20, CourseListComponent_mat_card_46_table_6_th_20_Template, 2, 0, "th", 26)(21, CourseListComponent_mat_card_46_table_6_td_21_Template, 8, 3, "td", 27);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(22, CourseListComponent_mat_card_46_table_6_tr_22_Template, 1, 0, "tr", 34)(23, CourseListComponent_mat_card_46_table_6_tr_23_Template, 1, 0, "tr", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("dataSource", ctx_r1.filteredCourses);
    \u0275\u0275advance(22);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
  }
}
function CourseListComponent_mat_card_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content");
    \u0275\u0275template(5, CourseListComponent_mat_card_46_div_5_Template, 7, 2, "div", 20)(6, CourseListComponent_mat_card_46_table_6_Template, 24, 3, "table", 21);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Courses (", ctx_r1.filteredCourses.length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.filteredCourses.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.filteredCourses.length > 0);
  }
}
var CourseListComponent = class _CourseListComponent {
  courseService;
  snackBar;
  courses = [];
  filteredCourses = [];
  loading = false;
  searchQuery = "";
  selectedDifficulty = "";
  selectedStatus = "";
  displayedColumns = ["thumbnail", "title", "description", "price", "difficultyLevel", "isPublished", "actions"];
  constructor(courseService, snackBar) {
    this.courseService = courseService;
    this.snackBar = snackBar;
  }
  ngOnInit() {
    this.loadCourses();
  }
  loadCourses() {
    this.loading = true;
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading courses:", error);
        this.snackBar.open("Error loading courses. Please try again.", "Close", {
          duration: 5e3,
          panelClass: ["error-snackbar"]
        });
        this.loading = false;
      }
    });
  }
  applyFilters() {
    this.filteredCourses = this.courses.filter((course) => {
      const matchesSearch = !this.searchQuery || course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || course.description && course.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesDifficulty = !this.selectedDifficulty || course.difficultyLevel === this.selectedDifficulty;
      const matchesStatus = !this.selectedStatus || this.selectedStatus === "published" && course.isPublished || this.selectedStatus === "draft" && !course.isPublished;
      return matchesSearch && matchesDifficulty && matchesStatus;
    });
  }
  clearFilters() {
    this.searchQuery = "";
    this.selectedDifficulty = "";
    this.selectedStatus = "";
    this.applyFilters();
  }
  hasActiveFilters() {
    return !!(this.searchQuery || this.selectedDifficulty || this.selectedStatus);
  }
  deleteCourse(courseId, title) {
    if (confirm(`Are you sure you want to delete the course "${title}"? This action cannot be undone.`)) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.loadCourses();
          this.snackBar.open("Course deleted successfully", "Close", {
            duration: 3e3,
            panelClass: ["success-snackbar"]
          });
        },
        error: (error) => {
          console.error("Error deleting course:", error);
          this.snackBar.open("Error deleting course. Please try again.", "Close", {
            duration: 5e3,
            panelClass: ["error-snackbar"]
          });
        }
      });
    }
  }
  onImageError(event) {
    event.target.style.display = "none";
    const placeholder = event.target.parentElement.querySelector(".thumbnail-placeholder");
    if (placeholder) {
      placeholder.style.display = "flex";
    }
  }
  static \u0275fac = function CourseListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CourseListComponent)(\u0275\u0275directiveInject(CourseService), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CourseListComponent, selectors: [["app-course-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 47, vars: 6, consts: [["noThumbnail", ""], [1, "container"], [1, "header"], ["mat-raised-button", "", "color", "primary", "routerLink", "add"], [1, "filter-card"], [1, "filters"], ["appearance", "outline"], ["matInput", "", "placeholder", "Search by title or description...", 3, "ngModelChange", "input", "ngModel"], ["matSuffix", ""], [3, "ngModelChange", "selectionChange", "ngModel"], ["value", ""], ["value", "beginner"], ["value", "intermediate"], ["value", "advanced"], ["value", "published"], ["value", "draft"], ["mat-icon-button", "", "matTooltip", "Clear all filters", 3, "click", "disabled"], ["class", "loading-container", 4, "ngIf"], [4, "ngIf"], [1, "loading-container"], ["class", "no-data", 4, "ngIf"], ["mat-table", "", "class", "full-width", 3, "dataSource", 4, "ngIf"], [1, "no-data"], ["mat-button", "", 3, "click"], ["mat-table", "", 1, "full-width", 3, "dataSource"], ["matColumnDef", "thumbnail"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "title"], ["matColumnDef", "description"], ["matColumnDef", "price"], ["matColumnDef", "difficultyLevel"], ["matColumnDef", "isPublished"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "course-row", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "thumbnail-cell"], ["class", "course-thumbnail", 3, "src", "alt", "error", 4, "ngIf", "ngIfElse"], [1, "course-thumbnail", 3, "error", "src", "alt"], [1, "thumbnail-placeholder"], [1, "course-title"], [1, "course-meta"], [1, "course-id"], [1, "description-cell", 3, "matTooltip"], [1, "price-cell"], ["class", "duration", 4, "ngIf"], [1, "duration"], [1, "difficulty-chip"], [1, "status-chip"], [1, "action-buttons"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Edit course", 3, "routerLink"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Delete course", 3, "click"], ["mat-header-row", ""], ["mat-row", "", 1, "course-row"]], template: function CourseListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1");
      \u0275\u0275text(3, "Course Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3)(5, "mat-icon");
      \u0275\u0275text(6, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Add Course ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card", 4)(9, "mat-card-header")(10, "mat-card-title");
      \u0275\u0275text(11, "Filters");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "mat-card-content")(13, "div", 5)(14, "mat-form-field", 6)(15, "mat-label");
      \u0275\u0275text(16, "Search courses");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function CourseListComponent_Template_input_ngModelChange_17_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("input", function CourseListComponent_Template_input_input_17_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "mat-icon", 8);
      \u0275\u0275text(19, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "mat-form-field", 6)(21, "mat-label");
      \u0275\u0275text(22, "Difficulty Level");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "mat-select", 9);
      \u0275\u0275twoWayListener("ngModelChange", function CourseListComponent_Template_mat_select_ngModelChange_23_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedDifficulty, $event) || (ctx.selectedDifficulty = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function CourseListComponent_Template_mat_select_selectionChange_23_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementStart(24, "mat-option", 10);
      \u0275\u0275text(25, "All");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "mat-option", 11);
      \u0275\u0275text(27, "Beginner");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "mat-option", 12);
      \u0275\u0275text(29, "Intermediate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "mat-option", 13);
      \u0275\u0275text(31, "Advanced");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "mat-form-field", 6)(33, "mat-label");
      \u0275\u0275text(34, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "mat-select", 9);
      \u0275\u0275twoWayListener("ngModelChange", function CourseListComponent_Template_mat_select_ngModelChange_35_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedStatus, $event) || (ctx.selectedStatus = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function CourseListComponent_Template_mat_select_selectionChange_35_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementStart(36, "mat-option", 10);
      \u0275\u0275text(37, "All");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "mat-option", 14);
      \u0275\u0275text(39, "Published");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "mat-option", 15);
      \u0275\u0275text(41, "Draft");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(42, "button", 16);
      \u0275\u0275listener("click", function CourseListComponent_Template_button_click_42_listener() {
        return ctx.clearFilters();
      });
      \u0275\u0275elementStart(43, "mat-icon");
      \u0275\u0275text(44, "clear");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275template(45, CourseListComponent_div_45_Template, 4, 0, "div", 17)(46, CourseListComponent_mat_card_46_Template, 7, 3, "mat-card", 18);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(17);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedDifficulty);
      \u0275\u0275advance(12);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedStatus);
      \u0275\u0275advance(7);
      \u0275\u0275property("disabled", !ctx.hasActiveFilters());
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    SlicePipe,
    CurrencyPipe,
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
    MatSuffix,
    MatInputModule,
    MatInput,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatChipsModule,
    MatChip,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatTooltipModule,
    MatTooltip,
    RouterLink,
    MatSnackBarModule
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n  font-size: 28px;\n  font-weight: 500;\n}\n.header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.filter-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.filters[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 40px;\n}\n.loading-container[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin: 0;\n}\n.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 20px;\n  opacity: 0.5;\n}\n.no-data[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  font-weight: 500;\n}\n.no-data[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.course-row[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.course-title[_ngcontent-%COMP%]   .course-meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  margin-top: 4px;\n}\n.description-cell[_ngcontent-%COMP%] {\n  max-width: 300px;\n  line-height: 1.4;\n}\n.thumbnail-cell[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.thumbnail-cell[_ngcontent-%COMP%]   .course-thumbnail[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  object-fit: cover;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  border: 1px solid #e0e0e0;\n}\n.thumbnail-cell[_ngcontent-%COMP%]   .thumbnail-placeholder[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  background-color: #f5f5f5;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #999;\n}\n.thumbnail-cell[_ngcontent-%COMP%]   .thumbnail-placeholder[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.price-cell[_ngcontent-%COMP%]   .duration[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  margin-top: 2px;\n}\n.difficulty-chip[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  min-height: 28px;\n}\n.difficulty-chip.difficulty-beginner[_ngcontent-%COMP%] {\n  background-color: #e8f5e8;\n  color: #2e7d32;\n}\n.difficulty-chip.difficulty-intermediate[_ngcontent-%COMP%] {\n  background-color: #fff3e0;\n  color: #f57c00;\n}\n.difficulty-chip.difficulty-advanced[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.status-chip[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  min-height: 28px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.status-chip.status-published[_ngcontent-%COMP%] {\n  background-color: #e8f5e8;\n  color: #2e7d32;\n}\n.status-chip.status-draft[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  color: #666;\n}\n.status-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n@media (max-width: 768px) {\n  .container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 16px;\n  }\n  .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .filters[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .filters[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n    min-width: auto;\n    width: 100%;\n  }\n  .description-cell[_ngcontent-%COMP%] {\n    max-width: 200px;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=course-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CourseListComponent, { className: "CourseListComponent", filePath: "src\\app\\pages\\courses\\course-list\\course-list.component.ts", lineNumber: 442 });
})();

// src/app/pages/courses/courses.routes.ts
var COURSES_ROUTES = [
  { path: "", component: CourseListComponent },
  { path: "add", component: AddCourseComponent },
  { path: "update/:id", component: UpdateCourseComponent }
];
export {
  COURSES_ROUTES
};
//# sourceMappingURL=chunk-S7YJU6R6.js.map
