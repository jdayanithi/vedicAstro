import './polyfills.server.mjs';
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-T4K4PR5F.mjs";
import {
  TagService
} from "./chunk-STPSP5KC.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-3NCYDLW6.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-MFOFOUUF.mjs";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-ZFEZQRSD.mjs";
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
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  ɵNgNoValidate
} from "./chunk-FNH7JYNE.mjs";
import {
  CommonModule,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-NFLUKIXG.mjs";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-PTRYWQQD.mjs";

// src/app/pages/tags/tag-form.component.ts
function TagFormComponent_mat_error_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Tag name is required ");
    \u0275\u0275elementEnd();
  }
}
var TagFormComponent = class _TagFormComponent {
  fb;
  tagService;
  snackBar;
  dialogRef;
  data;
  tagForm;
  editMode = false;
  isLoading = false;
  constructor(fb, tagService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.tagService = tagService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.editMode = !!data?.tag;
    this.tagForm = this.createForm();
    if (this.editMode && data.tag) {
      this.populateForm(data.tag);
    }
  }
  createForm() {
    return this.fb.group({
      tagName: ["", [Validators.required, Validators.minLength(2)]],
      description: [""],
      statusFlag: [true]
    });
  }
  populateForm(tag) {
    console.log("Populating form with tag data:", tag);
    this.tagForm.patchValue({
      tagName: tag.tagName,
      description: tag.description || "",
      statusFlag: tag.statusFlag !== void 0 ? tag.statusFlag : true
    });
    console.log("Form values after population:", this.tagForm.value);
  }
  onSubmit() {
    if (this.tagForm.valid && !this.isLoading) {
      this.isLoading = true;
      const formValue = this.tagForm.value;
      console.log("Form submission - form value:", formValue);
      const tagData = {
        tagName: formValue.tagName,
        description: formValue.description,
        statusFlag: formValue.statusFlag
      };
      console.log("Form submission - tag data being sent:", tagData);
      if (this.editMode && this.data.tag) {
        tagData.tagId = this.data.tag.tagId;
        this.updateTag(tagData);
      } else {
        this.createTag(tagData);
      }
    } else {
      console.log("Form is invalid or loading:", {
        valid: this.tagForm.valid,
        loading: this.isLoading,
        formErrors: this.tagForm.errors,
        formValue: this.tagForm.value
      });
    }
  }
  createTag(tag) {
    console.log("Creating tag with data:", tag);
    this.tagService.createTag(tag).subscribe({
      next: (result) => {
        console.log("Tag created successfully:", result);
        this.snackBar.open("Tag created successfully", "Close", { duration: 3e3 });
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error("Error creating tag:", error);
        this.snackBar.open("Error creating tag", "Close", { duration: 3e3 });
        this.isLoading = false;
      }
    });
  }
  updateTag(tag) {
    console.log("Updating tag with data:", tag);
    this.tagService.updateTag(tag.tagId, tag).subscribe({
      next: (result) => {
        console.log("Tag updated successfully:", result);
        this.snackBar.open("Tag updated successfully", "Close", { duration: 3e3 });
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error("Error updating tag:", error);
        this.snackBar.open("Error updating tag", "Close", { duration: 3e3 });
        this.isLoading = false;
      }
    });
  }
  static \u0275fac = function TagFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TagFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(TagService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TagFormComponent, selectors: [["app-tag-form"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 21, vars: 5, consts: [["mat-dialog-title", ""], [3, "ngSubmit", "formGroup"], ["appearance", "fill", 1, "full-width"], ["matInput", "", "formControlName", "tagName", "required", ""], [4, "ngIf"], ["matInput", "", "formControlName", "description", "rows", "3"], [1, "status-toggle"], ["formControlName", "statusFlag"], [1, "button-container"], ["mat-button", "", "type", "button", "mat-dialog-close", ""], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"]], template: function TagFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content")(3, "form", 1);
      \u0275\u0275listener("ngSubmit", function TagFormComponent_Template_form_ngSubmit_3_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(4, "mat-form-field", 2)(5, "mat-label");
      \u0275\u0275text(6, "Tag Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(7, "input", 3);
      \u0275\u0275template(8, TagFormComponent_mat_error_8_Template, 2, 0, "mat-error", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "mat-form-field", 2)(10, "mat-label");
      \u0275\u0275text(11, "Description");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "textarea", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 6)(14, "mat-slide-toggle", 7);
      \u0275\u0275text(15, " Enable Tag ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 8)(17, "button", 9);
      \u0275\u0275text(18, "Cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "button", 10);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("", ctx.editMode ? "Edit" : "Create", " Tag");
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.tagForm);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_2_0 = ctx.tagForm.get("tagName")) == null ? null : tmp_2_0.hasError("required"));
      \u0275\u0275advance(11);
      \u0275\u0275property("disabled", ctx.tagForm.invalid || ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isLoading ? "Saving..." : ctx.editMode ? "Update" : "Create", " ");
    }
  }, dependencies: [
    CommonModule,
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
    MatButtonModule,
    MatButton,
    MatDialogModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSlideToggle
  ], styles: ["\n\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 15px;\n}\n.status-toggle[_ngcontent-%COMP%] {\n  margin: 16px 0;\n}\n.button-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 16px;\n}\nmat-dialog-content[_ngcontent-%COMP%] {\n  min-width: 400px;\n  max-width: 500px;\n}\n/*# sourceMappingURL=tag-form.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TagFormComponent, { className: "TagFormComponent", filePath: "src\\app\\pages\\tags\\tag-form.component.ts", lineNumber: 79 });
})();

// src/app/pages/tags/tags-page.component.ts
function TagsPageComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "mat-spinner", 10);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading tags...");
    \u0275\u0275elementEnd()();
  }
}
function TagsPageComponent_table_18_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, " Name ");
    \u0275\u0275elementEnd();
  }
}
function TagsPageComponent_table_18_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tag_r1.tagName, " ");
  }
}
function TagsPageComponent_table_18_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, " Description ");
    \u0275\u0275elementEnd();
  }
}
function TagsPageComponent_table_18_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tag_r2.description || "-", " ");
  }
}
function TagsPageComponent_table_18_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, " Status ");
    \u0275\u0275elementEnd();
  }
}
function TagsPageComponent_table_18_td_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 21)(1, "mat-slide-toggle", 22);
    \u0275\u0275listener("change", function TagsPageComponent_table_18_td_9_Template_mat_slide_toggle_change_1_listener($event) {
      const tag_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.toggleTagStatus(tag_r4, $event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tag_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("checked", tag_r4.statusFlag !== false);
  }
}
function TagsPageComponent_table_18_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, " Actions ");
    \u0275\u0275elementEnd();
  }
}
function TagsPageComponent_table_18_td_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 21)(1, "button", 23);
    \u0275\u0275listener("click", function TagsPageComponent_table_18_td_12_Template_button_click_1_listener() {
      const tag_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.editTag(tag_r7));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 24);
    \u0275\u0275listener("click", function TagsPageComponent_table_18_td_12_Template_button_click_4_listener() {
      const tag_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.deleteTag(tag_r7));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function TagsPageComponent_table_18_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 25);
  }
}
function TagsPageComponent_table_18_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 26);
  }
}
function TagsPageComponent_table_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 11);
    \u0275\u0275elementContainerStart(1, 12);
    \u0275\u0275template(2, TagsPageComponent_table_18_th_2_Template, 2, 0, "th", 13)(3, TagsPageComponent_table_18_td_3_Template, 2, 1, "td", 14);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 15);
    \u0275\u0275template(5, TagsPageComponent_table_18_th_5_Template, 2, 0, "th", 13)(6, TagsPageComponent_table_18_td_6_Template, 2, 1, "td", 14);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 16);
    \u0275\u0275template(8, TagsPageComponent_table_18_th_8_Template, 2, 0, "th", 13)(9, TagsPageComponent_table_18_td_9_Template, 2, 1, "td", 14);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 17);
    \u0275\u0275template(11, TagsPageComponent_table_18_th_11_Template, 2, 0, "th", 13)(12, TagsPageComponent_table_18_td_12_Template, 7, 0, "td", 14);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(13, TagsPageComponent_table_18_tr_13_Template, 1, 0, "tr", 18)(14, TagsPageComponent_table_18_tr_14_Template, 1, 0, "tr", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r4.tags);
    \u0275\u0275advance(13);
    \u0275\u0275property("matHeaderRowDef", ctx_r4.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r4.displayedColumns);
  }
}
function TagsPageComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "mat-icon");
    \u0275\u0275text(2, "local_offer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No tags found.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 4);
    \u0275\u0275listener("click", function TagsPageComponent_div_19_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.openTagForm());
    });
    \u0275\u0275text(6, " Create First Tag ");
    \u0275\u0275elementEnd()();
  }
}
var TagsPageComponent = class _TagsPageComponent {
  tagService;
  snackBar;
  dialog;
  tags = [];
  displayedColumns = ["tagName", "description", "statusFlag", "actions"];
  isLoading = false;
  constructor(tagService, snackBar, dialog) {
    this.tagService = tagService;
    this.snackBar = snackBar;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.loadTags();
  }
  loadTags() {
    this.isLoading = true;
    this.tagService.getTags().subscribe({
      next: (tags) => {
        this.tags = tags;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error loading tags:", error);
        this.snackBar.open("Error loading tags", "Close", { duration: 3e3 });
        this.isLoading = false;
      }
    });
  }
  openTagForm(tag) {
    const dialogRef = this.dialog.open(TagFormComponent, {
      width: "500px",
      data: { tag }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTags();
      }
    });
  }
  editTag(tag) {
    this.openTagForm(tag);
  }
  toggleTagStatus(tag, event) {
    const newStatus = event.checked;
    const updatedTag = __spreadProps(__spreadValues({}, tag), { statusFlag: newStatus });
    this.tagService.updateTag(tag.tagId, updatedTag).subscribe({
      next: () => {
        this.snackBar.open(`Tag ${newStatus ? "enabled" : "disabled"}`, "Close", { duration: 2e3 });
        this.loadTags();
      },
      error: (error) => {
        console.error("Error updating tag status:", error);
        this.snackBar.open("Error updating tag status", "Close", { duration: 3e3 });
        this.loadTags();
      }
    });
  }
  deleteTag(tag) {
    if (confirm(`Are you sure you want to delete the tag "${tag.tagName}"?`)) {
      this.tagService.deleteTag(tag.tagId).subscribe({
        next: () => {
          this.snackBar.open("Tag deleted successfully", "Close", { duration: 3e3 });
          this.loadTags();
        },
        error: (error) => {
          console.error("Error deleting tag:", error);
          this.snackBar.open("Error deleting tag", "Close", { duration: 3e3 });
        }
      });
    }
  }
  static \u0275fac = function TagsPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TagsPageComponent)(\u0275\u0275directiveInject(TagService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TagsPageComponent, selectors: [["app-tags-page"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 20, vars: 4, consts: [[1, "container"], [1, "header-content"], [1, "header-actions"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Refresh tags", 3, "click", "disabled"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "table-container"], ["class", "loading-container", 4, "ngIf"], ["mat-table", "", "class", "mat-elevation-z2", 3, "dataSource", 4, "ngIf"], ["class", "no-data", 4, "ngIf"], [1, "loading-container"], ["diameter", "50"], ["mat-table", "", 1, "mat-elevation-z2", 3, "dataSource"], ["matColumnDef", "tagName"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "description"], ["matColumnDef", "statusFlag"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [3, "change", "checked"], ["mat-icon-button", "", "aria-label", "Edit", 3, "click"], ["mat-icon-button", "", "aria-label", "Delete", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "no-data"]], template: function TagsPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title")(4, "div", 1)(5, "h2");
      \u0275\u0275text(6, "Manage Tags");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 2)(8, "button", 3);
      \u0275\u0275listener("click", function TagsPageComponent_Template_button_click_8_listener() {
        return ctx.loadTags();
      });
      \u0275\u0275elementStart(9, "mat-icon");
      \u0275\u0275text(10, "refresh");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "button", 4);
      \u0275\u0275listener("click", function TagsPageComponent_Template_button_click_11_listener() {
        return ctx.openTagForm();
      });
      \u0275\u0275elementStart(12, "mat-icon");
      \u0275\u0275text(13, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(14, " Add New Tag ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(15, "mat-card-content")(16, "div", 5);
      \u0275\u0275template(17, TagsPageComponent_div_17_Template, 4, 0, "div", 6)(18, TagsPageComponent_table_18_Template, 15, 3, "table", 7)(19, TagsPageComponent_div_19_Template, 7, 0, "div", 8);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("disabled", ctx.isLoading);
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.tags.length === 0);
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
    MatSnackBarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSlideToggle,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatTooltipModule,
    MatTooltip,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n}\n.header-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.table-container[_ngcontent-%COMP%] {\n  width: 100%;\n  overflow-x: auto;\n  margin-top: 20px;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  text-align: center;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  text-align: center;\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  height: 48px;\n  width: 48px;\n  margin-bottom: 16px;\n  opacity: 0.6;\n}\n.no-data[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  font-size: 16px;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\nth.mat-header-cell[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n}\n.mat-mdc-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n.mat-mdc-table[_ngcontent-%COMP%] {\n  width: 100%;\n  background: white;\n}\n/*# sourceMappingURL=tags-page.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TagsPageComponent, { className: "TagsPageComponent", filePath: "src\\app\\pages\\tags\\tags-page.component.ts", lineNumber: 187 });
})();

// src/app/pages/tags/tags.routes.ts
var TAGS_ROUTES = [
  { path: "", component: TagsPageComponent }
];
export {
  TAGS_ROUTES
};
//# sourceMappingURL=chunk-IP2HDYSS.mjs.map
