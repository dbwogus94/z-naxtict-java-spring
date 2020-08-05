package com.spring.board.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.board.dao.ComCodeDao;
import com.spring.board.vo.ComCodeVo;

@Repository
public class ComCodeDaoImpl implements ComCodeDao {
	
	private Logger logger = LoggerFactory.getLogger(ComCodeDaoImpl.class);
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<ComCodeVo> getCode_type(String codeType) {
		logger.info("[DAO] getCode_type Param : " + codeType);
		return sqlSession.selectList("ComCode.getCode_type", codeType);
	}

}
