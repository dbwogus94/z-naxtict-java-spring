package com.spring.user.dao.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.user.dao.UserDao;
import com.spring.user.vo.UserVo;

@Repository
public class UserDaoImpl implements UserDao {
	private Logger logger = LoggerFactory.getLogger(UserDaoImpl.class);
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public int insertUser(UserVo userVo) {
		logger.info("[Dao] insertUser param : " + userVo);
		return sqlSession.insert(MAPPERNAME + "insertUser", userVo);
	}

	@Override
	public int idCheck(String userId) {
		logger.info("[Dao] idCheck param : " + userId);
		return sqlSession.selectOne(MAPPERNAME + "idCheck", userId);
	}

	@Override
	public UserVo login(UserVo userVo) {
		logger.info("[Dao] login param : " + userVo);
		return sqlSession.selectOne(MAPPERNAME + "login", userVo);
	}

	@Override
	public String searchName(String userId) {
		logger.info("[Dao] searchName param : " + userId);
		return sqlSession.selectOne(MAPPERNAME + "searchName", userId);
	}
	
	
	
}
