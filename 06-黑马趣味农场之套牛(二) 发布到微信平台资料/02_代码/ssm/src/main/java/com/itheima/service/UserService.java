package com.itheima.service;

import com.itheima.domain.User;

public interface UserService {

    User findByOpenid(String openid);


    void insert(User user);

    void updateScore(User user);

}
