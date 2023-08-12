package hust.itss.EcoBikeRental.service.impl;

import hust.itss.EcoBikeRental.dto.bike.*;
import hust.itss.EcoBikeRental.dto.bike.request.ReturnBikeRequest;
import hust.itss.EcoBikeRental.dto.bike.response.*;
import hust.itss.EcoBikeRental.entity.Bike;
import hust.itss.EcoBikeRental.entity.CreditCard;
import hust.itss.EcoBikeRental.entity.Station;
import hust.itss.EcoBikeRental.respository.BikeRepository;
import hust.itss.EcoBikeRental.respository.CreditCardRepository;
import hust.itss.EcoBikeRental.respository.StationRepository;
import hust.itss.EcoBikeRental.service.BikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class BikeServiceImpl implements BikeService {
    @Autowired
    BikeRepository bikeRepository;

    @Autowired
    CreditCardRepository creditCardRepository;

    @Autowired
    StationRepository stationRepository;

    @Override
    public GetListBikeByStationResponse getListBikeByStation(String station) {
        Optional<Station> stationDoc = stationRepository.findById(station);

        List<Bike> bikes = bikeRepository.findByStation(station);
        GetListBikeByStationResponse response = new GetListBikeByStationResponse();
        response.setBikes(bikes);
        response.setStation(stationDoc.get());
        return response;
    }

    @Override
    public GetBikeByIdResponse getBikeById(String id) {
        Bike bike = bikeRepository.findById(id).orElseThrow();
        GetBikeByIdResponse response = new GetBikeByIdResponse();
        response.setBike(bike);
        return response;
    }

    @Override
    public ReturnBikeResponse returnBike(ReturnBikeRequest request) {
        Optional<Bike> bikeDoc = bikeRepository.findById(request.getBikeId());

        if (bikeDoc.isEmpty()) {
            return new ReturnBikeResponse(HttpStatus.NOT_FOUND, "Bike " + request.getBikeId() + " not found");
        }

        Optional<Station> stationDoc = stationRepository.findById(request.getStationId());

        if (stationDoc.isEmpty()) {
            return new ReturnBikeResponse(HttpStatus.NOT_FOUND, "Station " + request.getStationId() + " not found");
        }

        String regex = "^(0[1-9]|1[0-2])\\/(\\d{2})$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(request.getCreditCardInfo().getExpDate());

        if(!matcher.matches()) {
            return new ReturnBikeResponse(HttpStatus.BAD_REQUEST, "Exp date is invalid");
        }

        int month = Integer.parseInt(matcher.group(1));

        if(month < 1 || month > 12) {
            return new ReturnBikeResponse(HttpStatus.BAD_REQUEST, "Exp date month is invalid");
        }

        if(!request.getCreditCardInfo().getCode().matches("^\\d{3}$")) {
            return new ReturnBikeResponse(HttpStatus.BAD_REQUEST, "Cvv code is invalid");
        }

        CreditCard creditCard = creditCardRepository.findByCardHolderAndCardCodeAndCodeAndExpDate(request.getCreditCardInfo().getCardHolder(), request.getCreditCardInfo().getCardCode(), request.getCreditCardInfo().getCode(), request.getCreditCardInfo().getExpDate());
        if (creditCard == null) {
            return new ReturnBikeResponse(HttpStatus.NOT_FOUND, "Credit card is invalid");
        }

        Bike bike = bikeDoc.get();
        Station station = stationDoc.get();

        Instant startTime = bike.getRentTime().toInstant();
        Instant endTime = new Date().toInstant();

        Duration duration = Duration.between(startTime, endTime);

        long minutes = duration.toMinutes();

        double totalPrice = 0;

        double afterReturnDepoisit = creditCard.getBalance() + bike.getValue() * 40 / 100;

        if(minutes > 10) {
            if(minutes <= 30) {
                totalPrice = 10000;
            } else {
                minutes -= 30;

                double factor = (double) minutes /15;
                factor = Math.ceil(factor);

                totalPrice = 10000 + factor * 3000;

                if(bike.getType().equals("electric") || bike.getType().equals("twin")) {
                    totalPrice += totalPrice/2;
                }
            }
        }

        if(afterReturnDepoisit < totalPrice) {
            return new ReturnBikeResponse(HttpStatus.BAD_REQUEST, "Credit card balance is not enough");
        }

        creditCard.setBalance(afterReturnDepoisit - totalPrice);
        bike.setStation(request.getStationId());
        bike.setStatus(false);
        station.getBikes().add(request.getBikeId());
        creditCardRepository.save(creditCard);
        bikeRepository.save(bike);
        stationRepository.save(station);

        return new ReturnBikeResponse(HttpStatus.OK, "Return bike and pay successfully (total " + minutes + " minutes and " + totalPrice + " VND)");
    }

    @Override
    public RentBikeResponse rentBike(String id, CreditCardInfo request) {
        String regex = "^(0[1-9]|1[0-2])\\/(\\d{2})$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(request.getExpDate());

        if(!matcher.matches()) {
            return new RentBikeResponse(HttpStatus.BAD_REQUEST, "Exp date is invalid");
        }

        int month = Integer.parseInt(matcher.group(1));

        if(month < 1 || month > 12) {
            return new RentBikeResponse(HttpStatus.BAD_REQUEST, "Exp date month is invalid");
        }

        if(!request.getCode().matches("^\\d{3}$")) {
            return new RentBikeResponse(HttpStatus.BAD_REQUEST, "Cvv code is invalid");
        }

        CreditCard creditCard = creditCardRepository.findByCardHolderAndCardCodeAndCodeAndExpDate(request.getCardHolder(), request.getCardCode(), request.getCode(), request.getExpDate());
        System.out.println(creditCard);

        if (creditCard == null) {
            return new RentBikeResponse(HttpStatus.NOT_FOUND, "Credit card not found");
        }


        Optional<Bike> bike = bikeRepository.findById(id);
        if (bike.isEmpty()) {
            return new RentBikeResponse(HttpStatus.NOT_FOUND, "Bike not found");
        }

        if (bike.get().getStatus()) {
            return new RentBikeResponse(HttpStatus.BAD_REQUEST, "Bike is rented");
        }

        Bike updatedBike = bike.get();
        double deposit = updatedBike.getValue() * 40 / 100;
        if (deposit > creditCard.getBalance()) {
            return new RentBikeResponse(HttpStatus.BAD_REQUEST, "Your balance is not enough to deposit bike");
        }

        creditCard.setBalance(creditCard.getBalance() - deposit);
        creditCardRepository.save(creditCard);

        Optional<Station> station = stationRepository.findById(updatedBike.getStation());

        if (station.isEmpty()) {
            return new RentBikeResponse(HttpStatus.NOT_FOUND, "Station not found");
        }

        if (!station.get().getBikes().contains(updatedBike.getId())) {
            return new RentBikeResponse(HttpStatus.NOT_FOUND, "Bike not found in " + station.get().getLocation());
        }

        Station updatedStation = station.get();
        updatedStation.getBikes().remove(updatedBike.getId());
        stationRepository.save(updatedStation);

        updatedBike.setStatus(true);
        updatedBike.setRentTime(new Date());
        updatedBike.setStation(null);
        bikeRepository.save(updatedBike);

        return new RentBikeResponse(HttpStatus.OK, "Rent bike successfully");
    }

    @Override
    public GetBikeByBarcodeResponse getBikeByBarcode(String barcode) {
        Bike bike = bikeRepository.findByBarcode(barcode);
        if (bike == null) {
            return new GetBikeByBarcodeResponse(HttpStatus.NOT_FOUND, "Bike with barcode " + barcode + " not found");
        }

        return new GetBikeByBarcodeResponse(HttpStatus.OK, "Bike found", bike);
    }


}
