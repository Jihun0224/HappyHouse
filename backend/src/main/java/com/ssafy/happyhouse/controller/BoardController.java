package com.ssafy.happyhouse.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.BoardDto;
import com.ssafy.happyhouse.model.service.BoardService;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/board")
public class BoardController {

	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private BoardService boardService;

	@GetMapping
	public ResponseEntity<List<BoardDto>> retrieveBoard(@RequestParam Map<String, String> map) throws Exception {
		logger.debug("retrieveBoard - 호출");
		System.out.println(map);
		return new ResponseEntity<List<BoardDto>>(boardService.retrieveBoard(map), HttpStatus.OK);
	}

	@GetMapping("{articleno}")
	public ResponseEntity<BoardDto> detailBoard(@PathVariable int articleno) throws Exception {
		logger.debug("detailBoard - 호출");
		return new ResponseEntity<BoardDto>(boardService.detailBoard(articleno), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<String> writeBoard(@RequestBody BoardDto board) throws Exception {
		logger.debug("writeBoard - 호출");
		if (boardService.writeBoard(board)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@PutMapping("{articleno}")
	public ResponseEntity<String> updateBoard(@RequestBody BoardDto board) throws Exception {
		
		System.out.println("수정");
		
		logger.debug("updateBoard - 호출");
		logger.debug("" + board);

		if (boardService.updateBoard(board)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@DeleteMapping("{articleno}")
	public ResponseEntity<String> deleteBoard(@PathVariable int articleno) throws Exception {
		logger.debug("deleteBoard - 호출");
		if (boardService.deleteBoard(articleno)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}
}