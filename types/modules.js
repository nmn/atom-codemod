/* eslint-disable */
/* @flow */


declare type Editor = {
  getText(): string;
  setText(code: string): void;
};

declare var atom: {
  workspace: {
    getActiveTextEditor(): ?Editor;
  };
  commands: {
    add(context: string, commands: {[key: string]: Function}): Object;
  };
};

declare module 'atom' {
  declare var Range: any;
  declare class CompositeDisposable {
    add(subs: Object): void;
    dispose(): void;
  }
}
