package vm.org.servlets;

import java.io.*;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import org.json.JSONArray;
import org.json.JSONObject;

import vm.org.DB;
import vm.org.utilities.PropertiesReader;

@WebServlet(
		name="Subjects",
		urlPatterns="/Subjects")

public class Subjects extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Subjects() { super(); }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();

		JSONArray result;

		if(request.getParameterMap().containsKey("id")){
			Integer id = Integer.parseInt(request.getParameter("id"));
			result = db.executeQuery(prop.getValue("query_getSubjectByDepartment"),id);
        } else {
		    result = db.executeQuery(prop.getValue("query_getSubjects"));
        }

		json.put("subjects", result).put("typesSubject", db.executeQuery(prop.getValue("query_getTypeSubject")))
                .put("status", 200).put("response", prop.getValue("mssg_success"));

		out.print(json.toString());

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {
			String subject_code = reqBody.getString("subject_code");
			String name = reqBody.getString("name");
			Integer hc = reqBody.getInt("hc");
			Integer type_subject_id = reqBody.getInt("type_subject_id");
            Integer department_id = reqBody.getInt("department_id");
            Integer code_consecutive = reqBody.getInt("code_consecutive");

			if (subject_code.length() < 6) {
				// arreglar para cuando no hay ninguno
			    subject_code = subject_code + String.format("%02d", db.executeQuery(prop.getValue("query_getSubjectByDepartment"), department_id).getJSONObject(0).getInt("code_consecutive")+1);
            }

			if (db.executeQuery(prop.getValue("query_checkSubject"), subject_code, name).length()==0) {
				Integer subject_id = db.executeUpdate(prop.getValue("query_addSubject"), subject_code, name, hc, type_subject_id);
                db.executeUpdate(prop.getValue("query_addSubjectDepartment"), subject_id, department_id, code_consecutive);
				json.put("status", 200).put("response", prop.getValue("mssg_subjectCreated")).put("subject_id", subject_id);
				System.out.println(prop.getValue("mssg_subjectCreated"));
			}else {
				json.put("response", prop.getValue("mssg_subjectExist")).put("status", 400);
 		    	System.out.println(prop.getValue("mssg_subjectExist"));
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

			Integer subject_id = reqBody.getInt("subject_id");

			if (subject_id != 0) {
				db.executeUpdate(prop.getValue("query_deleteSubject"), subject_id);
				json.put("status", 200).put("response", prop.getValue("mssg_subjectDeleted"));
				System.out.println(prop.getValue("mssg_subjectDeleted"));
			} else {
				json.put("response", prop.getValue("mssg_deleteFail")).put("status", 400);
				System.out.println(prop.getValue("mssg_deleteFail"));
			}

		} catch (Exception e) {
			System.out.println("error");
			System.out.println(e.getMessage());
			e.printStackTrace();
		}

		out.print(json.toString());

	}

	private String getFileName(Part part) {
		for (String content : part.getHeader("content-disposition").split(";")) {
			if (content.trim().startsWith("filename")) {
				return content.substring(content.indexOf('=') + 1).trim().replace("\"", "");
			}
			System.out.println("AQUI"+part.getHeader("content-disposition"));
		}
		return null;
	}

}
