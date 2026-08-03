package cd.kinshasa.smartcity.auth.security;
import io.jsonwebtoken.*; import io.jsonwebtoken.security.Keys; import org.springframework.beans.factory.annotation.Value; import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets; import java.time.Instant; import java.util.Date;
@Component public class JwtUtil {
  @Value("${jwt.secret}") String secret; @Value("${jwt.expiration-minutes}") long minutes;
  public String generate(String subject){ Instant now=Instant.now(); return Jwts.builder().subject(subject).issuedAt(Date.from(now)).expiration(Date.from(now.plusSeconds(minutes*60))).signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8))).compact(); }
  public String subject(String token){ return Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8))).build().parseSignedClaims(token).getPayload().getSubject(); }
}
