package com.ssafy.happyhouse.model.service;

import java.util.List;

import com.ssafy.happyhouse.model.AnswerDto;

public interface AnswerService {
	public List<AnswerDto> retrieveAnswer(int articleno);
	public boolean writeAnswer(AnswerDto answer);
	public boolean deleteAnswer(int answerno);
}
