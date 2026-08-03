package cd.kinshasa.smartcity.auth.web;
import cd.kinshasa.smartcity.auth.dto.*; import cd.kinshasa.smartcity.auth.service.AuthService; import jakarta.validation.Valid; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/auth") public class AuthController {
  private final AuthService auth; public AuthController(AuthService auth){this.auth=auth;}
  @PostMapping("/register") AuthResponse register(@Valid @RequestBody RegisterRequest r){ return auth.register(r); }
  @PostMapping("/login") AuthResponse login(@Valid @RequestBody LoginRequest r){ return auth.login(r); }
  @PostMapping("/refresh") AuthResponse refresh(@RequestHeader("Authorization") String token){ return auth.me(token); }
  @GetMapping("/me") AuthResponse me(@RequestHeader("Authorization") String token){ return auth.me(token); }
  @PostMapping("/logout") void logout(){}
}
