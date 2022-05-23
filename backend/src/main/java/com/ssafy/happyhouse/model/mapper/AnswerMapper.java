package com.ssafy.happyhouse.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.happyhouse.model.AnswerDto;

@Mapper
public interface AnswerMapper {
	public List<AnswerDto> selectAnswer(int articleno) throws SQLException;
	public int insertAnswer(AnswerDto answer) throws SQLException;
	public int deleteAnswer(int answerno) throws SQLException;

}
