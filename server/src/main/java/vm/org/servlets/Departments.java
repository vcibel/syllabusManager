package vm.org.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import vm.org.DB;
import vm.org.utilities.PropertiesReader;

@WebServlet(
		name="Departments",
		urlPatterns="/Departments")

public class Departments extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Departments() { super(); }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		Integer id = Integer.parseInt(request.getParameter("id"));

		json.put("departments", db.executeQuery(prop.getValue("query_getDepartments"), id)).put("status", 200).put("response", prop.getValue("mssg_success"));
		
		out.print(json.toString());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {
            String department_code = reqBody.getString("department_code");
			Integer career_id = reqBody.getInt("career_id");
			String description = reqBody.getString("description");

			if (db.executeQuery(prop.getValue("query_checkDepartment"), department_code, description, career_id).length() ==0) {
				Integer department_id = db. executeUpdate(prop.getValue("query_addDepartment"), career_id, description) ;
				json.put("status", 200).put("response", prop.getValue("mssg_departmentCreated")).put("department_id", department_id);
				System.out.println(prop.getValue("mssg_departmentCreated"));
			}else {
				json.put("response", prop.getValue("mssg_departmentExist")).put("status", 400);
 		    	System.out.println(prop.getValue("mssg_departmentExist"));
			}

		}catch (Exception e) {
			System.out.println("error");
			System.out.println(e. getMessage());
			e.printStackTrace();
		}
		
		out.print(json.toString());
		
		}	
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {
			Integer department_id = reqBody.getInt("department_id");

			db.executeUpdate(prop.getValue("query_deleteDepartment"), department_id);
			json.put("status", 200).put("response", prop.getValue("mssg_departmentDeleted"));
			System.out.println(prop.getValue("mssg_departmentDeleted"));

		}catch (Exception e) {
			System.out.println("error");
			json.put("response", prop.getValue("mssg_deleteFail")).put("status", 400);
			System.out.println(e. getMessage());
			e.printStackTrace();
		}
		
		out.print(json.toString());
		
		}

	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {
            String department_code = reqBody.getString("department_code");
            Integer department_id = reqBody.getInt("department_id");
			Integer career_id = reqBody.getInt("career_id");
			String description = reqBody.getString("description");

			if (db.executeQuery(prop.getValue("query_checkDepartment"), department_code, description, career_id).length() ==0) {
				db.executeUpdate(prop.getValue("query_updateDepartment"), description, career_id, department_id);
				json.put("status", 200).put("response", prop.getValue("mssg_departmentUpdated"));
				System.out.println(prop.getValue("mssg_departmentUpdated"));
			}else {
				json.put("response", prop.getValue("mssg_departmentExist")).put("status", 400);
				System.out.println(prop.getValue("mssg_departmentExist"));
			}
		
		}catch (Exception e) {
			System.out.println("error");
			System.out.println(e. getMessage());
			e.printStackTrace();
			json.put("response", prop.getValue("mssg_updateFail")).put("status", 400);
		    System.out.println(prop.getValue("mssg_updateFail"));
		}
		
		out.print(json.toString());
		
		}
}