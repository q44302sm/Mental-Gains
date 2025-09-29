import sqlite3

class Database:
    def __init__(self, db_file="sqlite.db") -> None:
        self.db_file = db_file

    def get_connection(self):
        """Get connection and cursor to sqlite.db file"""
        try:
            conn = sqlite3.connect(self.db_file)
        except sqlite3.Error as e:
            print(f"Database connection error: {e}")
            raise
        return conn, conn.cursor()

    def execute_sql(self, sql, parameters=None, get_id=False):
        """Execute SQL query and optionally return last inserted ID"""
        lastrowid = None
        conn, cursor = self.get_connection()
        try:
            cursor.execute(sql, parameters or ())
            if get_id:
                lastrowid = cursor.lastrowid
            conn.commit()
        except sqlite3.Error as e:
            print(f"SQL execution error: {e}")
            conn.rollback()
            raise
        finally:
            conn.close()
        return lastrowid

    def fetch_single(self, sql, parameters=None):
        """Fetch a single row from database"""
        conn, cursor = self.get_connection()
        try:
            cursor.execute(sql, parameters or ())
            return cursor.fetchone()
        finally:
            conn.close()

    def fetch_all(self, sql, parameters=None):
        """Fetch all matching rows from database"""
        conn, cursor = self.get_connection()
        try:
            cursor.execute(sql, parameters or ())
            return cursor.fetchall()
        finally:
            conn.close()


class UserDatabase(Database):
    def authenticate_login(self, username, hashed_password):
        """Authenticate user and return user_id if valid"""
        query = "SELECT user_id FROM Users WHERE username = ? AND password = ?"
        row = self.fetch_single(query, (username, hashed_password))
        
        if not row:
            print("Authentication failed: Username/password not found")
            return None
        return row[0]

    def insert_user(self, username, hashed_password, salt):
        """Create new user and return user_id"""
        query = """INSERT INTO Users (username, password, salt, date_created, date_updated)
                   VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"""
        return self.execute_sql(query, (username, hashed_password, salt), get_id=True)
    
    def get_salt(self, username):
        """Return salt for user with that username"""
        query = "SELECT salt FROM Users WHERE username = ?"
        return self.fetch_single(query, (username, ))

    def insert_user_details(self, user_id, email):
        """Add user details (email)"""
        query = "INSERT INTO User_Details (user_id, email) VALUES (?, ?)"
        self.execute_sql(query, (user_id, email))

    def not_unique_username(self, username):
        """Check if username already exists"""
        query = "SELECT user_id FROM Users WHERE username = ?"
        return bool(self.fetch_single(query, (username,)))

    def fetch_user_details(self, user_id):
        """Get username and email for specified user"""
        query = """SELECT u.username, ud.email
                   FROM Users u
                   LEFT JOIN User_Details ud ON u.user_id = ud.user_id
                   WHERE u.user_id = ?"""
        return self.fetch_single(query, (user_id,))

    def update_password(self, hashed_password, user_id):
        """Update user password"""
        query = "UPDATE Users SET password = ?, date_updated = CURRENT_TIMESTAMP WHERE user_id = ?"
        self.execute_sql(query, (hashed_password, user_id))

    def update_email(self, email, user_id):
        """Update user email"""
        query = "UPDATE User_Details SET email = ? WHERE user_id = ?"
        self.execute_sql(query, (email, user_id))

