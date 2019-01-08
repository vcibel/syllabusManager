package vm.org;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import vm.org.utilities.Conn;
import vm.org.utilities.PropertiesReader;
import org.apache.commons.codec.digest.DigestUtils;


public class DataBase {
	private Connection con = null;
	private static PropertiesReader prop = PropertiesReader.getInstance();
	public ResultSet rs;
	private PreparedStatement pstmt;

	
	public DataBase() {
		Conn c = new Conn();
		this.con = c.getConn();
	}
	
	//------ CHECK IF USERNAME OR EMAIL EXISTS WHEN SIGNUP------
	
	public int checkSignup(String username) {
		int id =0;
		System.out.println("Query to exececute: " + prop.getValue("query_checkSignup"));
		try {
			this.pstmt = con.prepareStatement(prop.getValue("query_checkSignup"));
			this.pstmt.setString(1, username);
			this.rs = this.pstmt.executeQuery();
			if(this.rs.next()) {
				id = this.rs.getInt("user_id");
				System.out.println("Username "+ username+ " already exists");
			} else{
				System.out.println("Username is available");
			}
		} catch (SQLException e) {
			System.out.println("error");
			System.out.println(e. getMessage());
			e.printStackTrace();
		}
		return id;
	}
	
	//------ CHECK IF USER EXISTS WHEN LOGIN----------
	
	public int getUserId(String username, String password) {
			int id = 0;
			System.out.println("Query to exececute: " + prop.getValue("query_getUser"));
			try {
				this.pstmt = this.con.prepareStatement(prop.getValue("query_getUser"));
			    this.pstmt.setString(1, username);
			    this.pstmt.setString(2,password);
				this.rs = this.pstmt.executeQuery();
					while (this.rs.next()) {
						id = this.rs.getInt("user_id");
					}
						System.out.println(id);
					return id;
				} catch (Exception e) {
					e.printStackTrace();
				}
			return id;
		}
	
	//------ CHECK IF BOARD NAME EXISTS FOR THE USER----------
	
	public int getBoard(Integer user_id, String name) {
		return getItem(user_id, name, prop.getValue("query_getBoard"), "board_id");
	}
	
	//------ CHECK IF COLUMN NAME EXISTS IN BOARD----------
	
	public int getColumn(Integer board_id, String name) {
		return getItem(board_id, name, prop.getValue("query_getColumn"), "column_id");
	}
	
	//------ CHECK IF CARD NAME EXISTS IN COLUMN----------
	
	public int getCard(Integer column_id, String name) {
		return getItem(column_id, name, prop.getValue("query_getCard"), "card_id");
	}
	
	//------ CHECK USER_ID IN COLUMN ------
	
		public int checkColumn(Integer column_id) {
			int id =0;
			System.out.println(prop.getValue("query_checkColumn"));
			try {
				this.pstmt = con.prepareStatement(prop.getValue("query_checkColumn"));
				this.pstmt.setInt(1, column_id);
				this.rs = this.pstmt.executeQuery();
				if(this.rs.next()) {
					id = this.rs.getInt("user_id");
					System.out.println("Email exists or username exists");
				} else{
					System.out.println("Sign up completed");
				}
			} catch (SQLException e) {
				System.out.println("error");
				System.out.println(e. getMessage());
				e.printStackTrace();
			}
			return id;
		}
		
		//------ CHECK USER_ID IN CARD ------
		
			public int checkCard(Integer card_id) {
				int id =0;
				System.out.println(prop.getValue("query_checkCard"));
				try {
					this.pstmt = con.prepareStatement(prop.getValue("query_checkCard"));
					this.pstmt.setInt(1, card_id);
					this.rs = this.pstmt.executeQuery();
					if(this.rs.next()) {
						id = this.rs.getInt("user_id");
						System.out.println("Email exists or username exists");
					} else{
						System.out.println("Sign up completed");
					}
				} catch (SQLException e) {
					System.out.println("error");
					System.out.println(e. getMessage());
					e.printStackTrace();
				}
				return id;
			}
			
