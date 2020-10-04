import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosService:DeseosService,
              private route:Router,
              public alertController: AlertController) {}

  async agregarLista(){
    const alert = await this.alertController.create({
      header: 'Nueva Lista',
      inputs: [
        {
        name: 'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista'
        }
     ],
      buttons: [
        { 
         text:'Cancelar',
         role:'cancel',
         handler: ()=>{
           console.log('cancelar');
         }
        },
        { 
          text:'Crear',
          handler: (data)=>{
            console.log('data');
            if(data.titulo.length === 0){return;}
            const listaId=this.deseosService.crearLista(data.titulo);
            this.route.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          }
         }
      ]
    });
  
    await alert.present();
  }
}
