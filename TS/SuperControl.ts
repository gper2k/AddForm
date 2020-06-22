declare var jQuery: any;
const $ = jQuery;

namespace SuperControl {
    export enum ControlTypes{ text="text", password="password" }
    export interface IControl {
        id:string;
        name:string;
        title:string;
        target: Element;
        type:ControlTypes;
        value:string;
        bind():void;
    }


    export class Starter {
        items : Array<IControl> = [];

        constructor()
        {
            this.bind("body");
        }
        bind(selecter:string):Starter {
            const sc = this;
            $(selecter).find("super").each(function(){
                const elm = this;
                const type = elm.attributes["type"] == undefined ? ControlTypes.text : ControlTypes[elm.attributes["type"].value];
                if(sc.items.some(p => p.target == elm))
                    sc.items.splice(sc.items.findIndex(p => p.target == elm), 1);                
                
                switch(type) {
                    default:
                        sc.items.push(new TextBox(elm));
                        break;
                }
            });
            return this;
        }
    }
    function addAttr(node:Element, attName:string, value:any):any {
        var wrap = $(node);
        if(wrap.attr(attName) != value) wrap.attr(attName, value == undefined ? "" : value);
        return wrap.attr(attName);
    }
    function addTag(node:Element, selecter:string, creater:() => string):Element {
        var wrap = $(node);
        if(wrap.children(selecter).length <= 0) wrap.append(creater());
        return wrap.children(selecter).get(0);
    }
    const addTitle = (ctl:IControl) => addTag(ctl.target, "super-header", () => `<super-header>${ctl.title}</super-header>`);

    export class TextBox implements IControl {
        id:string;
        name:string;
        title:string;
        wrap:any;
        type:ControlTypes = ControlTypes.text;
        value:string;

        constructor(public target:Element)
        {
            this.wrap = $(target);
            this.id = this.wrap.attr("id");
            this.title = this.wrap.attr("title");
            this.name = this.wrap.attr("name");
            this.value = this.wrap.attr("value");
            this.bind();
        }

        bind():void {
            addTitle(this);
            const tWrap = addTag(this.target, "super-body", () => `<super-body></super-body>`);
            const tInp = addTag(tWrap, "input[type=text]", () => `<input type="text" value="${ this.value == undefined ? "" : this.value}" />`);
            addAttr(tInp, "id", this.id);
            addAttr(tInp, "name", this.name);
        }
    }
}
  