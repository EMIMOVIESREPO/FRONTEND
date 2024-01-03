import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and other necessary modules
import { UsersloginService } from '../Services/users.login.service';
import { Router, RouterLink } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AlertComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  authFailed: boolean = false;
  error: string = null;
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersloginService,
    private router: Router,public dialogRef: MatDialogRef<LoginComponent>, private dialog: MatDialog,
    private globalVariablesService: GlobalVariablesService
  ) {
    // Inject the FormBuilder service

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmitLogin() {
    this.closeDialog();
    this.submitForm();
  }

  onHandleError() {
    this.error = null;
  }

  private submitForm() {
    const formGroup = this.loginForm;

    if (formGroup.invalid) {
      return ;
    }

    const formData = formGroup.value;
    const authObservable = this.usersService.login(
      formData.email,
      formData.password
    );

    authObservable.subscribe({
      next: (response) => {
        this.globalVariablesService.setLoggedEmail(formData.email);
        this.router.navigate(['/home']);
        console.log(response);
      },
      error: (err) => {
        this.error = err;

        console.log(err);
      },
    });
    formGroup.reset();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  openDialog() {
    this.closeDialog()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px'; // Set the width as needed
    dialogConfig.height = '700px'; // Set the height as needed
    dialogConfig.position = {
      bottom: '15px', 
      top:'15px',// Modifier ces valeurs pour ajuster la position
      left: '250px' // Modifier ces valeurs pour ajuster la position
    };
    dialogConfig.panelClass = 'custom-dialog';

    this.dialog.open(SignupComponent, dialogConfig);
    
}

}
