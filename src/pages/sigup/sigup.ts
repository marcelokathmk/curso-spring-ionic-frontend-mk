import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-sigup',
  templateUrl: 'sigup.html',
})
export class SigupPage {

  formGroupSignUp: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alert: AlertController) {

      this.formGroupSignUp = this.formBuilder.group({
        nome: ["Choriat Da Silva", [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ["", [Validators.required, Validators.email]],
        tipo: ["", [Validators.required]],
        cpfOuCnpj: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ["", [Validators.required]],
        logradouro: ["", [Validators.required]],
        numero: ["", [Validators.required]],
        complemento: ["", []],
        bairro: ["", []],
        cep: ["", [Validators.required]],
        telefone1: ["", [Validators.required]],
        telefone2: ["", []],
        telefone3: ["", []],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]]
      });
  }

  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(response =>{
      this.estados = response;
      this.formGroupSignUp.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error=>{});
  }

  public updateCidades(){
    let estado_id = this.formGroupSignUp.value.estadoId;
    this.cidadeService.findAll(estado_id).subscribe(response => {
      this.cidades = response;
      this.formGroupSignUp.controls.cidadeId.setValue(null);
    },
    error=>{});
  }

  public signupUser(){
    console.log(this.formGroupSignUp.value);
    this.clienteService.insert(this.formGroupSignUp.value).subscribe(response => {
      this.showInsertOk();
    },
    error => {});
  }

  public showInsertOk(){
    let alert = this.alert.create({
      title: "Sucesso!",
      message: "Cadastro efetuado com sucesso",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
