# Pure CSS Float Labels Input Web Component
This is using the CSS from [Anton Staroverov](https://github.com/tonystar/float-label-css). It can be applied to other form controls, I just happened to do `<input>`.

There is both a shadow DOM and non-shadow DOM version. The main difference is that the components don't share CSS in the shadow DOM version. Some people would differentiate by calling the one a Custom Componenet and the other a Custom Element.

The main pro of a Custom Component is that it's completely isolated and self-sufficient. If the outer page changes, the Component remains the same

The main pro of a Custom Element is that the browser only needs to parse the CSS once. If you have a *lot* of instances of the exact same component, it might be useful to make it an element instead, especially if it's CSS intensive.

Everything I've said has been me talking out of my butt and I don't know how browsers work. Thank you for coming to my GIT talk.

MIT license and whatever.
