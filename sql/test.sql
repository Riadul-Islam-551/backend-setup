CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    address VARCHAR(200),
    order_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE users

-- *** DATA TYPE ***
-- 1. INTEGER
-- 3. BIGINT
-- 3. SMALLINT
-- 4. TEXT
-- 5. VARCHAR(100)
-- 6. CHAR(50)
-- 7. BOOLEAN
-- 8. DATE
-- 9. TIME 
-- 10. TIMESTAMP
-- 11. UUID 
-- 12. JSON
-- 13. JSONB
-- 14. BYTEA
-- 15. NUMERIC(10,2)
-- 16. REAL
-- 17. DOUBLE PRECISION

-- *** constrains ***
-- 1. PRIMARY KEY
-- 2. FOREIGN KEY
-- 3. UNIQUE
-- 4. NOT NULL
-- 5. CHECK
-- 6. DEFAULT

-- insert data into table 
INSERT INTO users (username, email, password, full_name, address, order_count)
VALUES (
    'zami',
    'zami@example.com',
    '123456',
    'Zami',
    'Rangpur',
    2
)
-- (
--   'saif',
--     'saif@example.com',
--     '123456',
--     'Saif',
--     'Khulna' ,
--     5
-- )

--add new column
ALTER TABLE users
ADD address VARCHAR(200)

--add new column
ALTER TABLE users
ADD city VARCHAR(100)

--update value of a specific row
update users
set full_name = 'Karim Islam' , email = 'karim@gmail.com'
where id = 7

--alter(change the type) column of a table
ALTER TABLE users
ALTER COLUMN password TYPE VARCHAR(200)

--drop a column 
ALTER TABLE users
drop column city

--delete a record 
delete FROM users
where email = 'john@example.com'

-- *** ------Operator------ ***
-- =	Equal to
-- <	Less than
-- >	Greater than
-- <=	Less than or equal to
-- >=	Greater than or equal to
-- <>	Not equal to
-- !=	Not equal to
-- LIKE	Check if a value matches a pattern (case sensitive)
-- ILIKE	Check if a value matches a pattern (case insensitive)
-- AND	Logical AND
-- OR	Logical OR
-- IN	Check if a value matches any value within a provided list
-- BETWEEN	Check if a value is within a specified range
-- IS NULL	Check if a value is NULL
-- NOT	Makes a negative result e.g. NOT LIKE, NOT IN, NOT BETWEEN


-- select the row where the address column is not null 
SELECT * FROM users
where address IS NOT NULL

-- select the row where the full_name start with 'r' -> LIKE is case sensitive 
SELECT * FROM users
where full_name LIKE 'r%'

-- select the row where the full_name start with 'r' -> LIKE is case insensitive 
SELECT * FROM users
where full_name ILIKE 'r%'

SELECT * FROM users
where full_name ILIKE '%sa%'

--- order by
SELECT * FROM users
order by username

SELECT * FROM users
order by created_at DESC

-- limit 
SELECT * FROM users
limit 3 

SELECT * FROM users 
limit 3 offset 2

-- min / max
SELECT min(id)
FROM users

SELECT min(order_count) as lowest_order_count
FROM users

-- count 
SELECT count(id)
FROM users

SELECT count(id) as dhaka_user
FROM users
where address = 'Dhaka'

SELECT count(id) as chittagong_user
FROM users
where address = 'Chittagong'

-- sum
SELECT sum(order_count) as total_order_count
from users

SELECT sum(order_count)
from users

-- avg
SELECT avg(order_count)
from users

SELECT avg(order_count):: NUMERIC(10,2) as avg_order_count
from users

-- select in / not in
SELECT * from users
where address IN ('Dhaka', 'Khulna', 'Rangpur', 'Sylhet')

SELECT * from users
where address NOT IN ('Dhaka', 'Khulna', 'Rangpur', 'Sylhet')

-- between
SELECT * FROM users
where order_count BETWEEN 2 AND 4

SELECT * FROM users
where username BETWEEN 'hashem' AND 'pari'
order by order_count DESC

-- case 
select *,
case
when order_count < 4 then 'Low category user'
when order_count > 4 then 'Heigh category user'
else 
'Normal user'
end as "user category"
FROM users

select * FROM users 

-- join the table

CREATE TABLE department (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    department_name VARCHAR(50) NOT NULL UNIQUE
)

INSERT INTO department (department_name)
VALUES
('BANGLA'),
('MATH')

SELECT * FROM department

CREATE TABLE students (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    department_id INTEGER references department(id),
    student_name VARCHAR(100)
)


INSERT INTO students (department_id, student_name)
VALUES
(2, 'halim')

SELECT students.id, department.department_name, students.student_name FROM students
inner join department
on students.department_id = department.id
where department_name = 'BBA'


-- group by is used for counting group wise
SELECT department.department_name, count(students.id) as total_students FROM students
inner join department
on students.department_id = department.id
group by department.department_name


