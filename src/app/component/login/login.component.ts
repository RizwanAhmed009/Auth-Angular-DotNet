import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateForm } from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  public loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(
    private fb:FormBuilder,
    private router : Router,
    private auth : AuthService,
    private userStore:UserStoreService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    })
  }

   // Toggle password visibility
   hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
     if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next : (res) => {
        // alert(res.message);
        // this.toast.success({ details:"SUCCESS" , summery:res.message , duration:5000});
        this.loginForm.reset();
        this.auth.setToken(res.token);
        let tokenpayload = this.auth.decodedToken();
        this.userStore.setFullNameForStore(tokenpayload.unique_name);
        this.userStore.setRoleForStore(tokenpayload.role);
        alert("login successfully")
        this.router.navigate(['dashboard'])
        },
        error: (err) => {
          console.log(err); // Inspect the error structure
          const errorMessage = err?.error?.message || "An unexpected error occurred";
           alert(errorMessage);

        },
        
        // error : (err)=>{
        //   alert(err?.err.message);
        // }
      })
     }else{
      // console.log("form is not valid")
      ValidateForm.validateAllFormField(this.loginForm)
      alert("Your form is not valid")
     }
  }
  
 

}
