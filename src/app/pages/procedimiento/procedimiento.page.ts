import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform, ToastController, AlertController} from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo, CameraPlugin } from '@capacitor/camera';
import { ImageService } from '../../services/image.service';
import { PredecirService } from '../../services/predecir.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-procedimiento',
  templateUrl: './procedimiento.page.html',
  styleUrls: ['./procedimiento.page.scss'],
})
export class ProcedimientoPage implements OnInit {

  imgURL: any;
  nombre: any;

  constructor(
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private imageService: ImageService,
    private router: Router, 
    public alertController: AlertController,
    private predecirService: PredecirService 
    ) { }

  ngOnInit() {
    this.imgURL = "";
    this.nombre = "";
  }

  //seleccionar imagen
  async subirFoto() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt
    });

    this.nombre = image['base64String'];
    this.imgURL = 'data:image/jpeg;base64,' + image['base64String'];
    this.procesarImg();
  }

  //tomar foto
  async tomarFoto() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
    });
    
    this.nombre = image['base64String'];
    this.imgURL = 'data:image/jpeg;base64,' + image['base64String'];
    this.procesarImg();
  }

  ///aqui intento conectar con el modelo
  async procesarImg(){
    let dataToSend = {base64img:this.nombre}
    //console.log(this.nombre);
    const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();
    this.predecirService.predecirMonillia(dataToSend).then(data => {
      console.log(data);
      loading.dismiss();
      let color;
      //enviar imagen y estado
      let resultado = {
        estado: data['Descripción'],
        imgB64: this.imgURL
      }
      this.imageService.senObjectSource(resultado);

      if(data['Descripción']==='SANA'){
        color='success';
        this.router.navigate(['sana']);
      }else{
        color='danger';
        this.router.navigate(['enferma']);
      }
      this.mensaje('El estado de la imagen es: '+data['Descripción'], color);
      
    }).catch(error =>{
      loading.dismiss();
      console.log("Hubo muchos errores");
      console.log(error);
    });
  }

  //mensaje
  async mensaje(msj: string, colors: string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 5000,
      color: colors,
      position: 'top'
    });
    toast.present();
  }


  //salir
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SALIR',
      message: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Salir',
          id: 'confirm-button',
          handler: () => {
            this.router.navigate(['login']);
          }
        }
      ]
    });

    await alert.present();
  }

  salir(){
    this.presentAlertConfirm();
  }

}
