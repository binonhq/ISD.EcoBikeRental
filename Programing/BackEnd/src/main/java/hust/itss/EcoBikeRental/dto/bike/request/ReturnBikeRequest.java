package hust.itss.EcoBikeRental.dto.bike.request;

import hust.itss.EcoBikeRental.dto.bike.CreditCardInfo;
import lombok.Data;

@Data
public class ReturnBikeRequest {
    String bikeId;
    String stationId;
    CreditCardInfo creditCardInfo;
}
