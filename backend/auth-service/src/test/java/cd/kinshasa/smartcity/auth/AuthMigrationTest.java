package cd.kinshasa.smartcity.auth;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.assertTrue;

class AuthMigrationTest {
  @Test
  void demoPasswordHashesInMigrationShouldVerifyPassword() throws IOException {
    Path migration = Path.of("src/main/resources/db/migration/V1__create_users_table.sql");
    String sql = Files.readString(migration);

    Pattern pattern = Pattern.compile("\\('([^']*)','([^']*)','([^']*)','([^']*)','([^']*)'\\)");
    Matcher matcher = pattern.matcher(sql);

    PasswordEncoder encoder = new BCryptPasswordEncoder();
    boolean foundDemoUser = false;

    while (matcher.find()) {
      String username = matcher.group(1);
      String passwordHash = matcher.group(3);

      if ("admin".equals(username) || "agent".equals(username) || "citoyen".equals(username)) {
        foundDemoUser = true;
        assertTrue(
          encoder.matches("password", passwordHash),
          "Demo password hash for user " + username + " should match 'password'"
        );
      }
    }

    assertTrue(foundDemoUser, "Expected seeded demo users in migration");
  }
}
