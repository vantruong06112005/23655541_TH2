import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { STUDENT, VARIANT, examStamp } from '@constants/student';
import { theme } from '@constants/theme';
import { Watermark } from '@components/Watermark';
import { useAuthStore } from '@stores/authStore';

export function LoginScreen() {
  const [value, setValue] = useState('');
  const signIn = useAuthStore(state => state.signIn);
  const field = VARIANT.authField;
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.logo}>KTXGo</Text>
        <Text style={styles.subtitle}>
          Giao tận phòng {STUDENT.mssv.slice(-2)}
        </Text>
        <Text style={styles.stamp}>#{examStamp()}</Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={field === 'phone' ? 'Số điện thoại' : 'Email'}
          keyboardType={field === 'phone' ? 'phone-pad' : 'email-address'}
          style={styles.input}
        />
        <Pressable onPress={signIn} style={styles.button}>
          <Text style={styles.buttonText}>Vào cửa hàng</Text>
        </Pressable>
      </View>
      <Watermark />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: 'space-between',
  },
  content: { padding: 24, paddingTop: 90 },
  logo: { color: theme.primary, fontSize: 42, fontWeight: '900' },
  subtitle: { color: theme.text, fontSize: 18, marginTop: 8 },
  stamp: { color: theme.secondary, fontWeight: '700', marginTop: 6 },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    backgroundColor: theme.surface,
    paddingHorizontal: 16,
    marginTop: 36,
    color: theme.text,
  },
  button: {
    height: 54,
    borderRadius: 12,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  buttonText: { color: theme.surface, fontWeight: '800', fontSize: 16 },
});
