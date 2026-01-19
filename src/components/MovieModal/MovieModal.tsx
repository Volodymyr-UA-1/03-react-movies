import type { Movie } from "../../types/movie";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  useEffect(() => {
    
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    
    return () => {
      document.body.style.overflow = originalOverflow; 
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  
  const modalContent = (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose} 
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose} 
        >
          &times;
        </button>

        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className={css.image}
          />
        ) : (
          <div className={css.noImage}>No Image</div>
        )}

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, modalRoot);
}