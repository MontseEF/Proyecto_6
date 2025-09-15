const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

module.exports = function setupSwagger(app) {
  const yamlPath = path.join(__dirname, 'swagger.yaml');
  const swaggerDocument = YAML.load(yamlPath);

  app.get('/api/docs.json', (req, res) => res.json(swaggerDocument));

  
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(null, { swaggerUrl: '/api/docs.json' })
  );

  console.log('Swagger listo en /api/docs (JSON en /api/docs.json)');
}
