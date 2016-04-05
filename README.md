# atom-codemod

A very straightforward package that wraps babel plugins in simple commands.

Currently, it is limited to flow type annotations.

You can easily:
1. Wrap all your flow types annotations in *flowtate* comments
2. Strip all flow types from your code.

The plugin simply works on the Currently active file. Even if it is unsaved.

## Keyboard Short cuts.
`ctrl-alt-f ctrl-alt-c`: Comment out flow annotations
`ctrl-alt-f ctrl-alt-s`: Strip out flow annotations
