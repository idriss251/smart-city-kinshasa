package cd.kinshasa.smartcity.auth.web;

import cd.kinshasa.smartcity.auth.model.User;
import cd.kinshasa.smartcity.auth.repo.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @GetMapping
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  @GetMapping("/{id}")
  public User getUserById(@PathVariable Long id) {
    return userRepository.findById(id)
      .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable: " + id));
  }

  @PutMapping("/{id}")
  public User updateUser(@PathVariable Long id, @RequestBody User user) {
    User existingUser = userRepository.findById(id)
      .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable: " + id));
    
    existingUser.username = user.username;
    existingUser.email = user.email;
    existingUser.role = user.role;
    existingUser.commune = user.commune;
    
    if (user.passwordHash != null && !user.passwordHash.isEmpty()) {
      existingUser.passwordHash = passwordEncoder.encode(user.passwordHash);
    }
    
    existingUser.updatedAt = Instant.now();
    return userRepository.save(existingUser);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteUser(@PathVariable Long id) {
    userRepository.deleteById(id);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public User createUser(@RequestBody User user) {
    if (userRepository.findByUsername(user.username).isPresent()) {
      throw new IllegalArgumentException("Nom d'utilisateur déjà utilisé");
    }
    if (userRepository.findByEmail(user.email).isPresent()) {
      throw new IllegalArgumentException("Adresse e-mail déjà utilisée");
    }
    
    // Hash the password
    user.passwordHash = passwordEncoder.encode(user.passwordHash);
    user.createdAt = Instant.now();
    user.updatedAt = Instant.now();
    
    return userRepository.save(user);
  }
}
