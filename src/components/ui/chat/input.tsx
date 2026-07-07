import { Pressable, StyleSheet, TextInput, View } from 'react-native';

export default function Input() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your answer"
        placeholderTextColor="#9CA3AF"
      />
      <Pressable style={styles.button} accessibilityRole="button">
        <View style={styles.arrow} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: 'white',
    borderColor: 'grey',
    color: 'black',
    fontSize: 16,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    color: 'white',
  },
  arrow: {
    width: 12,
    height: 12,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopColor: 'white',
    borderRightColor: 'white',
    transform: [{ rotate: '45deg' }],
    marginLeft: -2,
  },
});
