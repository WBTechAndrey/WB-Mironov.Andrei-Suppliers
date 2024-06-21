import {
  SubmitHandler,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetError,
} from "react-hook-form";
import { AddShipState, EditShipState, FooterPropsData, Inputs } from "../types";

interface OnSubmitProps {
  title: string;
  deliveryDate: string;
  setError: UseFormSetError<Inputs>;
  setOpened?: () => void;
  clearErrors: UseFormClearErrors<Inputs>;
  getValues: UseFormGetValues<Inputs>;
  footerProps: FooterPropsData;
  addData: AddShipState;
  updateData: Omit<EditShipState, "deliveryDate">;
}

export const withSubmitProps =
  (props: OnSubmitProps): SubmitHandler<Inputs> =>
  ({ ...formData }) => {
    const {
      title,
      deliveryDate,
      setError,
      setOpened,
      clearErrors,
      getValues,
      footerProps,
      addData,
      updateData,
    } = props;

    const isPastDate = (date: string) => {
      const [day, month, year] = date.split(".").map(Number);
      const selectedDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate < today;
    };

    if (title === "Новая поставка") {
      if (!deliveryDate) {
        setError("calendar", {
          type: "manual",
          message: "Дата поставки обязательна",
        });
        if (setOpened) setOpened();
        return;
      }

      if (isPastDate(deliveryDate)) {
        setError("calendar", {
          type: "manual",
          message: "Дата не может быть в прошлом",
        });
        if (setOpened) setOpened();
        return;
      }
      clearErrors("calendar");
    }

    const currentQuantity = getValues("quantity");
    if (currentQuantity.length === 0) {
      setError("quantity", {
        type: "manual",
        message: "Количество поставок обязательно",
      });
      return;
    }

    if (currentQuantity.startsWith("0")) {
      setError("quantity", {
        type: "manual",
        message: "Число не может начинаться с 0",
      });
      return;
    }
    const quantity = getValues("quantity");
    const calendar = getValues("calendar");
    if (quantity && calendar) {
      if (footerProps.createPost) {
        const newData = {
          ...addData,
          deliveryDate: calendar,
          quantity: quantity,
        };
        footerProps.createPost(newData);
      }
    }
    if (quantity) {
      if (footerProps.updateShip) {
        const newData = {
          ...updateData,
          quantity: quantity,
        };
        const id = updateData.id;
        footerProps.updateShip({ id: id, data: newData });
      }
    }
  };
