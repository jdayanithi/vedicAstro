import './polyfills.server.mjs';
import {
  CourseService
} from "./chunk-OR4G4BEX.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-3NCYDLW6.mjs";
import {
  UserService
} from "./chunk-WWFL4LUY.mjs";
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
  MatChip,
  MatChipSet,
  MatChipsModule
} from "./chunk-H6LW7J6K.mjs";
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
  MatPrefix,
  MatSuffix
} from "./chunk-OKVPDLGM.mjs";
import {
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
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  environment,
  ɵNgNoValidate
} from "./chunk-FNH7JYNE.mjs";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  HttpClient,
  NgClass,
  NgIf,
  TitleCasePipe,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
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
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-NFLUKIXG.mjs";
import {
  __spreadValues
} from "./chunk-PTRYWQQD.mjs";

// src/app/services/payment.service.ts
var PaymentService = class _PaymentService {
  http;
  apiUrl = `${environment.apiUrl}/payments`;
  constructor(http) {
    this.http = http;
  }
  getPayments() {
    return this.http.get(this.apiUrl);
  }
  getPaymentById(paymentId) {
    return this.http.get(`${this.apiUrl}/${paymentId}`);
  }
  createPayment(payment) {
    return this.http.post(this.apiUrl, payment);
  }
  updatePayment(paymentId, payment) {
    return this.http.put(`${this.apiUrl}/${paymentId}`, payment);
  }
  deletePayment(paymentId) {
    return this.http.delete(`${this.apiUrl}/${paymentId}`);
  }
  static \u0275fac = function PaymentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaymentService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PaymentService, factory: _PaymentService.\u0275fac, providedIn: "root" });
};

