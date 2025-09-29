import sqlite3
import math
from pythondb import UserDatabase


class Users:
    def __init__(self, db_file="sqlite.db"):
        self.conn = sqlite3.connect(db_file)
        self.cursor = self.conn.cursor()

    def validate(self, username, password, email):
        valid_username = self.validate_user(username)
        valid_password = self.validate_password(password)
        valid_email = self.validate_email(email)
        return all([valid_username, valid_password, valid_email])

    def validate_user(self, username):
        authorised = False
        if UserDatabase().not_unique_username(username):
            print("Error: Username already taken")
        elif len(username) == "":
            print("Error: Username cannot be empty")
        elif len(username) > 20:
            print("Error: Username length must be less than 20")
        else:
            authorised = True
        return authorised

    def validate_password(self, password):
        authorised = False
        if len(password) < 8:
            print("Error: Password length must be greater than 8")
        elif len(password) > 20:
            print("Error: Password length must be less than 20")
        elif not any(char.isdigit() for char in password):
            print("Error: Password must have at least one number")
        elif not any(char.isupper() for char in password):
            print("Error: Password must have at least one uppercase letter")
        elif not any(char.islower() for char in password):
            print("Error: Password must have at least one lowercase letter")
        else:
            authorised = True
        return authorised

    def validate_email(self, email):
        authorised = False
        if "@" not in email or email.startswith("@") or email.endswith("@"): 
            print("Error: Please enter a correct email")
        else:
            username, domain = email.split("@")
            if not username or not domain:
                print("Error: Please enter a correct email")
            elif "." not in domain:
                print("Error: Please enter a correct email")
            else:
                authorised = True
        return authorised

    def login(self, username, password):
        user_id = None
        hashed_password = self.hash_password(password)
        row = UserDatabase().authenticate_login(username, hashed_password)
        if row is not None:
            user_id = row
        return user_id

    def signup(self, username, password, email):
        if not self.validate(username, password, email):
            print("Error: Signup failed. Please check the validation criteria.")
            return False
        hashed_password = self.hash_password(password)
        user_id = UserDatabase().insert_user(username, hashed_password)
        UserDatabase().insert_user_details(user_id, email)
        return user_id

    def hash_password(self, password):
        hashed_password = ""
        for x in password:
            ascii_character = ord(x)
            hashed_character = round(math.sqrt((ascii_character + 2) * 3))
            hashed_password += chr(hashed_character)
        return hashed_password

    def get_user_details(self, user_id):
        return UserDatabase().fetch_user_details(user_id)

    def update_email(self, email, user_id):
        valid_email = self.validate_email(email)
        if valid_email:
            UserDatabase().update_email(email, user_id)
            print("Success: Email updated")

    def update_password(self, password, user_id):
        valid_password = self.validate_password(password)
        if valid_password:
            hashed_password = self.hash_password(password)
            UserDatabase().update_password(hashed_password, user_id)
            print("Success: Password updated")


user_class = Users()
user_class.signup("teddy", "opop121DJ", "hehe@daskda.com")
