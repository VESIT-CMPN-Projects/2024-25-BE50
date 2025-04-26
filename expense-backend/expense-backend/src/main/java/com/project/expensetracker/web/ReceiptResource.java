package com.project.expensetracker.web;

import com.project.expensetracker.services.OCRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/receipt")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular frontend access
public class ReceiptResource {

    @Autowired
    private OCRService ocrService;

    @PostMapping("/scan")
    public ResponseEntity<String> scanReceipt(@RequestParam("file") MultipartFile file) throws IOException {
        // Save file temporarily
        Path tempFile = Files.createTempFile("receipt_", ".jpg");
        Files.copy(file.getInputStream(), tempFile, StandardCopyOption.REPLACE_EXISTING);

        // Extract text using OCR
        String extractedText;
        try {
            extractedText = ocrService.extractTextFromImage(tempFile.toFile());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error processing image");
        }

        // Delete temp file
        Files.delete(tempFile);

        return ResponseEntity.ok(extractedText);
    }
}
