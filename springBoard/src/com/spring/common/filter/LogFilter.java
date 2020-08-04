package com.spring.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//#15
//javax.servlet.Filter를 구현한 클래스 LogFilters
public class LogFilter implements Filter {
	
	// log4j
	private Logger logger = LoggerFactory.getLogger(LogFilter.class);

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest req = (HttpServletRequest) request; 
		
		// url 정보
		String url = req.getRequestURL().toString();
		if(!(url.substring(url.length()-3, url.length()).equals(".do"))) {
			chain.doFilter(req, response);
			return;
		}
		// url에서 사용된 queryString 
		String queryString = req.getQueryString();
		String contentType = req.getContentType();
		
		String classFullName = "INFO : " + this.getClass().getName() + " - "; 
		
		StringBuffer logData = new StringBuffer();
		logData.append(classFullName + "url : " + url + "\n")
			   .append(classFullName + "queryString : " + queryString + "\n")
			   .append(classFullName + "content=type : " + contentType + "\n")
			   .append(classFullName + "========================= [HTTP Log Filter] END ================================================================================================" + "\n");
		 
		logger.info("========================= [HTTP Log Filter] START ==============================================================================================\n" + logData);				   
		chain.doFilter(req, response);
	}
	
/*
	# RemoteAddr >> ip주소를 리턴한다.
	
	# URL = 주소값
	# URN = 식별할 수 있는 번호
	# URI = URL + URN 
		URI는 주소 + URN는 식별할 수 있는 번호(해당 주소에서 유일값)
		docid=111이라는 쿼리스트링의 값에 따라 결과가 달라지게됨, 따라서 식별자 역할을 하고 있음
		
		예시) http://test.com/test.pdf?docid=111 ,http://test.com/test.pdf?docid=112는 같은 URL을 가지고 다른 URI를 가짐
		예시 ) http://test.com/test.pdf?docid=111은 주소는 URI이지만 URL은 아니다
	
	# queryString 식별번호(URN)
	# referer 호출한 이전페이지(주소)
	# agent 브라우저 및 사용자정보

*/
	
	@Override // 해당 필터가 메모리에서 삭제될때
	public void destroy() {

	}
	
}