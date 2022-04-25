import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-management-app',
  templateUrl: './management-app.component.html',
  styleUrls: ['./management-app.component.scss'],
})
export class ManagementAppComponent implements OnInit {
  invoiceForm = this.formBuilder.group({
    numeroDossier: [null, [Validators.required, Validators.maxLength(10)]],
    nomDossier: [null, [Validators.required, Validators.maxLength(50)]],
    dateDebutDossier: [null, [Validators.pattern('(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)')]],
    dateDebutFacturation: [null, [Validators.pattern('(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)')]],
    dateFinFacturation: [null, [Validators.pattern('(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)')]],
    blocageDossier: [null, [Validators.required]],
    pays: [null, [Validators.required, Validators.maxLength(50)]],
    numeroAdresse: [null, [Validators.required, Validators.maxLength(4), Validators.pattern('^[1-9][0-9]*$')]],
    extensionAdresse: [null, [Validators.maxLength(4)]],
    natureLibelleVoie: [null, [Validators.required, Validators.maxLength(60)]],
    complementLocalisation: [null, [Validators.maxLength(50)]],
    serviceDistributionComplement: [null, [Validators.maxLength(50)]],
    codePostal: [null, [Validators.maxLength(5), Validators.pattern('[0-9]{5}')]],
    ville: [null, [Validators.required, Validators.maxLength(50)]],
  });

  softwares = [
    { id: 1, name: 'Sage' },
    { id: 2, name: 'Syges' },
    { id: 3, name: 'Silae' },
  ];

  commercials = [
    { id: 1, name: 'Mr. Bob Augémal' },
    { id: 2, name: 'Mme Sophie Stikay' },
    { id: 3, name: 'Mr. Vicent Team' },
  ];

  activeIds: string[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // this.activeIds = ['panel-identification', 'panel-adresse']; //panels 1 and 2 are open
  }

  genererFacture(): void {}
}
