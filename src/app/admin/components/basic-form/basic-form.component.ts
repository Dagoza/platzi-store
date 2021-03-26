import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
   }

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe(
      value => {
        console.log(value);
      }
    )

    this.form.valueChanges.subscribe(
      value => {
        console.log(this.form.get('agree'));
      }
    )
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      fullName: this.formBuilder.group( {
        name:  ['', [Validators.required, Validators.maxLength(10)]],
        lastName:  ['', [Validators.required, Validators.maxLength(10)]]
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      color: ['#000000'],
      date: [''],
      age: [18, [Validators.required, Validators.min(18), Validators.max(100) ]],
      password: ['', [MyValidators.validatePassword]],
      price: [''],
      week: [''],
      time: [''],
      search: [''],
      description: [''],
      category: [''],
      agree: [false, Validators.requiredTrue],
      gender: [''],
      zone: [''],
    })
    /*
    new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl(''),
      phone: new FormControl(''),
      color: new FormControl('#000000'),
      date: new FormControl(''),
      age: new FormControl(''),
      password: new FormControl(''),
      price: new FormControl(''),
      week: new FormControl(''),
      time: new FormControl(''),
      search: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(''),
      agree: new FormControl(false),
      gender: new FormControl(''),
      zone: new FormControl(''),
    });
    */
  }

  getNameValue(){
    console.info(this.nameField.value);
  }

  save(event: Event): void {
		this.form.markAllAsTouched()
		if (this.form.invalid) { return }
		console.log(this.form.value)
	}

  get nameField(){
    return this.form.get('fullName').get('name');
  }

  get lastNameField(){
    return this.form.get('fullName.lastName');
  }
  get emailField(){
    return this.form.get('email');
  }
  get phoneField(){
    return this.form.get('phone');
  }
  get colorField(){
    return this.form.get('color')
  }
  get dateField(){
    return this.form.get('date');
  }
  get ageField(){
    return this.form.get('age');
  }
  get passwordField(){
    return this.form.get('password');
  }
  get priceField(){
    return this.form.get('price');
  }
  get weekField(){
    return this.form.get('week');
  }
  get timeField(){
    return this.form.get('time');
  }
  get searchField(){
    return this.form.get('search');
  }
  get descriptionField(){
    return this.form.get('description');
  }
  get categoryField(){
    return this.form.get('category');
  }
  get agreeField(){
    return this.form.get('agree');
  }
  get genderField(){
    return this.form.get('gender');
  }
  get zoneField(){
    return this.form.get('zone');
  }

  get isNameFieldValid(){
    return this.nameField.touched && this.nameField.valid;
  }

  get agreeFieldIsInvalid(){
    return this.agreeField.touched && this.agreeField.invalid;
  }

  get isNameFieldInvalid(){
    return this.nameField.touched && this.nameField.invalid;
  }

}
