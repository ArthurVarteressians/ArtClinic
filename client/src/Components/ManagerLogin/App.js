import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Admin" exact component={ManagerLogin} />
          <ProtectedRoute path="/Getinfopage" component={Getinfopage} />
        </Switch>
      </Router>
    </div>
  );
}
