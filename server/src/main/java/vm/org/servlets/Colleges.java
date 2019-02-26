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

		JSONArray query;

		if (request.getParameterMap().containsKey("id")) {
			query = db.executeQuery(prop.getValue("query_getCollegesByFacultyId"), Integer.parseInt(request.getParameter("id")));
		} else {
			query = db.executeQuery(prop.getValue("query_getColleges"));
		}

		json.put("colleges", query).put("status", 200).put("response", prop.getValue("mssg_success"));

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
			String college_name = reqBody.getString("college_name");
			Integer faculty_id = reqBody.getInt("faculty_id");

			if (db.executeQuery(prop.getValue("query_checkCollege"), college_code, college_name).length()==0) {
				Integer college_id = db.executeUpdate(prop.getValue("query_addCollege"), college_code,  college_name, faculty_id);
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
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {
			Integer id = Integer.parseInt(request.getParameter("id"));

			db.executeUpdate(prop.getValue("query_deleteCollege"), id);
			json.put("status", 200).put("response", prop.getValue("mssg_collegeDeleted"));
			System.out.println(prop.getValue("mssg_collegeDeleted"));
		
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
			Integer new_college_code = reqBody.getInt("college_code");
			String new_college_name = reqBody.getString("college_name");
			Integer new_faculty_id = reqBody.getInt("faculty_id");

			JSONArray table = db.executeQuery(prop.getValue("query_checkCollege"), new_college_code, new_college_name);
			System.out.println(table.toString());

			if (table.length()==0 || (table.length()==1 && table.getJSONObject(0).getInt("college_id")==college_id)) {
				db.executeUpdate(prop.getValue("query_updateCollege"), new_college_code,  new_college_name, new_faculty_id, college_id);
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

