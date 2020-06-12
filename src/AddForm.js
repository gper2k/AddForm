var af = {};
(function ($) {
    $(document).ready(function () {
        af.bind(this);
        $("body").bind("click", function () {
            $("slot.selectbox").each(function () {
                let self = $(this);
                if (self.hasClass("active")) self.removeClass("active");
                else self.children(".drop-down.open").removeClass("open");
            });
        });
    });
    af.bind = function (wrap) {
        $(wrap).find("fieldset > slot > select").selectBox();
    };
    function isNull(obj) { return (typeof obj != "undefined" && obj != null && $.trim(obj.toString()) != "") ? false : true; }
    function wrapBind(obj, tagName, cssName)
    {
         self = $(obj);
         wrap = self.parent(tagName);
        if (wrap.length <= 0) {
            self.wrap('<' + tagName + ' class="' + cssName + '"></' + tagName + '>');
            wrap = self.parent(tagName + "." + cssName);
        } else wrap.addClass(cssName);

         css = !isNull(self.attr("class")) ? self.attr("class").split(" ") : [];
        for ( i = 0; i < css.length; i++) if (!isNull(css[i])) wrap.addClass(css[i]);
        if (!isNull(self.attr("style"))) wrap.attr("style", self.attr("style"))
        return wrap;
    }
    function childBind(wrap, tagName, selectName, classNames) {
        var item = wrap.children(selectName);
        if (item.length <= 0) {
            item = $('<'+ tagName + '></' + tagName + '>');
            if (!isNull(classNames)) {
                var css = classNames.split(',');
                for (var i = 0; i < css.length; i++) if (!isNull(css[i])) item.addClass(css[i]);
            }
            wrap.append(item);
        }
        return item;
    }
    $.fn.selectBox = function () {
        return this.each(function () {
            var self = $(this);
            var wrap = wrapBind(this, "slot", "selectbox");
            var txt = childBind(wrap, "span", "span");
            var lst = childBind(wrap, "ul", "ul.drop-down", "drop-down").empty();
            var options = this.options;
            var isMulti = this.multiple;
            var txtBind = function () {
                var temp = "";
                for (var i = 0; i < options.length; i++) {
                    var checked = options[i].selected;
                    if (checked) {
                        temp += (isNull(temp) ? "" : ", ") + options[i].text;
                        lst.children(":eq(" + i + ")").addClass("active");
                    } else lst.children(":eq(" + i + ")").removeClass("active");
                }
                txt.text(temp);
            }
            wrap.attr("title", self.attr("title")).attr("style", self.attr("style"));
            if (isMulti) wrap.addClass("multiple");

            for (var i = 0; i < options.length; i++) {
                var item = options[i];
                var opt = $('<li data-val="' + item.value + '">' + item.text + '</li>').data("target", item);
                lst.append(opt);
                opt.bind("click", function () {
                    var current = $(this);
                    
                    current.data("target").selected = isMulti ? !current.data("target").selected : true;
                    txtBind();
                    self.trigger("change");
                    if (isMulti) { return false; }
                });
                txtBind();
            }

            wrap.unbind("click.af").bind("click.af", function () {
                if (self.parent().parent().get(0).disabled) wrap.children("ul.drop-down").removeClass("open");
                else wrap.addClass("active").children("ul.drop-down").toggleClass("open");
            });

            lst.addClass("open");
            if ($(document.body).height() < lst.offset().top + lst.outerHeight()) wrap.addClass("up");
            lst.removeClass("open");
        });
    }
})(jQuery);