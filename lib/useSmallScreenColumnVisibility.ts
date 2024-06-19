import { useMediaQuery } from "@react-hookz/web";
import { Table } from "@tanstack/react-table";
import { useEffect } from "react";

const useSmallScreenColumnVisibility = <TData extends object>(
  table: Table<TData>,
  smallScreenColumnIds: string[]
) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    table.getAllColumns().forEach((column) => {
      if (isSmallScreen) {
        if (smallScreenColumnIds.includes(column.id)) {
          column.toggleVisibility(true);
        } else {
          column.toggleVisibility(false);
        }
      } else {
        column.toggleVisibility(true);
      }
    });
  }, [isSmallScreen, table, smallScreenColumnIds]);
};

export default useSmallScreenColumnVisibility;
