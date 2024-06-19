import { Nav } from "./Nav/Nav";
import { Table } from "./Table/Table";
import { Header } from "./Header/Header";
import { useSearchParams } from "react-router-dom";

export interface SearchItems {
  name: string;
  value: string;
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <Nav />
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />
      <Table searchParams={searchParams} setSearchParams={setSearchParams} />
    </>
  );
}

export default App;
