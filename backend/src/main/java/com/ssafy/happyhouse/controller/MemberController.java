package com.ssafy.happyhouse.controller;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


import com.ssafy.happyhouse.model.MemberDto;
import com.ssafy.happyhouse.model.service.MemberService;


@Controller
@RequestMapping("/user")
public class MemberController {

	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

	@Autowired
	private MemberService memberService;

	@PostMapping(value = "/register")
	public String register(@ModelAttribute MemberDto memberDto, Model model) throws Exception {
		logger.debug("memberDto info : {}", memberDto);
		memberService.registerMember(memberDto);
		return "redirect:/user/login";
	}
	@PostMapping(value = "/update")
	public String update(@ModelAttribute MemberDto memberDto, HttpSession session,Model model) throws Exception {
		logger.debug("memberDto info : {}", memberDto);
		memberService.updateMember(memberDto);
		session.setAttribute("userinfo", memberDto);
		return "redirect:/";
	}
	@PostMapping(value = "/delete")
	public String delete(String userId, Model model,HttpSession session) throws Exception {
		logger.debug(userId);
		memberService.deleteMember(userId);
		session.invalidate();
		return "redirect:/";
	}
	@GetMapping(value="/register")
	public String register() {
		return "user/join";
	}
	@GetMapping(value="/login")
	public String login() {
		return "user/login";
	}

	@PostMapping(value="/login")
	public String login(@RequestParam Map<String, String> map, Model model, HttpSession session,
			HttpServletResponse response) throws Exception {
		logger.debug("map : {}", map.get("userId"));
		MemberDto memberDto = memberService.login(map);
		if (memberDto != null) {
			session.setAttribute("userinfo", memberDto);
			return "redirect:/";
		} else {
			model.addAttribute("msg", "아이디 또는 비밀번호 확인 후 다시 로그인하세요!");
			return "user/login";
		}
	}

	@GetMapping(value="/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}

}