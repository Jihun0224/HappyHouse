package com.ssafy.happyhouse.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.happyhouse.model.AnswerDto;

@Mapper
public interface AnswerMapper {
	public List<AnswerDto> selectAnswer(int articleno);
	public int insertAnswer(AnswerDto answer);
	public int deleteAnswer(int answerno);

}
