package com.itheima.mapper;

import com.itheima.domain.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface UserMapper {


    /**
     * 根据微信的openid 查询用户
     * @param openid
     * @return
     */
    @Select("select * from user where openid = #{openid}")
    User findByOpenid(String openid);

    @Insert("insert into user values(null,#{nickName},#{avatarUrl},#{openid},#{topScore})")
    void insert(User user);

    @Update("update user set topScore = #{topScore} where openid=#{openid} and #{topScore} > topScore")
    void updateScore(User user);


}