			//------ CHECK USER_ID IN COMMENT ------
			
			public int checkComment(Integer comment_id) {
				int id =0;
				System.out.println(prop.getValue("query_checkComment"));
				try {
					this.pstmt = con.prepareStatement(prop.getValue("query_checkComment"));
					this.pstmt.setInt(1, comment_id);
					this.rs = this.pstmt.executeQuery();
					if(this.rs.next()) {
						id = this.rs.getInt("user_id");
						System.out.println(id);
					} 
				} catch (SQLException e) {
					System.out.println("error");
					System.out.println(e. getMessage());
					e.printStackTrace();
				}
				return id;
			}
			
			//------ CHECK USER_ID IN FILE ------
			
			public int checkFile(Integer file_id) {
				int id =0;
				System.out.println(prop.getValue("query_checkFile"));
				try {
					this.pstmt = con.prepareStatement(prop.getValue("query_checkFile"));
					this.pstmt.setInt(1, file_id);
					this.rs = this.pstmt.executeQuery();
					if(this.rs.next()) {
						id = this.rs.getInt("user_id");
						System.out.println(id);
					} 
				} catch (SQLException e) {
					System.out.println("error");
					System.out.println(e. getMessage());
					e.printStackTrace();
				}
				return id;
			}
	
	//------ ADD ACCOUNT IN DB-------
	
		public void newAccount(String name, String lastname, String username, String password) {
			System.out.println("Query to exececute: " + prop.getValue("query_addUser"));
			try {
				this.pstmt = con.prepareStatement(prop.getValue("query_addUser"));
				this.pstmt.setString(1,name);
				this.pstmt.setString(2,username);
				this.pstmt.setString(3,lastname);
				this.pstmt.setString(4, DigestUtils.sha512Hex(password));
				this.pstmt.executeUpdate();
			} catch (SQLException e) {
				System.out.println(e);
				e.printStackTrace();
			}
		}
		
	//----- ADD BOARD IN DB-----------
		public int newBoard(String name, Integer user_id) {
			int id=0;
			System.out.println(prop.getValue("query_addBoard"));
			try {
				this.pstmt = con.prepareStatement(prop.getValue("query_addBoard"), PreparedStatement.RETURN_GENERATED_KEYS);
				this.pstmt.setString(1,name);
				this.pstmt.setInt(2,user_id);
				this.pstmt.executeUpdate();
				
				this.rs = this.pstmt.getGeneratedKeys();
				
				if(this.rs.next()) {
					id=this.rs.getInt(1);
					System.out.println(id);
				}
				
				for (int i=1; i<3; i++) {
					newColumn(id, "Columna: "+i, user_id);
				}
				
				newColaborator(id, user_id, 1);
				
			} catch (SQLException e) {
				System.out.println(e. getMessage());
				e.printStackTrace();
			}
			return id;
		}
		
		//------- ADD COLUMN IN DB-----------
		
		public int newColumn(int board_id, String name, int user_id) {
			int id=0;
			System.out.println(prop.getValue("query_addColumn"));
			try {
				this.pstmt = con.prepareStatement(prop.getValue("query_addColumn"), PreparedStatement.RETURN_GENERATED_KEYS);
				this.pstmt.setInt(1,board_id);
				this.pstmt.setString(2,name);
				this.pstmt.setInt(3,user_id);
				this.pstmt.executeUpdate();
				
				this.rs = this.pstmt.getGeneratedKeys();
				
				if(this.rs.next()) {
					id=this.rs.getInt(1);
					System.out.println(id);
				}
				
			} catch (SQLException e) {
				System.out.println(e. getMessage());
				e.printStackTrace();
			}
			return id;
		}
		
		//------- ADD CARD IN DB-----------
		
