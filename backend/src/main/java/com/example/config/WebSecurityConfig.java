package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;

@Configuration
public class WebSecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors()
            .and()
            .csrf().disable()
            .authorizeRequests()
            .antMatchers(HttpMethod.GET, "/api/users/hr-summary").permitAll()
            .antMatchers("/api/users/**").permitAll()
            .antMatchers("/api/auth/**").permitAll()
            .antMatchers("/api/messages/**").permitAll()
            .antMatchers("/api/meetings/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/tasks").permitAll()
            .antMatchers(HttpMethod.POST, "/api/tasks").permitAll()
            .antMatchers(HttpMethod.GET, "/api/establishments").permitAll()
            .antMatchers(HttpMethod.PUT, "/api/establishments/**").permitAll()
            .antMatchers("/admin/**").hasRole("ADMIN")
            .antMatchers("/hr/**").hasRole("HR_MANAGER")
            .antMatchers("/employee/**").hasRole("EMPLOYEE")
            .antMatchers("/api/hr-summary").permitAll()
            .anyRequest().authenticated();
        return http.build();
    }
} 