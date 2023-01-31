import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUpdateUserManipulateOpts,
  fetchUserManipulateOpts,
} from "../../apis/users";
import { requestFaqDataSets } from "../../features/faqs/faqs";
import { RootState } from "../../redux/store";
import { Faq, UserManipulateOpts } from "../../utils/type";

const Faqs = () => {
  const dispatch = useDispatch();
  const { faqs, length, manipulateOpts } = useSelector(
    (state: RootState) => state.faqReducer
  );
  useEffect(() => {
    (async () => {
      await requestFaqDataSets(length);
    })();
  }, []);
  type FaqDataset = {
    faq: Faq;
    tags: {
      name: string;
    }[];
  }[];
  const [data, setData] = useState<FaqDataset>(faqs);
  const [pageState, setPageState] = useState(0);
  const rowsPerPage = 50;
  useEffect(() => {
    const slicedData = faqs.slice(
      pageState * rowsPerPage,
      pageState * rowsPerPage + rowsPerPage
    );
    setData(slicedData);
  }, [pageState, rowsPerPage, faqs]);
  const handleChangePage = (event: any, newPage: number) => {
    (async () => {
      const dataQtl = newPage * rowsPerPage + 1;
      await requestFaqDataSets(dataQtl);
    })();
    setPageState(newPage);
  };

  const tablePaginationProps = {
    rowsPerPageOptions: [rowsPerPage],
    count: length,
    rowsPerPage: rowsPerPage,
    page: pageState,
    component: "div",
    onPageChange: handleChangePage,
  };
  // type SortOptions = UserManipulateOpts["faqs"]["sort"]
  const handleChange = async (
    e: SelectChangeEvent<"asc" | "desc">,
    columnName: "created_at" | "tags"
  ) => {
    const { options } = await fetchUserManipulateOpts().then((res) => res.data);
    const updatedOpts = {
      ...options,
      faqs: {
        ...options.faqs,
        sort: { ...options.faqs.sort, [columnName]: e.target.value },
      },
    };
    const newOpts: UserManipulateOpts = await fetchUpdateUserManipulateOpts(
      updatedOpts
    ).then((res) => res.data.options);
    (async () => {
      await requestFaqDataSets(length);
    })();
  };

  return (
    <div>
      {manipulateOpts.sort.created_at && (
        <>
          <br />
          <br />
          <br />
          <FormControl>
            <InputLabel id="demo-simple-select-label">created at</InputLabel>
            <Select
              value={manipulateOpts.sort.created_at}
              onChange={(e) => handleChange(e, "created_at")}
            >
              <MenuItem value={"desc"}>desc</MenuItem>
              <MenuItem value={"asc"}>asc</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">tags</InputLabel>
            <Select
              label={"tags"}
              value={manipulateOpts.sort.tags}
              onChange={(e) => handleChange(e, "tags")}
            >
              <MenuItem value={"desc"}>desc</MenuItem>
              <MenuItem value={"asc"}>asc</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
      <br></br>
      <TablePagination {...tablePaginationProps} />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {data?.map((faqData, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell key={index}>{faqData.faq.name}</TableCell>
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

export default Faqs;