		public int newCard(Integer column_id, Integer user_id, String card_name, String card_description) {
			int id=0;
			System.out.println(prop.getValue("query_addCard"));
			try {
				this.pstmt = con.prepareStatement(prop.getValue("query_addCard"), PreparedStatement.RETURN_GENERATED_KEYS);
				this.pstmt.setInt(1,column_id);
				this.pstmt.setInt(2,user_id);
				this.pstmt.setString(3,card_name);
				this.pstmt.setString(4,card_description);
				this.pstmt.executeUpdate();
				
				this.rs = this.pstmt.getGeneratedKeys();
				
				if(this.rs.next()) {
					id=this.rs.getInt(1);
					System.out.println(id);
				}
				
			} catch (SQLException e) {
				System.out.println(e. getMessage());
				e.printStackTrace();
			}
			return id;
		}
		
	//-----   DELETE  --------------
	
	public void deleteColumn(Integer column_id) {
        System.out.println(prop.getValue("query_deleteColumn"));
                delete(column_id, prop.getValue("query_deleteColumn"));
	}
    
        
    public void deleteBoard(Integer board_id) {
        System.out.println(prop.getValue("query_deleteBoard"));
                delete(board_id, prop.getValue("query_deleteBoard"));
	}
    
    public void deleteCard(Integer card_id) {
        System.out.println(prop.getValue("query_deleteCard"));
                delete(card_id, prop.getValue("query_deleteCard"));
	}
    
  //-----   UPDATE  --------------
    
    public void updateColumn(Integer column_id, String newName) {
        System.out.println(prop.getValue("query_updateColumn"));
                update(column_id, newName, prop.getValue("query_updateColumn"));
	}
    
    public void updateBoard(Integer board_id, String newName) {
        System.out.println(prop.getValue("query_updateBoard"));
                update(board_id, newName, prop.getValue("query_updateBoard"));
	}  
    
    public void updateCard(String card_name, String card_description, Integer column_id, Integer card_id) {
        System.out.println(prop.getValue("query_updateCard"));
        try {
			this.pstmt = con.prepareStatement(prop.getValue("query_updateCard"));
			this.pstmt.setString(1,card_name);
			this.pstmt.setString(2,card_description);
			this.pstmt.setInt(3,column_id);
			this.pstmt.setInt(4,card_id);
			this.pstmt.executeUpdate();
		} catch (SQLException e) {
			System.out.println(e. getMessage());
			e.printStackTrace();
		}
	}
    
  //-----   GET  --------------
    
    public Object[][] userBoards(Integer user_id) {
    	Object boards[][]=null;
		boards = data(user_id, prop.getValue("query_getUserBoards"));
		return boards;
	}
    
    public Object[][] boardColumns(Integer board_id) {
    	Object columns[][]=null;
		columns = data(board_id, prop.getValue("query_getBoardColumns"));
		return columns;
	}
    
    public Object[][] columnCards(Integer column_id) {
    	Object cards[][]=null;
		cards = data(column_id, prop.getValue("query_getColumnCards"));
		return cards;
	}
    
    //----- CHECK TIPE OF USER-----
	
	public boolean checkAdmin(String email) {
		boolean state = false;
		System.out.println(prop.getValue("query_admin"));
		try {
			this.pstmt = con.prepareStatement(prop.getValue("query_admin"));
			this.pstmt.setString(1,email);
			this.rs = this.pstmt.executeQuery();
			if(this.rs.getString("type_id").equals("1")) {
				state = true;
			}
		} catch(Exception e) {
			e.getStackTrace();
		}
		return state;
	}
	
	//----- SEARCH BOARDS------------
	
