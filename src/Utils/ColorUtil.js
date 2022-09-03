const variants = "0123456789ABCDEF";

export const randomColor = () => {
  let color = "#";
  for (let i = 0; i < 6; ++i) {
    color += variants[Math.floor(Math.random() * 16)];
  }
  return color;
};
