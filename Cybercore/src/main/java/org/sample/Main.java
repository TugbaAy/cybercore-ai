package org.sample; // Kendi paket adın neyse o kalabilir

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        // Spring Boot uygulamasını başlatan temel komut:
        SpringApplication.run(Main.class, args);
    }
}