import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

/* 🔹 FUNCIÓN SOLICITADA */
function enviarData() {
  // Aquí irá la API
}

/* 🔹 MODELO */
type Contacto = {
  id: number;
  nombre: string;
  telefono: string;
  correo: string;
  cuenta: string;
};

export default function ContactosScreen() {
  const isDark = useColorScheme() === 'dark';

  const [contactos, setContactos] = useState<Contacto[]>([
    {
      id: 1,
      nombre: 'ASIEL PRUEBA CORREO',
      telefono: '3311476644',
      correo: 'asielvazriv@outlook.com',
      cuenta: '2222222222222222222',
    },
    {
      id: 2,
      nombre: 'ASIEL VAZ RIV BBVA',
      telefono: '3325132734',
      correo: '',
      cuenta: '4169160866381875',
    },
  ]);

  const agregarContacto = () => {
    setContactos(prev => [
      ...prev,
      {
        id: Date.now(),
        nombre: '',
        telefono: '',
        correo: '',
        cuenta: '',
      },
    ]);
  };

  const actualizarContacto = (id: number, data: Contacto) => {
    setContactos(prev => prev.map(c => (c.id === id ? data : c)));
  };

  const eliminarContacto = (id: number) => {
    setContactos(prev => prev.filter(c => c.id !== id));
  };

  return (
    <View style={[styles.root, { backgroundColor: isDark ? '#000' : '#f5f6fa' }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
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

        <Text style={[styles.title, { color: isDark ? '#f9fafb' : '#111827' }]}>
          Contactos
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
          Lista de contactos
        </Text>

        {contactos.map(c => (
          <ContactoCard
            key={c.id}
            contacto={c}
            isDark={isDark}
            onSave={actualizarContacto}
            onDelete={eliminarContacto}
          />
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={agregarContacto}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

/* 🔹 CARD */
function ContactoCard({
  contacto,
  isDark,
  onSave,
  onDelete,
}: {
  contacto: Contacto;
  isDark: boolean;
  onSave: (id: number, data: Contacto) => void;
  onDelete: (id: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(contacto.nombre === '');
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(contacto);

  const guardar = () => {
    enviarData();
    setIsLoading(true);

    setTimeout(() => {
      onSave(contacto.id, form);
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#111827' : '#fff' }]}>
      {/* HEADER */}
      <View style={styles.cardHeader}>
        {isEditing ? (
          <TextInput
            value={form.nombre}
            onChangeText={v => setForm({ ...form, nombre: v })}
            placeholder="Nombre"
            style={[
              styles.input,
              {
                flex: 1,
                backgroundColor: isDark ? '#1f2933' : '#f9fafb',
                color: isDark ? '#f9fafb' : '#111827',
              },
            ]}
            placeholderTextColor="#9ca3af"
          />
        ) : (
          <Text style={[styles.cardTitle, { color: isDark ? '#f9fafb' : '#111827' }]}>
            {form.nombre || 'Sin nombre'}
          </Text>
        )}

        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editBtn}>
            <Ionicons name="pencil-outline" size={18} color="#2563eb" />
          </TouchableOpacity>
        ) : (
          <View style={styles.editActions}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#22c55e' }]}
              onPress={guardar}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Ionicons name="save-outline" size={18} color="#fff" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#ef4444' }]}
              onPress={() => onDelete(contacto.id)}
            >
              <Ionicons name="trash-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Campo label="Teléfono" value={form.telefono} editable={isEditing} icon="call-outline"
        onChange={v => setForm({ ...form, telefono: v })} isDark={isDark} />

      <Campo label="Correo" value={form.correo} editable={isEditing} icon="mail-outline"
        onChange={v => setForm({ ...form, correo: v })} isDark={isDark} />

      <Campo label="Cuenta" value={form.cuenta} editable={isEditing} icon="card-outline"
        onChange={v => setForm({ ...form, cuenta: v })} isDark={isDark} />
    </View>
  );
}

/* 🔹 CAMPO */
function Campo({
  label,
  value,
  editable,
  onChange,
  icon,
  isDark,
}: any) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={20} color="#3b82f6" />
      {!editable ? (
        <Text style={{ color: isDark ? '#e5e7eb' : '#374151' }}>
          {value || `Sin ${label.toLowerCase()}`}
        </Text>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={label}
          placeholderTextColor="#9ca3af"
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#1f2933' : '#f9fafb',
              color: isDark ? '#f9fafb' : '#111827',
            },
          ]}
        />
      )}
    </View>
  );
}

/* 🔹 ESTILOS */
const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 16 },
  header: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' },
  logo: { width: 36, height: 36 },
  headerIcons: { flexDirection: 'row', gap: 12 },
  title: { fontSize: 22, fontWeight: '600', marginTop: 16 },
  subtitle: { fontSize: 13, marginBottom: 16 },
  card: { borderRadius: 16, padding: 16, marginBottom: 16, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, gap: 8 },
  cardTitle: { fontSize: 15, fontWeight: '600' },
  editBtn: { borderWidth: 1, borderColor: '#2563eb', borderRadius: 6, padding: 6 },
  editActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { padding: 6, borderRadius: 6 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
});
