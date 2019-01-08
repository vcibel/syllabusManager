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

import vm.org.utilities.PropertiesReader;

/**"/signin.html"
 * Servlet Filter implementation class SessionFilter
 */
@WebFilter(servletNames= {"Login", "Board", "Column", "Card", "Logout", "Signup", "UserBoard", "Comment", "Files"})
//@WebFilter(value={"/*"})
public class SessionFilter implements Filter {

    /**
     * Default constructor. 
     */
    public SessionFilter() {
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
		// TODO Auto-generated method stub
		// place your code here
		PrintWriter out = res.getWriter();
		JSONObject json = new JSONObject();
		HttpServletResponse response = (HttpServletResponse) res;
		HttpServletRequest request = (HttpServletRequest) req;
		
		HttpSession session = request.getSession();
		PropertiesReader pr = PropertiesReader.getInstance();
		
		String requestURI = request.getRequestURI();
		System.out.println(requestURI+" "+ session.isNew());
		
		String URIs[]= {"/SyllabusManager/Logout", "/SyllabusManager/Files", "/SyllabusManager/Careers", "/SyllabusManager/Colleges",
						"/SyllabusManager/Departments", "/SyllabusManager/Pensum", "/SyllabusManager/SubjectPensum",
						"/SyllabusManager/Subjects", "/SyllabusManager/Users"};
		
		boolean in = true;
		System.out.println(URIs.length);
		for (int x=0;x<URIs.length;x++) {
			System.out.println(URIs[x].equals(requestURI)); 
			if (URIs[x].equals(requestURI)) {
				in = false;
				break;
			}
		}
		
		if(session.isNew()) {
			System.out.println(requestURI+" "+ session.isNew());
			
			if (in) {
				System.out.println("Filter");
				session.invalidate();
				chain.doFilter(request, response);
			}else {				
				System.out.println(pr.getValue("mssg_login"));			
				json.put("response", pr.getValue("mssg_login")).put("status", 400);
				
			    //response.setHeader("Location", "/TrelloOrg/index.html");
				//response.sendRedirect("/TrelloOrg/index.html");
				session.invalidate();
				System.out.println(json.toString());
				out.println(json.toString());
				
			}
			
		}else {
			if(in) {
				System.out.println("Already log");			
				json.put("response", pr.getValue("mssg_logged")).put("status", 304);
				//session.invalidate();
				out.println(json.toString());
				
			}else {
				System.out.println("Filter");
				chain.doFilter(request, response);
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
