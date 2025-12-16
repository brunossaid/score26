import { Edges, SafeAreaView } from 'react-native-safe-area-context';
import { ViewStyle } from 'react-native';

export default function Screen({
  children,
  style,
  edges = ['bottom'], // 👈 por defecto: NO top
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: Edges;
}) {
  return (
    <SafeAreaView edges={edges} style={[{ flex: 1 }, style]}>
      {children}
    </SafeAreaView>
  );
}
