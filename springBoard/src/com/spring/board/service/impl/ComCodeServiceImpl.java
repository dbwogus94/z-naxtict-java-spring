package com.spring.board.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.board.dao.ComCodeDao;
import com.spring.board.service.ComCodeService;
import com.spring.board.vo.ComCodeVo;

@Service
public class ComCodeServiceImpl implements ComCodeService {
	
	@Autowired
	private ComCodeDao comCodeDao;

	@Override
	public List<ComCodeVo> getCode_type(String codeType) {
		return comCodeDao.getCode_type(codeType);
	}
}
