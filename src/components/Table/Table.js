import React from "react";
import {
  withStyles,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  LinearProgress,
  TablePagination,
  TableFooter,
  IconButton,
} from "material-ui";
import {
  LastPage,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  FirstPage
} from "@material-ui/icons";

import PropTypes from "prop-types";

import tableStyle from "../../assets/jss/components/tableStyle";

function CustomTable({ ...props }) {
  const {
    classes,
    tableHead,
    tableData,
    tableHeaderColor,
    rowsPerPage,
    page,
    handleChangeRowsPerPage,
    handleChangePage,
    handleFirstPageButtonClick,
    handleBackButtonClick,
    handleNextButtonClick,
    handleLastPageButtonClick,
  } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {
            tableData.length <= 0 ? (
              <TableRow>
                <TableCell className={classes.tableCellLoading} colSpan={tableHead.length}>
                  <LinearProgress color="secondary" variant="indeterminate" />
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((pr, key) => {
                return (
                  <TableRow key={key}>
                    {pr.map((prop, key2) => {
                      return (
                        <TableCell className={classes.tableCell} key={key2}>
                          {
                            prop instanceof Array ? (
                              prop.map((component, index) => component(key))
                            ) : prop
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )
          }
        </TableBody>
        <TableFooter>
          {
            (tableData.length > 0) ? (
              <TableRow>
                <TablePagination
                  colSpan={tableHead.length}
                  count={tableData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  actionscomponent={
                    <div>
                      <IconButton
                        onClick={handleFirstPageButtonClick}
                        disabled={page === 0}
                        aria-label="First Page"
                      >
                        <LastPage />
                      </IconButton>
                      <IconButton
                        onClick={handleBackButtonClick}
                        disabled={page === 0}
                        aria-label="Previous Page"
                      >
                        <KeyboardArrowRight />
                      </IconButton>
                      <IconButton
                        onClick={handleNextButtonClick}
                        disabled={page >= Math.ceil(tableData.length / rowsPerPage) - 1}
                        aria-label="Next Page"
                      >
                        <KeyboardArrowLeft />
                      </IconButton>
                      <IconButton
                        onClick={handleLastPageButtonClick}
                        disabled={page >= Math.ceil(tableData.length / rowsPerPage) - 1}
                        aria-label="Last Page"
                      >
                        <FirstPage />
                      </IconButton>
                    </div>
                  }
                />
              </TableRow>
            ) : <TableRow classes={{ root: classes.emptyTableFooter }} />
          }
        </TableFooter>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.func)
      ])
    )
  )
};

export default withStyles(tableStyle)(CustomTable);
