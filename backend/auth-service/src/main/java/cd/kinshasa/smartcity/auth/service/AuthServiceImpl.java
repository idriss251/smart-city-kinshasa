package cd.kinshasa.smartcity.auth.service;

import cd.kinshasa.smartcity.auth.dto.*;
import cd.kinshasa.smartcity.auth.model.*;
import cd.kinshasa.smartcity.auth.repo.UserRepository;
import cd.kinshasa.smartcity.auth.security.JwtUtil;
import io.jsonwebtoken.JwtException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.Instant;

@Service
public class AuthServiceImpl implements AuthService {
  private final UserRepository users;
  private final PasswordEncoder encoder;
  private final JwtUtil jwt;

  public AuthServiceImpl(UserRepository users, PasswordEncoder encoder, JwtUtil jwt) {
    this.users = users;
    this.encoder = encoder;
    this.jwt = jwt;
  }

  @Override
  public AuthResponse register(RegisterRequest request) {
    if (users.findByUsername(request.username()).isPresent()) {
      throw new IllegalArgumentException("Nom d'utilisateur déjà utilisé");
    }
    if (users.findByEmail(request.email()).isPresent()) {
      throw new IllegalArgumentException("Adresse e-mail déjà utilisée");
    }

    User user = new User();
    user.username = request.username();
    user.email = request.email();
    user.passwordHash = encoder.encode(request.password());
    user.role = request.role() == null ? Role.CITOYEN : request.role();
    user.commune = request.commune();
    user.createdAt = Instant.now();
    user.updatedAt = Instant.now();

    users.save(user);
    return buildResponse(user);
  }

  @Override
  public AuthResponse login(LoginRequest request) {
    User user = users.findByUsername(request.username())
      .orElseThrow(() -> new IllegalArgumentException("Identifiants invalides"));

    if (!encoder.matches(request.password(), user.passwordHash)) {
      throw new IllegalArgumentException("Identifiants invalides");
    }

    user.updatedAt = Instant.now();
    users.save(user);
    return buildResponse(user);
  }

  @Override
  public AuthResponse me(String tokenHeader) {
    String token = jwt.extractToken(tokenHeader);
    try {
      String username = jwt.subject(token);
      User user = users.findByUsername(username)
        .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable"));
      return buildResponse(user);
    } catch (JwtException e) {
      throw new IllegalArgumentException("Jeton invalide ou expiré");
    }
  }

  private AuthResponse buildResponse(User user) {
    String token = jwt.generate(user.username);
    return new AuthResponse(token, user.id, user.username, user.email, user.role, user.commune);
  }
}
