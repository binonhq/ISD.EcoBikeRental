package hust.itss.EcoBikeRental.dto.bike;

import lombok.Data;

@Data
public class CreditCardInfo {
    private String cardHolder;
    private String cardCode;
    private String code;
    private String expDate;
}
