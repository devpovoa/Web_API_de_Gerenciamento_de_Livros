# Back-end com Express

**O Express é um framework para Node.js que fornece um conjunto de recursos para o desenvolvimento de aplicações web ou móveis.**

### Comando necessário para iniciar o Projeto

```js
npm init -y
npm install express
```



### Nodemon

```js
npm install -g nodemon
npm install --save-dev nodemon
```



### Rotas POST e Formato JSON

**JSON :arrow_right: (JavaScript Object Notation)**



#### Tipos de métodos usado

```js
fetch();
```

#### Pacote <code>axios</code>



### Verbos HTTP na metodologia RESTful

```http
GET
POST
PUT
DELETE
```



### Middlewares

**Um middlewares é uma espécie de mediador entre duas partes, algo que fica no meio (middle).**



### Knex e OracleBD

```js
npm install knex --save
npm install oracledb
npx knex init
```



### Criação da tabela Livros com o Knex

```js
npx knex migrate:make create_livros
npx knex migrate:latest
```



### Comando SQL para criação manual

```sql
CREATE TABLE "SYSTEM"."livros" 
   (	"id" NUMBER(*,0) NOT NULL ENABLE, 
	"titulo" VARCHAR2(80 BYTE) NOT NULL ENABLE, 
	"autor" VARCHAR2(60 BYTE) NOT NULL ENABLE, 
	"ano" NUMBER(4,0) NOT NULL ENABLE, 
	"preco" NUMBER(9,2) NOT NULL ENABLE, 
	"foto" VARCHAR2(100 BYTE) NOT NULL ENABLE, 
	 PRIMARY KEY ("id")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE
   ) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;

  CREATE OR REPLACE NONEDITIONABLE TRIGGER "SYSTEM"."livros_autoinc_trg" BEFORE INSERT on "livros"  for each row  declare  checking number := 1;  begin    if (:new."id" is null) then      while checking >= 1 loop        select "livros_seq".nextval into :new."id" from dual;        select count("id") into checking from "livros"        where "id" = :new."id";      end loop;    end if;  end;
/
ALTER TRIGGER "SYSTEM"."livros_autoinc_trg" ENABLE;

```



### Seeds: Semeando dados iniciais

```js
npx knex seed:make 001_add_livros
npx knex seed:run
```

