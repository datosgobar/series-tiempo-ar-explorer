## Documentación de desarrollo

### Parámetros de `TSExplorer`
- `featured: string[]` 
  - indica los IDs de las series destacadas
- `seriesApiUri: string`
  - uri a la API donde buscamos los datos
- `catalogId: string` 
  - representa el id del catálogo de donde busca las series
- `formatChartUnits: boolean` 
  - indica si debe formatear a porcentaje los valores entre -1 y 1
- `laps: { Diaria: number, Mensual: number, Trimestral: number, Semestral: number, Anual: number }`
  -  información para traer los últimos _n_ valores de la serie, con _n_ igual al valor por frecuencia
