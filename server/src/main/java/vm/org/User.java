package vm.org;

public class User {
	
	private Integer id;
	private String username;
	private Integer typeUser;
	private DB db;
	
	public User(Integer id, String username, Integer typeUser, DB db) {
		this.id = id;
		this.username = username;
		this.typeUser = typeUser;
		this.db = db;
	}

	public Integer getId() {
		return id;
	}
	
	public String getUsername() { return username; }

	public Integer getTypeUser() { return typeUser; }

	public DB getDB() { return db; }

}
