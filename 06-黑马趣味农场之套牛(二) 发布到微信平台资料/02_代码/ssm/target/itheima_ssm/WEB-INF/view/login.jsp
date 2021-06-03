<%--
  Created by IntelliJ IDEA.
  User: le
  Date: 2019/10/20
  Time: 22:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<form action="${pageContext.request.contextPath}/user/login" method="post" style="width: 300px;margin: 150px auto;">
    <h1>欢迎登录</h1>
    <p>用户名：<input name="username" style="height: 28px;width: 150px"></p>
    <p>密&emsp;码：<input name="password" type="password" style="height: 28px;width: 150px"></p>
    <p><input type="submit" value="登      录" style="height:28px;width: 215px;"> </p>
</form>

</body>
</html>
