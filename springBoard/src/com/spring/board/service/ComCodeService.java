package com.spring.board.service;

import java.util.List;

import com.spring.board.vo.ComCodeVo;

public interface ComCodeService {
	public List<ComCodeVo> getCode_type(String codeType);
}
