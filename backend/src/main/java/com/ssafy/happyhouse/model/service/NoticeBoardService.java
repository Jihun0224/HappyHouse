package com.ssafy.happyhouse.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.model.NoticeBoardDto;
import com.ssafy.util.PageNavigation;

public interface NoticeBoardService {
	void registerArticle(NoticeBoardDto noticeBoardDto) throws Exception;
	List<NoticeBoardDto> listArticle(Map<String, String> map) throws Exception;
	PageNavigation makePageNavigation(Map<String, String> map) throws Exception;
	NoticeBoardDto getArticle(int articleNo) throws Exception;
	void updateArticle(NoticeBoardDto noticeBoardDto) throws Exception;
	void deleteArticle(int articleNo) throws Exception;
}
