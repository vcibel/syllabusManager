
CREATE SEQUENCE public.faculties_faculty_id_seq;

CREATE TABLE public.faculties (
                faculty_id INTEGER NOT NULL DEFAULT nextval('public.faculties_faculty_id_seq'),
                faculty_code INTEGER NOT NULL,
                faculty_name VARCHAR NOT NULL,
                faculty_created_at TIMESTAMP NOT NULL,
                faculty_updated_at TIMESTAMP,
                CONSTRAINT faculties_pk PRIMARY KEY (faculty_id)
);


ALTER SEQUENCE public.faculties_faculty_id_seq OWNED BY public.faculties.faculty_id;

CREATE SEQUENCE public.type_subject_id_seq;

CREATE TABLE public.type_subject (
                type_subject_id INTEGER NOT NULL DEFAULT nextval('public.type_subject_id_seq'),
                type_subject_description VARCHAR NOT NULL,
                type_subject_code VARCHAR NOT NULL,
                CONSTRAINT type_subject_pk PRIMARY KEY (type_subject_id)
);


ALTER SEQUENCE public.type_subject_id_seq OWNED BY public.type_subject.type_subject_id;

CREATE SEQUENCE public.type_user_type_user_id_seq;

CREATE TABLE public.type_user (
                type_user_id INTEGER NOT NULL DEFAULT nextval('public.type_user_type_user_id_seq'),
                type_user_description VARCHAR NOT NULL,
                CONSTRAINT type_user_pk PRIMARY KEY (type_user_id)
);


ALTER SEQUENCE public.type_user_type_user_id_seq OWNED BY public.type_user.type_user_id;

CREATE SEQUENCE public.users_user_id_seq;

CREATE TABLE public.users (
                user_id INTEGER NOT NULL DEFAULT nextval('public.users_user_id_seq'),
                user_name VARCHAR NOT NULL,
                user_lastname VARCHAR NOT NULL,
                user_username VARCHAR NOT NULL,
                user_password VARCHAR NOT NULL,
                type_user_id INTEGER NOT NULL,
                user_created_at TIMESTAMP NOT NULL,
                user_updated_at TIMESTAMP,
                CONSTRAINT users_pk PRIMARY KEY (user_id)
);


ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;

CREATE SEQUENCE public.type_subject_pensum_type_subject_id_seq;

CREATE TABLE public.type_subject_pensum (
                type_subject_pensum_id INTEGER NOT NULL DEFAULT nextval('public.type_subject_pensum_type_subject_id_seq'),
                type_subject_pensum_description VARCHAR NOT NULL,
                CONSTRAINT type_subject_pensum_pk PRIMARY KEY (type_subject_pensum_id)
);


ALTER SEQUENCE public.type_subject_pensum_type_subject_id_seq OWNED BY public.type_subject_pensum.type_subject_pensum_id;

CREATE SEQUENCE public.subjects_subject_id_seq;

CREATE TABLE public.subjects (
                subject_id INTEGER NOT NULL DEFAULT nextval('public.subjects_subject_id_seq'),
                subject_code VARCHAR NOT NULL,
                subject_name VARCHAR NOT NULL,
                subject_hc INTEGER NOT NULL,
                type_subject_id INTEGER NOT NULL,
                syllabus_name VARCHAR,
                syllabus_url VARCHAR,
                subject_created_at TIMESTAMP NOT NULL,
                CONSTRAINT subjects_pk PRIMARY KEY (subject_id)
);


ALTER SEQUENCE public.subjects_subject_id_seq OWNED BY public.subjects.subject_id;

CREATE SEQUENCE public.colleges_college_id_seq;

CREATE TABLE public.colleges (
                college_id INTEGER NOT NULL DEFAULT nextval('public.colleges_college_id_seq'),
                college_code INTEGER NOT NULL,
                college_name VARCHAR NOT NULL,
                faculty_id INTEGER NOT NULL,
                college_created_at TIMESTAMP NOT NULL,
                college_updated_at TIMESTAMP,
                CONSTRAINT colleges_pk PRIMARY KEY (college_id)
);


ALTER SEQUENCE public.colleges_college_id_seq OWNED BY public.colleges.college_id;

CREATE SEQUENCE public.departments_department_id_seq_1;

