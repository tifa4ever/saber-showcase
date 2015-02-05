/**
 * @file list列表View基类
 * @author saber team
 */

var extend = require('saber-lang').extend;
var inherits = require('saber-lang').inherits;
var BaseView = require('saber-mm').View;

var domEvents = {
    'click: .news-list-more': function (ele) {
        var dom = require('saber-dom');
        if (!dom.hasClass(ele, 'loading')) {
            dom.addClass(ele, 'loading');
            this.emit('more');
        }
    }
};

function View(options) {
    options = options || {};
    extend(domEvents, options.domEvents || {});
    options.domEvents = domEvents;

    BaseView.call(this, options);
}

inherits(View, BaseView);

View.prototype.add = function (data) {
    var dom = require('saber-dom');
    var moreBtn = this.query('.news-list-more');
    dom.removeClass(moreBtn, 'loading');
    dom[data.more ? 'show' : 'hide'](moreBtn);

    var container = this.query('.news-list');
    container.innerHTML += this.template.render('newsList', data);
};

module.exports = View;