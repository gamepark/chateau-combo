import { ChateauComboOptions } from '@gamepark/chateau-combo/ChateauComboOptions'
import { useOptions } from '@gamepark/react-client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'chateau-combo-out-of-the-oubliette-seen'

export const ExtensionDialogContext = createContext<(() => void) | undefined>(undefined)

export const useOpenExtensionDialog = () => useContext(ExtensionDialogContext)

export const useExtensionDialog = () => {
  const options = useOptions<ChateauComboOptions>()
  const hasExtension = !!options?.expansion1
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!hasExtension) return
    const seen = localStorage.getItem(STORAGE_KEY)
    if (!seen) {
      setShow(true)
    }
  }, [hasExtension])

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setShow(false)
  }, [])

  const reopen = useCallback(() => {
    setShow(true)
  }, [])

  return { show, dismiss, reopen }
}
