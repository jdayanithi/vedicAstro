import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-L35BBACC.js";
import {
  MatDividerModule
} from "./chunk-WMRCNK66.js";
import {
  MatDialog,
  MatDialogModule
} from "./chunk-ZWSL26NP.js";
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
  FormsModule,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatNativeDateModule,
  MatOption,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgModel,
  ReactiveFormsModule,
  TitleCasePipe,
  Validators,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
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
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-LRGABPEH.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-4MWRP73S.js";

// src/app/pages/users/user-list/user-list.component.ts
var _c0 = (a0) => ["/users", a0];
function UserListComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_div_21_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "ID");
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_div_21_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r1.id);
  }
}
function UserListComponent_div_21_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Username");
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_div_21_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r2.username);
  }
}
function UserListComponent_div_21_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Name");
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_div_21_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", user_r3.firstName, " ", user_r3.lastName, "");
  }
}
function UserListComponent_div_21_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Phone");
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_div_21_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r4.phoneNumber);
  }
}
function UserListComponent_div_21_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "User Type");
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_div_21_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 26)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "titlecase");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("user-type-badge user-type-", user_r5.userType, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 4, user_r5.userType), " ");
  }
}
function UserListComponent_div_21_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Role");
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_div_21_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r6.role);
  }
}
function UserListComponent_div_21_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Birth Date");
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_div_21_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 26);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, user_r7.birthDate, "shortDate"));
  }
}
function UserListComponent_div_21_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Zodiac");
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_div_21_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r8.zodiacSign);
  }
}
function UserListComponent_div_21_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_div_21_td_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 26)(1, "button", 27)(2, "mat-icon");
    \u0275\u0275text(3, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 28);
    \u0275\u0275listener("click", function UserListComponent_div_21_td_28_Template_button_click_4_listener() {
      const user_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r10 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r10.editUser(user_r10.id));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 29);
    \u0275\u0275listener("click", function UserListComponent_div_21_td_28_Template_button_click_7_listener() {
      const user_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r10 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r10.deleteUser(user_r10));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c0, user_r10.id));
  }
}
function UserListComponent_div_21_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 30);
  }
}
function UserListComponent_div_21_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 31);
  }
}
function UserListComponent_div_21_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "mat-icon");
    \u0275\u0275text(2, "person_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No users found");
    \u0275\u0275elementEnd()();
  }
}
function UserListComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "table", 10);
    \u0275\u0275elementContainerStart(2, 11);
    \u0275\u0275template(3, UserListComponent_div_21_th_3_Template, 2, 0, "th", 12)(4, UserListComponent_div_21_td_4_Template, 2, 1, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 14);
    \u0275\u0275template(6, UserListComponent_div_21_th_6_Template, 2, 0, "th", 12)(7, UserListComponent_div_21_td_7_Template, 2, 1, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 15);
    \u0275\u0275template(9, UserListComponent_div_21_th_9_Template, 2, 0, "th", 12)(10, UserListComponent_div_21_td_10_Template, 2, 2, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 16);
    \u0275\u0275template(12, UserListComponent_div_21_th_12_Template, 2, 0, "th", 12)(13, UserListComponent_div_21_td_13_Template, 2, 1, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 17);
    \u0275\u0275template(15, UserListComponent_div_21_th_15_Template, 2, 0, "th", 12)(16, UserListComponent_div_21_td_16_Template, 4, 6, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 18);
    \u0275\u0275template(18, UserListComponent_div_21_th_18_Template, 2, 0, "th", 12)(19, UserListComponent_div_21_td_19_Template, 2, 1, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 19);
    \u0275\u0275template(21, UserListComponent_div_21_th_21_Template, 2, 0, "th", 12)(22, UserListComponent_div_21_td_22_Template, 3, 4, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(23, 20);
    \u0275\u0275template(24, UserListComponent_div_21_th_24_Template, 2, 0, "th", 12)(25, UserListComponent_div_21_td_25_Template, 2, 1, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(26, 21);
    \u0275\u0275template(27, UserListComponent_div_21_th_27_Template, 2, 0, "th", 12)(28, UserListComponent_div_21_td_28_Template, 10, 3, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(29, UserListComponent_div_21_tr_29_Template, 1, 0, "tr", 22)(30, UserListComponent_div_21_tr_30_Template, 1, 0, "tr", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, UserListComponent_div_21_div_31_Template, 5, 0, "div", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r10 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r10.users);
    \u0275\u0275advance(28);
    \u0275\u0275property("matHeaderRowDef", ctx_r10.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r10.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r10.users.length === 0);
  }
}
var UserListComponent = class _UserListComponent {
  userService;
  router;
  snackBar;
  dialog;
  users = [];
  displayedColumns = ["id", "username", "name", "phoneNumber", "userType", "role", "birthDate", "zodiacSign", "actions"];
  loading = false;
  searchQuery = "";
  constructor(userService, router, snackBar, dialog) {
    this.userService = userService;
    this.router = router;
    this.snackBar = snackBar;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading users:", error);
        this.snackBar.open("Error loading users", "Close", { duration: 3e3 });
        this.loading = false;
      }
    });
  }
  onSearchChange() {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.userService.searchUsers(this.searchQuery).subscribe({
        next: (users) => {
          this.users = users;
          this.loading = false;
        },
        error: (error) => {
          console.error("Error searching users:", error);
          this.snackBar.open("Error searching users", "Close", { duration: 3e3 });
          this.loading = false;
        }
      });
    } else {
      this.loadUsers();
    }
  }
  editUser(id) {
    this.router.navigate(["/users/edit", id]);
  }
  deleteUser(user) {
    if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.snackBar.open("User deleted successfully", "Close", { duration: 3e3 });
          this.loadUsers();
        },
        error: (error) => {
          console.error("Error deleting user:", error);
          this.snackBar.open("Error deleting user", "Close", { duration: 3e3 });
        }
      });
    }
  }
  static \u0275fac = function UserListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserListComponent)(\u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserListComponent, selectors: [["app-user-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 22, vars: 3, consts: [[1, "container"], [1, "header"], ["mat-raised-button", "", "color", "primary", "routerLink", "/users/add"], [1, "search-container"], ["appearance", "outline", 1, "search-field"], ["matInput", "", "placeholder", "Search by name, username...", 3, "ngModelChange", "input", "ngModel"], ["matSuffix", ""], ["class", "loading-container", 4, "ngIf"], [4, "ngIf"], [1, "loading-container"], ["mat-table", "", 1, "full-width", 3, "dataSource"], ["matColumnDef", "id"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "username"], ["matColumnDef", "name"], ["matColumnDef", "phoneNumber"], ["matColumnDef", "userType"], ["matColumnDef", "role"], ["matColumnDef", "birthDate"], ["matColumnDef", "zodiacSign"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "no-data", 4, "ngIf"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-icon-button", "", "color", "primary", "matTooltip", "View Details", 3, "routerLink"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Edit User", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Delete User", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "no-data"]], template: function UserListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "User Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2)(5, "mat-icon");
      \u0275\u0275text(6, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Add User ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card")(9, "mat-card-header")(10, "mat-card-title");
      \u0275\u0275text(11, "Users");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "mat-card-content")(13, "div", 3)(14, "mat-form-field", 4)(15, "mat-label");
      \u0275\u0275text(16, "Search users");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_input_ngModelChange_17_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("input", function UserListComponent_Template_input_input_17_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "mat-icon", 6);
      \u0275\u0275text(19, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(20, UserListComponent_div_20_Template, 2, 0, "div", 7)(21, UserListComponent_div_21_Template, 32, 4, "div", 8);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(17);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    TitleCasePipe,
    DatePipe,
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
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.search-container[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.search-field[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 40px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  margin-bottom: 16px;\n}\n.user-type-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n.user-type-student[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #1565c0;\n}\n.user-type-instructor[_ngcontent-%COMP%] {\n  background-color: #f3e5f5;\n  color: #7b1fa2;\n}\n.user-type-admin[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.mat-mdc-cell[_ngcontent-%COMP%], \n.mat-mdc-header-cell[_ngcontent-%COMP%] {\n  padding: 12px 8px;\n}\n.mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n/*# sourceMappingURL=user-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserListComponent, { className: "UserListComponent", filePath: "src\\app\\pages\\users\\user-list\\user-list.component.ts", lineNumber: 227 });
})();

// src/app/pages/users/user-details/user-details.component.ts
var _c02 = (a0) => ["/users/edit", a0];
function UserDetailsComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 8)(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Edit User ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c02, ctx_r0.user.id));
  }
}
function UserDetailsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementEnd();
  }
}
function UserDetailsComponent_div_11_mat_card_43_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2, "Birth Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, ctx_r0.user.birthDate, "fullDate"));
  }
}
function UserDetailsComponent_div_11_mat_card_43_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2, "Birth Time:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.user.birthTime);
  }
}
function UserDetailsComponent_div_11_mat_card_43_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2, "Birth Place:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.user.birthPlace);
  }
}
function UserDetailsComponent_div_11_mat_card_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 11)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Birth Information");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "div", 12);
    \u0275\u0275template(6, UserDetailsComponent_div_11_mat_card_43_div_6_Template, 6, 4, "div", 17)(7, UserDetailsComponent_div_11_mat_card_43_div_7_Template, 5, 1, "div", 17)(8, UserDetailsComponent_div_11_mat_card_43_div_8_Template, 5, 1, "div", 17);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r0.user.birthDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.user.birthTime);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.user.birthPlace);
  }
}
function UserDetailsComponent_div_11_mat_card_44_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2, "Zodiac Sign:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-chip", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.user.zodiacSign);
  }
}
function UserDetailsComponent_div_11_mat_card_44_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2, "Rising Sign:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-chip", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.user.risingSign);
  }
}
function UserDetailsComponent_div_11_mat_card_44_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2, "Moon Sign:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-chip", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.user.moonSign);
  }
}
function UserDetailsComponent_div_11_mat_card_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 11)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Astrological Information");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "div", 12);
    \u0275\u0275template(6, UserDetailsComponent_div_11_mat_card_44_div_6_Template, 5, 1, "div", 17)(7, UserDetailsComponent_div_11_mat_card_44_div_7_Template, 5, 1, "div", 17)(8, UserDetailsComponent_div_11_mat_card_44_div_8_Template, 5, 1, "div", 17);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r0.user.zodiacSign);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.user.risingSign);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.user.moonSign);
  }
}
function UserDetailsComponent_div_11_mat_card_45_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2, "Profile Picture:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20)(4, "img", 21);
    \u0275\u0275listener("error", function UserDetailsComponent_div_11_mat_card_45_div_5_Template_img_error_4_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onImageError($event));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("src", ctx_r0.user.profilePicture, \u0275\u0275sanitizeUrl)("alt", ctx_r0.user.firstName + " " + ctx_r0.user.lastName);
  }
}
function UserDetailsComponent_div_11_mat_card_45_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "span", 14);
    \u0275\u0275text(2, "Bio:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 23);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.user.bio);
  }
}
function UserDetailsComponent_div_11_mat_card_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 11)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Additional Information");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content");
    \u0275\u0275template(5, UserDetailsComponent_div_11_mat_card_45_div_5_Template, 5, 2, "div", 17)(6, UserDetailsComponent_div_11_mat_card_45_div_6_Template, 5, 1, "div", 19);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r0.user.profilePicture);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.user.bio);
  }
}
function UserDetailsComponent_div_11_div_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2, "Created Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, ctx_r0.user.createdDate, "medium"));
  }
}
function UserDetailsComponent_div_11_div_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2, "Updated Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, ctx_r0.user.updatedDate, "medium"));
  }
}
function UserDetailsComponent_div_11_div_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2, "Created By:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.user.createdBy);
  }
}
function UserDetailsComponent_div_11_div_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2, "Updated By:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.user.updatedBy);
  }
}
function UserDetailsComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "mat-card", 11)(2, "mat-card-header")(3, "mat-card-title");
    \u0275\u0275text(4, "Basic Information");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-card-content")(6, "div", 12)(7, "div", 13)(8, "span", 14);
    \u0275\u0275text(9, "ID:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 15);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 13)(13, "span", 14);
    \u0275\u0275text(14, "Username:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 15);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 13)(18, "span", 14);
    \u0275\u0275text(19, "First Name:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 15);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 13)(23, "span", 14);
    \u0275\u0275text(24, "Last Name:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 15);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 13)(28, "span", 14);
    \u0275\u0275text(29, "Phone Number:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 15);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 13)(33, "span", 14);
    \u0275\u0275text(34, "Role:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 15);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 13)(38, "span", 14);
    \u0275\u0275text(39, "User Type:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "mat-chip");
    \u0275\u0275text(41);
    \u0275\u0275pipe(42, "titlecase");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275template(43, UserDetailsComponent_div_11_mat_card_43_Template, 9, 3, "mat-card", 16)(44, UserDetailsComponent_div_11_mat_card_44_Template, 9, 3, "mat-card", 16)(45, UserDetailsComponent_div_11_mat_card_45_Template, 7, 2, "mat-card", 16);
    \u0275\u0275elementStart(46, "mat-card", 11)(47, "mat-card-header")(48, "mat-card-title");
    \u0275\u0275text(49, "System Information");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "mat-card-content")(51, "div", 12);
    \u0275\u0275template(52, UserDetailsComponent_div_11_div_52_Template, 6, 4, "div", 17)(53, UserDetailsComponent_div_11_div_53_Template, 6, 4, "div", 17)(54, UserDetailsComponent_div_11_div_54_Template, 5, 1, "div", 17)(55, UserDetailsComponent_div_11_div_55_Template, 5, 1, "div", 17);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r0.user.id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.user.username);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.user.firstName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.user.lastName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.user.phoneNumber);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.user.role);
    \u0275\u0275advance(4);
    \u0275\u0275classMapInterpolate1("user-type-chip user-type-", ctx_r0.user.userType, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(42, 17, ctx_r0.user.userType), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.user.birthDate || ctx_r0.user.birthTime || ctx_r0.user.birthPlace);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.user.zodiacSign || ctx_r0.user.risingSign || ctx_r0.user.moonSign);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.user.bio || ctx_r0.user.profilePicture);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r0.user.createdDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.user.updatedDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.user.createdBy);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.user.updatedBy);
  }
}
function UserDetailsComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "mat-icon");
    \u0275\u0275text(2, "person_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "User Not Found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "The user you're looking for doesn't exist or has been deleted.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 25);
    \u0275\u0275listener("click", function UserDetailsComponent_div_12_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goBack());
    });
    \u0275\u0275text(8, " Go Back to Users ");
    \u0275\u0275elementEnd()();
  }
}
var UserDetailsComponent = class _UserDetailsComponent {
  route;
  router;
  userService;
  snackBar;
  userId = null;
  user = null;
  loading = false;
  constructor(route, router, userService, snackBar) {
    this.route = route;
    this.router = router;
    this.userService = userService;
    this.snackBar = snackBar;
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.userId = +params["id"];
        this.loadUser();
      }
    });
  }
  loadUser() {
    if (!this.userId)
      return;
    this.loading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading user:", error);
        this.snackBar.open("Error loading user details", "Close", { duration: 3e3 });
        this.loading = false;
      }
    });
  }
  goBack() {
    this.router.navigate(["/users"]);
  }
  onImageError(event) {
    event.target.style.display = "none";
  }
  static \u0275fac = function UserDetailsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserDetailsComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserDetailsComponent, selectors: [["app-user-details"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 13, vars: 4, consts: [[1, "container"], [1, "header"], [1, "actions"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "accent", 3, "routerLink", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], ["class", "user-details", 4, "ngIf"], ["class", "no-user", 4, "ngIf"], ["mat-raised-button", "", "color", "accent", 3, "routerLink"], [1, "loading-container"], [1, "user-details"], [1, "info-card"], [1, "info-grid"], [1, "info-item"], [1, "label"], [1, "value"], ["class", "info-card", 4, "ngIf"], ["class", "info-item", 4, "ngIf"], [1, "astro-chip"], ["class", "info-item bio-item", 4, "ngIf"], [1, "profile-picture"], [3, "error", "src", "alt"], [1, "info-item", "bio-item"], [1, "bio-text"], [1, "no-user"], ["mat-raised-button", "", "color", "primary", 3, "click"]], template: function UserDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "User Details");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
      \u0275\u0275listener("click", function UserDetailsComponent_Template_button_click_5_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(6, "mat-icon");
      \u0275\u0275text(7, "arrow_back");
      \u0275\u0275elementEnd();
      \u0275\u0275text(8, " Back to Users ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, UserDetailsComponent_button_9_Template, 4, 3, "button", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(10, UserDetailsComponent_div_10_Template, 2, 0, "div", 5)(11, UserDetailsComponent_div_11_Template, 56, 19, "div", 6)(12, UserDetailsComponent_div_12_Template, 9, 0, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", ctx.user);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.user);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.user);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    TitleCasePipe,
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
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1000px;\n  margin: 0 auto;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.user-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.info-card[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 16px;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  min-height: 40px;\n}\n.bio-item[_ngcontent-%COMP%] {\n  align-items: flex-start;\n  flex-direction: column;\n  grid-column: 1/-1;\n}\n.label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #666;\n  min-width: 120px;\n  margin-right: 12px;\n}\n.value[_ngcontent-%COMP%] {\n  color: #333;\n  word-break: break-word;\n}\n.bio-text[_ngcontent-%COMP%] {\n  margin: 8px 0 0 0;\n  line-height: 1.5;\n  color: #333;\n}\n.user-type-chip[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n}\n.user-type-student[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #1565c0;\n}\n.user-type-instructor[_ngcontent-%COMP%] {\n  background-color: #f3e5f5;\n  color: #7b1fa2;\n}\n.user-type-admin[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.astro-chip[_ngcontent-%COMP%] {\n  background-color: #fff3e0;\n  color: #e65100;\n}\n.profile-picture[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.profile-picture[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 150px;\n  max-height: 150px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.no-user[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #666;\n}\n.no-user[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 16px;\n}\n.no-user[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  color: #333;\n}\n@media (max-width: 768px) {\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-start;\n  }\n  .info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .info-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .label[_ngcontent-%COMP%] {\n    min-width: auto;\n    margin-right: 0;\n    margin-bottom: 4px;\n  }\n}\n/*# sourceMappingURL=user-details.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserDetailsComponent, { className: "UserDetailsComponent", filePath: "src\\app\\pages\\users\\user-details\\user-details.component.ts", lineNumber: 351 });
})();

