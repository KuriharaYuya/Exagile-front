import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { CharacterDataset } from "../../../utils/type";

type Props = {
  dataset: CharacterDataset | undefined;
  // pageState: number | undefined;
  // rowsPerPageState: number | undefined;
  dataLength: number | undefined;
};
const CharactersTable = (props: Props) => {
  const { dataset, dataLength } = props;
  const onJumpCharacterPageHandler = (characterId: string) => {
    Router.push(`/characters/${characterId}`);
  };
  const [data, setData] = useState<CharacterDataset | undefined>(undefined);
  const [pageState, setPageState] = useState(0);
  const [rowsPerPageState, setRowsPerPageState] = useState(25);
  useEffect(() => {
    if (pageState && rowsPerPageState) {
      const slicedData = dataset?.slice(
        pageState * rowsPerPageState,
        pageState * rowsPerPageState + rowsPerPageState
      );
      setData(slicedData);
    } else {
      setData(dataset);
    }
  }, [dataset, pageState, rowsPerPageState]);
  const handleChangePage = (event: any, newPage: number) => {
    setPageState(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPageState(parseInt(event.target.value, 10));
  };
  const tablePaginationProps = {
    rowsPerPageOptions: [25],
    count: dataLength || 0,
    rowsPerPage: rowsPerPageState,
    page: pageState,
    component: "div",
    onPageChange: handleChangePage,
    onRowsPerPageChange: handleChangeRowsPerPage,
  };

  return (
    <div>
      <TablePagination {...tablePaginationProps} />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {data?.map((data, index) => {
                const { character, communities } = data;
                return (
                  <TableRow key={index}>
                    <TableCell key={index}>
                      <p
                        onClick={() => onJumpCharacterPageHandler(character.id)}
                      >
                        {character.name}
                      </p>
                      <p>
                        {communities.length > 0 ? (
                          communities.map((c) => (
                            <span key={c.id}>{c.name}</span>
                          ))
                        ) : (
                          <span>紐づきなし</span>
                        )}
                      </p>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default CharactersTable;
