package vm.org.utilities;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesReader {
	private static PropertiesReader propr = null;
	private Properties prop = new Properties();
	private InputStream input = null;
	
	//public PropertiesReader() {
	private PropertiesReader() {
		try {
			input = new FileInputStream("/"+ System.getProperty("user.dir")+"/conn.properties");
			prop.load(input);
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	public static PropertiesReader getInstance () {
		return propr = ((propr == null) ? propr = new PropertiesReader() : propr);
	}
	public String getValue(String key){
		return prop.getProperty(key);
	}
}
