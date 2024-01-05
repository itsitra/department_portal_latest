module.exports = {
  devServer: {
    port: 8081,
    proxy: "http://192.168.1.9/departmentportalapi/index.php/api/",
    // proxy: "http://localhost/deapartmentportalapi/index.php/api/",
    // proxy: "http://192.168.1.9/deapartmentportalapi/index.php/api/",
    // proxy: "http://localhost:8081/",
    // proxy: "http://sitraonline.org.in/onlineserviceapi/index.php/api/",
  },
  publicPath:
    process.env.NODE_ENV === "development" ? "/" : "/Departmentportal/",
};
