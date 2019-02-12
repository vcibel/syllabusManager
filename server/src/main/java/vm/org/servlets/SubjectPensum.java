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
		name="SubjectPensum",
		urlPatterns="/SubjectPensum")

public class SubjectPensum extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public SubjectPensum() { super(); }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		Integer id = Integer.parseInt(request.getParameter("id"));

		json.put("pensumSubjects", db.executeQuery(prop.getValue("query_getSubjectByPensum"), id)).put("status", 200).put("response", prop.getValue("mssg_success"));
		
		out.print(json.toString());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {
			Integer pensum_id = reqBody.getInt("pensum_id");
			Integer subject_id = reqBody.getInt("subject_id");
			Integer type_subject_pensum_id = reqBody.getInt("type_subject_pensum_id");
			Integer term = reqBody.getInt("term");

			if (db.executeQuery(prop.getValue("query_checkSubjectPensum"), pensum_id, subject_id).length() ==0) {
				Integer subject_pensum_id = db. executeUpdate(prop.getValue("query_addSubjectPensum"), pensum_id, subject_id,type_subject_pensum_id,term) ;
				json.put("status", 200).put("response", prop.getValue("mssg_SubjectPensumCreated")).put("subject_ pensum_id", subject_pensum_id);
				System.out.println(prop.getValue("mssg_SubjectPensumCreated"));
			}else {
				json.put("response", prop.getValue("mssg_SubjectPensumExist")).put("status", 400);
 		    	System.out.println(prop.getValue("mssg_SubjectPensumExist"));
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
			Integer subject_pensum_id = reqBody.getInt("subject_pensum_id");

			db.executeUpdate(prop.getValue("query_deleteSubjectPensum"), subject_pensum_id);
			json.put("status", 200).put("response", prop.getValue("mssg_subjectPensumDeleted"));
			System.out.println(prop.getValue("mssg_subjectPensumDeleted"));

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
			Integer subject_pensum_id = reqBody.getInt("subject_pensum_id");
			Integer pensum_id = reqBody.getInt("pensum_id");
			Integer subject_id = reqBody.getInt("subject_id");
			Integer type_subject_pensum_id = reqBody.getInt("type_subject_pensum_id");
			Integer term = reqBody.getInt("term");

			if (db.executeQuery(prop.getValue("query_checkSubjectPensum"), pensum_id, subject_id).length() ==0) {
				db.executeUpdate(prop.getValue("query_updateSubjectPensum"),pensum_id, subject_id,type_subject_pensum_id,term);
				json.put("status", 200).put("response", prop.getValue("mssg_subjectPensumUpdated"));
				System.out.println(prop.getValue("mssg_subjectPensumUpdated"));
			}else {
				json.put("response", prop.getValue("mssg_subjectPensumExist")).put("status", 400);
				System.out.println(prop.getValue("mssg_subjectPensumExist"));
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
