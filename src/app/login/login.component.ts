import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LocalService } from '../servicios/local.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private alertMessage: MatSnackBar,
    private localservice: LocalService,
    private dialog: MatDialog
    ) { }
  public hide= true;
  public LoginForm  = new FormGroup({
    User: new FormControl('', [Validators.required]),
    UserPassword: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  login(){
    let aux = this.LoginForm.getRawValue()['UserPassword'] || '';
    let user = this.LoginForm.get('User')?.value || '';
  }
  security(){
    const dialogRefL = this.dialog.open(ConfirmDialogComponent, {
        data: {
          type: 'loading',
          title: 'Guardando el Registro',
          message: 'Espere unos minutos'
        }
      });
      disableClose: true
      location.href = environment.url + "ViewSujects"
  }
}
