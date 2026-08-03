package cd.kinshasa.smartcity.auth.dto; import cd.kinshasa.smartcity.auth.model.Role; public record AuthResponse(String token,Long id,String username,String email,Role role,String commune){}
