import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-L35BBACC.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-ZWSL26NP.js";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-V3YO3QG2.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-256D732O.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-CPKJDMHJ.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-VKZGNGI5.js";
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
  CommonModule,
  DatePipe,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  HttpClient,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatNativeDateModule,
  MatOption,
  NgControlStatus,
  NgControlStatusGroup,
  NgIf,
  NumberValueAccessor,
  ReactiveFormsModule,
  RequiredValidator,
  SlicePipe,
  Validators,
  environment,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-LRGABPEH.js";
import "./chunk-4MWRP73S.js";

// src/app/services/notification.service.ts
var NotificationService = class _NotificationService {
  http;
  apiUrl = `${environment.apiUrl}/notifications`;
  constructor(http) {
    this.http = http;
  }
  getNotifications() {
    return this.http.get(this.apiUrl);
  }
  getNotificationById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  getNotificationsByLoginId(loginId) {
    return this.http.get(`${this.apiUrl}/user/${loginId}`);
  }
  createNotification(notification) {
    return this.http.post(this.apiUrl, notification);
  }
  updateNotification(id, notification) {
    return this.http.put(`${this.apiUrl}/${id}`, notification);
  }
  deleteNotification(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  static \u0275fac = function NotificationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotificationService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
};

// src/app/pages/notifications/notification-form.component.ts
function NotificationFormComponent_mat_form_field_7_mat_error_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Login ID is required for specific user notifications ");
    \u0275\u0275elementEnd();
  }
}
function NotificationFormComponent_mat_form_field_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 7)(1, "mat-label");
    \u0275\u0275text(2, "Login ID");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 22);
    \u0275\u0275template(4, NotificationFormComponent_mat_form_field_7_mat_error_4_Template, 2, 0, "mat-error", 9);
    \u0275\u0275elementStart(5, "mat-hint");
    \u0275\u0275text(6, "Leave empty and check broadcast above to send to all users");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.notificationForm.get("loginId")) == null ? null : tmp_3_0.hasError("required"));
  }
}
function NotificationFormComponent_mat_error_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Title is required ");
    \u0275\u0275elementEnd();
  }
}
function NotificationFormComponent_mat_error_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Message is required ");
    \u0275\u0275elementEnd();
  }
}
function NotificationFormComponent_mat_error_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Notification type is required ");
    \u0275\u0275elementEnd();
  }
}
var NotificationFormComponent = class _NotificationFormComponent {
  fb;
  notificationService;
  snackBar;
  dialogRef;
  data;
  notificationForm;
  editMode = false;
  isLoading = false;
  constructor(fb, notificationService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.notificationService = notificationService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.editMode = !!data?.notification;
    this.notificationForm = this.createForm();
    if (this.editMode && data.notification) {
      this.populateForm(data.notification);
    }
  }
  createForm() {
    return this.fb.group({
      isBroadcast: [false],
      loginId: [""],
      title: ["", [Validators.required, Validators.minLength(3)]],
      message: ["", [Validators.required, Validators.minLength(10)]],
      notificationType: ["push", Validators.required],
      startDate: [""],
      expiryDate: [""],
      isRead: [false]
    });
  }
  onBroadcastChange() {
    const isBroadcast = this.notificationForm.get("isBroadcast")?.value;
    const loginIdControl = this.notificationForm.get("loginId");
    if (isBroadcast) {
      loginIdControl?.setValue("");
      loginIdControl?.clearValidators();
    } else {
      loginIdControl?.setValidators([Validators.required, Validators.min(1)]);
    }
    loginIdControl?.updateValueAndValidity();
  }
  populateForm(notification) {
    this.notificationForm.patchValue({
      isBroadcast: notification.isBroadcast || false,
      loginId: notification.loginId,
      title: notification.title,
      message: notification.message,
      notificationType: notification.notificationType || "push",
      startDate: notification.startDate ? new Date(notification.startDate) : "",
      expiryDate: notification.expiryDate ? new Date(notification.expiryDate) : "",
      isRead: notification.isRead || false
    });
    this.onBroadcastChange();
  }
  onSubmit() {
    if (this.notificationForm.valid && !this.isLoading) {
      this.isLoading = true;
      const formValue = this.notificationForm.value;
      const notificationData = {
        isBroadcast: formValue.isBroadcast,
        loginId: formValue.isBroadcast ? void 0 : formValue.loginId,
        title: formValue.title,
        message: formValue.message,
        notificationType: formValue.notificationType,
        startDate: formValue.startDate ? formValue.startDate.toISOString().split("T")[0] : void 0,
        expiryDate: formValue.expiryDate ? formValue.expiryDate.toISOString().split("T")[0] : void 0,
        isRead: formValue.isRead
      };
      if (this.editMode && this.data.notification) {
        notificationData.notificationId = this.data.notification.notificationId;
        this.updateNotification(notificationData);
      } else {
        this.createNotification(notificationData);
      }
    }
  }
  createNotification(notification) {
    this.notificationService.createNotification(notification).subscribe({
      next: (result) => {
        this.snackBar.open("Notification created successfully", "Close", { duration: 3e3 });
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error("Error creating notification:", error);
        this.snackBar.open("Error creating notification", "Close", { duration: 3e3 });
        this.isLoading = false;
      }
    });
  }
  updateNotification(notification) {
    this.notificationService.updateNotification(notification.notificationId, notification).subscribe({
      next: (result) => {
        this.snackBar.open("Notification updated successfully", "Close", { duration: 3e3 });
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error("Error updating notification:", error);
        this.snackBar.open("Error updating notification", "Close", { duration: 3e3 });
        this.isLoading = false;
      }
    });
  }
  static \u0275fac = function NotificationFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotificationFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationFormComponent, selectors: [["app-notification-form"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 53, vars: 12, consts: [["startPicker", ""], ["expiryPicker", ""], ["mat-dialog-title", ""], [3, "ngSubmit", "formGroup"], [1, "broadcast-toggle"], ["formControlName", "isBroadcast", 3, "change"], ["appearance", "fill", "class", "full-width", 4, "ngIf"], ["appearance", "fill", 1, "full-width"], ["matInput", "", "formControlName", "title", "required", ""], [4, "ngIf"], ["matInput", "", "formControlName", "message", "rows", "4", "required", ""], ["formControlName", "notificationType", "required", ""], ["value", "push"], ["value", "email"], ["matInput", "", "formControlName", "startDate", 3, "matDatepicker"], ["matSuffix", "", 3, "for"], ["matInput", "", "formControlName", "expiryDate", 3, "matDatepicker"], [1, "checkbox-container"], ["formControlName", "isRead"], [1, "button-container"], ["mat-button", "", "type", "button", "mat-dialog-close", ""], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["matInput", "", "formControlName", "loginId", "type", "number"]], template: function NotificationFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "h2", 2);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content")(3, "form", 3);
      \u0275\u0275listener("ngSubmit", function NotificationFormComponent_Template_form_ngSubmit_3_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSubmit());
      });
      \u0275\u0275elementStart(4, "div", 4)(5, "mat-checkbox", 5);
      \u0275\u0275listener("change", function NotificationFormComponent_Template_mat_checkbox_change_5_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onBroadcastChange());
      });
      \u0275\u0275text(6, " Send to All Users (Broadcast) ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(7, NotificationFormComponent_mat_form_field_7_Template, 7, 1, "mat-form-field", 6);
      \u0275\u0275elementStart(8, "mat-form-field", 7)(9, "mat-label");
      \u0275\u0275text(10, "Title");
      \u0275\u0275elementEnd();
      \u0275\u0275element(11, "input", 8);
      \u0275\u0275template(12, NotificationFormComponent_mat_error_12_Template, 2, 0, "mat-error", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "mat-form-field", 7)(14, "mat-label");
      \u0275\u0275text(15, "Message");
      \u0275\u0275elementEnd();
      \u0275\u0275element(16, "textarea", 10);
      \u0275\u0275template(17, NotificationFormComponent_mat_error_17_Template, 2, 0, "mat-error", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "mat-form-field", 7)(19, "mat-label");
      \u0275\u0275text(20, "Notification Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-select", 11)(22, "mat-option", 12);
      \u0275\u0275text(23, "Push Notification");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "mat-option", 13);
      \u0275\u0275text(25, "Email");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(26, NotificationFormComponent_mat_error_26_Template, 2, 0, "mat-error", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "mat-form-field", 7)(28, "mat-label");
      \u0275\u0275text(29, "Start Date");
      \u0275\u0275elementEnd();
      \u0275\u0275element(30, "input", 14);
      \u0275\u0275elementStart(31, "mat-hint");
      \u0275\u0275text(32, "Leave empty for immediate delivery");
      \u0275\u0275elementEnd();
      \u0275\u0275element(33, "mat-datepicker-toggle", 15)(34, "mat-datepicker", null, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "mat-form-field", 7)(37, "mat-label");
      \u0275\u0275text(38, "Expiry Date");
      \u0275\u0275elementEnd();
      \u0275\u0275element(39, "input", 16);
      \u0275\u0275elementStart(40, "mat-hint");
      \u0275\u0275text(41, "Leave empty for no expiry");
      \u0275\u0275elementEnd();
      \u0275\u0275element(42, "mat-datepicker-toggle", 15)(43, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 17)(46, "mat-checkbox", 18);
      \u0275\u0275text(47, "Mark as Read");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "div", 19)(49, "button", 20);
      \u0275\u0275text(50, "Cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "button", 21);
      \u0275\u0275text(52);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      const startPicker_r3 = \u0275\u0275reference(35);
      const expiryPicker_r4 = \u0275\u0275reference(44);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("", ctx.editMode ? "Edit" : "Create", " Notification");
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.notificationForm);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", !((tmp_4_0 = ctx.notificationForm.get("isBroadcast")) == null ? null : tmp_4_0.value));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_5_0 = ctx.notificationForm.get("title")) == null ? null : tmp_5_0.hasError("required"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_6_0 = ctx.notificationForm.get("message")) == null ? null : tmp_6_0.hasError("required"));
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", (tmp_7_0 = ctx.notificationForm.get("notificationType")) == null ? null : tmp_7_0.hasError("required"));
      \u0275\u0275advance(4);
      \u0275\u0275property("matDatepicker", startPicker_r3);
      \u0275\u0275advance(3);
      \u0275\u0275property("for", startPicker_r3);
      \u0275\u0275advance(6);
      \u0275\u0275property("matDatepicker", expiryPicker_r4);
      \u0275\u0275advance(3);
      \u0275\u0275property("for", expiryPicker_r4);
      \u0275\u0275advance(9);
      \u0275\u0275property("disabled", ctx.notificationForm.invalid || ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isLoading ? "Saving..." : ctx.editMode ? "Update" : "Create", " ");
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    RequiredValidator,
    FormGroupDirective,
    FormControlName,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatHint,
    MatError,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatButtonModule,
    MatButton,
    MatDialogModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatSnackBarModule,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatCheckboxModule,
    MatCheckbox
  ], styles: ["\n\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 15px;\n}\n.checkbox-container[_ngcontent-%COMP%] {\n  margin: 16px 0;\n}\n.button-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 16px;\n}\n.broadcast-toggle[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  padding: 12px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n}\nmat-dialog-content[_ngcontent-%COMP%] {\n  min-width: 500px;\n  max-width: 600px;\n}\n/*# sourceMappingURL=notification-form.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationFormComponent, { className: "NotificationFormComponent", filePath: "src\\app\\pages\\notifications\\notification-form.component.ts", lineNumber: 134 });
})();

