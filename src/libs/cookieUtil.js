// cookie读写封装
const cookieUtil = {
    get:(name)=>{
        let cookieName = encodeURIComponent(name)+'=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if(cookieStart > -1){
            let cookieEnd = document.cookie.indexOf(';',cookieStart);
            if(cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd))
        }
        return cookieValue;
    },
    set:(name,value,expires,path,domain,secure)=> {
        let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += ";expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += ";path=" + path;
        }

        if (secure) {
            cookieText += ";secure=" + secure;
        }
        document.cookie = cookieText;
    },
    unset:(name,path,domain,secure)=>{
        cookieUtil.set(name,'',new Date(0),path,domain,secure);
    }

};
export default cookieUtil;
/*
//如果帐号密码不是larry 123就重置为larry 123
if(cookieUtil.get('userName') !== 'larry' && cookieUtil.get('password') !== '123'){
    console.log('reset')
    cookieUtil.set('userName','larry')
    cookieUtil.set('password','123')
}*/
