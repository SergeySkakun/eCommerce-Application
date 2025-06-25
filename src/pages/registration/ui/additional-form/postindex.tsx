import type { ReactNode, ChangeEvent } from "react";
import { TextField } from "@mui/material";

type PostindexInputProperties = {
  postindex: string;
  postindexError: string;
  setPostindex: React.Dispatch<React.SetStateAction<string>>;
  setPostindexError: React.Dispatch<React.SetStateAction<string>>;
};

export default function Postindex({
  postindex,
  postindexError,
  setPostindex,
  setPostindexError,
}: PostindexInputProperties): ReactNode {
  const handlePostindexChange = (
    event_: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    try {
      setPostindex(event_.target.value);
      if (event_.target.value.length === 0) {
        setPostindexError("Postindex must contain at least one character");
      } else {
        setPostindexError("");
      }
    } catch {
      setPostindexError("Missing postindex");
    }
  };

  return (
    <TextField
      fullWidth
      sx={{ mt: 2, pb: 2, boxSizing: "border-box" }}
      label="Postindex"
      placeholder="enter postindex"
      value={postindex}
      onChange={handlePostindexChange}
      error={Boolean(postindexError)}
      helperText={postindexError}
    />
  );
}
