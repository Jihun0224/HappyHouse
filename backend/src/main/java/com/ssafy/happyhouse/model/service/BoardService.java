package com.ssafy.happyhouse.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.model.BoardDto;

public interface BoardService {
	public List<BoardDto> retrieveBoard(Map<String, String> map) throws Exception;
	public BoardDto detailBoard(int articleno) throws Exception;
	public boolean writeBoard(BoardDto board) throws Exception;
	public boolean updateBoard(BoardDto board) throws Exception;
	public boolean deleteBoard(int articleno) throws Exception;
}
