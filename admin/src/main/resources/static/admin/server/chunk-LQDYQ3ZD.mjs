import './polyfills.server.mjs';
import {
  AuthService
} from "./chunk-YEMU37C6.mjs";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-ZQWZFUTS.mjs";
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
  Router,
  RouterLink
} from "./chunk-7VTN37JO.mjs";
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
  MatLabel,
  MatSuffix
} from "./chunk-OKVPDLGM.mjs";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MatAnchor,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatNativeDateModule,
  MatOption,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-NFLUKIXG.mjs";
import "./chunk-PTRYWQQD.mjs";

// src/app/pages/auth/login/login.component.ts
function LoginComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "mat-icon", 13);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 14);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
function LoginComponent_mat_error_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Email is required");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_mat_error_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Please enter a valid email");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_mat_error_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Password is required");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_mat_spinner_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 15);
  }
}
var LoginComponent = class _LoginComponent {
  fb;
  router;
  authService;
  snackBar;
  loginForm;
  hidePassword = true;
  isLoading = false;
  errorMessage = "";
  constructor(fb, router, authService, snackBar) {
    this.fb = fb;
    this.router = router;
    this.authService = authService;
    this.snackBar = snackBar;
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = "";
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open("Login successful!", "Close", {
            duration: 3e3,
            panelClass: ["success-snackbar"]
          });
          this.router.navigate(["/dashboard"]);
        },
        error: (error) => {
          this.isLoading = false;
          console.error("Login failed:", error);
          let errorMsg = "Login failed. Please try again.";
          if (error.error) {
            if (typeof error.error === "string") {
              errorMsg = error.error;
            } else if (error.error.message) {
              errorMsg = error.error.message;
            } else if (error.error.error) {
              errorMsg = error.error.error;
            }
          } else if (error.message) {
            errorMsg = error.message;
          }
          if (errorMsg.toLowerCase().includes("invalid username or password") || errorMsg.toLowerCase().includes("authentication failed")) {
            errorMsg = "Invalid email or password. Please check your credentials and try again.";
          } else if (error.status === 401) {
            errorMsg = "Invalid email or password. Please check your credentials and try again.";
          } else if (error.status === 0) {
            errorMsg = "Unable to connect to the server. Please check your internet connection.";
          } else if (error.status >= 500) {
            errorMsg = "Server error. Please try again later.";
          }
          this.errorMessage = errorMsg;
          this.snackBar.open(errorMsg, "Close", {
            duration: 5e3,
            panelClass: ["error-snackbar"]
          });
        }
      });
    }
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 28, vars: 10, consts: [[1, "container", "flex", "justify-center", "align-center", 2, "min-height", "100vh"], [1, "p-20", 2, "max-width", "400px", "width", "100%"], ["class", "error-container", 4, "ngIf"], [1, "flex", "flex-column", "gap-20", 3, "ngSubmit", "formGroup"], ["matInput", "", "type", "email", "formControlName", "email", "placeholder", "Enter your email"], [4, "ngIf"], ["matInput", "", "formControlName", "password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20", 4, "ngIf"], [1, "text-center"], ["mat-button", "", "routerLink", "/register"], [1, "error-container"], ["color", "warn"], [1, "error-text"], ["diameter", "20"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "mat-card-header")(3, "mat-card-title");
      \u0275\u0275text(4, "Login");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "mat-card-content");
      \u0275\u0275template(6, LoginComponent_div_6_Template, 5, 1, "div", 2);
      \u0275\u0275elementStart(7, "form", 3);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_7_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(8, "mat-form-field")(9, "mat-label");
      \u0275\u0275text(10, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(11, "input", 4);
      \u0275\u0275template(12, LoginComponent_mat_error_12_Template, 2, 0, "mat-error", 5)(13, LoginComponent_mat_error_13_Template, 2, 0, "mat-error", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "mat-form-field")(15, "mat-label");
      \u0275\u0275text(16, "Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "input", 6);
      \u0275\u0275elementStart(18, "button", 7);
      \u0275\u0275listener("click", function LoginComponent_Template_button_click_18_listener() {
        return ctx.hidePassword = !ctx.hidePassword;
      });
      \u0275\u0275elementStart(19, "mat-icon");
      \u0275\u0275text(20);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(21, LoginComponent_mat_error_21_Template, 2, 0, "mat-error", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "button", 8);
      \u0275\u0275template(23, LoginComponent_mat_spinner_23_Template, 1, 0, "mat-spinner", 9);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 10)(26, "a", 11);
      \u0275\u0275text(27, "Need to register?");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_6_0;
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_2_0 = ctx.loginForm.get("email")) == null ? null : tmp_2_0.hasError("required"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_3_0 = ctx.loginForm.get("email")) == null ? null : tmp_3_0.hasError("email"));
      \u0275\u0275advance(4);
      \u0275\u0275property("type", ctx.hidePassword ? "password" : "text");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.hidePassword ? "visibility_off" : "visibility");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_6_0 = ctx.loginForm.get("password")) == null ? null : tmp_6_0.hasError("required"));
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loginForm.invalid || ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isLoading ? "Signing in..." : "Login", " ");
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    RouterLink,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatError,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatAnchor,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatSnackBarModule
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.error-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background-color: #ffebee;\n  border: 1px solid #f44336;\n  border-radius: 4px;\n  padding: 12px;\n  margin-bottom: 20px;\n}\n.error-text[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  font-size: 14px;\n}\n.flex[_ngcontent-%COMP%] {\n  display: flex;\n}\n.flex-column[_ngcontent-%COMP%] {\n  flex-direction: column;\n}\n.gap-20[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.text-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n/*# sourceMappingURL=login.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\pages\\auth\\login\\login.component.ts", lineNumber: 109 });
})();

