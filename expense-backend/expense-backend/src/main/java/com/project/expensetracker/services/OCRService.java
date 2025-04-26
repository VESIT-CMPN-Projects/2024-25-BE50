package com.project.expensetracker.services;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;
import java.io.File;

@Service
public class OCRService {

    public String extractTextFromImage(File imageFile) throws TesseractException {
        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("C:\\Program Files\\Tesseract-OCR\\tessdata"); // Update this path
        tesseract.setLanguage("eng"); // Set language to English

        return tesseract.doOCR(imageFile);
    }
}
