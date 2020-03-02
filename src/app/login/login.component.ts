import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService,AuthenticationService } from '../_services/index';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  user:User;
  loading = false;
  passwordtype="password";
  errorStatus : any;
  usererrorStatus: any;
  passworderror: any;

  public SignIndiv = false;
  public usercheckdiv = false;
  public passwordcheck = false; 

  constructor(  
    private router: Router, 
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.model.currentusername='';
    this.model.currentpassword='';
    this.SignIndiv = true;
    this.usercheckdiv = false;
    this.passwordcheck = false;
  }

  onClickSubmit(){
    this.SignIndiv = true;
    this.usercheckdiv = false;
    this.passwordcheck = false;
    this.alertService.clear();
    console.log("user name : password"+this.model.currentusername+this.model.currentpassword);
    this.authenticationService.login(this.model.currentusername, this.model.currentpassword)
      .subscribe(
      data => {
        this.user=data;
        console.log("Status ====>", this.user.status);
        if(this.user.status=="success") {                    
          localStorage.setItem('currentusername',this.model.currentusername);
          localStorage.setItem('currentpassword',this.model.currentpassword);
          this.router.navigate(['/landingpage']);
        } 
        else {
          this.loading = false;
          this.errorStatus = this.user.status;
          this.alertService.error(this.user.status);
        }

      },
      error => {
          this.loading = false;
      });
          
    /*if(this.model.currentusername!=="admin"){
      this.alertService.error(message);
    }
    else {
      this.router.navigate(['/landingpage']);
    }*/

  }

  forgetPassword(){
    this.SignIndiv = false;
    this.usercheckdiv = true;
    this.passwordcheck = false;
    this.model.currentusername='';
    this.model.currentpassword='';
  }

  checkUserName(){
    localStorage.setItem('forgetUser',this.model.currentusername);
    this.authenticationService.checkUserName(this.model.currentusername)
    .subscribe(
        data => {
            this.user=data;
            if(this.user.status=='success') {
              this.usererrorStatus = "Valid UserName";
              this.SignIndiv = false;
              this.usercheckdiv = false;
              this.passwordcheck = true;
              this.model.currentusername='';
            }else {
              this.usererrorStatus = this.user.status;
              this.SignIndiv = false;
              this.usercheckdiv = true;
              this.passwordcheck = false;
            }

        }, 
        error => {
          this.usererrorStatus = "NetWork Error";
          this.SignIndiv = false;
          this.usercheckdiv = true;
          this.passwordcheck = false;
        });
  }

  submitPassword(){
    if(this.model.newPassword1 == this.model.newPassword2) {
         this.authenticationService.resetPassword(this.model.newPassword1,localStorage.getItem('forgetUser'))
         .subscribe(
         data => {
             this.user=data;
             if(this.user.status=="success") {
                this.SignIndiv = true;
                this.usercheckdiv = false;
                this.passwordcheck = false;
                this.model.currentusername='';
                this.model.currentpassword='';
             }
             else if(this.user.status == "failure"){
                this.passworderror = "Password Not Match";
                this.SignIndiv = false;
                this.usercheckdiv = false;
                this.passwordcheck = true;
             }
         },
         error => {
          this.passworderror = "Network Error";
         });
      }
      else {
          this.passworderror = "Password doesn't Matched.please try again";
      }
  }

  showPassword(){
    this.SignIndiv = true;
    this.usercheckdiv = false;
    this.passwordcheck = false;
    if (this.passwordtype=="text"){
      this.passwordtype="password";
    }
    if (this.passwordtype=="password"){
      this.passwordtype="text";
    }
   // var x = document.getElementById("myInput");
  //if (x.type === "password") {
  //  x.type = "text";
  //} else {
  //  x.type = "password";
  //}
  }
}