// src/app/pages/payments/payment-list/payment-list.component.ts
var _c0 = (a0) => ["edit", a0];
function PaymentListComponent_div_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading payments...");
    \u0275\u0275elementEnd()();
  }
}
function PaymentListComponent_mat_card_54_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Payment ID");
    \u0275\u0275elementEnd();
  }
}
function PaymentListComponent_mat_card_54_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const payment_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(payment_r1.paymentId);
  }
}
function PaymentListComponent_mat_card_54_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "User ID");
    \u0275\u0275elementEnd();
  }
}
function PaymentListComponent_mat_card_54_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const payment_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(payment_r2.loginId);
  }
}
function PaymentListComponent_mat_card_54_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Course ID");
    \u0275\u0275elementEnd();
  }
}
function PaymentListComponent_mat_card_54_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const payment_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(payment_r3.courseId);
  }
}
function PaymentListComponent_mat_card_54_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Amount");
    \u0275\u0275elementEnd();
  }
}
function PaymentListComponent_mat_card_54_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const payment_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(3, 1, payment_r4.amount, "1.2-2"), "");
  }
}
function PaymentListComponent_mat_card_54_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Payment Method");
    \u0275\u0275elementEnd();
  }
}
function PaymentListComponent_mat_card_54_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "mat-chip-set")(2, "mat-chip");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "titlecase");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const payment_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 1, payment_r5.paymentMethod));
  }
}
function PaymentListComponent_mat_card_54_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Transaction ID");
    \u0275\u0275elementEnd();
  }
}
function PaymentListComponent_mat_card_54_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "span", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const payment_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r6.transactionId || "N/A");
  }
}
function PaymentListComponent_mat_card_54_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Status");
    \u0275\u0275elementEnd();
  }
}
function PaymentListComponent_mat_card_54_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "mat-chip-set")(2, "mat-chip", 41);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "titlecase");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const payment_r7 = ctx.$implicit;
    const ctx_r7 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r7.getStatusClass(payment_r7.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 2, payment_r7.status), " ");
  }
}
function PaymentListComponent_mat_card_54_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Payment Date");
    \u0275\u0275elementEnd();
  }
}
function PaymentListComponent_mat_card_54_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const payment_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, payment_r9.paymentDate, "dd/MM/yyyy HH:mm"), " ");
  }
}
function PaymentListComponent_mat_card_54_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function PaymentListComponent_mat_card_54_td_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 39)(1, "button", 42)(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 43);
    \u0275\u0275listener("click", function PaymentListComponent_mat_card_54_td_28_Template_button_click_4_listener() {
      const payment_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r7 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r7.deletePayment(payment_r11));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const payment_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c0, payment_r11.paymentId));
  }
}
function PaymentListComponent_mat_card_54_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 44);
  }
}
function PaymentListComponent_mat_card_54_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 45);
  }
}
function PaymentListComponent_mat_card_54_div_31_button_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 4)(1, "mat-icon");
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Add First Payment ");
    \u0275\u0275elementEnd();
  }
}
function PaymentListComponent_mat_card_54_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "mat-icon");
    \u0275\u0275text(2, "payment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No payments found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, PaymentListComponent_mat_card_54_div_31_button_7_Template, 4, 0, "button", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r7 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r7.payments.length === 0 ? "No payments have been created yet." : "No payments match your current filters.");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r7.payments.length === 0);
  }
}
function PaymentListComponent_mat_card_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card")(1, "table", 23);
    \u0275\u0275elementContainerStart(2, 24);
    \u0275\u0275template(3, PaymentListComponent_mat_card_54_th_3_Template, 2, 0, "th", 25)(4, PaymentListComponent_mat_card_54_td_4_Template, 2, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 27);
    \u0275\u0275template(6, PaymentListComponent_mat_card_54_th_6_Template, 2, 0, "th", 25)(7, PaymentListComponent_mat_card_54_td_7_Template, 2, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 28);
    \u0275\u0275template(9, PaymentListComponent_mat_card_54_th_9_Template, 2, 0, "th", 25)(10, PaymentListComponent_mat_card_54_td_10_Template, 2, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 29);
    \u0275\u0275template(12, PaymentListComponent_mat_card_54_th_12_Template, 2, 0, "th", 25)(13, PaymentListComponent_mat_card_54_td_13_Template, 4, 4, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 30);
    \u0275\u0275template(15, PaymentListComponent_mat_card_54_th_15_Template, 2, 0, "th", 25)(16, PaymentListComponent_mat_card_54_td_16_Template, 5, 3, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 31);
    \u0275\u0275template(18, PaymentListComponent_mat_card_54_th_18_Template, 2, 0, "th", 25)(19, PaymentListComponent_mat_card_54_td_19_Template, 3, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 32);
    \u0275\u0275template(21, PaymentListComponent_mat_card_54_th_21_Template, 2, 0, "th", 25)(22, PaymentListComponent_mat_card_54_td_22_Template, 5, 4, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(23, 33);
    \u0275\u0275template(24, PaymentListComponent_mat_card_54_th_24_Template, 2, 0, "th", 25)(25, PaymentListComponent_mat_card_54_td_25_Template, 3, 4, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(26, 34);
    \u0275\u0275template(27, PaymentListComponent_mat_card_54_th_27_Template, 2, 0, "th", 25)(28, PaymentListComponent_mat_card_54_td_28_Template, 7, 3, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(29, PaymentListComponent_mat_card_54_tr_29_Template, 1, 0, "tr", 35)(30, PaymentListComponent_mat_card_54_tr_30_Template, 1, 0, "tr", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, PaymentListComponent_mat_card_54_div_31_Template, 8, 2, "div", 37);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r7 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r7.filteredPayments);
    \u0275\u0275advance(28);
    \u0275\u0275property("matHeaderRowDef", ctx_r7.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r7.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r7.filteredPayments.length === 0);
  }
}
var PaymentListComponent = class _PaymentListComponent {
  paymentService;
  snackBar;
  payments = [];
  filteredPayments = [];
  loading = false;
  // Filter properties
  searchQuery = "";
  statusFilter = "";
  paymentMethodFilter = "";
  displayedColumns = [
    "paymentId",
    "loginId",
    "courseId",
    "amount",
    "paymentMethod",
    "transactionId",
    "status",
    "paymentDate",
    "actions"
  ];
  constructor(paymentService, snackBar) {
    this.paymentService = paymentService;
    this.snackBar = snackBar;
  }
  ngOnInit() {
    this.loadPayments();
  }
  loadPayments() {
    this.loading = true;
    this.paymentService.getPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading payments:", error);
        this.snackBar.open("Error loading payments", "Close", {
          duration: 3e3
        });
        this.loading = false;
      }
    });
  }
  applyFilters() {
    this.filteredPayments = this.payments.filter((payment) => {
      const matchesSearch = !this.searchQuery || payment.transactionId && payment.transactionId.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = !this.statusFilter || payment.status === this.statusFilter;
      const matchesPaymentMethod = !this.paymentMethodFilter || payment.paymentMethod === this.paymentMethodFilter;
      return matchesSearch && matchesStatus && matchesPaymentMethod;
    });
  }
  clearFilters() {
    this.searchQuery = "";
    this.statusFilter = "";
    this.paymentMethodFilter = "";
    this.applyFilters();
  }
  deletePayment(payment) {
    if (confirm(`Are you sure you want to delete payment ${payment.paymentId}?`)) {
      this.paymentService.deletePayment(payment.paymentId).subscribe({
        next: () => {
          this.snackBar.open("Payment deleted successfully", "Close", {
            duration: 3e3
          });
          this.loadPayments();
        },
        error: (error) => {
          console.error("Error deleting payment:", error);
          this.snackBar.open("Error deleting payment", "Close", {
            duration: 3e3
          });
        }
      });
    }
  }
  getStatusClass(status) {
    return `status-${status.toLowerCase()}`;
  }
  static \u0275fac = function PaymentListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaymentListComponent)(\u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentListComponent, selectors: [["app-payment-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 55, vars: 5, consts: [[1, "container"], [1, "header"], [1, "header-actions"], ["mat-icon-button", "", "matTooltip", "Refresh", 3, "click"], ["mat-raised-button", "", "color", "primary", "routerLink", "add"], [1, "filter-card"], [1, "filters"], ["matInput", "", "placeholder", "Enter transaction ID", 3, "ngModelChange", "input", "ngModel"], [3, "ngModelChange", "selectionChange", "ngModel"], ["value", ""], ["value", "pending"], ["value", "completed"], ["value", "failed"], ["value", "refunded"], ["value", "credit_card"], ["value", "debit_card"], ["value", "paypal"], ["value", "upi"], ["value", "net_banking"], ["mat-button", "", 3, "click"], ["class", "loading-container", 4, "ngIf"], [4, "ngIf"], [1, "loading-container"], ["mat-table", "", 1, "mat-elevation-z2", 3, "dataSource"], ["matColumnDef", "paymentId"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "loginId"], ["matColumnDef", "courseId"], ["matColumnDef", "amount"], ["matColumnDef", "paymentMethod"], ["matColumnDef", "transactionId"], ["matColumnDef", "status"], ["matColumnDef", "paymentDate"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "no-data", 4, "ngIf"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "transaction-id"], [3, "ngClass"], ["mat-icon-button", "", "matTooltip", "Edit Payment", 3, "routerLink"], ["mat-icon-button", "", "matTooltip", "Delete Payment", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "no-data"], ["mat-raised-button", "", "color", "primary", "routerLink", "add", 4, "ngIf"]], template: function PaymentListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Payment Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
      \u0275\u0275listener("click", function PaymentListComponent_Template_button_click_5_listener() {
        return ctx.loadPayments();
      });
      \u0275\u0275elementStart(6, "mat-icon");
      \u0275\u0275text(7, "refresh");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 4)(9, "mat-icon");
      \u0275\u0275text(10, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " Add Payment ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "mat-card", 5)(13, "mat-card-content")(14, "div", 6)(15, "mat-form-field")(16, "mat-label");
      \u0275\u0275text(17, "Search by Transaction ID");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function PaymentListComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("input", function PaymentListComponent_Template_input_input_18_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "mat-form-field")(20, "mat-label");
      \u0275\u0275text(21, "Filter by Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "mat-select", 8);
      \u0275\u0275twoWayListener("ngModelChange", function PaymentListComponent_Template_mat_select_ngModelChange_22_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function PaymentListComponent_Template_mat_select_selectionChange_22_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementStart(23, "mat-option", 9);
      \u0275\u0275text(24, "All Statuses");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "mat-option", 10);
      \u0275\u0275text(26, "Pending");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "mat-option", 11);
      \u0275\u0275text(28, "Completed");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "mat-option", 12);
      \u0275\u0275text(30, "Failed");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "mat-option", 13);
      \u0275\u0275text(32, "Refunded");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(33, "mat-form-field")(34, "mat-label");
      \u0275\u0275text(35, "Filter by Payment Method");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "mat-select", 8);
      \u0275\u0275twoWayListener("ngModelChange", function PaymentListComponent_Template_mat_select_ngModelChange_36_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.paymentMethodFilter, $event) || (ctx.paymentMethodFilter = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function PaymentListComponent_Template_mat_select_selectionChange_36_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementStart(37, "mat-option", 9);
      \u0275\u0275text(38, "All Methods");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "mat-option", 14);
      \u0275\u0275text(40, "Credit Card");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "mat-option", 15);
      \u0275\u0275text(42, "Debit Card");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "mat-option", 16);
      \u0275\u0275text(44, "PayPal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "mat-option", 17);
      \u0275\u0275text(46, "UPI");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "mat-option", 18);
      \u0275\u0275text(48, "Net Banking");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(49, "button", 19);
      \u0275\u0275listener("click", function PaymentListComponent_Template_button_click_49_listener() {
        return ctx.clearFilters();
      });
      \u0275\u0275elementStart(50, "mat-icon");
      \u0275\u0275text(51, "clear");
      \u0275\u0275elementEnd();
      \u0275\u0275text(52, " Clear Filters ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(53, PaymentListComponent_div_53_Template, 4, 0, "div", 20)(54, PaymentListComponent_mat_card_54_Template, 32, 4, "mat-card", 21);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(18);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
      \u0275\u0275advance(14);
      \u0275\u0275twoWayProperty("ngModel", ctx.paymentMethodFilter);
      \u0275\u0275advance(17);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgIf,
    DecimalPipe,
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
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatInput,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatChipsModule,
    MatChip,
    MatChipSet,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatTooltipModule,
    MatTooltip
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n}\n.filter-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.filters[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 40px;\n}\n.loading-container[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.mat-elevation-z2[_ngcontent-%COMP%] {\n  box-shadow:\n    0px 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14),\n    0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.transaction-id[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 0.9rem;\n  background: #f5f5f5;\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.status-pending[_ngcontent-%COMP%] {\n  background-color: #fff3cd !important;\n  color: #856404 !important;\n}\n.status-completed[_ngcontent-%COMP%] {\n  background-color: #d4edda !important;\n  color: #155724 !important;\n}\n.status-failed[_ngcontent-%COMP%] {\n  background-color: #f8d7da !important;\n  color: #721c24 !important;\n}\n.status-refunded[_ngcontent-%COMP%] {\n  background-color: #d1ecf1 !important;\n  color: #0c5460 !important;\n}\n.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n.no-data[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 16px 0 8px 0;\n  color: #333;\n}\n.no-data[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n@media (max-width: 768px) {\n  .filters[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .filters[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: unset;\n  }\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 15px;\n    align-items: stretch;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=payment-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentListComponent, { className: "PaymentListComponent", filePath: "src\\app\\pages\\payments\\payment-list\\payment-list.component.ts", lineNumber: 331 });
})();

