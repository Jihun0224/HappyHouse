package com.ssafy.happyhouse.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.happyhouse.model.NoticeBoardDto;
import com.ssafy.happyhouse.model.mapper.NoticeBoardMapper;
import com.ssafy.util.PageNavigation;

@Service
public class NoticeBoardServiceImpl implements NoticeBoardService{

	@Autowired
	private NoticeBoardMapper noticeBoardMapper;

	@Override
	@Transactional
	public void registerArticle(NoticeBoardDto noticeBoardDto) throws Exception {
		noticeBoardMapper.registerArticle(noticeBoardDto);
	}

	@Override
	public List<NoticeBoardDto> listArticle(Map<String, String> map) throws Exception {
		Map<String, Object> param = new HashMap<String, Object>();
		String key = map.get("key");
		if("userid".equals(key))
			key = "g.userid";
		param.put("key", key == null ? "" : key);
		param.put("word", map.get("word") == null ? "" : map.get("word"));
		int currentPage = Integer.parseInt(map.get("pg") == null ? "1" : map.get("pg"));
		int sizePerPage = Integer.parseInt(map.get("spp"));
		int start = (currentPage - 1) * sizePerPage;
		param.put("start", start);
		param.put("spp", sizePerPage);
		return noticeBoardMapper.listArticle(param);
	}

	@Override
	public PageNavigation makePageNavigation(Map<String, String> map) throws Exception {
PageNavigation pageNavigation = new PageNavigation();
		
		int naviSize = 10;
		//int currentPage = Integer.parseInt(map.get("pg"));
		int currentPage = 1;
		int sizePerPage = Integer.parseInt(map.get("spp"));
		
		pageNavigation.setCurrentPage(currentPage);
		pageNavigation.setNaviSize(naviSize);
		int totalCount = noticeBoardMapper.getTotalCount(map);
		pageNavigation.setTotalCount(totalCount);
		int totalPageCount = (totalCount - 1) / sizePerPage + 1;
		pageNavigation.setTotalPageCount(totalPageCount);
		boolean startRange = currentPage <= naviSize;
		pageNavigation.setStartRange(startRange);
		boolean endRange = (totalPageCount - 1) / naviSize * naviSize < currentPage;
		pageNavigation.setEndRange(endRange);
		pageNavigation.makeNavigator();
		
		return pageNavigation;
	}

	@Override
	public NoticeBoardDto getArticle(int articleNo) throws Exception {
		return noticeBoardMapper.getArticle(articleNo);
	}

	@Override
	public void updateArticle(NoticeBoardDto noticeBoardDto) throws Exception {
		noticeBoardMapper.updateArticle(noticeBoardDto);
	}

	@Override
	@Transactional
	public void deleteArticle(int articleNo) throws Exception {
		noticeBoardMapper.deleteArticle(articleNo);
	}
	
	
}
