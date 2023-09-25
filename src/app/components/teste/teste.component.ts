import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { ListResult } from '@angular/fire/compat/storage/interfaces';
import { Location } from '@angular/common';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent {
  title = 'ImagemFirebase';
  tipo = 'comida';
  name = '';
  fileURLs!: Observable<string[]>;

  constructor(
    private fs: AngularFireStorage,
    private location: Location
  ){}

  ngOnInit() {

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

  onDownFile(urlHttp: string){
    const storage = getStorage();
    const url = `imagem/${this.tipo}/IMG-20230921-WA0069.jpg`;
    //const url = `${urlimg}`;

    getDownloadURL(ref(storage,urlHttp)).then((url)=>{
      const xhr = new  XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) =>{
        const blob = xhr.response;
      };
      xhr.open('GET',url);
      xhr.send();

      const img = document.getElementById('myimg');
      img?.setAttribute('src',url);
      alert(url);
    })
    .catch((error) => {
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
    });

  }

  onCarregar(){
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
  onLimpar(){
    this.fileURLs = from(this.fs.ref(``).listAll()).pipe(
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
  load(){
    location.reload();
  }
}
