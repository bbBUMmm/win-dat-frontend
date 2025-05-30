import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  standalone: true,
  name: 'userModel'
})
export class UserModelPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        throw new Error('Method not implemented.');
    }
}
