import {Component} from "@angular/core";
import {RouterLinkWithHref} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {authActions} from "../../store/actions";
import {RegisterRequestInterface} from "../../types/registerRequest.interface";
import {AuthStateInterface} from "../../types/authState.interface";
import {CommonModule} from "@angular/common";
import {selectIsSubmitting} from "../../store/reducers";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    RouterLinkWithHref,
    ReactiveFormsModule,
    CommonModule
  ],
  standalone: true
})

export class RegisterComponent {

  public form = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  public isSubmitting$ = this.store.select(selectIsSubmitting);

  constructor(private formBuilder: FormBuilder,
              private store: Store<{auth: AuthStateInterface}>) {}

  public onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue()
    }
    this.store.dispatch(authActions.register({request}));
  }
}
