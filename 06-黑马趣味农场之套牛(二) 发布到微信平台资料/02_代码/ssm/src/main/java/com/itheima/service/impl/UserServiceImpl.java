package com.itheima.service.impl;

import com.itheima.domain.User;
import com.itheima.mapper.UserMapper;
import com.itheima.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public User findByOpenid(String openid) {
        return userMapper.findByOpenid(openid);
    }

    @Override
    public void insert(User user) {
        userMapper.insert(user);
    }

    @Override
    public void updateScore(User user) {
        userMapper.updateScore(user);
    }


}
