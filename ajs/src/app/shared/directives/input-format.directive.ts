import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {
  // tslint:disable-next-line: no-input-rename
  @Input('inputFormat') format: string;

  constructor(private el: ElementRef) {}

  @HostListener('blur') onBlur() {
    const value = this.el.nativeElement.value;
    this.format === 'lowercase' ? this.el.nativeElement.value = value.toLowerCase() : this.el.nativeElement.value = value.toUpperCase();
  }
}
