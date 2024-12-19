@fusionados
Feature: Obtener datos fusionados
  Para verificar que los datos fusionados se obtienen correctamente
  Como desarrollador
  Quiero validar las respuestas del endpoint

  Scenario: Obtener datos fusionados exitosamente
    Given [fusionados] que tengo el peopleId "4"
    When [fusionados] envío una solicitud GET al endpoint "/fusionados"
    Then [fusionados] el estado de la respuesta debe ser 200
