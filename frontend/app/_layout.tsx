import { Stack } from 'expo-router'
import { config } from '@tamagui/config/v3'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TamaguiProvider, createTamagui } from '@tamagui/core'


const tamaguiConfig = createTamagui(config)

type TamaguiConfiguration = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends TamaguiConfiguration {}
}

export default function Layout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SafeAreaProvider>
    </TamaguiProvider>
  )
}
