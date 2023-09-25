import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { ListResult } from '@angular/fire/compat/storage/interfaces';
import { Location } from '@angular/common';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDatabase } from "firebase/database";

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent {

}

