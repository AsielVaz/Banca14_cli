import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';

type Contacto = {
  id: number;
  nombre: string;
  telefono: string;
  correo: string;
  cuenta: string;
};

const CONTACTOS: Contacto[] = [
  {
    id: 1,
    nombre: 'PROVEEDOR PRUEBA',
    telefono: '3312345678',
    correo: 'proveedor@test.com',
    cuenta: '123456789012345678',
  },
  {
    id: 2,
    nombre: 'ASIEL VAZ RIV BBVA',
    telefono: '3325132734',
    correo: 'asiel@correo.com',
    cuenta: '4169160866381875',
  },
];

export default function RetirosScreen() {
  const isDark = useColorScheme() === 'dark';
  const [modalVisible, setModalVisible] = useState(false);

  const [form, setForm] = useState({
    beneficiario: '',
    cuenta: '',
    monto: '',
    concepto: 'Depósito',
    correo: '',
    telefono: '',
    twofa: '',
  });

  const inputStyle = {
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    color: isDark ? '#f9fafb' : '#111827',
    borderColor: isDark ? '#334155' : '#e5e7eb',
  };

  const seleccionarContacto = (c: Contacto) => {
    setForm({
      ...form,
      beneficiario: c.nombre,
      cuenta: c.cuenta,
      correo: c.correo,
      telefono: c.telefono,
    });
    setModalVisible(false);
  };

  return (
    <ScrollView
      style={{ backgroundColor: isDark ? '#000' : '#f5f6fa' }}
      contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/favicon.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <View style={styles.headerIcons}>
          <Ionicons name="moon-outline" size={22} color={isDark ? '#e5e7eb' : '#374151'} />
          <Ionicons name="person-circle-outline" size={28} color={isDark ? '#e5e7eb' : '#374151'} />
        </View>
      </View>

      <Text style={[styles.saldo, { color: isDark ? '#e5e7eb' : '#374151' }]}>
        Saldo posterior: $0.01   Total: $0.00
      </Text>

      {/* FORM */}
      <View style={[styles.card, { backgroundColor: isDark ? '#020617' : '#fff' }]}>
        <Text style={[styles.cardTitle, { color: isDark ? '#f9fafb' : '#111827' }]}>
          Retiro 1
        </Text>
        <Text style={styles.cardSubtitle}>Ingresa los datos del beneficiario.</Text>

        {/* BENEFICIARIO */}
        <Label text="Beneficiario *" />
        <View style={styles.beneficiarioRow}>
          <TextInput
            style={[styles.input, inputStyle, { flex: 1 }]}
            placeholder="Escribe o selecciona"
            placeholderTextColor="#9ca3af"
            value={form.beneficiario}
            onChangeText={v => setForm({ ...form, beneficiario: v })}
          />
          <TouchableOpacity
            style={[styles.dropdownBtn, { borderColor: inputStyle.borderColor }]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="chevron-down" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* RESTO DE CAMPOS */}
        <Campo label="CLABE / Tarjeta *" value={form.cuenta} onChange={v => setForm({ ...form, cuenta: v })} style={inputStyle} />
        <Campo label="Monto *" value={form.monto} keyboard="numeric" onChange={v => setForm({ ...form, monto: v })} style={inputStyle} />
        <Campo label="Concepto" value={form.concepto} onChange={v => setForm({ ...form, concepto: v })} style={inputStyle} />
        <Campo label="Correo" value={form.correo} onChange={v => setForm({ ...form, correo: v })} style={inputStyle} />
        <Campo label="Teléfono" value={form.telefono} onChange={v => setForm({ ...form, telefono: v })} style={inputStyle} />
      </View>

      {/* 2FA */}
      <View style={[styles.card, { backgroundColor: isDark ? '#020617' : '#fff' }]}>
        <Text style={[styles.cardTitle, { color: isDark ? '#f9fafb' : '#111827' }]}>
          Ingresa el 2FA
        </Text>

        <TextInput
          placeholder="Código 2FA"
          placeholderTextColor="#9ca3af"
          style={[styles.input, inputStyle]}
          value={form.twofa}
          onChangeText={v => setForm({ ...form, twofa: v })}
        />

        <TouchableOpacity style={styles.biometriaBtn}>
          <Ionicons name="finger-print-outline" size={18} color="#2563eb" />
          <Text style={styles.biometriaText}>Usar biometría</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.enviarBtn}>
          <Text style={styles.enviarText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona un contacto</Text>
            {CONTACTOS.map(c => (
              <TouchableOpacity
                key={c.id}
                style={styles.contactItem}
                onPress={() => seleccionarContacto(c)}
              >
                <Text style={styles.contactName}>{c.nombre}</Text>
                <Text style={styles.contactSub}>{c.cuenta}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

/* COMPONENTES */
function Label({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

function Campo({ label, value, onChange, keyboard, style }: any) {
  return (
    <>
      <Label text={label} />
      <TextInput
        style={[styles.input, style]}
        value={value}
        keyboardType={keyboard}
        placeholder={label}
        placeholderTextColor="#9ca3af"
        onChangeText={onChange}
      />
    </>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  logo: { width: 36, height: 36 },
  headerIcons: { flexDirection: 'row', gap: 12 },
  saldo: { marginVertical: 12, fontWeight: '500' },

  card: { borderRadius: 16, padding: 16, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: '#64748b', marginBottom: 12 },

  label: { fontSize: 13, color: '#64748b', marginBottom: 4 },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },

  beneficiarioRow: { flexDirection: 'row' },
  dropdownBtn: {
    width: 100,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 6,
  },

  biometriaBtn: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  biometriaText: { color: '#2563eb', fontWeight: '500' },

  enviarBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  enviarText: { color: '#fff', fontWeight: '600' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },

  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },

  modalTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  contactItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  contactName: { fontWeight: '600' },
  contactSub: { fontSize: 12, color: '#6b7280' },
  cancelar: { marginTop: 12, textAlign: 'center', color: '#ef4444', fontWeight: '600' },
});
