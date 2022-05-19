package com.ssafy.happyhouse.model;

public class AnswerDto {
	private int answerno;
	private int articleno;
	private String userid;
	private String content;
	private String regtime;

	public int getAnswerno() {
		return answerno;
	}

	public void setAnswerno(int answerno) {
		this.answerno = answerno;
	}

	public int getArticleno() {
		return articleno;
	}

	public void setArticleno(int articleno) {
		this.articleno = articleno;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getRegtime() {
		return regtime;
	}

	public void setRegtime(String regtime) {
		this.regtime = regtime;
	}

	public AnswerDto(int answerno, int articleno, String userid, String content, String regtime) {
		super();
		this.answerno = answerno;
		this.articleno = articleno;
		this.userid = userid;
		this.content = content;
		this.regtime = regtime;
	}

}