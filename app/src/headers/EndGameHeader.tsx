/** @jsxImportSource @emotion/react */

import { useTranslation } from "react-i18next"

export const EndGameHeader = () => {
    const { t } = useTranslation()
    return <span>{t('header.end.game')}</span>
}

