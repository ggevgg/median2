--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2 (Homebrew)

-- Started on 2023-04-22 20:43:04 EEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 21095)
-- Name: median; Type: SCHEMA; Schema: -; Owner: root
--

CREATE SCHEMA median;


ALTER SCHEMA median OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 21096)
-- Name: Brand; Type: TABLE; Schema: median; Owner: root
--

CREATE TABLE median."Brand" (
    name text NOT NULL,
    description text,
    thumbnail text
);


ALTER TABLE median."Brand" OWNER TO root;

--
-- TOC entry 216 (class 1259 OID 21103)
-- Name: Category; Type: TABLE; Schema: median; Owner: root
--

CREATE TABLE median."Category" (
    name text NOT NULL,
    description text,
    thumbnail text
);


ALTER TABLE median."Category" OWNER TO root;

--
-- TOC entry 217 (class 1259 OID 21110)
-- Name: Characteristics; Type: TABLE; Schema: median; Owner: root
--

CREATE TABLE median."Characteristics" (
    name text NOT NULL,
    value text NOT NULL,
    "productId" integer NOT NULL
);


ALTER TABLE median."Characteristics" OWNER TO root;

--
-- TOC entry 218 (class 1259 OID 21116)
-- Name: Image; Type: TABLE; Schema: median; Owner: root
--

CREATE TABLE median."Image" (
    id integer NOT NULL,
    url text NOT NULL
);


ALTER TABLE median."Image" OWNER TO root;

--
-- TOC entry 219 (class 1259 OID 21121)
-- Name: ImageProducts; Type: TABLE; Schema: median; Owner: root
--

CREATE TABLE median."ImageProducts" (
    "imageId" integer NOT NULL,
    "productId" integer NOT NULL
);


ALTER TABLE median."ImageProducts" OWNER TO root;

--
-- TOC entry 220 (class 1259 OID 21124)
-- Name: Image_id_seq; Type: SEQUENCE; Schema: median; Owner: root
--

CREATE SEQUENCE median."Image_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE median."Image_id_seq" OWNER TO root;

--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 220
-- Name: Image_id_seq; Type: SEQUENCE OWNED BY; Schema: median; Owner: root
--

ALTER SEQUENCE median."Image_id_seq" OWNED BY median."Image".id;


--
-- TOC entry 221 (class 1259 OID 21125)
-- Name: Order; Type: TABLE; Schema: median; Owner: root
--

CREATE TABLE median."Order" (
    id integer NOT NULL,
    "userId" integer,
    email text,
    name text,
    phone text
);


ALTER TABLE median."Order" OWNER TO root;

--
-- TOC entry 222 (class 1259 OID 21130)
-- Name: OrderProducts; Type: TABLE; Schema: median; Owner: root
--

CREATE TABLE median."OrderProducts" (
    "orderId" integer NOT NULL,
    "productId" integer NOT NULL,
    amount integer
);


ALTER TABLE median."OrderProducts" OWNER TO root;

--
-- TOC entry 223 (class 1259 OID 21133)
-- Name: Order_id_seq; Type: SEQUENCE; Schema: median; Owner: root
--

CREATE SEQUENCE median."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE median."Order_id_seq" OWNER TO root;

--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 223
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: median; Owner: root
--

ALTER SEQUENCE median."Order_id_seq" OWNED BY median."Order".id;


--
-- TOC entry 224 (class 1259 OID 21134)
-- Name: Product; Type: TABLE; Schema: median; Owner: root
--

CREATE TABLE median."Product" (
    id integer NOT NULL,
    description text,
    "isInStock" boolean DEFAULT true NOT NULL,
    price double precision DEFAULT 0 NOT NULL,
    "discountPercentage" double precision DEFAULT 0 NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    thumbnail text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "productGroupId" integer
);


ALTER TABLE median."Product" OWNER TO root;

