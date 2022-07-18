import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo, CameraPlugin } from '@capacitor/camera';
import { ImageService } from '../services/image.service';
import { PredecirService } from '../services/predecir.service';

const IMAGE_DIR = 'stored-images';
  
interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  images: LocalFile[] = [];
  nombreImagen;
  nombre;

  constructor(
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private imageService: ImageService,
    private predecirService: PredecirService
  ) {}

  async ngOnInit() {
    this.loadFiles();
  }

  async loadFiles() {
    this.images = [];
    
    const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();
    
    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    }).then(result => {
      this.loadFileData(result.files);
    },
      async (err) => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: IMAGE_DIR,
          directory: Directory.Data,
        });
      }
    ).then(_ => {
      loading.dismiss();
    });
  }

  // Get the actual base64 data of an image
  // base on the name of the file
  async loadFileData(fileNames: string[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;
      
      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });
      
      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
    }
  }

  // Little helper
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }

  async takeImage() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera, // Camera, Photos or Prompt!
        width: 250,
        height:250
    });

    if (image) {
        this.saveImage(image)
    }
  }
  
  resizeImg(imgData) {
    const canvas = document.createElement('canvas');
    canvas.width = 250;
    canvas.height = 250;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgData, 0, 0, 250, 250);
    const data = ctx.canvas.toDataURL();
    return data
  }

  async selectImage() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    if (image) {
      this.saveImage(image)
    }

  }

  // Create a new file from a capture image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Data,
        directory: Directory.Data
    });

    this.nombre = base64Data;
    this.nombre = this.nombre.replace('data:image/jpeg;base64,', '');
    //aqui intento conectar con el modelo
    this.procesarImg();
    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
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
      if(data['Descripción']==='SANA'){
        color='success';
      }else{
        color='danger';
      }
      this.mensaje('El estado de la imagen es: '+data['Descripción'], color);
    }).catch(error =>{
      loading.dismiss();
      console.log("Hubo muchos errores");
      console.log(error);
    });
  }

  async mensaje(msj: string, colors: string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 5000,
      color: colors,
      position: 'middle'
    });
    toast.present();
  }

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
        const file = await Filesystem.readFile({
            path: photo.path
        });
        
        return file.data;
    }
    else {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(photo.webPath);
        const blob = await response.blob();
      
        return await this.convertBlobToBase64(blob) as string;
    }
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
  
  async startUpload(file: LocalFile) {
    // TODO
  }
  
  async deleteImage(file: LocalFile) {
    // TODO
  }

}
