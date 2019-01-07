package vm.org.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import vm.org.utilities.PropertiesReader;

@WebServlet(
		name="Logout",
		urlPatterns="/Logout")
public class Logout extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Logout() { super(); }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		JSONObject json = new JSONObject();
		PropertiesReader pr = PropertiesReader.getInstance();
	
		System.out.println(session);

		json.put("status",200).put("response", pr.getValue("mssg_session"));
		System.out.println(pr.getValue("mssg_session"));
		session.invalidate();
		out.print(json.toString());
	}


}
