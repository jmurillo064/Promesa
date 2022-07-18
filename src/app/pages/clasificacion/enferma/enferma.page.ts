import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { SanaService } from 'src/app/services/sana.service';
import { EnfermaService } from 'src/app/services/enferma.service';

@Component({
  selector: 'app-enferma',
  templateUrl: './enferma.page.html',
  styleUrls: ['./enferma.page.scss'],
})
export class EnfermaPage implements OnInit {

  parcelas: any;
  imgURL: any;
  estado: any;

  constructor(
    private sanaService: SanaService,
    private imageService: ImageService,
    private enfermaService: EnfermaService
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

    //tratamientos
  }

}