	public Object[][] allBoards(String board_name) {
		board_name='%'+board_name+'%';
		Object array[][]=null;
		System.out.println(prop.getValue("query_getAllBoards"));
		try {
			this.pstmt = this.con.prepareStatement(prop.getValue("query_getAllBoards"), ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		    this.pstmt.setString(1, board_name);
			this.rs = this.pstmt.executeQuery();
			rs.last();
			ResultSetMetaData rsmd = rs.getMetaData();
			int numCols = rsmd.getColumnCount();
			int numFils = rs.getRow();
			array = new Object[numFils][numCols];
			rs.beforeFirst();
			int j=0;
			while(rs.next()) {
				for(int i = 0; i<numCols;i++) {
					array[j][i]=rs.getObject(i+1);
				}
				j++;
			}
			} catch (Exception e) {
				e.printStackTrace();
			}
		return array;
	}
	
	//------ CHECK IF USERBOARD EXISTS FOR THE USER----------
	
		public int getTypeUserBoard(Integer board_id, Integer user_id) {
			int id=0;
			System.out.println(prop.getValue("query_get_type_User_Board"));
			try {
				this.pstmt = this.con.prepareStatement(prop.getValue("query_get_type_User_Board"));
			    this.pstmt.setInt(1, board_id);
			    this.pstmt.setInt(2, user_id);
				this.rs = this.pstmt.executeQuery();
					while (this.rs.next()) 		
						id = this.rs.getInt("type_board_user_id");
						System.out.println(id);
					return id;
				} catch (Exception e) {
					e.printStackTrace();
				}
			return id;
		}
	
	//----- ADD UserBoard ------------
	
	public void newColaborator(Integer board_id, Integer user_id, Integer type) {
		System.out.println(prop.getValue("query_add_User_Board"));
		try {
			this.pstmt = con.prepareStatement(prop.getValue("query_add_User_Board"));
			this.pstmt.setInt(1,board_id);
			this.pstmt.setInt(2,user_id);
			this.pstmt.setInt(3,type);
			this.pstmt.executeUpdate();
		} catch (SQLException e) {
			System.out.println(e. getMessage());
			e.printStackTrace();
		}
	}
	
	//------ UPPDATE USERBOARD --------------
	
	public void updateUserBoard(Integer board_id, Integer user_id, Integer type ) {
		System.out.println(prop.getValue("query_update_User_Board"));
		try {
			this.pstmt = con.prepareStatement(prop.getValue("query_update_User_Board"));
			this.pstmt.setInt(1,type);
			this.pstmt.setInt(2,board_id);
			this.pstmt.setInt(3,user_id);
			this.pstmt.executeUpdate();
		} catch (SQLException e) {
			System.out.println(e. getMessage());
			e.printStackTrace();
		}
    }
	
	//------ DELETE USERBOARD-----------------
	
	public void deleteUserBoard(Integer board_id, Integer user_id) {
		System.out.println(prop.getValue("query_delete_User_Board"));
		try {
			this.pstmt = con.prepareStatement(prop.getValue("query_delete_User_Board"));
			this.pstmt.setInt(1,board_id);
			this.pstmt.setInt(2,user_id);
			this.pstmt.executeUpdate();
		} catch (SQLException e) {
			System.out.println(e. getMessage());
			e.printStackTrace();
		}
	}
	
	//----- GET USERBOARD -------
	
	public Object[][] getColab(Integer board_id) {
    	Object colab[][]=null;
		colab = data(board_id, prop.getValue("query_get_Colab"));
		return colab;
	}	
	
	//----- CHECK IF FILE NAME EXISTS IN CARD ----
	public int getFile(Integer card_id, String name) {
		return getItem(card_id, name, prop.getValue("query_getFile"), "file_id");
	}
	
	//----- GET FILES --------
	public Object[][] cardFiles(Integer card_id) {
    	Object files[][]=null;
		files = data(card_id, prop.getValue("query_getCardFiles"));
		return files;
	}
	
	//----- ADD FILES ----------
	public int newFile(int card_id, int user_id, String file_url, String file_name) {
		int id=0;
		System.out.println(prop.getValue("query_addFile"));
		try {
			this.pstmt = con.prepareStatement(prop.getValue("query_addFile"), PreparedStatement.RETURN_GENERATED_KEYS);
			this.pstmt.setInt(1,card_id);
			this.pstmt.setInt(2,user_id);
			this.pstmt.setString(3,file_url);
			this.pstmt.setString(4,file_name);			
			this.pstmt.executeUpdate();
			
			this.rs = this.pstmt.getGeneratedKeys();
			
			if(this.rs.next()) {
				id=this.rs.getInt(1);
				System.out.println(id);
			}
			
		} catch (SQLException e) {
			System.out.println(e. getMessage());
			e.printStackTrace();
		}
		return id;
	}
	
	//------ DELETE FILE ------------
	public void deleteFile(Integer file_id) {
        System.out.println(prop.getValue("query_deleteFile"));
                delete(file_id, prop.getValue("query_deleteFile"));
	}
		
	//----- GET COMMENTS --------
		public Object[][] cardComments(Integer card_id) {
	    	Object files[][]=null;
			files = data(card_id, prop.getValue("query_getCardsComments"));
			return files;
		}
		
		//----- ADD COMMENTS ----------
		public int newComment(int card_id, int user_id, String comment_text) {
			int id=0;
			System.out.println(prop.getValue("query_addComment"));
			try {
				this.pstmt = con.prepareStatement(prop.getValue("query_addComment"), PreparedStatement.RETURN_GENERATED_KEYS);
				this.pstmt.setInt(1,card_id);
				this.pstmt.setInt(2,user_id);
				this.pstmt.setString(3,comment_text);		
				this.pstmt.executeUpdate();
				
				this.rs = this.pstmt.getGeneratedKeys();
				
				if(this.rs.next()) {
					id=this.rs.getInt(1);
					System.out.println(id);
				}
				
			} catch (SQLException e) {
				System.out.println(e. getMessage());
				e.printStackTrace();
			}
			return id;
		}
		
		public void deleteComment(Integer comment_id) {
	        System.out.println(prop.getValue("query_deleteComment"));
	                delete(comment_id, prop.getValue("query_deleteComment"));
		}
		
		//------ UPPDATE COMMENT --------------
		
		public void updateComment(Integer comment_id, String comment_text) {
			System.out.println(prop.getValue("query_updateComment"));
			try {
				this.pstmt = con.prepareStatement(prop.getValue("query_updateComment"));
				this.pstmt.setString(1,comment_text);
				this.pstmt.setInt(2,comment_id);				
				this.pstmt.executeUpdate();
			} catch (SQLException e) {
				System.out.println(e. getMessage());
				e.printStackTrace();
			}
	    }
	
	//----- GENERAL FUNTIONS -----
        
	public void delete(Integer id, String query) {
		try {
			this.pstmt = con.prepareStatement(query);
			this.pstmt.setInt(1,id);
			this.pstmt.executeUpdate();
		} catch (SQLException e) {
			System.out.println(e. getMessage());
			e.printStackTrace();
		}
	}
    
    public void update(Integer id, String newName, String query) {
		try {
			this.pstmt = con.prepareStatement(query);
			this.pstmt.setString(1,newName);
			this.pstmt.setInt(2,id);
			this.pstmt.executeUpdate();
		} catch (SQLException e) {
			System.out.println(e. getMessage());
			e.printStackTrace();
		}
    }
    
    public Object[][] data(Integer id, String query) {
    	Object array[][]=null;
		System.out.println(query);
		try {
			this.pstmt = this.con.prepareStatement(query, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		    this.pstmt.setInt(1, id);
			this.rs = this.pstmt.executeQuery();
			rs.last();
			ResultSetMetaData rsmd = rs.getMetaData();
			int numCols = rsmd.getColumnCount();
			int numFils = rs.getRow();
			array = new Object[numFils][numCols];
			rs.beforeFirst();
			int j=0;
			while(rs.next()) {
				for(int i = 0; i<numCols;i++) {
					array[j][i]=rs.getObject(i+1);
				}
				j++;
			}
			} catch (Exception e) {
				e.printStackTrace();
			}
		return array;
	}
    
    public int getItem(Integer int_id, String name, String query, String string_id) {
		int id=0;
		System.out.println(query);
		try {
			this.pstmt = this.con.prepareStatement(query);
		    this.pstmt.setInt(1, int_id);
		    this.pstmt.setString(2, name);
			this.rs = this.pstmt.executeQuery();
				while (this.rs.next()) 		
					id = this.rs.getInt(string_id);
					System.out.println(id);
				return id;
			} catch (Exception e) {
				e.printStackTrace();
			}
		return id;
	}
    
}
