/**
 * Created by chaijiang on 2017/11/7.
 */
function util() {

}
//获取查询字符串的参数
util.prototype.getparam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
},

module.exports = new util()