import { Switch, Route } from 'react-router';
import Container from './Container/Container';
import NotFoundView from './vievs/NotFoundView';
import Homepage from './vievs/Homepage/Homepage';
import Moviespage from './vievs/Moviespage/Moviespage';
import Moviedetailspage from './vievs/Moviedetailspage/Moviedetailspage';
import Appbar from './AppBar/AppBar';
export default function App() {
  return (
    <Container>
      <Appbar />
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/movies" exact>
          <Moviespage />
        </Route>
        <Route path="/movies/:movieId">
          <Moviedetailspage />
        </Route>
        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </Container>
  );
}
