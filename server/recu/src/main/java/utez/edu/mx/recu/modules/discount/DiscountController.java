package utez.edu.mx.recu.modules.discount;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utez.edu.mx.recu.utils.APIResponse;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/discounts")
public class DiscountController {

    private final DiscountService service;

    public DiscountController(DiscountService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<APIResponse<Map<String, Double>>> calculate(
        @RequestBody Map<String, Double> payload
    ) {
        double amount = payload.getOrDefault("amount", 0.0);
        double percentage = payload.getOrDefault("percentage", 0.0);

        if (amount <= 0 || percentage <= 0 || percentage > 100) {
            return ResponseEntity.badRequest().body(
                APIResponse.error(
                    "Verifica la cantidad y el porcentaje (1 al 100)."
                )
            );
        }

        Map<String, Double> response = service.calculateDiscount(
            amount,
            percentage
        );
        return ResponseEntity.ok(
            APIResponse.success("Descuento calculado", response)
        );
    }
}
