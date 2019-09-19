import { Component, OnInit, NgModule } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Kill } from 'src/app/model/kill.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  files: string[];

  items: Kill[];

  message: {};
  classCss: {};

  error: Error;

  formGame= new FormGroup ({
    fileName: new FormControl(),
  });

  constructor(private gameService: GameService, 
    private formBuilder: FormBuilder) { 
      this.createForm();
      this.findFiles();
      console.log(this.items);
    }

  ngOnInit() {
   
  }

  createForm() {
    this.formGame = this.formBuilder.group({
      fileName: ''
    })
    }

  findFiles() {
    this.gameService.findFiles().subscribe((response: string[]) => {
      this.files = response;
    },
    err => {
      this.error = err;
      this.showMessage({
        type: this.error.message,
        text: this.error.message
      });
    });
}

private showMessage(message: {type: string, text: string}) : void {
  this.message = message;
  this.buildClasses(message.type);
  setTimeout(() => {
    this.message = undefined;
  }, 3000);
}

private buildClasses(type: string) : void {
  this.classCss = {
    'alert' : true
  }
  this.classCss['alert-'+type] = true;
}

findKill(fileName: string) {
  this.gameService.findKill(fileName).subscribe((response: Kill[]) => {
    this.items = response;
  },
  err => {
    this.error = err;
     console.log(this.error);
    this.showMessage({
      type: this.error.message,
      text: this.error.message
    });
  });
}

onSubmit() {
  if (this.formGame.value.fileName != undefined) {
    this.findKill(this.formGame.value.fileName)
  }
 }
 limpar() {
  this.items= undefined;
 }

}
