package com.ssafy.happyhouse.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.happyhouse.model.mapper.AnswerMapper;
import com.ssafy.happyhouse.model.AnswerDto;

@Service
public class AnswerServiceImpl implements AnswerService {
	
    @Autowired
	private AnswerMapper answerMapper;

	@Override
	public List<AnswerDto> retrieveAnswer(int articleno) {
		return answerMapper.selectAnswer(articleno);
	}

	@Override
	public boolean writeAnswer(AnswerDto answer) {
		return answerMapper.insertAnswer(answer) == 1;
	}

	@Override
	@Transactional
	public boolean deleteAnswer(int answerno) {
		return answerMapper.deleteAnswer(answerno) == 1;
	}
}