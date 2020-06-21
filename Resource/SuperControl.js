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
            var self = this;
            $(selecter).find("super").each(function () {
                var elm = this;
                var type = elm.attributes["type"] == undefined ? ControlTypes.text : ControlTypes[elm.attributes["type"].value];
                switch (type) {
                    default:
                        self.items.push(new TextBox(elm));
                        break;
                }
            });
            return this;
        };
        return Starter;
    }());
    SuperControl.Starter = Starter;
    var TextBox = (function () {
        function TextBox(target) {
            this.target = target;
            this.type = ControlTypes.text;
            this.wrap = $(target);
            this.id = this.wrap.attr("id");
            this.title = this.wrap.attr("title");
            this.name = this.wrap.attr("name");
            console.log(this);
        }
        return TextBox;
    }());
    SuperControl.TextBox = TextBox;
})(SuperControl || (SuperControl = {}));
//# sourceMappingURL=SuperControl.js.map