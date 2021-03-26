import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredential } from 'src/app/core/models/user-credential.model';
import { MyValidators } from 'src/app/utils/validators';
import { AuthService } from '@core/services/auth.service';
import { CrossFieldErrorMatcher } from 'src/app/utils/class/CrossFieldErrorMatcher.class';
import { TypePerson } from 'src/app/utils/enums/type-person.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  register(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value: UserCredential = this.form.value;
      this.authService.createUser(value.email, value.password)
      .then(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validatePassword]],
      confirmPassword: ['', [Validators.required]],
      type: ['company',  [Validators.required]],
      companyName: ['', [Validators.required]]
    },{
      validators: MyValidators.matchPassword
    })

    this.typeField.valueChanges.subscribe(
      (value) => {
        this.companyNameField.setValidators(value === TypePerson.company ? [Validators.required] : null);
        this.companyNameField.updateValueAndValidity();
      }
    )
  }


  get typeField(){ return this.form.get('type')}
  get companyNameField(){ return this.form.get('companyName')}

  
}