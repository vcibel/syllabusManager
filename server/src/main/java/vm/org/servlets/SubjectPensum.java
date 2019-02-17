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

		json.put("pensumSubjects", db.executeQuery(prop.getValue("query_getSubjectByPensum"), id))
				.put("subjectRestriction", db.executeQuery(prop.getValue("query_getSubjectRestriction"), id))
				.put("status", 200).put("response", prop.getValue("mssg_success"));
		
		out.print(json.toString());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));

		try {
			json = createPensum(reqBody);
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
			Integer pensum_id = reqBody.getInt("pensum_id");

			db.executeUpdate(prop.getValue("query_deleteSubjectPensum"), pensum_id);
			db.executeUpdate(prop.getValue("query_deleteSubjectRestriction"), pensum_id);
			System.out.println(prop.getValue("mssg_subjectPensumDeleted"));

			json = createPensum(reqBody);
/*
			if (db.executeQuery(prop.getValue("query_checkSubjectPensum"), pensum_id, subject_id).length() ==0) {
				db.executeUpdate(prop.getValue("query_updateSubjectPensum"),pensum_id, subject_id,type_subject_pensum_id,term);
				json.put("status", 200).put("response", prop.getValue("mssg_subjectPensumUpdated"));
				System.out.println(prop.getValue("mssg_subjectPensumUpdated"));
			}else {
				json.put("response", prop.getValue("mssg_subjectPensumExist")).put("status", 400);
				System.out.println(prop.getValue("mssg_subjectPensumExist"));
			}*/

		}catch (Exception e) {
			System.out.println("error");
			System.out.println(e. getMessage());
			e.printStackTrace();
			json.put("response", prop.getValue("mssg_updateFail")).put("status", 400);
		    System.out.println(prop.getValue("mssg_updateFail"));
		}
		
		out.print(json.toString());
		
		}

		JSONObject createPensum(JSONObject reqBody) {
			JSONObject json = new JSONObject();
			DB db = new DB();
			PropertiesReader prop = PropertiesReader.getInstance();
			JSONArray array = reqBody.getJSONArray("data");
			System.out.println(array);
			JSONArray restrictionsArray = array.getJSONArray(0);
			array.remove(0);
			JSONArray subjectsArray = array;
			System.out.println(subjectsArray);
			System.out.println(restrictionsArray);
			Integer pensum_id = reqBody.getInt("pensum_id");
			Integer subject_id;
			Integer type_subject_pensum_id;
			Integer term;
			Integer hour_restriction;
			JSONObject subject;
			JSONArray myTerm;
			for (int i=0; i<subjectsArray.length() ; i++) {
				myTerm = subjectsArray.getJSONArray(i);
				for (int j=0; j<myTerm.length(); j++) {
					subject = myTerm.getJSONObject(j);
					subject_id = subject.getInt("subject_id");
					type_subject_pensum_id = subject.getInt("type_subject_pensum_id");
					term = subject.getInt("term");
					hour_restriction = subject.getInt("hour_restriction");

					if (db.executeQuery(prop.getValue("query_checkSubjectPensum"), pensum_id, subject_id).length() == 0) {
						db.executeUpdate(prop.getValue("query_addSubjectPensum"), subject_id, pensum_id, type_subject_pensum_id, term, hour_restriction);
						System.out.println(prop.getValue("mssg_SubjectPensumCreated"));
					} else {
						System.out.println(prop.getValue("mssg_SubjectPensumExist"));
						return json.put("response", prop.getValue("mssg_SubjectPensumExist")).put("status", 400);
					}
				}
			}
			Integer subject_id_source_restriction;
			Integer subject_id_target_restriction;
			JSONObject restriction;
			for (int i=0; i<restrictionsArray.length() ; i++) {
				restriction = restrictionsArray.getJSONObject(i);
				subject_id_source_restriction = restriction.getInt("subject_id_source_restriction");
				subject_id_target_restriction = restriction.getInt("subject_id_target_restriction");
				db.executeUpdate(prop.getValue("query_addSubjectRestriction"), subject_id_source_restriction, pensum_id, subject_id_target_restriction, pensum_id);
				System.out.println(prop.getValue("mssg_SubjectPensumCreated"));
			}
			return json.put("response", prop.getValue("mssg_SubjectPensumCreated")).put("status", 200);
		}
}
