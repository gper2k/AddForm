declare var jQuery: any;
declare const $: any;
declare namespace SuperControl {
    enum ControlTypes {
        text = "text",
        password = "password"
    }
    interface IControl {
        id: string;
        name: string;
        title: string;
        target: Element;
        type: ControlTypes;
    }
    class Starter {
        items: Array<IControl>;
        constructor();
        bind(selecter: string): Starter;
    }
    class TextBox implements IControl {
        target: Element;
        id: string;
        name: string;
        title: string;
        wrap: any;
        type: ControlTypes;
        constructor(target: Element);
    }
}
