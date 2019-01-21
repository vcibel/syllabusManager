package vm.org.servlets;

import java.io.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.json.JSONObject;

import vm.org.DB;
import vm.org.utilities.PropertiesReader;

@WebServlet(name = "Files",
            urlPatterns = "/Files")
@MultipartConfig

public class Files extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static PropertiesReader prop = PropertiesReader.getInstance();

    public Files() {
        super();
        // TODO Auto-generated constructor stub
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String name = request.getParameter("name");
		response.setContentType("file");

		response.setHeader("Content-disposition","attachment; filename="+name);

		File my_file = new File(prop.getValue("baseDir") + "/" +name);
		System.out.println(name);

		OutputStream out = response.getOutputStream();
		FileInputStream in = new FileInputStream(my_file);
		byte[] buffer = new byte[4096];
		int length;
		while ((length = in.read(buffer)) > 0){
			out.write(buffer, 0, length);
		}
		in.close();
		out.flush();

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		Collection<Part> files = request.getParts();
		InputStream filecontent = null;
		OutputStream os = null;
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		ArrayList<String> files_name= new ArrayList<String>();
		
		try {

			Integer subject_id = Integer.parseInt(request.getParameter("subject_id"));
			Integer faculty_code = Integer.parseInt(request.getParameter("faculty_code"));
			Integer college_code = Integer.parseInt(request.getParameter("college_code"));
			Integer department_code = Integer.parseInt(request.getParameter("department_code"));


			for (Part file : files) {
				String file_name = getFileName(file);
				String file_url = prop.getValue("baseDir") + "/" + faculty_code + "/"+ college_code + "/"+ department_code + "/" + file_name;

				filecontent = file.getInputStream();

				db.executeUpdate(prop.getValue("query_updateSubject"), file_name, file_url, subject_id);

				System.out.println("Archivo-> " + file_name + "" + file_url);
				os = new FileOutputStream(file_url);
				int read = 0;
				byte[] bytes = new byte[1024];
				while ((read = filecontent.read(bytes)) != -1) {
					os.write(bytes, 0, read);
				}
				files_name.add(file_name);
				json.put("status", 200).put("response", prop.getValue("mssg_fileUploaded")).put("files_name", files_name);
				System.out.println(prop.getValue("mssg_fileUploaded"));
			}
			out.print(json.toString());
		} catch (Exception e) {
			System.out.println("error");
			System.out.println(e. getMessage());
			e.printStackTrace();
		} finally {
			if (filecontent != null) {
				filecontent.close();
			}
			if (os != null) {
				os.close();
			}
		}
	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {

			Integer subject_id = Integer.parseInt(request.getParameter("subject_id"));
			String file_name = request.getParameter("file_name");
			Integer faculty_code = Integer.parseInt(request.getParameter("faculty_code"));
			Integer college_code = Integer.parseInt(request.getParameter("college_code"));
			Integer department_code = Integer.parseInt(request.getParameter("department_code"));

			String file_url = prop.getValue("baseDir") + "/" + faculty_code + "/"+ college_code + "/"+ department_code + "/" + file_name;
			File file = new File(file_url);


			db.executeUpdate(prop.getValue("query_deleteFile"), subject_id);
			json.put("status", 200).put("response", prop.getValue("mssg_fileDeleted"));
			System.out.println(prop.getValue("mssg_fileDeleted"));
			file.delete();
		
		}catch (Exception e) {
			System.out.println("error");
			System.out.println(e. getMessage());
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
