# oa办公系统

前端使用webpack，react，ant desidn，react-redux开发，
后端同事提供，环境是tomcat7.x，开发语言java，目录结构:
资源文件：ROOT/resouces/.js | .css
页面：ROOT/WEB-INF/page/oa/.html

2017.09.14
由于使用redux过程中遇到redux更新状态后，视图没有刷新的梗，
暂时没有解决，故使用回掉函数来取子孙组件的值作为临时方案。
后续会全局改用redux

2017.09.15
以全局修改为redux来控制状态，昨天redux状态更新后视图没有更新的原因是
没有引用connect连接后返回的组件，如App1 = connect(state)(App),
应使用<App1/>而非<App/>

2017.09.19
登录，注册，主页等页面使用react-router-dom进行页面跳转控制；
记住密码逻辑实现

2017.09.20
登录模块对接后台完成，工作任务模块对接完成30%，
后台接口数据不全，等待后台修改接口

2017.09.21
工作任务模块对接完成。
实现添加任务，筛选任务等功能

2017.09.22
我的工作分为两个模块：我的任务和我的分配，后台也增加相应的接口
原我的工作迁移到我的任务，
我的分配对接完成（未测试）。

2017.09.25
增加工作任务状态修改；将状态中的‘不通过’修改为‘审核中’；
状态码更改

2017.09.27
新增操作记录查询，目前是当前用户对任务的所有操作记录
我的分配测试并修改完成
新增任务提后不可再次提交，
这里有个需求确认：如需要操作后实时反馈状态数据需要再次请求获取数据

2017.09.28
前端路由支持，修复刷新出现404问题
自动登陆完成
多用户对接完成

2017.10.11
由于数据请求使用的是fetch，在ie或其他老版本浏览器中出现Promise或fetch未定义或部分新的API使用不了的情况
解决办法：使用babel-polyfill，whatwg-fetch解决，安装完成后在入口处配置即可

点浏览器自带返回键后，url所传的参数变成[Object Object]是的从url获取的参数不正确导致数据请求不到，有待修复
此问题已修复

2017.10.17
优化任务列表页鼠标显示以及修复任务右侧点击范围扩大bug


我的任务
![](https://github.com/Larryliuy/oa/tree/master/screenshots/myTask.png)
我的分配
![](https://github.com/Larryliuy/oa/tree/master/screenshots/allocate.png)
审批
![](https://github.com/Larryliuy/oa/tree/master/screenshots/approval.png)
操作记录
![](https://github.com/Larryliuy/oa/tree/master/screenshots/record.png)
