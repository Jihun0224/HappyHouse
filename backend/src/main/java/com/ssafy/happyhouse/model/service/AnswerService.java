package com.ssafy.happyhouse.model.service;

import java.util.List;

import com.ssafy.happyhouse.model.AnswerDto;

public interface AnswerService {
	public List<AnswerDto> retrieveAnswer(int articleno) throws Exception;
	public boolean writeAnswer(AnswerDto answer) throws Exception;
	public boolean deleteAnswer(int answerno) throws Exception;
}
