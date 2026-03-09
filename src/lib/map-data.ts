export const MAP_HOTSPOTS: Array<{
  id: string;
  city: string;
  x: number;
  y: number;
  projects?: number;
  color: "blue" | "indigo" | "sky" | "cyan";
}> = [
  { id: "minsk", city: "Минск", x: 47, y: 45, projects: 120, color: "blue" },
  { id: "brest", city: "Брест", x: 32, y: 62, projects: 45, color: "sky" },
  { id: "gomel", city: "Гомель", x: 70, y: 65, projects: 60, color: "indigo" },
  { id: "vitebsk", city: "Витебск", x: 60, y: 30, projects: 35, color: "cyan" },
  { id: "grodno", city: "Гродно", x: 28, y: 48, projects: 50, color: "blue" },
  { id: "mogilev", city: "Могилев", x: 70, y: 45, projects: 40, color: "sky" },
];
