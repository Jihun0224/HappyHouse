package com.ssafy.happyhouse.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.happyhouse.model.BookmarkDto;
import com.ssafy.happyhouse.model.HouseInfoDto;

@Mapper
public interface BookmarkMapper {
	List<HouseInfoDto> bookmarkList(String userid) throws SQLException;
	int bookmarkRemove(int bookmarkno) throws SQLException;
	boolean bookmarkRegister(BookmarkDto bookmarkdto) throws SQLException;
}
