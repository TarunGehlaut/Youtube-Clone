import { AppContext } from "./context/ContextApi";
import RouterConfig from "./Router-config/RouterConfig";

function App() {
  return (
    <AppContext>
      <RouterConfig />
    </AppContext>
  );
}

export default App;
