import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const DATA_FILE_PATH = path.join(__dirname, "/data/data.json");

const readDataFromFile = () => {
  const rawData = fs.readFileSync(DATA_FILE_PATH);
  return JSON.parse(rawData);
};

let data = readDataFromFile();

const randomAddresses = [
  "Посёлок Кудьма, логистический комплекс Южный, ул. Индустриальная, 10",
  "ул. Игарская, д. 21г",
  "Поселение Марушкинское, квартал № 8",
  "ул. Волоколамское шоссе, 51Б",
  "ул. Индустриальная, д. 9/1",
  "д. Черная Грязь, ул. Промышленная, с.2",
  "Липкинское шоссе, 2-й километр, вл1с1, посёлок Вёшки, городской округ Мытищи, Московская область\n",
  "Яничкин проезд, 3",
  "Ногинский р-н, Московская обл., г. Электросталь",
];

const getRandomAddress = () => {
  const randomIndex = Math.floor(Math.random() * randomAddresses.length);
  return randomAddresses[randomIndex];
};

const writeDataToFile = (data) => {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
};

export const createData = (req, res) => {
  const {
    number,
    deliveryDate,
    cities,
    quantity,
    deliveryType,
    warehouse,
    status,
  } = req.body;

  const selectedCity = cities.find((city) => city.selected);
  const selectedDeliveryType = deliveryType.find((type) => type.selected);
  const selectedWarehouse = warehouse.find((wh) => wh.selected);
  const selectedStatus = status.find((st) => st.selected);

  const newShipment = {
    id: Date.now().toString(),
    number,
    deliveryDate,
    city: selectedCity ? selectedCity.text : "",
    quantity,
    deliveryType: selectedDeliveryType ? selectedDeliveryType.text : "",
    warehouse: {
      name: selectedWarehouse ? selectedWarehouse.text : "",
      address: getRandomAddress(),
    },
    status: selectedStatus ? selectedStatus.text : "",
  };

  data.shipments.push(newShipment);
  writeDataToFile(data);
  res.status(201).json(newShipment);
};

export const getShipmentById = (req, res) => {
  const { id } = req.params;
  const shipment = data.shipments.find((s) => s.id === id);

  if (shipment) {
    const infoToAddShip = {
      number: shipment.number,
      id: shipment.id,
      deliveryDate: shipment.deliveryDate,
      cities: [
        { text: "Москва", id: 1, selected: shipment.city === "Москва" },
        { text: "Псков", id: 2, selected: shipment.city === "Псков" },
        { text: "Тверь", id: 3, selected: shipment.city === "Тверь" },
        { text: "Абакан", id: 4, selected: shipment.city === "Абакан" },
        {
          text: "Нижний Новгород",
          id: 5,
          selected: shipment.city === "Нижний Новгород",
        },
        { text: "Кострома", id: 6, selected: shipment.city === "Кострома" },
        { text: "Ярославль", id: 7, selected: shipment.city === "Ярославль" },
      ],
      quantity: shipment.quantity,
      deliveryType: [
        { text: "Короб", id: 1, selected: shipment.deliveryType === "Короб" },
        {
          text: "Монопаллета",
          id: 2,
          selected: shipment.deliveryType === "Монопаллета",
        },
      ],
      warehouse: [
        { text: "Склад", id: 1, selected: shipment.warehouse.name === "Склад" },
        {
          text: "СЦ Абакан",
          id: 2,
          selected: shipment.warehouse.name === "СЦ Абакан",
        },
        {
          text: "Черная Грязь",
          id: 3,
          selected: shipment.warehouse.name === "Черная Грязь",
        },
        {
          text: "Внуково",
          id: 4,
          selected: shipment.warehouse.name === "Внуково",
        },
        {
          text: "Белая дача",
          id: 5,
          selected: shipment.warehouse.name === "Белая дача",
        },
        {
          text: "Электросталь",
          id: 6,
          selected: shipment.warehouse.name === "Электросталь",
        },
        { text: "Вёшки", id: 7, selected: shipment.warehouse.name === "Вёшки" },
      ],
      status: [
        { text: "В пути", id: 1, selected: shipment.status === "В пути" },
        {
          text: "Задерживается",
          id: 2,
          selected: shipment.status === "Задерживается",
        },
      ],
    };

    res.status(200).json(infoToAddShip);
  } else {
    res.status(404).json({ message: "Shipment not found" });
  }
};

export const updateData = (req, res) => {
  const { id } = req.params;
  const {
    number,
    deliveryDate,
    cities,
    quantity,
    deliveryType,
    warehouse,
    status,
  } = req.body;

  const shipmentIndex = data.shipments.findIndex((s) => s.id === id);

  if (shipmentIndex !== -1) {
    const selectedCity = cities.find((city) => city.selected);
    const selectedDeliveryType = deliveryType.find((type) => type.selected);
    const selectedWarehouse = warehouse.find((wh) => wh.selected);
    const selectedStatus = status.find((st) => st.selected);

    const updatedShipment = {
      ...data.shipments[shipmentIndex],
      number,
      deliveryDate,
      city: selectedCity ? selectedCity.text : "",
      quantity,
      deliveryType: selectedDeliveryType ? selectedDeliveryType.text : "",
      warehouse: {
        name: selectedWarehouse ? selectedWarehouse.text : "",
        address: getRandomAddress(),
      },
      status: selectedStatus ? selectedStatus.text : "",
      id,
    };

    data.shipments[shipmentIndex] = updatedShipment;
    writeDataToFile(data);

    res.status(200).json(updatedShipment);
  } else {
    res.status(404).json({ message: "Shipment not found" });
  }
};

export const getInfoToAddShip = (req, res) => {
  const number = String(Date.now()).slice(-6);
  data.infoToAddShip.number = number;
  res.status(200).json(data.infoToAddShip);
};

// export const getShipments = (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//
//   const resultShipments = data.shipments.slice(startIndex, endIndex);
//
//   const totalPages = Math.ceil(data.shipments.length / limit);
//
//   res.status(200).json({
//     currentPage: page,
//     totalPages: totalPages,
//     data: resultShipments,
//   });
// };

export const getShipments = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { number, city, deliveryType, status } = req.query;

  let filteredShipments = data.shipments;

  if (number) {
    const normalizedNumber = number.toLowerCase();
    filteredShipments = filteredShipments.filter((shipment) =>
      shipment.number.toLowerCase().includes(normalizedNumber),
    );
  }

  if (city) {
    const normalizedCity = city.toLowerCase();
    filteredShipments = filteredShipments.filter((shipment) =>
      shipment.city.toLowerCase().includes(normalizedCity),
    );
  }

  if (deliveryType) {
    const normalizedDeliveryType = deliveryType.toLowerCase();
    filteredShipments = filteredShipments.filter((shipment) =>
      shipment.deliveryType.toLowerCase().includes(normalizedDeliveryType),
    );
  }

  if (status) {
    const normalizedStatus = status.toLowerCase();
    filteredShipments = filteredShipments.filter((shipment) =>
      shipment.status.toLowerCase().includes(normalizedStatus),
    );
  }

  const total = filteredShipments.length;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const resultShipments = filteredShipments.slice(startIndex, endIndex);

  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    currentPage: page > totalPages ? totalPages : page,
    totalPages: totalPages,
    totalShipments: total,
    data: resultShipments,
  });
};

export const removeData = (req, res) => {
  data.shipments = data.shipments.filter((s) => s.id !== req.params.id);
  writeDataToFile(data);
  res.json({ message: "Ship has been removed" });
};
