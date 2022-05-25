package com.ssafy.happyhouse.model.service;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.happyhouse.model.BookmarkDto;
import com.ssafy.happyhouse.model.HouseInfoDto;


public interface BookmarkService {

	List<HouseInfoDto> listBookmark(String userid)throws SQLException;

	boolean registerBookmark(BookmarkDto bookmarkdto) throws SQLException;

	void removeBookmark(BookmarkDto bookmarkdto)throws SQLException;

}
