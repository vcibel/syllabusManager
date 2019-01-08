package vm.org;

import java.sql.*;

import org.json.JSONArray;
import org.json.JSONObject;
import vm.org.utilities.Conn;
import vm.org.utilities.PropertiesReader;

public class DB {
	
	private ResultSet rs;
	private ResultSetMetaData rsmd;
	private JSONArray table;
	private JSONObject row;
	private PreparedStatement pstmt;
	private Connection con;
	public DB(){
        Conn c = new Conn();
        this.con = c.getConn();
	}

	public JSONArray executeQuery(String query, Object... values) {
        //int id = 0;
        System.out.println("Query to exececute: " + query);
        System.out.println("Values: " +values.length);
        try {
			this.pstmt = con.prepareStatement(query, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

			for (int i = 0; i < values.length; i++) {
				this.pstmt.setObject(i + 1, values[i]);
			}
			this.rs = this.pstmt.executeQuery();

		} catch (Exception e) {
            System.out.println(e. getMessage());
			e.getStackTrace();
		} 
		return getTable(this.rs);
	}
	
	public int executeUpdate(String query, Object... values) {
        int id = 0;
        System.out.println("Query to exececute: " + query);
        System.out.println("Values: " +values.length);
		try {
			this.pstmt = con.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);

			for (int i = 0; i < values.length; i++) {
				this.pstmt.setObject(i + 1, values[i]);
			}

			this.pstmt.executeUpdate();
            this.rs = this.pstmt.getGeneratedKeys();

            if(this.rs.next()) {
                id=this.rs.getInt(1);
            }

		} catch (Exception e) {
			e.printStackTrace();
		} 
		return id;
	}
	
	public JSONArray getTable(ResultSet rs) {
        try {
			this.rsmd = rs.getMetaData();
			rs.last();
			table = new JSONArray();
			rs.beforeFirst();
			while (rs.next()) {
                row = new JSONObject();
				for (int i = 1; i <= this.rsmd.getColumnCount(); i++) {
					row.put(rsmd.getColumnLabel(i), rs.getObject(i));
				}
				table.put(row);
			}
		}
		catch (Exception e) {
			System.out.println(e. getMessage());
			e.getStackTrace();
		}
        return table;
	}
}
