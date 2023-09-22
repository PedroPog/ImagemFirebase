import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ImagemFirebase';

  constructor(
    private fs: AngularFireStorage,
  ){}

  async onFileChange(event: any){
    const file = event.target.files[0];
    if(file){
      const path = `imagem/${file.name}`;
      const uploadTask = await this.fs.upload(path,file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);

    }
  }
}
