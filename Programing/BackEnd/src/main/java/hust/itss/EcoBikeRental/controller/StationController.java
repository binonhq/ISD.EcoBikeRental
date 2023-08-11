package hust.itss.EcoBikeRental.controller;

import hust.itss.EcoBikeRental.dto.station.GetListStationResponse;
import hust.itss.EcoBikeRental.dto.station.GetStationByIdResponse;
import hust.itss.EcoBikeRental.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/station")
@CrossOrigin(origins = "*")
public class StationController {
    @Autowired
    StationService stationService;

    @GetMapping
    public ResponseEntity<GetListStationResponse> getListStation(@RequestParam(defaultValue = "") String location, @RequestParam(defaultValue = "false") Boolean notFull) {
        GetListStationResponse response = stationService.getListStation(location, notFull);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{stationId}")
    public ResponseEntity<GetStationByIdResponse> getStationById(@PathVariable String stationId) {
        GetStationByIdResponse response = stationService.getStationById(stationId);
        return ResponseEntity.ok(response);
    }

}
