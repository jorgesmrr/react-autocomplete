### 1 - What is the difference between Component and PureComponent? Give an example where it might break my app.

The Component implements the shouldComponentUpdate method, while the PureComponent only do a shallow compare between the previous props and the current ones.

Since props are allowed to be objects, we can have an object that would have different contents between re-renders but still the same reference. If we use the PureComponent in situations like this one, we might end up with components not re-rendering when they should.

### 2 - Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

We can have a situation where the shouldComponentUpdate implementation decides that nothing relevant has changed in the component state and props and therefore it's not necessarily to re-render the component. But it is wrong, since the Context might have received updated values. This would result in a component with outdated data and/or behavior.

### 3 - Describe 3 ways to pass information from a component to its PARENT.

- Calling a callback function received via props;
- Calling a function provided by a parent component using Context;
- Dispatching events using state-management libraries such as React Redux.

### 4 - Give 2 ways to prevent components from re-rendering

- Using React.memo to render a component only if its props change;
- using the useCallback hook, to prevent functions from having different reference values between re-renders, which would lead to unnecessary re-renders.

### 5 - What is a fragment and why do we need it? Give an example where it might break my app

Fragments allow to render multiple elements without having a parent element. It is useful in cases when you want to pass some elements as children to another element without creating a wrapper element for these children.

#### An example where it could break your app

It's important to evaluate if a fragment won't break the node hierarchy of your app.

Suppose you have the component below:

```js
const Wrapper = ({ children }) => <div className="wrapper">{children}</div>;
```

And this CSS:

```css
.wrapper > div {
  display: flex;
}
```

Now imagine you use that component this way:

```js
const MyList = () => {
    const firstLineItems = <>
        <span>John<span/>
        <span>Mary<span/>
    </>

    const secondLineItems = <>
        <span>Nancy<span/>
        <span>Pete<span/>
    </>

    return <Wrapper>
        {firstLineItems}
        {secondLineItems}
    </Wrapper>
}/>
```

This would not lead to the expected result, which should be displaying each set of line items in a single row. The correct usage would be creating the proper wrapper elements:

```js
const MyList = () => {
    // Notice the div:
    const firstLineItems = <div>
        <span>John<span/>
        <span>Mary<span/>
    <div/>

    const secondLineItems = <div>
        <span>Nancy<span/>
        <span>Pete<span/>
    <div/>

    return <Wrapper>
        {firstLineItems}
        {secondLineItems}
    </Wrapper>
}/>
```

### 6 - Give 3 examples of the HOC pattern.

You can create a HOC to reuse code in components that will have a similar business logic. They work basically under these three steps:

- create a function that receives a component as an argument;
- return, from this function, an outer component that will:
  - add some logic to the outer component;
  - return the received component in the render function, possibly passing some props that are controlled by the outer component.

Some use cases are:

- Handle network requests, managing the component state to reflect the outcomes of the request. (Was it successful? Has it failed? Is it loading?);
- Add caching for props previously passed in (useful in autocompletes, for example, so we don't fetch again a query that we just fetched recently);
- There are some HOCs that comes ready to use in the React library, such as React.memo.

### 7 - what's the difference in handling exceptions in promises, callbacks and async...await

#### Promise chaining

```js
myPromise
  .then((result) => {
    // do something with the result
  })
  .catch((error) => {
    // handle the exception
  })
  .finally(() => {
    // perform some cleanup
    // will run in both success and failure situations
  });
```

#### Callbacks

```js
const cleanup = () => {
  // perform some cleanup
  // will run in both success and failure situations
};

const onSuccess = (result) => {
  // do something with the result
  // ...
  cleanup();
};

const onFail = (error) => {
  // handle the exception
  // ...
  cleanup();
};

myFunctionWithCallbacks(onSuccess, onFail);
```

#### Async ... await

```js
const performSomeAsyncTask = async () => {
  try {
    const result = await myPromise();
    // do something with the result
  } catch (error) {
    // handle the exception
  } finally {
    // perform some cleanup
    // will run in both success and failure situations
  }
};

performSomeAsyncTask();
```

### 8 - How many arguments does setState take and why is it async.

It's async because React performs updates in batch. That's why the first argument can be a function that receives the current state as the first argument so we can update the state appropriately.

The second argument of setState is a callback that will be called after the update.

### 9 - List the steps needed to migrate a Class to Function Component

#### Convert the initial state to hooks

```js
// Locate the initial state in the constructor
constructor() {
    this.state = {
        propA: 'foo',
        propB: 42
    }
}

// And migrate it to hooks at the beginning of the component
const MyComponent = () => {
    const [propA, setPropA] = useState('foo')
    const [propB, setPropB] = useState(42)
}
```

#### Use the hook `useRef` instead of `React.createRef`

```js
// This
constructor() {
    this.inputRef = React.createRef()
}

// Becomes this
const MyComponent = () => {
    const inputRef = useRef()
}
```

#### Convert each method to a function variable

```js
// This
myMethod() {
    // ...
}

// Becomes a variable
const myMethod = () => {
    // ...
}
```

#### Remove the keyword `this` from methods in the render function

```js
// This
render() {
    return <button onClick={this.onClick}/>
}

// Becomes this
const render = () => {
    return <button onClick={onClick}/>
}
```

#### Convert the `componentDidMount` lifecycle method to the `useEffect` hook

```js
// This
componentDidMount() {
    doSomething()
}

// Becomes this
useEffect(() => {
    doSomething()
}, [])
```

Notice the usage of an empty array as the dependency.

#### Convert the `componentWillUnmount` lifecycle method to the `useEffect` hook

```js
// This
componentWillUnmount() {
    cleanup()
}

// Becomes this
useEffect(() => {
    // ... some existing code here from the previous step

    // add a return function to be responsible for "cleanups"
    return () => {
        cleanup()
    }
}, [])
```

#### Convert the `componentDidUpdate` lifecycle method to the `useEffect` hook

In this step you have to understand each "concern" implemented in this lifecycle method of your component and break it down into multiple calls to `useEffect`.

```js
// This
componentDidUpdate(previousProps, props) {
    if (previousProps.propA !== props.propB) {
        doSomethingAboutPropA()
    }
    if (previousProps.propB !== props.propB) {
        doSomethingAboutPropB()
    }
}

// Becomes this
useEffect(() => {
    doSomethingAboutPropA()
}, [propA])

useEffect(() => {
    doSomethingAboutPropB()
}, [propB])
```

#### Return from the component the same thing that was returned from the render function

```js
// This
render() {
    return <div>Content</div>
}

// Becomes this
const MyComponent = () => {
    // ...
    return <div>Content</div>
}
```

### 10 - List a few ways styles can be used with components

I can think of the following ways:

#### Importing from a regular CSS stylesheet file:

```js
import from 'MyComponent.css'

const MyComponent = () => <div className='some-class' />
```

Note that you could use a similar approach when using libraries that provide (or build) regular stylesheets, such as Tailwind CSS, and preprocessors that also generate regular stylesheets in the build (Sass, Less).

#### Importing from a CSS module:

```js
import styles from "MyComponent.module.css";

const MyComponent = () => <div className={styles.someClass} />;
```

#### Writing CSS-in-JS (example below with styled-components):

```js
const MyComponentRoot = styled("div")`
  color: red;
`;

const MyComponent = () => <MyComponentRoot />;
```

### 11 - How to render an HTML string coming from the server

```js
const MyComponent = ({htmlToDisplay}) => {
  return <div dangerouslySetInnerHTML={ __html: htmlToDisplay}>
};
```
