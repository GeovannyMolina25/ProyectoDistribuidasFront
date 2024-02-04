import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { DashboardLayout } from "../layout/DashboardLayout";
import { RegistroPage } from "../pages/RegistroPage";
import { ReportePromedioDiario } from "../pages/ReportePromedioDiario";
import { ReporteHistoricoVehiculo } from "../pages/ReporteHistoricoVehiculo";

export const AppRoute = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/reporte/promedio" element={<ReportePromedioDiario />} />
        <Route
          path="/reporte/historico"
          element={<ReporteHistoricoVehiculo />}
        />
      </Routes>
    </DashboardLayout>
  );
};
