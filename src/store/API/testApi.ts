import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddShipState, EditShipState } from "../../types";

export interface Shipment {
  id: number;
  number: string;
  deliveryDate: string;
  city: string;
  quantity: string;
  deliveryType: string;
  warehouse: {
    name: string;
    address: string;
  };
  status: string;
}

interface responseData {
  data: Shipment[];
  totalPages: number;
  currentPage: number;
}

export const testAPI = createApi({
  reducerPath: "testAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Shipment"],
  endpoints: (build) => ({
    getInfoToAddShip: build.query<AddShipState, string>({
      query: () => ({
        url: `/add`,
      }),
    }),
    getShipments: build.query<responseData, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `/shipments`,
        params: { page, limit },
      }),
      providesTags: () => ["Shipment"],
    }),
    postShipments: build.mutation<EditShipState, AddShipState>({
      query: (data) => ({
        url: `/shipments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Shipment"],
    }),
    getShipmentById: build.query<EditShipState, string>({
      query: (id) => `shipments/${id}`,
    }),
    deleteShipmentById: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `shipments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => ["Shipment"],
    }),
    updateShipment: build.mutation<
      Shipment,
      { id: string; data: Omit<EditShipState, "deliveryDate"> }
    >({
      query: ({ id, data }) => ({
        url: `/shipments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: () => ["Shipment"],
    }),
  }),
});
