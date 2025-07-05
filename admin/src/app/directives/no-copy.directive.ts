import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appNoCopy]',
  standalone: true
})
export class NoCopyDirective implements OnInit {

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Apply no-copy styles
    this.el.nativeElement.style.userSelect = 'none';
    this.el.nativeElement.style.webkitUserSelect = 'none';
    this.el.nativeElement.style.mozUserSelect = 'none';
    this.el.nativeElement.style.msUserSelect = 'none';
    this.el.nativeElement.style.webkitTouchCallout = 'none';
    this.el.nativeElement.style.webkitTapHighlightColor = 'transparent';
    
    // Add copy protection class
    this.el.nativeElement.classList.add('no-copy-protection');
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  @HostListener('selectstart', ['$event'])
  onSelectStart(event: Event) {
    event.preventDefault();
    return false;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: Event) {
    event.preventDefault();
    return false;
  }

  @HostListener('copy', ['$event'])
  onCopy(event: Event) {
    event.preventDefault();
    return false;
  }

  @HostListener('cut', ['$event'])
  onCut(event: Event) {
    event.preventDefault();
    return false;
  }

  @HostListener('paste', ['$event'])
  onPaste(event: Event) {
    event.preventDefault();
    return false;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Block Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+A, Ctrl+S, Ctrl+P
    if (event.ctrlKey || event.metaKey) {
      const blockedKeys = ['c', 'x', 'v', 'a', 's', 'p', 'u', 'i', 'j'];
      if (blockedKeys.includes(event.key.toLowerCase())) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }

    // Block F12 and other function keys
    const functionKeys = ['F12', 'F11', 'F10', 'F9', 'F8', 'F7', 'F6', 'F5'];
    if (functionKeys.includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }

    return true;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    // Prevent multi-touch gestures
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    // Prevent long press context menu
    event.preventDefault();
  }
}
