import { createContext, useContext } from 'react'

export const ExtensionDialogContext = createContext<(() => void) | undefined>(undefined)

export const useOpenExtensionDialog = () => useContext(ExtensionDialogContext)
