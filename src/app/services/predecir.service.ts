import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PredecirService {

  constructor(private http: HttpClient) { }

  Post_Imagen(data:any) {
    let  url = 'https://shrouded-gorge-69430.herokuapp.com/api/Imagenes';
    var formData = new FormData();
    formData.append('nombre_imagen', data.nombre_imagen);
    return new Promise ((resolve, reject) => {
      this.http.post(url, formData ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  predecirMonillia(data: any){
    let  url = 'http://pamelacb.pythonanywhere.com/predecir';
    var formData = new FormData(); 
    formData.append('base64img',data.base64img);
    let params = new HttpParams();
    params.append('base64img',data.base64img);
    return new Promise((resolve, reject) => {
      this.http.post(url,JSON.stringify(data)).subscribe(res => { 
      resolve(res);
        }, error => { 
          reject(error);
        });
    })
  }

}
