package vm.org.filters;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import vm.org.DataBase;
import vm.org.User;
import vm.org.utilities.PropertiesReader;

/**
 * Servlet Filter implementation class TypeUserBoard
 */


@WebFilter(servletNames= {"Column", "Card", "UserBoard", "Comment", "Files"})
		   //urlPatterns= "/boards.html*")

public class TypeUserBoard implements Filter {
	enum method {GET, POST, PUT, DELETE}
    /**
     * Default constructor. 
     */
    public TypeUserBoard() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		PrintWriter out = res.getWriter();
		JSONObject json = new JSONObject();
		HttpServletResponse response = (HttpServletResponse) res;
		HttpServletRequest request = (HttpServletRequest) req;	
		
		HttpSession session = request.getSession();
		
		DataBase db = new DataBase();
		User user = (User) session.getAttribute("user");
		String requestURI = request.getRequestURI();
		System.out.println(requestURI+" "+ session.isNew());
		PropertiesReader pr = PropertiesReader.getInstance();
		
		Integer user_id = user.getId();
		
		
		if(request.getMethod().equalsIgnoreCase(method.GET.name())){
			System.out.println("Filterget");
			chain.doFilter(request, response);
	    } else {
	    	Integer board_id = Integer.parseInt(request.getParameter("board_id"));
			int typeUser = db.getTypeUserBoard(board_id, user_id);
			
			if (typeUser==1) {
				System.out.println("Filtercase1");
				chain.doFilter(request, response);
			}else if (typeUser==2) {
				if(request.getMethod().equalsIgnoreCase(method.POST.name())){
					System.out.println("Filtercase2post");
					chain.doFilter(request, response);
			    }else {
				/*switch (requestURI) {
				case "/TrelloOrg/Column":
					Integer column_id = Integer.parseInt(request.getParameter("column_id"));
					if (db.checkColumn(column_id)==user_id) {
						System.out.println("Filtercase2");
						chain.doFilter(request, response);
					}else {
						System.out.println(pr.getValue("mssg_notAllowed"));			
						json.put("response", pr.getValue("mssg_notAllowed")).put("status", 403);
						out.println(json.toString());
					}
					break;
				case "/TrelloOrg/Card":
					Integer card_id = Integer.parseInt(request.getParameter("card_id"));
					if (db.checkCard(card_id)==user_id) {
						System.out.println("Filter2");
						chain.doFilter(request, response);
					}else {
						System.out.println(pr.getValue("mssg_notAllowed"));			
						json.put("response", pr.getValue("mssg_notAllowed")).put("status", 403);
						out.println(json.toString());
					}
					break;
				case "/TrelloOrg/Comment":
					Integer comment_id = Integer.parseInt(request.getParameter("comment_id"));
					if (db.checkComment(comment_id)==user_id) {
						System.out.println("Filter3");
						chain.doFilter(request, response);
					}else {
						System.out.println(pr.getValue("mssg_notAllowed"));			
						json.put("response", pr.getValue("mssg_notAllowed")).put("status", 403);
						out.println(json.toString());
					}
					break;
				case "/TrelloOrg/Files":
					Integer file_id = Integer.parseInt(request.getParameter("file_id"));
					if (db.checkFile(file_id)==user_id) {
						System.out.println("Filter4");
						chain.doFilter(request, response);
					}else {
						System.out.println(pr.getValue("mssg_notAllowed"));			
						json.put("response", pr.getValue("mssg_notAllowed")).put("status", 403);
						out.println(json.toString());
					}
					break;
				}*/
			    }
			}else {
				System.out.println(pr.getValue("mssg_notAllowed"));			
				json.put("response", pr.getValue("mssg_notAllowed")).put("status", 403);
				out.println(json.toString());
			}
			}
				
	    }

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
