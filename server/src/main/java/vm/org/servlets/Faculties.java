package vm.org.servlets;

import org.json.JSONArray;
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
		name="Faculties",
		urlPatterns="/Faculties")

public class Faculties extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Faculties() { super(); }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();

		json.put("faculties", db.executeQuery(prop.getValue("query_getFaculties"))).put("status", 200).put("response", prop.getValue("mssg_success"));
		
		out.print(json.toString());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {
			Integer faculty_code = reqBody.getInt("faculty_code");
			String faculty_name = reqBody.getString("faculty_name");

			if (db.executeQuery(prop.getValue("query_checkFaculty"), faculty_name, faculty_code).length() ==0) {
				Integer faculty_id = db. executeUpdate(prop.getValue("query_addFaculty"), faculty_code, faculty_name) ;
				json.put("status", 200).put("response", prop.getValue("mssg_facultyCreated")).put("faculty_id", faculty_id);
				System.out.println(prop.getValue("mssg_facultyCreated"));
			}else {
				json.put("response", prop.getValue("mssg_facultyExist")).put("status", 400);
 		    	System.out.println(prop.getValue("mssg_facultyExist"));
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
			Integer faculty_id = Integer.parseInt(request.getParameter("id"));

			db.executeUpdate(prop.getValue("query_deleteFaculty"), faculty_id);
			json.put("status", 200).put("response", prop.getValue("mssg_facultyDeleted"));
			System.out.println(prop.getValue("mssg_facultyDeleted"));

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
			Integer faculty_id = reqBody.getInt("faculty_id");
			Integer faculty_code = reqBody.getInt("faculty_code");
			String new_faculty_name = reqBody.getString("faculty_name");
			JSONArray table = db.executeQuery(prop.getValue("query_checkFaculty"), new_faculty_name, faculty_code);
            System.out.println(table.toString());

			if (table.length()==0 || (table.length()==1 && table.getJSONObject(0).getInt("faculty_id") == faculty_id)){
				db.executeUpdate(prop.getValue("query_updateFaculty"), faculty_code, new_faculty_name, faculty_id);
				json.put("status", 200).put("response", prop.getValue("mssg_facultyUpdated"));
				System.out.println(prop.getValue("mssg_facultyUpdated"));
			}else {
				json.put("response", prop.getValue("mssg_facultyExist")).put("status", 400);
				System.out.println(prop.getValue("mssg_facultyExist"));
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
