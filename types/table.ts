import { ReactElement } from "react";

export type TableRow = Partial<{
  id: string;
}> & { [key in string]: any };

export type TableColumn = {
  key: keyof TableRow;
  value: string | ReactElement;
  render?: (value: string, row: TableRow) => ReactElement;
  onClick?: () => void;
};
