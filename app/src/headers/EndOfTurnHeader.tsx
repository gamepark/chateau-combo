/** @jsxImportSource @emotion/react */

import { useTranslation } from "react-i18next"

export const EndOfTurnHeader = () => {
    const { t } = useTranslation()
    return <span>{t('header.end.turn')}</span>
}

