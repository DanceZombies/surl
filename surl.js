/**
 * Created by gaoq on 17/8/8.
 */
var _ = require('lodash'), co = require('co'), rp = require('request-promise');

//新浪开放平台的APPId
const sina_appId = '1681459862';
//有关新浪生成短连接的函数有两种地址，默认使用第一种吧
const sina_url = 'http://api.t.sina.com.cn/short_url/shorten.json';
//sina_url = 'https://api.weibo.com/2/short_url/shorten.json';

/*构造函数 server_url为服务器地址 可以不传*/
function surl(app_id, server_url) {
    if (appId) sina_appId = app_id;
    if (server_url) sina_url = server_url;
}

function doRest(options) {
    return co(function*() {
        options.method = options.method || 'GET';
        options.timeout = 10000;
        options.useQuerystring = true;
        options.json = true;
        options.qs = _.extend({source: sina_appId}, options.qs);
        options.uri = sina_url;
        return yield rp(options);
    }).catch(err => {
        return err.error;
    })
}

function getUrlKey(url) {
    if (url) return url.substring(url.lastIndexOf('/') + 1);
    return url;
}

//获取url
surl.getUrl = function (long_url) {
    return co(function*() {
        var result = yield doRest({
            qs: {url_long: long_url}
        });
        if (result.length > 0) {
            var ret = result[0];
            ret.url_key = getUrlKey(ret.url_short);
            return ret;
        }
        return null;
    }).catch(err => {
        return err;
    });
};
//批量获取url
surl.getUrls = function (long_urls) {
    return co(function*() {
        var result = yield doRest({
            qs: {url_long: long_urls}
        });
        if (result.length > 0) {
            for(var i = 0;i<result.length;i++){
                result[i].url_key = getUrlKey(result[i].url_short);
            }
            return result;
        }
        return null;
    }).catch(err => {
        return err;
    });
};
module.exports = surl;