--
-- TOC entry 225 (class 1259 OID 21144)
-- Name: ProductGroup; Type: TABLE; Schema: median; Owner: root
--

CREATE TABLE median."ProductGroup" (
    id integer NOT NULL,
    title text NOT NULL,
    "descriptionShort" text,
    description text,
    rating double precision DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    thumbnail text,
    "brandId" text,
    "categoryId" text
);


ALTER TABLE median."ProductGroup" OWNER TO root;

--
-- TOC entry 226 (class 1259 OID 21151)
-- Name: ProductGroup_id_seq; Type: SEQUENCE; Schema: median; Owner: root
--

CREATE SEQUENCE median."ProductGroup_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE median."ProductGroup_id_seq" OWNER TO root;

--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 226
-- Name: ProductGroup_id_seq; Type: SEQUENCE OWNED BY; Schema: median; Owner: root
--

ALTER SEQUENCE median."ProductGroup_id_seq" OWNED BY median."ProductGroup".id;


--
-- TOC entry 227 (class 1259 OID 21152)
-- Name: Product_id_seq; Type: SEQUENCE; Schema: median; Owner: root
--

CREATE SEQUENCE median."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE median."Product_id_seq" OWNER TO root;

--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 227
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: median; Owner: root
--

ALTER SEQUENCE median."Product_id_seq" OWNED BY median."Product".id;


--
-- TOC entry 228 (class 1259 OID 21153)
-- Name: User; Type: TABLE; Schema: median; Owner: root
--

CREATE TABLE median."User" (
    id integer NOT NULL,
    name text,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    phone text NOT NULL
);


ALTER TABLE median."User" OWNER TO root;

--
-- TOC entry 229 (class 1259 OID 21159)
-- Name: User_id_seq; Type: SEQUENCE; Schema: median; Owner: root
--

CREATE SEQUENCE median."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE median."User_id_seq" OWNER TO root;

--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 229
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: median; Owner: root
--

ALTER SEQUENCE median."User_id_seq" OWNED BY median."User".id;


--
-- TOC entry 3237 (class 2604 OID 21163)
-- Name: Image id; Type: DEFAULT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."Image" ALTER COLUMN id SET DEFAULT nextval('median."Image_id_seq"'::regclass);


--
-- TOC entry 3238 (class 2604 OID 21164)
-- Name: Order id; Type: DEFAULT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."Order" ALTER COLUMN id SET DEFAULT nextval('median."Order_id_seq"'::regclass);


--
-- TOC entry 3239 (class 2604 OID 21165)
-- Name: Product id; Type: DEFAULT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."Product" ALTER COLUMN id SET DEFAULT nextval('median."Product_id_seq"'::regclass);


--
-- TOC entry 3245 (class 2604 OID 21166)
-- Name: ProductGroup id; Type: DEFAULT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."ProductGroup" ALTER COLUMN id SET DEFAULT nextval('median."ProductGroup_id_seq"'::regclass);


--
-- TOC entry 3248 (class 2604 OID 21167)
-- Name: User id; Type: DEFAULT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."User" ALTER COLUMN id SET DEFAULT nextval('median."User_id_seq"'::regclass);


--
-- TOC entry 3425 (class 0 OID 21096)
-- Dependencies: 215
-- Data for Name: Brand; Type: TABLE DATA; Schema: median; Owner: root
--

COPY median."Brand" (name, description, thumbnail) FROM stdin;
Cannondale	\N	\N
Ardis Paola	\N	\N
Ardis	\N	\N
\.


--
-- TOC entry 3426 (class 0 OID 21103)
-- Dependencies: 216
-- Data for Name: Category; Type: TABLE DATA; Schema: median; Owner: root
--

COPY median."Category" (name, description, thumbnail) FROM stdin;
bike	\N	https://i.dummyjson.com/data/products/1/thumbnail.jpg
controller	\N	\N
motor	\N	\N
accessories	\N	\N
accumulator	\N	\N
electro-kits	\N	\N
\.


