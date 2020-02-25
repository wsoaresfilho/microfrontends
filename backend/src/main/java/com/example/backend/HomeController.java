package com.example.backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;

import java.util.ArrayList;

@Controller
public class HomeController {

	private final EmployeeRepository employeeRepository;
	ArrayList<String> bundleNamesArray = new ArrayList<String>();

	@Autowired
    public HomeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

	@RequestMapping(value = "/")
	public String index(Model model) {
		bundleNamesArray.clear();
		bundleNamesArray.add("react-app-1");
		bundleNamesArray.add("react-app-2");
		model.addAttribute("bundleNames", bundleNamesArray);
		model.addAttribute("employees", employeeRepository.findAll());
		return "index";
	}

	@RequestMapping(value = "/app1")
	public String index1(Model model) {
		bundleNamesArray.clear();
		bundleNamesArray.add("react-app-1");
		model.addAttribute("bundleNames", bundleNamesArray);
		model.addAttribute("employees", employeeRepository.findAll());
		return "index";
	}

	@RequestMapping(value = "/app2")
	public String index2(Model model) {
		bundleNamesArray.clear();
		bundleNamesArray.add("react-app-2");
		model.addAttribute("bundleNames", bundleNamesArray);
		model.addAttribute("employees", employeeRepository.findAll());
		return "index";
	}

	@RequestMapping(value = "/app3")
	public String index3(Model model) {
		bundleNamesArray.clear();
		bundleNamesArray.add("react-app-3");
		model.addAttribute("bundleNames", bundleNamesArray);
		model.addAttribute("employees", employeeRepository.findAll());
		return "index";
	}

}