// src/app/pages/users/add-user/add-user.component.ts
function AddUserComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementEnd();
  }
}
function AddUserComponent_form_14_mat_error_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Username is required ");
    \u0275\u0275elementEnd();
  }
}
function AddUserComponent_form_14_mat_form_field_10_mat_error_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Password is required ");
    \u0275\u0275elementEnd();
  }
}
function AddUserComponent_form_14_mat_form_field_10_mat_error_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Password must be at least 6 characters ");
    \u0275\u0275elementEnd();
  }
}
function AddUserComponent_form_14_mat_form_field_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 10)(1, "mat-label");
    \u0275\u0275text(2, "Password");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 36);
    \u0275\u0275elementStart(4, "button", 37);
    \u0275\u0275listener("click", function AddUserComponent_form_14_mat_form_field_10_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.hidePassword = !ctx_r1.hidePassword);
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, AddUserComponent_form_14_mat_form_field_10_mat_error_7_Template, 2, 0, "mat-error", 12)(8, AddUserComponent_form_14_mat_form_field_10_mat_error_8_Template, 2, 0, "mat-error", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("type", ctx_r1.hidePassword ? "password" : "text");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.hidePassword ? "visibility_off" : "visibility");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_5_0 = ctx_r1.userForm.get("password")) == null ? null : tmp_5_0.hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_6_0 = ctx_r1.userForm.get("password")) == null ? null : tmp_6_0.hasError("minlength"));
  }
}
function AddUserComponent_form_14_mat_error_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " First name is required ");
    \u0275\u0275elementEnd();
  }
}
function AddUserComponent_form_14_mat_error_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Last name is required ");
    \u0275\u0275elementEnd();
  }
}
function AddUserComponent_form_14_mat_error_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Phone number is required ");
    \u0275\u0275elementEnd();
  }
}
function AddUserComponent_form_14_mat_error_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " User type is required ");
    \u0275\u0275elementEnd();
  }
}
function AddUserComponent_form_14_mat_error_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Role is required ");
    \u0275\u0275elementEnd();
  }
}
function AddUserComponent_form_14_mat_option_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sign_r4 = ctx.$implicit;
    \u0275\u0275property("value", sign_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sign_r4, " ");
  }
}
function AddUserComponent_form_14_mat_option_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 38);
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
function AddUserComponent_form_14_mat_option_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sign_r6 = ctx.$implicit;
    \u0275\u0275property("value", sign_r6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sign_r6, " ");
  }
}
function AddUserComponent_form_14_mat_spinner_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 39);
  }
}
function AddUserComponent_form_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275listener("ngSubmit", function AddUserComponent_form_14_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 8)(2, "h3");
    \u0275\u0275text(3, "Basic Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 9)(5, "mat-form-field", 10)(6, "mat-label");
    \u0275\u0275text(7, "Username");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 11);
    \u0275\u0275template(9, AddUserComponent_form_14_mat_error_9_Template, 2, 0, "mat-error", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, AddUserComponent_form_14_mat_form_field_10_Template, 9, 4, "mat-form-field", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 9)(12, "mat-form-field", 10)(13, "mat-label");
    \u0275\u0275text(14, "First Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 14);
    \u0275\u0275template(16, AddUserComponent_form_14_mat_error_16_Template, 2, 0, "mat-error", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "mat-form-field", 10)(18, "mat-label");
    \u0275\u0275text(19, "Last Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "input", 15);
    \u0275\u0275template(21, AddUserComponent_form_14_mat_error_21_Template, 2, 0, "mat-error", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 9)(23, "mat-form-field", 10)(24, "mat-label");
    \u0275\u0275text(25, "Phone Number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "input", 16);
    \u0275\u0275template(27, AddUserComponent_form_14_mat_error_27_Template, 2, 0, "mat-error", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "mat-form-field", 10)(29, "mat-label");
    \u0275\u0275text(30, "User Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "mat-select", 17)(32, "mat-option", 18);
    \u0275\u0275text(33, "Student");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "mat-option", 19);
    \u0275\u0275text(35, "Instructor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "mat-option", 20);
    \u0275\u0275text(37, "Admin");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(38, AddUserComponent_form_14_mat_error_38_Template, 2, 0, "mat-error", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "mat-form-field", 10)(40, "mat-label");
    \u0275\u0275text(41, "Role");
    \u0275\u0275elementEnd();
    \u0275\u0275element(42, "input", 21);
    \u0275\u0275template(43, AddUserComponent_form_14_mat_error_43_Template, 2, 0, "mat-error", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 8)(45, "h3");
    \u0275\u0275text(46, "Birth Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 9)(48, "mat-form-field", 10)(49, "mat-label");
    \u0275\u0275text(50, "Birth Date");
    \u0275\u0275elementEnd();
    \u0275\u0275element(51, "input", 22)(52, "mat-datepicker-toggle", 23)(53, "mat-datepicker", null, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "mat-form-field", 10)(56, "mat-label");
    \u0275\u0275text(57, "Birth Time");
    \u0275\u0275elementEnd();
    \u0275\u0275element(58, "input", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "mat-form-field", 10)(60, "mat-label");
    \u0275\u0275text(61, "Birth Place");
    \u0275\u0275elementEnd();
    \u0275\u0275element(62, "input", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "div", 8)(64, "h3");
    \u0275\u0275text(65, "Astrological Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div", 9)(67, "mat-form-field", 10)(68, "mat-label");
    \u0275\u0275text(69, "Zodiac Sign");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "mat-select", 26);
    \u0275\u0275template(71, AddUserComponent_form_14_mat_option_71_Template, 2, 2, "mat-option", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "mat-form-field", 10)(73, "mat-label");
    \u0275\u0275text(74, "Rising Sign");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "mat-select", 28);
    \u0275\u0275template(76, AddUserComponent_form_14_mat_option_76_Template, 2, 2, "mat-option", 27);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(77, "mat-form-field", 10)(78, "mat-label");
    \u0275\u0275text(79, "Moon Sign");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "mat-select", 29);
    \u0275\u0275template(81, AddUserComponent_form_14_mat_option_81_Template, 2, 2, "mat-option", 27);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(82, "div", 8)(83, "h3");
    \u0275\u0275text(84, "Additional Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "mat-form-field", 10)(86, "mat-label");
    \u0275\u0275text(87, "Bio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "textarea", 30);
    \u0275\u0275text(89, "                ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(90, "mat-form-field", 10)(91, "mat-label");
    \u0275\u0275text(92, "Profile Picture URL");
    \u0275\u0275elementEnd();
    \u0275\u0275element(93, "input", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(94, "div", 32)(95, "button", 33);
    \u0275\u0275listener("click", function AddUserComponent_form_14_Template_button_click_95_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(96, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "button", 34);
    \u0275\u0275template(98, AddUserComponent_form_14_mat_spinner_98_Template, 1, 0, "mat-spinner", 35);
    \u0275\u0275text(99);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    const picker_r7 = \u0275\u0275reference(54);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.userForm);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.userForm.get("username")) == null ? null : tmp_3_0.hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isEditMode);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", (tmp_5_0 = ctx_r1.userForm.get("firstName")) == null ? null : tmp_5_0.hasError("required"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", (tmp_6_0 = ctx_r1.userForm.get("lastName")) == null ? null : tmp_6_0.hasError("required"));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", (tmp_7_0 = ctx_r1.userForm.get("phoneNumber")) == null ? null : tmp_7_0.hasError("required"));
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", (tmp_8_0 = ctx_r1.userForm.get("userType")) == null ? null : tmp_8_0.hasError("required"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", (tmp_9_0 = ctx_r1.userForm.get("role")) == null ? null : tmp_9_0.hasError("required"));
    \u0275\u0275advance(8);
    \u0275\u0275property("matDatepicker", picker_r7);
    \u0275\u0275advance();
    \u0275\u0275property("for", picker_r7);
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r1.zodiacSigns);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.zodiacSigns);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.zodiacSigns);
    \u0275\u0275advance(16);
    \u0275\u0275property("disabled", ctx_r1.userForm.invalid || ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.submitting ? "Saving..." : ctx_r1.isEditMode ? "Update User" : "Create User", " ");
  }
}
var AddUserComponent = class _AddUserComponent {
  fb;
  userService;
  router;
  route;
  snackBar;
  userForm;
  isEditMode = false;
  userId = null;
  loading = false;
  submitting = false;
  hidePassword = true;
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
  constructor(fb, userService, router, route, snackBar) {
    this.fb = fb;
    this.userService = userService;
    this.router = router;
    this.route = route;
    this.snackBar = snackBar;
    this.userForm = this.createForm();
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.isEditMode = true;
        this.userId = +params["id"];
        this.loadUser();
      }
    });
  }
  createForm() {
    return this.fb.group({
      username: ["", [Validators.required]],
      password: ["", this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      userType: ["student", [Validators.required]],
      role: ["USER", [Validators.required]],
      birthDate: [""],
      birthTime: [""],
      birthPlace: [""],
      zodiacSign: [""],
      risingSign: [""],
      moonSign: [""],
      bio: [""],
      profilePicture: [""]
    });
  }
  loadUser() {
    if (!this.userId)
      return;
    this.loading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.userForm.get("password")?.clearValidators();
        this.userForm.get("password")?.updateValueAndValidity();
        const formattedUser = __spreadProps(__spreadValues({}, user), {
          birthDate: user.birthDate ? new Date(user.birthDate) : null
        });
        this.userForm.patchValue(formattedUser);
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading user:", error);
        this.snackBar.open("Error loading user details", "Close", { duration: 3e3 });
        this.loading = false;
      }
    });
  }
  onSubmit() {
    if (this.userForm.invalid)
      return;
    this.submitting = true;
    const formValue = this.userForm.value;
    const userData = __spreadProps(__spreadValues({}, formValue), {
      birthDate: formValue.birthDate ? formValue.birthDate.toISOString().split("T")[0] : null,
      updatedBy: "admin"
      // You might want to get this from auth service
    });
    if (this.isEditMode && !userData.password) {
      delete userData.password;
    }
    const request = this.isEditMode ? this.userService.updateUser(this.userId, userData) : this.userService.createUser(userData);
    request.subscribe({
      next: (result) => {
        const message = this.isEditMode ? "User updated successfully" : "User created successfully";
        this.snackBar.open(message, "Close", { duration: 3e3 });
        this.router.navigate(["/users"]);
      },
      error: (error) => {
        console.error("Error saving user:", error);
        const message = error.error?.message || "Error saving user";
        this.snackBar.open(message, "Close", { duration: 5e3 });
        this.submitting = false;
      }
    });
  }
  goBack() {
    this.router.navigate(["/users"]);
  }
  static \u0275fac = function AddUserComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddUserComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddUserComponent, selectors: [["app-add-user"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 15, vars: 4, consts: [["picker", ""], [1, "container"], [1, "header"], ["mat-button", "", 3, "click"], ["class", "loading-container", 4, "ngIf"], ["class", "user-form", 3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "loading-container"], [1, "user-form", 3, "ngSubmit", "formGroup"], [1, "section"], [1, "form-row"], ["appearance", "outline"], ["matInput", "", "formControlName", "username", "placeholder", "Enter username"], [4, "ngIf"], ["appearance", "outline", 4, "ngIf"], ["matInput", "", "formControlName", "firstName", "placeholder", "Enter first name"], ["matInput", "", "formControlName", "lastName", "placeholder", "Enter last name"], ["matInput", "", "formControlName", "phoneNumber", "placeholder", "Enter phone number"], ["formControlName", "userType"], ["value", "student"], ["value", "instructor"], ["value", "admin"], ["matInput", "", "formControlName", "role", "placeholder", "Enter role"], ["matInput", "", "formControlName", "birthDate", 3, "matDatepicker"], ["matIconSuffix", "", 3, "for"], ["matInput", "", "type", "time", "formControlName", "birthTime", "placeholder", "HH:MM"], ["matInput", "", "formControlName", "birthPlace", "placeholder", "Enter birth place"], ["formControlName", "zodiacSign"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "risingSign"], ["formControlName", "moonSign"], ["matInput", "", "formControlName", "bio", "rows", "4", "placeholder", "Enter user bio"], ["matInput", "", "formControlName", "profilePicture", "placeholder", "Enter profile picture URL"], [1, "form-actions"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20", 4, "ngIf"], ["matInput", "", "formControlName", "password", "placeholder", "Enter password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], [3, "value"], ["diameter", "20"]], template: function AddUserComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function AddUserComponent_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(5, "mat-icon");
      \u0275\u0275text(6, "arrow_back");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Back to Users ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card")(9, "mat-card-header")(10, "mat-card-title");
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "mat-card-content");
      \u0275\u0275template(13, AddUserComponent_div_13_Template, 2, 0, "div", 4)(14, AddUserComponent_form_14_Template, 100, 16, "form", 5);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit User" : "Add New User");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit User Details" : "User Information");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
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
    FormGroupDirective,
    FormControlName,
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
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatIconModule,
    MatIcon,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 40px;\n}\n.user-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.section[_ngcontent-%COMP%] {\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  padding: 20px;\n  background-color: #fafafa;\n}\n.section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  color: #333;\n  font-size: 16px;\n  font-weight: 500;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.form-row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\nmat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  padding-top: 20px;\n  border-top: 1px solid #e0e0e0;\n}\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 120px;\n}\n@media (max-width: 768px) {\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=add-user.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddUserComponent, { className: "AddUserComponent", filePath: "src\\app\\pages\\users\\add-user\\add-user.component.ts", lineNumber: 310 });
})();

// src/app/pages/users/users.routes.ts
var USERS_ROUTES = [
  { path: "", component: UserListComponent },
  { path: "add", component: AddUserComponent },
  { path: "edit/:id", component: AddUserComponent },
  { path: ":id", component: UserDetailsComponent }
];
export {
  USERS_ROUTES
};
//# sourceMappingURL=chunk-RTPMGDBQ.js.map
