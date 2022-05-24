package com.ssafy.happyhouse.model;

public class HouseDealAVGDto {
	private String month;
	private int avg;
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public int getAvg() {
		return avg;
	}
	public HouseDealAVGDto(String month, int avg) {
		super();
		this.month = month;
		this.avg = avg;
	}
	@Override
	public String toString() {
		return "HouseDealAVGDto [month=" + month + ", avg=" + avg + "]";
	}
	public void setAvg(int avg) {
		this.avg = avg;
	}
	
}
