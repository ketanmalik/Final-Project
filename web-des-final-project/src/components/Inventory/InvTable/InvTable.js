import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Pagination from "../../Navigation/Pagination/Pagination";
import BootstrapTable from "react-bootstrap-table-next";
import Aux from "../../../hoc/Aux/Aux";
import "../../../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./InvTable.css";

class InvTable extends Component {
  state = {
    tblData: [
      {
        serialNo: "1437687022",
        modelNo: "UW5NTM1",
        text: "Engine Air Intake",
        category: "Engine Part",
      },
      {
        serialNo: "1507222015",
        modelNo: "KVCN61I",
        text: "Subsonic Inlet",
        category: "Engine Part",
      },
      {
        serialNo: "2637326418",
        modelNo: "7T3KTVP",
        text: "Supersonic Inlet",
        category: "Engine Part",
      },
      {
        serialNo: "5042444538",
        modelNo: "7H6RTGS",
        text: "Inlet Cone",
        category: "Engine Part",
      },
      {
        serialNo: "3299083876",
        modelNo: "N2BMGJN",
        text: "Inlet Ramp",
        category: "Engine Part",
      },
      {
        serialNo: "8602409965",
        modelNo: "1KMM4PX",
        text: "Divertless Supersonic Inlet",
        category: "Engine Part",
      },
      {
        serialNo: "9075451408",
        modelNo: "OOB137F",
        text: "Axial Compressor",
        category: "Engine Part",
      },
      {
        serialNo: "8796411775",
        modelNo: "IS24Z1Q",
        text: "17-Stage Electric Compressor",
        category: "Engine Part",
      },
      {
        serialNo: "8342077739",
        modelNo: "U5S98TL",
        text: "Combustor Flame Holder",
        category: "Engine Part",
      },
      {
        serialNo: "0687139356",
        modelNo: "R97Q0BU",
        text: "3-Stage Turbine",
        category: "Engine Part",
      },
      {
        serialNo: "6831656048",
        modelNo: "U5CKL1C",
        text: "Turbofan Afterburner",
        category: "Engine Part",
      },
      {
        serialNo: "8632516642",
        modelNo: "KDARB8U",
        text: "Propelling Nozzle",
        category: "Engine Part",
      },
      {
        serialNo: "3439178746",
        modelNo: "KDARB8U",
        text: "Thrust Reverser",
        category: "Engine Part",
      },
      {
        serialNo: "4421088926",
        modelNo: "U5S98TL",
        text: "Labyrinth Cooling System",
        category: "Engine Part",
      },
    ],
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
  };

  paginationHandler = (e) => {
    if (e.target.text) {
      this.setState({ activePage: e.target.text });
    }
  };

  singleSelectHandler = (row, isSelect) => {
    console.log(isSelect, row.serialNo);
  };

  allSelectHandler = (isSelect, rows) => {
    console.log(isSelect, rows);
  };

  render() {
    const indexOfLastItem = this.state.activePage * this.state.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
    const data = [...this.state.tblData];
    const currentTblRows = data.slice(indexOfFirstItem, indexOfLastItem);
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      onSelect: this.singleSelectHandler,
      onSelectAll: this.allSelectHandler,
    };

    return (
      <Aux>
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
            selectRow={selectRow}
            hover
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Button id="inv-tbl-btn">Requst Quote</Button>
        </div>
      </Aux>
    );
  }
}

export default InvTable;
