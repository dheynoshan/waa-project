package com.example.backend.aspect;

import com.example.backend.service.LogService;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Aspect
@Component
@RequiredArgsConstructor
public class LoggingAspect {
    private final LogService logService;

    @After("execution(* com.example.backend.service.*.*(..)) && !execution(* com.example.backend.service.LogService.*(..))")
    public void logAfterServiceCall(JoinPoint joinPoint) {
        Date date = new Date();
        String username = getCurrentUsername();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();

        logService.insert(date, username, className, methodName);
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return "Anonymous";
        }
        return authentication.getName();
    }

}
