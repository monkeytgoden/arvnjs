import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datef'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, format?: string) {
    if (!value) {
      return null;
    }
    const date = new Date(value);
    let fmtDate = '';
    switch (format) {
      case 'dd/MM/yyyy':
        fmtDate = this.format(date, '/');
        break;
      case 'dd-MM-yyyy':
        fmtDate = fmtDate = this.format(date, '-');
        break;
      default:
        fmtDate = value;
        break;
    }
    return fmtDate;
  }

  format(date, type) {
    const day = date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate();
    const month = (date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    return `${day}${type}${month}${type}${date.getFullYear()}`;
  }
}
