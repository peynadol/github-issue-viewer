import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IssuesPage from "./IssuesTable/Page";
// import IssueFetcher from "./IssueFetcher";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <IssueFetcher /> */}
      <IssuesPage />
    </QueryClientProvider>
  );
}

export default App;
