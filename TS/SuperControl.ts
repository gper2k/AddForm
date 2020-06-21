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
    }

    export class Starter {
        items : Array<IControl> = [];

        constructor()
        {
            this.bind("body");
        }
        bind(selecter:string):Starter {
            const self = this;
            $(selecter).find("super").each(function(){
                const elm = this;
                const type = elm.attributes["type"] == undefined ? ControlTypes.text : ControlTypes[elm.attributes["type"].value];
                
                switch(type){

                    default:
                        self.items.push(new TextBox(elm));
                        break;
                }
            });
            return this;
        }
    }

    export class TextBox implements IControl {
        id:string;
        name:string;
        title:string;
        wrap:any;
        type:ControlTypes = ControlTypes.text;

        constructor(public target:Element)
        {
            this.wrap = $(target);
            this.id = this.wrap.attr("id");
            this.title = this.wrap.attr("title");
            this.name = this.wrap.attr("name");
            console.log(this);
        }
    }
}
  