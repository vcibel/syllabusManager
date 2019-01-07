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

		Integer id = Integer.parseInt(request.getParameter("id"));

		json.put("cards", db.executeQuery(prop.getValue("query_getSubjectByCareer"),id)).put("status", 200).put("response", prop.getValue("mssg_success"));

		out.print(json.toString());

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		Part file = request.getPart("file");
		InputStream filecontent = file.getInputStream();
		OutputStream os = null;
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {
			String subject_code = reqBody.getString("subject_code");
			String name = reqBody.getString("name");
			Integer hour_restriction = reqBody.getInt("hour_restriction");
			String subject_restriction = reqBody.getString("subject_restriction");
			Integer hc = reqBody.getInt("hc");
			Integer type_subject_id = reqBody.getInt("type_subject_id");
			Integer college_code = reqBody.getInt("college_code");
			Integer department_code = reqBody.getInt("department_code");
			Integer career_code = reqBody.getInt("career_code");

			String file_name = getFileName(file);
			String file_url = prop.getValue("baseDir") + "/" + file_name;
			System.out.println("Archivo-> " + file_name + "" + file_url);

			os = new FileOutputStream(file_url);
			int read = 0;
			byte[] bytes = new byte[1024];
			while ((read = filecontent.read(bytes)) != -1) {
				os.write(bytes, 0, read);
			}


			//Integer consecutive = db.executeQuery(prop.getValue("query_query_getCountSubjectByDepartment"), department_code).length()+1;

			//String subject_code = college_code+career_code+department_code+type_subject+consecutive;

			//if (column_id==0) { ---------- Falta chekear type_subject ------ ////
				Integer subject_id = db.executeUpdate(prop.getValue("query_addSubject"), subject_code, name, hour_restriction, subject_restriction, hc, type_subject_id);
				json.put("status", 200).put("response", prop.getValue("mssg_subjectCreated")).put("subject_id", subject_id);
				System.out.println(prop.getValue("mssg_subjectCreated"));
			/*}else {
				json.put("response", pr.getValue("mssg_columnUsed")).put("status", 400);
 		    	System.out.println(pr.getValue("mssg_creationFail"));
			}*/
		
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
