package com.ssafy.happyhouse.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.model.HouseDealAVGDto;
import com.ssafy.happyhouse.model.HouseDealDto;
import com.ssafy.happyhouse.model.HouseInfoDto;
import com.ssafy.happyhouse.model.SidoGugunCodeDto;

public interface HouseMapMapper {

	List<SidoGugunCodeDto> getSido() throws SQLException;
	List<SidoGugunCodeDto> getGugunInSido(String sido) throws SQLException;
	List<HouseInfoDto> getDongInGugun(String gugun) throws SQLException;
	List<HouseInfoDto> getAptInDong(String dong,String aptName) throws SQLException;
	List<HouseInfoDto> searchByAptName(String aptName) throws SQLException;
	List<Integer> getDealYear(long aptCode) throws SQLException;
	List<HouseDealDto> getHouseDeal(Map<String, Object> searchHouseDealDto) throws SQLException;
	HouseInfoDto getHouseInfo(long aptCode) throws SQLException;
	List<HouseDealAVGDto>getHouseDealAVG(Map<String, Object> searchHouseDealAVGDto) throws SQLException;
}
