# Progress bars React.js

App component: 1.5 hrs
Tests: 6 hrs

Total: 7.5 hours.

Tech used.

- Yarn as a package manager: Yarn has advantages over npm:
    You always know you're getting the same thing on every development machine
    It paralellizes operations that npm does not, and
    It makes more efficient use of the network.
    It may make more efficient use of other system resources (such as RAM) as well.
- Jest as a test runner + snapshot tests + mock functions great documentation + community.
- Enzyme for DOM tests:
    Using Enzyme with Jest makes writing tests for React applications a lot easier to assert, manipulate, and traverse your React Components' output.
    Selectors work similar to JQuery so very intuitive to use if you have that background.
- Css modules for styles: CSS modules over sass.
    - CSS live in one place
    - Only apply to that component and nothing else.
    - BEM or SMACSS not required as the styles are applied to a specific component only
- Axios for AJAX
    - Greate HTTP client for ajax calls features promises.
- axios-mock-adapter
    - Required to mock ajac request and response in unit tests.

- Avoided the use of redux as a store as the App is only one component. 

 Next steps / features missing:
    - Styling of buttons and custom select box
    - Animation could use some easing.
