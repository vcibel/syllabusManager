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
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.stream.Collectors;

@WebServlet(
		name="Pensum",
		urlPatterns="/Pensum")

public class Pensum extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Pensum() { super(); }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();

		json.put("pensum", db.executeQuery(prop.getValue("query_getPensum"))).put("status", 200).put("response", prop.getValue("mssg_success"));
		
		out.print(json.toString());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {
			Integer college_id = reqBody.getInt("college_id");

			if (db.executeQuery(prop.getValue("query_checkPensum"), college_id).length() ==0) {
				Integer pensum_id = db. executeUpdate(prop.getValue("query_addPensum"), college_id);
				json.put("status", 200).put("response", prop.getValue("mssg_pensumCreated")).put("pensum_id", pensum_id);
				System.out.println(prop.getValue("mssg_pensumCreated"));
			}else {
				json.put("response", prop.getValue("mssg_pensumExist")).put("status", 400);
 		    	System.out.println(prop.getValue("mssg_pensumExist"));
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
			Integer pensum_id = Integer.parseInt(request.getParameter("id"));

			db.executeUpdate(prop.getValue("query_deletePensum"), pensum_id);
			json.put("status", 200).put("response", prop.getValue("mssg_pensumDeleted"));
			System.out.println(prop.getValue("mssg_pensumDeleted"));

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
			Integer pensum_id = reqBody.getInt("pensum_id");
			String pensum_date = reqBody.getString("pensum_date");

			db.executeUpdate(prop.getValue("query_updatePensum"), pensum_date, pensum_id);
			json.put("status", 200).put("response", prop.getValue("mssg_pensumUpdated"));
			System.out.println(prop.getValue("mssg_pensumUpdated"));
		
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
