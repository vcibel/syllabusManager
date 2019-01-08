package vm.org.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import vm.org.DB;
import vm.org.utilities.PropertiesReader;

@WebServlet(
		name="Careers",
		urlPatterns="/Careers")
public class Careers extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Careers() { super(); }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();

		json.put("careers", db.executeQuery(prop.getValue("query_getCareers"))).put("status", 200).put("response", prop.getValue("mssg_success"));

		out.print(json.toString());
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {
			Integer career_code = reqBody.getInt("career_code");
			String name = reqBody.getString("name");
			Integer number_of_terms = reqBody.getInt("number_of_terms");
			Integer college_id = reqBody.getInt("college_id");
			String career_image = reqBody.getString("career_image");

			if (db.executeQuery(prop.getValue("query_checkCareer"), career_code, name).length()==0) {
				Integer career_id = db.executeUpdate(prop.getValue("query_addCareer"), career_code,  name, number_of_terms, college_id, career_image);
				json.put("status", 200).put("response", prop.getValue("mssg_careerCreated")).put("career_id",career_id);
				System.out.println(prop.getValue("mssg_careerCreated"));
			}else {
				json.put("response", prop.getValue("mssg_careerExist")).put("status", 400);
 		    	System.out.println(prop.getValue("mssg_careerExist"));
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
			Integer id = reqBody.getInt("career_id");
			
			if (id!=0) {
				db.executeUpdate(prop.getValue("query_deleteCareer"), id);
				json.put("status", 200).put("response", prop.getValue("mssg_careerDeleted"));
				System.out.println(prop.getValue("mssg_careerDeleted"));
			}else {
				json.put("response", prop.getValue("mssg_deleteFail")).put("status", 400);
 		    	System.out.println(prop.getValue("mssg_deleteFail"));
			}		
		
		}catch (Exception e) {
			System.out.println("error");
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
			Integer career_id = reqBody.getInt("career_id");
			Integer old_career_code = reqBody.getInt("old_career_code");
			String old_name = reqBody.getString("old_name");
			Integer new_career_code = reqBody.getInt("career_code");
			String new_name = reqBody.getString("name");
			Integer new_number_of_terms = reqBody.getInt("number_of_terms");
			Integer new_college_id = reqBody.getInt("college_id");

			JSONArray table = db.executeQuery(prop.getValue("query_checkCareer"), new_career_code, new_name);
			System.out.println(table.toString());

			if (table.length()==0 || (table.length()==1 && table.getJSONObject(0).getInt("career_id")==career_id)) {
				db.executeUpdate(prop.getValue("query_updateCareer"), new_career_code,  new_name, new_number_of_terms, new_college_id, career_id);
				json.put("status", 200).put("response", prop.getValue("mssg_careerUpdated"));
				System.out.println(prop.getValue("mssg_careerUpdated"));
			}else {
				json.put("response", prop.getValue("mssg_careerExist")).put("status", 400);
 		    	System.out.println(prop.getValue("mssg_careerExist"));
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

