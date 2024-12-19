@historial
Feature: Obtener historial con paginado
  Para verificar que el historial se recupera correctamente
  Como desarrollador
  Quiero validar las respuestas del endpoint

  Scenario: Obtener historial con paginado exitosamente
    Given [historial] que tengo la página "1" y el límite "3"
    When [historial] envío una solicitud GET al endpoint "/historial"
    Then [historial] el estado de la respuesta debe ser 200