--
-- TOC entry 3427 (class 0 OID 21110)
-- Dependencies: 217
-- Data for Name: Characteristics; Type: TABLE DATA; Schema: median; Owner: root
--

COPY median."Characteristics" (name, value, "productId") FROM stdin;
Розмір колеса	26	42
Колір	#fcfefe&#eb2632	42
Потужність мотору	350W	42
Об‘єм акумулятору	7.8 А/h	42
Вольтаж	48V	42
Додатково	Кошик та Багажник	42
Максимальне навантаження	120 кг	32
Матеріал рами	Алюміній	32
Розмір колеса	26	32
Колір	#141010	32
Потужність мотору	1000W	32
Об‘єм акумулятору	13 А/h	32
Максимальный пробіг	60 км	32
Час заряду	6.5 год	32
Максимальна швидкість	50 км/ч	32
Максимальне навантаження	120 кг	33
Матеріал рами	Алюміній	33
Розмір колеса	26	33
Колір	#fcfefe	33
Потужність мотору	1000W	33
Об‘єм акумулятору	13 А/h	33
Максимальный пробіг	60 км	33
Час заряду	6.5 год	33
Максимальна швидкість	50 км/ч	33
Максимальне навантаження	120 кг	34
Матеріал рами	Алюміній	34
Розмір колеса	26	34
Колір	#141010	34
Потужність мотору	1000W	34
Об‘єм акумулятору	13 А/h	34
Максимальный пробіг	60 км	34
Час заряду	6.5 год	34
Максимальна швидкість	50 км/ч	34
Максимальне навантаження	120 кг	35
Матеріал рами	Алюміній	35
Розмір колеса	29	35
Колір	#fcfefe	35
Потужність мотору	450W	35
Об‘єм акумулятору	7.8 А/h	35
Максимальный пробіг	40 км	35
Час заряду	4 год	35
Максимальна швидкість	40 км/ч	35
Максимальне навантаження	120 кг	36
Матеріал рами	Алюміній	36
Розмір колеса	29	36
Колір	#141010	36
Потужність мотору	1000W	36
Об‘єм акумулятору	13 А/h	36
Максимальный пробіг	60 км	36
Час заряду	6.5 год	36
Максимальна швидкість	50 км/ч	36
Максимальне навантаження	120 кг	37
Матеріал рами	Сталь	37
Розмір колеса	26	37
Колір	#fcfefe	37
Потужність мотору	1000W	37
Об‘єм акумулятору	13 А/h	37
Максимальный пробіг	60 км	37
Час заряду	6.5 год	37
Максимальна швидкість	50 км/ч	37
Максимальне навантаження	120 кг	38
Матеріал рами	Алюміній	38
Розмір колеса	26	38
Колір	#141010	38
Потужність мотору	1000W	38
Об‘єм акумулятору	13 А/h	38
Максимальный пробіг	60 км	38
Час заряду	6.5 год	38
Максимальна швидкість	50 км/ч	38
Максимальне навантаження	120 кг	39
Матеріал рами	Алюміній	39
Розмір колеса	26	39
Колір	#ffa952	39
Потужність мотору	1000W	39
Об‘єм акумулятору	13 А/h	39
Максимальный пробіг	60 км	39
Час заряду	6.5 год	39
Максимальна швидкість	50 км/ч	39
Максимальне навантаження	120 кг	40
Матеріал рами	Алюміній	40
Розмір колеса	26	40
Колір	#fcfefe	40
Потужність мотору	1000W	40
Об‘єм акумулятору	13 А/h	40
Максимальный пробіг	60 км	40
Час заряду	6.5 год	40
Максимальна швидкість	50 км/ч	40
\.


--
-- TOC entry 3428 (class 0 OID 21116)
-- Dependencies: 218
-- Data for Name: Image; Type: TABLE DATA; Schema: median; Owner: root
--

