package com.ssafy.happyhouse.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.happyhouse.model.BoardDto;
@Mapper
public interface BoardMapper {
	public List<BoardDto> selectBoard(Map<String, String> map) throws SQLException;
	public BoardDto selectBoardByNo(int articleno) throws SQLException;
	public int insertBoard(BoardDto board) throws SQLException;
	public int updateBoard(BoardDto board) throws SQLException;
	public int deleteBoard(int articleno) throws SQLException;
}