import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {authActions} from "../../store/actions";
import {RegisterRequestInterface} from "../../types/registerRequest.interface";
import {AuthStateInterface} from "../../types/authState.interface";
import {CommonModule, NgIf} from "@angular/common";
import {selectIsSubmitting, selectValidationErrors} from "../../store/reducers";
import {combineLatest} from "rxjs";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    NgIf
  ],
  standalone: true
})

export class RegisterComponent {

  public form = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  public data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })

  constructor(private formBuilder: FormBuilder,
              private store: Store<{auth: AuthStateInterface}>) {}

  public onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue()
    }
    this.store.dispatch(authActions.register({request}));
  }
}
