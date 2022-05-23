package com.ssafy.happyhouse.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.happyhouse.model.MemberDto;
import com.ssafy.happyhouse.model.mapper.MemberMapper;
import com.ssafy.happyhouse.model.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberMapper memberMapper;

	@Override
	public MemberDto login(MemberDto memberDto) throws Exception {
		if (memberDto.getUserid() == null || memberDto.getUserpwd() == null)
			return null;
		return memberMapper.login(memberDto);
	}

	@Override
	public MemberDto userInfo(String userid) throws Exception {
		return memberMapper.userInfo(userid);
	}

	@Override
	public int idCheck(String checkId) throws Exception {
		return memberMapper.idCheck(checkId);
	}

	@Override
	public void registerMember(MemberDto memberDto) throws Exception {
		System.out.println("서비스 impl까지는 회원가입이 넘어옴.");
		System.out.println(memberDto.toString());
		memberMapper.registerMember(memberDto);

	}

	@Override
	public void updateMember(MemberDto memberDto) throws Exception {
		memberMapper.updateMember(memberDto);
	}

	@Override
	@Transactional
	public void deleteMember(String userid) throws Exception {

		// 회원 삭제하기
		memberMapper.deleteMember(userid);
	}

	@Override
	public void setMyhome(MemberDto memberDto) throws Exception {
		memberMapper.setMyhome(memberDto);
	}
}
