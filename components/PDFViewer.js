import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer() {
    const [numPages, setNumPages] = useState(null);
    return (
        <div>hehe
            <Document file='https://firebasestorage.googleapis.com/v0/b/legal-ai-8ebe8.appspot.com/o/pdfs%2FClarification030123_230103_175753.pdf1673159625145?alt=media&token=1d891d91-0d53-4845-bcb6-0c5f1eeb2114'>
            </Document>
        </div>
    );
}
