import * as pdfjsLib from "pdfjs-dist";
import { TextItem } from "pdfjs-dist/types/src/display/api";

export async function textFromPDF(base64String: string) {
  base64String = base64String.replace(/\s/g, "");
  base64String = base64String.replace("data:application/pdf;base64,", "");

  const bytes = Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));

  const pdfDocument = await pdfjsLib.getDocument(bytes).promise;

  let fullText = "";
  const numPages = pdfDocument.numPages;

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const textContent = await page.getTextContent();

    textContent.items.forEach((item) => {
      item = item as TextItem;
      fullText += item.str + " ";
    });
  }

  return fullText.trim();
}
