import psycopg

conn = psycopg.connect('postgresql://smartcity:smartcity@localhost:55433/authdb')
cur = conn.cursor()
new_hash = '$2b$12$zIUCPr08Sy5i4KEur0tEXu8oZjNjWBPNjwoyfdHUMqojpvCEZb0yi'
cur.execute("UPDATE users SET password_hash = %s WHERE username IN ('admin','agent','citoyen')", (new_hash,))
conn.commit()
cur.execute("SELECT username, password_hash FROM users")
for row in cur.fetchall():
    print(row)
conn.close()
