import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div>test</div>
    </QueryClientProvider>
  );
}

export default App;
