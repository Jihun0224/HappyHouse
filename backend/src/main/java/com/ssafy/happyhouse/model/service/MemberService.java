package com.ssafy.happyhouse.model.service;

import com.ssafy.happyhouse.model.MemberDto;


public interface MemberService {

	public MemberDto login(MemberDto memberDto) throws Exception;
	public MemberDto userInfo(String userid) throws Exception;
	int idCheck(String checkId) throws Exception;
	void registerMember(MemberDto memberDto) throws Exception;
	void updateMember(MemberDto memberDto) throws Exception;
	void deleteMember(String userid) throws Exception;
	void setMyhome (MemberDto memberDto) throws Exception;
}