// src/app/pages/notifications/notifications-page.component.ts
function NotificationsPageComponent_div_16_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, " Login ID ");
    \u0275\u0275elementEnd();
  }
}
function NotificationsPageComponent_div_16_td_4_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notification_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(notification_r1.loginId);
  }
}
function NotificationsPageComponent_div_16_td_4_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "All Users");
    \u0275\u0275elementEnd();
  }
}
function NotificationsPageComponent_div_16_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275template(1, NotificationsPageComponent_div_16_td_4_span_1_Template, 2, 1, "span", 25)(2, NotificationsPageComponent_div_16_td_4_span_2_Template, 2, 0, "span", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notification_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !notification_r1.isBroadcast);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", notification_r1.isBroadcast);
  }
}
function NotificationsPageComponent_div_16_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, " Broadcast ");
    \u0275\u0275elementEnd();
  }
}
function NotificationsPageComponent_div_16_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24)(1, "span", 28);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const notification_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("is-broadcast", notification_r2.isBroadcast)("not-broadcast", !notification_r2.isBroadcast);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", notification_r2.isBroadcast ? "Yes" : "No", " ");
  }
}
function NotificationsPageComponent_div_16_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, " Title ");
    \u0275\u0275elementEnd();
  }
}
function NotificationsPageComponent_div_16_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notification_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", notification_r3.title, " ");
  }
}
function NotificationsPageComponent_div_16_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, " Message ");
    \u0275\u0275elementEnd();
  }
}
function NotificationsPageComponent_div_16_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24)(1, "span", 29);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "slice");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const notification_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", notification_r4.message);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind3(3, 3, notification_r4.message, 0, 50), "", notification_r4.message.length > 50 ? "..." : "", " ");
  }
}
function NotificationsPageComponent_div_16_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, " Type ");
    \u0275\u0275elementEnd();
  }
}
function NotificationsPageComponent_div_16_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24)(1, "span", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const notification_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("type-push", notification_r5.notificationType === "push")("type-email", notification_r5.notificationType === "email");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", notification_r5.notificationType || "push", " ");
  }
}
function NotificationsPageComponent_div_16_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, " Start Date ");
    \u0275\u0275elementEnd();
  }
}
function NotificationsPageComponent_div_16_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notification_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", notification_r6.startDate ? \u0275\u0275pipeBind2(2, 1, notification_r6.startDate, "short") : "Immediate", " ");
  }
}
function NotificationsPageComponent_div_16_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, " Expiry Date ");
    \u0275\u0275elementEnd();
  }
}
function NotificationsPageComponent_div_16_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notification_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", notification_r7.expiryDate ? \u0275\u0275pipeBind2(2, 1, notification_r7.expiryDate, "short") : "No expiry", " ");
  }
}
function NotificationsPageComponent_div_16_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, " Status ");
    \u0275\u0275elementEnd();
  }
}
function NotificationsPageComponent_div_16_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24)(1, "span", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const notification_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("read", notification_r8.isRead)("unread", !notification_r8.isRead);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", notification_r8.isRead ? "Read" : "Unread", " ");
  }
}
function NotificationsPageComponent_div_16_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, " Actions ");
    \u0275\u0275elementEnd();
  }
}
function NotificationsPageComponent_div_16_td_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 24)(1, "button", 32);
    \u0275\u0275listener("click", function NotificationsPageComponent_div_16_td_28_Template_button_click_1_listener() {
      const notification_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r10 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r10.openNotificationForm(notification_r10));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 33);
    \u0275\u0275listener("click", function NotificationsPageComponent_div_16_td_28_Template_button_click_4_listener() {
      const notification_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r10 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r10.deleteNotification(notification_r10));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function NotificationsPageComponent_div_16_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 34);
  }
}
function NotificationsPageComponent_div_16_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 35);
  }
}
function NotificationsPageComponent_div_16_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "mat-icon");
    \u0275\u0275text(2, "notifications_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No notifications found.");
    \u0275\u0275elementEnd()();
  }
}
function NotificationsPageComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "table", 8);
    \u0275\u0275elementContainerStart(2, 9);
    \u0275\u0275template(3, NotificationsPageComponent_div_16_th_3_Template, 2, 0, "th", 10)(4, NotificationsPageComponent_div_16_td_4_Template, 3, 2, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 12);
    \u0275\u0275template(6, NotificationsPageComponent_div_16_th_6_Template, 2, 0, "th", 10)(7, NotificationsPageComponent_div_16_td_7_Template, 3, 5, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 13);
    \u0275\u0275template(9, NotificationsPageComponent_div_16_th_9_Template, 2, 0, "th", 10)(10, NotificationsPageComponent_div_16_td_10_Template, 2, 1, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 14);
    \u0275\u0275template(12, NotificationsPageComponent_div_16_th_12_Template, 2, 0, "th", 10)(13, NotificationsPageComponent_div_16_td_13_Template, 4, 7, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 15);
    \u0275\u0275template(15, NotificationsPageComponent_div_16_th_15_Template, 2, 0, "th", 10)(16, NotificationsPageComponent_div_16_td_16_Template, 3, 5, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 16);
    \u0275\u0275template(18, NotificationsPageComponent_div_16_th_18_Template, 2, 0, "th", 10)(19, NotificationsPageComponent_div_16_td_19_Template, 3, 4, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 17);
    \u0275\u0275template(21, NotificationsPageComponent_div_16_th_21_Template, 2, 0, "th", 10)(22, NotificationsPageComponent_div_16_td_22_Template, 3, 4, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(23, 18);
    \u0275\u0275template(24, NotificationsPageComponent_div_16_th_24_Template, 2, 0, "th", 10)(25, NotificationsPageComponent_div_16_td_25_Template, 3, 5, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(26, 19);
    \u0275\u0275template(27, NotificationsPageComponent_div_16_th_27_Template, 2, 0, "th", 10)(28, NotificationsPageComponent_div_16_td_28_Template, 7, 0, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(29, NotificationsPageComponent_div_16_tr_29_Template, 1, 0, "tr", 20)(30, NotificationsPageComponent_div_16_tr_30_Template, 1, 0, "tr", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, NotificationsPageComponent_div_16_div_31_Template, 5, 0, "div", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r10 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r10.notifications);
    \u0275\u0275advance(28);
    \u0275\u0275property("matHeaderRowDef", ctx_r10.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r10.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r10.notifications.length === 0);
  }
}
function NotificationsPageComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275element(1, "mat-spinner", 38);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading notifications...");
    \u0275\u0275elementEnd()();
  }
}
var NotificationsPageComponent = class _NotificationsPageComponent {
  notificationService;
  dialog;
  snackBar;
  notifications = [];
  displayedColumns = ["loginId", "isBroadcast", "title", "message", "notificationType", "startDate", "expiryDate", "isRead", "actions"];
  isLoading = false;
  constructor(notificationService, dialog, snackBar) {
    this.notificationService = notificationService;
    this.dialog = dialog;
    this.snackBar = snackBar;
  }
  ngOnInit() {
    this.loadNotifications();
  }
  loadNotifications() {
    this.isLoading = true;
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error loading notifications:", error);
        this.snackBar.open("Error loading notifications", "Close", { duration: 3e3 });
        this.isLoading = false;
      }
    });
  }
  openNotificationForm(notification) {
    const dialogRef = this.dialog.open(NotificationFormComponent, {
      width: "600px",
      data: { notification }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadNotifications();
      }
    });
  }
  deleteNotification(notification) {
    if (confirm(`Are you sure you want to delete the notification "${notification.title}"?`)) {
      this.notificationService.deleteNotification(notification.notificationId).subscribe({
        next: () => {
          this.snackBar.open("Notification deleted successfully", "Close", { duration: 3e3 });
          this.loadNotifications();
        },
        error: (error) => {
          console.error("Error deleting notification:", error);
          this.snackBar.open("Error deleting notification", "Close", { duration: 3e3 });
        }
      });
    }
  }
  static \u0275fac = function NotificationsPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotificationsPageComponent)(\u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationsPageComponent, selectors: [["app-notifications-page"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 18, vars: 2, consts: [[1, "container"], [1, "header-content"], [1, "header-actions"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Refresh notifications", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["class", "table-container", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], [1, "table-container"], ["mat-table", "", 1, "mat-elevation-z2", 3, "dataSource"], ["matColumnDef", "loginId"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "isBroadcast"], ["matColumnDef", "title"], ["matColumnDef", "message"], ["matColumnDef", "notificationType"], ["matColumnDef", "startDate"], ["matColumnDef", "expiryDate"], ["matColumnDef", "isRead"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "no-data", 4, "ngIf"], ["mat-header-cell", ""], ["mat-cell", ""], [4, "ngIf"], ["class", "broadcast-indicator", 4, "ngIf"], [1, "broadcast-indicator"], [1, "broadcast-badge"], [1, "message-preview", 3, "matTooltip"], [1, "type-badge"], [1, "status-badge"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Edit notification", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Delete notification", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "no-data"], [1, "loading-container"], ["diameter", "50"]], template: function NotificationsPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title")(4, "div", 1)(5, "h2");
      \u0275\u0275text(6, "Manage Notifications");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 2)(8, "button", 3);
      \u0275\u0275listener("click", function NotificationsPageComponent_Template_button_click_8_listener() {
        return ctx.loadNotifications();
      });
      \u0275\u0275elementStart(9, "mat-icon");
      \u0275\u0275text(10, "refresh");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "button", 4);
      \u0275\u0275listener("click", function NotificationsPageComponent_Template_button_click_11_listener() {
        return ctx.openNotificationForm();
      });
      \u0275\u0275elementStart(12, "mat-icon");
      \u0275\u0275text(13, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(14, " Add New Notification ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(15, "mat-card-content");
      \u0275\u0275template(16, NotificationsPageComponent_div_16_Template, 32, 4, "div", 5)(17, NotificationsPageComponent_div_17_Template, 4, 0, "div", 6);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275property("ngIf", !ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    SlicePipe,
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
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatTooltipModule,
    MatTooltip,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n}\n.header-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  margin-top: 20px;\n}\n.mat-mdc-table[_ngcontent-%COMP%] {\n  width: 100%;\n  background: white;\n}\n.message-preview[_ngcontent-%COMP%] {\n  display: inline-block;\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  cursor: help;\n}\n.type-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n.type-push[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #1976d2;\n}\n.type-email[_ngcontent-%COMP%] {\n  background-color: #f3e5f5;\n  color: #7b1fa2;\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n.read[_ngcontent-%COMP%] {\n  background-color: #e8f5e8;\n  color: #2e7d32;\n}\n.unread[_ngcontent-%COMP%] {\n  background-color: #fff3e0;\n  color: #f57c00;\n}\n.broadcast-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n.is-broadcast[_ngcontent-%COMP%] {\n  background-color: #e8f5e8;\n  color: #2e7d32;\n}\n.not-broadcast[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  color: #666;\n}\n.broadcast-indicator[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #2e7d32;\n  font-style: italic;\n}\n.mat-mdc-cell[_ngcontent-%COMP%] {\n  padding: 8px;\n}\n.mat-mdc-header-cell[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  color: #666;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-size: 14px;\n}\n.no-data[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  height: 48px;\n  width: 48px;\n  margin-bottom: 16px;\n}\n/*# sourceMappingURL=notifications-page.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationsPageComponent, { className: "NotificationsPageComponent", filePath: "src\\app\\pages\\notifications\\notifications-page.component.ts", lineNumber: 278 });
})();

// src/app/pages/notifications/notifications.routes.ts
var NOTIFICATIONS_ROUTES = [
  {
    path: "",
    component: NotificationsPageComponent,
    title: "Notifications"
  }
];
export {
  NOTIFICATIONS_ROUTES
};
//# sourceMappingURL=chunk-JQLQIKHH.js.map
