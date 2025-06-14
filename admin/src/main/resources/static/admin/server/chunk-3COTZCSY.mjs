import './polyfills.server.mjs';
import {
  CategoryService
} from "./chunk-XIYEH7QB.mjs";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-ZCANCXWW.mjs";
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
  MatLabel
} from "./chunk-OKVPDLGM.mjs";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatOption,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  ɵNgNoValidate
} from "./chunk-FNH7JYNE.mjs";
import {
  CommonModule,
  NgForOf,
  NgIf,
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
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-NFLUKIXG.mjs";
import "./chunk-PTRYWQQD.mjs";

// src/app/pages/categories/category-form.component.ts
function CategoryFormComponent_mat_error_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Name is required ");
    \u0275\u0275elementEnd();
  }
}
function CategoryFormComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "img", 20);
    \u0275\u0275listener("error", function CategoryFormComponent_div_25_Template_img_error_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onImageError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 21);
    \u0275\u0275listener("click", function CategoryFormComponent_div_25_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.removeThumbnail());
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", (tmp_2_0 = ctx_r3.categoryForm.get("thumbnailUrl")) == null ? null : tmp_2_0.value, \u0275\u0275sanitizeUrl);
  }
}
function CategoryFormComponent_mat_option_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r5 = ctx.$implicit;
    \u0275\u0275property("value", category_r5.categoryId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r5.name, " ");
  }
}
var CategoryFormComponent = class _CategoryFormComponent {
  fb;
  categoryService;
  snackBar;
  dialogRef;
  data;
  categoryForm;
  editMode = false;
  availableParentCategories = [];
  constructor(fb, categoryService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.categoryService = categoryService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.editMode = !!data.category;
    this.availableParentCategories = data.categories.filter((c) => !this.editMode || c.categoryId !== data.category?.categoryId);
    this.categoryForm = this.fb.group({
      name: [data.category?.name || "", Validators.required],
      description: [data.category?.description || ""],
      thumbnailUrl: [data.category?.thumbnailUrl || ""],
      parentCategoryId: [data.category?.parentCategoryId || null]
    });
  }
  onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.categoryForm.patchValue({
          thumbnailUrl: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }
  onImageError(event) {
    console.error("Image failed to load:", event);
    this.snackBar.open("Failed to load image. Please check the URL.", "Close", {
      duration: 3e3
    });
  }
  removeThumbnail() {
    this.categoryForm.patchValue({
      thumbnailUrl: ""
    });
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      if (this.editMode) {
        this.categoryService.updateCategory(this.data.category.categoryId, categoryData).subscribe({
          next: () => {
            this.snackBar.open("Category updated successfully", "Close", {
              duration: 3e3
            });
            this.dialogRef.close(true);
          },
          error: () => {
            this.snackBar.open("Error updating category", "Close", {
              duration: 3e3
            });
          }
        });
      } else {
        this.categoryService.createCategory(categoryData).subscribe({
          next: () => {
            this.snackBar.open("Category created successfully", "Close", {
              duration: 3e3
            });
            this.dialogRef.close(true);
          },
          error: () => {
            this.snackBar.open("Error creating category", "Close", {
              duration: 3e3
            });
          }
        });
      }
    }
  }
  static \u0275fac = function CategoryFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoryFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(CategoryService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryFormComponent, selectors: [["app-category-form"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 38, vars: 8, consts: [["fileInput", ""], ["mat-dialog-title", ""], [3, "ngSubmit", "formGroup"], ["appearance", "fill", 1, "full-width"], ["matInput", "", "formControlName", "name", "required", ""], [4, "ngIf"], ["matInput", "", "formControlName", "description", "rows", "3"], [1, "thumbnail-section"], ["matInput", "", "formControlName", "thumbnailUrl", "placeholder", "Enter image URL or upload file"], [1, "file-upload-section"], ["type", "file", "accept", "image/*", 2, "display", "none", 3, "change"], ["mat-stroked-button", "", "type", "button", 3, "click"], ["class", "thumbnail-preview", 4, "ngIf"], ["formControlName", "parentCategoryId"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf"], [1, "button-container"], ["mat-button", "", "type", "button", "mat-dialog-close", ""], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], [1, "thumbnail-preview"], ["alt", "Thumbnail preview", 1, "preview-image", 3, "error", "src"], ["mat-icon-button", "", "type", "button", 1, "remove-thumbnail", 3, "click"]], template: function CategoryFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "h2", 1);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content")(3, "form", 2);
      \u0275\u0275listener("ngSubmit", function CategoryFormComponent_Template_form_ngSubmit_3_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSubmit());
      });
      \u0275\u0275elementStart(4, "mat-form-field", 3)(5, "mat-label");
      \u0275\u0275text(6, "Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(7, "input", 4);
      \u0275\u0275template(8, CategoryFormComponent_mat_error_8_Template, 2, 0, "mat-error", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "mat-form-field", 3)(10, "mat-label");
      \u0275\u0275text(11, "Description");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "textarea", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 7)(14, "mat-form-field", 3)(15, "mat-label");
      \u0275\u0275text(16, "Thumbnail URL");
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "input", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 9)(19, "input", 10, 0);
      \u0275\u0275listener("change", function CategoryFormComponent_Template_input_change_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFileSelected($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "button", 11);
      \u0275\u0275listener("click", function CategoryFormComponent_Template_button_click_21_listener() {
        \u0275\u0275restoreView(_r1);
        const fileInput_r2 = \u0275\u0275reference(20);
        return \u0275\u0275resetView(fileInput_r2.click());
      });
      \u0275\u0275elementStart(22, "mat-icon");
      \u0275\u0275text(23, "upload");
      \u0275\u0275elementEnd();
      \u0275\u0275text(24, " Upload Image ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(25, CategoryFormComponent_div_25_Template, 5, 1, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "mat-form-field", 3)(27, "mat-label");
      \u0275\u0275text(28, "Parent Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "mat-select", 13)(30, "mat-option", 14);
      \u0275\u0275text(31, "None");
      \u0275\u0275elementEnd();
      \u0275\u0275template(32, CategoryFormComponent_mat_option_32_Template, 2, 2, "mat-option", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "div", 16)(34, "button", 17);
      \u0275\u0275text(35, "Cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 18);
      \u0275\u0275text(37);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_4_0;
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("", ctx.editMode ? "Edit" : "Create", " Category");
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.categoryForm);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_3_0 = ctx.categoryForm.get("name")) == null ? null : tmp_3_0.hasError("required"));
      \u0275\u0275advance(17);
      \u0275\u0275property("ngIf", (tmp_4_0 = ctx.categoryForm.get("thumbnailUrl")) == null ? null : tmp_4_0.value);
      \u0275\u0275advance(5);
      \u0275\u0275property("value", null);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.availableParentCategories);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.categoryForm.invalid);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.editMode ? "Update" : "Create", " ");
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    RequiredValidator,
    FormGroupDirective,
    FormControlName,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInputModule,
    MatInput,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatDialogModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatSnackBarModule,
    MatIconModule,
    MatIcon
  ], styles: ["\n\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 15px;\n}\n.button-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 16px;\n}\n.thumbnail-section[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  padding: 16px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  background-color: #fafafa;\n}\n.file-upload-section[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n.thumbnail-preview[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  margin-top: 12px;\n}\n.preview-image[_ngcontent-%COMP%] {\n  max-width: 200px;\n  max-height: 150px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  object-fit: cover;\n}\n.remove-thumbnail[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  background-color: #f44336;\n  color: white;\n}\n.remove-thumbnail[_ngcontent-%COMP%]:hover {\n  background-color: #d32f2f;\n}\n/*# sourceMappingURL=category-form.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryFormComponent, { className: "CategoryFormComponent", filePath: "src\\app\\pages\\categories\\category-form.component.ts", lineNumber: 135 });
})();

