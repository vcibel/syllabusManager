package vm.org.servlets;

import org.json.JSONObject;
import vm.org.DB;
import vm.org.utilities.PropertiesReader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.stream.Collectors;

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
			String description = reqBody.getString("description");

			if (db.executeQuery(prop.getValue("query_checkCollege"), description, college_code).length() ==0) {
				Integer college_id = db. executeUpdate(prop.getValue("query_addCollege"), college_code, description) ;
				json.put("status", 200).put("response", prop.getValue("mssg_collegeCreated")).put("college_id", college_id);
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
			Integer college_id = reqBody.getInt("college_id");

			db.executeUpdate(prop.getValue("query_deleteCollege"), college_id);
			json.put("status", 200).put("response", prop.getValue("mssg_collegeDeleted"));
			System.out.println(prop.getValue("mssg_collegeDeleted"));

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
			Integer college_id = reqBody.getInt("college_id");
			String new_description = reqBody.getString("description");

			db.executeUpdate(prop.getValue("query_updateCollege"), new_description, college_id);
			json.put("status", 200).put("response", prop.getValue("mssg_collegeUpdated"));
			System.out.println(prop.getValue("mssg_collegeUpdated"));
		
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
