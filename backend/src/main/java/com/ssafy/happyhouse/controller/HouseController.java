package com.ssafy.happyhouse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HouseController {
	
	@GetMapping("/HousePage")
	public ModelAndView changePage(@RequestParam("dong") String dong) throws Exception {
		System.out.println(dong);
		ModelAndView mav = new ModelAndView();
		mav.addObject("dongCode", dong);
		mav.setViewName("screen/apt");
		return mav;
	}
}
