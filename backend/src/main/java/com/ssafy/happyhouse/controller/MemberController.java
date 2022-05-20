package com.ssafy.happyhouse.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.MemberDto;
import com.ssafy.happyhouse.model.service.JwtServiceImpl;
import com.ssafy.happyhouse.model.service.MemberService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api("MemberController V1")
@RestController
@RequestMapping("/user")
public class MemberController {

	public static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private MemberService memberService;

	@ApiOperation(value = "로그인", notes = "Access-token과 로그인 결과 메세지를 반환한다.", response = Map.class)
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(
			@RequestBody @ApiParam(value = "로그인 시 필요한 회원정보(아이디, 비밀번호).", required = true) MemberDto memberDto) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			MemberDto loginUser = memberService.login(memberDto);
			if (loginUser != null) {
				String token = jwtService.create("userid", loginUser.getUserid(), "access-token");// key, data, subject
				logger.debug("로그인 토큰정보 : {}", token);
				resultMap.put("access-token", token);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;
			}
		} catch (Exception e) {
			logger.error("로그인 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "회원인증", notes = "회원 정보를 담은 Token을 반환한다.", response = Map.class)
	@GetMapping("/info/{userid}")
	public ResponseEntity<Map<String, Object>> getInfo(
			@PathVariable("userid") @ApiParam(value = "인증할 회원의 아이디.", required = true) String userid,
			HttpServletRequest request) {
//		logger.debug("userid : {} ", userid);
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		if (jwtService.isUsable(request.getHeader("access-token"))) {
			logger.info("사용 가능한 토큰!!!");
			try {
//				로그인 사용자 정보.
				MemberDto memberDto = memberService.userInfo(userid);
				resultMap.put("userInfo", memberDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.error("정보조회 실패 : {}", e);
				resultMap.put("message", e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			logger.error("사용 불가능 토큰!!!");
			resultMap.put("message", FAIL);
			status = HttpStatus.ACCEPTED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	@PostMapping
	public ResponseEntity<String> signup(@RequestBody MemberDto memberDto, HttpSession session,
			HttpServletResponse response) throws Exception {
		int found = memberService.idCheck(memberDto.getUserid());
		if(found == 0) {
			memberService.registerMember(memberDto);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		
	}
	@ApiOperation(value = "회원정보얻기", notes = "한명의 회원 정보를 얻는다. 성공시 해당 member객체 반환. 실패시  no_content 반환", response = MemberDto.class)
	@GetMapping(value = "/{userid}")
	public ResponseEntity<MemberDto> userInfo(@PathVariable("userid") String userid) throws Exception {
		MemberDto memberDto = memberService.userInfo(userid);
		System.out.println(memberDto.toString());
		if (memberDto != null)
			return new ResponseEntity<MemberDto>(memberDto, HttpStatus.OK);
		else
			return new ResponseEntity<MemberDto>(HttpStatus.NO_CONTENT);
	}

	@ApiOperation(value = "회원 수정", notes = "해당 회원의 정보를 얻는다. 성공시 member객체 반환", response = MemberDto.class)
	@PutMapping
	public ResponseEntity<MemberDto> modifyUser(@RequestBody MemberDto memberDto) throws Exception {
		System.out.println(memberDto.toString());

		memberService.updateMember(memberDto);
		return new ResponseEntity<MemberDto>(memberDto, HttpStatus.OK);
	}

	// 유저삭제
	@ApiOperation(value = "회원삭제", notes = "해당회원을 삭제시킨다.", response = String.class)
	@DeleteMapping(value = "/{userid}")
	public ResponseEntity<String> removeUser(@PathVariable("userid") String userid) throws Exception {
		memberService.deleteMember(userid);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
}