// src/app/pages/payments/payment-form/payment-form.component.ts
function PaymentFormComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner");
    \u0275\u0275elementEnd();
  }
}
function PaymentFormComponent_form_14_mat_error_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " User ID is required ");
    \u0275\u0275elementEnd();
  }
}
function PaymentFormComponent_form_14_mat_error_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " User ID must be greater than 0 ");
    \u0275\u0275elementEnd();
  }
}
function PaymentFormComponent_form_14_mat_error_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Course ID is required ");
    \u0275\u0275elementEnd();
  }
}
function PaymentFormComponent_form_14_mat_error_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Course ID must be greater than 0 ");
    \u0275\u0275elementEnd();
  }
}
function PaymentFormComponent_form_14_mat_error_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Amount is required ");
    \u0275\u0275elementEnd();
  }
}
function PaymentFormComponent_form_14_mat_error_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Amount must be greater than 0 ");
    \u0275\u0275elementEnd();
  }
}
function PaymentFormComponent_form_14_mat_error_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Payment method is required ");
    \u0275\u0275elementEnd();
  }
}
function PaymentFormComponent_form_14_mat_error_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Status is required ");
    \u0275\u0275elementEnd();
  }
}
function PaymentFormComponent_form_14_mat_error_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Payment date is required ");
    \u0275\u0275elementEnd();
  }
}
function PaymentFormComponent_form_14_mat_spinner_111_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 40);
  }
}
function PaymentFormComponent_form_14_span_112_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Update Payment" : "Create Payment");
  }
}
function PaymentFormComponent_form_14_span_113_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Updating..." : "Creating...");
  }
}
function PaymentFormComponent_form_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 8);
    \u0275\u0275listener("ngSubmit", function PaymentFormComponent_form_14_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 9)(2, "h3");
    \u0275\u0275text(3, "Transaction Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 10)(5, "mat-form-field", 11)(6, "mat-label");
    \u0275\u0275text(7, "User ID");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 12);
    \u0275\u0275template(9, PaymentFormComponent_form_14_mat_error_9_Template, 2, 0, "mat-error", 13)(10, PaymentFormComponent_form_14_mat_error_10_Template, 2, 0, "mat-error", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-form-field", 11)(12, "mat-label");
    \u0275\u0275text(13, "Course ID");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "input", 14);
    \u0275\u0275template(15, PaymentFormComponent_form_14_mat_error_15_Template, 2, 0, "mat-error", 13)(16, PaymentFormComponent_form_14_mat_error_16_Template, 2, 0, "mat-error", 13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 9)(18, "h3");
    \u0275\u0275text(19, "Payment Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 10)(21, "mat-form-field", 11)(22, "mat-label");
    \u0275\u0275text(23, "Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "input", 15);
    \u0275\u0275elementStart(25, "span", 16);
    \u0275\u0275text(26, "\u20B9\xA0");
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, PaymentFormComponent_form_14_mat_error_27_Template, 2, 0, "mat-error", 13)(28, PaymentFormComponent_form_14_mat_error_28_Template, 2, 0, "mat-error", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "mat-form-field", 11)(30, "mat-label");
    \u0275\u0275text(31, "Payment Method");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "mat-select", 17)(33, "mat-option", 18);
    \u0275\u0275text(34, "Credit Card");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "mat-option", 19);
    \u0275\u0275text(36, "Debit Card");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "mat-option", 20);
    \u0275\u0275text(38, "PayPal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "mat-option", 21);
    \u0275\u0275text(40, "UPI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "mat-option", 22);
    \u0275\u0275text(42, "Net Banking");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "mat-option", 23);
    \u0275\u0275text(44, "Digital Wallet");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(45, PaymentFormComponent_form_14_mat_error_45_Template, 2, 0, "mat-error", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 10)(47, "mat-form-field", 11)(48, "mat-label");
    \u0275\u0275text(49, "Transaction ID");
    \u0275\u0275elementEnd();
    \u0275\u0275element(50, "input", 24);
    \u0275\u0275elementStart(51, "mat-hint");
    \u0275\u0275text(52, "Leave empty to auto-generate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "mat-form-field", 11)(54, "mat-label");
    \u0275\u0275text(55, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "mat-select", 25)(57, "mat-option", 26);
    \u0275\u0275text(58, "Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "mat-option", 27);
    \u0275\u0275text(60, "Completed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "mat-option", 28);
    \u0275\u0275text(62, "Failed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "mat-option", 29);
    \u0275\u0275text(64, "Refunded");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(65, PaymentFormComponent_form_14_mat_error_65_Template, 2, 0, "mat-error", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 10)(67, "mat-form-field", 11)(68, "mat-label");
    \u0275\u0275text(69, "Payment Date");
    \u0275\u0275elementEnd();
    \u0275\u0275element(70, "input", 30)(71, "mat-datepicker-toggle", 31)(72, "mat-datepicker", null, 0);
    \u0275\u0275template(74, PaymentFormComponent_form_14_mat_error_74_Template, 2, 0, "mat-error", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "mat-form-field", 11)(76, "mat-label");
    \u0275\u0275text(77, "Expiry Date");
    \u0275\u0275elementEnd();
    \u0275\u0275element(78, "input", 32)(79, "mat-datepicker-toggle", 31)(80, "mat-datepicker", null, 1);
    \u0275\u0275elementStart(82, "mat-hint");
    \u0275\u0275text(83, "Optional: When payment access expires");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(84, "div", 9)(85, "h3");
    \u0275\u0275text(86, "Additional Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "div", 10)(88, "mat-form-field", 11)(89, "mat-label");
    \u0275\u0275text(90, "Created By (User ID)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(91, "input", 33);
    \u0275\u0275elementStart(92, "mat-hint");
    \u0275\u0275text(93, "ID of user who created this payment record");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(94, "mat-form-field", 11)(95, "mat-label");
    \u0275\u0275text(96, "Modified By (User ID)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(97, "input", 34);
    \u0275\u0275elementStart(98, "mat-hint");
    \u0275\u0275text(99, "ID of user who last modified this payment record");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(100, "div", 10)(101, "mat-form-field", 11)(102, "mat-label");
    \u0275\u0275text(103, "Comments");
    \u0275\u0275elementEnd();
    \u0275\u0275element(104, "textarea", 35);
    \u0275\u0275elementStart(105, "mat-hint");
    \u0275\u0275text(106, "Optional comments or notes");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(107, "div", 36)(108, "button", 37);
    \u0275\u0275listener("click", function PaymentFormComponent_form_14_Template_button_click_108_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCancel());
    });
    \u0275\u0275text(109, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(110, "button", 38);
    \u0275\u0275template(111, PaymentFormComponent_form_14_mat_spinner_111_Template, 1, 0, "mat-spinner", 39)(112, PaymentFormComponent_form_14_span_112_Template, 2, 1, "span", 13)(113, PaymentFormComponent_form_14_span_113_Template, 2, 1, "span", 13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_14_0;
    const picker_r3 = \u0275\u0275reference(73);
    const expiryPicker_r4 = \u0275\u0275reference(81);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.paymentForm);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", (tmp_4_0 = ctx_r1.paymentForm.get("loginId")) == null ? null : tmp_4_0.hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_5_0 = ctx_r1.paymentForm.get("loginId")) == null ? null : tmp_5_0.hasError("min"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", (tmp_6_0 = ctx_r1.paymentForm.get("courseId")) == null ? null : tmp_6_0.hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_7_0 = ctx_r1.paymentForm.get("courseId")) == null ? null : tmp_7_0.hasError("min"));
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", (tmp_8_0 = ctx_r1.paymentForm.get("amount")) == null ? null : tmp_8_0.hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_9_0 = ctx_r1.paymentForm.get("amount")) == null ? null : tmp_9_0.hasError("min"));
    \u0275\u0275advance(17);
    \u0275\u0275property("ngIf", (tmp_10_0 = ctx_r1.paymentForm.get("paymentMethod")) == null ? null : tmp_10_0.hasError("required"));
    \u0275\u0275advance(20);
    \u0275\u0275property("ngIf", (tmp_11_0 = ctx_r1.paymentForm.get("status")) == null ? null : tmp_11_0.hasError("required"));
    \u0275\u0275advance(5);
    \u0275\u0275property("matDatepicker", picker_r3);
    \u0275\u0275advance();
    \u0275\u0275property("for", picker_r3);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", (tmp_14_0 = ctx_r1.paymentForm.get("paymentDate")) == null ? null : tmp_14_0.hasError("required"));
    \u0275\u0275advance(4);
    \u0275\u0275property("matDatepicker", expiryPicker_r4);
    \u0275\u0275advance();
    \u0275\u0275property("for", expiryPicker_r4);
    \u0275\u0275advance(31);
    \u0275\u0275property("disabled", ctx_r1.paymentForm.invalid || ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitting);
  }
}
var PaymentFormComponent = class _PaymentFormComponent {
  fb;
  paymentService;
  userService;
  courseService;
  router;
  route;
  snackBar;
  paymentForm;
  isEditMode = false;
  paymentId = null;
  loading = false;
  submitting = false;
  constructor(fb, paymentService, userService, courseService, router, route, snackBar) {
    this.fb = fb;
    this.paymentService = paymentService;
    this.userService = userService;
    this.courseService = courseService;
    this.router = router;
    this.route = route;
    this.snackBar = snackBar;
    this.createForm();
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.isEditMode = true;
        this.paymentId = +params["id"];
        this.loadPayment();
      }
    });
  }
  createForm() {
    this.paymentForm = this.fb.group({
      loginId: ["", [Validators.required, Validators.min(1)]],
      courseId: ["", [Validators.required, Validators.min(1)]],
      amount: ["", [Validators.required, Validators.min(0.01)]],
      paymentMethod: ["", Validators.required],
      transactionId: [""],
      status: ["pending", Validators.required],
      paymentDate: [/* @__PURE__ */ new Date(), Validators.required],
      expiryDate: [""],
      createdBy: [""],
      modifiedBy: [""],
      comments: [""]
    });
  }
  loadPayment() {
    if (!this.paymentId)
      return;
    this.loading = true;
    this.paymentService.getPaymentById(this.paymentId).subscribe({
      next: (payment) => {
        this.paymentForm.patchValue({
          loginId: payment.loginId,
          courseId: payment.courseId,
          amount: payment.amount,
          paymentMethod: payment.paymentMethod,
          transactionId: payment.transactionId,
          status: payment.status,
          paymentDate: payment.paymentDate ? new Date(payment.paymentDate) : /* @__PURE__ */ new Date(),
          expiryDate: payment.expiryDate ? new Date(payment.expiryDate) : null,
          createdBy: payment.createdBy,
          modifiedBy: payment.modifiedBy,
          comments: payment.comments
        });
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading payment:", error);
        this.snackBar.open("Error loading payment details", "Close", {
          duration: 3e3
        });
        this.loading = false;
        this.goBack();
      }
    });
  }
  onSubmit() {
    if (this.paymentForm.valid) {
      this.submitting = true;
      const formValue = __spreadValues({}, this.paymentForm.value);
      if (formValue.paymentDate instanceof Date) {
        formValue.paymentDate = formValue.paymentDate.toISOString();
      }
      if (formValue.expiryDate instanceof Date) {
        formValue.expiryDate = formValue.expiryDate.toISOString();
      }
      if (!formValue.transactionId) {
        formValue.transactionId = this.generateTransactionId();
      }
      const paymentData = __spreadValues(__spreadValues({}, formValue), this.isEditMode && { paymentId: this.paymentId });
      const request = this.isEditMode ? this.paymentService.updatePayment(this.paymentId, paymentData) : this.paymentService.createPayment(paymentData);
      request.subscribe({
        next: () => {
          const message = this.isEditMode ? "Payment updated successfully" : "Payment created successfully";
          this.snackBar.open(message, "Close", { duration: 3e3 });
          this.router.navigate(["/payments"]);
        },
        error: (error) => {
          console.error("Error saving payment:", error);
          const message = error.error?.message || "Error saving payment";
          this.snackBar.open(message, "Close", { duration: 5e3 });
          this.submitting = false;
        }
      });
    }
  }
  onCancel() {
    this.goBack();
  }
  goBack() {
    this.router.navigate(["/payments"]);
  }
  generateTransactionId() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8);
    return `TXN${timestamp}${random}`.toUpperCase();
  }
  static \u0275fac = function PaymentFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaymentFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(CourseService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentFormComponent, selectors: [["app-payment-form"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 15, vars: 4, consts: [["picker", ""], ["expiryPicker", ""], [1, "container"], [1, "header"], ["mat-button", "", 3, "click"], ["class", "loading-container", 4, "ngIf"], ["class", "payment-form", 3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "loading-container"], [1, "payment-form", 3, "ngSubmit", "formGroup"], [1, "section"], [1, "form-row"], ["appearance", "fill", 1, "full-width"], ["matInput", "", "type", "number", "formControlName", "loginId", "required", ""], [4, "ngIf"], ["matInput", "", "type", "number", "formControlName", "courseId", "required", ""], ["matInput", "", "type", "number", "formControlName", "amount", "required", "", "step", "0.01", "min", "0"], ["matPrefix", ""], ["formControlName", "paymentMethod", "required", ""], ["value", "credit_card"], ["value", "debit_card"], ["value", "paypal"], ["value", "upi"], ["value", "net_banking"], ["value", "wallet"], ["matInput", "", "formControlName", "transactionId", "placeholder", "Auto-generated if empty"], ["formControlName", "status", "required", ""], ["value", "pending"], ["value", "completed"], ["value", "failed"], ["value", "refunded"], ["matInput", "", "formControlName", "paymentDate", "required", "", 3, "matDatepicker"], ["matSuffix", "", 3, "for"], ["matInput", "", "formControlName", "expiryDate", 3, "matDatepicker"], ["matInput", "", "type", "number", "formControlName", "createdBy", "min", "1"], ["matInput", "", "type", "number", "formControlName", "modifiedBy", "min", "1"], ["matInput", "", "formControlName", "comments", "rows", "3", "placeholder", "Additional notes about the payment"], [1, "form-actions"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20", 4, "ngIf"], ["diameter", "20"]], template: function PaymentFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 4);
      \u0275\u0275listener("click", function PaymentFormComponent_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(5, "mat-icon");
      \u0275\u0275text(6, "arrow_back");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Back to Payments ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card")(9, "mat-card-header")(10, "mat-card-title");
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "mat-card-content");
      \u0275\u0275template(13, PaymentFormComponent_div_13_Template, 2, 0, "div", 5)(14, PaymentFormComponent_form_14_Template, 114, 18, "form", 6);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit Payment" : "Add New Payment");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit Payment Details" : "Payment Information");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
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
    MinValidator,
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
    MatHint,
    MatError,
    MatPrefix,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
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
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 40px;\n}\n.payment-form[_ngcontent-%COMP%] {\n  padding: 20px 0;\n}\n.section[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n}\n.section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  color: #333;\n  border-bottom: 2px solid #e0e0e0;\n  padding-bottom: 8px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  margin-bottom: 20px;\n}\n.form-row[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 15px;\n  margin-top: 30px;\n  padding-top: 20px;\n  border-top: 1px solid #e0e0e0;\n}\nmat-card[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\nmat-card-header[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  margin: -24px -24px 0 -24px;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e0e0e0;\n}\nmat-card-title[_ngcontent-%COMP%] {\n  color: #333;\n  font-size: 1.2rem;\n}\n@media (max-width: 768px) {\n  .container[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0;\n  }\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 15px;\n    align-items: stretch;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.mat-form-field.ng-invalid.ng-touched[_ngcontent-%COMP%]   .mat-form-field-outline-thick[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.mat-form-field.ng-invalid.ng-touched[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n/*# sourceMappingURL=payment-form.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentFormComponent, { className: "PaymentFormComponent", filePath: "src\\app\\pages\\payments\\payment-form\\payment-form.component.ts", lineNumber: 317 });
})();

// src/app/pages/payments/payments.routes.ts
var PAYMENT_ROUTES = [
  { path: "", component: PaymentListComponent },
  { path: "add", component: PaymentFormComponent },
  { path: "edit/:id", component: PaymentFormComponent }
];
export {
  PAYMENT_ROUTES
};
//# sourceMappingURL=chunk-GEEAIGSK.mjs.map
