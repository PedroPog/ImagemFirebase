import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { ListResult } from '@angular/fire/compat/storage/interfaces';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ImagemFirebase';
  tipo = 'comida';
  fileURLs!: Observable<string[]>;

  constructor(
    private fs: AngularFireStorage,
    private location: Location
  ){}

  ngOnInit() {
    this.fileURLs = from(this.fs.ref(`imagem/${this.tipo}`).listAll()).pipe(
      switchMap((listResult: ListResult) => {
        const observables = listResult.items.map(item => item.getDownloadURL());
        return from(Promise.all(observables));
      }),
      finalize(() => {
        // Esta função será chamada quando a lista de arquivos estiver pronta
        // Aqui você pode executar qualquer lógica adicional que precisar
      })
    );
  }


  async onFileChange(event: any){
    const file = event.target.files[0];
    if(file){
      const path = `imagem/${this.tipo}/${file.name}`;
      const uploadTask = await this.fs.upload(path,file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);
      this.load();
      //this.fileURLs.push(url);
    }
  }

  load(){
    location.reload();
  }
}
