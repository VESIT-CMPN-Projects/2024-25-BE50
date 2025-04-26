package com.project.expensetracker.services;

import com.project.expensetracker.repo.ExpenseRepository;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
import org.json.JSONObject;
import org.springframework.web.multipart.MultipartFile;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.*;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

@Service
public class ExpenseService {

    @Autowired
    public ExpenseRepository expenseRepository;

    @Value("${twilio.accountSid}")
    private String ACCOUNT_SID;

    @Value("${twilio.authToken}")
    private String AUTH_TOKEN;

    private final String uploadDir = "uploads/";

    public List<Map<String, Object>> getCategories() {
        return expenseRepository.getCategories();
    }

    public ResponseEntity<Map<String, Object>> addExpense(Map<String, Object> body) {
        String income_expense = (String) body.get("income_Expense");
        String expenseName = (String) body.get("expenseName");
        int expenseAmount = (body.get("expenseAmount") instanceof Number)
                ? ((Number) body.get("expenseAmount")).intValue()
                : Integer.parseInt(body.get("expenseAmount").toString());
        String expenseDescription = (String) body.get("expenseDescription");
        String expenseDate = (String) body.get("expenseDate");
        int categoryNameID = Integer.parseInt((String) body.get("categoryNameID"));
        String tags = (String) body.get("tags");
        Integer userId = Integer.parseInt((String) body.get("userId"));

        int noOfRows = expenseRepository.addExpense(income_expense, expenseName, expenseAmount, expenseDescription, expenseDate, categoryNameID, tags, userId);
        if (noOfRows > 0) {
            return ResponseEntity.ok(Map.of("status", "success adding expense"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("status", "error adding expense"));
    }

    public List<Map<String, Object>> getExpenses(int userId) {
        return expenseRepository.getExpenses(userId);
    }

    public List<Map<String, Object>> getExpensesCategoryWise(int userId) {
        return expenseRepository.getExpensesCategoryWise(userId);
    }

    @Scheduled(cron = "3 * * * * *")
    public void getPhoneNumber() {
        List<Map<String, Object>> phone = expenseRepository.getPhoneNumber();
        System.out.println(phone);
        for (Map<String, Object> map : phone) {
            System.out.println(map.get("phone_number"));
            String phone_number = (String) map.get("phone_number");
            int userId = (int) map.get("user_id");
            sendWhatsappMessage(phone_number, userId);
        }
    }

    public void sendWhatsappMessage(String phone, int userId) {
        System.out.println("sending whatsapp message");

        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(
                        new com.twilio.type.PhoneNumber("whatsapp:+91" + phone),
                        new com.twilio.type.PhoneNumber("whatsapp:+14155238886"),
                        "Hey!  Its long time you've not entered your expense so you can just make an entry here we will do the rest" +
                                "Please enter your expense details in the following format: \n" +
                                "User ID: " + userId + "\n" +
                                "Expense Name: \n" +
                                "Expense Amount: \n" +
                                "Expense Description: \n" +
                                "Expense Date: \n" +
                                "Category Name ID: \n" +
                                "Tags: \n" +
                                "Thank you! :\n" +
                                " Copy the above message and paste it in the chat and fill the details."
                )
                .create();

        System.out.println(message.getSid() + " " + message.getStatus());
    }

    public boolean addExpenseFromWhatsapp(String body) throws JSONException {
        String[] lines = body.split("\n");
        String expenseName = "";
        String expenseAmount = "";
        String expenseDescription = "";
        String expenseDate = "";
        String categoryNameID = "";
        String tags = "";
        String userId = "";

        for (String line : lines) {
            if (line.contains("Expense Name:")) {
                expenseName = line.split(":")[1].trim();
            } else if (line.contains("Expense Amount:")) {
                expenseAmount = line.split(":")[1].trim();
            } else if (line.contains("Expense Description:")) {
                expenseDescription = line.split(":")[1].trim();
            } else if (line.contains("Expense Date:")) {
                expenseDate = line.split(":")[1].trim();
            } else if (line.contains("Category Name ID:")) {
                categoryNameID = line.split(":")[1].trim();
            } else if (line.contains("Tags:")) {
                tags = line.split(":")[1].trim();
            } else if (line.contains("User ID:")) {
                userId = line.split(":")[1].trim();
            }
        }

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("expenseName", expenseName);
        jsonObject.put("expenseAmount", expenseAmount);
        jsonObject.put("expenseDescription", expenseDescription);
        jsonObject.put("expenseDate", expenseDate);
        jsonObject.put("categoryNameID", categoryNameID);
        jsonObject.put("tags", tags);
        jsonObject.put("userId", userId);

        return Objects.equals(addExpense(jsonObject.toMap()), ResponseEntity.ok(Map.of("status", "success adding expense")));
    }

    public Map<String, Object> getTotalMonthlyExpense(int userId) {
        return expenseRepository.getTotalMonthlyExpense(userId);
    }

    // -------------------------------
    // 🔹 ADDED processReceipt METHOD
    // -------------------------------
    public ResponseEntity<Map<String, Object>> processReceipt(MultipartFile file, Integer userId) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("status", "File is empty"));
        }

        try {
            Path directoryPath = Paths.get(uploadDir);
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }

            Path filePath = Paths.get(uploadDir, file.getOriginalFilename());
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String extractedText = extractTextFromImage(filePath.toFile());

            Map<String, Object> parsedExpense = parseReceiptText(extractedText, userId);

            if (Objects.equals(addExpense(parsedExpense), ResponseEntity.ok(Map.of("status", "success adding expense")))) {
                return ResponseEntity.ok(Map.of("status", "Receipt processed successfully", "expense", parsedExpense));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("status", "Error processing receipt"));
            }

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("status", "File processing failed", "error", e.getMessage()));
        }
    }

    private String extractTextFromImage(File file) {
        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("tessdata");
        try {
            return tesseract.doOCR(file);
        } catch (TesseractException e) {
            e.printStackTrace();
            return "Error extracting text";
        }
    }

    private Map<String, Object> parseReceiptText(String text, Integer userId) {
        String[] lines = text.split("\n");
        String expenseName = "";
        String expenseAmount = "";
        String expenseDate = "";

        for (String line : lines) {
            if (line.toLowerCase().contains("total") || line.toLowerCase().contains("amount")) {
                expenseAmount = line.replaceAll("[^0-9.]", "").trim();
            } else if (line.toLowerCase().contains("date")) {
                expenseDate = line.replaceAll("[^0-9/-]", "").trim();
            } else if (!line.trim().isEmpty()) {
                expenseName = line.trim();
            }
        }

        if (expenseDate.isEmpty()) {
            expenseDate = LocalDate.now().toString();
        }

        return Map.of("expenseName", expenseName, "expenseAmount", expenseAmount, "expenseDate", expenseDate, "userId", userId);
    }
}
