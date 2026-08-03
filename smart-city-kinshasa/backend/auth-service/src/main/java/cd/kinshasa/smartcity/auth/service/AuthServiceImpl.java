package cd.kinshasa.smartcity.auth.service;
import cd.kinshasa.smartcity.auth.dto.*; import cd.kinshasa.smartcity.auth.model.*; import cd.kinshasa.smartcity.auth.repo.UserRepository; import cd.kinshasa.smartcity.auth.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.stereotype.Service;
@Service public class AuthServiceImpl implements AuthService {
  private final UserRepository users; private final PasswordEncoder encoder; private final JwtUtil jwt;
  public AuthServiceImpl(UserRepository users,PasswordEncoder encoder,JwtUtil jwt){this.users=users;this.encoder=encoder;this.jwt=jwt;}
  public AuthResponse register(RegisterRequest r){ if(users.findByUsername(r.username()).isPresent()) throw new IllegalArgumentException("Nom utilisateur déjà utilisé"); User u=new User(); u.username=r.username(); u.email=r.email(); u.passwordHash=encoder.encode(r.password()); u.role=r.role()==null?Role.CITOYEN:r.role(); u.commune=r.commune(); users.save(u); return response(u); }
  public AuthResponse login(LoginRequest r){ User u=users.findByUsername(r.username()).orElseThrow(()->new IllegalArgumentException("Identifiants invalides")); if(!encoder.matches(r.password(),u.passwordHash)) throw new IllegalArgumentException("Identifiants invalides"); return response(u); }
  public AuthResponse me(String token){ return response(users.findByUsername(jwt.subject(token.replace("Bearer ",""))).orElseThrow()); }
  private AuthResponse response(User u){ return new AuthResponse(jwt.generate(u.username),u.id,u.username,u.email,u.role,u.commune); }
}
