package com.ssafy.happyhouse.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ssafy.happyhouse.model.MemberDto;
import com.ssafy.happyhouse.model.NoticeBoardDto;
import com.ssafy.happyhouse.model.service.NoticeBoardService;
import com.ssafy.util.PageNavigation;

@Controller
@RequestMapping("/noticeboard")
public class NoticeBoardController {
	
	@Autowired
	private NoticeBoardService noticeBoardService;
	
	@Autowired
	ResourceLoader resLoader;
	
	@GetMapping("/register")
	public String register() {
		return "noticeboard/write";
	}
	@PostMapping("/register")
	public String register(NoticeBoardDto noticeBoardDto, Model model, HttpSession session, RedirectAttributes redirectAttributes) throws Exception{
		MemberDto memberDto = (MemberDto) session.getAttribute("userinfo");
		noticeBoardDto.setUserId(memberDto.getUserId());
		
		
		noticeBoardService.registerArticle(noticeBoardDto);
		redirectAttributes.addAttribute("pg", 1);
		redirectAttributes.addAttribute("key", "");
		redirectAttributes.addAttribute("word", "");
		redirectAttributes.addFlashAttribute("msg", "글작성 성공!!!");
		return "redirect:/noticeboard/list";
	}
	@GetMapping("/list")
	public ModelAndView list(@RequestParam Map<String, String> map) throws Exception {
		ModelAndView mav = new ModelAndView();

		String spp = map.get("spp"); // size per page (페이지당 글갯수)
		map.put("spp", spp != null ? spp : "10");
		List<NoticeBoardDto> list = noticeBoardService.listArticle(map);
		PageNavigation pageNavigation = noticeBoardService.makePageNavigation(map);
		mav.addObject("articles", list);
		mav.addObject("navigation", pageNavigation);
		mav.addObject("key", map.get("key"));
		mav.addObject("word", map.get("word"));
		mav.setViewName("noticeboard/list");
		return mav;
	}
	
	@GetMapping("/modify")
	public ModelAndView modify(@RequestParam("articleno") int articleNo) throws Exception {
		ModelAndView mav = new ModelAndView();
		NoticeBoardDto noticeBoardDto = noticeBoardService.getArticle(articleNo);
		mav.addObject("article", noticeBoardDto);
		mav.setViewName("noticeboard/modify");
		return mav;
	}

	@PostMapping("/modify")
	public String modify(NoticeBoardDto noticeBoardDto, Model model, RedirectAttributes redirectAttributes)
			throws Exception {
		noticeBoardService.updateArticle(noticeBoardDto);
		redirectAttributes.addAttribute("pg", 1);
		redirectAttributes.addAttribute("key", "");
		redirectAttributes.addAttribute("word", "");
		redirectAttributes.addFlashAttribute("msg", "글수정 성공!!!");
		return "redirect:/noticeboard/list";
	}

	@GetMapping("/delete")
	public String delete(@RequestParam("articleno") int articleNo, Model model, RedirectAttributes redirectAttributes)
			throws Exception {
		noticeBoardService.deleteArticle(articleNo);
		redirectAttributes.addAttribute("pg", 1);
		redirectAttributes.addAttribute("key", "");
		redirectAttributes.addAttribute("word", "");
		redirectAttributes.addFlashAttribute("msg", "글삭제 성공!!!");
		return "redirect:/noticeboard/list";
	}
}
