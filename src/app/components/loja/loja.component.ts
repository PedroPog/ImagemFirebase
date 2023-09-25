import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent {
  formGroup!: FormGroup;
  imagem: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog
    ){
      this.initForm();
    }


  initForm(){
    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      categoria: ['',Validators.required],
      imagem: [''],
    })
  }
  onSalvar(){
    if(!this.formGroup.valid){
      alert("Formulario invalido!");
      return;
    }
    alert("Formulario valido!."+this.imagem);
    console.log(this.formGroup.value);
    this.onClear();
  }
  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent,{
      data: {imagem: this.imagem},
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result) {
        this.imagem = result; // Atualiza a imagem com a URL selecionada
        // Atualize a imagem no formulário ou onde quer que ela seja usada no seu aplicativo
        this.formGroup.setValue({imagem: this.imagem});
        console.log(`Dialog Result: ${result}`);
      }
    })
  }
  onClear(){
    this.formGroup.setValue({
      nome: '',
      categoria: '',
      imagem: ''
    })
  }

}