// src/app/pages/categories/category-list.component.ts
function CategoryListComponent_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "Thumbnail");
    \u0275\u0275elementEnd();
  }
}
function CategoryListComponent_td_11_img_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 18);
    \u0275\u0275listener("error", function CategoryListComponent_td_11_img_2_Template_img_error_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onImageError($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", category_r3.thumbnailUrl, \u0275\u0275sanitizeUrl)("alt", category_r3.name + " thumbnail");
  }
}
function CategoryListComponent_td_11_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "mat-icon");
    \u0275\u0275text(2, "image");
    \u0275\u0275elementEnd()();
  }
}
function CategoryListComponent_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14)(1, "div", 15);
    \u0275\u0275template(2, CategoryListComponent_td_11_img_2_Template, 1, 2, "img", 16)(3, CategoryListComponent_td_11_div_3_Template, 3, 0, "div", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const category_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", category_r3.thumbnailUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !category_r3.thumbnailUrl);
  }
}
function CategoryListComponent_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "Name");
    \u0275\u0275elementEnd();
  }
}
function CategoryListComponent_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(category_r4.name);
  }
}
function CategoryListComponent_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "Description");
    \u0275\u0275elementEnd();
  }
}
function CategoryListComponent_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(category_r5.description);
  }
}
function CategoryListComponent_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "Parent Category");
    \u0275\u0275elementEnd();
  }
}
function CategoryListComponent_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(category_r6.parentCategoryName || "-");
  }
}
function CategoryListComponent_th_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function CategoryListComponent_td_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 14)(1, "button", 20);
    \u0275\u0275listener("click", function CategoryListComponent_td_23_Template_button_click_1_listener() {
      const category_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editCategory(category_r8));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 21);
    \u0275\u0275listener("click", function CategoryListComponent_td_23_Template_button_click_4_listener() {
      const category_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteCategory(category_r8));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function CategoryListComponent_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 22);
  }
}
function CategoryListComponent_tr_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 23);
  }
}
var CategoryListComponent = class _CategoryListComponent {
  categoryService;
  dialog;
  snackBar;
  categories = [];
  displayedColumns = ["thumbnail", "name", "description", "parentCategory", "actions"];
  constructor(categoryService, dialog, snackBar) {
    this.categoryService = categoryService;
    this.dialog = dialog;
    this.snackBar = snackBar;
  }
  ngOnInit() {
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  openCategoryForm(category) {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: "500px",
      data: { category, categories: this.categories }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCategories();
      }
    });
  }
  editCategory(category) {
    this.openCategoryForm(category);
  }
  deleteCategory(category) {
    if (confirm("Are you sure you want to delete this category?")) {
      this.categoryService.deleteCategory(category.categoryId).subscribe({
        next: () => {
          this.loadCategories();
          this.snackBar.open("Category deleted successfully", "Close", {
            duration: 3e3
          });
        },
        error: () => {
          this.snackBar.open("Error deleting category", "Close", {
            duration: 3e3
          });
        }
      });
    }
  }
  onImageError(event) {
    event.target.style.display = "none";
    const parent = event.target.parentNode;
    if (parent && !parent.querySelector(".no-thumbnail")) {
      const placeholder = document.createElement("div");
      placeholder.className = "no-thumbnail";
      placeholder.innerHTML = "<mat-icon>broken_image</mat-icon>";
      parent.appendChild(placeholder);
    }
  }
  static \u0275fac = function CategoryListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoryListComponent)(\u0275\u0275directiveInject(CategoryService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryListComponent, selectors: [["app-category-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 26, vars: 3, consts: [[1, "container"], [1, "header"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-table", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "thumbnail"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "description"], ["matColumnDef", "parentCategory"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "thumbnail-cell"], ["class", "category-thumbnail", 3, "src", "alt", "error", 4, "ngIf"], ["class", "no-thumbnail", 4, "ngIf"], [1, "category-thumbnail", 3, "error", "src", "alt"], [1, "no-thumbnail"], ["mat-icon-button", "", "color", "primary", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function CategoryListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Categories");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function CategoryListComponent_Template_button_click_4_listener() {
        return ctx.openCategoryForm();
      });
      \u0275\u0275elementStart(5, "mat-icon");
      \u0275\u0275text(6, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Add Category ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "table", 3);
      \u0275\u0275elementContainerStart(9, 4);
      \u0275\u0275template(10, CategoryListComponent_th_10_Template, 2, 0, "th", 5)(11, CategoryListComponent_td_11_Template, 4, 2, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(12, 7);
      \u0275\u0275template(13, CategoryListComponent_th_13_Template, 2, 0, "th", 5)(14, CategoryListComponent_td_14_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(15, 8);
      \u0275\u0275template(16, CategoryListComponent_th_16_Template, 2, 0, "th", 5)(17, CategoryListComponent_td_17_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(18, 9);
      \u0275\u0275template(19, CategoryListComponent_th_19_Template, 2, 0, "th", 5)(20, CategoryListComponent_td_20_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(21, 10);
      \u0275\u0275template(22, CategoryListComponent_th_22_Template, 2, 0, "th", 5)(23, CategoryListComponent_td_23_Template, 7, 0, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(24, CategoryListComponent_tr_24_Template, 1, 0, "tr", 11)(25, CategoryListComponent_tr_25_Template, 1, 0, "tr", 12);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("dataSource", ctx.categories);
      \u0275\u0275advance(16);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
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
    MatDialogModule,
    MatSnackBarModule
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.thumbnail-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 60px;\n  height: 60px;\n}\n.category-thumbnail[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  object-fit: cover;\n  border-radius: 4px;\n  border: 1px solid #ddd;\n}\n.no-thumbnail[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #f5f5f5;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  color: #999;\n}\n/*# sourceMappingURL=category-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryListComponent, { className: "CategoryListComponent", filePath: "src\\app\\pages\\categories\\category-list.component.ts", lineNumber: 117 });
})();

// src/app/pages/categories/categories.routes.ts
var CATEGORY_ROUTES = [
  {
    path: "",
    component: CategoryListComponent
  }
];
export {
  CATEGORY_ROUTES
};
//# sourceMappingURL=chunk-3COTZCSY.mjs.map
