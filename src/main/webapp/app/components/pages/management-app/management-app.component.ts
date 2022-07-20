import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { PrestationModel } from '../../../models/management-app/prestation.model';
import { ParametresFactureModel } from '../../../models/management-app/parametres-facture.model';

@Component({
  selector: 'jhi-management-app',
  templateUrl: './management-app.component.html',
  styleUrls: ['./management-app.component.scss'],
})
export class ManagementAppComponent implements OnInit, OnDestroy {
  countries = [
    { id: 1, name: 'France' },
    { id: 2, name: 'Allemagne' },
    { id: 3, name: 'Angleterre' },
    { id: 4, name: 'Espagne' },
    { id: 5, name: 'Italie' },
    { id: 6, name: 'Suisse' },
  ];

  unites = [
    'Unités',
    'Kilomètres',
    'Kilogrammes',
    'Grammes',
    'Centimètres',
    'Kilowatt-heures',
    'Watt-heures',
    'Litres',
    'Mililitres',
    'Jours',
    'Heures',
  ];

  form = this.formBuilder.group(
    {
      numeroClient: [null, [Validators.required, Validators.maxLength(10)]],
      nomClient: [null, [Validators.required, Validators.maxLength(50)]],
      dateDebutFacturation: [null, [Validators.pattern('(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)')]],
      dateFinFacturation: [null, [Validators.pattern('(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)')]],
      pays: [null, [Validators.required, Validators.maxLength(50)]],
      numeroAdresse: [null, [Validators.required, Validators.maxLength(4), Validators.pattern('^[1-9][0-9]*$')]],
      extensionAdresse: [null, [Validators.maxLength(4)]],
      natureLibelleVoie: [null, [Validators.required, Validators.maxLength(60)]],
      complementLocalisation: [null, [Validators.maxLength(50)]],
      serviceDistributionComplement: [null, [Validators.maxLength(50)]],
      codePostal: [null, [Validators.maxLength(5), Validators.pattern('[0-9]{5}')]],
      ville: [null, [Validators.required, Validators.maxLength(50)]],
    },
    { updateOn: 'submit' }
  );

  @ViewChild('tablePrestations') tablePrestations!: ElementRef;

  prestations: PrestationModel[] = [];
  messageInputRequis = 'Ce champ est requis.';

  constructor(private formBuilder: FormBuilder, private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) {
    document.getElementsByTagName('body').item(0)?.classList.toggle('management-app');
  }

  ngOnInit(): void {
    this.prestations.push({ nom: 'Impression', nombre: 350, unite: this.unites[0], tarifUnitaire: 0.08 });
    this.prestations.push({ nom: 'Transport', nombre: 50, unite: this.unites[1], tarifUnitaire: 0.39 });
    this.addControlPrestations();
  }

  ngOnDestroy(): void {
    document.getElementsByTagName('body').item(0)?.classList.toggle('management-app');
  }

  get today(): any {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  addRowPrestation(): void {
    this.prestations.splice(this.prestations.length, 0, new PrestationModel());
    // TODO ajouter le contrôle
  }

  deleteRowPrestation(i: number): void {
    this.prestations.splice(i, 1);
  }

  genererFacture(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const parametresFacture = this.getParametresFacture();
      console.log();

      // appel au service de génération de facture
    }
  }

  private addControlPrestations(): void {
    for (let i = 0; i < this.prestations.length; i++) {
      this.form.addControl('nom_' + String(i), new FormControl(this.prestations[i], [Validators.required, Validators.minLength(8)]));
    }
  }

  private getParametresFacture(): ParametresFactureModel {
    const formValue = this.form.getRawValue();
    const prestationList: PrestationModel[] = [];

    return {
      numeroClient: formValue.numeroClient,
      nomClient: formValue.nomClient,
      dateDebutFacturation: formValue.dateDebutFacturation,
      dateFinFacturation: formValue.dateFinFacturation,
      pays: formValue.pays,
      numeroAdresse: formValue.numeroAdresse,
      extensionAdresse: formValue.extensionAdresse,
      natureLibelleVoie: formValue.natureLibelleVoie,
      complementLocalisation: formValue.complementLocalisation,
      codePostal: formValue.codePostal,
      ville: formValue.ville,
      serviceDistributionComplement: formValue.serviceDistributionComplement,
      prestations: prestationList,
    };
  }
}