COPY median."Image" (id, url) FROM stdin;
1	0a9887c8-faa3-4319-8afb-a8f65df8e5e5.jpg
2	1b3aa61b-792a-48eb-9340-4a1e95e7b428.jpg
3	3c5f6d29-fd00-40af-91ef-d8156a2fead7.jpg
4	4a087faa-275e-4fd1-91f5-94f468633582.jpg
5	4b509b79-91aa-4753-9d7f-3497ae717185.jpg
6	4ffd20ad-8873-4b80-a4b1-0791702bbf9e.jpg
7	5c47bae2-9f33-41ad-abba-0dd9e5053fab.jpg
8	07cbbe98-1d66-4572-8efc-581db3a8546c.jpg
9	7e72e817-a49f-40a9-8e8d-7ba9d6d86f0f.jpg
10	8b299813-5781-437d-8117-5a8f6c111387.jpg
11	8ce22026-e3ae-42ad-8728-39dfcba9db6e.jpg
12	8e251860-5814-44ab-a95a-83c9a5e34a8c.jpg
13	10ecccde-7757-4c3f-9462-43ed0715a175.jpg
14	16d44cb8-9306-4db1-aeeb-b82c37aecb1e.jpg
15	21b6982a-03db-486a-8754-3daf8b6071f7.jpg
16	51d42c3a-476a-4846-98de-27a3855d437a.jpg
17	98dca302-09d0-4d00-b7b8-5cc57c41e0fd.jpg
18	101d2e3a-0099-448b-a53d-7e215f8225c0.jpg
19	196deca3-3cbe-4ae7-9cfc-63dfc381b5cf.jpg
20	553c00bb-ea3c-4e00-b627-7eaf7df8779e.jpg
21	3833e01d-5632-4df9-a737-e2419762f91a.jpg
22	5762bc85-8e2a-4d6f-af9b-0549bdc3a06b.jpg
23	00098558-6f12-416f-8104-edd34a0f61b6.jpg
24	4467443e-0fb9-4b5b-8f9b-33f28b42cff6.jpg
25	32971688-5f4b-4b01-be3d-0aa76e7719cb.jpg
26	a24c569f-5ac4-438f-8b17-46d6e9161711.jpg
27	a311a0b9-3f3d-4f51-8e27-a03f67e34275.jpg
28	a929abbc-dcb9-4e15-8350-60ad533abc7d.jpg
29	aa3755ec-ab14-49fc-865a-ad428998b295.jpg
30	afda138f-9254-42cc-8bf5-94e9495c50ee.jpg
31	b2c89e90-74e7-47af-8198-2c551edd0129.jpg
32	b017165f-8578-4b57-b2de-e1ce8db8add4.jpg
33	be670cd2-47bf-47bb-b743-57ae9e39b9f0.jpg
34	c54e0941-bd97-46c3-ab84-54b55c1e68cf.jpg
35	d1b8b067-c5a9-4258-9954-02f34394536a.jpg
36	d0188228-affd-4153-a614-d5cdfda03815.jpg
37	d0278329-4b20-4b10-a3f4-e193e4eebc58.jpg
38	e5b6aebd-7762-4b78-8eef-6c325d810b45.jpg
39	e663fd37-8271-4b3d-abd1-29f6fbfbf12a.jpg
40	edb1acb6-2edb-4b93-a905-39c026d182f2.jpg
41	fc12e6cb-c077-407b-b7ec-19d650191f92.jpg
\.


--
-- TOC entry 3429 (class 0 OID 21121)
-- Dependencies: 219
-- Data for Name: ImageProducts; Type: TABLE DATA; Schema: median; Owner: root
--

