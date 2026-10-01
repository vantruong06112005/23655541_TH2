import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { examStamp, STUDENT, VARIANT } from '@constants/student';
import { theme } from '@constants/theme';

export function Watermark() {
  return (
    <View
      style={[
        styles.container,
        VARIANT.watermarkAtTop ? styles.top : styles.bottom,
      ]}
    >
      <Text style={styles.text}>
        TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: theme.surface,
  },
  top: { borderBottomWidth: 1, borderBottomColor: theme.border },
  bottom: { borderTopWidth: 1, borderTopColor: theme.border },
  text: { color: theme.textLight, fontSize: 11, textAlign: 'center' },
});
