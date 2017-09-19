oa办公系统

使用webpack，react，ant desidn，react-redux开发，

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