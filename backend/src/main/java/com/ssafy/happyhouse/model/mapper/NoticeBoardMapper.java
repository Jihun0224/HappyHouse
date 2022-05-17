package com.ssafy.happyhouse.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.happyhouse.model.NoticeBoardDto;

@Mapper
public interface NoticeBoardMapper {
	void registerArticle(NoticeBoardDto noticeBoardDto) throws Exception;
	List<NoticeBoardDto> listArticle(Map<String, Object> map) throws Exception;
	int getTotalCount(Map<String, String> map) throws Exception;
	NoticeBoardDto getArticle(int articleNo) throws Exception;
	void updateArticle(NoticeBoardDto noticeBoardDto) throws Exception;
	void deleteArticle(int articleNo) throws Exception;
}
