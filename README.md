# React Jest UI Component Testing with Specmatic
This project demonstrates stubbing APIs with Specmatic by leveraging their OpenAPI sepcifications in Jest UI Component Tests.

## Install dependencies
```npm install```

## Running the app
```npm start```

## Running UI Component Tests
```npm test``` 

## FAQs

### 1. Error `ReferenceError: setImmediate is not defined`

This happens due to an issue in Jest. The easiest solution is to import `core-js` in the affected test file.
