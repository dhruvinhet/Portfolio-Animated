import os
import fitz  # PyMuPDF

cert_dir = r"d:\Portfolio-Animated\public\certificate"
for filename in os.listdir(cert_dir):
    if filename.endswith(".pdf"):
        pdf_path = os.path.join(cert_dir, filename)
        img_path = os.path.join(cert_dir, filename.replace(".pdf", ".jpeg"))
        
        # Open the PDF
        doc = fitz.open(pdf_path)
        if len(doc) > 0:
            page = doc.load_page(0)  # load the first page
            pix = page.get_pixmap()
            pix.save(img_path)
            print("Saved image for:", filename)
        doc.close()
