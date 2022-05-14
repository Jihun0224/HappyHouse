package com.ssafy.service;

import java.io.IOException;
import java.util.List;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import com.ssafy.dto.NewsDto;
@Service
public class NewsService {
	private static String CRAWLING_URL = "";

	public List<NewsDto> webCrawling(){
		 try {
			CRAWLING_URL="https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=260";
			Connection conn = Jsoup.connect(CRAWLING_URL);
			Document html = conn.get();
			System.out.println(html.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
}
