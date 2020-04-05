import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import TableData from "./TableData";
import Pagination from "../../Navigation/Pagination/Pagination";
import Aux from "../../../hoc/Aux/Aux";
import "./InvTable.css";

class InvTable extends Component {
  state = {
    tblData: [
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
      { serialNo: "12", modelNo: "A23D", text: "Engine Part" },
    ],
    activePage: 1,
    itemsPerPage: 10,
  };

  paginationHandler = (e) => {
    if (e.target.text) {
      this.setState({ activePage: e.target.text });
    }
  };

  render() {
    const indexOfLastItem = this.state.activePage * this.state.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
    const data = [...this.state.tblData];
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const tableRows = [];
    for (var i = 0; i < currentItems.length; i++) {
      tableRows.push(
        <TableData
          serialNo={currentItems[i].serialNo}
          modelNo={currentItems[i].modelNo}
          text={currentItems[i].text}
          key={i}
        />
      );
    }
    return (
      <Aux>
        <div className="inv-tbl-wrapper">
          <Pagination
            totalItems={this.state.tblData.length}
            itemsPerPage={this.state.itemsPerPage}
            activeItem={this.state.activePage}
            clicked={(e) => this.paginationHandler(e)}
          />
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" className="regular-checkbox" />
                </th>
                <th>Serial Number</th>
                <th>Model Number</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button id="inv-tbl-btn">Requst Quote</Button>
        </div>
      </Aux>
    );
  }
}

export default InvTable;
