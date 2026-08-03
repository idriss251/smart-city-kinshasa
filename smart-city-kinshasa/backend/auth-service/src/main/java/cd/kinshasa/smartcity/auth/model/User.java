package cd.kinshasa.smartcity.auth.model;
import jakarta.persistence.*; import java.time.Instant;
@Entity @Table(name="users")
public class User {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  @Column(unique=true,nullable=false) public String username;
  @Column(unique=true,nullable=false) public String email;
  @Column(nullable=false) public String passwordHash;
  @Enumerated(EnumType.STRING) public Role role = Role.CITOYEN;
  public String commune; public Instant createdAt=Instant.now(); public Instant updatedAt=Instant.now();
}
