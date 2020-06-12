# Chat application by Ruben Serrate
## What is it?
As part of the technical assignment for an interview, I was asked to create this chat application, written in Typescript, which uses socket.io to communicate with a NodeJs server.

The emphasis is on the client side application, so I won't go into details about the server. I just want to mention that it should be a separate project, but for easy of sharing, I've included it in this same repository, in a `server` folder.
## Application overview
### State management
For managing the state of the client application I've chosen `Redux`. I like the way it abstracts all the headaches that come with state management and how you can easily split your state handling in different reducers. It's also highly customizable with middleware and enhancers and it comes with powerful dev tools.

Specifically I've create three of which I've decided to call *modules*. One for messages, another one for pages, and another one for settings. Each of them is on a single file and they can be found on the `modules` folder. As well as the reducer, in each module file I've defined the different actions and constants related to the module, together with their type definitions.

### Business logic
One of the most critical parts of the application is which actions get dispatched in response to which actions, and which side effects does each action have (other than updating the state, which I discussed int he previous point). For this I've decided to opt for `redux-observable`, which splits this concerns in different epics, each related to a different part of the business model of the application. They can be found on the `epics` folder. 

`Redux-observable` makes use of the powerful `rxjs` library for reactive programming, which I find very powerful. It also comes with specific testing utils that make the testing of these files easier. 


### Views
For the views in the application I've used React, no need to rumble about it's benefits. 

As a rule of thumb, soon as a piece of code (even CSS) was going to be duplicated, I've tried to extract it into a new component. 

The components that need access to the state of the main application or dispatch new actions, are allowed to do so thanks to `redux` connect function, which exposes the store (and it's state and dispatch method) as a context available for the different components. Each component that uses this connect function to hook itself to the redux context I've called a container, and can be found on the `containers` folder.
### Styling
For the styling of the applications I've opted for the library `styled-components`, since in my opinion, is the next step of CSS modules, bringing all the benefits of these, like scoping the styling to each particular element, plus some other ones, like conditional styling depending on props, built in support for themes, etc.
### Testing
The time for this task was limited, and I feel like it's testing the part that's taken more of a toll from this time constraint. 

I'm using Jest for testing all the different parts of the application, but I haven't had time to code tests for all of it, so I've just added tests for the parts where I thought tests were more relevant.

For example, all the business logic that gets handled in the epics and in the reducers is covered by tests. 

The react components, for example, aren't covered by tests, which is a shame, since they also hold an important part of the business logic, again this is due to time constraints. I've however coded tests for two of them, as a concept.
### Build pipeline
Webpack takes care of the typescript compilation, CSS, modules etc, and bundles all the needed files together.
## Features suggested and features delivered
- [x] Exchange messages with server and show them according to requirements
- [x] Settings page with working settings (username, theme, clock, send on enter) backed on localStorage
- [x] Internacionalization - both English and Spanish language available
- [x] Unread chat notifications
- [ ] Link parser
- [ ] Emoji support

I also introduced an extra feature that wasn't suggested in the document: Sent messages appear with a "sending" state in the UI, until the server has successfully broadcasted them to all connected users.
