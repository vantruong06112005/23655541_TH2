import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShopStack } from './ShopStack';
import { CartScreen } from '@screens/CartScreen';
import { MeScreen } from '@screens/MeScreen';
import { useCartStore } from '@stores/cartStore';
import { VARIANT } from '@constants/student';

const Tabs = createBottomTabNavigator();

export function MainTabs() {
  const quantity = useCartStore(state => state.totalQuantity());
  const screens: Array<[string, string, React.ComponentType<any>]> =
    VARIANT.tabOrder === 'shopFirst'
      ? [
          ['Shop', 'Cửa hàng', ShopStack],
          ['Cart', 'Giỏ hàng', CartScreen],
          ['Me', 'Tôi', MeScreen],
        ]
      : [
          ['Cart', 'Giỏ hàng', CartScreen],
          ['Shop', 'Cửa hàng', ShopStack],
          ['Me', 'Tôi', MeScreen],
        ];
  return (
    <Tabs.Navigator>
      {screens.map(([name, title, component]) => (
        <Tabs.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title,
            tabBarBadge: name === 'Cart' && quantity > 0 ? quantity : undefined,
            headerShown: false,
          }}
        />
      ))}
    </Tabs.Navigator>
  );
}
