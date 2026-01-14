import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function MovimientosScreen() {
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#000000' : '#f5f6fa' },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/favicon.png')}
          style={styles.logo}
          contentFit="contain"
        />

        <View style={styles.headerIcons}>
          <Ionicons
            name="moon-outline"
            size={22}
            color={isDark ? '#e5e7eb' : '#374151'}
          />
          <Ionicons
            name="person-circle-outline"
            size={28}
            color={isDark ? '#e5e7eb' : '#374151'}
          />
        </View>
      </View>

      {/* BREADCRUMB */}
      <Text style={[styles.breadcrumb, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
        Movimientos <Text style={styles.separator}>›</Text> Comprobantes
      </Text>

      {/* MOVIMIENTOS */}
      {DATA.map(item => (
        <MovimientoItem key={item.ref} {...item} isDark={isDark} />
      ))}
    </ScrollView>
  );
}

/* 🔹 ITEM */
function MovimientoItem({
  monto,
  ref,
  fecha,
  isDark,
}: {
  monto: string;
  ref: string;
  fecha: string;
  isDark: boolean;
}) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? '#111827' : '#ffffff',
          shadowColor: isDark ? '#000' : '#000',
        },
      ]}
    >
      {/* TEXTO VERTICAL ABSOLUTO */}
      <View style={styles.verticalContainer}>
        <Text style={[styles.verticalText, { color: '#9ca3af' }]}>
          Banca 14
        </Text>
      </View>

      {/* ICONO */}
      <Ionicons name="arrow-up-outline" size={26} color="#ef4444" />

      {/* INFO */}
      <View style={styles.info}>
        <Text
          style={[
            styles.title,
            { color: isDark ? '#f9fafb' : '#111827' },
          ]}
        >
          Retiro banca 14,{' '}
          <Text style={styles.ref}>Referencia {ref}</Text>
        </Text>

        <Text style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}>
          {fecha}
        </Text>
      </View>

      {/* MONTO */}
      <View style={styles.right}>
        <Text
          style={{
            fontWeight: '600',
            color: isDark ? '#e5e7eb' : '#374151',
          }}
        >
          {monto}
        </Text>
        <TouchableOpacity>
          <MaterialIcons name="picture-as-pdf" size={22} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* 🔹 DATA MOCK */
const DATA = [
  { monto: '$0.04', ref: '10HKU91449', fecha: 'Viernes 09/Enero/2026' },
  { monto: '$0.03', ref: '10HKU91448', fecha: 'Viernes 09/Enero/2026' },
  { monto: '$0.02', ref: '10HKU91447', fecha: 'Viernes 09/Enero/2026' },
  { monto: '$0.01', ref: '10HKU91446', fecha: 'Viernes 09/Enero/2026' },
  { monto: '$0.01', ref: '10HKU91444', fecha: 'Viernes 09/Enero/2026' },
  { monto: '$0.01', ref: '10HKU91296', fecha: 'Miércoles 07/Enero/2026' },
  { monto: '$0.01', ref: '10HKU91196', fecha: 'Lunes 05/Enero/2026' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    width: 36,
    height: 36,
  },

  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },

  breadcrumb: {
    marginVertical: 16,
    fontSize: 13,
  },

  separator: {
    marginHorizontal: 6,
  },

  card: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },

  verticalContainer: {
    position: 'absolute',
    left: -5,
    top: '50%',
    transform: [{ rotate: '-90deg' }, { translateY: -10 }],
  },

  verticalText: {
    fontSize: 10,
    letterSpacing: 1,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: '500',
  },

  ref: {
    color: '#3b82f6',
  },

  right: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
});
