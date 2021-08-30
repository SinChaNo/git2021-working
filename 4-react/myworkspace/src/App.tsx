import "./App.scss"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./domain/Home";
import Profile from "./domain/profile/Profile";
import { Provider } from "react-redux";
import { store } from "./store";

const Todo = lazy(() => import("./domain/todo/Todo"));
const Feed = lazy(() => import("./domain/feed/Feed"));
const Contact = lazy(() => import("./domain/Contact"))



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
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          </nav>
          <main className="content-container">
            <Suspense fallback={<div>Loding...</div>}>
              <Switch>
                <Route path="/" component= {Home} exact />
                <Route path="/todo" component={Todo} />
                <Route path="/feed" component={Feed} />
                <Route path="/contact" component={Contact} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;