import './polyfills.server.mjs';
import {
  AuthService
} from "./chunk-YEMU37C6.mjs";
import {
  MatChipsModule
} from "./chunk-H6LW7J6K.mjs";
import {
  MatDividerModule
} from "./chunk-3XSTCTVE.mjs";
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-ZFEZQRSD.mjs";
import "./chunk-7VTN37JO.mjs";
import "./chunk-OKVPDLGM.mjs";
import {
  Directionality,
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatIcon,
  MatIconModule,
  MatLine,
  MatLineModule,
  coerceNumberProperty,
  environment,
  setLines
} from "./chunk-FNH7JYNE.mjs";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  ContentChildren,
  DOCUMENT,
  Directive,
  ElementRef,
  EventEmitter,
  HttpClient,
  Inject,
  InjectionToken,
  Input,
  NgForOf,
  NgIf,
  NgModule,
  NgZone,
  Optional,
  Output,
  ViewEncapsulation$1,
  inject,
  numberAttribute,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵInputTransformsFeature,
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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-NFLUKIXG.mjs";
import "./chunk-PTRYWQQD.mjs";

// node_modules/@angular/material/fesm2022/progress-bar.mjs
function MatProgressBar_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 2);
  }
}
var MAT_PROGRESS_BAR_DEFAULT_OPTIONS = new InjectionToken("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");
var MAT_PROGRESS_BAR_LOCATION = new InjectionToken("mat-progress-bar-location", {
  providedIn: "root",
  factory: MAT_PROGRESS_BAR_LOCATION_FACTORY
});
function MAT_PROGRESS_BAR_LOCATION_FACTORY() {
  const _document = inject(DOCUMENT);
  const _location = _document ? _document.location : null;
  return {
    // Note that this needs to be a function, rather than a property, because Angular
    // will only resolve it once, but we want the current path on each call.
    getPathname: () => _location ? _location.pathname + _location.search : ""
  };
}
var MatProgressBar = class _MatProgressBar {
  constructor(_elementRef, _ngZone, _changeDetectorRef, _animationMode, defaults) {
    this._elementRef = _elementRef;
    this._ngZone = _ngZone;
    this._changeDetectorRef = _changeDetectorRef;
    this._animationMode = _animationMode;
    this._isNoopAnimation = false;
    this._defaultColor = "primary";
    this._value = 0;
    this._bufferValue = 0;
    this.animationEnd = new EventEmitter();
    this._mode = "determinate";
    this._transitionendHandler = (event) => {
      if (this.animationEnd.observers.length === 0 || !event.target || !event.target.classList.contains("mdc-linear-progress__primary-bar")) {
        return;
      }
      if (this.mode === "determinate" || this.mode === "buffer") {
        this._ngZone.run(() => this.animationEnd.next({
          value: this.value
        }));
      }
    };
    this._isNoopAnimation = _animationMode === "NoopAnimations";
    if (defaults) {
      if (defaults.color) {
        this.color = this._defaultColor = defaults.color;
      }
      this.mode = defaults.mode || this.mode;
    }
  }
  // TODO: should be typed as `ThemePalette` but internal apps pass in arbitrary strings.
  /**
   * Theme color of the progress bar. This API is supported in M2 themes only, it
   * has no effect in M3 themes.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.io/guide/theming#using-component-color-variants.
   */
  get color() {
    return this._color || this._defaultColor;
  }
  set color(value) {
    this._color = value;
  }
  /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = clamp(v || 0);
    this._changeDetectorRef.markForCheck();
  }
  /** Buffer value of the progress bar. Defaults to zero. */
  get bufferValue() {
    return this._bufferValue || 0;
  }
  set bufferValue(v) {
    this._bufferValue = clamp(v || 0);
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Mode of the progress bar.
   *
   * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
   * 'determinate'.
   * Mirrored to mode attribute.
   */
  get mode() {
    return this._mode;
  }
  set mode(value) {
    this._mode = value;
    this._changeDetectorRef.markForCheck();
  }
  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._elementRef.nativeElement.addEventListener("transitionend", this._transitionendHandler);
    });
  }
  ngOnDestroy() {
    this._elementRef.nativeElement.removeEventListener("transitionend", this._transitionendHandler);
  }
  /** Gets the transform style that should be applied to the primary bar. */
  _getPrimaryBarTransform() {
    return `scaleX(${this._isIndeterminate() ? 1 : this.value / 100})`;
  }
  /** Gets the `flex-basis` value that should be applied to the buffer bar. */
  _getBufferBarFlexBasis() {
    return `${this.mode === "buffer" ? this.bufferValue : 100}%`;
  }
  /** Returns whether the progress bar is indeterminate. */
  _isIndeterminate() {
    return this.mode === "indeterminate" || this.mode === "query";
  }
  static {
    this.\u0275fac = function MatProgressBar_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatProgressBar)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8), \u0275\u0275directiveInject(MAT_PROGRESS_BAR_DEFAULT_OPTIONS, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatProgressBar,
      selectors: [["mat-progress-bar"]],
      hostAttrs: ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", "tabindex", "-1", 1, "mat-mdc-progress-bar", "mdc-linear-progress"],
      hostVars: 10,
      hostBindings: function MatProgressBar_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("aria-valuenow", ctx._isIndeterminate() ? null : ctx.value)("mode", ctx.mode);
          \u0275\u0275classMap("mat-" + ctx.color);
          \u0275\u0275classProp("_mat-animation-noopable", ctx._isNoopAnimation)("mdc-linear-progress--animation-ready", !ctx._isNoopAnimation)("mdc-linear-progress--indeterminate", ctx._isIndeterminate());
        }
      },
      inputs: {
        color: "color",
        value: [2, "value", "value", numberAttribute],
        bufferValue: [2, "bufferValue", "bufferValue", numberAttribute],
        mode: "mode"
      },
      outputs: {
        animationEnd: "animationEnd"
      },
      exportAs: ["matProgressBar"],
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature, \u0275\u0275StandaloneFeature],
      decls: 7,
      vars: 5,
      consts: [["aria-hidden", "true", 1, "mdc-linear-progress__buffer"], [1, "mdc-linear-progress__buffer-bar"], [1, "mdc-linear-progress__buffer-dots"], ["aria-hidden", "true", 1, "mdc-linear-progress__bar", "mdc-linear-progress__primary-bar"], [1, "mdc-linear-progress__bar-inner"], ["aria-hidden", "true", 1, "mdc-linear-progress__bar", "mdc-linear-progress__secondary-bar"]],
      template: function MatProgressBar_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275elementStart(0, "div", 0);
          \u0275\u0275element(1, "div", 1);
          \u0275\u0275template(2, MatProgressBar_Conditional_2_Template, 1, 0, "div", 2);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(3, "div", 3);
          \u0275\u0275element(4, "span", 4);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(5, "div", 5);
          \u0275\u0275element(6, "span", 4);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          \u0275\u0275advance();
          \u0275\u0275styleProp("flex-basis", ctx._getBufferBarFlexBasis());
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.mode === "buffer" ? 2 : -1);
          \u0275\u0275advance();
          \u0275\u0275styleProp("transform", ctx._getPrimaryBarTransform());
        }
      },
      styles: [`.mat-mdc-progress-bar{display:block;text-align:start}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:max(var(--mdc-linear-progress-track-height),var(--mdc-linear-progress-active-indicator-height))}.cdk-high-contrast-active .mdc-linear-progress{outline-color:CanvasText}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:var(--mdc-linear-progress-active-indicator-height)}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}[dir=rtl] .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid;border-color:var(--mdc-linear-progress-active-indicator-color, var(--mat-app-primary));border-top-width:var(--mdc-linear-progress-active-indicator-height)}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden;height:var(--mdc-linear-progress-track-height);border-radius:var(--mdc-linear-progress-track-shape, var(--mat-app-corner-none))}.mdc-linear-progress__buffer-dots{-webkit-mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");background-repeat:repeat-x;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering 250ms infinite linear;background-color:var(--mdc-linear-progress-track-color, var(--mat-app-surface-variant))}.cdk-high-contrast-active .mdc-linear-progress__buffer-dots{background-color:ButtonBorder}[dir=rtl] .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;transform:rotate(0)}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);background-color:var(--mdc-linear-progress-track-color, var(--mat-app-surface-variant))}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mdc-linear-progress-track-height) * -2.5))}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}`],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressBar, [{
    type: Component,
    args: [{
      selector: "mat-progress-bar",
      exportAs: "matProgressBar",
      host: {
        "role": "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        // set tab index to -1 so screen readers will read the aria-label
        // Note: there is a known issue with JAWS that does not read progressbar aria labels on FireFox
        "tabindex": "-1",
        "[attr.aria-valuenow]": "_isIndeterminate() ? null : value",
        "[attr.mode]": "mode",
        "class": "mat-mdc-progress-bar mdc-linear-progress",
        "[class]": '"mat-" + color',
        "[class._mat-animation-noopable]": "_isNoopAnimation",
        "[class.mdc-linear-progress--animation-ready]": "!_isNoopAnimation",
        "[class.mdc-linear-progress--indeterminate]": "_isIndeterminate()"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      standalone: true,
      template: `<!--
  All children need to be hidden for screen readers in order to support ChromeVox.
  More context in the issue: https://github.com/angular/components/issues/22165.
-->
<div class="mdc-linear-progress__buffer" aria-hidden="true">
  <div
    class="mdc-linear-progress__buffer-bar"
    [style.flex-basis]="_getBufferBarFlexBasis()"></div>
  <!-- Remove the dots outside of buffer mode since they can cause CSP issues (see #28938) -->
  @if (mode === 'buffer') {
    <div class="mdc-linear-progress__buffer-dots"></div>
  }
</div>
<div
  class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
  aria-hidden="true"
  [style.transform]="_getPrimaryBarTransform()">
  <span class="mdc-linear-progress__bar-inner"></span>
</div>
<div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar" aria-hidden="true">
  <span class="mdc-linear-progress__bar-inner"></span>
</div>
`,
      styles: [`.mat-mdc-progress-bar{display:block;text-align:start}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:max(var(--mdc-linear-progress-track-height),var(--mdc-linear-progress-active-indicator-height))}.cdk-high-contrast-active .mdc-linear-progress{outline-color:CanvasText}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:var(--mdc-linear-progress-active-indicator-height)}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}[dir=rtl] .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid;border-color:var(--mdc-linear-progress-active-indicator-color, var(--mat-app-primary));border-top-width:var(--mdc-linear-progress-active-indicator-height)}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden;height:var(--mdc-linear-progress-track-height);border-radius:var(--mdc-linear-progress-track-shape, var(--mat-app-corner-none))}.mdc-linear-progress__buffer-dots{-webkit-mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");background-repeat:repeat-x;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering 250ms infinite linear;background-color:var(--mdc-linear-progress-track-color, var(--mat-app-surface-variant))}.cdk-high-contrast-active .mdc-linear-progress__buffer-dots{background-color:ButtonBorder}[dir=rtl] .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;transform:rotate(0)}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);background-color:var(--mdc-linear-progress-track-color, var(--mat-app-surface-variant))}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mdc-linear-progress-track-height) * -2.5))}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}`]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }, {
    type: ChangeDetectorRef
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
      type: Optional
    }, {
      type: Inject,
      args: [MAT_PROGRESS_BAR_DEFAULT_OPTIONS]
    }]
  }], {
    color: [{
      type: Input
    }],
    value: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    bufferValue: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    animationEnd: [{
      type: Output
    }],
    mode: [{
      type: Input
    }]
  });
})();
function clamp(v, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}
var MatProgressBarModule = class _MatProgressBarModule {
  static {
    this.\u0275fac = function MatProgressBarModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatProgressBarModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatProgressBarModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressBarModule, [{
    type: NgModule,
    args: [{
      imports: [MatProgressBar],
      exports: [MatProgressBar, MatCommonModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/grid-list.mjs
var _c0 = ["*"];
var _c1 = [[["", "mat-grid-avatar", ""], ["", "matGridAvatar", ""]], [["", "mat-line", ""], ["", "matLine", ""]], "*"];
var _c2 = ["[mat-grid-avatar], [matGridAvatar]", "[mat-line], [matLine]", "*"];
var _c3 = ".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size, var(--mat-app-body-large))}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size, var(--mat-app-body-medium))}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size, var(--mat-app-body-large))}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size, var(--mat-app-body-medium))}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}";
var TileCoordinator = class {
  constructor() {
    this.columnIndex = 0;
    this.rowIndex = 0;
  }
  /** Gets the total number of rows occupied by tiles */
  get rowCount() {
    return this.rowIndex + 1;
  }
  /**
   * Gets the total span of rows occupied by tiles.
   * Ex: A list with 1 row that contains a tile with rowspan 2 will have a total rowspan of 2.
   */
  get rowspan() {
    const lastRowMax = Math.max(...this.tracker);
    return lastRowMax > 1 ? this.rowCount + lastRowMax - 1 : this.rowCount;
  }
  /**
   * Updates the tile positions.
   * @param numColumns Amount of columns in the grid.
   * @param tiles Tiles to be positioned.
   */
  update(numColumns, tiles) {
    this.columnIndex = 0;
    this.rowIndex = 0;
    this.tracker = new Array(numColumns);
    this.tracker.fill(0, 0, this.tracker.length);
    this.positions = tiles.map((tile) => this._trackTile(tile));
  }
  /** Calculates the row and col position of a tile. */
  _trackTile(tile) {
    const gapStartIndex = this._findMatchingGap(tile.colspan);
    this._markTilePosition(gapStartIndex, tile);
    this.columnIndex = gapStartIndex + tile.colspan;
    return new TilePosition(this.rowIndex, gapStartIndex);
  }
  /** Finds the next available space large enough to fit the tile. */
  _findMatchingGap(tileCols) {
    if (tileCols > this.tracker.length && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`mat-grid-list: tile with colspan ${tileCols} is wider than grid with cols="${this.tracker.length}".`);
    }
    let gapStartIndex = -1;
    let gapEndIndex = -1;
    do {
      if (this.columnIndex + tileCols > this.tracker.length) {
        this._nextRow();
        gapStartIndex = this.tracker.indexOf(0, this.columnIndex);
        gapEndIndex = this._findGapEndIndex(gapStartIndex);
        continue;
      }
      gapStartIndex = this.tracker.indexOf(0, this.columnIndex);
      if (gapStartIndex == -1) {
        this._nextRow();
        gapStartIndex = this.tracker.indexOf(0, this.columnIndex);
        gapEndIndex = this._findGapEndIndex(gapStartIndex);
        continue;
      }
      gapEndIndex = this._findGapEndIndex(gapStartIndex);
      this.columnIndex = gapStartIndex + 1;
    } while (gapEndIndex - gapStartIndex < tileCols || gapEndIndex == 0);
    return Math.max(gapStartIndex, 0);
  }
  /** Move "down" to the next row. */
  _nextRow() {
    this.columnIndex = 0;
    this.rowIndex++;
    for (let i = 0; i < this.tracker.length; i++) {
      this.tracker[i] = Math.max(0, this.tracker[i] - 1);
    }
  }
  /**
   * Finds the end index (exclusive) of a gap given the index from which to start looking.
   * The gap ends when a non-zero value is found.
   */
  _findGapEndIndex(gapStartIndex) {
    for (let i = gapStartIndex + 1; i < this.tracker.length; i++) {
      if (this.tracker[i] != 0) {
        return i;
      }
    }
    return this.tracker.length;
  }
  /** Update the tile tracker to account for the given tile in the given space. */
  _markTilePosition(start, tile) {
    for (let i = 0; i < tile.colspan; i++) {
      this.tracker[start + i] = tile.rowspan;
    }
  }
};
var TilePosition = class {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
};
var MAT_GRID_LIST = new InjectionToken("MAT_GRID_LIST");
var MatGridTile = class _MatGridTile {
  constructor(_element, _gridList) {
    this._element = _element;
    this._gridList = _gridList;
    this._rowspan = 1;
    this._colspan = 1;
  }
  /** Amount of rows that the grid tile takes up. */
  get rowspan() {
    return this._rowspan;
  }
  set rowspan(value) {
    this._rowspan = Math.round(coerceNumberProperty(value));
  }
  /** Amount of columns that the grid tile takes up. */
  get colspan() {
    return this._colspan;
  }
  set colspan(value) {
    this._colspan = Math.round(coerceNumberProperty(value));
  }
  /**
   * Sets the style of the grid-tile element.  Needs to be set manually to avoid
   * "Changed after checked" errors that would occur with HostBinding.
   */
  _setStyle(property, value) {
    this._element.nativeElement.style[property] = value;
  }
  static {
    this.\u0275fac = function MatGridTile_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatGridTile)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(MAT_GRID_LIST, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatGridTile,
      selectors: [["mat-grid-tile"]],
      hostAttrs: [1, "mat-grid-tile"],
      hostVars: 2,
      hostBindings: function MatGridTile_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("rowspan", ctx.rowspan)("colspan", ctx.colspan);
        }
      },
      inputs: {
        rowspan: "rowspan",
        colspan: "colspan"
      },
      exportAs: ["matGridTile"],
      standalone: true,
      features: [\u0275\u0275StandaloneFeature],
      ngContentSelectors: _c0,
      decls: 2,
      vars: 0,
      consts: [[1, "mat-grid-tile-content"]],
      template: function MatGridTile_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "div", 0);
          \u0275\u0275projection(1);
          \u0275\u0275elementEnd();
        }
      },
      styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size, var(--mat-app-body-large))}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size, var(--mat-app-body-medium))}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size, var(--mat-app-body-large))}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size, var(--mat-app-body-medium))}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridTile, [{
    type: Component,
    args: [{
      selector: "mat-grid-tile",
      exportAs: "matGridTile",
      host: {
        "class": "mat-grid-tile",
        // Ensures that the "rowspan" and "colspan" input value is reflected in
        // the DOM. This is needed for the grid-tile harness.
        "[attr.rowspan]": "rowspan",
        "[attr.colspan]": "colspan"
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      template: '<div class="mat-grid-tile-content">\n  <ng-content></ng-content>\n</div>\n',
      styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size, var(--mat-app-body-large))}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size, var(--mat-app-body-medium))}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size, var(--mat-app-body-large))}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size, var(--mat-app-body-medium))}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_GRID_LIST]
    }]
  }], {
    rowspan: [{
      type: Input
    }],
    colspan: [{
      type: Input
    }]
  });
})();
var MatGridTileText = class _MatGridTileText {
  constructor(_element) {
    this._element = _element;
  }
  ngAfterContentInit() {
    setLines(this._lines, this._element);
  }
  static {
    this.\u0275fac = function MatGridTileText_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatGridTileText)(\u0275\u0275directiveInject(ElementRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatGridTileText,
      selectors: [["mat-grid-tile-header"], ["mat-grid-tile-footer"]],
      contentQueries: function MatGridTileText_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatLine, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._lines = _t);
        }
      },
      standalone: true,
      features: [\u0275\u0275StandaloneFeature],
      ngContentSelectors: _c2,
      decls: 4,
      vars: 0,
      consts: [[1, "mat-grid-list-text"]],
      template: function MatGridTileText_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef(_c1);
          \u0275\u0275projection(0);
          \u0275\u0275elementStart(1, "div", 0);
          \u0275\u0275projection(2, 1);
          \u0275\u0275elementEnd();
          \u0275\u0275projection(3, 2);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridTileText, [{
    type: Component,
    args: [{
      selector: "mat-grid-tile-header, mat-grid-tile-footer",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      standalone: true,
      template: '<ng-content select="[mat-grid-avatar], [matGridAvatar]"></ng-content>\n<div class="mat-grid-list-text"><ng-content select="[mat-line], [matLine]"></ng-content></div>\n<ng-content></ng-content>\n'
    }]
  }], () => [{
    type: ElementRef
  }], {
    _lines: [{
      type: ContentChildren,
      args: [MatLine, {
        descendants: true
      }]
    }]
  });
})();
var MatGridAvatarCssMatStyler = class _MatGridAvatarCssMatStyler {
  static {
    this.\u0275fac = function MatGridAvatarCssMatStyler_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatGridAvatarCssMatStyler)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatGridAvatarCssMatStyler,
      selectors: [["", "mat-grid-avatar", ""], ["", "matGridAvatar", ""]],
      hostAttrs: [1, "mat-grid-avatar"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridAvatarCssMatStyler, [{
    type: Directive,
    args: [{
      selector: "[mat-grid-avatar], [matGridAvatar]",
      host: {
        "class": "mat-grid-avatar"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatGridTileHeaderCssMatStyler = class _MatGridTileHeaderCssMatStyler {
  static {
    this.\u0275fac = function MatGridTileHeaderCssMatStyler_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatGridTileHeaderCssMatStyler)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatGridTileHeaderCssMatStyler,
      selectors: [["mat-grid-tile-header"]],
      hostAttrs: [1, "mat-grid-tile-header"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridTileHeaderCssMatStyler, [{
    type: Directive,
    args: [{
      selector: "mat-grid-tile-header",
      host: {
        "class": "mat-grid-tile-header"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatGridTileFooterCssMatStyler = class _MatGridTileFooterCssMatStyler {
  static {
    this.\u0275fac = function MatGridTileFooterCssMatStyler_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatGridTileFooterCssMatStyler)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatGridTileFooterCssMatStyler,
      selectors: [["mat-grid-tile-footer"]],
      hostAttrs: [1, "mat-grid-tile-footer"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridTileFooterCssMatStyler, [{
    type: Directive,
    args: [{
      selector: "mat-grid-tile-footer",
      host: {
        "class": "mat-grid-tile-footer"
      },
      standalone: true
    }]
  }], null, null);
})();
var cssCalcAllowedValue = /^-?\d+((\.\d+)?[A-Za-z%$]?)+$/;
var TileStyler = class {
  constructor() {
    this._rows = 0;
    this._rowspan = 0;
  }
  /**
   * Adds grid-list layout info once it is available. Cannot be processed in the constructor
   * because these properties haven't been calculated by that point.
   *
   * @param gutterSize Size of the grid's gutter.
   * @param tracker Instance of the TileCoordinator.
   * @param cols Amount of columns in the grid.
   * @param direction Layout direction of the grid.
   */
  init(gutterSize, tracker, cols, direction) {
    this._gutterSize = normalizeUnits(gutterSize);
    this._rows = tracker.rowCount;
    this._rowspan = tracker.rowspan;
    this._cols = cols;
    this._direction = direction;
  }
  /**
   * Computes the amount of space a single 1x1 tile would take up (width or height).
   * Used as a basis for other calculations.
   * @param sizePercent Percent of the total grid-list space that one 1x1 tile would take up.
   * @param gutterFraction Fraction of the gutter size taken up by one 1x1 tile.
   * @return The size of a 1x1 tile as an expression that can be evaluated via CSS calc().
   */
  getBaseTileSize(sizePercent, gutterFraction) {
    return `(${sizePercent}% - (${this._gutterSize} * ${gutterFraction}))`;
  }
  /**
   * Gets The horizontal or vertical position of a tile, e.g., the 'top' or 'left' property value.
   * @param offset Number of tiles that have already been rendered in the row/column.
   * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
   * @return Position of the tile as a CSS calc() expression.
   */
  getTilePosition(baseSize, offset) {
    return offset === 0 ? "0" : calc(`(${baseSize} + ${this._gutterSize}) * ${offset}`);
  }
  /**
   * Gets the actual size of a tile, e.g., width or height, taking rowspan or colspan into account.
   * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
   * @param span The tile's rowspan or colspan.
   * @return Size of the tile as a CSS calc() expression.
   */
  getTileSize(baseSize, span) {
    return `(${baseSize} * ${span}) + (${span - 1} * ${this._gutterSize})`;
  }
  /**
   * Sets the style properties to be applied to a tile for the given row and column index.
   * @param tile Tile to which to apply the styling.
   * @param rowIndex Index of the tile's row.
   * @param colIndex Index of the tile's column.
   */
  setStyle(tile, rowIndex, colIndex) {
    let percentWidthPerTile = 100 / this._cols;
    let gutterWidthFractionPerTile = (this._cols - 1) / this._cols;
    this.setColStyles(tile, colIndex, percentWidthPerTile, gutterWidthFractionPerTile);
    this.setRowStyles(tile, rowIndex, percentWidthPerTile, gutterWidthFractionPerTile);
  }
  /** Sets the horizontal placement of the tile in the list. */
  setColStyles(tile, colIndex, percentWidth, gutterWidth) {
    let baseTileWidth = this.getBaseTileSize(percentWidth, gutterWidth);
    let side = this._direction === "rtl" ? "right" : "left";
    tile._setStyle(side, this.getTilePosition(baseTileWidth, colIndex));
    tile._setStyle("width", calc(this.getTileSize(baseTileWidth, tile.colspan)));
  }
  /**
   * Calculates the total size taken up by gutters across one axis of a list.
   */
  getGutterSpan() {
    return `${this._gutterSize} * (${this._rowspan} - 1)`;
  }
  /**
   * Calculates the total size taken up by tiles across one axis of a list.
   * @param tileHeight Height of the tile.
   */
  getTileSpan(tileHeight) {
    return `${this._rowspan} * ${this.getTileSize(tileHeight, 1)}`;
  }
  /**
   * Calculates the computed height and returns the correct style property to set.
   * This method can be implemented by each type of TileStyler.
   * @docs-private
   */
  getComputedHeight() {
    return null;
  }
};
var FixedTileStyler = class extends TileStyler {
  constructor(fixedRowHeight) {
    super();
    this.fixedRowHeight = fixedRowHeight;
  }
  init(gutterSize, tracker, cols, direction) {
    super.init(gutterSize, tracker, cols, direction);
    this.fixedRowHeight = normalizeUnits(this.fixedRowHeight);
    if (!cssCalcAllowedValue.test(this.fixedRowHeight) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`Invalid value "${this.fixedRowHeight}" set as rowHeight.`);
    }
  }
  setRowStyles(tile, rowIndex) {
    tile._setStyle("top", this.getTilePosition(this.fixedRowHeight, rowIndex));
    tile._setStyle("height", calc(this.getTileSize(this.fixedRowHeight, tile.rowspan)));
  }
  getComputedHeight() {
    return ["height", calc(`${this.getTileSpan(this.fixedRowHeight)} + ${this.getGutterSpan()}`)];
  }
  reset(list) {
    list._setListStyle(["height", null]);
    if (list._tiles) {
      list._tiles.forEach((tile) => {
        tile._setStyle("top", null);
        tile._setStyle("height", null);
      });
    }
  }
};
var RatioTileStyler = class extends TileStyler {
  constructor(value) {
    super();
    this._parseRatio(value);
  }
  setRowStyles(tile, rowIndex, percentWidth, gutterWidth) {
    let percentHeightPerTile = percentWidth / this.rowHeightRatio;
    this.baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterWidth);
    tile._setStyle("marginTop", this.getTilePosition(this.baseTileHeight, rowIndex));
    tile._setStyle("paddingTop", calc(this.getTileSize(this.baseTileHeight, tile.rowspan)));
  }
  getComputedHeight() {
    return ["paddingBottom", calc(`${this.getTileSpan(this.baseTileHeight)} + ${this.getGutterSpan()}`)];
  }
  reset(list) {
    list._setListStyle(["paddingBottom", null]);
    list._tiles.forEach((tile) => {
      tile._setStyle("marginTop", null);
      tile._setStyle("paddingTop", null);
    });
  }
  _parseRatio(value) {
    const ratioParts = value.split(":");
    if (ratioParts.length !== 2 && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`mat-grid-list: invalid ratio given for row-height: "${value}"`);
    }
    this.rowHeightRatio = parseFloat(ratioParts[0]) / parseFloat(ratioParts[1]);
  }
};
var FitTileStyler = class extends TileStyler {
  setRowStyles(tile, rowIndex) {
    let percentHeightPerTile = 100 / this._rowspan;
    let gutterHeightPerTile = (this._rows - 1) / this._rows;
    let baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterHeightPerTile);
    tile._setStyle("top", this.getTilePosition(baseTileHeight, rowIndex));
    tile._setStyle("height", calc(this.getTileSize(baseTileHeight, tile.rowspan)));
  }
  reset(list) {
    if (list._tiles) {
      list._tiles.forEach((tile) => {
        tile._setStyle("top", null);
        tile._setStyle("height", null);
      });
    }
  }
};
function calc(exp) {
  return `calc(${exp})`;
}
function normalizeUnits(value) {
  return value.match(/([A-Za-z%]+)$/) ? value : `${value}px`;
}
var MAT_FIT_MODE = "fit";
var MatGridList = class _MatGridList {
  constructor(_element, _dir) {
    this._element = _element;
    this._dir = _dir;
    this._gutter = "1px";
  }
  /** Amount of columns in the grid list. */
  get cols() {
    return this._cols;
  }
  set cols(value) {
    this._cols = Math.max(1, Math.round(coerceNumberProperty(value)));
  }
  /** Size of the grid list's gutter in pixels. */
  get gutterSize() {
    return this._gutter;
  }
  set gutterSize(value) {
    this._gutter = `${value == null ? "" : value}`;
  }
  /** Set internal representation of row height from the user-provided value. */
  get rowHeight() {
    return this._rowHeight;
  }
  set rowHeight(value) {
    const newValue = `${value == null ? "" : value}`;
    if (newValue !== this._rowHeight) {
      this._rowHeight = newValue;
      this._setTileStyler(this._rowHeight);
    }
  }
  ngOnInit() {
    this._checkCols();
    this._checkRowHeight();
  }
  /**
   * The layout calculation is fairly cheap if nothing changes, so there's little cost
   * to run it frequently.
   */
  ngAfterContentChecked() {
    this._layoutTiles();
  }
  /** Throw a friendly error if cols property is missing */
  _checkCols() {
    if (!this.cols && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`mat-grid-list: must pass in number of columns. Example: <mat-grid-list cols="3">`);
    }
  }
  /** Default to equal width:height if rowHeight property is missing */
  _checkRowHeight() {
    if (!this._rowHeight) {
      this._setTileStyler("1:1");
    }
  }
  /** Creates correct Tile Styler subtype based on rowHeight passed in by user */
  _setTileStyler(rowHeight) {
    if (this._tileStyler) {
      this._tileStyler.reset(this);
    }
    if (rowHeight === MAT_FIT_MODE) {
      this._tileStyler = new FitTileStyler();
    } else if (rowHeight && rowHeight.indexOf(":") > -1) {
      this._tileStyler = new RatioTileStyler(rowHeight);
    } else {
      this._tileStyler = new FixedTileStyler(rowHeight);
    }
  }
  /** Computes and applies the size and position for all children grid tiles. */
  _layoutTiles() {
    if (!this._tileCoordinator) {
      this._tileCoordinator = new TileCoordinator();
    }
    const tracker = this._tileCoordinator;
    const tiles = this._tiles.filter((tile) => !tile._gridList || tile._gridList === this);
    const direction = this._dir ? this._dir.value : "ltr";
    this._tileCoordinator.update(this.cols, tiles);
    this._tileStyler.init(this.gutterSize, tracker, this.cols, direction);
    tiles.forEach((tile, index) => {
      const pos = tracker.positions[index];
      this._tileStyler.setStyle(tile, pos.row, pos.col);
    });
    this._setListStyle(this._tileStyler.getComputedHeight());
  }
  /** Sets style on the main grid-list element, given the style name and value. */
  _setListStyle(style) {
    if (style) {
      this._element.nativeElement.style[style[0]] = style[1];
    }
  }
  static {
    this.\u0275fac = function MatGridList_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatGridList)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Directionality, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatGridList,
      selectors: [["mat-grid-list"]],
      contentQueries: function MatGridList_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatGridTile, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tiles = _t);
        }
      },
      hostAttrs: [1, "mat-grid-list"],
      hostVars: 1,
      hostBindings: function MatGridList_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("cols", ctx.cols);
        }
      },
      inputs: {
        cols: "cols",
        gutterSize: "gutterSize",
        rowHeight: "rowHeight"
      },
      exportAs: ["matGridList"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([{
        provide: MAT_GRID_LIST,
        useExisting: _MatGridList
      }]), \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c0,
      decls: 2,
      vars: 0,
      template: function MatGridList_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "div");
          \u0275\u0275projection(1);
          \u0275\u0275elementEnd();
        }
      },
      styles: [_c3],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridList, [{
    type: Component,
    args: [{
      selector: "mat-grid-list",
      exportAs: "matGridList",
      host: {
        "class": "mat-grid-list",
        // Ensures that the "cols" input value is reflected in the DOM. This is
        // needed for the grid-list harness.
        "[attr.cols]": "cols"
      },
      providers: [{
        provide: MAT_GRID_LIST,
        useExisting: MatGridList
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      standalone: true,
      template: "<div>\n  <ng-content></ng-content>\n</div>",
      styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size, var(--mat-app-body-large))}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size, var(--mat-app-body-medium))}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size, var(--mat-app-body-large))}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size, var(--mat-app-body-medium))}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], {
    _tiles: [{
      type: ContentChildren,
      args: [MatGridTile, {
        descendants: true
      }]
    }],
    cols: [{
      type: Input
    }],
    gutterSize: [{
      type: Input
    }],
    rowHeight: [{
      type: Input
    }]
  });
})();
var MatGridListModule = class _MatGridListModule {
  static {
    this.\u0275fac = function MatGridListModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatGridListModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatGridListModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [MatLineModule, MatCommonModule, MatLineModule, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridListModule, [{
    type: NgModule,
    args: [{
      imports: [MatLineModule, MatCommonModule, MatGridList, MatGridTile, MatGridTileText, MatGridTileHeaderCssMatStyler, MatGridTileFooterCssMatStyler, MatGridAvatarCssMatStyler],
      exports: [MatGridList, MatGridTile, MatGridTileText, MatLineModule, MatCommonModule, MatGridTileHeaderCssMatStyler, MatGridTileFooterCssMatStyler, MatGridAvatarCssMatStyler]
    }]
  }], null, null);
})();

