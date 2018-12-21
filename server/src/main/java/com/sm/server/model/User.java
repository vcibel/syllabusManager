package com.sm.server.model;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
    @Column
    private String name;
    @Column
    private String lastname;
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private int type_user_id;
    @Column
    private String created_at;

    public int getId() {
        return user_id;
    }

    public void setId(int user_id) {
        this.user_id = user_id;
    }

    public String getFirstName() {
        return name;
    }

    public void setFirstName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastname;
    }

    public void setLastName(String lastname) {
        this.lastname = lastname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getTypeUserId() {
        return type_user_id;
    }

    public void setTypeUserId(int type_user_id) {
        this.type_user_id = type_user_id;
    }

    public String getCreatedDate() {
        return created_at;
    }

    public void setCreatedDate(String created_at) {
        this.created_at = created_at;
    }
}
