import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { getEstrellas } from "../services/Estrellas";
import Navbar from "../utils/Navbar";

export default function GraficoBarras() {
  const [barData, setBarData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);

  // Colores bien diferenciados + amarillo oscuro
  const pieColors = [
    ["#8B0000", "#B22222"], // Rojo oscuro degradado
    ["#4B0082", "#8A2BE2"], // Púrpura oscuro degradado
    ["#006400", "#228B22"], // Verde oscuro degradado
    ["#191970", "#4169E1"], // Azul medianoche degradado
    ["#B8860B", "#DAA520"], // Amarillo oscuro degradado (nuevo en lugar del naranja)
  ];

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
              {/* Definimos los degradados con nuevos colores */}
              <defs>
                {pieColors.map((colors, index) => (
                  <linearGradient key={index} id={`grad${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={colors[0]} />
                    <stop offset="100%" stopColor={colors[1]} />
                  </linearGradient>
                ))}
              </defs>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={50}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`} // Porcentaje DENTRO del gráfico (esto no tocamos aún)
                labelLine={false}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#grad${index % pieColors.length})`}
                    stroke="none"
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{ backgroundColor: "#333", color: "white" }}
                labelStyle={{ color: "white" }}
                itemStyle={{ color: "white" }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* LEYENDA SIN PORCENTAJE */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
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
                    background: `linear-gradient(45deg, ${pieColors[index % pieColors.length][0]}, ${pieColors[index % pieColors.length][1]})`,
                    marginRight: "8px",
                    borderRadius: "4px",
                  }}
                ></div>
                <span style={{ color: pieColors[index % pieColors.length][1], fontWeight: "bold" }}>
                  {entry.name}
                </span>
              </div>
            ))}
          </div>

          <h1 className="text-white text-center text-3xl">Tipos de Búsquedas</h1>

          <ResponsiveContainer width="90%" height={400}>
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={130}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="white" />
              <XAxis dataKey="name" stroke="white" tick={{ fill: "white" }} />
              <YAxis stroke="white" tick={{ fill: "white" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#333", color: "white" }}
                labelStyle={{ color: "white" }}
                itemStyle={{ color: "white" }}
              />
              <Legend wrapperStyle={{ color: "white" }} />
              <Bar
                dataKey="cantidad"
                radius={[10, 10, 0, 0]}
                fill="url(#colorBar)"
              />
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f92edc" />
                  <stop offset="50%" stopColor="#811fee" />
                  <stop offset="100%" stopColor="#001af5" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Navbar>
    </>
  );
}
