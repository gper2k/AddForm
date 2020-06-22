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
                var elm = this;
                var type = elm.attributes["type"] == undefined ? ControlTypes.text : ControlTypes[elm.attributes["type"].value];
                if (sc.items.some(function (p) { return p.target == elm; }))
                    sc.items.splice(sc.items.findIndex(function (p) { return p.target == elm; }), 1);
                switch (type) {
                    default:
                        sc.items.push(new TextBox(elm));
                        break;
                }
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
            var _this = this;
            addTitle(this);
            var tWrap = addTag(this.target, "super-body", function () { return "<super-body></super-body>"; });
            var tInp = addTag(tWrap, "input[type=text]", function () { return "<input type=\"text\" value=\"" + (_this.value == undefined ? "" : _this.value) + "\" />"; });
            addAttr(tInp, "id", this.id);
            addAttr(tInp, "name", this.name);
        };
        return TextBox;
    }());
    SuperControl.TextBox = TextBox;
})(SuperControl || (SuperControl = {}));
//# sourceMappingURL=SuperControl.js.map