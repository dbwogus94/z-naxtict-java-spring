package com.spring.user.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.user.dao.UserDao;
import com.spring.user.service.UserService;
import com.spring.user.vo.UserVo;

@Service
public class UserServiceImpl implements UserService {
	private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private UserDao userDao;
	
	@Override
	public int insertUser(UserVo userVo) {
		return userDao.insertUser(userVo);
	}

	@Override
	public int idCheck(String userId) {
		return userDao.idCheck(userId);
	}

	@Override
	public UserVo login(UserVo userVo) {
		return userDao.login(userVo);
	}

	@Override
	public String searchName(String userId) {
		return userDao.searchName(userId);
	}
}
