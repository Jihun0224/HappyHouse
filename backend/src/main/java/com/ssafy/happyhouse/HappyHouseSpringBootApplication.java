package com.ssafy.happyhouse;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = {"com.**.mapper"})
public class HappyHouseSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(HappyHouseSpringBootApplication.class, args);
	}

}