// src/app/pages/auth/register/register.component.ts
function RegisterComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "mat-icon", 28);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 29);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function RegisterComponent_mat_error_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "First name is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_mat_error_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Last name is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_mat_error_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Email is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_mat_error_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Please enter a valid email");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_mat_error_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Password is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_mat_error_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Password must be at least 6 characters");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_mat_error_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Phone number is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_mat_error_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Please enter a valid phone number");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_mat_error_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Birth date is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_mat_error_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Birth time is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_mat_error_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Birth place is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_mat_error_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "User type is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_mat_spinner_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 30);
  }
}
var RegisterComponent = class _RegisterComponent {
  fb;
  router;
  authService;
  snackBar;
  registerForm;
  hidePassword = true;
  isLoading = false;
  errorMessage = "";
  constructor(fb, router, authService, snackBar) {
    this.fb = fb;
    this.router = router;
    this.authService = authService;
    this.snackBar = snackBar;
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      phoneNumber: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      birthDate: ["", Validators.required],
      birthTime: ["", Validators.required],
      birthPlace: ["", Validators.required],
      bio: [""],
      userType: ["student", Validators.required]
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = "";
      const formData = this.registerForm.value;
      formData.birthDate = formData.birthDate.toISOString().split("T")[0];
      this.authService.register(formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open("Registration successful! Please login.", "Close", {
            duration: 5e3,
            panelClass: ["success-snackbar"]
          });
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.isLoading = false;
          console.error("Registration failed:", error);
          let errorMsg = "Registration failed. Please try again.";
          if (error.error) {
            if (typeof error.error === "string") {
              errorMsg = error.error;
            } else if (error.error.message) {
              errorMsg = error.error.message;
            } else if (error.error.error) {
              errorMsg = error.error.error;
            }
          } else if (error.message) {
            errorMsg = error.message;
          }
          if (errorMsg.toLowerCase().includes("username already exists") || errorMsg.toLowerCase().includes("user already exists")) {
            errorMsg = "An account with this email already exists. Please use a different email or try logging in.";
          } else if (errorMsg.toLowerCase().includes("email")) {
            errorMsg = "Please provide a valid email address.";
          } else if (error.status === 400) {
            errorMsg = "Invalid registration data. Please check all fields and try again.";
          } else if (error.status === 0) {
            errorMsg = "Unable to connect to the server. Please check your internet connection.";
          } else if (error.status >= 500) {
            errorMsg = "Server error. Please try again later.";
          }
          this.errorMessage = errorMsg;
          this.snackBar.open(errorMsg, "Close", {
            duration: 5e3,
            panelClass: ["error-snackbar"]
          });
        }
      });
    }
  }
  static \u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegisterComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 79, vars: 21, consts: [["picker", ""], [1, "container", "flex", "justify-center", "align-center", 2, "min-height", "100vh"], [1, "p-20", 2, "max-width", "600px", "width", "100%"], ["class", "error-container", 4, "ngIf"], [1, "flex", "flex-column", "gap-20", 3, "ngSubmit", "formGroup"], [1, "flex", "gap-20"], [1, "flex-1"], ["matInput", "", "formControlName", "firstName"], [4, "ngIf"], ["matInput", "", "formControlName", "lastName"], ["matInput", "", "type", "email", "formControlName", "email"], ["matInput", "", "formControlName", "password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["matInput", "", "type", "tel", "formControlName", "phoneNumber"], ["matInput", "", "formControlName", "birthDate", 3, "matDatepicker"], ["matIconSuffix", "", 3, "for"], ["matInput", "", "type", "time", "formControlName", "birthTime"], ["matInput", "", "formControlName", "birthPlace"], ["matInput", "", "rows", "3", "formControlName", "bio"], ["formControlName", "userType"], ["value", "student"], ["value", "instructor"], ["value", "admin"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20", 4, "ngIf"], [1, "text-center"], ["mat-button", "", "routerLink", "/login"], [1, "error-container"], ["color", "warn"], [1, "error-text"], ["diameter", "20"]], template: function RegisterComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "mat-card", 2)(2, "mat-card-header")(3, "mat-card-title");
      \u0275\u0275text(4, "Register");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "mat-card-content");
      \u0275\u0275template(6, RegisterComponent_div_6_Template, 5, 1, "div", 3);
      \u0275\u0275elementStart(7, "form", 4);
      \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSubmit());
      });
      \u0275\u0275elementStart(8, "div", 5)(9, "mat-form-field", 6)(10, "mat-label");
      \u0275\u0275text(11, "First Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "input", 7);
      \u0275\u0275template(13, RegisterComponent_mat_error_13_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "mat-form-field", 6)(15, "mat-label");
      \u0275\u0275text(16, "Last Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "input", 9);
      \u0275\u0275template(18, RegisterComponent_mat_error_18_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "mat-form-field")(20, "mat-label");
      \u0275\u0275text(21, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "input", 10);
      \u0275\u0275template(23, RegisterComponent_mat_error_23_Template, 2, 0, "mat-error", 8)(24, RegisterComponent_mat_error_24_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "mat-form-field")(26, "mat-label");
      \u0275\u0275text(27, "Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(28, "input", 11);
      \u0275\u0275elementStart(29, "button", 12);
      \u0275\u0275listener("click", function RegisterComponent_Template_button_click_29_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.hidePassword = !ctx.hidePassword);
      });
      \u0275\u0275elementStart(30, "mat-icon");
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(32, RegisterComponent_mat_error_32_Template, 2, 0, "mat-error", 8)(33, RegisterComponent_mat_error_33_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "mat-form-field")(35, "mat-label");
      \u0275\u0275text(36, "Phone Number");
      \u0275\u0275elementEnd();
      \u0275\u0275element(37, "input", 13);
      \u0275\u0275template(38, RegisterComponent_mat_error_38_Template, 2, 0, "mat-error", 8)(39, RegisterComponent_mat_error_39_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "mat-form-field")(41, "mat-label");
      \u0275\u0275text(42, "Birth Date");
      \u0275\u0275elementEnd();
      \u0275\u0275element(43, "input", 14)(44, "mat-datepicker-toggle", 15)(45, "mat-datepicker", null, 0);
      \u0275\u0275template(47, RegisterComponent_mat_error_47_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "mat-form-field")(49, "mat-label");
      \u0275\u0275text(50, "Birth Time");
      \u0275\u0275elementEnd();
      \u0275\u0275element(51, "input", 16);
      \u0275\u0275template(52, RegisterComponent_mat_error_52_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "mat-form-field")(54, "mat-label");
      \u0275\u0275text(55, "Birth Place");
      \u0275\u0275elementEnd();
      \u0275\u0275element(56, "input", 17);
      \u0275\u0275template(57, RegisterComponent_mat_error_57_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "mat-form-field")(59, "mat-label");
      \u0275\u0275text(60, "Bio");
      \u0275\u0275elementEnd();
      \u0275\u0275element(61, "textarea", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "mat-form-field")(63, "mat-label");
      \u0275\u0275text(64, "User Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "mat-select", 19)(66, "mat-option", 20);
      \u0275\u0275text(67, "Student");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "mat-option", 21);
      \u0275\u0275text(69, "Instructor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "mat-option", 22);
      \u0275\u0275text(71, "Admin");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(72, RegisterComponent_mat_error_72_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "button", 23);
      \u0275\u0275template(74, RegisterComponent_mat_spinner_74_Template, 1, 0, "mat-spinner", 24);
      \u0275\u0275text(75);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "div", 25)(77, "a", 26);
      \u0275\u0275text(78, "Already have an account?");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_9_0;
      let tmp_10_0;
      let tmp_11_0;
      let tmp_12_0;
      let tmp_15_0;
      let tmp_16_0;
      let tmp_17_0;
      let tmp_18_0;
      const picker_r3 = \u0275\u0275reference(46);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.registerForm);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", (tmp_3_0 = ctx.registerForm.get("firstName")) == null ? null : tmp_3_0.hasError("required"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_4_0 = ctx.registerForm.get("lastName")) == null ? null : tmp_4_0.hasError("required"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_5_0 = ctx.registerForm.get("email")) == null ? null : tmp_5_0.hasError("required"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_6_0 = ctx.registerForm.get("email")) == null ? null : tmp_6_0.hasError("email"));
      \u0275\u0275advance(4);
      \u0275\u0275property("type", ctx.hidePassword ? "password" : "text");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.hidePassword ? "visibility_off" : "visibility");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_9_0 = ctx.registerForm.get("password")) == null ? null : tmp_9_0.hasError("required"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_10_0 = ctx.registerForm.get("password")) == null ? null : tmp_10_0.hasError("minlength"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_11_0 = ctx.registerForm.get("phoneNumber")) == null ? null : tmp_11_0.hasError("required"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_12_0 = ctx.registerForm.get("phoneNumber")) == null ? null : tmp_12_0.hasError("pattern"));
      \u0275\u0275advance(4);
      \u0275\u0275property("matDatepicker", picker_r3);
      \u0275\u0275advance();
      \u0275\u0275property("for", picker_r3);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", (tmp_15_0 = ctx.registerForm.get("birthDate")) == null ? null : tmp_15_0.hasError("required"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_16_0 = ctx.registerForm.get("birthTime")) == null ? null : tmp_16_0.hasError("required"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", (tmp_17_0 = ctx.registerForm.get("birthPlace")) == null ? null : tmp_17_0.hasError("required"));
      \u0275\u0275advance(15);
      \u0275\u0275property("ngIf", (tmp_18_0 = ctx.registerForm.get("userType")) == null ? null : tmp_18_0.hasError("required"));
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.registerForm.invalid || ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isLoading ? "Creating account..." : "Register", " ");
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    RouterLink,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatError,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatAnchor,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatSnackBarModule
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.flex-1[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=register.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src\\app\\pages\\auth\\register\\register.component.ts", lineNumber: 144 });
})();

// src/app/pages/auth/auth.routes.ts
var AUTH_ROUTES = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];
export {
  AUTH_ROUTES
};
//# sourceMappingURL=chunk-LQDYQ3ZD.mjs.map