// src/app/services/dashboard.service.ts
var DashboardService = class _DashboardService {
  http;
  apiUrl = `${environment.apiUrl}/dashboard`;
  constructor(http) {
    this.http = http;
  }
  getDashboardStats() {
    return this.http.get(`${this.apiUrl}/stats`);
  }
  getCourseStatusChart() {
    return this.http.get(`${this.apiUrl}/course-status`);
  }
  getUserJoiningTrend() {
    return this.http.get(`${this.apiUrl}/user-joining-trend`);
  }
  getPaymentTrend() {
    return this.http.get(`${this.apiUrl}/payment-trend`);
  }
  getTopCategoriesChart() {
    return this.http.get(`${this.apiUrl}/top-categories`);
  }
  static \u0275fac = function DashboardService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardService, factory: _DashboardService.\u0275fac, providedIn: "root" });
};

// src/app/pages/dashboard/dashboard.component.ts
function DashboardComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "mat-progress-bar", 6);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading dashboard data...");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_11_div_94_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275element(1, "div", 45);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("background-color", item_r1.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r1.name, ": ", item_r1.value, "");
  }
}
function DashboardComponent_div_11_div_94_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 46);
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("--percentage", ctx_r3.getPercentage(item_r2.value, ctx_r3.getTotalCourses()))("--color", item_r2.color)("--rotation", ctx_r3.getRotation(i_r3));
  }
}
function DashboardComponent_div_11_div_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36);
    \u0275\u0275template(2, DashboardComponent_div_11_div_94_div_2_Template, 4, 4, "div", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 38)(4, "div", 39);
    \u0275\u0275template(5, DashboardComponent_div_11_div_94_div_5_Template, 1, 6, "div", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 41)(7, "div", 42);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 43);
    \u0275\u0275text(10, "Total");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r3.courseStatusData);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r3.courseStatusData);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.getTotalCourses());
  }
}
function DashboardComponent_div_11_div_103_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275element(1, "div", 51);
    \u0275\u0275elementStart(2, "div", 52);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 53);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r5 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275styleProp("height", ctx_r3.getBarHeight(data_r5.count, ctx_r3.getMaxUserJoining()), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatDate(data_r5.date));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r5.count);
  }
}
function DashboardComponent_div_11_div_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 48);
    \u0275\u0275template(2, DashboardComponent_div_11_div_103_div_2_Template, 6, 4, "div", 49);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r3.userJoiningData.slice(-15));
  }
}
function DashboardComponent_div_11_div_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "mat-icon");
    \u0275\u0275text(2, "trending_up");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No user registration data available");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_11_div_113_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275element(1, "div", 58);
    \u0275\u0275elementStart(2, "div", 52);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 53);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 59);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275styleProp("height", ctx_r3.getBarHeight(data_r6.amount, ctx_r3.getMaxPaymentAmount()), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r6.month);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", ctx_r3.formatCurrency(data_r6.amount), "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", data_r6.count, " payments");
  }
}
function DashboardComponent_div_11_div_113_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 48);
    \u0275\u0275template(2, DashboardComponent_div_11_div_113_div_2_Template, 8, 5, "div", 56);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r3.paymentTrendData.slice(-8));
  }
}
function DashboardComponent_div_11_div_114_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "mat-icon");
    \u0275\u0275text(2, "payment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No payment data available");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_11_div_123_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 63)(2, "span", 64);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 65);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 66);
    \u0275\u0275element(7, "div", 67);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const category_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(category_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", category_r7.value, " courses");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r3.getBarHeight(category_r7.value, ctx_r3.getMaxCategoryValue()), "%")("background-color", category_r7.color);
  }
}
function DashboardComponent_div_11_div_123_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275template(1, DashboardComponent_div_11_div_123_div_1_Template, 8, 6, "div", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.topCategoriesData.slice(0, 8));
  }
}
function DashboardComponent_div_11_div_124_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "mat-icon");
    \u0275\u0275text(2, "category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No category data available");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8)(2, "mat-card", 9)(3, "mat-card-header")(4, "mat-icon", 10);
    \u0275\u0275text(5, "school");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-card-title");
    \u0275\u0275text(7, "Courses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-card-subtitle");
    \u0275\u0275text(9, "Total courses in system");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-card-content")(11, "div", 11);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 12)(14, "span", 13);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 14);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(18, "mat-card", 15)(19, "mat-card-header")(20, "mat-icon", 10);
    \u0275\u0275text(21, "payment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-card-title");
    \u0275\u0275text(23, "Payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "mat-card-subtitle");
    \u0275\u0275text(25, "Revenue & transactions");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "mat-card-content")(27, "div", 11);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 12)(30, "span");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(32, "mat-card", 16)(33, "mat-card-header")(34, "mat-icon", 10);
    \u0275\u0275text(35, "people");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "mat-card-title");
    \u0275\u0275text(37, "Users");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "mat-card-subtitle");
    \u0275\u0275text(39, "Registered users");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "mat-card-content")(41, "div", 11);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 12)(44, "span");
    \u0275\u0275text(45, "Active learners");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(46, "mat-card", 17)(47, "mat-card-header")(48, "mat-icon", 10);
    \u0275\u0275text(49, "library_books");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "mat-card-title");
    \u0275\u0275text(51, "Content");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "mat-card-subtitle");
    \u0275\u0275text(53, "Topics & Lessons");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "mat-card-content")(55, "div", 11);
    \u0275\u0275text(56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 12)(58, "span");
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(60, "div", 18)(61, "mat-card", 19)(62, "mat-icon");
    \u0275\u0275text(63, "local_offer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "div")(65, "span", 20);
    \u0275\u0275text(66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "span", 21);
    \u0275\u0275text(68, "Tags");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(69, "mat-card", 19)(70, "mat-icon");
    \u0275\u0275text(71, "category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "div")(73, "span", 20);
    \u0275\u0275text(74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "span", 21);
    \u0275\u0275text(76, "Categories");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(77, "mat-card", 19)(78, "mat-icon");
    \u0275\u0275text(79, "notifications");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "div")(81, "span", 20);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "span", 21);
    \u0275\u0275text(84, "Notifications");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(85, "div", 22)(86, "mat-card", 23)(87, "mat-card-header")(88, "mat-card-title");
    \u0275\u0275text(89, "Course Status Distribution");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "mat-card-subtitle");
    \u0275\u0275text(91, "Published vs Unpublished courses");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "mat-card-content")(93, "div", 24);
    \u0275\u0275template(94, DashboardComponent_div_11_div_94_Template, 11, 3, "div", 25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(95, "mat-card", 23)(96, "mat-card-header")(97, "mat-card-title");
    \u0275\u0275text(98, "User Registration Trend");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "mat-card-subtitle");
    \u0275\u0275text(100, "New users over time (Last 30 days)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(101, "mat-card-content")(102, "div", 24);
    \u0275\u0275template(103, DashboardComponent_div_11_div_103_Template, 3, 1, "div", 26)(104, DashboardComponent_div_11_div_104_Template, 5, 0, "div", 27);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(105, "mat-card", 23)(106, "mat-card-header")(107, "mat-card-title");
    \u0275\u0275text(108, "Revenue Trend");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(109, "mat-card-subtitle");
    \u0275\u0275text(110, "Monthly payment collection");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(111, "mat-card-content")(112, "div", 24);
    \u0275\u0275template(113, DashboardComponent_div_11_div_113_Template, 3, 1, "div", 28)(114, DashboardComponent_div_11_div_114_Template, 5, 0, "div", 27);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(115, "mat-card", 23)(116, "mat-card-header")(117, "mat-card-title");
    \u0275\u0275text(118, "Popular Categories");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(119, "mat-card-subtitle");
    \u0275\u0275text(120, "Courses by category");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(121, "mat-card-content")(122, "div", 24);
    \u0275\u0275template(123, DashboardComponent_div_11_div_123_Template, 2, 1, "div", 29)(124, DashboardComponent_div_11_div_124_Template, 5, 0, "div", 27);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(125, "mat-card", 30)(126, "mat-card-header")(127, "mat-card-title");
    \u0275\u0275text(128, "Quick Actions");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(129, "mat-card-content")(130, "div", 31)(131, "button", 32)(132, "mat-icon");
    \u0275\u0275text(133, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(134, " New Course ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(135, "button", 33)(136, "mat-icon");
    \u0275\u0275text(137, "people");
    \u0275\u0275elementEnd();
    \u0275\u0275text(138, " Manage Users ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(139, "button", 34)(140, "mat-icon");
    \u0275\u0275text(141, "payment");
    \u0275\u0275elementEnd();
    \u0275\u0275text(142, " View Payments ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(143, "button", 34)(144, "mat-icon");
    \u0275\u0275text(145, "notifications");
    \u0275\u0275elementEnd();
    \u0275\u0275text(146, " Send Notification ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate((ctx_r3.stats == null ? null : ctx_r3.stats.totalCourses) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", (ctx_r3.stats == null ? null : ctx_r3.stats.publishedCourses) || 0, " Published");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (ctx_r3.stats == null ? null : ctx_r3.stats.unpublishedCourses) || 0, " Draft");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1("\u20B9", ctx_r3.formatCurrency((ctx_r3.stats == null ? null : ctx_r3.stats.totalPaymentAmount) || 0), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", (ctx_r3.stats == null ? null : ctx_r3.stats.totalPayments) || 0, " Transactions");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate((ctx_r3.stats == null ? null : ctx_r3.stats.totalUsers) || 0);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate((ctx_r3.stats == null ? null : ctx_r3.stats.totalLessons) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", (ctx_r3.stats == null ? null : ctx_r3.stats.totalTopics) || 0, " Topics");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate((ctx_r3.stats == null ? null : ctx_r3.stats.totalTags) || 0);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate((ctx_r3.stats == null ? null : ctx_r3.stats.totalCategories) || 0);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate((ctx_r3.stats == null ? null : ctx_r3.stats.totalNotifications) || 0);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngIf", ctx_r3.courseStatusData.length > 0);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx_r3.userJoiningData.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.userJoiningData.length === 0);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx_r3.paymentTrendData.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.paymentTrendData.length === 0);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx_r3.topCategoriesData.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.topCategoriesData.length === 0);
  }
}
var DashboardComponent = class _DashboardComponent {
  authService;
  dashboardService;
  sessionData;
  loading = true;
  stats = null;
  courseStatusData = [];
  userJoiningData = [];
  paymentTrendData = [];
  topCategoriesData = [];
  constructor(authService, dashboardService) {
    this.authService = authService;
    this.dashboardService = dashboardService;
    this.sessionData = this.authService.getCurrentUser();
  }
  ngOnInit() {
    this.loadDashboardData();
  }
  loadDashboardData() {
    this.loading = true;
    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error("Error loading dashboard stats:", error);
      }
    });
    this.dashboardService.getCourseStatusChart().subscribe({
      next: (data) => {
        this.courseStatusData = data;
      },
      error: (error) => {
        console.error("Error loading course status data:", error);
      }
    });
    this.dashboardService.getUserJoiningTrend().subscribe({
      next: (data) => {
        this.userJoiningData = data;
      },
      error: (error) => {
        console.error("Error loading user joining data:", error);
      }
    });
    this.dashboardService.getPaymentTrend().subscribe({
      next: (data) => {
        this.paymentTrendData = data;
      },
      error: (error) => {
        console.error("Error loading payment trend data:", error);
      }
    });
    this.dashboardService.getTopCategoriesChart().subscribe({
      next: (data) => {
        this.topCategoriesData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading top categories data:", error);
        this.loading = false;
      }
    });
  }
  refreshData() {
    this.loadDashboardData();
  }
  formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN").format(amount);
  }
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  getPercentage(value, total) {
    return total > 0 ? value / total * 100 : 0;
  }
  getTotalCourses() {
    return this.courseStatusData.reduce((sum, item) => sum + item.value, 0);
  }
  getMaxUserJoining() {
    return Math.max(...this.userJoiningData.map((d) => d.count), 1);
  }
  getMaxPaymentAmount() {
    return Math.max(...this.paymentTrendData.map((d) => d.amount), 1);
  }
  getMaxCategoryValue() {
    return Math.max(...this.topCategoriesData.map((d) => d.value), 1);
  }
  getBarHeight(value, maxValue) {
    return maxValue > 0 ? value / maxValue * 100 : 0;
  }
  getRotation(index) {
    let rotation = 0;
    for (let i = 0; i < index; i++) {
      rotation += this.getPercentage(this.courseStatusData[i].value, this.getTotalCourses()) * 3.6;
    }
    return rotation;
  }
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(DashboardService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 12, vars: 4, consts: [[1, "dashboard-container"], [1, "dashboard-header"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["class", "loading-container", 4, "ngIf"], ["class", "dashboard-content", 4, "ngIf"], [1, "loading-container"], ["mode", "indeterminate"], [1, "dashboard-content"], [1, "stats-grid"], [1, "stat-card", "course-card"], ["mat-card-avatar", ""], [1, "stat-number"], [1, "stat-details"], [1, "published"], [1, "unpublished"], [1, "stat-card", "payment-card"], [1, "stat-card", "user-card"], [1, "stat-card", "content-card"], [1, "secondary-stats"], [1, "secondary-stat"], [1, "number"], [1, "label"], [1, "charts-section"], [1, "chart-card"], [1, "chart-container"], ["class", "donut-chart", 4, "ngIf"], ["class", "line-chart", 4, "ngIf"], ["class", "no-data", 4, "ngIf"], ["class", "payment-chart", 4, "ngIf"], ["class", "category-list", 4, "ngIf"], [1, "quick-actions"], [1, "action-buttons"], ["mat-raised-button", "", "color", "primary"], ["mat-raised-button", "", "color", "accent"], ["mat-raised-button", ""], [1, "donut-chart"], [1, "chart-legend"], ["class", "legend-item", 4, "ngFor", "ngForOf"], [1, "chart-visual"], [1, "donut-segments"], ["class", "donut-segment", 3, "--percentage", "--color", "--rotation", 4, "ngFor", "ngForOf"], [1, "donut-center"], [1, "center-number"], [1, "center-label"], [1, "legend-item"], [1, "legend-color"], [1, "donut-segment"], [1, "line-chart"], [1, "chart-bars"], ["class", "bar-item", 4, "ngFor", "ngForOf"], [1, "bar-item"], [1, "bar"], [1, "bar-label"], [1, "bar-value"], [1, "no-data"], [1, "payment-chart"], ["class", "payment-bar-item", 4, "ngFor", "ngForOf"], [1, "payment-bar-item"], [1, "payment-bar"], [1, "bar-count"], [1, "category-list"], ["class", "category-item", 4, "ngFor", "ngForOf"], [1, "category-item"], [1, "category-info"], [1, "category-name"], [1, "category-count"], [1, "category-bar"], [1, "category-fill"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Admin Dashboard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 2);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_6_listener() {
        return ctx.refreshData();
      });
      \u0275\u0275elementStart(7, "mat-icon");
      \u0275\u0275text(8, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " Refresh Data ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(10, DashboardComponent_div_10_Template, 4, 0, "div", 3)(11, DashboardComponent_div_11_Template, 147, 18, "div", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2("Welcome back, ", ctx.sessionData == null ? null : ctx.sessionData.firstName, " ", ctx.sessionData == null ? null : ctx.sessionData.lastName, "");
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    MatCardModule,
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatProgressBarModule,
    MatProgressBar,
    MatGridListModule,
    MatDividerModule,
    MatChipsModule
  ], styles: ["\n\n.dashboard-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.dashboard-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.dashboard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #1976d2;\n  font-size: 2rem;\n  font-weight: 500;\n}\n.dashboard-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0 0;\n  color: #666;\n  font-size: 1rem;\n}\n.loading-container[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  color: #666;\n}\n.dashboard-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 20px;\n  margin-bottom: 24px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.stat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  padding-bottom: 8px;\n}\n.stat-card[_ngcontent-%COMP%]   mat-icon[mat-card-avatar][_ngcontent-%COMP%] {\n  font-size: 28px;\n  width: 40px;\n  height: 40px;\n  line-height: 40px;\n}\n.course-card[_ngcontent-%COMP%]   mat-icon[mat-card-avatar][_ngcontent-%COMP%] {\n  background-color: #1976d2;\n  color: white;\n}\n.payment-card[_ngcontent-%COMP%]   mat-icon[mat-card-avatar][_ngcontent-%COMP%] {\n  background-color: #388e3c;\n  color: white;\n}\n.user-card[_ngcontent-%COMP%]   mat-icon[mat-card-avatar][_ngcontent-%COMP%] {\n  background-color: #f57c00;\n  color: white;\n}\n.content-card[_ngcontent-%COMP%]   mat-icon[mat-card-avatar][_ngcontent-%COMP%] {\n  background-color: #7b1fa2;\n  color: white;\n}\n.stat-number[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  color: #333;\n  margin-bottom: 8px;\n}\n.stat-details[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  font-size: 0.9rem;\n  color: #666;\n}\n.stat-details[_ngcontent-%COMP%]   .published[_ngcontent-%COMP%] {\n  color: #4caf50;\n  font-weight: 500;\n}\n.stat-details[_ngcontent-%COMP%]   .unpublished[_ngcontent-%COMP%] {\n  color: #ff9800;\n  font-weight: 500;\n}\n.secondary-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.secondary-stat[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px;\n  transition: transform 0.2s ease;\n}\n.secondary-stat[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n}\n.secondary-stat[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n  color: #1976d2;\n}\n.secondary-stat[_ngcontent-%COMP%]   .number[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #333;\n}\n.secondary-stat[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.9rem;\n  color: #666;\n}\n.charts-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n  gap: 24px;\n}\n.chart-card[_ngcontent-%COMP%] {\n  min-height: 350px;\n}\n.chart-container[_ngcontent-%COMP%] {\n  height: 250px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.donut-chart[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 32px;\n  width: 100%;\n}\n.chart-legend[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.legend-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n  font-size: 0.9rem;\n}\n.legend-color[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n}\n.chart-visual[_ngcontent-%COMP%] {\n  position: relative;\n  width: 150px;\n  height: 150px;\n}\n.donut-segments[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.donut-segment[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background:\n    conic-gradient(\n      from calc(var(--rotation, 0) * 1deg),\n      var(--color) 0deg,\n      var(--color) calc(var(--percentage, 0) * 3.6deg),\n      transparent calc(var(--percentage, 0) * 3.6deg));\n  mask:\n    radial-gradient(\n      circle at center,\n      transparent 40%,\n      black 40%);\n}\n.donut-center[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  text-align: center;\n}\n.center-number[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #333;\n}\n.center-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #666;\n}\n.line-chart[_ngcontent-%COMP%], \n.payment-chart[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n.chart-bars[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  gap: 8px;\n  height: 180px;\n  padding: 20px 0;\n}\n.bar-item[_ngcontent-%COMP%], \n.payment-bar-item[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n}\n.bar[_ngcontent-%COMP%], \n.payment-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 4px;\n  background:\n    linear-gradient(\n      to top,\n      #1976d2,\n      #42a5f5);\n  border-radius: 2px 2px 0 0;\n  transition: all 0.3s ease;\n}\n.payment-bar[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      to top,\n      #388e3c,\n      #66bb6a);\n}\n.bar-item[_ngcontent-%COMP%]:hover   .bar[_ngcontent-%COMP%], \n.payment-bar-item[_ngcontent-%COMP%]:hover   .payment-bar[_ngcontent-%COMP%] {\n  opacity: 0.8;\n  transform: scaleY(1.05);\n}\n.bar-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #666;\n  margin-top: 8px;\n  text-align: center;\n  transform: rotate(-45deg);\n  white-space: nowrap;\n}\n.bar-value[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: #333;\n  margin-top: 4px;\n}\n.bar-count[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #666;\n}\n.category-list[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 20px 0;\n}\n.category-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 16px;\n  gap: 16px;\n}\n.category-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.category-name[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 500;\n  color: #333;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.category-count[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.8rem;\n  color: #666;\n}\n.category-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 8px;\n  background: #f0f0f0;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.category-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 4px;\n  transition: width 0.3s ease;\n}\n.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #999;\n  padding: 40px;\n}\n.no-data[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n.quick-actions[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 150px;\n}\n@media (max-width: 768px) {\n  .dashboard-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .dashboard-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 16px;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .secondary-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  }\n  .charts-section[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .donut-chart[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .chart-bars[_ngcontent-%COMP%] {\n    gap: 4px;\n  }\n  .bar-label[_ngcontent-%COMP%] {\n    transform: rotate(-90deg);\n    font-size: 0.6rem;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: unset;\n  }\n}\n@media (max-width: 480px) {\n  .stat-number[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .secondary-stat[_ngcontent-%COMP%]   .number[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n  .chart-container[_ngcontent-%COMP%] {\n    height: 200px;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\pages\\dashboard\\dashboard.component.ts", lineNumber: 739 });
})();

// src/app/pages/dashboard/dashboard.routes.ts
var DASHBOARD_ROUTES = [
  { path: "", component: DashboardComponent }
];
export {
  DASHBOARD_ROUTES
};
//# sourceMappingURL=chunk-5AOACUQR.mjs.map
