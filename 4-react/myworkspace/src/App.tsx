import "./App.scss"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

import Home from "./features/Home";
import Profile from "./features/profile/Profile";
import Progress from "./components/progress/progress";
import AlertStack from "./components/alert/AlertStack";

const Todo = lazy(() => import("./features/todo/Todo"));
const Feed = lazy(() => import("./features/feed/Feed"));
// const Contact = lazy(() => import("./features/contact/Contact"));
const ContactInline = lazy(() => import("./features/contect_back/ContactInlineEdit"));
const Photo = lazy(() => import("./features/photo/Photo"));
const PhotoCreate = lazy(() => import("./features/photo/PhotoCreate"));
const PhotoDetail = lazy(() => import("./features/photo/PhotoDetail"));
const PhotoEdit = lazy(() => import("./features/photo/PhotoEdit"));
const Contacts = lazy(() => import("./features/contact/Contact"));
// const ContactCreate = lazy(() => import("./features/contact/ContactCreate"));
// const ContactDetail = lazy(() => import("./features/contact/ContactDetail"));
// const ContactEdit = lazy(() => import("./features/contact/ContactEdit"));



function App() {
  return (
    <Provider store = {store}>
      <Router>
        {/* // main container */}
        <div className="mx-auto">
          <header className="app-bar d-flex justify-content-end bg-primary shadow">
            <Profile />
          </header>
          <nav
            className="drawer-menu position-fixed bg-light shadow-sm"
          >
          <h3 className="m-2">MY WORKSPACE</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/todo">Todo</Link></li>
            <li><Link to="/feed">Feed</Link></li>
            {/* <li><Link to="/contact">Contact</Link></li> */}
            <li><Link to="/contactInline">ContactInline</Link></li>
            <li><Link to="/photos">Photo</Link></li>
            {/* <li><Link to="/contacts">newContact</Link></li> */}
          </ul>
          </nav>
          <main className="content-container">
            <Suspense fallback={<div>Loding...</div>}>
              <Switch>
                <Route path="/" component= {Home} exact />
                <Route path="/todo" component={Todo} />
                <Route path="/feed" component={Feed} />
                {/* <Route path="/contact" component={Contact} exact /> */}
                <Route path="/contactInline" component={ContactInline} exact />
                <Route path="/photos" component={Photo} exact />
                <Route path="/photos/create" component={PhotoCreate} />
                <Route path="/photos/detail/:id" component={PhotoDetail} exact />
                <Route path="/photos/edit/:id" component={PhotoEdit} />
                <Route path="/contacts" component={Contacts} exact/>
                {/* <Route path="/contacts/create" component={ContactCreate} />
                <Route path="/contacts/:id" component={ContactDetail} exact />
                <Route path="/contacts/edit/:id" component={ContactEdit} exact /> */}
              </Switch>
            </Suspense>

            <Progress />
            <AlertStack />
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;