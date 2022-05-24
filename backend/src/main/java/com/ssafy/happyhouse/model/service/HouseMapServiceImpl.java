package com.ssafy.happyhouse.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.model.HouseDealAVGDto;
import com.ssafy.happyhouse.model.HouseDealDto;
import com.ssafy.happyhouse.model.HouseInfoDto;
import com.ssafy.happyhouse.model.SidoGugunCodeDto;
import com.ssafy.happyhouse.model.mapper.HouseMapMapper;

@Service
public class HouseMapServiceImpl implements HouseMapService {
	
	@Autowired
	private HouseMapMapper houseMapMapper;

	@Override
	public List<SidoGugunCodeDto> getSido() throws Exception {
		return houseMapMapper.getSido();
	}

	@Override
	public List<SidoGugunCodeDto> getGugunInSido(String sido) throws Exception {
		return houseMapMapper.getGugunInSido(sido);
	}

	@Override
	public List<HouseInfoDto> getDongInGugun(String gugun) throws Exception {
		return houseMapMapper.getDongInGugun(gugun);
	}

	@Override
	public List<HouseInfoDto> getAptInDong(String dong,String aptName) throws Exception {
		return houseMapMapper.getAptInDong(dong,aptName);
	}

	@Override
	public List<HouseInfoDto> searchByAptName(String aptName) throws SQLException {
		return houseMapMapper.searchByAptName(aptName);
	}

	@Override
	public List<Integer> getDealYear(long aptCode) throws SQLException {
		return houseMapMapper.getDealYear(aptCode);
	}
	
	@Override
	public List<HouseDealDto> getHouseDeal(Map<String, Object> searchHouseDealDto) throws SQLException {
		return houseMapMapper.getHouseDeal(searchHouseDealDto);
	}
	@Override
	public List<HouseDealAVGDto> getHouseDealAVG(Map<String, Object> searchHouseDealAVGDto) throws SQLException {
		return houseMapMapper.getHouseDealAVG(searchHouseDealAVGDto);
	}
}
