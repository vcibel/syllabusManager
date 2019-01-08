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

import org.json.JSONObject;

import vm.org.DataBase;
import vm.org.User;
import vm.org.utilities.PropertiesReader;

/**
 * Servlet implementation class Comment
 */
@WebServlet(name = "Comment",
            urlPatterns = "/Comment")
public class Comment extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Comment() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		DataBase db = new DataBase();
		PropertiesReader pr = PropertiesReader.getInstance();
		
		Integer id = Integer.parseInt(request.getParameter("id"));
		
		System.out.println("ESTOY AQUI ahora"+id);
		json.put("comments", db.cardComments(id)).put("status", 200).put("response", pr.getValue("mssg_success"));
		
		out.print(json.toString());
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		HttpSession session = request.getSession();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DataBase db = new DataBase();
		PropertiesReader pr = PropertiesReader.getInstance();
		
		try {

			Integer card_id = reqBody.getInt("card_id");
			String comment_text = reqBody.getString("comment_text");
			User user = (User) session.getAttribute("user");
			
			System.out.println(user.getId()+card_id+comment_text);

				int comment_id = db.newComment(card_id, user.getId(), comment_text);
				json.put("status", 200).put("response", pr.getValue("mssg_commentCreated")).put("comment_id", comment_id).put("username", user.getUsername());
				System.out.println(pr.getValue("mssg_commentCreated"));
			
		}catch (Exception e) {
			json.put("response", pr.getValue("mssg_creationFail")).put("status", 400);
			System.out.println(pr.getValue("mssg_creationFail"));
			System.out.println(e. getMessage());
			e.printStackTrace();
		}
		
		out.print(json.toString());
		
		}		
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DataBase db = new DataBase();
		PropertiesReader pr = PropertiesReader.getInstance();
		
		try {
			
			Integer comment_id = reqBody.getInt("comment_id");
            System.out.println(comment_id);

				db.deleteComment(comment_id);
				json.put("status", 200).put("response", pr.getValue("mssg_commentDeleted"));
				System.out.println(pr.getValue("mssg_commentDeleted"));		
		
		}catch (Exception e) {
			json.put("response", pr.getValue(" mssg_deleteFail")).put("status", 400);
		    	System.out.println( pr.getValue("mssg_deleteFail")); 
			System.out.println(e. getMessage());
			e.printStackTrace();
		}
		
		out.print(json.toString());
		
		}
		
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		JSONObject reqBody = new JSONObject(request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
		DataBase db = new DataBase();
		PropertiesReader pr = PropertiesReader.getInstance();
		
		System.out.println("ESTOY AQUI");
		
		try {

			Integer comment_id = reqBody.getInt("comment_id");
			String newComment = reqBody.getString("new_comment");

            System.out.println(comment_id+newComment);
			
			db.updateComment(comment_id, newComment);
			json.put("status", 200).put("response", pr.getValue("mssg_commentUpdate"));
			System.out.println(pr.getValue("mssg_commentUpdate"));		
		
		}catch (Exception e) {
			System.out.println("error");
			System.out.println(e. getMessage());
			e.printStackTrace();
			json.put("response", pr.getValue("mssg_updateFail")).put("status", 400); 
		    System.out.println(pr.getValue("mssg_updateFail"));
		}
		
		out.print(json.toString());
		
		}

}
