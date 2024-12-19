Feature: Almacenar datos personalizados
  Para verificar que los datos se almacenan correctamente
  Como desarrollador
  Quiero enviar datos al endpoint y validar la respuesta

  Scenario: Almacenar datos exitosamente
    Given [almacenar] que tengo los siguientes datos:
      | nombre   | apellido |
      | Wilmer   | Delgado  |
    When [almacenar] envío una solicitud POST al endpoint "/almacenar"
    Then [almacenar] el estado de la respuesta debe ser 201