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

import vm.org.DB;
import vm.org.User;
import vm.org.utilities.PropertiesReader;

@WebFilter(servletNames= {"Users", "Subjects", "SubjectPensum", "Pensum", "Faculties", "Departments", "Colleges"})
		   //urlPatterns= "/boards.html*")

public class TypeUserFilter implements Filter {
	enum method {GET, POST, PUT, DELETE}

    public TypeUserFilter() {
        // TODO Auto-generated constructor stub
    }

	public void destroy() {}

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		PrintWriter out = res.getWriter();
		JSONObject json = new JSONObject();
		HttpServletResponse response = (HttpServletResponse) res;
		HttpServletRequest request = (HttpServletRequest) req;	
		
		HttpSession session = request.getSession();
		
		DB db = new DB();
		User user = (User) session.getAttribute("user");
		String requestURI = request.getRequestURI();
		System.out.println(requestURI+" "+ session.isNew());
		PropertiesReader pr = PropertiesReader.getInstance();
		
		Integer user_id = user.getId();
		Integer type_user_id = user.getTypeUser();

		if(request.getMethod().equalsIgnoreCase(method.GET.name())){
			System.out.println("Filterget");
			chain.doFilter(request, response);
	    } else {
			
			if (type_user_id==1) {
				System.out.println("Filtercase1");
				chain.doFilter(request, response);
			}else {
				System.out.println(pr.getValue("mssg_notAllowed"));			
				json.put("response", pr.getValue("mssg_notAllowed")).put("status", 403);
				out.println(json.toString());
			}
		}
				
	    }

	public void init(FilterConfig fConfig) throws ServletException {}

}
