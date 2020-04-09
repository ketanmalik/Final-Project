import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
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
        dataField: "description",
        text: "Description",
      },
      {
        dataField: "price",
        text: "Price (USD)",
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
    specification: "Please select a part to view specifications",
  };

  componentDidMount() {
    this.getInventory();
  }

  getInventory = () => {
    axios
      .get("/getinventory")
      .then((resp) =>
        this.setState({ tblData: resp.data, loading: false, error: null })
      )
      .catch((error) => this.setState({ loading: false, error: error }));
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
        return checkoutData.push(row);
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

  buttonClickHandler = () => {
    const checkoutData = [...this.state.checkoutData];
    let price = _.sumBy(checkoutData, function (item) {
      return item.price;
    });
    const payload = {
      items: checkoutData,
      price: price,
    };

    axios({
      url: "/checkout",
      method: "POST",
      data: payload,
    })
      .then(console.log("data send"))
      .catch(console.log("not send"));
  };

  render() {
    let currentTblRows = null;
    let selectRow = null;
    let expandRow = null;
    if (!this.state.loading) {
      const indexOfLastItem = this.state.activePage * this.state.itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
      const data = [...this.state.tblData];
      currentTblRows = data.slice(indexOfFirstItem, indexOfLastItem);
      selectRow = {
        mode: "checkbox",
        clickToExpand: true,
        clickToSelect: false,
        onSelect: this.singleSelectHandler,
        onSelectAll: this.allSelectHandler,
      };
      expandRow = {
        onlyOneExpanding: true,
        renderer: (row, rowIndex) => {
          return (
            <div style={{ marginLeft: "1em" }}>
              <p className="inv-specs">Specifications:</p>
              {Object.keys(row.specification).map((key) => (
                <p className="inv-specs-text" key={key}>
                  <b>{key}:</b>&nbsp;&nbsp;
                  {row.specification[key]}
                </p>
              ))}
            </div>
          );
        },
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
              <div>
                <div className="inv-tbl-wrapper">
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
                    hover
                    striped
                    wrapperClasses="table-responsive"
                    expandRow={expandRow}
                    selectRow={selectRow}
                    // rowEvents={rowEvents}
                  />
                </div>
              </div>
            </Aux>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            id="inv-tbl-btn"
            onClick={this.buttonClickHandler}
            disabled={this.state.checkoutData.length ? false : true}
          >
            <span id="inv-tbl-btn-txt">Checkout</span>
            <Badge id="inv-tbl-btn-badge">
              {this.state.checkoutData.length}
            </Badge>
          </Button>
        </div>
      </Aux>
    );
  }
}

export default InvTable;
