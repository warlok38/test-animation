import { BrowserRouter } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { RouterProvider } from "./providers";

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <RouterProvider />
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
