package com.ssafy.happyhouse.controller;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.BookmarkDto;
import com.ssafy.happyhouse.model.HouseInfoDto;
import com.ssafy.happyhouse.model.NoticeDto;
import com.ssafy.happyhouse.model.service.BookmarkService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/bookmark")
@Api("관심아파트등록  API V1")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BookmarkController {
	@Autowired
	private BookmarkService bookmarkService;

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";


	@ApiOperation(value = "관심아파트등록", notes = "관심아파트를 등록한다. ", response = BookmarkDto.class)
	@PostMapping
	public ResponseEntity<String> registerBookmark(@RequestBody BookmarkDto bookmarkdto) throws Exception {
		System.out.println(bookmarkdto.toString());
		if (bookmarkService.registerBookmark(bookmarkdto)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "관심아파트 목록", notes = "관심아파트 목록을 확인한다..", response = HouseInfoDto.class)
	@GetMapping("/list")
	public ResponseEntity<List<HouseInfoDto>> ReviewList(@RequestParam String userid) throws Exception {
		return new ResponseEntity<List<HouseInfoDto>>(bookmarkService.listBookmark(userid),HttpStatus.OK);
	}
	
	@ApiOperation(value = "관심아파트 등록 유무 확인", notes = "선택한 관심아파트가 등록되어 있는지 확인한다..", response = Boolean.class)
	@GetMapping("/exist")
	public ResponseEntity<Boolean> existBookmark(@RequestParam Map<String, Object> searchBookmark) throws Exception {
		return new ResponseEntity<Boolean>(bookmarkService.existBookmark(searchBookmark), HttpStatus.OK);
	}
	
	@ApiOperation(value = "관심아파트 삭제", notes = "해당 관심아파트 삭제. ")
	@PostMapping("/delete")
	public ResponseEntity<String> removeBookmark(@RequestBody BookmarkDto bookmarkdto) throws Exception {
		System.out.println(bookmarkdto.toString());
		bookmarkService.removeBookmark(bookmarkdto);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
}