COPY median."ImageProducts" ("imageId", "productId") FROM stdin;
34	42
38	42
39	42
20	42
8	42
14	42
35	42
4	42
12	32
31	32
9	32
25	32
28	32
2	32
21	32
7	32
12	33
31	33
9	33
25	33
28	33
2	33
21	33
7	33
7	34
21	34
2	34
28	34
25	34
9	34
31	34
12	34
27	35
17	35
24	35
30	35
6	35
32	35
37	35
29	35
26	35
18	36
19	36
1	36
36	36
13	36
16	36
41	37
15	37
40	37
3	37
22	37
11	37
10	37
5	37
7	38
21	38
2	38
28	38
25	38
9	38
31	38
12	38
7	39
21	39
2	39
28	39
25	39
9	39
31	39
12	39
7	40
21	40
2	40
28	40
25	40
9	40
31	40
12	40
\.


--
-- TOC entry 3431 (class 0 OID 21125)
-- Dependencies: 221
-- Data for Name: Order; Type: TABLE DATA; Schema: median; Owner: root
--

COPY median."Order" (id, "userId", email, name, phone) FROM stdin;
\.


--
-- TOC entry 3432 (class 0 OID 21130)
-- Dependencies: 222
-- Data for Name: OrderProducts; Type: TABLE DATA; Schema: median; Owner: root
--

COPY median."OrderProducts" ("orderId", "productId", amount) FROM stdin;
\.


--
-- TOC entry 3434 (class 0 OID 21134)
-- Dependencies: 224
-- Data for Name: Product; Type: TABLE DATA; Schema: median; Owner: root
--

COPY median."Product" (id, description, "isInStock", price, "discountPercentage", stock, thumbnail, "createdAt", "updatedAt", "productGroupId") FROM stdin;
32	\N	t	26760	2	36	\N	2023-04-17 20:43:39.297	2023-04-17 20:43:39.297	21
33	\N	t	26760	2	36	\N	2023-04-17 20:43:39.297	2023-04-17 20:43:39.297	21
34	\N	t	26760	2	36	\N	2023-04-17 20:44:21.204	2023-04-17 20:44:21.204	22
35	\N	t	26760	2	36	\N	2023-04-17 20:45:10.469	2023-04-17 20:45:10.469	23
36	\N	t	26760	2	36	\N	2023-04-17 20:45:53.352	2023-04-17 20:45:53.352	24
37	\N	t	9999	2	36	\N	2023-04-17 20:46:45.891	2023-04-17 20:46:45.891	25
38	\N	t	26760	2	36	\N	2023-04-17 20:51:41.696	2023-04-17 20:51:41.696	26
39	\N	t	26760	2	36	\N	2023-04-17 20:51:41.696	2023-04-17 20:51:41.696	26
40	\N	t	26760	2	36	\N	2023-04-17 20:51:41.696	2023-04-17 20:51:41.696	26
42	\N	t	200000	2	36	\N	2023-04-17 21:03:16.801	2023-04-17 21:03:16.801	28
\.


--
-- TOC entry 3435 (class 0 OID 21144)
-- Dependencies: 225
-- Data for Name: ProductGroup; Type: TABLE DATA; Schema: median; Owner: root
--

