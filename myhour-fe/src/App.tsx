import * as React from 'react';
import {observer} from 'mobx-react-lite';
import { GlobalStateContext } from './Stores/GlobalStore';

const App = observer(() => {

  const state = React.useContext(GlobalStateContext);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload.
      </p>
      <h1>My Name is {state.userData.name}</h1>
        <button onClick = {() => state.setUserData({name: 'Bob', id: '12'})}>Change Name</button>
    </div>
  );
});

export default App;
