package com.ssafy.happyhouse.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.model.BookmarkDto;
import com.ssafy.happyhouse.model.HouseInfoDto;
import com.ssafy.happyhouse.model.mapper.BookmarkMapper;

@Service
public class BookmarkServiceImpl implements BookmarkService {

	@Autowired
	private BookmarkMapper bookmarkMapper;

	@Override
	public boolean registerBookmark(BookmarkDto bookmarkdto) throws SQLException {
		return bookmarkMapper.bookmarkRegister(bookmarkdto);
	}

	@Override
	public void removeBookmark(BookmarkDto bookmarkdto) throws SQLException {
		bookmarkMapper.bookmarkRemove(bookmarkdto);
	}

	@Override
	public List<HouseInfoDto> listBookmark(String userid) throws SQLException {
		return bookmarkMapper.bookmarkList(userid);
	}

	@Override
	public boolean existBookmark(Map<String, Object> searchBookmark) throws SQLException {
		return bookmarkMapper.bookmarkExist(searchBookmark) > 0;
	}

}
