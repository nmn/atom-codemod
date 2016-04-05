/* @flow */
'use babel'

import {CompositeDisposable} from 'atom'
import {transform} from 'babel-core'

const plugins = [
  require('babel-plugin-syntax-async-functions'),
  require('babel-plugin-syntax-async-generators'),
  require('babel-plugin-syntax-class-constructor-call'),
  require('babel-plugin-syntax-class-properties'),
  require('babel-plugin-syntax-decorators'),
  require('babel-plugin-syntax-do-expressions'),
  require('babel-plugin-syntax-exponentiation-operator'),
  require('babel-plugin-syntax-export-extensions'),
  require('babel-plugin-syntax-flow'),
  require('babel-plugin-syntax-function-bind'),
  require('babel-plugin-syntax-function-sent'),
  require('babel-plugin-syntax-jsx'),
  require('babel-plugin-syntax-object-rest-spread'),
  require('babel-plugin-syntax-trailing-function-commas')
]

export default {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(
      atom.commands.add(
        'atom-workspace',
        {
          'atom-codemod:flow-comment': this.commentFlow.bind(this),
          'atom-codemod:flow-strip': this.stripFlow.bind(this)
        }
      )
    )
    console.log('[atom-codemod] activated')
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
      editor.setText(transform(code, {
        plugins: [...plugins, str]
      }).code)
    } catch (e) {
      console.log('[flow-comments] Parsing error')
      console.log(e)
      return
    }
  },

  commentFlow () {
    this.applyPlugin(require('babel-plugin-transform-flow-comments'))
  },

  stripFlow () {
    this.applyPlugin(require('babel-plugin-transform-flow-strip-types'))
  }
}
