package vm.org.utilities;

import java.sql.DriverManager;
import java.sql.Connection;

public class Conn {
	private Connection con = null;
	private static PropertiesReader prop = PropertiesReader.getInstance();
	
	public Connection getConn() {
		try {
			Class.forName(prop.getValue("dbDriver"));
			con= DriverManager.getConnection(prop.getValue("dbUrl"),prop.getValue("dbUser"),prop.getValue("dbPassword"));
			System.out.println("Successful Conexion");
		}
		catch(Exception e){
			System.out.println(e);
			System.out.println("Fail Connection");
			e.getStackTrace();
		}
		return con;
	}
	
	public void closeCon(Connection con) {
		try {
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
