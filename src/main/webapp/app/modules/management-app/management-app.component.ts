import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-management-app',
  templateUrl: './management-app.component.html',
  styleUrls: ['./management-app.component.scss'],
})
export class ManagementAppComponent implements OnInit, OnDestroy {
  invoiceForm = this.formBuilder.group(
    {
      numeroDossier: [null, [Validators.required, Validators.maxLength(10)]],
      nomDossier: [null, [Validators.required, Validators.maxLength(50)]],
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

  countries = [
    { id: 1, name: 'France' },
    { id: 2, name: 'Allemagne' },
    { id: 3, name: 'Angleterre' },
    { id: 4, name: 'Espagne' },
    { id: 5, name: 'Suisse' },
  ];

  constructor(private formBuilder: FormBuilder) {
    document.getElementsByTagName('body').item(0)?.classList.toggle('management-app');
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    document.getElementsByTagName('body').item(0)?.classList.toggle('management-app');
  }

  genererFacture(): void {
    this.invoiceForm.markAllAsTouched();
  }
}
