/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

export interface IFormInputProperties {
  name: string;
  control: any;
  label: string;
  setValue?: unknown;
  sx?: SxProps<Theme>;
}
