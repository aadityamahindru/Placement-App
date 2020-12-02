CREATE TABLE IF NOT EXISTS user(
    uid VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    email_id VARCHAR(50) UNIQUE,
    phone BIGINT(10) UNIQUE,
    enroll_no BIGINT(11) UNIQUE,
    year INTEGER(1),
    branch VARCHAR(20) NOT NULL,
    img_url VARCHAR(255),
    is_admin BOOLEAN DEFAULT false
);
CREATE TABLE IF NOT EXISTS user_jobs(
    user_id VARCHAR(50) NOT NULL,
    job_id VARCHAR(50) NOT NULL,
    applied BOOLEAN DEFAULT false
);
CREATE TABLE IF NOT EXISTS jobs(
    job_id VARCHAR(50) PRIMARY KEY,
    company_name VARCHAR(30) NOT NULL,
    email_id VARCHAR(50),
    job_desc MEDIUMTEXT, 
    ctc BIGINT(15),
    joining DATE,
    ctc_breakup VARCHAR(500),
    job_desig VARCHAR(20),
    location VARCHAR(20)
);