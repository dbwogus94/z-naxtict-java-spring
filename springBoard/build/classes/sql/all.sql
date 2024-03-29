DROP TABLE BOARD;
DROP TABLE COM_CODE;
DROP TABLE USER_INFO;

CREATE TABLE BOARD 
(
  BOARD_TYPE VARCHAR2(5 BYTE) NOT NULL 
, BOARD_NUM NUMBER(4, 0) NOT NULL 
, BOARD_TITLE VARCHAR2(50 BYTE) 
, BOARD_COMMENT VARCHAR2(1000 BYTE) 
, CREATOR VARCHAR2(15 BYTE) 
, CREATE_TIME VARCHAR2(14 BYTE) 
, MODIFIER VARCHAR2(15 BYTE) 
, MODIFIED_TIME VARCHAR2(14 BYTE) 
, FILE_ROOT VARCHAR2(200 BYTE) 
, CONSTRAINT TABLE1_PK PRIMARY KEY 
  (
    BOARD_NUM 
  , BOARD_TYPE 
  )
  USING INDEX 
  (
      CREATE UNIQUE INDEX BOARD_PK ON BOARD (BOARD_TYPE ASC, BOARD_NUM ASC) 
      LOGGING 
      TABLESPACE USERS 
      PCTFREE 10 
      INITRANS 2 
      STORAGE 
      ( 
        INITIAL 65536 
        NEXT 1048576 
        MINEXTENTS 1 
        MAXEXTENTS UNLIMITED 
        BUFFER_POOL DEFAULT 
      ) 
      NOPARALLEL 
  )
  ENABLE 
) 
LOGGING 
TABLESPACE USERS 
PCTFREE 10 
INITRANS 1 
STORAGE 
( 
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1 
  MAXEXTENTS UNLIMITED 
  BUFFER_POOL DEFAULT 
) 
NOCOMPRESS 
NOPARALLEL;

COMMENT ON COLUMN BOARD.BOARD_TYPE IS '게시글타입';

COMMENT ON COLUMN BOARD.BOARD_NUM IS '게시글 번호';

COMMENT ON COLUMN BOARD.BOARD_TITLE IS '게시글 제목';

COMMENT ON COLUMN BOARD.BOARD_COMMENT IS '게시글 내용';

COMMENT ON COLUMN BOARD.CREATOR IS '생성자';

COMMENT ON COLUMN BOARD.CREATE_TIME IS '생성시간';

COMMENT ON COLUMN BOARD.MODIFIER IS '수정자';

COMMENT ON COLUMN BOARD.MODIFIED_TIME IS '수정시간';

COMMENT ON COLUMN BOARD.FILE_ROOT IS '파일';
--============

CREATE TABLE COM_CODE 
(
  CODE_TYPE VARCHAR2(10 BYTE) NOT NULL 
, CODE_ID VARCHAR2(10 BYTE) NOT NULL 
, CODE_NAME VARCHAR2(20 BYTE) 
, CREATOR VARCHAR2(8 BYTE) 
, CREATE_TIME VARCHAR2(14 BYTE) 
, MODIFIER VARCHAR2(8 BYTE) 
, MODIFIED_TIME VARCHAR2(14 BYTE) 
, CONSTRAINT COM_CODE_PK PRIMARY KEY 
  (
    CODE_TYPE 
  , CODE_ID 
  )
  USING INDEX 
  (
      CREATE UNIQUE INDEX COM_CODE_PK ON COM_CODE (CODE_TYPE ASC, CODE_ID ASC) 
      LOGGING 
      TABLESPACE USERS 
      PCTFREE 10 
      INITRANS 2 
      STORAGE 
      ( 
        INITIAL 65536 
        NEXT 1048576 
        MINEXTENTS 1 
        MAXEXTENTS UNLIMITED 
        BUFFER_POOL DEFAULT 
      ) 
      NOPARALLEL 
  )
  ENABLE 
) 
LOGGING 
TABLESPACE USERS 
PCTFREE 10 
INITRANS 1 
STORAGE 
( 
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1 
  MAXEXTENTS UNLIMITED 
  BUFFER_POOL DEFAULT 
) 
NOCOMPRESS 
NOPARALLEL;

CREATE TABLE USER_INFO 
(
  USER_ID VARCHAR2(15 BYTE) NOT NULL 
, USER_PW VARCHAR2(16 BYTE) 
, USER_NAME VARCHAR2(15 BYTE) 
, USER_PHONE1 VARCHAR2(3 BYTE) 
, USER_PHONE2 VARCHAR2(4 BYTE) 
, USER_PHONE3 VARCHAR2(4 BYTE) 
, USER_ADDR1 VARCHAR2(8 BYTE) 
, USER_ADDR2 VARCHAR2(150 BYTE) 
, USER_COMPANY VARCHAR2(60 BYTE) 
, CREATOR VARCHAR2(15 BYTE) 
, CREATE_TIME VARCHAR2(14 BYTE) 
, MODIFIER VARCHAR2(15 BYTE) 
, MODIFIED_TIME VARCHAR2(14 BYTE) 
, CONSTRAINT USER_PK PRIMARY KEY 
  (
    USER_ID 
  )
  USING INDEX 
  (
      CREATE UNIQUE INDEX USER_PK ON USER_INFO (USER_ID ASC) 
      LOGGING 
      TABLESPACE USERS 
      PCTFREE 10 
      INITRANS 2 
      STORAGE 
      ( 
        INITIAL 65536 
        NEXT 1048576 
        MINEXTENTS 1 
        MAXEXTENTS UNLIMITED 
        BUFFER_POOL DEFAULT 
      ) 
      NOPARALLEL 
  )
  ENABLE 
) 
LOGGING 
TABLESPACE USERS 
PCTFREE 10 
INITRANS 1 
STORAGE 
( 
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1 
  MAXEXTENTS UNLIMITED 
  BUFFER_POOL DEFAULT 
) 
NOCOMPRESS 
NOPARALLEL;
