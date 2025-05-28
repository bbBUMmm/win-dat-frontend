import {Component, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../core/services/toast.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserCreateRequest} from '../../../core/models/user-create-request';
import {HlmButtonModule} from '@spartan-ng/ui-button-helm';
import {CommonModule} from '@angular/common';
import {HlmInputDirective} from '@spartan-ng/ui-input-helm';
import {HlmLabelDirective} from '@spartan-ng/ui-label-helm';
import {Subject, takeUntil} from 'rxjs';
import {toast} from 'ngx-sonner';



@Component({
  selector: 'app-user-create',
  imports: [CommonModule,
    ReactiveFormsModule,
    HlmButtonModule,
    HlmInputDirective,
    HlmLabelDirective
  ],
  standalone: true,
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);

  // Used to unsubscribe safely
  private destroy$ = new Subject<void>();


  userForm: FormGroup;

  @Output() userCreated = new EventEmitter<void>();

  constructor() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData: UserCreateRequest = this.userForm.value;

      this.userService.createUser(userData)
        // Unsubscribe when component is destroyed
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log('User created successfully!', response);
            this.toastService.showToast('Success', 'User created successfully! Go on and login.');
            this.userCreated.emit();
            // Reset form after successful creation
            this.userForm.reset();
          },
          error: (error) => {
            console.error('Error creating user:', error);
            this.toastService.showToast('Error', error.error?.message || 'Failed to create user. Please try again.');
          }
        });
    } else {
      this.userForm.markAllAsTouched();
      this.toastService.showToast('Warning', 'Please fill in all required fields correctly.');
    }
  }

  showToast() {
    toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    });
  }
}
