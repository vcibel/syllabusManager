PGDMP         7                 w            SyllabusManager    11.1    11.1 S    u           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            v           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            w           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            x           1262    25071    SyllabusManager    DATABASE     �   CREATE DATABASE "SyllabusManager" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';
 !   DROP DATABASE "SyllabusManager";
             postgres    false            �            1259    25140    colleges    TABLE     $  CREATE TABLE public.colleges (
    college_id integer NOT NULL,
    college_code integer NOT NULL,
    college_name character varying NOT NULL,
    faculty_id integer NOT NULL,
    college_created_at timestamp without time zone NOT NULL,
    college_updated_at timestamp without time zone
);
    DROP TABLE public.colleges;
       public         postgres    false            �            1259    25138    colleges_college_id_seq    SEQUENCE     �   CREATE SEQUENCE public.colleges_college_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.colleges_college_id_seq;
       public       postgres    false    209            y           0    0    colleges_college_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.colleges_college_id_seq OWNED BY public.colleges.college_id;
            public       postgres    false    208            �            1259    25151    departments    TABLE     6  CREATE TABLE public.departments (
    department_id integer NOT NULL,
    department_code integer NOT NULL,
    department_name character varying NOT NULL,
    college_id integer NOT NULL,
    department_created_at timestamp without time zone NOT NULL,
    department_updated_at timestamp without time zone
);
    DROP TABLE public.departments;
       public         postgres    false            �            1259    25149    departments_department_id_seq_1    SEQUENCE     �   CREATE SEQUENCE public.departments_department_id_seq_1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.departments_department_id_seq_1;
       public       postgres    false    211            z           0    0    departments_department_id_seq_1    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.departments_department_id_seq_1 OWNED BY public.departments.department_id;
            public       postgres    false    210            �            1259    25074 	   faculties    TABLE       CREATE TABLE public.faculties (
    faculty_id integer NOT NULL,
    faculty_code integer NOT NULL,
    faculty_name character varying NOT NULL,
    faculty_created_at timestamp without time zone NOT NULL,
    faculty_updated_at timestamp without time zone
);
    DROP TABLE public.faculties;
       public         postgres    false            �            1259    25072    faculties_faculty_id_seq    SEQUENCE     �   CREATE SEQUENCE public.faculties_faculty_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.faculties_faculty_id_seq;
       public       postgres    false    197            {           0    0    faculties_faculty_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.faculties_faculty_id_seq OWNED BY public.faculties.faculty_id;
            public       postgres    false    196            �            1259    25167    pensum    TABLE     �   CREATE TABLE public.pensum (
    pensum_id integer NOT NULL,
    college_id integer NOT NULL,
    pensum_date timestamp without time zone NOT NULL,
    pensum_created_at timestamp without time zone NOT NULL
);
    DROP TABLE public.pensum;
       public         postgres    false            �            1259    25165    pensum_pensum_id_seq    SEQUENCE     }   CREATE SEQUENCE public.pensum_pensum_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.pensum_pensum_id_seq;
       public       postgres    false    214            |           0    0    pensum_pensum_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.pensum_pensum_id_seq OWNED BY public.pensum.pensum_id;
            public       postgres    false    213            �            1259    25160    subject_department    TABLE     �   CREATE TABLE public.subject_department (
    subject_id integer NOT NULL,
    department_id integer NOT NULL,
    code_consecutive integer NOT NULL,
    subject_department_created_at timestamp without time zone NOT NULL
);
 &   DROP TABLE public.subject_department;
       public         postgres    false            �            1259    25173    subject_pensum    TABLE     3  CREATE TABLE public.subject_pensum (
    subject_id integer NOT NULL,
    pensum_id integer NOT NULL,
    type_subject_pensum_id integer NOT NULL,
    term integer NOT NULL,
    subject_restriction integer,
    hour_restriction integer,
    subject_pensum_created_at timestamp without time zone NOT NULL
);
 "   DROP TABLE public.subject_pensum;
       public         postgres    false            �            1259    25129    subjects    TABLE     i  CREATE TABLE public.subjects (
    subject_id integer NOT NULL,
    subject_code character varying NOT NULL,
    subject_name character varying NOT NULL,
    subject_hc integer NOT NULL,
    type_subject_id integer NOT NULL,
    syllabus_name character varying,
    syllabus_url character varying,
    subject_created_at timestamp without time zone NOT NULL
);
    DROP TABLE public.subjects;
       public         postgres    false            �            1259    25127    subjects_subject_id_seq    SEQUENCE     �   CREATE SEQUENCE public.subjects_subject_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.subjects_subject_id_seq;
       public       postgres    false    207            }           0    0    subjects_subject_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.subjects_subject_id_seq OWNED BY public.subjects.subject_id;
            public       postgres    false    206            �            1259    25085    type_subject    TABLE     �   CREATE TABLE public.type_subject (
    type_subject_id integer NOT NULL,
    type_subject_description character varying NOT NULL,
    type_subject_code character varying
);
     DROP TABLE public.type_subject;
       public         postgres    false            �            1259    25083    type_subject_id_seq    SEQUENCE     |   CREATE SEQUENCE public.type_subject_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.type_subject_id_seq;
       public       postgres    false    199            ~           0    0    type_subject_id_seq    SEQUENCE OWNED BY     X   ALTER SEQUENCE public.type_subject_id_seq OWNED BY public.type_subject.type_subject_id;
            public       postgres    false    198            �            1259    25118    type_subject_pensum    TABLE     �   CREATE TABLE public.type_subject_pensum (
    type_subject_pensum_id integer NOT NULL,
    type_subject_pensum_description character varying NOT NULL
);
 '   DROP TABLE public.type_subject_pensum;
       public         postgres    false            �            1259    25116 '   type_subject_pensum_type_subject_id_seq    SEQUENCE     �   CREATE SEQUENCE public.type_subject_pensum_type_subject_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public.type_subject_pensum_type_subject_id_seq;
       public       postgres    false    205                       0    0 '   type_subject_pensum_type_subject_id_seq    SEQUENCE OWNED BY     z   ALTER SEQUENCE public.type_subject_pensum_type_subject_id_seq OWNED BY public.type_subject_pensum.type_subject_pensum_id;
            public       postgres    false    204            �            1259    25096 	   type_user    TABLE     {   CREATE TABLE public.type_user (
    type_user_id integer NOT NULL,
    type_user_description character varying NOT NULL
);
    DROP TABLE public.type_user;
       public         postgres    false            �            1259    25094    type_user_type_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.type_user_type_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.type_user_type_user_id_seq;
       public       postgres    false    201            �           0    0    type_user_type_user_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.type_user_type_user_id_seq OWNED BY public.type_user.type_user_id;
            public       postgres    false    200            �            1259    25107    users    TABLE     ~  CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying NOT NULL,
    user_lastname character varying NOT NULL,
    user_username character varying NOT NULL,
    user_password character varying NOT NULL,
    type_user_id integer NOT NULL,
    user_created_at timestamp without time zone NOT NULL,
    user_updated_at timestamp without time zone
);
    DROP TABLE public.users;
       public         postgres    false            �            1259    25105    users_user_id_seq    SEQUENCE     z   CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public       postgres    false    203            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
            public       postgres    false    202            �
           2604    25143    colleges college_id    DEFAULT     z   ALTER TABLE ONLY public.colleges ALTER COLUMN college_id SET DEFAULT nextval('public.colleges_college_id_seq'::regclass);
 B   ALTER TABLE public.colleges ALTER COLUMN college_id DROP DEFAULT;
       public       postgres    false    209    208    209            �
           2604    25154    departments department_id    DEFAULT     �   ALTER TABLE ONLY public.departments ALTER COLUMN department_id SET DEFAULT nextval('public.departments_department_id_seq_1'::regclass);
 H   ALTER TABLE public.departments ALTER COLUMN department_id DROP DEFAULT;
       public       postgres    false    211    210    211            �
           2604    25077    faculties faculty_id    DEFAULT     |   ALTER TABLE ONLY public.faculties ALTER COLUMN faculty_id SET DEFAULT nextval('public.faculties_faculty_id_seq'::regclass);
 C   ALTER TABLE public.faculties ALTER COLUMN faculty_id DROP DEFAULT;
       public       postgres    false    196    197    197            �
           2604    25170    pensum pensum_id    DEFAULT     t   ALTER TABLE ONLY public.pensum ALTER COLUMN pensum_id SET DEFAULT nextval('public.pensum_pensum_id_seq'::regclass);
 ?   ALTER TABLE public.pensum ALTER COLUMN pensum_id DROP DEFAULT;
       public       postgres    false    214    213    214            �
           2604    25132    subjects subject_id    DEFAULT     z   ALTER TABLE ONLY public.subjects ALTER COLUMN subject_id SET DEFAULT nextval('public.subjects_subject_id_seq'::regclass);
 B   ALTER TABLE public.subjects ALTER COLUMN subject_id DROP DEFAULT;
       public       postgres    false    206    207    207            �
           2604    25088    type_subject type_subject_id    DEFAULT        ALTER TABLE ONLY public.type_subject ALTER COLUMN type_subject_id SET DEFAULT nextval('public.type_subject_id_seq'::regclass);
 K   ALTER TABLE public.type_subject ALTER COLUMN type_subject_id DROP DEFAULT;
       public       postgres    false    199    198    199            �
           2604    25121 *   type_subject_pensum type_subject_pensum_id    DEFAULT     �   ALTER TABLE ONLY public.type_subject_pensum ALTER COLUMN type_subject_pensum_id SET DEFAULT nextval('public.type_subject_pensum_type_subject_id_seq'::regclass);
 Y   ALTER TABLE public.type_subject_pensum ALTER COLUMN type_subject_pensum_id DROP DEFAULT;
       public       postgres    false    205    204    205            �
           2604    25099    type_user type_user_id    DEFAULT     �   ALTER TABLE ONLY public.type_user ALTER COLUMN type_user_id SET DEFAULT nextval('public.type_user_type_user_id_seq'::regclass);
 E   ALTER TABLE public.type_user ALTER COLUMN type_user_id DROP DEFAULT;
       public       postgres    false    200    201    201            �
           2604    25110    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public       postgres    false    202    203    203            l          0    25140    colleges 
   TABLE DATA               ~   COPY public.colleges (college_id, college_code, college_name, faculty_id, college_created_at, college_updated_at) FROM stdin;
    public       postgres    false    209   �g       n          0    25151    departments 
   TABLE DATA               �   COPY public.departments (department_id, department_code, department_name, college_id, department_created_at, department_updated_at) FROM stdin;
    public       postgres    false    211   Kh       `          0    25074 	   faculties 
   TABLE DATA               s   COPY public.faculties (faculty_id, faculty_code, faculty_name, faculty_created_at, faculty_updated_at) FROM stdin;
    public       postgres    false    197   �h       q          0    25167    pensum 
   TABLE DATA               W   COPY public.pensum (pensum_id, college_id, pensum_date, pensum_created_at) FROM stdin;
    public       postgres    false    214   �h       o          0    25160    subject_department 
   TABLE DATA               x   COPY public.subject_department (subject_id, department_id, code_consecutive, subject_department_created_at) FROM stdin;
    public       postgres    false    212   i       r          0    25173    subject_pensum 
   TABLE DATA               �   COPY public.subject_pensum (subject_id, pensum_id, type_subject_pensum_id, term, subject_restriction, hour_restriction, subject_pensum_created_at) FROM stdin;
    public       postgres    false    215   Ri       j          0    25129    subjects 
   TABLE DATA               �   COPY public.subjects (subject_id, subject_code, subject_name, subject_hc, type_subject_id, syllabus_name, syllabus_url, subject_created_at) FROM stdin;
    public       postgres    false    207   oi       b          0    25085    type_subject 
   TABLE DATA               d   COPY public.type_subject (type_subject_id, type_subject_description, type_subject_code) FROM stdin;
    public       postgres    false    199   +j       h          0    25118    type_subject_pensum 
   TABLE DATA               f   COPY public.type_subject_pensum (type_subject_pensum_id, type_subject_pensum_description) FROM stdin;
    public       postgres    false    205   �j       d          0    25096 	   type_user 
   TABLE DATA               H   COPY public.type_user (type_user_id, type_user_description) FROM stdin;
    public       postgres    false    201   �j       f          0    25107    users 
   TABLE DATA               �   COPY public.users (user_id, user_name, user_lastname, user_username, user_password, type_user_id, user_created_at, user_updated_at) FROM stdin;
    public       postgres    false    203   �j       �           0    0    colleges_college_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.colleges_college_id_seq', 5, true);
            public       postgres    false    208            �           0    0    departments_department_id_seq_1    SEQUENCE SET     M   SELECT pg_catalog.setval('public.departments_department_id_seq_1', 3, true);
            public       postgres    false    210            �           0    0    faculties_faculty_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.faculties_faculty_id_seq', 2, true);
            public       postgres    false    196            �           0    0    pensum_pensum_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.pensum_pensum_id_seq', 1, false);
            public       postgres    false    213            �           0    0    subjects_subject_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.subjects_subject_id_seq', 23, true);
            public       postgres    false    206            �           0    0    type_subject_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.type_subject_id_seq', 4, true);
            public       postgres    false    198            �           0    0 '   type_subject_pensum_type_subject_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public.type_subject_pensum_type_subject_id_seq', 1, false);
            public       postgres    false    204            �           0    0    type_user_type_user_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.type_user_type_user_id_seq', 1, false);
            public       postgres    false    200            �           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);
            public       postgres    false    202            �
           2606    25148    colleges colleges_pk 
   CONSTRAINT     Z   ALTER TABLE ONLY public.colleges
    ADD CONSTRAINT colleges_pk PRIMARY KEY (college_id);
 >   ALTER TABLE ONLY public.colleges DROP CONSTRAINT colleges_pk;
       public         postgres    false    209            �
           2606    25159    departments departments_pk 
   CONSTRAINT     c   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pk PRIMARY KEY (department_id);
 D   ALTER TABLE ONLY public.departments DROP CONSTRAINT departments_pk;
       public         postgres    false    211            �
           2606    25082    faculties faculties_pk 
   CONSTRAINT     \   ALTER TABLE ONLY public.faculties
    ADD CONSTRAINT faculties_pk PRIMARY KEY (faculty_id);
 @   ALTER TABLE ONLY public.faculties DROP CONSTRAINT faculties_pk;
       public         postgres    false    197            �
           2606    25172    pensum pensum_pk 
   CONSTRAINT     U   ALTER TABLE ONLY public.pensum
    ADD CONSTRAINT pensum_pk PRIMARY KEY (pensum_id);
 :   ALTER TABLE ONLY public.pensum DROP CONSTRAINT pensum_pk;
       public         postgres    false    214            �
           2606    25164 %   subject_department subject_college_pk 
   CONSTRAINT     z   ALTER TABLE ONLY public.subject_department
    ADD CONSTRAINT subject_college_pk PRIMARY KEY (subject_id, department_id);
 O   ALTER TABLE ONLY public.subject_department DROP CONSTRAINT subject_college_pk;
       public         postgres    false    212    212            �
           2606    25177     subject_pensum subject_pensum_pk 
   CONSTRAINT     q   ALTER TABLE ONLY public.subject_pensum
    ADD CONSTRAINT subject_pensum_pk PRIMARY KEY (subject_id, pensum_id);
 J   ALTER TABLE ONLY public.subject_pensum DROP CONSTRAINT subject_pensum_pk;
       public         postgres    false    215    215            �
           2606    25137    subjects subjects_pk 
   CONSTRAINT     Z   ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pk PRIMARY KEY (subject_id);
 >   ALTER TABLE ONLY public.subjects DROP CONSTRAINT subjects_pk;
       public         postgres    false    207            �
           2606    25126 *   type_subject_pensum type_subject_pensum_pk 
   CONSTRAINT     |   ALTER TABLE ONLY public.type_subject_pensum
    ADD CONSTRAINT type_subject_pensum_pk PRIMARY KEY (type_subject_pensum_id);
 T   ALTER TABLE ONLY public.type_subject_pensum DROP CONSTRAINT type_subject_pensum_pk;
       public         postgres    false    205            �
           2606    25093    type_subject type_subject_pk 
   CONSTRAINT     g   ALTER TABLE ONLY public.type_subject
    ADD CONSTRAINT type_subject_pk PRIMARY KEY (type_subject_id);
 F   ALTER TABLE ONLY public.type_subject DROP CONSTRAINT type_subject_pk;
       public         postgres    false    199            �
           2606    25104    type_user type_user_pk 
   CONSTRAINT     ^   ALTER TABLE ONLY public.type_user
    ADD CONSTRAINT type_user_pk PRIMARY KEY (type_user_id);
 @   ALTER TABLE ONLY public.type_user DROP CONSTRAINT type_user_pk;
       public         postgres    false    201            �
           2606    25115    users users_pk 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
       public         postgres    false    203            �
           2606    25213    departments career_deparment_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT career_deparment_fk FOREIGN KEY (college_id) REFERENCES public.colleges(college_id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.departments DROP CONSTRAINT career_deparment_fk;
       public       postgres    false    2771    211    209            �
           2606    25208    pensum carrera_pensum_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.pensum
    ADD CONSTRAINT carrera_pensum_fk FOREIGN KEY (college_id) REFERENCES public.colleges(college_id) ON UPDATE CASCADE ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.pensum DROP CONSTRAINT carrera_pensum_fk;
       public       postgres    false    214    209    2771            �
           2606    34713    colleges college_career_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.colleges
    ADD CONSTRAINT college_career_fk FOREIGN KEY (faculty_id) REFERENCES public.faculties(faculty_id) ON UPDATE CASCADE;
 D   ALTER TABLE ONLY public.colleges DROP CONSTRAINT college_career_fk;
       public       postgres    false    209    2759    197            �
           2606    25218 1   subject_department departments_subject_college_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.subject_department
    ADD CONSTRAINT departments_subject_college_fk FOREIGN KEY (department_id) REFERENCES public.departments(department_id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.subject_department DROP CONSTRAINT departments_subject_college_fk;
       public       postgres    false    212    211    2773            �
           2606    25198 -   subject_department materia_materia_carrera_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.subject_department
    ADD CONSTRAINT materia_materia_carrera_fk FOREIGN KEY (subject_id) REFERENCES public.subjects(subject_id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.subject_department DROP CONSTRAINT materia_materia_carrera_fk;
       public       postgres    false    207    212    2769            �
           2606    25203 (   subject_pensum materia_materia_pensum_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.subject_pensum
    ADD CONSTRAINT materia_materia_pensum_fk FOREIGN KEY (subject_id) REFERENCES public.subjects(subject_id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.subject_pensum DROP CONSTRAINT materia_materia_pensum_fk;
       public       postgres    false    2769    207    215            �
           2606    25223 '   subject_pensum pensum_materia_pensum_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.subject_pensum
    ADD CONSTRAINT pensum_materia_pensum_fk FOREIGN KEY (pensum_id) REFERENCES public.pensum(pensum_id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.subject_pensum DROP CONSTRAINT pensum_materia_pensum_fk;
       public       postgres    false    215    214    2777            �
           2606    25183 "   subjects tipo_materia_2_materia_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT tipo_materia_2_materia_fk FOREIGN KEY (type_subject_id) REFERENCES public.type_subject(type_subject_id);
 L   ALTER TABLE ONLY public.subjects DROP CONSTRAINT tipo_materia_2_materia_fk;
       public       postgres    false    207    199    2761            �
           2606    25193 -   subject_pensum tipo_materia_materia_pensum_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.subject_pensum
    ADD CONSTRAINT tipo_materia_materia_pensum_fk FOREIGN KEY (type_subject_pensum_id) REFERENCES public.type_subject_pensum(type_subject_pensum_id);
 W   ALTER TABLE ONLY public.subject_pensum DROP CONSTRAINT tipo_materia_materia_pensum_fk;
       public       postgres    false    205    215    2767            �
           2606    25188    users tipo_usuario_usuario_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT tipo_usuario_usuario_fk FOREIGN KEY (type_user_id) REFERENCES public.type_user(type_user_id);
 G   ALTER TABLE ONLY public.users DROP CONSTRAINT tipo_usuario_usuario_fk;
       public       postgres    false    2763    203    201            l   ^   x�eʽ� ����0w��l��� 1��gc���@#-u˵����m?�;��*��b��h�cq�tvX���n)\��/�'|�wJ�+M      n   8   x�3�4�LJ,�L��4�420��50�52U04�24�2��323�03������� ��	�      `   S   x�3�4�tKL.�)ILQHIU��KO��L-�L�420��50�5�P0��2��26�336643C�22�24�20�3
��s��qqq ���      q      x������ � �      o   /   x�32�4�4�420��50�52U04�24�20�344224����� ���      r      x������ � �      j   �   x�u��
�0D��+��DQћ�^��
�ڭQK[����k3o�e��\t\��h�	ݚ�L����]eU�[��}bE�&�����}:Vڌ%����[W�>����n8�{���$�i�!�b��f8��De���X�z�"Wę�2��<My�87�q��M>      b   b   x�3�I=��(39�3�ˈ3����� OG�'1)�(�$�(3_!_!$1''��Ӈ˘�9?� ?/5�$U�<_!%U!'Qf�.�� .N,��\1z\\\ ��-�      h      x������ � �      d      x�3�tL����2�-N-����� 6��      f   �   x�%�=�0@�=h�%qwF8A�q�.���BO����͞��|��|��:Q��#���K��5�����A#(39
�l��޽J�ln�	�%4�"�=���;x�.��$��ot)��\@6������}���=�2�     