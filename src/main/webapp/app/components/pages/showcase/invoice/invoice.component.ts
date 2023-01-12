import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParametersInvoiceModel } from '../../../../models/invoice/parameters-invoice.model';
import { InvoiceService } from '../../../../services/invoice.service';
import invoicesJson from '../../../../../../resources/json/invoices.json';
import countriesJson from '../../../../../../resources/json/countries.json';
import invoiceValidationMessagesJson from '../../../../../../resources/json/invoice-validation-messages.json';
import { CountryModel } from '../../../../models/invoice/country';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  randomIndex = 0;
  validationMsgs: any;

  form = this.formBuilder.group(
    {
      numeroClient: [null, [Validators.required, Validators.maxLength(10)]],
      nomClient: [null, [Validators.required, Validators.maxLength(30)]],
      pays: ['France', [Validators.required]],
      numeroAdresse: [null, [Validators.required, Validators.maxLength(4), Validators.pattern('^[1-9][0-9]*$')]],
      extensionAdresse: [null, [Validators.maxLength(4)]],
      natureLibelleVoie: [null, [Validators.required, Validators.maxLength(60)]],
      complementLocalisation: [null, [Validators.maxLength(50)]],
      codePostal: [null, [Validators.required, Validators.maxLength(5), Validators.pattern('[0-9]{5}')]],
      ville: [null, [Validators.required, Validators.maxLength(50)]],
      prestations: this.formBuilder.array([this.createPrestationFormGroup()]),
    },
    { updateOn: 'change' }
  );

  constructor(private formBuilder: FormBuilder, private invoiceService: InvoiceService, private translateService: TranslateService) {
    this.getValidationMessages(translateService.currentLang);
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getValidationMessages(event.lang);
    });
  }

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
      console.log();
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
    this.form.controls.pays.setValue('France');
    this.form.markAsUntouched();
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

  changeOpacityRowPrestation(i: number): void {
    const row = document.getElementById('prestation-' + i.toString());
    if (row) {
      row.style.opacity = '0.5';
    }
  }

  private createPrestationFormGroup(): FormGroup {
    return new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      quantite: new FormControl([], [Validators.required, Validators.min(1), Validators.max(1000000)]),
      tarifUnitaire: new FormControl([], [Validators.required, Validators.min(0.01), Validators.max(1000000)]),
    });
  }

  private getInvoiceParameters(): ParametersInvoiceModel {
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
      prestations: formValue.prestations.map((p: { nom: any; quantite: string; tarifUnitaire: string }) => {
        return {
          nom: p.nom,
          quantite: parseFloat(p.quantite),
          tarifUnitaire: parseFloat(p.tarifUnitaire),
        };
      }),
    };
  }

  private getValidationMessages(lang: string) {
    switch (lang) {
      case 'fr':
        this.validationMsgs = invoiceValidationMessagesJson.fr;
        break;
      case 'en':
        this.validationMsgs = invoiceValidationMessagesJson.en;
        break;
      default:
        this.validationMsgs = invoiceValidationMessagesJson.fr;
    }
  }
}
