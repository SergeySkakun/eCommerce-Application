/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/no-null */
import * as React from "react";
import Box from "@mui/material/Box";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { getUserInfoRequest } from "../../../api";
import { UpdateAddress } from "./update-modal";
import { DeleteAddress } from "./delete-modal";
import { AddressTableSkeleton } from "./skeleton";
import { Typography } from "@mui/material";
import type { Customer } from "../../../../../shared/api/types";
import { SetDefaultShipping } from "./default-shipping-modal";
import { SetDefaultBilling } from "./default-billing-modal";
import { grey } from "@mui/material/colors";
import { AddNewAddress } from "./add-modal";
import "./style.css";

interface CustomUser extends Customer {
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
}

type Address = {
  isDefaultBillingAddress: { properties: any };
  id: string;
  streetName: string;
  streetNumber: string;
  city: string;
  country: string;
  postalCode: string;
};

function rowClassName(parameters): string {
  if (parameters.isDefaultShipping && parameters.isDefaultBillingAddress) {
    return "default-address-row-highlighting";
  } else if (parameters.isDefaultShipping) {
    return "default-shipping-row-highlighting";
  } else if (parameters.isDefaultBillingAddress) {
    return "default-building-row-highlighting";
  }
  return "";
}

export function AddressesGrid(): React.ReactElement {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [stateUpdate, setStateUpdate] = React.useState(false);

  const columns: GridColDef<Address>[] = [
    {
      field: "isDefaultShipping",
      headerName: "Default shipping address",
      type: "boolean",
      width: 150,
    },
    {
      field: "isDefaultBillingAddress",
      headerName: "Default billing address",
      type: "boolean",
      width: 150,
    },
    {
      field: "setShipping",
      headerName: "Set default Shipping Address",
      width: 150,
      renderCell: (parameters) => (
        <SetDefaultShipping
          properties={parameters.row}
          stetUpdate={setStateUpdate}
        />
      ),
    },
    {
      field: "setBilling",
      headerName: "Set default Billing Address",
      width: 150,
      renderCell: (parameters) => (
        <SetDefaultBilling
          properties={parameters.row}
          {...parameters.row.isDefaultBillingAddress}
          stetUpdate={setStateUpdate}
        />
      ),
    },
    {
      field: "editAddress",
      headerName: "Edit address",
      width: 150,
      renderCell: (parameters) => (
        <UpdateAddress
          properties={parameters.row}
          stetUpdate={setStateUpdate}
        />
      ),
    },
    {
      field: "deleteAddress",
      headerName: "Delete address",
      width: 150,
      renderCell: (parameters) => (
        <DeleteAddress
          properties={parameters.row}
          stetUpdate={setStateUpdate}
        />
      ),
    },
    {
      field: "country",
      headerName: "Country",
      width: 150,
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
    },
    {
      field: "streetName",
      headerName: "Street name",
      width: 150,
    },
    {
      field: "streetNumber",
      headerName: "Street number",
      width: 150,
    },
    {
      field: "postalCode",
      headerName: "Postal code",
      width: 110,
    },
  ];

  React.useEffect(() => {
    if (!stateUpdate) {
      const fetchData = async (): Promise<void> => {
        try {
          await getUserInfoRequest().then((data: CustomUser) => {
            const defaultShippingAddress = data.defaultShippingAddressId;
            const defaultBillingAddress = data.defaultBillingAddressId;
            const modifiedData = data.addresses.flatMap((subArray) => {
              return {
                ...subArray,
                isDefaultShipping: subArray.id === defaultShippingAddress,
                isDefaultBillingAddress: subArray.id === defaultBillingAddress,
              };
            });
            setData(modifiedData);
          });
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
      void fetchData();
    }
    setStateUpdate(true);
  }, [stateUpdate]);

  if (loading) {
    return (
      <>
        <Typography sx={{ width: "100%", margin: "auto", color: "#ffffff" }}>
          Loading...
        </Typography>
        <AddressTableSkeleton />
      </>
    );
  }
  if (error) {
    return (
      <>
        <Typography sx={{ width: "100%", margin: "auto", color: "#ffffff" }}>
          Error: {error.message}
        </Typography>
      </>
    );
  }

  return (
    <Box
      sx={{
        height: 400,
        width: "auto",
        maxWidth: "fit-content",
        margin: "auto",
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        sx={{
          bgcolor: grey[900],
          color: grey[1000],
        }}
        getRowClassName={(parameters) => rowClassName(parameters.row)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <AddNewAddress stetUpdate={setStateUpdate} />
    </Box>
  );
}
