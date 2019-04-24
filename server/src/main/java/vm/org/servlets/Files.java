package vm.org.servlets;

import java.io.*;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import org.json.JSONObject;

import vm.org.DB;
import vm.org.User;
import vm.org.utilities.PropertiesReader;

@WebServlet(name = "Files",
            urlPatterns = "/Files")
@MultipartConfig

public class Files extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Files() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String syllabus_url = request.getParameter("syllabus_url");
		String syllabus_name = request.getParameter("syllabus_name");

        response.setContentType("application/pdf");

        response.setHeader("Content-disposition","inline; filename="+syllabus_name);

		File my_file = new File(syllabus_url);
		System.out.println(syllabus_url);
		System.out.println(syllabus_name);

        OutputStream out= response.getOutputStream();
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
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		DB db = user.getDB();
		PropertiesReader prop = PropertiesReader.getInstance();
		ArrayList<String> files_name= new ArrayList<String>();
		ArrayList<String> files_url= new ArrayList<String>();

		try {

			Integer subject_id = Integer.parseInt(request.getParameter("subject_id"));
			Integer faculty_code = Integer.parseInt(request.getParameter("faculty_code"));
			Integer college_code = Integer.parseInt(request.getParameter("college_code"));
			Integer department_code = Integer.parseInt(request.getParameter("department_code"));


			for (Part file : files) {
				String file_name = getFileName(file);
				String file_url = prop.getValue("baseDir") + "/Faculty_" + faculty_code + "/College_"+ college_code + "/Department_"+ department_code + "/" + file_name;

				filecontent = file.getInputStream();

				db.executeUpdate(prop.getValue("query_updateSubject"), file_name, file_url, subject_id);

				System.out.println("Archivo-> " + file_name + "" + file_url);
                File myFile = new File(file_url);
                myFile.getParentFile().mkdirs();
                myFile.createNewFile();
				os = new FileOutputStream(myFile);
				int read = 0;
				byte[] bytes = new byte[1024];
				while ((read = filecontent.read(bytes)) != -1) {
					os.write(bytes, 0, read);
				}
				files_name.add(file_name);
				files_url.add(file_url);
				json.put("status", 200).put("response", prop.getValue("mssg_fileUploaded")).put("files_name", files_name).put("files_url", files_url);
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
		PropertiesReader prop = PropertiesReader.getInstance();
		
		try {
            String syllabus_url = request.getParameter("syllabus_url");

            //String file_url = prop.getValue("baseDir") + "/Faculty_" + faculty_code + "/College_"+ college_code + "/Department_"+ department_code + "/" + syllabus_name;
            //System.out.println(file_url);
            System.out.println(syllabus_url);
            File file = new File(syllabus_url);
            file.delete();
			json.put("status", 200).put("response", prop.getValue("mssg_fileDeleted"));
			System.out.println(prop.getValue("mssg_fileDeleted"));
		
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
