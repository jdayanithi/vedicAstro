package com.vedicastrology;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class VedicAstrologyApplication {

	public static void main(String[] args) {
		SpringApplication.run(VedicAstrologyApplication.class, args);
	}

}
