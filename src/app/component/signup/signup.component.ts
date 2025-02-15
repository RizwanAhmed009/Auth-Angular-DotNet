import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateForm } from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!:FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"
  constructor(
    private fb : FormBuilder,
    private router : Router,
    private auth : AuthService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      userName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'password'
  }

  onSubmit() {
    if(this.signUpForm.valid){
        // console.log(this.signUpForm.value);
          this.auth.signUp(this.signUpForm.value).subscribe({
            next:(res=>{
              console.log(res.message);
              this.signUpForm.reset();
              this.router.navigate(['login']);
              alert(res.message)
            }),
            error:(err=>{
              alert(err?.error.message)
            })
          })
    }else{
     ValidateForm.validateAllFormField(this.signUpForm);
    }
  }

}
