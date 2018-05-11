import * as React from 'react';
import Serie from '../../common/serie/Serie'
// TODO: reemplazar default por lista vacia, esto es solo una prueba
const series = [
    <Serie key={1} name='PBI General Mensual' author='Subsecretaria de Programación Macroeconomica' description='Exportaciones por provincia y por pais de destino en millones de dolares' />,
    <Serie key={2} name='2PBI General Mensual' author='Subsecretaria de Programación Macroeconomica' description='Exportaciones por provincia y por pais de destino en millones de dolares' />
];

export default function FeaturedReducer(state: any = series, action: any) {
    return state;
}