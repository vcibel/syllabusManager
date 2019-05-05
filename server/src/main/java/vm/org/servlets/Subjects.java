package vm.org.servlets;

import java.io.*;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import org.json.JSONArray;
import org.json.JSONObject;

import vm.org.DB;
import vm.org.User;
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
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		DB db = user.getDB();
		PropertiesReader prop = PropertiesReader.getInstance();

		JSONArray result;
		JSONArray types;

		if(request.getParameterMap().containsKey("id")){
			Integer id = Integer.parseInt(request.getParameter("id"));
			result = db.executeQuery(prop.getValue("query_getSubjectByFaculty"),id);
			types = db.executeQuery(prop.getValue("query_getTypeSubjectPensum"));
        } else if(request.getParameterMap().containsKey("department_id")){
			Integer id = Integer.parseInt(request.getParameter("department_id"));
			result = db.executeQuery(prop.getValue("query_getSubjectByDepartment"),id);
			types = db.executeQuery(prop.getValue("query_getTypeSubject"));
		} else {
		    result = db.executeQuery(prop.getValue("query_getSubjects"));
		    types = db.executeQuery(prop.getValue("query_getTypeSubject"));
        }

		json.put("subjects", result).put("types", types)
                .put("status", 200).put("response", prop.getValue("mssg_success"));

		out.print(json.toString());

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		DB db = user.getDB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {
			String subject_code = reqBody.getString("subject_code");
			String subject_name = reqBody.getString("subject_name");
			Integer subject_hc = reqBody.getInt("subject_hc");
			Integer type_subject_id = reqBody.getInt("type_subject_id");
            Integer department_id = reqBody.getInt("department_id");
            Integer code_consecutive = reqBody.getInt("code_consecutive");
            System.out.println(subject_name);

			if (subject_code.length() < 6) {
				// arreglar para cuando no hay ninguno
				JSONArray departmentSubjects = db.executeQuery(prop.getValue("query_getSubjectByDepartment"), department_id);
				if (departmentSubjects.length() != 0) {
				JSONObject last = departmentSubjects.getJSONObject(departmentSubjects.length()-1);
				code_consecutive = last.getInt("code_consecutive")+1;
					System.out.println(String.format("%02d", last.getInt("code_consecutive")) + "consecutivo" + last.getInt("code_consecutive")+1);
				} else {
					code_consecutive = 1;
				}
			    subject_code = subject_code + String.format("%02d", code_consecutive);
			}
			System.out.println(subject_code + "consecutivo" + code_consecutive);

			if (db.executeQuery(prop.getValue("query_checkSubject"), subject_code, subject_name).length()==0) {
				Integer subject_id = db.executeUpdate(prop.getValue("query_addSubject"), subject_code, subject_name, subject_hc, type_subject_id);
                db.executeUpdate(prop.getValue("query_addSubjectDepartment"), subject_id, department_id, code_consecutive);
				json.put("status", 200).put("response", prop.getValue("mssg_subjectCreated")).put("subject_id", subject_id).put("subject_code", subject_code);
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
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		DB db = user.getDB();
		PropertiesReader prop = PropertiesReader.getInstance();

		try {

			Integer subject_id = Integer.parseInt(request.getParameter("id"));

			db.executeUpdate(prop.getValue("query_deleteSubject"), subject_id);
			json.put("status", 200).put("response", prop.getValue("mssg_subjectDeleted"));
			System.out.println(prop.getValue("mssg_subjectDeleted"));

		} catch (Exception e) {
			System.out.println("error");
			System.out.println(e.getMessage());
			e.printStackTrace();
		}

		out.print(json.toString());

	}

}
