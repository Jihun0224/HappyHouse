package com.ssafy.happyhouse.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.model.BoardDto;

public interface BoardService {
	public List<BoardDto> retrieveBoard(Map<String, String> map);
	public BoardDto detailBoard(int articleno);
	public boolean writeBoard(BoardDto board);
	public boolean updateBoard(BoardDto board);
	public boolean deleteBoard(int articleno);
}
