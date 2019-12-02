import { IPreviewCardExportableConfig } from "../../indexPreviewCard";

export function getAPIDefaultURI(): string {
    return `https://apis.datos.gob.ar/series/api`
}

const SERIES_EXPLORER_DEFAULT_URL = "https://datos.gob.ar/series/api/series";

export function getClickTarget(config: IPreviewCardExportableConfig): string {

    if (config.explorerUrl) {
        return `${config.explorerUrl}/?ids=${config.serieId}`;
    }
    if (config.apiBaseUrl) {
        return `${config.apiBaseUrl}/series/?metadata=full&ids=${config.serieId}&last=5000`;
    }
    return `${SERIES_EXPLORER_DEFAULT_URL}/?ids=${config.serieId}`;;

}