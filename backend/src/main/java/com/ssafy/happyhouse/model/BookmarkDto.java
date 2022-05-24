package com.ssafy.happyhouse.model;

public class BookmarkDto {
	private long aptCode;
	private int bookmarkno;
	private String userid;
	
	@Override
	public String toString() {
		return "BookmarkDto [aptCode=" + aptCode + ", bookmarkno=" + bookmarkno + ", userid=" + userid + "]";
	}
	public long getAptCode() {
		return aptCode;
	}
	public void setAptCode(long aptCode) {
		this.aptCode = aptCode;
	}
	public int getBookmarkno() {
		return bookmarkno;
	}
	public void setBookmarkno(int bookmarkno) {
		this.bookmarkno = bookmarkno;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
}
