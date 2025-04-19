import { toast } from 'ngx-sonner';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  showToast(message: string, description?: string) {
    toast(message, {
      description: description || '',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    });
  }
}
