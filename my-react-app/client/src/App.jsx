

import { Provider } from 'react-redux';
import { store } from './store';
import AppContent from './components/appContent/AppContent';

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
