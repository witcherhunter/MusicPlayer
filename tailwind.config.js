module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"], // مسیر فایل‌های React
  theme: {
    extend: {},
    screens: {
      sm: '360px',  // حداقل عرض 360 پیکسل
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
};
