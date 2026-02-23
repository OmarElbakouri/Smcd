import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

const FORM_TITLE = 'Formulaire de Réservation';
const CONGRESS_TITLE = 'Congrès National de Chirurgie Digestive SMCD 2026';

const fields = [
    { label: 'Nom', label2: 'Prénom' },
    { label: 'Fonction', label2: 'GSM' },
    { label: 'Tél.', label2: 'Email' },
    { label: 'Adresse', full: true },
    { label: 'Code postal', label2: 'Ville' },
];

const billingFields = [
    { label: 'Nom de la société', full: true },
    { label: 'Contact', full: true },
    { label: 'Adresse', full: true },
    { label: 'Code postal', label2: 'Ville' },
    { label: 'Pays', full: true },
];

export async function generateReservationPDF() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineWidth = pageWidth - 2 * margin;
    let y = 25;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(FORM_TITLE, pageWidth / 2, y, { align: 'center' });
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(CONGRESS_TITLE, pageWidth / 2, y, { align: 'center' });
    y += 12;

    doc.setDrawColor(0, 150, 136);
    doc.setLineWidth(0.5);
    doc.rect(margin - 5, y - 5, lineWidth + 10, 95);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bolditalic');
    doc.text('Raison sociale (tous les champs sont obligatoires)', margin, y + 2);
    y += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    for (const field of fields) {
        if (field.full) {
            doc.setFont('helvetica', 'bold');
            doc.text(`${field.label} :`, margin, y);
            doc.setFont('helvetica', 'normal');
            const dotStart = margin + doc.getTextWidth(`${field.label} : `) + 2;
            doc.text('.'.repeat(100), dotStart, y, { maxWidth: lineWidth - (dotStart - margin) });
            y += 10;
        } else {
            doc.setFont('helvetica', 'bold');
            doc.text(`${field.label} :`, margin, y);
            doc.setFont('helvetica', 'normal');
            const dotStart1 = margin + doc.getTextWidth(`${field.label} : `) + 2;
            const midX = pageWidth / 2 + 5;
            doc.text('.'.repeat(50), dotStart1, y, { maxWidth: midX - dotStart1 - 5 });

            if (field.label2) {
                doc.setFont('helvetica', 'bold');
                doc.text(`${field.label2} :`, midX, y);
                doc.setFont('helvetica', 'normal');
                const dotStart2 = midX + doc.getTextWidth(`${field.label2} : `) + 2;
                doc.text('.'.repeat(50), dotStart2, y, { maxWidth: pageWidth - margin - dotStart2 });
            }
            y += 10;
        }
    }

    y += 10;
    doc.setDrawColor(0, 150, 136);
    doc.rect(margin - 5, y - 5, lineWidth + 10, 85);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bolditalic');
    doc.text('Coordonnées de facturation si différentes (tous les champs sont obligatoires)', margin, y + 2);
    y += 10;

    doc.setFontSize(10);

    for (const field of billingFields) {
        if (field.full) {
            doc.setFont('helvetica', 'bold');
            doc.text(`${field.label} :`, margin, y);
            doc.setFont('helvetica', 'normal');
            const dotStart = margin + doc.getTextWidth(`${field.label} : `) + 2;
            doc.text('.'.repeat(100), dotStart, y, { maxWidth: lineWidth - (dotStart - margin) });
            y += 10;
        } else {
            doc.setFont('helvetica', 'bold');
            doc.text(`${field.label} :`, margin, y);
            doc.setFont('helvetica', 'normal');
            const dotStart1 = margin + doc.getTextWidth(`${field.label} : `) + 2;
            const midX = pageWidth / 2 + 5;
            doc.text('.'.repeat(50), dotStart1, y, { maxWidth: midX - dotStart1 - 5 });

            if (field.label2) {
                doc.setFont('helvetica', 'bold');
                doc.text(`${field.label2} :`, midX, y);
                doc.setFont('helvetica', 'normal');
                const dotStart2 = midX + doc.getTextWidth(`${field.label2} : `) + 2;
                doc.text('.'.repeat(50), dotStart2, y, { maxWidth: pageWidth - margin - dotStart2 });
            }
            y += 10;
        }
    }

    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('Votre n° de référence commande (si nécessaire) :', margin, y);
    doc.setFont('helvetica', 'normal');
    const refDotStart = margin + doc.getTextWidth('Votre n° de référence commande (si nécessaire) : ') + 2;
    doc.text('.'.repeat(50), refDotStart, y, { maxWidth: pageWidth - margin - refDotStart });

    doc.save('Formulaire-Reservation-SMCD-2026.pdf');
}

export async function generateReservationDOCX() {
    const dotLine = (length: number) => '.'.repeat(length);

    const createFieldRow = (label1: string, label2?: string): Paragraph => {
        const children: TextRun[] = [
            new TextRun({ text: `${label1} : `, bold: true, size: 20 }),
            new TextRun({ text: dotLine(40), size: 20 }),
        ];
        if (label2) {
            children.push(
                new TextRun({ text: `          ${label2} : `, bold: true, size: 20 }),
                new TextRun({ text: dotLine(30), size: 20 }),
            );
        }
        return new Paragraph({ children, spacing: { after: 200 } });
    };

    const createFullFieldRow = (label: string): Paragraph => {
        return new Paragraph({
            children: [
                new TextRun({ text: `${label} : `, bold: true, size: 20 }),
                new TextRun({ text: dotLine(80), size: 20 }),
            ],
            spacing: { after: 200 },
        });
    };

    const borderStyle = {
        style: BorderStyle.SINGLE,
        size: 2,
        color: '009688',
    };

    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 100 },
                    children: [
                        new TextRun({ text: FORM_TITLE, bold: true, size: 36, font: 'Calibri' }),
                    ],
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 },
                    children: [
                        new TextRun({ text: CONGRESS_TITLE, size: 20, font: 'Calibri', italics: true }),
                    ],
                }),

                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle },
                                    children: [
                                        new Paragraph({
                                            spacing: { after: 200 },
                                            children: [
                                                new TextRun({ text: 'Raison sociale ', bold: true, size: 20 }),
                                                new TextRun({ text: '(tous les champs sont obligatoires)', italics: true, size: 18 }),
                                            ],
                                        }),
                                        createFieldRow('Nom', 'Prénom'),
                                        createFieldRow('Fonction', 'GSM'),
                                        createFieldRow('Tél.', 'Email'),
                                        createFullFieldRow('Adresse'),
                                        createFieldRow('Code postal', 'Ville'),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),

                new Paragraph({ spacing: { after: 300 }, children: [] }),

                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle },
                                    children: [
                                        new Paragraph({
                                            spacing: { after: 200 },
                                            children: [
                                                new TextRun({ text: 'Coordonnées de facturation si différentes ', bold: true, size: 20 }),
                                                new TextRun({ text: '(tous les champs sont obligatoires)', italics: true, size: 18 }),
                                            ],
                                        }),
                                        createFullFieldRow('Nom de la société'),
                                        createFullFieldRow('Contact'),
                                        createFullFieldRow('Adresse'),
                                        createFieldRow('Code postal', 'Ville'),
                                        createFullFieldRow('Pays'),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),

                new Paragraph({ spacing: { after: 300 }, children: [] }),

                new Paragraph({
                    children: [
                        new TextRun({ text: 'Votre n° de référence commande (si nécessaire) : ', bold: true, size: 20 }),
                        new TextRun({ text: dotLine(40), size: 20 }),
                    ],
                }),
            ],
        }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'Formulaire-Reservation-SMCD-2026.docx');
}
