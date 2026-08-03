import bcrypt

# Generate BCrypt hash for "1234"
password = "1234"
salt = bcrypt.gensalt(rounds=12)
password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)
print(f"Password: {password}")
print(f"Hash: {password_hash.decode('utf-8')}")

# Verify the hash
verify = bcrypt.checkpw(password.encode('utf-8'), password_hash)
print(f"Verification: {verify}")
