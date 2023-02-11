export class PrestationModel {
  nom: string;
  quantite: number;
  tarifUnitaire: number;

  constructor(nom: string, quantite: number, tarifUnitaire: number) {
    this.nom = nom;
    this.quantite = quantite;
    this.tarifUnitaire = tarifUnitaire;
  }
}
