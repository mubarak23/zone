exports.config = () => {
  port: process.env.PORT || 4000;
  jwtScrete: process.env.JWT_SCRETE || 'mkT23j#u!45c6dKBpX6';
  mongoURI: process.env.MONGOURI;
};
