/* @flow */
'use babel'

import {CompositeDisposable} from 'atom'
import babel from 'babel-core'

const plugins = [
  'syntax-async-functions',
  'syntax-async-generators',
  'syntax-class-constructor-call',
  'syntax-class-properties',
  'syntax-decorators',
  'syntax-do-expressions',
  'syntax-exponentiation-operator',
  'syntax-export-extensions',
  'syntax-flow',
  'syntax-function-bind',
  'syntax-function-sent',
  'syntax-jsx',
  'syntax-object-rest-spread',
  'syntax-trailing-function-commas'
]

export default {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(
      'atom-workspace',
      {
        'atom-codemod:flow-comment': this.commentFlow.bind(this),
        'atom-codemod:flow-strip': this.stripFlow.bind(this)
      }
    )
    console.log('[simple-codemod] activated')
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  applyPlugin (str: string) {
    const editor = atom.workspace.getActiveTextEditor()
    if (!editor) {
      return
    }
    const code = editor.getText()
    try {
      editor.setText(babel.transformFileSync(code, {
        plugins: [...plugins, str]
      }).code)
    } catch (e) {
      console.log('[flow-comments] Parsing error')
      console.log(e)
      return
    }
  },

  commentFlow () {
    console.log('commentFlow')
    this.applyPlugin('transform-flow-comments')
  },

  stripFlow () {
    console.log('stripFlow')
    this.applyPlugin('transform-flow-strip-types')
  }
}
