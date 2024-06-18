export interface DropDownState {
  id: number;
  text: string;
  selected: boolean;
}

export interface AddShipState {
  number: string;
  deliveryDate: string;
  cities: DropDownState[];
  quantity: string;
  deliveryType: DropDownState[];
  warehouse: DropDownState[];
  status: DropDownState[];
}

export interface EditShipState extends AddShipState {
  id: string;
}
