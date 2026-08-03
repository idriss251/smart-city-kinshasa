package cd.kinshasa.smartcity.auth.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtUtil {
  @Value("${jwt.secret}")
  String secret;

  @Value("${jwt.expiration-minutes}")
  long expirationMinutes;

  public String generate(String subject) {
    Instant now = Instant.now();
    return Jwts.builder()
      .setSubject(subject)
      .setIssuedAt(Date.from(now))
      .setExpiration(Date.from(now.plusSeconds(expirationMinutes * 60)))
      .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
      .compact();
  }

  public String subject(String token) {
    return Jwts.parser()
      .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
      .build()
      .parseClaimsJws(token)
      .getBody()
      .getSubject();
  }

  public String extractToken(String header) {
    if (header == null || header.isBlank()) {
      throw new JwtException("En-tête Authorization manquant");
    }
    String prefix = "Bearer ";
    return header.startsWith(prefix) ? header.substring(prefix.length()).trim() : header.trim();
  }
}
