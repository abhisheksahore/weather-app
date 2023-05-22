import { Provider } from 'react-redux';
import './App.css';
import Cloud from './module/components/art/cloud';
import Moon from './module/components/art/moon';
import Sun from './module/components/art/sun';
import DisplayCard from './module/components/displayCard';
import HomeScreen from './module/components/homeScreen';
import store from './module/redux/store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <HomeScreen />
        
      </div>
    </Provider>
  );
}

export default App;
