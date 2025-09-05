import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalService } from './servicios/local.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  title = 'InterRapidisimo';
  public user = "";
  public items: any[] = [] ;
  public login: boolean= false;
  constructor(
    private localservice: LocalService,
    private alertMessage: MatSnackBar
  ){
  }
  ngOnInit(){
    this.login = true
  }
  logOut(){
    location.reload()
    this.localservice.clearData()
    location.href = environment.url + 'Login'
    this.user=""
  }
}
