
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
@Input()
terminada = true;

@ViewChild(IonList)
lista:IonList

  constructor(public deseosService:DeseosService,
              private route:Router,
              private alertController:AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista:Lista){
    if(this.terminada){
      this.route.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
      this.route.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista:Lista){
     this.deseosService.borrarLista(lista);
  }

  async editarLista(lista:Lista){
    const alert = await this.alertController.create({
      header: 'Editar Lista',
      inputs: [
        {
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'Nombre de la lista'
        }
     ],
      buttons: [
        { 
         text:'Cancelar',
         role:'cancel',
         handler: ()=>{
           console.log('cancelar');
           this.lista.closeSlidingItems();
         }
        },
        { 
          text:'Actualizar',
          handler: (data)=>{
            console.log('data');
            if(data.titulo.length === 0){return;}
            lista.titulo=data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
         }
      ]
    });
  
    await alert.present();
  }

}