CREATE TABLE public.departments (
                department_id INTEGER NOT NULL DEFAULT nextval('public.departments_department_id_seq_1'),
                department_code INTEGER NOT NULL,
                department_name VARCHAR NOT NULL,
                college_id INTEGER NOT NULL,
                department_created_at TIMESTAMP NOT NULL,
                department_updated_at TIMESTAMP,
                CONSTRAINT departments_pk PRIMARY KEY (department_id)
);


ALTER SEQUENCE public.departments_department_id_seq_1 OWNED BY public.departments.department_id;

CREATE TABLE public.subject_department (
                subject_id INTEGER NOT NULL,
                department_id INTEGER NOT NULL,
                code_consecutive INTEGER NOT NULL,
                subject_department_created_at TIMESTAMP NOT NULL,
                CONSTRAINT subject_department_pk PRIMARY KEY (subject_id, department_id)
);


CREATE SEQUENCE public.pensum_pensum_id_seq;

CREATE TABLE public.pensum (
                pensum_id INTEGER NOT NULL DEFAULT nextval('public.pensum_pensum_id_seq'),
                college_id INTEGER NOT NULL,
                pensum_date TIMESTAMP,
                created_at TIMESTAMP NOT NULL,
                CONSTRAINT pensum_pk PRIMARY KEY (pensum_id)
);


ALTER SEQUENCE public.pensum_pensum_id_seq OWNED BY public.pensum.pensum_id;

CREATE TABLE public.subject_pensum (
                subject_id INTEGER NOT NULL,
                pensum_id INTEGER NOT NULL,
                type_subject_pensum_id INTEGER NOT NULL,
                term INTEGER NOT NULL,
                hour_restriction INTEGER,
                subject_pensum_created_at TIMESTAMP NOT NULL,
                CONSTRAINT subject_pensum_pk PRIMARY KEY (subject_id, pensum_id)
);


CREATE TABLE public.subject_restriction (
                subject_id_source_restriction INTEGER NOT NULL,
                pensum_id_source_restriction INTEGER NOT NULL,
                subject_id_target_restriction INTEGER NOT NULL,
                pensum_id_target_restriction INTEGER NOT NULL,
                CONSTRAINT subject_restriction_pk PRIMARY KEY (subject_id_source_restriction, pensum_id_source_restriction, subject_id_target_restriction, pensum_id_target_restriction)
);


ALTER TABLE public.colleges ADD CONSTRAINT college_career_fk
FOREIGN KEY (faculty_id)
REFERENCES public.faculties (faculty_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.subjects ADD CONSTRAINT tipo_materia_2_materia_fk
FOREIGN KEY (type_subject_id)
REFERENCES public.type_subject (type_subject_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.users ADD CONSTRAINT tipo_usuario_usuario_fk
FOREIGN KEY (type_user_id)
REFERENCES public.type_user (type_user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.subject_pensum ADD CONSTRAINT tipo_materia_materia_pensum_fk
FOREIGN KEY (type_subject_pensum_id)
REFERENCES public.type_subject_pensum (type_subject_pensum_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.subject_department ADD CONSTRAINT materia_materia_carrera_fk
FOREIGN KEY (subject_id)
REFERENCES public.subjects (subject_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.subject_pensum ADD CONSTRAINT materia_materia_pensum_fk
FOREIGN KEY (subject_id)
REFERENCES public.subjects (subject_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.pensum ADD CONSTRAINT carrera_pensum_fk
FOREIGN KEY (college_id)
REFERENCES public.colleges (college_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.departments ADD CONSTRAINT career_deparment_fk
FOREIGN KEY (college_id)
REFERENCES public.colleges (college_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.subject_department ADD CONSTRAINT departments_subject_college_fk
FOREIGN KEY (department_id)
REFERENCES public.departments (department_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.subject_pensum ADD CONSTRAINT pensum_materia_pensum_fk
FOREIGN KEY (pensum_id)
REFERENCES public.pensum (pensum_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.subject_restriction ADD CONSTRAINT subject_pensum_subject_restriction_fk
FOREIGN KEY (subject_id_source_restriction, pensum_id_source_restriction)
REFERENCES public.subject_pensum (subject_id, pensum_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.subject_restriction ADD CONSTRAINT subject_pensum_subject_restriction_fk1
FOREIGN KEY (subject_id_target_restriction, pensum_id_target_restriction)
REFERENCES public.subject_pensum (subject_id, pensum_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;
