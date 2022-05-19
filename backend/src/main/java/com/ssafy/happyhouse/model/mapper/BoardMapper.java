package com.ssafy.happyhouse.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.happyhouse.model.BoardDto;
@Mapper
public interface BoardMapper {
	public List<BoardDto> selectBoard(Map<String, String> map);
	public BoardDto selectBoardByNo(int articleno);
	public int insertBoard(BoardDto board);
	public int updateBoard(BoardDto board);
	public int deleteBoard(int articleno);
}