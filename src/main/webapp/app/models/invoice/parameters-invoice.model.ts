import { PrestationModel } from './prestation.model';

export class ParametersInvoiceModel {
  numeroClient?: string;
  nomClient: string;

  pays: string;
  numeroAdresse: string;
  extensionAdresse?: string;
  natureLibelleVoie: string;
  complementLocalisation?: string;
  codePostal?: string;
  ville?: string;

  prestations?: PrestationModel[];

  constructor(
    numeroClient: string,
    nomClient: string,
    pays: string,
    numeroAdresse: string,
    extensionAdresse: string,
    natureLibelleVoie: string,
    complementLocalisation: string,
    codePostal: string,
    ville: string,
    prestations: PrestationModel[]
  ) {
    this.numeroClient = numeroClient;
    this.nomClient = nomClient;
    this.pays = pays;
    this.numeroAdresse = numeroAdresse;
    this.extensionAdresse = extensionAdresse;
    this.natureLibelleVoie = natureLibelleVoie;
    this.complementLocalisation = complementLocalisation;
    this.codePostal = codePostal;
    this.ville = ville;
    this.prestations = prestations;
  }
}
