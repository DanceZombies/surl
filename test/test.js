var surl = require('../surl.js');
var co = require('co');

describe('生成单个/多个url', function () {
    it('should without error', function (done) {
        co(function*() {
            var ret = yield surl.getUrl('http://www.baidu.com');
            console.log(ret);
            done();
        }).catch(err => {
            console.error(err);
        })
    })

    it('should without error', function (done) {
        co(function*() {
            var ret = yield surl.getUrls(['http://www.google.hk', 'http://www.360.cn', 'http://www.sina.cn']);
            console.log(ret);
            done();
        }).catch(err => {
            console.error(err);
        })
    })
});
