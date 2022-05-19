use happyhouse;

CREATE TABLE IF NOT EXISTS `happyhouse`.`board` (
  `articleno` INT NOT NULL AUTO_INCREMENT,
  `userid` VARCHAR(16) NOT NULL,
  `subject` VARCHAR(100) NOT NULL,
  `content` VARCHAR(2000) NOT NULL,
  `hit` INT NULL DEFAULT 0,
  `regtime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`articleno`),
  INDEX `board_to_member_fk` (`userid` ASC) VISIBLE,
  CONSTRAINT `board_to_member_fk`
    FOREIGN KEY (`userid`)
    REFERENCES `happyhouse`.`member` (`userid`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

insert into board(userid, subject, content) 
values('ssafy', '아파트 매매 시기', '아파트 매매 시기 추천해주세요!'), 
      ('ssafy', '살기 좋은 동네', '살기 좋은 동네 추천해주세요!'),
      ('admin', '5월 업데이트 일정', '5월 27일 사이트 업데이트 예정입니다.'),
      ('ssafy', '메일 답변', '관리자님 메일 답변 부탁드립니다.');
      
commit;

CREATE TABLE IF NOT EXISTS `happyhouse`.`answer` (
  `answerno` INT NOT NULL AUTO_INCREMENT,
  `articleno` INT NOT NULL,
  `userid` VARCHAR(16) NOT NULL,
  `content` VARCHAR(200) NOT NULL,
  `regtime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`answerno`),
  INDEX `answer_to_board_fk` (`articleno` ASC) VISIBLE,
  CONSTRAINT `answer_to_board_fk`
    FOREIGN KEY (`articleno`)
    REFERENCES `happyhouse`.`board` (`articleno`)
    ON DELETE CASCADE,
  CONSTRAINT `answer_to_member_fk`
    FOREIGN KEY (`userid`)
    REFERENCES `happyhouse`.`member` (`userid`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

insert into answer(articleno, userid, content) 
values(1, 'admin', '11월 추천드립니다.');

commit;
