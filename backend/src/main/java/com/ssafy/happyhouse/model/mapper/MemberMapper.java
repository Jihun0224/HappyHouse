package com.ssafy.happyhouse.model.mapper;

import java.sql.SQLException;

import com.ssafy.happyhouse.model.MemberDto;


public interface MemberMapper {

	public MemberDto login(MemberDto memberDto) throws SQLException;
	public MemberDto userInfo(String userid) throws SQLException;
	void registerMember(MemberDto memberDto) throws Exception;
	void updateMember(MemberDto memberDto) throws Exception;
	void deleteMember(String userid) throws Exception;
	int idCheck(String checkId) throws Exception;
	void setMyhome(MemberDto memberDto) throws Exception;
}