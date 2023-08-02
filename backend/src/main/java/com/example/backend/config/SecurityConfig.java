package com.example.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .authorizeHttpRequests()
//                .requestMatchers("/api/v1/auth/**", "/api/v1/users/**", "/api/v1/addresses/**", "/api/v1/jobs/**", "/api/v1/news/**", "/api/v1/events/**")
//                .permitAll()
                .requestMatchers("/api/v1/auth/**")
                .permitAll()
//                .requestMatchers(HttpMethod.POST,"/api/v1/auth/**","/api/v1/users/**", "/api/v1/addresses/**", "/api/v1/jobs/**", "/api/v1/news/**", "/api/v1/events/**")
//                .permitAll()
//                .requestMatchers(HttpMethod.PUT,"/api/v1/auth/**", "/api/v1/users/**", "/api/v1/addresses/**")
//                .permitAll()
//                .requestMatchers(HttpMethod.GET,"/api/v1/auth/**", "/api/v1/users/**", "/api/v1/addresses/**").hasAnyAuthority("ADMIN")
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }



}
