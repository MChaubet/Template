import {Injectable} from '@angular/core';
import {ParametersInvoiceModel} from '../models/invoice/parameters-invoice.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {ContentImage, Margins, PageSize, Style, Table} from 'pdfmake/interfaces';
import {formatDateToddMMyyyy} from '../utils/date.utils';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';
import {convertToBase64} from "../utils/image.utils";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  tva = 20;

  constructor(private http: HttpClient) {
  }

  generateInvoice(parameters: ParametersInvoiceModel): void {
    forkJoin([
      this.http.get('/content/images/showcase/invoice/devis.png', {responseType: 'blob'}),
      this.http.get('/content/images/showcase/invoice/signature.png', {responseType: 'blob'}),
      this.http.get('/content/images/showcase/invoice/waves.png', {responseType: 'blob'}),
    ]).subscribe(imgs => {
      Promise.all([convertToBase64(imgs[0]), convertToBase64(imgs[1]), convertToBase64(imgs[2])]).then(base64Img => {
        const devis = base64Img[0];
        const signature = base64Img[1];
        const background = base64Img[2];

        if (parameters.nomClient && parameters.numeroAdresse && parameters.natureLibelleVoie && parameters.codePostal && parameters.ville && parameters.pays && parameters.prestations && parameters.prestations.length >= 1) {
          const dd = {
            pageSize: 'LETTER' as PageSize,
            background: [
              {
                image: background,
                width: 792,
                absolutePosition: {x: 0, y: 518},
              },
            ],
            content: [
              {
                image: devis,
                fit: [200, 200],
                margin: [190, 0, 0, 20] as Margins,
              } as ContentImage,
              {
                text: "Date d'émission : " + formatDateToddMMyyyy(new Date()),
                style: ['header', 'right'],
                margin: [0, 0, 0, 5] as Margins,
              },
              {text: 'Numéro client : ' + String(parameters.numeroClient), style: ['header', 'right']},
              {
                margin: [40, 70, 0, 50] as Margins,
                layout: 'noBorders',
                table: {
                  widths: [350, 200],
                  body: [
                    [
                      {text: 'Juun Project', style: 'emetteur'},
                      {text: parameters.nomClient, style: 'bold'},
                    ],
                    [
                      {text: "14 Av. de l'Université", style: 'adresse_emetteur'},
                      {text: parameters.numeroAdresse + ' ' + parameters.natureLibelleVoie, style: 'adresse_destinataire'},
                    ],
                    [
                      {text: '33400 Talence', style: 'adresse_emetteur'},
                      {text: parameters.codePostal + ' ' + parameters.ville, style: 'adresse_destinataire'},
                    ],
                    [
                      {text: 'France', style: 'adresse_emetteur'},
                      {text: parameters.pays, style: 'adresse_destinataire'},
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
                      {text: 'Description', style: ['bold', 'prestation']},
                      {text: 'Prix unit. HT', style: ['bold', 'right', 'prestation']},
                      {text: 'Qté', style: ['bold', 'right', 'prestation']},
                      {text: 'Total HT', style: ['bold', 'right', 'prestation']},
                      {text: 'TVA', style: ['bold', 'right', 'prestation']},
                      {text: 'Total TTC', style: ['bold', 'right', 'prestation']},
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
              {image: signature, fit: [200, 200], style: 'right', margin: [0, 0, 10, 0] as Margins} as ContentImage,
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
            const lignePrestation = [
              {text: prestation.nom, style: 'prestation'},
              {text: String(prestation.tarifUnitaire.toFixed(2)) + ' €', style: ['right', 'prestation']},
              {text: String(prestation.quantite), style: ['right', 'prestation']},
              {text: String(tarifHT.toFixed(2)) + ' €', style: ['right', 'prestation']},
              {text: String(this.tva) + '%', style: ['right', 'prestation']},
              {text: String(tarifTT.toFixed(2)) + ' €', style: ['right', 'prestation']},
            ];
            dd.content[4].table?.body.push(lignePrestation);
          }
          const tvaCalculated = totalPrestationsHT * (this.tva / 100);
          dd.content[5].table?.body.push([
            {text: 'Total HT', style: ''},
            {text: String(totalPrestationsHT.toFixed(2)) + ' €', style: 'right'},
          ]);
          dd.content[5].table?.body.push([
            {text: 'TVA 20 %', style: ''},
            {text: String(tvaCalculated.toFixed(2)) + ' €', style: 'right'},
          ]);
          dd.content[5].table?.body.push([
            {text: 'Total TTC', style: ''},
            {text: String(totalPrestationsTT.toFixed(2)) + ' €', style: 'right'},
          ]);

          pdfMake.createPdf(dd).open();
        }
      });
    });
  }
}
