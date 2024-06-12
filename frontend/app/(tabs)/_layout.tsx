import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components';
import { Colors } from '@/styles/designSystem'

export default function TabLayout() {

  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: Colors.surface,
          backgroundColor: Colors.secondary
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.white,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon labelName="Home" name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon labelName="Wallet" name={focused ? 'wallet' : 'wallet-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="swap"
        options={{
          title: 'Swap',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon labelName="Swap" name={focused ? 'swap-horizontal' : 'swap-horizontal-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="earn"
        options={{
          title: 'Earn',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon labelName="Earn" name={focused ? 'cash' : 'cash-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon labelName="Settings" name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
