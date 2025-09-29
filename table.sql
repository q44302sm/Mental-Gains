CREATE TABLE Users (
  user_id integer PRIMARY KEY,
  username varchar(255),
  password varchar(255),
  salt varchar(255),
  date_created datetime,
  date_updated datetime
);

CREATE TABLE User_Details (
  id integer PRIMARY KEY,
  user_id integer, 
  email varchar(255),
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- Exercises Table
CREATE TABLE Exercises (
  exercise_id INTEGER PRIMARY KEY AUTOINCREMENT,
  muscle_group TEXT ,
  set_rep_count TEXT ,
  difficulty TEXT 
);

-- Courses Table
CREATE TABLE Quizzes (
  quiz_id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic TEXT ,
  question TEXT ,
  answers JSON ,
  correct_answer TEXT ,
  course_unit TEXT 
);

-- Session Table
CREATE TABLE Session (
  session_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER ,
  exercise_id INTEGER ,
  course_id INTEGER ,
  set_rep_count TEXT ,
  quiz_count INTEGER ,
  FOREIGN KEY (user_id) REFERENCES Users (user_id),
  FOREIGN KEY (exercise_id) REFERENCES Exercises (exercise_id),
  FOREIGN KEY (course_id) REFERENCES Courses (course_id)
);

-- Progress Table
CREATE TABLE Progress (
  progress_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER ,
  exercise_id INTEGER ,
  course_id INTEGER ,
  total_set_reps TEXT ,
  quiz_count INTEGER ,
  quiz_score REAL ,
  FOREIGN KEY (user_id) REFERENCES Users (user_id),
  FOREIGN KEY (exercise_id) REFERENCES Exercises (exercise_id),
  FOREIGN KEY (course_id) REFERENCES Courses (course_id)
);

-- Stats Table
CREATE TABLE Stats (
  stats_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER ,
  points INTEGER ,
  total_sessions INTEGER ,
  total_quiz_count INTEGER ,
  average_quiz_score REAL ,
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- Exercise Leaderboards
CREATE TABLE Exercise_Leaderboard (
  user_id INTEGER PRIMARY KEY,
  total_time INTEGER ,
  exercises_completed INTEGER ,
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- Quiz Leaderboards
CREATE TABLE Quiz_Leaderboard (
  user_id INTEGER PRIMARY KEY,
  accuracy INTEGER ,
  questions_answered INTEGER ,
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
)