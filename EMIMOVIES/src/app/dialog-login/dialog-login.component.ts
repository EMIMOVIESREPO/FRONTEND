import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-dialog-login',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-login.component.html',
  styleUrl: './dialog-login.component.css',
})
export class DialogLoginComponent {

  constructor(
     private dialog: MatDialog
  ){}

  openLoginDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px'; // Set the width as needed
    dialogConfig.height = '500px'; // Set the height as needed
    dialogConfig.position = {
      bottom: '100px', // Modifier ces valeurs pour ajuster la position
      left: '250px' // Modifier ces valeurs pour ajuster la position
    };
    dialogConfig.panelClass = 'custom-dialog';
  
    this.dialog.open(LoginComponent, dialogConfig);
    
  }
 
}
