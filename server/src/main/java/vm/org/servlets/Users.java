package vm.org.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.digest.DigestUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import vm.org.DB;
import vm.org.User;
import vm.org.utilities.PropertiesReader;

@WebServlet(
		name="Users",
		urlPatterns="/Users")

public class Users extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Users() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        DB db = user.getDB();
		PropertiesReader prop = PropertiesReader.getInstance();

		json.put("users", db.executeQuery(prop.getValue("query_getUsers"))).put("status", 200).put("response", prop.getValue("mssg_success"));

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
		String user_name = reqBody.getString("user_name");
        String user_lastname = reqBody.getString("user_lastname");
        String user_username = reqBody.getString("user_username");
        String user_password = reqBody.getString("user_password");

		System.out.println("User requesting signup: " +
                            "Username: " + user_username +
                            "Name: "     + user_name +
                            "Lastname: " + user_lastname +
                            "Password: " + user_password);

		try {			
	 			if(db.executeQuery(prop.getValue("query_checkSignup"),user_username).length() == 0) {
	 		    	db.executeUpdate(prop.getValue("query_addUser"),user_name, user_username, user_lastname,DigestUtils.sha512Hex(user_password));
	 		    	json.put("response", prop.getValue("mssg_signUpSuccess")).put("status", 200);
	 		    	System.out.println(prop.getValue("mssg_signUpSuccess"));
	 			}else {
	 		    	json.put("response", prop.getValue("mssg_signUpFail")).put("status", 400);
	 		    	System.out.println(prop.getValue("mssg_signUpFail"));
	 			}
			
		} catch (Exception e) {
			System.out.println("error");
			System.out.println(e. getMessage());
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

			Integer user_id = Integer.parseInt(request.getParameter("id"));

			db.executeUpdate(prop.getValue("query_deleteUser"), user_id);
			json.put("status", 200).put("response", prop.getValue("mssg_userDeleted"));
			System.out.println(prop.getValue("mssg_userDeleted"));

		}catch (Exception e) {
			System.out.println("error");
			System.out.println(e. getMessage());
			e.printStackTrace();
		}

		out.print(json.toString());

	}

	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        DB db = user.getDB();
		PropertiesReader prop = PropertiesReader.getInstance();

		try {
			Integer user_id = reqBody.getInt("user_id");
			String new_user_name = reqBody.getString("user_name");
			String new_user_lastname = reqBody.getString("user_lastname");
			String new_user_username = reqBody.getString("user_username");
			String new_user_password = reqBody.getString("user_password");
            Integer new_type_user_id = reqBody.getInt("type_user_id");

			System.out.println("User requesting update: " +
					"Id: "       + user_id +
					"New Username: " + new_user_username +
					"New Name: "     + new_user_name +
					"New Lastname: " + new_user_lastname +
					"New Password: " + new_user_password +
                    "New Type User: " + new_type_user_id);

			JSONArray table = db.executeQuery(prop.getValue("query_checkSignup"), new_user_username);
			System.out.println(table.toString());

			if(table.length()==0 || (table.length()==1 && table.getJSONObject(0).getInt("user_id") == user_id)) {
                db.executeUpdate(prop.getValue("query_updateUser"), new_user_name, new_user_lastname, new_user_username, new_user_password, new_type_user_id, user_id);
                json.put("status", 200).put("response", prop.getValue("mssg_userUpdate"));
                System.out.println(prop.getValue("mssg_userUpdate"));
            }else {
                json.put("response", prop.getValue("mssg_signUpFail")).put("status", 400);
                System.out.println(prop.getValue("mssg_signUpFail"));
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
