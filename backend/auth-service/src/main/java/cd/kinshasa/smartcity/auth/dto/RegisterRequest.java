package cd.kinshasa.smartcity.auth.dto;

import cd.kinshasa.smartcity.auth.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank String username,
    @Email String email,
    @Size(min = 4) String password,
    Role role,
    String commune
) {}
