import { PrestationModel } from './prestation.model';

export class ParametresFacture {
  numeroClient?: string;
  nomClient?: string;
  dateDebutFacturation?: string;
  dateFinFacturation?: string;

  pays?: string;
  numeroAdresse?: string;
  extensionAdresse?: string;
  natureLibelleVoie?: string;
  complementLocalisation?: string;
  codePostal?: string;
  ville?: string;
  serviceDistributionComplement?: string;

  prestations?: PrestationModel[];

  constructor(
    numeroClient: string,
    nomClient: string,
    dateDebutFacturation: string,
    dateFinFacturation: string,
    pays: string,
    numeroAdresse: string,
    extensionAdresse: string,
    natureLibelleVoie: string,
    complementLocalisation: string,
    codePostal: string,
    ville: string,
    serviceDistributionComplement: string,
    prestations: PrestationModel[]
  ) {
    this.numeroClient = numeroClient;
    this.nomClient = nomClient;
    this.dateDebutFacturation = dateDebutFacturation;
    this.dateFinFacturation = dateFinFacturation;
    this.pays = pays;
    this.numeroAdresse = numeroAdresse;
    this.extensionAdresse = extensionAdresse;
    this.natureLibelleVoie = natureLibelleVoie;
    this.complementLocalisation = complementLocalisation;
    this.codePostal = codePostal;
    this.ville = ville;
    this.serviceDistributionComplement = serviceDistributionComplement;
    this.prestations = prestations;
  }
}
