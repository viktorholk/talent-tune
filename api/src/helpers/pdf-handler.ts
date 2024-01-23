import * as pdfjsLib from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

export default async function exportTextFromPDF(pdfPath: string): Promise<string> {
    const loadingTask = pdfjsLib.getDocument(pdfPath);
    const pdf: pdfjsLib.PDFDocumentProxy = await loadingTask.promise;

    let text = '';

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        const pageText = content.items
            .filter((item): item is TextItem => (item as TextItem).str !== undefined)
            .map(item => item.str)
            .join(' ');
        text += pageText + ' ';
    }

    return text.trim();
}
