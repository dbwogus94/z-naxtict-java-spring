package com.spring.user.dao;

import com.spring.user.vo.UserVo;

public interface UserDao {
	
	String MAPPERNAME = "user."; 
	
	public int insertUser(UserVo userVo);
	public int idCheck(String userId);
	public UserVo login(UserVo userVo);
}
