import { Image } from 'expo-image';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/favicon.png')}
          style={styles.logo}
          contentFit="contain"
        />

        <View style={styles.headerIcons}>
          <Ionicons name="moon-outline" size={22} />
          <Ionicons name="person-circle-outline" size={28} />
        </View>
      </View>

      {/* BREADCRUMB */}
      <ThemedText style={styles.breadcrumb}>
        Inicio <Text style={styles.breadcrumbSeparator}>›</Text> Inicio Banca
      </ThemedText>

      {/* CARD SALDO */}
      <View style={styles.saldoCard}>
        <View>
          <Text style={styles.nombre}>ASIEL</Text>
          <Text style={styles.nombre}>VAZQUEZ</Text>
          <Text style={styles.nombre}>RIVAS</Text>
        </View>

        <View style={styles.saldoRight}>
          <Text style={styles.saldoLabel}>Saldo de la cuenta</Text>
          <Text style={styles.saldoMonto}>$0.01</Text>
        </View>
      </View>

      {/* BOTÓN RETIRAR */}
      <View style={styles.retirarContainer}>
        <TouchableOpacity style={styles.retirarBtn}>
          <Ionicons name="arrow-up-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.retirarText}>RETIRAR</Text>
      </View>

      {/* BOTONES ACCIONES */}
      <View style={styles.actions}>
        <ActionButton color="#1e88e5" icon="person" />
        <ActionButton color="#fbc02d" icon="history" />
        <ActionButton color="#e53935" icon="picture-as-pdf" />
        <ActionButton color="#43a047" icon="description" />
      </View>

      {/* ÚLTIMO COMPROBANTE */}
      <View style={styles.comprobanteCard}>
        <View style={styles.comprobantePreview} />
        <Text style={styles.comprobanteTitle}>Último comprobante</Text>
        <Text style={styles.comprobanteText}>Retiro: $0.04</Text>
        <Text style={styles.comprobanteText}>Retiro banca 14</Text>
      </View>

    </ScrollView>
  );
}

/* 🔹 BOTÓN DE ACCIÓN */
function ActionButton({ color, icon }: { color: string; icon: any }) {
  return (
    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: color }]}>
      <MaterialIcons name={icon} size={26} color="#fff" />
    </TouchableOpacity>
  );
}

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
    width: 40,
    height: 40,
  },

  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },

  breadcrumb: {
    marginVertical: 12,
    color: '#6b7280',
  },

  breadcrumbSeparator: {
    marginHorizontal: 6,
  },

  saldoCard: {
    backgroundColor: '#d6d6d6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  nombre: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
  },

  saldoRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  saldoLabel: {
    fontSize: 12,
    color: '#2563eb',
  },

  saldoMonto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },

  retirarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },

  retirarBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },

  retirarText: {
    marginTop: 6,
    fontWeight: '600',
    color: '#22c55e',
  },

  actions: {
    gap: 12,
  },

  actionBtn: {
    height: 55,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  comprobanteCard: {
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },

  comprobantePreview: {
    width: 60,
    height: 80,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 10,
  },

  comprobanteTitle: {
    fontWeight: '600',
    marginBottom: 6,
  },

  comprobanteText: {
    fontSize: 13,
    color: '#374151',
  },
});
