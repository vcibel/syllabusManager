package vm.org.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
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
import vm.org.utilities.PropertiesReader;
import vm.org.User;

/**
 * Servlet implementation class Session
 */
@WebServlet(
		name="Login",
		urlPatterns="/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		HttpSession session = request.getSession();
		
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		//DataBase db = new DataBase();
        DB db = new DB();
		PropertiesReader prop = PropertiesReader.getInstance();

		System.out.println(reqBody.toString());

		String username = reqBody.getString("username");
		String password = reqBody.getString("password");

		System.out.println("User requesting login: " +
				"Username: " + username +
				"Password: " + password +
				"Hash Password" + DigestUtils.sha512Hex(password));
			
		JSONArray table = db.executeQuery(prop.getValue("query_getUser"),username, DigestUtils.sha512Hex(password));
        System.out.println(table.toString());
        System.out.println(table.getJSONObject(0));

        if(table.length() != 0) {
					User user = new User(table.getJSONObject(0).getInt("user_id"), username);
					storeValue(user, session);
					System.out.println(prop.getValue("mssg_loginSuccess"));
					json.put("status", 200).put("response", prop.getValue("mssg_loginSuccess"));
					System.out.println("Succesful login: User ID:"+table.getJSONObject(0).getInt("user_id")+ " Username: "+username);
			}else {
				System.out.println(prop.getValue("mssg_loginFail"));
				json.put("response", prop.getValue("mssg_loginFail")).put("status", 400);
				session.invalidate();
			}

		System.out.println(json.toString());
		System.out.println(session);
		out.println(json.toString());
	}		
	
	public void storeValue(User user, HttpSession session) {

			session.setAttribute("user", user);

	}
}