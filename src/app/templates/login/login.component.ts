import { Component, OnInit } from "@angular/core";
import { User } from "../../core/common/_models/index";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService, AuthenticationService } from "../../core/common/_services/index";
import { FormsModule } from "@angular/forms";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  model: any = {};
  user: User;
  loading = false;
  passwordtype = "password";
  emptyvalidation = "This field is required.";

  constructor(private router: Router, 
    private alertService: AlertService,
    private authenticationService:AuthenticationService,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    //document.getElementById('id01').style.display='block'";
    //document.getElementById('id01').style.display='block';

    this.model.currentusername = "";
    this.model.currentpassword = "";
  }

  login() {
    this.alertService.clear();
    let message = "Invalid User Name !";
    console.log("user name : password" +this.model.currentusername +
        this.model.currentpassword
    );
    this.authenticationService.login(this.model.currentusername,this.model.currentpassword)
    .subscribe(
      response => {
        this.authenticationService.setToken("00000000000001111111111");
        this.authenticationService.setUserLoggedIn(true);
        this.router.navigate(["/"]);
    },
    error => {
      this.router.navigate(["/login"]);
      setTimeout(() => {
        this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
          panelClass: ["error"],
          verticalPosition: 'top'      
        });
      }); 
    }
  ); 

    
  }

  forgetPassword() {}

  showPassword() {
    if (this.passwordtype == "text") {
      this.passwordtype = "password";
    }
    if (this.passwordtype == "password") {
      this.passwordtype = "text";
    }
    // var x = document.getElementById("myInput");
    //if (x.type === "password") {
    //  x.type = "text";
    //} else {
    //  x.type = "password";
    //}
  }
}
