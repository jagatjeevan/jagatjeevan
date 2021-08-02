---
title: 'React Testing library'
date: '2021-08-02'
description: 'Testing an application the way user would see and interact with the pages. Making the test more maintainable.'
tags: ['testing', 'unit testing', 'react testing']
---

## React Testing library(RTL)

React testing library is built on `DOM Testing Library` by adding APIs working for React Components.
Generally we write test on the implementational level which is very difficult to maintain in the long run. If we test a functionality in a way the user would use the application, the test would be very effective. This means we are not testing the implementation.

### Phillosophy

- Write the test user (user along with screen readers) would see the application. It does not care about what is written inside the code.
  - Do not test the implementational details. Test the behaviour.
  - This would give a maintainability of the test cases.
  - Refactor becomes easy.
- Find elements by accessibility. This is how screen readers would read the page. You are testing the accessibility as well.

### Cons

RTL believes the pros over weigh the cons and gives more confidence to moving the code to production.
It is built on top of `react-dom` and `react-dom/test-utils` and provides light utility functions to encourage better testing practice.

## Installation:

It comes with `create-react-app` but if you want to install separately to a project,

```
- npm install --save-dev @testing-library/react
- yarn add --dev @testing-library/react
```

This library has a peer dependency on `react` and `react-dom`
Optional : You can install `@testing-library/jest-dom` so you can use the custom jest matcher.

### Some Issues faced:

- Incase you have a dependency on 16.8, there would be a warning, `component not wrapped in act`, can be suppressed.
- While running coverage, Error was `Nothing was returned from render`, while test was working fine.
  - Upgraded testing-library/react 10.0.4, testing-library/user-event 10.1.0, testing-library/jest-dom 5.5.0
  - Added jest-environment-jsdom-sixteen to 1.0.3
  - https://github.com/facebook/jest/issues/9723

## How does RTL work under the hood

For testing, RTL

- Creates a virtual DOM before each test case.
- Finds elements in the virtual DOM using a global object called “screen”
- `screen.debug` would give the DOM construct in the console.
- Interacts with the virtual DOM for the test case scenarios
- It uses “src/setupTests.js” where it initialises jest-dom for test cases to use jest matchers.

**Note:**

Test only fails when the test matcher throws an error. Test would still pass if there is no test written inside a test case.

## Selecting Elements

In order to assert, we need to select elements first. There are 3 ways :

- queryBy\* : returns element or null if element not found
- getBy\* : returns element or throw error if not found
- findBy\* : used when there is asynchronous element

**Note**
To select multiple elements, use `All` in the query method like, queryAllBy*, getAllBy*, findAllBy\*

Variants of elements and selecting ways

- Text : <p>Some text</p>
- LabelText : <label>Some text</label>
- PlaceholderText : <input type="text" placeholder="some text" />
- AltText : <img alt="some text" />
- DisplayValue : <input value="some value" />
- TestId : <div data-testid="some-value"></div>

```
// Component
import React from 'react';
function App() {
  return (
    <div>
      <label for="search">Search:</label>
      <input type="text" id="search" />
    </div>
  );
}
export default App;

// Testing
import {render, screen} from '@testing-library/react';
... All the import statements

describe('App', () => {
  test("Find the search text", () => {
    render(<app />);
    expect(screen.getByText(/Search:/)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
```

## Assertion

