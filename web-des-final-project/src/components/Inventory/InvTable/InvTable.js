import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Pagination from "../../Navigation/Pagination/Pagination";
import BootstrapTable from "react-bootstrap-table-next";
import _ from "lodash";
import Aux from "../../../hoc/Aux/Aux";
import Spinner from "react-bootstrap/Spinner";
import "../../../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./InvTable.css";

class InvTable extends Component {
  state = {
    tblData: [],
    columns: [
      {
        dataField: "serialNo",
        text: "Serial Number",
      },
      {
        dataField: "modelNo",
        text: "Model Number",
      },
      {
        dataField: "text",
        text: "Description",
      },
      {
        dataField: "category",
        text: "Category",
      },
    ],
    activePage: 1,
    itemsPerPage: 10,
    checkoutData: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.getInventory();
  }

  getInventory = () => {
    axios
      .get("/getinventory")
      .then(
        (resp) => (
          this.setState({ tblData: resp.data }),
          this.setState({ loading: false }),
          this.setState({ error: null })
        )
      )
      .catch(
        (error) => (
          this.setState({ loading: false }), this.setState({ error: error })
        )
      );
  };

  paginationHandler = (e) => {
    if (e.target.text) {
      this.setState({ activePage: e.target.text });
    }
  };

  singleSelectHandler = (row, isSelect) => {
    let checkoutData = [];
    if (this.state.checkoutData) {
      checkoutData = [...this.state.checkoutData];
    }
    let tblData = [...this.state.tblData];
    if (!isSelect) {
      checkoutData = checkoutData.filter(function (value) {
        return value.serialNo !== row.serialNo || value.modelNo !== row.modelNo;
      });
    } else {
      let test = _.filter(tblData, {
        serialNo: row.serialNo,
        modelNo: row.modelNo,
      });
      if (checkoutData) {
        checkoutData.push(test[0]);
      }
    }
    this.setState({ checkoutData: checkoutData });
  };

  allSelectHandler = (isSelect, rows) => {
    let checkoutData = [];
    if (this.state.checkoutData) {
      checkoutData = [...this.state.checkoutData];
    }
    if (isSelect) {
      rows.map((row) => {
        checkoutData.push(row);
      });
    } else {
      rows.forEach((row) => {
        let i = checkoutData.findIndex(
          (r) => r.serialNo === row.serialNo && r.modelNo === row.modelNo
        );
        if (i >= 0) checkoutData.splice(i, 1);
      });
    }
    this.setState({ checkoutData: checkoutData });
  };

  render() {
    let currentTblRows = null;
    let selectRow = null;
    if (!this.state.loading) {
      const indexOfLastItem = this.state.activePage * this.state.itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
      const data = [...this.state.tblData];
      currentTblRows = data.slice(indexOfFirstItem, indexOfLastItem);
      selectRow = {
        mode: "checkbox",
        clickToSelect: true,
        onSelect: this.singleSelectHandler,
        onSelectAll: this.allSelectHandler,
      };
    }

    return (
      <Aux>
        <div className="inv-tbl-wrapper">
          {this.state.loading ? (
            <div style={{ margin: "5em 0em 5em 45em", color: "#581845" }}>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Aux>
              <Pagination
                totalItems={this.state.tblData.length}
                itemsPerPage={this.state.itemsPerPage}
                activeItem={this.state.activePage}
                clicked={(e) => this.paginationHandler(e)}
              />
              <BootstrapTable
                keyField="serialNo"
                data={currentTblRows}
                columns={this.state.columns}
                selectRow={selectRow}
                hover
                striped
                bordered={false}
                wrapperClasses="table-responsive"
              />
            </Aux>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <Button id="inv-tbl-btn">Requst Quote</Button>
        </div>
      </Aux>
    );
  }
}

export default InvTable;
