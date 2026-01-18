import css from "./App.module.css"
import SearchBar from "../SearchBar/SearchBar"
import toast,{Toaster} from "react-hot-toast";
import type { Movie } from "../../types/movie";


export default function App() {
   
  // Функція, яка буде спрацьовувати при натисканні на кнопку пошуку
  const handleSearch = async (topic: string) => {
    const movies: Movie[] = [];
    if (movies.length === 0) {
  toast.error("No movies found for your request.", {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
            
  });        
}
    console.log("Шукаємо фільм:", topic);
  };

  return (
    <div className={css.appContainer}>
      <Toaster
        position="top-center"
        reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
    </div>
  );
  
}

