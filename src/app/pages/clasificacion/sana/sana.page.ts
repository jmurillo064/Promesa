import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { SanaService } from 'src/app/services/sana.service';

@Component({
  selector: 'app-sana',
  templateUrl: './sana.page.html',
  styleUrls: ['./sana.page.scss'],
})
export class SanaPage implements OnInit {

  parcelas: any;
  imgURL: any;
  estado: any;


  constructor(
    private sanaService: SanaService,
    private imageService: ImageService
    ) { }

  ngOnInit() {
    //parcelas
    this.sanaService.obtenerParcelas().then(data => {
      if(data['code'] == "204"){
        console.log("Sin datos");
      }else{
        this.parcelas = data['data'];
      }
    }).catch(error =>{
      console.log(error);
    });

    //imagen
    this.imageService.$getObjectSource.subscribe(data =>{
      this.imgURL = data['imgB64'];
      this.estado = data['estado']
    }).unsubscribe();
  }

}