COPY median."ProductGroup" (id, title, "descriptionShort", description, rating, "createdAt", "updatedAt", thumbnail, "brandId", "categoryId") FROM stdin;
21	Електро-велосипед Konar color2	Потужність мотору:1000W; Пробіг:60км;		0	2023-04-17 20:43:39.297	2023-04-17 20:43:39.297	8e251860-5814-44ab-a95a-83c9a5e34a8c.jpg	Cannondale	bike
22	Електро-велосипед Konar 26	Потужність мотору:1000W; Пробіг:60км;		0	2023-04-17 20:44:21.204	2023-04-17 20:44:21.204	8e251860-5814-44ab-a95a-83c9a5e34a8c.jpg	Cannondale	bike
23	Електро-велосипед Paola	Потужність мотору:450W; Пробіг:40км;		0	2023-04-17 20:45:10.469	2023-04-17 20:45:10.469	a24c569f-5ac4-438f-8b17-46d6e9161711.jpg	Cannondale	bike
24	Електро-велосипед Konar	Потужність мотору:1000W; Пробіг:60км;	Konar - гірський велосипед який проїде будь-де.	0	2023-04-17 20:45:53.352	2023-04-17 20:45:53.352	51d42c3a-476a-4846-98de-27a3855d437a.jpg	Cannondale	bike
25	Електро-велосипед Elite	Потужність мотору:1000W; Пробіг:60км;		0	2023-04-17 20:46:45.891	2023-04-17 20:46:45.891	4b509b79-91aa-4753-9d7f-3497ae717185.jpg	Cannondale	bike
26	Електро-велосипед Konar234	Потужність мотору:1000W; Пробіг:60км;		0	2023-04-17 20:51:41.696	2023-04-17 20:51:41.696	8e251860-5814-44ab-a95a-83c9a5e34a8c.jpg	Cannondale	bike
28	Електро-велосипед Messina	Потужність мотору:350W; Пробіг:40км;	Ardis Messina - дуже гарний міський велосипед який ідеально підійде для поїздок по місту або сільскій місцевості	0	2023-04-17 21:03:16.801	2023-04-17 21:03:16.801	4a087faa-275e-4fd1-91f5-94f468633582.jpg	Cannondale	bike
\.


--
-- TOC entry 3438 (class 0 OID 21153)
-- Dependencies: 228
-- Data for Name: User; Type: TABLE DATA; Schema: median; Owner: root
--

COPY median."User" (id, name, email, password, "createdAt", "updatedAt", phone) FROM stdin;
1	Sabin Adams	sabin@adams.com	password-sabin	2023-03-25 11:45:19.089	2023-03-25 11:45:19.089	1111111
2	Alex Ruheni	alex@ruheni.com	password-alex	2023-03-25 11:45:19.103	2023-03-25 11:45:19.103	2222222
\.


--
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 220
-- Name: Image_id_seq; Type: SEQUENCE SET; Schema: median; Owner: root
--

SELECT pg_catalog.setval('median."Image_id_seq"', 41, true);


--
-- TOC entry 3451 (class 0 OID 0)
-- Dependencies: 223
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: median; Owner: root
--

SELECT pg_catalog.setval('median."Order_id_seq"', 1, false);


--
-- TOC entry 3452 (class 0 OID 0)
-- Dependencies: 226
-- Name: ProductGroup_id_seq; Type: SEQUENCE SET; Schema: median; Owner: root
--

SELECT pg_catalog.setval('median."ProductGroup_id_seq"', 28, true);


--
-- TOC entry 3453 (class 0 OID 0)
-- Dependencies: 227
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: median; Owner: root
--

SELECT pg_catalog.setval('median."Product_id_seq"', 42, true);


--
-- TOC entry 3454 (class 0 OID 0)
-- Dependencies: 229
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: median; Owner: root
--

SELECT pg_catalog.setval('median."User_id_seq"', 2, true);


--
-- TOC entry 3252 (class 2606 OID 21293)
-- Name: Brand Brand_pkey; Type: CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."Brand"
    ADD CONSTRAINT "Brand_pkey" PRIMARY KEY (name);


--
-- TOC entry 3255 (class 2606 OID 21295)
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (name);


--
-- TOC entry 3257 (class 2606 OID 21242)
-- Name: Characteristics Characteristics_pkey; Type: CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."Characteristics"
    ADD CONSTRAINT "Characteristics_pkey" PRIMARY KEY ("productId", name, value);


--
-- TOC entry 3262 (class 2606 OID 21175)
-- Name: ImageProducts ImageProducts_pkey; Type: CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."ImageProducts"
    ADD CONSTRAINT "ImageProducts_pkey" PRIMARY KEY ("imageId", "productId");


