import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Chat } from './pages/Chat';
import { Home } from './pages/Home';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthContextProvider>
          <Route exact path="/" component={Home} />
          <Route path="/chat" component={Chat} />
        </AuthContextProvider>

      </Switch>

    </BrowserRouter>
  );
}

export default App;
