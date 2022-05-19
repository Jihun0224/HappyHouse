package com.ssafy.happyhouse.controller;

import java.util.List;

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

import com.ssafy.happyhouse.model.AnswerDto;
import com.ssafy.happyhouse.model.service.AnswerService;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/answer")
public class AnswerController {

	private static final Logger logger = LoggerFactory.getLogger(AnswerController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private AnswerService answerService;

	@GetMapping("{articleno}")
	public ResponseEntity<List<AnswerDto>> retrieveAnswer(@PathVariable int articleno) {
		return new ResponseEntity<List<AnswerDto>>(answerService.retrieveAnswer(articleno), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<String> writeAnswer(@RequestBody AnswerDto answer) {
		if (answerService.writeAnswer(answer)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}

	@DeleteMapping("{answerno}")
	public ResponseEntity<String> deleteAnswer(@PathVariable int answerno) {
		if (answerService.deleteAnswer(answerno)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}
}