package utez.edu.mx.recu.modules.discount;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class DiscountService {

    public Map<String, Double> calculateDiscount(
        double amount,
        double percentage
    ) {
        double discount = round(amount * (percentage / 100.0));
        double total = round(amount - discount);
        Map<String, Double> result = new HashMap<>();
        result.put("amount", round(amount));
        result.put("percentage", round(percentage));
        result.put("discount", discount);
        result.put("total", total);
        return result;
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
