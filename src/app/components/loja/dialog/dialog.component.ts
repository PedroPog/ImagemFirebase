import { Component, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ListResult } from '@angular/fire/compat/storage/interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, finalize, from, switchMap } from 'rxjs';

export interface DialogData {
  imagem: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  title = 'ImagemFirebase';
  name = '';
  fileURLs!: Observable<string[]>;
  fileURLsT!: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fs: AngularFireStorage,
  ){
    this.onCarregar();
  }

  onCarregar(){
    this.fileURLs = from(this.fs.ref(`imagem/comida`).listAll()).pipe(
      switchMap((listResult: ListResult) => {
        const observables = listResult.items.map(item => item.getDownloadURL());
        return from(Promise.all(observables));
      }),
      finalize(() => {

      })
    );
    this.fileURLsT = from(this.fs.ref(`imagem/teste`).listAll()).pipe(
      switchMap((listResult: ListResult) => {
        const observables = listResult.items.map(item => item.getDownloadURL());
        return from(Promise.all(observables));
      }),
      finalize(() => {

      })
    );
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  selecionarImagem(url: string) {
    this.dialogRef.close(url);
  }
}
