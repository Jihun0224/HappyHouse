package com.ssafy.happyhouse.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.model.HouseDealAVGDto;
import com.ssafy.happyhouse.model.HouseDealDto;
import com.ssafy.happyhouse.model.HouseInfoDto;
import com.ssafy.happyhouse.model.SidoGugunCodeDto;

public interface HouseMapService {

	List<SidoGugunCodeDto> getSido() throws Exception;
	List<SidoGugunCodeDto> getGugunInSido(String sido) throws Exception;
	List<HouseInfoDto> getDongInGugun(String gugun) throws Exception;
	List<HouseInfoDto> getAptInDong(String dong,String aptName) throws Exception;
	List<HouseInfoDto> searchByAptName(String aptName) throws SQLException;
	List<Integer> getDealYear(long aptCode) throws SQLException;
	List<HouseDealDto> getHouseDeal(Map<String, Object> searchHouseDealDto) throws SQLException;
	List<HouseDealAVGDto> getHouseDealAVG(Map<String, Object> SearchParams) throws SQLException;

}
