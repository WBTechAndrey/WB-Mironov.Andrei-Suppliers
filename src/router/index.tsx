import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { SuppliesPage } from "pages/Supplies";
import { ProductPage } from "pages/Products";
import { PricesPage } from "pages/Prices";
import { AnalyticsPage } from "pages/Analytics";
import { MarketingPage } from "pages/Marketing";

export const ConfigureRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Поставки" />} />
        <Route path="/Поставки" element={<SuppliesPage />} />
        <Route path="/Товары" element={<ProductPage />} />
        <Route path="/Цены и скидки" element={<PricesPage />} />
        <Route path="/Аналитика" element={<AnalyticsPage />} />
        <Route path="/Реклама" element={<MarketingPage />} />
      </Routes>
    </Router>
  );
};
