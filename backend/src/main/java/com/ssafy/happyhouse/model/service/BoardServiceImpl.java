package com.ssafy.happyhouse.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.happyhouse.model.mapper.BoardMapper;
import com.ssafy.happyhouse.model.BoardDto;

@Service
public class BoardServiceImpl implements BoardService {
	
    @Autowired
	private BoardMapper boardMapper;

    @Override
	public List<BoardDto> retrieveBoard(Map<String, String> map) throws Exception {
		return boardMapper.selectBoard(map);
	}
    
  	@Override
	public boolean writeBoard(BoardDto board) throws Exception {
		return boardMapper.insertBoard(board) == 1;
	}

	@Override
	public BoardDto detailBoard(int articleno) throws Exception {
		return boardMapper.selectBoardByNo(articleno);
	}

	@Override
	@Transactional
	public boolean updateBoard(BoardDto board) throws Exception {
		return boardMapper.updateBoard(board) == 1;
	}

	@Override
	@Transactional
	public boolean deleteBoard(int articleno) throws Exception {
		return boardMapper.deleteBoard(articleno) == 1;
	}
}