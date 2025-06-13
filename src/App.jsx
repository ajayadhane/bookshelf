import { SnackbarProvider, useSnackbar } from "notistack";
import HomePage from "./components/HomePage";

export default function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <HomePage />
    </SnackbarProvider>
  );
}