--
-- TOC entry 3259 (class 2606 OID 21177)
-- Name: Image Image_pkey; Type: CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."Image"
    ADD CONSTRAINT "Image_pkey" PRIMARY KEY (id);


--
-- TOC entry 3266 (class 2606 OID 21179)
-- Name: OrderProducts OrderProducts_pkey; Type: CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."OrderProducts"
    ADD CONSTRAINT "OrderProducts_pkey" PRIMARY KEY ("orderId", "productId");


--
-- TOC entry 3264 (class 2606 OID 21181)
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 21183)
-- Name: ProductGroup ProductGroup_pkey; Type: CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."ProductGroup"
    ADD CONSTRAINT "ProductGroup_pkey" PRIMARY KEY (id);


--
-- TOC entry 3268 (class 2606 OID 21185)
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- TOC entry 3273 (class 2606 OID 21187)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3250 (class 1259 OID 21188)
-- Name: Brand_name_key; Type: INDEX; Schema: median; Owner: root
--

CREATE UNIQUE INDEX "Brand_name_key" ON median."Brand" USING btree (name);


--
-- TOC entry 3253 (class 1259 OID 21189)
-- Name: Category_name_key; Type: INDEX; Schema: median; Owner: root
--

CREATE UNIQUE INDEX "Category_name_key" ON median."Category" USING btree (name);


--
-- TOC entry 3260 (class 1259 OID 21190)
-- Name: Image_url_key; Type: INDEX; Schema: median; Owner: root
--

CREATE UNIQUE INDEX "Image_url_key" ON median."Image" USING btree (url);


--
-- TOC entry 3271 (class 1259 OID 21191)
-- Name: User_email_key; Type: INDEX; Schema: median; Owner: root
--

CREATE UNIQUE INDEX "User_email_key" ON median."User" USING btree (email);


--
-- TOC entry 3274 (class 2606 OID 21192)
-- Name: Characteristics Characteristics_productId_fkey; Type: FK CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."Characteristics"
    ADD CONSTRAINT "Characteristics_productId_fkey" FOREIGN KEY ("productId") REFERENCES median."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3275 (class 2606 OID 21197)
-- Name: ImageProducts ImageProducts_imageId_fkey; Type: FK CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."ImageProducts"
    ADD CONSTRAINT "ImageProducts_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES median."Image"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3276 (class 2606 OID 21202)
-- Name: ImageProducts ImageProducts_productId_fkey; Type: FK CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."ImageProducts"
    ADD CONSTRAINT "ImageProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES median."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3278 (class 2606 OID 21207)
-- Name: OrderProducts OrderProducts_orderId_fkey; Type: FK CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."OrderProducts"
    ADD CONSTRAINT "OrderProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES median."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3279 (class 2606 OID 21212)
-- Name: OrderProducts OrderProducts_productId_fkey; Type: FK CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."OrderProducts"
    ADD CONSTRAINT "OrderProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES median."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3277 (class 2606 OID 21217)
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES median."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3281 (class 2606 OID 21302)
-- Name: ProductGroup ProductGroup_brandId_fkey; Type: FK CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."ProductGroup"
    ADD CONSTRAINT "ProductGroup_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES median."Brand"(name) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3282 (class 2606 OID 21307)
-- Name: ProductGroup ProductGroup_categoryId_fkey; Type: FK CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."ProductGroup"
    ADD CONSTRAINT "ProductGroup_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES median."Category"(name) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3280 (class 2606 OID 21232)
-- Name: Product Product_productGroupId_fkey; Type: FK CONSTRAINT; Schema: median; Owner: root
--

ALTER TABLE ONLY median."Product"
    ADD CONSTRAINT "Product_productGroupId_fkey" FOREIGN KEY ("productGroupId") REFERENCES median."ProductGroup"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2023-04-22 20:43:04 EEST

--
-- PostgreSQL database dump complete
--

