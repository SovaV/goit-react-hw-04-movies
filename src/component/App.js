import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router';
import Container from './Container/Container';
import Spiner from './Loader/Loader.js';
import Appbar from './AppBar/AppBar';

const Homepage = lazy(() => import('./vievs/Homepage/Homepage' /* webpackChunkName: "Homepage" */));
const Moviespage = lazy(() =>
  import('./vievs/Moviespage/Moviespage' /* webpackChunkName: "Moviespage" */),
);
const Moviedetailspage = lazy(() =>
  import('./vievs/Moviedetailspage/Moviedetailspage' /* webpackChunkName: "Moviedetailspage" */),
);
const NotFoundView = lazy(() =>
  import('./vievs/NotFoundView' /* webpackChunkName: "NotFoundView" */),
);

export default function App() {
  return (
    <Container>
      <Appbar />
      <Suspense fallback={<Spiner />}>
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
      </Suspense>
    </Container>
  );
}
