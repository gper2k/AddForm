var $ = jQuery;
var SuperControl;
(function (SuperControl) {
    var ControlTypes;
    (function (ControlTypes) {
        ControlTypes["text"] = "text";
        ControlTypes["password"] = "password";
    })(ControlTypes = SuperControl.ControlTypes || (SuperControl.ControlTypes = {}));
    var Starter = (function () {
        function Starter() {
            this.items = [];
            this.bind("body");
        }
        Starter.prototype.bind = function (selecter) {
            var sc = this;
            $(selecter).find("super").each(function () {
            });
            return this;
        };
        return Starter;
    }());
    SuperControl.Starter = Starter;
    function addAttr(node, attName, value) {
        var wrap = $(node);
        if (wrap.attr(attName) != value)
            wrap.attr(attName, value == undefined ? "" : value);
        return wrap.attr(attName);
    }
    function addTag(node, selecter, creater) {
        var wrap = $(node);
        if (wrap.children(selecter).length <= 0)
            wrap.append(creater());
        return wrap.children(selecter).get(0);
    }
    var addTitle = function (ctl) { return addTag(ctl.target, "super-header", function () { return "<super-header>" + ctl.title + "</super-header>"; }); };
    var TextBox = (function () {
        function TextBox(target) {
            this.target = target;
            this.type = ControlTypes.text;
            this.wrap = $(target);
            this.id = this.wrap.attr("id");
            this.title = this.wrap.attr("title");
            this.name = this.wrap.attr("name");
            this.value = this.wrap.attr("value");
            this.bind();
        }
        TextBox.prototype.bind = function () {
        };
        return TextBox;
    }());
    SuperControl.TextBox = TextBox;
})(SuperControl || (SuperControl = {}));
//# sourceMappingURL=SuperControl.js.map