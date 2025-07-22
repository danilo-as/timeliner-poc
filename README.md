# Timeliner PoC

Proof of Concept para Timeliner usando AWS CDK con TypeScript.

## Requisitos Previos

- Node.js (v18 o superior)
- AWS CLI configurado con el perfil `TIMELINER_DEV`
- AWS CDK CLI (`npm install -g aws-cdk`)

## Instalación

**IMPORTANTE**: Este proyecto usa versiones exactas de paquetes npm para garantizar consistencia.

```bash
# Para instalación inicial o cuando el proyecto ya existe
npm ci

# NUNCA uses npm install para dependencias existentes
# Solo usa npm install cuando agregues nuevos paquetes
```

## Configuración AWS

Asegúrate de tener configurado el perfil AWS:

```bash
aws configure --profile TIMELINER_DEV
```

## Comandos Disponibles

- `npm run build` - Compilar TypeScript
- `npm run watch` - Compilar en modo desarrollo
- `npm run synth` - Sintetizar plantilla CloudFormation
- `npm run deploy` - Desplegar stack a AWS
- `npm run diff` - Ver cambios del stack
- `npm run destroy` - Eliminar stack de AWS
- `npm run bootstrap` - Bootstrap CDK (solo primera vez)

## Estándares de Commits

Este proyecto usa [Conventional Commits](https://www.conventionalcommits.org/). Los commits se validan automáticamente.

Formato: `<tipo>(<alcance opcional>): <descripción>`

Tipos permitidos:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de errores
- `docs`: Cambios en documentación
- `style`: Cambios de formato
- `refactor`: Refactorización de código
- `perf`: Mejoras de rendimiento
- `test`: Agregar o corregir pruebas
- `build`: Cambios en el sistema de build
- `ci`: Cambios en configuración CI
- `chore`: Otros cambios
- `revert`: Revertir un commit anterior

Ejemplos:
- `feat: agregar bucket S3 para almacenar timelines`
- `fix: corregir política IAM para función Lambda`
- `docs: actualizar instrucciones de despliegue`