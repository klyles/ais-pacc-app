import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
  transform(phoneNumber: any): any {
    if (!phoneNumber){
      return phoneNumber;
    } else {
      return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    }
  }
}
