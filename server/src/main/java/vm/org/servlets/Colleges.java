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
		name="Colleges",
		urlPatterns="/Colleges")
public class Colleges extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Colleges() { super(); }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();

		json.put("colleges", db.executeQuery(prop.getValue("query_getColleges"))).put("status", 200).put("response", prop.getValue("mssg_success"));

		out.print(json.toString());
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {
			Integer college_code = reqBody.getInt("college_code");
			String name = reqBody.getString("name");
			Integer faculty_id = reqBody.getInt("faculty_id");
			String college_image = reqBody.getString("college_image");

			if (db.executeQuery(prop.getValue("query_checkCollege"), college_code, name).length()==0) {
				Integer college_id = db.executeUpdate(prop.getValue("query_addCollege"), college_code,  name, faculty_id, college_image);
				json.put("status", 200).put("response", prop.getValue("mssg_collegeCreated")).put("college_id",college_id);
				System.out.println(prop.getValue("mssg_collegeCreated"));
			}else {
				json.put("response", prop.getValue("mssg_collegeExist")).put("status", 400);
 		    	System.out.println(prop.getValue("mssg_collegeExist"));
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
			Integer id = reqBody.getInt("college_id");
			
			if (id!=0) {
				db.executeUpdate(prop.getValue("query_deleteCollege"), id);
				json.put("status", 200).put("response", prop.getValue("mssg_collegeDeleted"));
				System.out.println(prop.getValue("mssg_collegeDeleted"));
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
			Integer college_id = reqBody.getInt("college_id");
			Integer old_college_code = reqBody.getInt("old_college_code");
			String old_name = reqBody.getString("old_name");
			Integer new_college_code = reqBody.getInt("college_code");
			String new_name = reqBody.getString("name");
			Integer new_number_of_terms = reqBody.getInt("number_of_terms");
			Integer new_faculty_id = reqBody.getInt("faculty_id");

			JSONArray table = db.executeQuery(prop.getValue("query_checkCollege"), new_college_code, new_name);
			System.out.println(table.toString());

			if (table.length()==0 || (table.length()==1 && table.getJSONObject(0).getInt("college_id")==college_id)) {
				db.executeUpdate(prop.getValue("query_updateCollege"), new_college_code,  new_name, new_number_of_terms, new_faculty_id, college_id);
				json.put("status", 200).put("response", prop.getValue("mssg_collegeUpdated"));
				System.out.println(prop.getValue("mssg_collegeUpdated"));
			}else {
				json.put("response", prop.getValue("mssg_collegeExist")).put("status", 400);
 		    	System.out.println(prop.getValue("mssg_collegeExist"));
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

