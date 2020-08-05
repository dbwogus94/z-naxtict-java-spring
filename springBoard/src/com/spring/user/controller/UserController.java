package com.spring.user.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.board.service.ComCodeService;
import com.spring.board.vo.ComCodeVo;
import com.spring.user.service.UserService;
import com.spring.user.vo.UserVo;

@RequestMapping(value = "/user/")
@Controller
public class UserController {
	private Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ComCodeService comCodeService;
	
	@RequestMapping(value="userJoin.do", method=RequestMethod.GET)
	public String userJoin(Model model) {
		logger.info("[userJoin.do]");
		List<ComCodeVo> comCodeList = comCodeService.getCode_type("phone");
		model.addAttribute("comCodeList", comCodeList);
		return "user/userJoin";
	}
	
	
	@RequestMapping(value = "userIdCheck.do", method = RequestMethod.POST)
	@ResponseBody
	public String idCheck(@RequestBody HashMap<String, String> input) {
		logger.info("[userIdCheck.do] ajax input data" + input);
		int res = userService.idCheck(input.get("userId"));
		if(res > 0) {
			return "false";
		} else {
			return "true";
		}
	}
	
	@RequestMapping(value = "userJoinAction.do", method = RequestMethod.POST)
	@ResponseBody
	public String userJoinAction(@RequestBody UserVo userVo) {  // @RequestBody주의 사항 보내는 json에 dto와 관련없는 key가 있으면x
		logger.info("[userJoinAction.do] ajax input data " + userVo);
		
		int res = userService.insertUser(userVo);
		//int res = 0;
		if(res > 0) {
			return "true";
		} else {
			return "false";
		}
	}
	
	@RequestMapping(value="userLogin.do", method = RequestMethod.GET)
	public String userLogin() {
		logger.info("[userLogin.do]");
		return "user/userLogin";
	}
	
	
	@RequestMapping(value="userLoginAction.do", method = RequestMethod.POST)
	@ResponseBody
	public String userLoginAction(@RequestBody UserVo userVo, HttpSession session) {
		logger.info("[userLoginAction.do] ajax input data : " + userVo);
		
		UserVo login = userService.login(userVo);
		if(login != null) {
			logger.info("[userLoginAction.do] 로그인 성공 : " + login);
			session.setAttribute("login", login);
			return "success";
		} else {
			return "faill";
		}
	}
	
	@RequestMapping(value = "userLogout.do" , method = RequestMethod.GET)
	public String userLogout(HttpSession session) {
		logger.info("[userLogout.do]");
		session.invalidate();
		return "redirect:../board/boardList.do";
	}
	
	
	
}
