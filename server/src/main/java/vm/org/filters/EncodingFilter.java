package vm.org.filters;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter()
		   //urlPatterns= "/boards.html*")

public class EncodingFilter implements Filter {
	private String encoding = "utf-8";

    public EncodingFilter() {}

	public void destroy() {}

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		System.out.println(req.getCharacterEncoding());
    	req.setCharacterEncoding(encoding);
		System.out.println(req.getCharacterEncoding());
		res.setCharacterEncoding("UTF-8");
		chain.doFilter(req, res);
    }

	public void init(FilterConfig fConfig) throws ServletException {
    	String encodingParam = fConfig.getInitParameter("encoding");
    	if (encodingParam != null) {
    		encoding = encodingParam;
		}
	}

}
