import { fullLocaleDate, localTimestamp } from "../common/dateFunctions";

export function tooltipFormatter(point: any, value: string, smallTooltip?: boolean) {
    return `<table>
                <tbody>
                    <tr>
                        <td>
                            <div class="tooltip-content" style="${smallTooltip ? 'width: 20px' : 'width: 240px'}">
                                <span style="color:${point.color};display:inline !important;">\u25CF</span> ${smallTooltip ? '' : point.series.name}
                            </div>
                        </td>
                        <td><span class="tooltip-value">${value}</span></td>
                    </tr>
                </tbody>
            </table>`
}

export function tooltipDateValue(frequency: string, timest: number): string {
    return `<span id="tooltip-date">${fullLocaleDate(frequency, localTimestamp(timest))}</span>`
}