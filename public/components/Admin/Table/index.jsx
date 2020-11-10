import React, { useState, useEffect } from "react";

import { formatDistance } from "date-fns";

import _ from "lodash";
import { Table, Input, Form, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Search } = Input;

const HeaderTable = ({ listSelectRow, manyConfirm }) => {
  return (
    <div className=" p-2 flex items-center  justify-between ">
      <span>
        <div className="text-md">{listSelectRow.length} selezionati</div>
      </span>
      <span>
        <Popconfirm
          title="Sei sicuro di eliminare ?"
          onConfirm={() => manyConfirm(listSelectRow)}
        >
          <button
            type="button"
            className="p-3 rounded-full bg-white shadow-3xl focus:outline-none inline-flex items-center text-lg justify-center"
          >
            <DeleteOutlined />
          </button>
        </Popconfirm>
      </span>
    </div>
  );
};

const TableCustom = ({ dataCustom, oneDelete, manyDelete }) => {
  const [form] = Form.useForm();
  const data = dataCustom;
  const [filterTable, setFilterTable] = useState(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  function confirm(id) {
    oneDelete(id);
    message.success("Hai eliminato con successo!");
  }

  function manyConfirm(id) {
    manyDelete(id);
    message.success("Hai eliminato con successo!");
    setSelectedRowKeys([]);
  }
  const columns = [
    {
      title: "iD",
      dataIndex: "key",
      ellipsis: true,
      key: "key",
      render: (text) => <a className="truncate ...">{text}</a>,
    },
    {
      title: "Nome",
      dataIndex: "fName",
      ellipsis: true,
      key: "fName",
    },
    {
      title: "Cognome",
      dataIndex: "lName",
      key: "lName",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Telefono",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
    },
    {
      title: "Persone",
      dataIndex: "qytPeople",
      key: "qytPeople",
      ellipsis: true,
    },
    {
      title: "Creazione",
      dataIndex: "create_date",
      key: "create_date",
      ellipsis: true,
      render: (text, record) => (
        <span>{formatDistance(new Date(), new Date(text))} ago</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      ellipsis: true,
      render: (text, record) => (
        <Popconfirm
          title="Sei sicuro di eliminare ?"
          onConfirm={() => confirm(record.key)}
        >
          <a>Elimina</a>
        </Popconfirm>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);

      console.log("selectedRows: ", selectedRowKeys);
    },
  };
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const onSearch = (value) => {
    console.log("PASS", { value });

    const filterTable = data.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilterTable((preValue) => {
      return {
        ...preValue,
        filterTable: filterTable,
      };
    });
  };
  return (
    <React.Fragment>
      <div className=" w-64 mb-7 ml-auto ">
        <Search
          placeholder="Cerca"
          allowClear
          enterButton="Search"
          size="middle"
          onSearch={onSearch}
          className=" "
        />
      </div>

      <Form form={form}>
        <Table
          rowSelection={rowSelection}
          dataSource={filterTable == null ? data : filterTable.filterTable}
          columns={columns}
          onChange={onChange}
          size="small"
          title={() =>
            _.isEmpty(selectedRowKeys) ? (
              ""
            ) : (
              <HeaderTable
                listSelectRow={selectedRowKeys}
                manyConfirm={manyConfirm}
              />
            )
          }
        />
      </Form>
    </React.Fragment>
  );
};

export default TableCustom;
