import "./index.scss";
import { Button } from "../common/Button";

export const Nav = () => {
  return (
    <nav className="header">
      <Button
        onClick={(event) => event.preventDefault()}
        children="Поставки"
        className="active"
      />
      <Button onClick={(event) => event.preventDefault()} children="Товары" />
      <Button
        onClick={(event) => event.preventDefault()}
        children="Цены и скидки"
      />
      <Button
        onClick={(event) => event.preventDefault()}
        children="Аналитика"
      />
      <Button onClick={(event) => event.preventDefault()} children="Реклама" />
    </nav>
  );
};
