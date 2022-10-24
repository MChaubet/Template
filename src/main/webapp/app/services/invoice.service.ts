import { Injectable } from '@angular/core';
import { ParametersInvoiceModel } from '../models/invoice/parameters-invoice.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ContentImage, Margins, Style, Table } from 'pdfmake/interfaces';
import { formatDateToddMMyyyy } from '../utils/date.utils';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  tva = 20;

  constructor() {}

  generateInvoice(parameters: ParametersInvoiceModel): void {
    if (
      !parameters.nomClient ||
      !parameters.numeroAdresse ||
      !parameters.natureLibelleVoie ||
      !parameters.codePostal ||
      !parameters.ville ||
      !parameters.pays ||
      !parameters.prestations ||
      parameters.prestations.length < 1
    ) {
      console.log('Il manque un paramètre');
      // todo toastr
    } else {
      const devis =
        'data:image/png;base64,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';
      const signature =
        'data:image/png;base64,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';

      const dd = {
        content: [
          {
            image: devis,
            fit: [200, 200],
            margin: [190, 0, 0, 20] as Margins,
          } as ContentImage,
          { text: "Date d'émission : " + formatDateToddMMyyyy(new Date()), style: ['header', 'right'], margin: [0, 0, 0, 5] as Margins },
          { text: 'Numéro client : ' + String(parameters.numeroClient), style: ['header', 'right'] },
          {
            margin: [40, 70, 0, 50] as Margins,
            layout: 'noBorders',
            table: {
              widths: [350, 200],
              body: [
                [
                  { text: 'Juun Project', style: 'emetteur' },
                  { text: parameters.nomClient, style: 'bold' },
                ],
                [
                  { text: "14 Av. de l'Université", style: 'adresse_emetteur' },
                  { text: parameters.numeroAdresse + ' ' + parameters.natureLibelleVoie, style: 'adresse_destinataire' },
                ],
                [
                  { text: '33400 Talence', style: 'adresse_emetteur' },
                  { text: parameters.codePostal + ' ' + parameters.ville, style: 'adresse_destinataire' },
                ],
                [
                  { text: 'France', style: 'adresse_emetteur' },
                  { text: parameters.pays, style: 'adresse_destinataire' },
                ],
              ],
            },
          },
          {
            margin: [0, 0, 0, 50] as Margins,
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: [185, 75, 45, 70, 30, 75],
              body: [
                [
                  { text: 'Description', style: ['bold', 'prestation'] },
                  { text: 'Prix unit. HT', style: ['bold', 'right', 'prestation'] },
                  { text: 'Qté', style: ['bold', 'right', 'prestation'] },
                  { text: 'Total HT', style: ['bold', 'right', 'prestation'] },
                  { text: 'TVA', style: ['bold', 'right', 'prestation'] },
                  { text: 'Total TTC', style: ['bold', 'right', 'prestation'] },
                ],
              ],
            } as Table,
          },
          {
            margin: [370, 0, 0, 30] as Margins,
            layout: 'lightHorizontalLines',
            table: {
              widths: [95, 80],
              body: [],
            },
          },
          { image: signature, fit: [200, 200], style: 'right' } as ContentImage,
        ],
        styles: {
          bold: {
            bold: true,
          },
          right: {
            alignment: 'right',
          } as Style,
          emetteur: {
            fontSize: 14,
            bold: true,
          },
          destinataire: {
            fontSize: 14,
            bold: true,
            background: '#f2f2f2',
          },
          adresse_destinataire: {
            fontSize: 11,
            background: '#f2f2f2',
          },
          header: {
            fontSize: 9,
          },
          adresse_emetteur: {
            fontSize: 11,
          },
          prestation: {
            fontSize: 10,
          },
        },
        pageMargins: [15, 15, 15, 15] as Margins,
      };

      let totalPrestationsHT = 0;
      let totalPrestationsTT = 0;
      for (const prestation of parameters.prestations) {
        const tarifHT = prestation.tarifUnitaire * prestation.quantite;
        const tarifTT = tarifHT + tarifHT * (this.tva / 100);
        totalPrestationsHT += tarifHT;
        totalPrestationsTT += tarifTT;
        let lignePrestation = [
          { text: prestation.nom, style: 'prestation' },
          { text: String(prestation.tarifUnitaire.toFixed(2)) + ' €', style: ['right', 'prestation'] },
          { text: String(prestation.quantite), style: ['right', 'prestation'] },
          { text: String(tarifHT.toFixed(2)) + ' €', style: ['right', 'prestation'] },
          { text: String(this.tva) + '%', style: ['right', 'prestation'] },
          { text: String(tarifTT.toFixed(2)) + ' €', style: ['right', 'prestation'] },
        ];
        dd.content[4].table?.body.push(lignePrestation);
      }
      const tvaCalculated = totalPrestationsHT * (this.tva / 100);
      dd.content[5].table?.body.push([
        { text: 'Total HT', style: '' },
        { text: String(totalPrestationsHT.toFixed(2)) + ' €', style: 'right' },
      ]);
      dd.content[5].table?.body.push([
        { text: 'TVA 20 %', style: '' },
        { text: String(tvaCalculated.toFixed(2)) + ' €', style: 'right' },
      ]);
      dd.content[5].table?.body.push([
        { text: 'Total TTC', style: '' },
        { text: String(totalPrestationsTT.toFixed(2)) + ' €', style: 'right' },
      ]);

      pdfMake.createPdf(dd).open();
    }
  }
}
