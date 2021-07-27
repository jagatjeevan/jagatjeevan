---
title: 'Styled Component'
date: '2021-07-26'
description: 'CSS in JS. Moving away from SCSS.'
tags: ['css in js', 'styled-component']
---

## CSS in JS.

I am assigned to a (NEXTJS)project which uses a styled component for styling the components in the project. I have been liking CSS(scss) way till now and have a good grasp on it. I know how to get things done and have a solid grip on SCSS.
But then I decided to try it out and read about it. Here is my experience with styled components. Moving away from scss.

## Motivation

- Automatic Critical CSS: Only CSS which is required is loaded.
- No class name bugs: No spelling mistakes, class names overlap
- Easier Deletion of CSS: It moves along with the code. It is easy to delete when the component is not required.
- Simple dynamic styling: adapting to the style of the component via props or global theme
- Automatic vendor prefixes: Though the majority of the browsers are up to date with the styling, there could be some recent behaviour that is being used it the website for aesthetics which the programmer need not worry about.

## Background

The styled component generates a simple React component. Let us see how things work in the background. Let us split our understanding into various parts:

### Template literals/strings:

These are great with concatenations and good with reading.

```
// Template strings
const string = `I am a template literal`;
// Template expression
const expressions = 'dynamic values';
const string = `I can contain ${expressions}`;
```

### Function invoking:

The two ways of invoking a function are the traditional way and using a Tagged Template.

```
function printMessage() { return `This is a simple message`; }
// Function calling
printMessage();
// Tagged Template
printMessage``;
```

### Function invoking with params in a tagged template:

```
const printArguments = (...args) => { console.log(...args); }
const var1 = "my";
const var2 = "message"
printArguments`This is ${var1} custom ${var2}!`;
//   ["This is "," custom ","!"],
//   "my",
//   "message"
```

The tagged template would take arguments in a string and variables which get replaced and returned as a string. In some cases, the function would return another function rather than a plain string. This is achieved using currying.

```
const multiply = (multiple) => (num) => parseInt(num[0]) * parseInt(multiple[0]);
const double = multiply`2`;
const result = double`4`;
console.log(result);  // >>> 8
```

### Summing up all these to React Component:

```
const withGreeting = ([greeting]) => ({ name }) => <h1>{greeting}, {name}!</h1>;
const Greet = withGreeting`greeting`;
// Render component
<Greet name="Chris" />
// Renders in DOM
<h1>Greetings, Chris</h1>
```

Let us see a sample styled-components

```
const Greet = styled.h1`
	background: blue;
`;
<Greet>Some text</Greet>
```

On a high level, this is how styled components would work.

## Getting started

### Installation

```
npm install styled-components
npm install babel-plugin-styled-components // This is used for using it with babel.
```

```
.babelrc {
 "presets": ["next/babel"],
 "plugins": [["styled-components", { "ssr": true }]]
}
```

It has a peer dependency on react 16.3. So make sure you are using the correct version of React and React-dom. Since I am using NextJs I have the preset as "next/babel". You could use relevant presets for your project.

### A simple styled component

```
const Title = styled.h1`
font-size: 1.2rem;
color: #435;
`;
<Title>Here goes the title</Title>
```

### Variation of the component using props

Styled components are simple React components and can accept props for variations.

```
const Button = styled.button`
	background: ${ props => props.primary ? “red” : “white” };
	color: ${ props => props.primary ? “white” : “red” };
`;
```

### Additional props and inheriting

```
const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.size || "1em",
}))`
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

const Password = styled(Input).attrs(props => {type: 'password'})`
  border: 2px solid aqua;
`
```

### Extending styled-components

```
const TomatoButton = styled(Button)`
  background: tomato;
  color: #369;
`;
```

### Replacing a tag

```
<Button as "a" href="http://www.google.co.in">Link to Google</Button>
```

Sometimes we need a different tag and should have the same styles. The above example cites how to use styled-components for the same.

### Creating a global style

While in a project, you would require some global styles used across pages. In that case, you need to create global styles. You could create like the below example.

```
import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`
:root {... css variables}
html, body { ...style goes here }
`
On the entry-level component, we import GlobalStyle.
<GlobalStyle />
```

### Pseudo selectors and "&"

Much like scss, it has nested rules. We use '&' to refer to the parent in the nesting rules.

```
const Para = styled.p`
  font-size: 16px;
  &::selection { background: #369; color: #fff; }
  .currency { font-family: unicode; }
  .something-else & { padding: 10px; }
`;
```

### Animations

```
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotat(360deg); }
`;
const Rotate = styled.div`
  animation: ${rotate} 2s linear infinite;
`;
```

### Keyframes

Keyframes are inserted lazily into DOM and hence required "CSS helper" to have styles attached.

```
import styled, { css, keyframes } from 'styled-components'
const animation = keyframes`
  0% {
    opacity: 0;
  }
  100 {
    opacity: 1;
  }
`
const animationRule = css`
  ${animation} 1s infinite alternate;
`
const Component = styled.div`
  animation: ${animationRule};
`
```

### Media queries and nesting

```
const ColorChanger = styled.section`
  background: papayawhip;
  color: palevioletred;

  @media(min-width: 768px) {
    background: mediumseagreen;
    color: papayawhip;
  }

  div {
    padding: 10px;
  }
`;
```

### Overriding styles

```
const MyStyledComponent = styled(AlreadyStyledComponent)`
  &&& {
    color: palevioletred;
    font-weight: bold;
  }
`
// Output would be
.MyStyledComponent-asdf123.MyStyledComponent-asdf123.MyStyledComponent-asdf123 {
  color: palevioletred;
  font-weight: bold;
}
```

This would just increase the specificity of the style to get implemented.

### For overriding inline styles

```
const MyStyledComponent = styled(InlineStyledComponent)`
  &[style] {
    font-size: 12px !important;
    color: blue !important;
  }
`
```

### Creating a theme

Using the Context API from React, styled-component provides customizing the theme with the "ThemeProvider" component.

```
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

Button.defaultProps = {
  theme: {
    main: "palevioletred"
  }
}

const theme = {
  main: "mediumseagreen"
};

render(
  <ThemeProvider theme={theme}>
    <Button>Themed</Button>
  </ThemeProvider>
);
```

## Resources

- https://styled-components.com
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
- https://rangle.io/blog/styled-components-styled-systems-and-how-they-work/
