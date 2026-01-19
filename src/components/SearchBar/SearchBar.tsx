import styles from "./SearchBar.module.css";
import toast from 'react-hot-toast';

interface SearchBarProps {
    onSubmit: (topic: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const handleAction = (formData: FormData) => {
        const topic = (formData.get("query") as string).trim();

        if (topic === "") {
            toast.error("Please enter your search query.", {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
            });
            return;
        }

        onSubmit(topic);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={styles.form} action={handleAction}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={styles.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
}