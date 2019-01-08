package vm.org;

public class User {
	
	private Integer id;
	private String username;
	
	public User(Integer id, String username) {
		this.id = id;
		this.username = username;
	}

	public Integer getId() {
		return id;
	}
	
	public String getUsername() {
		return username;
	}

}