All the assertion are from jest. However, RTL extends from jest to give more meaningful assertion. Full list [here](https://github.com/testing-library/jest-dom).

## Testing User Events

RTL has `fireEvent` to trigger user interaction. FireEvent takes a node and the event. We could use it in either ways : `fireEvent(node: HTMLElement, event: Event);` or `fireEvent(EventName)(HTMLElement, EventProperties);`

```
import { screen, render, fireEvent } from '@testing-library/react';
... All the other imports goes here

describe("testing the earlier label and text", () => {
  test("expect the input to be in the document", () => {
    render(<App />);
    expect(screen.queryByLabelText(/some label/)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/search here/)).toBeInTheDocument();
    expect(screen.getByRole(/Search Button/)).toBeDisabled();
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: "the changed text" }
    });
    expect(screen.getByRole(/Search Button/)).toBeEnabled();
  });
});
```

**Note**
Find the full set of events that can be used are [here](https://github.com/testing-library/dom-testing-library/blob/main/src/event-map.js).

### UserEvents

`User-event` is a companion library for Testing Library that provides more advanced simulation of browser interactions than the built-in `fireEvent` method.

```
// Installation
npm install --save-dev @testing-library/user-event
// or
yarn add @testing-library/user-event --dev
```

```
//Testing
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('click', () => {
  render(
    <div>
      <label htmlFor="checkbox">Check</label>
      <input id="checkbox" type="checkbox" />
    </div>
  )

  userEvent.click(screen.getByText('Check'))
  expect(screen.getByLabelText('Check')).toBeChecked()
})
```

### Creating an event

To get a reference of the event triggered, use 'createEvent'.

```
const myEvent = createEvent.click(node, { button: 2 })
fireEvent(node, myEvent)
// myEvent.timeStamp can be accessed just like any other properties from myEvent
```

To create a custom event

```
// simulate the 'input' event on a file input
fireEvent(
  input,
  createEvent('input', input, {
    target: { files: inputFiles },
    ...init,
  })
)
```

Mocking a event

```
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
...Other imports
jest.mock('axios');
describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
    ];
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: stories } })
    );
    render(<App />);
    await userEvent.click(screen.getByRole('button'));
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(1);
  });
});
```

## Mocking Service Worker

- Install msw : `npm i msw` or `yarn add msw`
- Create handlers : Create a file `src/mocks/handlers.js`
- Create test servers : Create a file `src/mocks/server.js`
- Make sure test is listening to all tests
  - Reset after each test

```
// Server.js
import { setupServer } from 'msw/node’;
import { handlers } from './handlers’;

export const server = setupServer(...handlers);
```

```
// handlers.js
Import { rest } from ‘msw’;
const responseHandler = (req, res, ctx) => { … code goes here };

const handlers = [
	rest.get(‘/url-to-mock’, responseHandler),
	rest.post(‘/som-other-url’, rejectHandler)
];

export default handlers;
```

```
// SetupTests.js
import { server } from './mocks/server.js’;
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())
```

```
// For multiple Ajax calls :
test(“clicking button calls multiple Ajax calls”, async () => {
	render(<App />);
	const btn = getByRole(“button”, { name: “Fetch data” });
	expect(btn).toBeEnabled();
	userEvent.click(btn);

	await waitFor(async () => {
		const dataContainer = await screen.findByRole(‘alert’);
		expect(dataContainer).toBeInTheDocument();
		expect(dataContainer).toHaveLength(2);
	});
});
```

## Context Provider Testing

Create a file called as test-utils.js

```
import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'my-ui-lib'
import { TranslationProvider } from 'my-i18n-lib'
import defaultStrings from 'i18n/en-x-default'

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme="light">
      <TranslationProvider messages={defaultStrings}>
        {children}
      </TranslationProvider>
    </ThemeProvider>
  )
}


const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

Inside a test
import { render } from ‘test-utlis’;
```

## Resources

- Udemy Course : https://thoughtworks.udemy.com/course/react-testing-library/learn/lecture/24450844#overview
- Jest getting started : https://jestjs.io/docs/getting-started
- Different types of roles from W3C : https://www.w3.org/TR/wai-aria/#role_definitions
- Jest DOM matchers : https://github.com/testing-library/jest-dom
- Testing user events : https://testing-library.com/docs/ecosystem-user-event/
- Api queries : https://testing-library.com/docs/queries/about/
- Cheatsheet : https://testing-library.com/docs/react-testing-library/cheatsheet/
- Order of priority to use one over the other : https://testing-library.com/docs/queries/about/#priority
- Mock Service Worker :
  - https://github.com/mswjs/msw
  - https://mswjs.io/docs/getting-started/install
