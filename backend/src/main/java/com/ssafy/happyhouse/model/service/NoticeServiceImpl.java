package com.ssafy.happyhouse.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.happyhouse.model.mapper.NoticeMapper;
import com.ssafy.happyhouse.model.NoticeDto;

@Service
public class NoticeServiceImpl implements NoticeService {
	
    @Autowired
	private NoticeMapper noticeMapper;

    @Override
	public List<NoticeDto> retrieveNotice(Map<String, String> map) {
		return noticeMapper.selectNotice(map);
	}
    
  	@Override
	public boolean writeNotice(NoticeDto notice) {
		return noticeMapper.insertNotice(notice) == 1;
	}

	@Override
	public NoticeDto detailNotice(int articleno) {
		return noticeMapper.selectNoticeByNo(articleno);
	}

	@Override
	@Transactional
	public boolean updateNotice(NoticeDto notice) {
		return noticeMapper.updateNotice(notice) == 1;
	}

	@Override
	@Transactional
	public boolean deleteNotice(int articleno) {
		return noticeMapper.deleteNotice(articleno) == 1;
	}
}