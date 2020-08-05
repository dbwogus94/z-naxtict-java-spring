package com.spring.user.service;

import com.spring.user.vo.UserVo;

public interface UserService {
	public int insertUser(UserVo userVo);
	public int idCheck(String userId);
	public UserVo login(UserVo userVo);
}
