import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import ScrollToTop from './ScrollToTop'

import Home from './components/Home'
import About from './components/About'
import StateWisePage from './components/StateWisePage'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <BrowserRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/state/:stateCode" component={StateWisePage} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
)

export default App
