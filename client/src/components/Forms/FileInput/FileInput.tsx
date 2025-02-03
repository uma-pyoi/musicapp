import { Button, Grid2, styled, TextField } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";

interface Props {
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const HiddenInputFile = styled("input")({ display: "none" });

export function FileInput({ name, label, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const activeInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]?.name) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
    onChange(e);
  };

  return (
    <>
      <HiddenInputFile
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid2 container direction={"row"} spacing={2} alignItems={"center"}>
        <Grid2>
          <TextField
            variant="outlined"
            fullWidth
            label={label}
            value={fileName}
            disabled
            onClick={activeInput}
          />
        </Grid2>
        <Grid2>
          <Button variant="contained" onClick={activeInput}>
            Browse
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
}
