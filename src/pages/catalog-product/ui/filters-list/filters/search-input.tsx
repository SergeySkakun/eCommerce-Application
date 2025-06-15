import {
  useState,
  useEffect,
  type ReactElement,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./styles.css";

interface SearchInputProperties {
  onSearch: (query: string) => void;
  initialSearchQuery: string;
}

export function SearchInput({
  onSearch,
  initialSearchQuery,
}: SearchInputProperties): ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = (): void => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="search-conteiner">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit(event);
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  onClick={() => {
                    onSearch(searchQuery);
                  }}
                  edge="start"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: searchQuery ? (
              <InputAdornment position="end">
                <IconButton onClick={handleClear} edge="end">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      </form>
    </div>
  );
}
