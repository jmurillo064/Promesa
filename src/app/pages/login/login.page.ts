import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  cedula; pass;

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    public alertController: AlertController
    ) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: 'Campos inválidos!!!',
      message: 'Realice un correcto ingreso de datos',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  iniciarSesion(){
    if(this.cedula==null || this.cedula=="" || this.pass==null || this.pass==""){
      this.presentAlert();
    }else{
      this.loginService.validarLogin(this.cedula, this.pass).then(data =>{
        if(data['code'] == "204"){
          this.presentAlert();
        }else{
          this.router.navigate(['tabs']);
          this.cedula="";
          this.pass="";
        }
      }).catch(error =>{
        console.log(error);
      });
    }
  }

}
