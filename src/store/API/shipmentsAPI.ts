import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddShipState, EditShipState } from "types";
import { Search } from "../TableSearch/TableSearchSlice";

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

interface queryRequest {
  page: string;
  limit: string;
  number: string | null;
  city: string | null;
  deliveryType: string | null;
  status: string | null;
}

export const shipmentsAPI = createApi({
  reducerPath: "shipmentsAPI",
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
    getSearchInfoParams: build.query<
      Search[],
      Omit<queryRequest, "page" | "limit">
    >({
      query: ({ number, city, deliveryType, status }) => {
        const params = new URLSearchParams();
        if (number) params.append("number", number);
        if (city) params.append("city", city);
        if (deliveryType) params.append("deliveryType", deliveryType);
        if (status) params.append("status", status);
        return { url: `/search`, params };
      },
    }),
    getShipments: build.query<responseData, queryRequest>({
      query: ({ page, limit, number, city, deliveryType, status }) => {
        const params = new URLSearchParams({ page, limit });
        if (number) params.append("number", number);
        if (city) params.append("city", city);
        if (deliveryType) params.append("deliveryType", deliveryType);
        if (status) params.append("status", status);
        return { url: `/shipments`, params };
      },
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
