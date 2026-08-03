package cd.kinshasa.smartcity.auth.service;
import cd.kinshasa.smartcity.auth.dto.*;
public interface AuthService { AuthResponse register(RegisterRequest request); AuthResponse login(LoginRequest request); AuthResponse me(String token); }
