declare interface ReactMixin {
  (componentPrototype: React.Component<any, any>, mixin: any): void;
  onClass: (componentClass: React.ComponentClass<any>, mixin: any) => void;
  decorate: (mixin: any) => ClassDecorator;
}

declare const reactMixin: ReactMixin;
