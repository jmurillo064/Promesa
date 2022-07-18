import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnfermaService {

  constructor(private http: HttpClient) { }

  obtenerTratamientos(){
    let  url = 'https://shrouded-gorge-69430.herokuapp.com/api/Tratamientos ';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

}
