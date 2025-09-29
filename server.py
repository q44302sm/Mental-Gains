from flask import Flask, render_template, redirect, url_for, session
import flask
import hashlib

import git.repo
import python.pythondb as pythondb
import random
import json
import pathlib
import git

app = Flask(__name__, template_folder="", static_folder="")

db = pythondb.UserDatabase()
db_quiz = pythondb.Database()
app.secret_key = "hello"

@app.route('/')
def main():
    return redirect("mainPage.html")

@app.route('/loginPage.html')
def loginPage():
    if session.get("user_id") is None:
        return render_template("loginPage.html")
    else:
        return redirect("ExercisePage.html")

@app.route('/log_in', methods=["POST"])
def authenticate():
    info = flask.request.form
    print(info["Username"])
    print(info["Password"])

    salt = db.get_salt(info["Username"])
    if salt is not None:
        salt = salt[0]
    else:
        salt = ""
    print(salt)

    hashed = hashlib.sha256((info["Password"] + salt).encode()).hexdigest()
    info = dict(info)
    info["Auth"] = db.authenticate_login(info["Username"], hashed)

    if info["Auth"]:
        session["user_id"] = info["Auth"]
        return redirect("ExercisePage.html")
    else:
        flask.flash("Failure")
        return redirect("loginPage.html")

@app.route("/register", methods=["POST"])
def registering():
    info = flask.request.form

    if info["Password"] == info["Password2"]:
        salt = "".join(str(random.randint(0, 255)) for i in range(15))

        info = dict(info)
        hashed = hashlib.sha256((info["Password"] + salt).encode()).hexdigest()

        session["user_id"] = db.insert_user(info["Username"], hashed, salt)

        db.insert_user_details(session["user_id"], info["Email"])

        return redirect("ExercisePage.html")

    return redirect("signUp.html")

@app.route("/log_out")
def log_out():
    session["user_id"] = None
    return redirect("mainPage.html")

@app.route("/profile")
def profile():
    info = db.fetch_user_details(session["user_id"])
    info = {
        "username": info[0],
        "email": info[1]
    }
    info = json.dumps(info)

    return info

@app.route("/leaderboard")
def leaderboard():
    info = flask.request.args
    
    type = info["type"]
    sort = info["sort"]

    if type == "exercise":
        if sort == "time":
            query = "SELECT username, total_time AS value FROM Exercise_Leaderboard INNER JOIN Users ON Users.user_id=Exercise_Leaderboard.user_id ORDER BY total_time DESC"
        else:
            query = "SELECT username, exercises_completed AS value FROM Exercise_Leaderboard INNER JOIN Users ON Users.user_id=Exercise_Leaderboard.user_id ORDER BY exercises_completed DESC"
    elif type == "quiz":
        if sort == "accuracy":
            query = "SELECT username, accuracy AS value FROM Quiz_Leaderboard INNER JOIN Users ON Users.user_id=Quiz_Leaderboard.user_id ORDER BY accuracy DESC"
        else:
            query = "SELECT username, questions_answered AS value FROM Quiz_Leaderboard INNER JOIN Users ON Users.user_id=Quiz_Leaderboard.user_id ORDER BY questions_answered DESC"

    data = db.fetch_all(query)
    print(data)

    data = [{"name" : x[0], "value" : x[1]} for x in data]
    print(data)

    return json.dumps(data)

@app.route("/exercise_completed")
def exercise_completed():
    info = flask.request.args
    time = info["time"]
    
    user_id = session["user_id"]
    query = "SELECT total_time, exercises_completed FROM Exercise_Leaderboard WHERE user_id = ?"
    data = db.fetch_single(query, [user_id])

    if data is not None:
        total_t = data[0]
        exercises = data[1]

        total_t += int(time)
        exercises += 1

        query = "UPDATE Exercise_Leaderboard " \
        "SET total_time = ?, exercises_completed = ? " \
        "WHERE user_id = ?"

        db.execute_sql(query, [total_t, exercises, user_id])
    else:
        total_t = int(time)
        exercises = 1

        query = "INSERT INTO Exercise_Leaderboard " \
        "VALUES (?, ?, ?)"

        db.execute_sql(query, [user_id, total_t, exercises])

    return "hello"

@app.route("/quiz_completed")
def quiz_completed():
    info = flask.request.args
    percentage = info["percentage"]
    
    user_id = session["user_id"]

    query = "SELECT accuracy, questions_answered FROM Quiz_Leaderboard WHERE user_id = ?"
    data = db.fetch_single(query, [user_id])

    if data is not None:
        accuracy = data[0]
        questions = data[1]

        accuracy = (accuracy * questions + float(percentage)) / (questions + 1)
        questions += 1

        print(accuracy, questions)

        query = "UPDATE Quiz_Leaderboard " \
        "SET accuracy = ?, questions_answered = ? " \
        "WHERE user_id = ?"

        print(query)
        db.execute_sql(query, [accuracy, questions, user_id])
    else:
        query = "INSERT INTO Quiz_Leaderboard " \
        "VALUES (?, ?, ?)"

        db.execute_sql(query, [user_id, percentage, 1])

    return "hello, this should never be seen, bug :)"



@app.route("/display_quiz")
def display_quiz():
    selected_topics = json.loads(flask.request.args["topics"])
    print(selected_topics)
    if not selected_topics:
        return redirect("QuizPage.html")

    quiz_questions = []
    
    try:
        for topic in selected_topics:
            query = """
                SELECT question, answers, correct_answer 
                FROM Quizzes 
                WHERE topic=?
            """
            topic = "Control Flow"
            topic_questions = db_quiz.fetch_all(query, (topic,))
            
            print(topic_questions)
            selected = random.sample(topic_questions, 1)
            
            for question in selected:
                question_text, answers, correct_answer = question
                # answers = json.loads(answers_json)
                
                quiz_questions.append({
                    'question': question_text,
                    'answers': answers,
                    'correct': correct_answer,
                    'topic': topic
                })
        
        if not quiz_questions:
            return "No questions found for selected topics!", 404
                
        return json.dumps(quiz_questions)
    
    except Exception as e:
        print(f"Error fetching quiz questions: {str(e)}")
        return "Error loading quiz questions", 500

#testing auto-git-pulling, probably doesn't work
@app.route("/reload")
def reload():
    repo = git.repo.Repo("")
    origin = repo.remotes.origin
    origin.pull()

    pathlib.Path("/var/www/amilck_pythonanywhere_com_wsgi.py").touch()

    return redirect("mainPage.html")
