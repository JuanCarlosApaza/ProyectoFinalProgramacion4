import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { getEstrellas } from "../services/Estrellas";
import Navbar from "../utils/Navbar";

export default function GraficoBarras() {
  const [barData, setBarData] = useState<any[]>([]); 
  const [pieData, setPieData] = useState<any[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const estrellasData = await getEstrellas();
        console.log("Datos obtenidos:", estrellasData);

        const busquedasPorCategoria = Object.entries(
          estrellasData.busquedasPorCategoria
        ).map(([categoria, cantidad]) => ({
          name: categoria,
          cantidad: cantidad,
        }));

        setBarData(busquedasPorCategoria);

        const busquedasPorEstrella = Object.entries(
          estrellasData.busquedasPorEstrellas
        ).map(([estrella, cantidad]) => ({
          name: `${estrella} Estrella(s)`,
          value: cantidad,
        }));

        setPieData(busquedasPorEstrella);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const coloresEstrellas = [
    "#FF6347",
    "#32CD32",
    "#FFD700",
    "#1E90FF",
    "#8A2BE2",
  ];

  return (
    <>
      <Navbar>
        <h1 className="text-white text-center text-3xl">Cantidad de Estrellas por Calidad de IA</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
            padding: "0 10px",
            color: "white",
            
          }}
        >
          <ResponsiveContainer width="90%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={coloresEstrellas[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#333", color: "white" }}
                labelStyle={{ color: "white" }}
                itemStyle={{ color: "white" }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              fontSize: "14px",
              color: "white",
            }}
          >
            {pieData.map((entry, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: coloresEstrellas[index],
                    marginRight: "8px",
                  }}
                ></div>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
          <h1 className="text-white text-center text-3xl">Tipos de Busquedas</h1>

          <ResponsiveContainer width="80%" height={400}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="white" />
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip
                contentStyle={{ backgroundColor: "#333", color: "white" }}
                labelStyle={{ color: "white" }}
                itemStyle={{ color: "white" }}
              />
              <Legend wrapperStyle={{ color: "white" }} />
              <Bar dataKey="cantidad" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Navbar>
    </>
  );
}
