import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParametersInvoiceModel } from '../../../../models/invoice/parameters-invoice.model';
import { InvoiceService } from '../../../../services/invoice.service';
import invoicesJson from '../../../../../../resources/json/invoices.json';
import countriesJson from '../../../../../../resources/json/countries.json';
import { CountryModel } from '../../../../models/invoice/country';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'jhi-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  randomIndex = 0;

  // todo mettre ces messages dans un fichier json, avec la trad
  validationMsgs = {
    numeroClient: [{ type: 'required', message: 'Ce champ est requis.' }],
    nomClient: [{ type: 'required', message: 'Ce champ est requis.' }],
    pays: [{ type: 'required', message: 'Ce champ est requis.' }],
    numeroAdresse: [
      { type: 'required', message: 'Ce champ est requis.' },
      { type: 'pattern', message: "Le numéro n'est pas valide." },
    ],
    natureLibelleVoie: [{ type: 'required', message: 'Ce champ est requis.' }],
    complementLocalisation: [{ type: 'maxlength', message: 'La taille maximale est de 50 caractères.' }],
    codePostal: [
      { type: 'required', message: 'Ce champ est requis.' },
      { type: 'pattern', message: "Le code postal n'est pas valide." },
    ],
    ville: [{ type: 'required', message: 'Ce champ est requis.' }],
    nomPrestation: [{ type: 'required', message: 'Ce champ est requis.' }],
    quantitePrestation: [
      { type: 'required', message: 'Ce champ est requis.' },
      { type: 'min', message: 'Veuillez rentrer un nombre entre 1 et 1 000 000.' },
      { type: 'max', message: 'Veuillez rentrer un nombre entre 1 et 1 000 000.' },
    ],
    tarifUnitairePrestation: [
      { type: 'required', message: 'Ce champ est requis.' },
      { type: 'min', message: 'Veuillez renseigner un nombre entre 0,01 et 1 000 000.' },
      { type: 'max', message: 'Veuillez renseigner un nombre entre 0,01 et 1 000 000.' },
    ],
  };

  form = this.formBuilder.group(
    {
      numeroClient: [null, [Validators.required, Validators.maxLength(10)]],
      nomClient: [null, [Validators.required, Validators.maxLength(30)]],
      pays: [null, [Validators.required]],
      numeroAdresse: [null, [Validators.required, Validators.maxLength(4), Validators.pattern('^[1-9][0-9]*$')]],
      extensionAdresse: [null, [Validators.maxLength(4)]],
      natureLibelleVoie: [null, [Validators.required, Validators.maxLength(60)]],
      complementLocalisation: [null, [Validators.maxLength(50)]],
      codePostal: [null, [Validators.required, Validators.maxLength(5), Validators.pattern('[0-9]{5}')]],
      ville: [null, [Validators.required, Validators.maxLength(50)]],
      prestations: this.formBuilder.array([this.createPrestationFormGroup()]),
    },
    { updateOn: 'submit' }
  );

  constructor(private formBuilder: FormBuilder, private invoiceService: InvoiceService) {}

  ngOnInit(): void {}

  get countries(): CountryModel[] {
    return countriesJson as CountryModel[];
  }

  get prestations(): FormArray {
    return this.form.get('prestations') as FormArray;
  }

  submitForm(): void {
    if (this.form.valid) {
      this.invoiceService.generateInvoice(this.getInvoiceParameters());
    } else {
      this.form.markAllAsTouched();
    }
  }

  fillInputsRandomly(): void {
    let newRandomIndex = this.randomIndex;
    while (newRandomIndex === this.randomIndex) {
      newRandomIndex = Math.floor(Math.random() * invoicesJson.length);
    }
    this.randomIndex = newRandomIndex;
    const randomInvoice = invoicesJson[this.randomIndex];

    this.form.patchValue({
      numeroClient: randomInvoice.numeroClient,
      nomClient: randomInvoice.nomClient,
      pays: randomInvoice.pays,
      numeroAdresse: randomInvoice.numeroAdresse,
      extensionAdresse: randomInvoice.extensionAdresse,
      natureLibelleVoie: randomInvoice.natureLibelleVoie,
      complementLocalisation: randomInvoice.complementLocalisation,
      codePostal: randomInvoice.codePostal,
      ville: randomInvoice.ville,
    });

    this.prestations.clear();
    randomInvoice.prestations.forEach(prestation => {
      const formGroup = this.createPrestationFormGroup();
      formGroup.patchValue({
        nom: prestation.nom,
        quantite: prestation.quantite,
        tarifUnitaire: prestation.tarifUnitaire,
      });
      this.prestations.push(formGroup);
    });
  }

  resetForm(): void {
    this.form.reset();
    this.prestations.clear();
    this.prestations.push(this.createPrestationFormGroup());
    this.form.markAsUntouched();
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsUntouched();
      // this.form.get(key)?.();
    });
  }

  addPrestation(): void {
    if (this.prestations.length < 10) {
      this.prestations.push(this.createPrestationFormGroup());
    }
  }

  deletePrestation(i: number): void {
    if (this.prestations.length > 1) {
      this.prestations.removeAt(i);
    } else {
      this.prestations.reset();
    }
  }

  drop(event: CdkDragDrop<unknown>): void {
    moveItemInArray(this.prestations.controls, event.previousIndex, event.currentIndex);
  }

  djfhdfjh() {
    console.log(this.form.get('numeroClient'));
  }

  getInvoiceParameters(): ParametersInvoiceModel {
    const formValue = this.form.getRawValue();

    return {
      numeroClient: formValue.numeroClient,
      nomClient: formValue.nomClient,
      pays: formValue.pays,
      numeroAdresse: formValue.numeroAdresse,
      extensionAdresse: formValue.extensionAdresse,
      natureLibelleVoie: formValue.natureLibelleVoie,
      complementLocalisation: formValue.complementLocalisation,
      codePostal: formValue.codePostal,
      ville: formValue.ville,
      prestations: formValue.prestations,
    };
  }

  createPrestationFormGroup(): FormGroup {
    return new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      quantite: new FormControl('', [Validators.required, Validators.min(1), Validators.max(1000000)]),
      tarifUnitaire: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(1000000)]),
    });
  }

  gojdf() {
    console.log(this.form.get('numeroClient')?.hasError('required'));
  }
}
