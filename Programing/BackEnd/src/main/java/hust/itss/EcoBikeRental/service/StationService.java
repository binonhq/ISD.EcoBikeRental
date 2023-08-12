package hust.itss.EcoBikeRental.service;

import hust.itss.EcoBikeRental.dto.station.response.GetListStationResponse;
import hust.itss.EcoBikeRental.dto.station.response.GetStationByIdResponse;

public interface StationService {
    GetListStationResponse getListStation(String location , Boolean notFull);
    GetStationByIdResponse getStationById(String id);
}
