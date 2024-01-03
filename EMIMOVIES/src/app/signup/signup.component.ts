import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and other necessary modules
import { UsersloginService } from '../Services/users.login.service';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AlertComponent, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm: FormGroup;
  authFailed: boolean = false;
  error: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersloginService,
    private router: Router,
    public dialogRef: MatDialogRef<SignupComponent>, private dialog: MatDialog,
  ) {
    // Inject the FormBuilder service
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmitSignUp() {
    this.closeDialog();
    this.openLoginDialog();
    this.submitForm();
  }
  onHandleError() {
    this.error = null;
  }
  private submitForm() {
    const formGroup = this.signUpForm;

    if (formGroup.invalid) {
      return;
    }

    const formData = formGroup.value;
    const authObservable = this.usersService.signUp(
      formData.email,
      formData.password
    );

    authObservable.subscribe({
      next: (response) => {
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
  openLoginDialog() {
    this.closeDialog();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px'; 
    dialogConfig.height = '500px'; 
    dialogConfig.position = {
      bottom: '100px', 
      left: '250px' 
    };
    dialogConfig.panelClass = 'custom-dialog';
  
    this.dialog.open(LoginComponent, dialogConfig);
    
  }

}
