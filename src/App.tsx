import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appRouter from "@/routes/AppRouter";
import store from "@/store/store";
import { APP_LOCAL_STORAGE_THEME_DARK_VALUE, APP_LOCAL_STORAGE_THEME_KEY } from "./global/constants";


function App() { 
  useEffect(() => {
    const theme = localStorage.getItem(APP_LOCAL_STORAGE_THEME_KEY);
    if (!theme) {
      localStorage.setItem(APP_LOCAL_STORAGE_THEME_KEY, APP_LOCAL_STORAGE_THEME_DARK_VALUE);
      document.documentElement.classList.add(APP_LOCAL_STORAGE_THEME_DARK_VALUE);
    }else if (theme === APP_LOCAL_STORAGE_THEME_DARK_VALUE) {
      document.documentElement.classList.add(APP_LOCAL_STORAGE_THEME_DARK_VALUE);
    } else {
      document.documentElement.classList.remove(APP_LOCAL_STORAGE_THEME_DARK_VALUE);
    }
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  )
}

export default App;
