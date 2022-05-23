package com.ssafy.happyhouse.model;

public class HouseDealDto {
	long no;
	int dealYear;
	int dealMonth;
	int dealDay;
	String dealAmount;
	String area;
	String floor;
	long aptCode;

	public long getNo() {
		return no;
	}

	public void setNo(long no) {
		this.no = no;
	}

	public int getDealYear() {
		return dealYear;
	}

	public void setDealYear(int dealYear) {
		this.dealYear = dealYear;
	}

	public int getDealMonth() {
		return dealMonth;
	}

	public void setDealMonth(int dealMonth) {
		this.dealMonth = dealMonth;
	}

	public String getDealAmount() {
		return dealAmount;
	}

	public void setDealAmount(String dealAmount) {
		this.dealAmount = dealAmount;
	}

	public long getAptCode() {
		return aptCode;
	}

	public int getDealDay() {
		return dealDay;
	}

	public void setDealDay(int dealDay) {
		this.dealDay = dealDay;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getFloor() {
		return floor;
	}

	public void setFloor(String floor) {
		this.floor = floor;
	}

	public void setAptCode(long aptCode) {
		this.aptCode = aptCode;
	}

	public HouseDealDto(long no, int dealYear, int dealMonth, int dealDay, String dealAmount, String area, String floor,
			long aptCode) {
		super();
		this.no = no;
		this.dealYear = dealYear;
		this.dealMonth = dealMonth;
		this.dealDay = dealDay;
		this.dealAmount = dealAmount;
		this.area = area;
		this.floor = floor;
		this.aptCode = aptCode;
	}

}
