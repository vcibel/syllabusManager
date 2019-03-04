package vm.org;

public class User {
	
	private Integer id;
	private String username;
	private Integer typeUser;
	
	public User(Integer id, String username, Integer typeUser) {
		this.id = id;
		this.username = username;
		this.typeUser = typeUser;
	}

	public Integer getId() {
		return id;
	}
	
	public String getUsername() {
		return username;
	}

	public Integer getTypeUser() { return typeUser; }

}
