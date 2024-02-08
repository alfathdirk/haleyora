# Schema

## Category

- name
- image

## Level

- name

## User

- full_name
- nick_name
- date_of_birth
- phone_no
- gender
- status (active, offline, wait)
- email
- last_login
- image

## Employee

- full_name
- email
- employee_id
- role
- status (active, inactive)
- courses m2m

## Course

- title
- image
- instructor
- category
- level
- rating

## Section

- title
- duration
- content
- content_type ? kayaknya ada di file

## Quiz

- title
- date ?
- time ?
- duration
- question_count ?
- score_per_question
- description
- question_bank
- randomize

## Quiz question

- title
- image
- choices
- answer


## Recent search

- search

## User course

- user_id
- course_id
- section_progress
- quiz_progress
- completed

# User notification

- special_offers
- sound
- vibrate
- general_notification
- email
- new_course

----

## Achievement

- name
- description
- image

## User Achievement

- user_id
- title

## Achievement Stage?
