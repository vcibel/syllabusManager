package vm.org.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.digest.DigestUtils;
import org.json.JSONObject;

import vm.org.DB;
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
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();

		json.put("users", db.executeQuery(prop.getValue("query_getUsers"))).put("status", 200).put("response", prop.getValue("mssg_success"));

		out.print(json.toString());

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();
		String name = reqBody.getString("name");
        String lastname = reqBody.getString("lastname");
        String username = reqBody.getString("username");
        String password = reqBody.getString("password");

		System.out.println("User requesting signup: " +
                            "Username: " + username +
                            "Name: "     + name +
                            "Lastname: " + lastname +
                            "Password: " + password);

		try {			
	 			if(db.executeQuery(prop.getValue("query_checkSignup"),username).length() == 0) {
	 		    	db.executeUpdate(prop.getValue("query_addUser"),name, username, lastname,DigestUtils.sha512Hex(password));
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
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();

		try {

			Integer user_id = reqBody.getInt("user_id");
			System.out.println(user_id);

			if (user_id!=0) {
				db.executeUpdate(prop.getValue("query_deleteUser"), user_id);
				json.put("status", 200).put("response", prop.getValue("mssg_userDeleted"));
				System.out.println(prop.getValue("mssg_userDeleted"));
			}else {
				json.put("response", prop.getValue("mssg_deleteFail")).put("status", 400);
				System.out.println(prop.getValue("mssg_deleteFail"));
			}

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
		DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();

		try {
			Integer user_id = reqBody.getInt("user_id");
			String old_username = reqBody.getString("old_username");
			String new_name = reqBody.getString("name");
			String new_lastname = reqBody.getString("lastname");
			String new_username = reqBody.getString("username");
			String new_password = reqBody.getString("password");
            Integer new_type_user_id = reqBody.getInt("type_user_id");

			System.out.println("User requesting update: " +
					"Id: "       + user_id +
                    "Username: " + old_username +
					"New Username: " + new_username +
					"New Name: "     + new_name +
					"New Lastname: " + new_lastname +
					"New Password: " + new_password +
                    "New Type User: " + new_type_user_id);

			if(old_username.equalsIgnoreCase(new_username) || db.executeQuery(prop.getValue("query_checkSignup"),new_username).length() == 0) {
                db.executeUpdate(prop.getValue("query_updateUser"), new_name, new_lastname, new_username, new_password, new_type_user_id);
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
