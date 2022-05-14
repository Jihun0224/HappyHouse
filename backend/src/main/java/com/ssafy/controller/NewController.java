package com.ssafy.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.dto.NewsDto;
import com.ssafy.service.NewsService;


@RestController
@RequestMapping("/news")
public class NewController {
	private static final Logger logger = LoggerFactory.getLogger(NewController.class);
	
	@Autowired
	private NewsService newsService;
	
	@GetMapping("")
	public ResponseEntity<List<NewsDto>> getNews(){
		List<NewsDto>newsList=newsService.webCrawling();
		logger.debug(newsList.toString());
		return ResponseEntity.status(HttpStatus.OK).body(newsList);
	}
}
