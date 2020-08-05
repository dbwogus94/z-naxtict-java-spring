package com.spring.board.dao;

import java.util.List;

import com.spring.board.vo.ComCodeVo;

public interface ComCodeDao {
	public List<ComCodeVo> getCode_type(String codeType);

}
