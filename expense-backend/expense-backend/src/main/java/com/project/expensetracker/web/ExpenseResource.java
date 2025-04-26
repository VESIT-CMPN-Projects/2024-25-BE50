package com.project.expensetracker.web;

import com.project.expensetracker.services.ExpenseService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ExpenseResource {

    @Autowired
    ExpenseService expenseService;

    @GetMapping("/categories")
    public List<Map<String, Object>> getCategories() {
        return expenseService.getCategories();
    }

    @PostMapping("/add-expense")
    public ResponseEntity<Map<String,Object>> addExpense(@RequestBody Map<String,Object> body) {
        return expenseService.addExpense(body);
    }

    @GetMapping("/expenses/{userId}")
    public List<Map<String,Object>> getExpenses(@PathVariable int userId) {
        return expenseService.getExpenses(userId);
    }

    @GetMapping("/expense-category/{userId}")
    public List<Map<String,Object>> getExpensesCategoryWise(@PathVariable int userId) {
        return expenseService.getExpensesCategoryWise(userId);
    }

    @PostMapping("/whatsapp")
    public String handleTwilioRequest(@RequestParam("From") String from,
                                      @RequestParam("To") String to,
                                      @RequestParam("Body") String body) throws JSONException {
        System.out.println("Received Twilio request from: " + from);
        System.out.println("Message body: " + body);
        if(expenseService.addExpenseFromWhatsapp(body)) {
            return "Expense added successfully";
        }
        return "Please give details properly!";
    }

    @GetMapping("/monthly-total-expense/{userId}")
    public Map<String,Object> getTotalMonthlyExpense(@PathVariable int userId) {
        return expenseService.getTotalMonthlyExpense(userId);
    }

    // ✅ Added Receipt Upload API
    @PostMapping("/upload-receipt")
    public ResponseEntity<Map<String, Object>> uploadReceipt(@RequestParam("file") MultipartFile file,
                                                             @RequestParam("userId") int userId) throws IOException {
        return expenseService.processReceipt(file, userId);
    }
}
