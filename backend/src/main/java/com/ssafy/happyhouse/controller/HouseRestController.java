package com.ssafy.happyhouse.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.HouseDealAVGDto;
import com.ssafy.happyhouse.model.HouseDealDto;
import com.ssafy.happyhouse.model.HouseInfoDto;
import com.ssafy.happyhouse.model.SidoGugunCodeDto;
import com.ssafy.happyhouse.model.service.HouseMapService;

@RestController
@RequestMapping("/map")
@CrossOrigin("*")
public class HouseRestController {
	
	private final Logger logger = LoggerFactory.getLogger(HouseRestController.class);

	@Autowired
	private HouseMapService houseMapService;
	
	@GetMapping("/sido")
	public ResponseEntity<List<SidoGugunCodeDto>> sido() throws Exception {
		logger.debug("sido : {}", houseMapService.getSido());
		return new ResponseEntity<List<SidoGugunCodeDto>>(houseMapService.getSido(), HttpStatus.OK);
	}
	
	@GetMapping("/gugun")
	public ResponseEntity<List<SidoGugunCodeDto>> gugun(@RequestParam("sido") String sido) throws Exception {
		return new ResponseEntity<List<SidoGugunCodeDto>>(houseMapService.getGugunInSido(sido), HttpStatus.OK);
	}
	
	@GetMapping("/dong")
	public ResponseEntity<List<HouseInfoDto>> dong(@RequestParam("gugun") String gugun) throws Exception {
		return new ResponseEntity<List<HouseInfoDto>>(houseMapService.getDongInGugun(gugun), HttpStatus.OK);
	}
	
	@GetMapping("/apt")
	public ResponseEntity<List<HouseInfoDto>> apt(@RequestParam("params") String params) throws Exception {
		String dong=params.split(",")[0];
		String aptName;
		if(params.split(",").length==1)aptName="";
		else aptName=params.split(",")[1];
		return new ResponseEntity<List<HouseInfoDto>>(houseMapService.getAptInDong(dong,aptName), HttpStatus.OK);
	}
	
	@GetMapping("/searchByAptName")
	public ResponseEntity<List<HouseInfoDto>> searchByAptName(@RequestParam("aptName") String aptName) throws Exception {
		return new ResponseEntity<List<HouseInfoDto>>(houseMapService.searchByAptName(aptName), HttpStatus.OK);
	}
	@GetMapping("/dealYear")
	public ResponseEntity<List<Integer>> dealYear(@RequestParam("aptCode") long aptCode) throws Exception{
		return new ResponseEntity<List<Integer>>(houseMapService.getDealYear(aptCode), HttpStatus.OK);
	}
	
	@GetMapping("/deal")
	public ResponseEntity<List<HouseDealDto>> deal(@RequestParam Map<String, Object> searchHouseDeal) throws Exception{
		System.out.println(searchHouseDeal);
		return new ResponseEntity<List<HouseDealDto>>(houseMapService.getHouseDeal(searchHouseDeal), HttpStatus.OK);
	}	
	@GetMapping("/aptcode")
	public ResponseEntity<HouseInfoDto> searchByAptCode(@RequestParam("aptCode") long aptCode) throws Exception{
		System.out.println(aptCode);
		return new ResponseEntity<HouseInfoDto>(houseMapService.getHouseInfo(aptCode), HttpStatus.OK);
	}
	@GetMapping("/dealAVG")
	public ResponseEntity<List<HouseDealAVGDto>> dealAvg(@RequestParam Map<String, Object> SearchParams) throws Exception{
		return new ResponseEntity<List<HouseDealAVGDto>>(houseMapService.getHouseDealAVG(SearchParams), HttpStatus.OK);
	}
	
}

