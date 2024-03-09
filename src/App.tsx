import { AxiosProvider } from "./contexts/AxiosContext";
import RecordsAll from "./components/recordAll";

function App() {
  return (
    <AxiosProvider>
      <RecordsAll />
    </AxiosProvider>
  );
}

export default App;
